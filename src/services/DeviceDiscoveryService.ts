import { Platform, PermissionsAndroid } from 'react-native';

let isWatching = false;
let wifiInfo: any = null;

export interface NetworkDevice {
  id: string;
  name: string;
  model: string;
  ip: string;
  status: string;
  brand?: string;
}

export class DeviceDiscoveryService {
  private intervalId: number | null = null;
  private onDeviceFound: (device: NetworkDevice) => void;
  private onStatusChange: (status: string) => void;

  constructor(
    onDeviceFound: (device: NetworkDevice) => void,
    onStatusChange: (status: string) => void
  ) {
    this.onDeviceFound = onDeviceFound;
    this.onStatusChange = onStatusChange;
  }

  async requestPermissions(): Promise<boolean> {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Acesso à rede local',
            message: 'CONTROCOM precisa de acesso à rede para encontrar dispositivos.',
            buttonPositive: 'Permitir',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (e) {
        return false;
      }
    }
    return true;
  }

  startDiscovery(): void {
    if (isWatching) return;
    isWatching = true;
    this.onStatusChange('Procurando dispositivos na rede Wi-Fi...');

    // Simular descoberta de múltiplos dispositivos genéricos
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
        ip: '192.168.' + (Math.floor(Math.random() * 200) + 1) + '.' + (Math.floor(Math.random() * 200) + 1),
        status: 'DISCONNECTED',
      };
      this.onDeviceFound(device);
      this.onStatusChange(`Encontrado: ${device.name} (${device.brand})`);
      count++;
    }, 2500);
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
      ssid: 'Wi-Fi',
      ip: '192.168.' + (Math.floor(Math.random() * 200) + 1) + '.' + (Math.floor(Math.random() * 200) + 1),
    };
    return wifiInfo;
  }
}

export const deviceDiscoveryService = new DeviceDiscoveryService(
  () => {},
  () => {}
);
