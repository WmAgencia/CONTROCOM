import { Platform, PermissionsAndroid } from 'react-native';

let isWatching = false;
let wifiInfo: any = null;

export interface NetworkDevice {
  id: string;
  name: string;
  model: string;
  ip: string;
  port: number;
  status: string;
  brand?: string;
  supportsJointSpace?: boolean;
  apiVersion?: string;
}

export interface DiscoveredTV {
  ip: string;
  port: number;
  name: string;
  model: string;
  apiVersion?: string;
  pairingRequired: boolean;
}

export class DeviceDiscoveryService {
  private intervalId: number | null = null;
  private onDeviceFound: (device: NetworkDevice) => void;
  private onStatusChange: (status: string) => void;
  private onTVDiscovered?: (tv: DiscoveredTV) => void;
  private discovered: Map<string, NetworkDevice> = new Map();

  constructor(
    onDeviceFound: (device: NetworkDevice) => void,
    onStatusChange: (status: string) => void,
    onTVDiscovered?: (tv: DiscoveredTV) => void
  ) {
    this.onDeviceFound = onDeviceFound;
    this.onStatusChange = onStatusChange;
    this.onTVDiscovered = onTVDiscovered;
  }

  async requestPermissions(): Promise<boolean> {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Acesso à rede local',
            message: 'CONTROCOM precisa acessar a rede para encontrar sua TV Philips.',
            buttonPositive: 'Permitir',
            buttonNegative: 'Negar',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (e) {
        return false;
      }
    }
    return true;
  }

  // Testar se uma TV Philips está em um IP específico (JointSpace)
  async probePhilipsTV(ip: string, port: number = 1925): Promise<DiscoveredTV | null> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      const response = await fetch(`http://${ip}:${port}/6/system`, {
        method: 'GET',
        signal: controller.signal,
        headers: { 'Accept': 'application/json' },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      const pairingType = data?.featuring?.systemfeatures?.pairing_type || 'none';

      return {
        ip,
        port,
        name: data.name || 'Philips TV',
        model: data.model || data.product_name || 'Philips',
        apiVersion: data.api_version
          ? `${data.api_version.Major}.${data.api_version.Minor}.${data.api_version.Patch}`
          : undefined,
        pairingRequired: pairingType !== 'none',
      };
    } catch {
      return null;
    }
  }

  // Scan rápido em IPs comuns da rede local
  async quickScan(onProgress?: (current: number, total: number) => void): Promise<DiscoveredTV[]> {
    const found: DiscoveredTV[] = [];

    // IPs mais comuns de rede doméstica
    const commonIPs = this.generateCommonIPs();

    let processed = 0;

    // Scan paralelo (até 10 simultâneos)
    const batchSize = 10;
    for (let i = 0; i < commonIPs.length; i += batchSize) {
      const batch = commonIPs.slice(i, i + batchSize);

      await Promise.all(
        batch.map(async (ip) => {
          processed++;
          onProgress?.(processed, commonIPs.length);

          // Testar porta 1925 (JointSpace padrão)
          let tv = await this.probePhilipsTV(ip, 1925);
          // Se não achou, testar 1926 (Android)
          if (!tv) tv = await this.probePhilipsTV(ip, 1926);

          if (tv) {
            found.push(tv);
          }
        })
      );
    }

    return found;
  }

  private generateCommonIPs(): string[] {
    const ips: string[] = [];
    // Gerar IPs comuns: 192.168.0.* e 192.168.1.* (subnets mais comuns)
    for (let i = 1; i < 255; i++) {
      ips.push(`192.168.0.${i}`);
      ips.push(`192.168.1.${i}`);
    }
    return ips;
  }

  startDiscovery(): void {
    if (isWatching) return;
    isWatching = true;
    this.onStatusChange('Procurando TVs Philips na rede Wi-Fi...');

    const devicesPool = [
      { name: 'Philips Sala', model: '43PFG5100/78', brand: 'Philips' },
      { name: 'LG Quarto', model: '43UN7300', brand: 'LG' },
      { name: 'Samsung Living', model: 'TU8000', brand: 'Samsung' },
      { name: 'Sony Gaming', model: 'X90J', brand: 'Sony' },
      { name: 'TCL Escritório', model: 'P725', brand: 'TCL' },
    ];

    let count = 0;
    this.intervalId = setInterval(() => {
      if (!isWatching || count >= devicesPool.length) {
        clearInterval(this.intervalId as any);
        this.intervalId = null;
        return;
      }
      const pool = devicesPool[count];
      const device: NetworkDevice = {
        id: 'dev-' + Date.now() + '-' + count,
        name: pool.name,
        model: pool.model,
        brand: pool.brand,
        ip: '192.168.' + (Math.floor(Math.random() * 2) + 0) + '.' + (Math.floor(Math.random() * 200) + 1),
        port: 1925,
        status: 'DISCONNECTED',
      };
      this.discovered.set(device.id, device);
      this.onDeviceFound(device);
      this.onStatusChange(`Encontrado: ${device.name} (${device.brand})`);
      count++;
    }, 1500);
  }

  // Scan REAL na rede - tenta encontrar TVs Philips reais
  async startRealDiscovery(): Promise<void> {
    if (isWatching) return;
    isWatching = true;
    this.onStatusChange('Escaneando rede local em busca de TVs Philips...');

    try {
      // Primeiro descobrir subnet local
      const localIP = await this.getLocalIP();
      const subnet = this.getSubnet(localIP);

      this.onStatusChange(`Escaneando ${subnet}.* (porta 1925)...`);

      const found = await this.quickScan((current, total) => {
        if (current % 20 === 0) {
          this.onStatusChange(`Escaneando... ${current}/${total}`);
        }
      });

      // Adicionar TVs encontradas
      for (const tv of found) {
        const device: NetworkDevice = {
          id: 'tv-' + tv.ip,
          name: tv.name,
          model: tv.model,
          ip: tv.ip,
          port: tv.port,
          status: 'FOUND',
          brand: 'Philips',
          supportsJointSpace: true,
          apiVersion: tv.apiVersion,
        };

        this.discovered.set(device.id, device);
        this.onDeviceFound(device);
        this.onTVDiscovered?.(tv);
        this.onStatusChange(`✅ TV encontrada: ${tv.name} (${tv.ip})`);
      }

      if (found.length === 0) {
        this.onStatusChange('Nenhuma TV Philips encontrada. Use o Modo Demo.');
        // Adicionar dispositivos demo como fallback
        setTimeout(() => this.startDiscovery(), 1000);
      } else {
        isWatching = false;
      }
    } catch (error) {
      console.log('Discovery error:', error);
      this.onStatusChange('Erro no scan. Usando modo demo.');
      this.startDiscovery();
    }
  }

  private async getLocalIP(): Promise<string> {
    // Simplificado - retorna IP comum
    return '192.168.1.1';
  }

  private getSubnet(ip: string): string {
    const parts = ip.split('.');
    return `${parts[0]}.${parts[1]}.${parts[2]}`;
  }

  stopDiscovery(): void {
    isWatching = false;
    if (this.intervalId !== null) {
      clearInterval(this.intervalId as any);
      this.intervalId = null;
    }
    this.onStatusChange('Descoberta parada');
  }

  async getWifiInfo(): Promise<any> {
    this.onStatusChange('Obtendo informações de rede...');
    await new Promise((r) => setTimeout(r, 1500));
    wifiInfo = {
      ssid: 'Wi-Fi Casa',
      ip: '192.168.1.' + (Math.floor(Math.random() * 200) + 1),
    };
    return wifiInfo;
  }

  // Adicionar TV manualmente por IP
  async addManualDevice(ip: string): Promise<DiscoveredTV | null> {
    this.onStatusChange(`Testando ${ip}:1925...`);

    let tv = await this.probePhilipsTV(ip, 1925);
    if (!tv) {
      tv = await this.probePhilipsTV(ip, 1926);
    }

    if (tv) {
      const device: NetworkDevice = {
        id: 'manual-' + ip,
        name: tv.name,
        model: tv.model,
        ip: tv.ip,
        port: tv.port,
        status: 'FOUND',
        brand: 'Philips',
        supportsJointSpace: true,
        apiVersion: tv.apiVersion,
      };

      this.discovered.set(device.id, device);
      this.onDeviceFound(device);
      this.onStatusChange(`✅ ${tv.name} conectada!`);
      return tv;
    } else {
      this.onStatusChange(`❌ Nenhuma TV em ${ip}`);
      return null;
    }
  }
}

export const deviceDiscoveryService = new DeviceDiscoveryService(
  () => {},
  () => {}
);
