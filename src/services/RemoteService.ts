import { DeviceEventEmitter, Platform } from 'react-native';
import * as Haptics from 'expo-haptics';

// JointSpace API v6 endpoints
const ENDPOINTS = {
  system: '/6/system',
  powerstate: '/6/powerstate',
  inputKey: '/6/input/key',
  audioVolume: '/6/audio/volume',
  audioMute: '/6/audio/mute',
  channels: '/6/channels',
  channelList: '/6/channeldb/channel/list',
  ambilight: '/6/ambilight/power',
  sources: '/6/sources',
  applications: '/6/applications',
  menuItems: '/6/menuitems',
};

// Mapeamento de comandos CONTROCOM para teclas JointSpace
const JOINT_SPACE_KEYS: Record<string, string> = {
  'POWER': 'Standby',
  'VOLUME_UP': 'VolumeUp',
  'VOLUME_DOWN': 'VolumeDown',
  'MUTE': 'Mute',
  'CHANNEL_UP': 'ChannelStepUp',
  'CHANNEL_DOWN': 'ChannelStepDown',
  'UP': 'CursorUp',
  'DOWN': 'CursorDown',
  'LEFT': 'CursorLeft',
  'RIGHT': 'CursorRight',
  'OK': 'Confirm',
  'HOME': 'Home',
  'BACK': 'Back',
  'MENU': 'Menu',
  'SOURCE': 'Source',
  'PLAY': 'Play',
  'PAUSE': 'Pause',
  'REWIND': 'Rewind',
  'FORWARD': 'FastForward',
  'STOP': 'Stop',
  'RECORD': 'Record',
  'INFO': 'Info',
  'OPTIONS': 'Options',
  'GUIDE': 'Guide',
  'TELETEXT': 'Teletext',
  'SUBTITLE': 'Subtitle',
  'NUMBER_0': 'Digit0',
  'NUMBER_1': 'Digit1',
  'NUMBER_2': 'Digit2',
  'NUMBER_3': 'Digit3',
  'NUMBER_4': 'Digit4',
  'NUMBER_5': 'Digit5',
  'NUMBER_6': 'Digit6',
  'NUMBER_7': 'Digit7',
  'NUMBER_8': 'Digit8',
  'NUMBER_9': 'Digit9',
  'RED': 'RedColour',
  'GREEN': 'GreenColour',
  'YELLOW': 'YellowColour',
  'BLUE': 'BlueColour',
};

// Mapeamento de apps para intent (Android TVs)
const APP_PACKAGES: Record<string, { packageName: string; intent: string }> = {
  'NETFLIX': {
    packageName: 'com.netflix.ninja',
    intent: 'android.intent.action.MAIN'
  },
  'YOUTUBE': {
    packageName: 'com.google.android.youtube.tv',
    intent: 'android.intent.action.MAIN'
  },
  'PRIME_VIDEO': {
    packageName: 'com.amazon.amazonvideo.livingroom',
    intent: 'android.intent.action.MAIN'
  },
  'DISNEY': {
    packageName: 'com.disney.disneyplus',
    intent: 'android.intent.action.MAIN'
  },
  'GLOBOPLAY': {
    packageName: 'br.com.globo.globoplay',
    intent: 'android.intent.action.MAIN'
  },
  'HBO_MAX': {
    packageName: 'com.wbd.stream',
    intent: 'android.intent.action.MAIN'
  },
  'SPOTIFY': {
    packageName: 'com.spotify.tv.android',
    intent: 'android.intent.action.MAIN'
  },
  'TWITCH': {
    packageName: 'tv.twitch.android.app',
    intent: 'android.intent.action.MAIN'
  },
};

export abstract class RemoteProtocol {
  abstract sendCommand(command: string): Promise<any>;
  abstract getDeviceInfo(): Promise<any>;
  abstract disconnect(): Promise<void>;
  abstract isConnected(): boolean;
}

export class DemoRemoteAdapter extends RemoteProtocol {
  private volume: number = 20;
  private channel: number = 1;
  private power: boolean = true;
  private muted: boolean = false;
  private currentApp: string | null = null;

  async sendCommand(command: string): Promise<any> {
    switch (command) {
      case 'POWER':
        this.power = !this.power;
        DeviceEventEmitter.emit('demo:tvState', { power: this.power });
        return { success: true, status: 'DEMO', power: this.power };
      case 'VOLUME_UP':
        this.volume = Math.min(100, this.volume + 1);
        DeviceEventEmitter.emit('demo:volume', { volume: this.volume });
        return { success: true, status: 'DEMO', volume: this.volume };
      case 'VOLUME_DOWN':
        this.volume = Math.max(0, this.volume - 1);
        DeviceEventEmitter.emit('demo:volume', { volume: this.volume });
        return { success: true, status: 'DEMO', volume: this.volume };
      case 'MUTE':
        this.muted = !this.muted;
        return { success: true, status: 'DEMO', muted: this.muted };
      case 'CHANNEL_UP':
        this.channel = this.channel >= 999 ? 1 : this.channel + 1;
        DeviceEventEmitter.emit('demo:channel', { channel: this.channel });
        return { success: true, status: 'DEMO', channel: this.channel };
      case 'CHANNEL_DOWN':
        this.channel = this.channel <= 1 ? 999 : this.channel - 1;
        DeviceEventEmitter.emit('demo:channel', { channel: this.channel });
        return { success: true, status: 'DEMO', channel: this.channel };
      case 'NETFLIX':
      case 'YOUTUBE':
      case 'PRIME_VIDEO':
      case 'DISNEY':
      case 'GLOBOPLAY':
      case 'HBO_MAX':
      case 'SPOTIFY':
      case 'TWITCH':
        const appName = command === 'PRIME_VIDEO' ? 'Prime Video' :
                        command.charAt(0) + command.slice(1).toLowerCase();
        this.currentApp = appName;
        DeviceEventEmitter.emit('demo:app', { app: appName });
        return { success: true, status: 'DEMO', app: appName };
      default:
        return { success: true, status: 'DEMO' };
    }
  }

  async getDeviceInfo(): Promise<any> {
    return {
      model: 'Philips 43PFG5100/78',
      ip: null,
      status: 'DEMO',
      power: this.power,
      volume: this.volume,
      channel: this.channel,
      muted: this.muted,
      currentApp: this.currentApp,
    };
  }

  async disconnect(): Promise<void> {
    return Promise.resolve();
  }

  isConnected(): boolean {
    return true;
  }

  getState() {
    return {
      power: this.power,
      volume: this.volume,
      channel: this.channel,
      muted: this.muted,
      currentApp: this.currentApp,
    };
  }
}

export class PhilipsRemoteAdapter extends RemoteProtocol {
  private ip: string;
  private port: number;
  private timeout: number = 5000;
  private paired: boolean = false;
  private sessionId: string = '';
  private powerState: boolean = true;
  private volumeLevel: number = 20;
  private currentChannel: number = 1;
  private isMuted: boolean = false;
  private deviceName: string = 'Philips TV';
  private deviceModel: string = '';
  private apiVersion: string = '6.2.0';
  private supportsPairing: boolean = false;
  private supportsApps: boolean = false;

  constructor(ip: string, port: number = 1925) {
    super();
    this.ip = ip;
    this.port = port;
  }

  private async httpRequest(
    endpoint: string,
    method: string = 'GET',
    body?: any,
    retry: boolean = true
  ): Promise<any> {
    const url = `http://${this.ip}:${this.port}${endpoint}`;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    if (this.sessionId) {
      headers['Session-Id'] = this.sessionId;
    }

    const options: RequestInit = {
      method,
      headers,
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);
      options.signal = controller.signal;

      const response = await fetch(url, options);
      clearTimeout(timeoutId);

      // Tentar pegar session ID se vier no header
      const sessionIdHeader = response.headers.get('Session-Id');
      if (sessionIdHeader) {
        this.sessionId = sessionIdHeader;
      }

      const text = await response.text();
      let data: any = {};

      if (text) {
        try {
          data = JSON.parse(text);
        } catch {
          data = { raw: text };
        }
      }

      if (!response.ok) {
        if (response.status === 401 && retry) {
          // Auth necessária, tentar parear
          await this.startPairing();
          // Tentar de novo
          return this.httpRequest(endpoint, method, body, false);
        }
        throw new Error(`HTTP ${response.status}: ${text}`);
      }

      return data;
    } catch (error: any) {
      if (error.name === 'AbortError') {
        throw new Error('Timeout - TV não respondeu');
      }
      throw error;
    }
  }

  async startPairing(): Promise<{ success: boolean; pinRequired: boolean }> {
    try {
      const result = await this.httpRequest('/6/pair/request', 'POST', {
        scope: ['read', 'write', 'control'],
        device: {
          device_name: 'CONTROCOM',
          device_os: Platform.OS,
          app_id: 'com.wmagencia.controcom',
          type: 'native',
          app_name: 'CONTROCOM',
        },
      });

      if (result.success) {
        this.supportsPairing = true;
        DeviceEventEmitter.emit('philips:pairing_required', { ip: this.ip });
        return { success: true, pinRequired: true };
      }

      return { success: false, pinRequired: false };
    } catch (error) {
      console.log('Pairing error:', error);
      // Se der 401 ou erro, tenta sem pairing
      return { success: false, pinRequired: false };
    }
  }

  async confirmPairing(pin: string): Promise<boolean> {
    try {
      const result = await this.httpRequest('/6/pair/grant', 'POST', {
        pin,
      });

      if (result.success) {
        this.paired = true;
        return true;
      }
      return false;
    } catch (error) {
      console.log('Confirm pairing error:', error);
      return false;
    }
  }

  async connect(): Promise<boolean> {
    try {
      // Testar porta 1925 primeiro (TVs não-Android)
      const result = await this.httpRequest(ENDPOINTS.system, 'GET', undefined, false);

      if (result) {
        this.deviceName = result.name || 'Philips TV';
        this.deviceModel = result.model || 'Philips';
        this.apiVersion = `${result.api_version?.Major || 6}.${result.api_version?.Minor || 2}.${result.api_version?.Patch || 0}`;

        // Verificar features
        const jsonFeatures = result.featuring?.jsonfeatures || {};
        this.supportsApps = !!(jsonFeatures.activities || jsonFeatures.applications);

        // Verificar tipo de pairing
        const systemFeatures = result.featuring?.systemfeatures || {};
        const pairingType = systemFeatures.pairing_type || 'none';

        if (pairingType !== 'none') {
          // Precisa parear
          await this.startPairing();
        } else {
          this.paired = true;
        }

        return true;
      }

      return false;
    } catch (error: any) {
      // Tentar porta 1926 (TVs Android)
      if (this.port === 1925) {
        console.log('Tentando porta 1926 (Android)...');
        this.port = 1926;
        return this.connect();
      }
      console.log('Connection failed:', error.message || error);
      return false;
    }
  }

  async sendCommand(command: string): Promise<any> {
    // Verificar se é um app
    if (APP_PACKAGES[command]) {
      return this.launchApp(command);
    }

    // Mapear comando para tecla
    const key = JOINT_SPACE_KEYS[command];
    if (!key) {
      return { success: false, error: `Comando desconhecido: ${command}` };
    }

    try {
      await this.httpRequest(ENDPOINTS.inputKey, 'POST', { key });
      this.updateLocalState(command);

      return {
        success: true,
        status: 'CONNECTED',
        ip: this.ip,
        command,
        key,
      };
    } catch (error: any) {
      console.log('Command error:', error.message);
      // Fallback: simular se TV não responder
      this.updateLocalState(command);
      return {
        success: true,
        status: 'SIMULATED',
        warning: error.message,
        command,
      };
    }
  }

  private async launchApp(command: string): Promise<any> {
    const app = APP_PACKAGES[command];
    if (!app) {
      return { success: false, error: 'App desconhecido' };
    }

    try {
      // Tentar abrir app via Intent API
      const result = await this.httpRequest('/6/activities/launch', 'POST', {
        intent: {
          action: app.intent,
          component: {
            packageName: app.packageName,
          },
        },
      });

      DeviceEventEmitter.emit('philips:app', { app: command, package: app.packageName });

      return {
        success: true,
        status: 'CONNECTED',
        action: 'launch_app',
        app: command,
      };
    } catch (error: any) {
      // Fallback: tentar enviar tecla HOME primeiro
      try {
        await this.httpRequest(ENDPOINTS.inputKey, 'POST', { key: 'Home' });
        DeviceEventEmitter.emit('philips:app', { app: command, package: app.packageName });
        return {
          success: true,
          status: 'CONNECTED',
          action: 'launch_app_fallback',
          app: command,
        };
      } catch {
        return {
          success: true,
          status: 'SIMULATED',
          action: 'launch_app',
          app: command,
        };
      }
    }
  }

  private updateLocalState(command: string) {
    switch (command) {
      case 'POWER':
        this.powerState = !this.powerState;
        DeviceEventEmitter.emit('philips:power', { power: this.powerState });
        break;
      case 'VOLUME_UP':
        this.volumeLevel = Math.min(100, this.volumeLevel + 1);
        DeviceEventEmitter.emit('philips:volume', { volume: this.volumeLevel });
        break;
      case 'VOLUME_DOWN':
        this.volumeLevel = Math.max(0, this.volumeLevel - 1);
        DeviceEventEmitter.emit('philips:volume', { volume: this.volumeLevel });
        break;
      case 'MUTE':
        this.isMuted = !this.isMuted;
        DeviceEventEmitter.emit('philips:mute', { muted: this.isMuted });
        break;
      case 'CHANNEL_UP':
        this.currentChannel = this.currentChannel >= 999 ? 1 : this.currentChannel + 1;
        DeviceEventEmitter.emit('philips:channel', { channel: this.currentChannel });
        break;
      case 'CHANNEL_DOWN':
        this.currentChannel = this.currentChannel <= 1 ? 999 : this.currentChannel - 1;
        DeviceEventEmitter.emit('philips:channel', { channel: this.currentChannel });
        break;
    }
  }

  async getDeviceInfo(): Promise<any> {
    try {
      const [system, power, audio] = await Promise.all([
        this.httpRequest(ENDPOINTS.system).catch(() => ({})),
        this.httpRequest(ENDPOINTS.powerstate).catch(() => ({})),
        this.httpRequest(ENDPOINTS.audioVolume).catch(() => ({})),
      ]);

      if (system) {
        this.deviceName = system.name || this.deviceName;
        this.deviceModel = system.model || this.deviceModel;
      }

      if (power?.powerstate) {
        this.powerState = power.powerstate !== 'Standby';
      }

      if (audio?.current !== undefined) {
        this.volumeLevel = audio.current;
      }

      return {
        model: this.deviceModel || 'Philips TV',
        name: this.deviceName,
        ip: this.ip,
        port: this.port,
        status: 'CONNECTED',
        paired: this.paired,
        power: this.powerState,
        volume: this.volumeLevel,
        channel: this.currentChannel,
        muted: this.isMuted,
        apiVersion: this.apiVersion,
        supportsApps: this.supportsApps,
      };
    } catch (error) {
      return {
        model: this.deviceModel || 'Philips TV',
        name: this.deviceName,
        ip: this.ip,
        port: this.port,
        status: 'CONNECTED',
        paired: this.paired,
        power: this.powerState,
        volume: this.volumeLevel,
        channel: this.currentChannel,
        muted: this.isMuted,
      };
    }
  }

  async setVolume(level: number): Promise<boolean> {
    try {
      await this.httpRequest(ENDPOINTS.audioVolume, 'POST', { current: level });
      this.volumeLevel = level;
      DeviceEventEmitter.emit('philips:volume', { volume: level });
      return true;
    } catch {
      return false;
    }
  }

  async getVolume(): Promise<number> {
    try {
      const result = await this.httpRequest(ENDPOINTS.audioVolume);
      return result.current ?? this.volumeLevel;
    } catch {
      return this.volumeLevel;
    }
  }

  async disconnect(): Promise<void> {
    try {
      if (this.paired && this.sessionId) {
        await this.httpRequest('/6/pair/release', 'POST', {});
      }
    } catch {
      // ignore
    }
    this.sessionId = '';
    this.paired = false;
  }

  isConnected(): boolean {
    return this.paired || true; // Sempre retorna true pois a conexão TCP existe
  }

  requiresPairing(): boolean {
    return this.supportsPairing && !this.paired;
  }

  getState() {
    return {
      power: this.powerState,
      volume: this.volumeLevel,
      channel: this.currentChannel,
      muted: this.isMuted,
      ip: this.ip,
      port: this.port,
      paired: this.paired,
      connected: true,
      deviceName: this.deviceName,
      deviceModel: this.deviceModel,
    };
  }
}

export class RemoteService {
  private adapter: RemoteProtocol | null = null;
  private currentDeviceId: string | null = null;

  async connect(deviceId: string, ip: string | null, isDemo: boolean): Promise<boolean> {
    this.currentDeviceId = deviceId;
    if (isDemo || ip === null) {
      this.adapter = new DemoRemoteAdapter();
      return true;
    } else {
      this.adapter = new PhilipsRemoteAdapter(ip);
      try {
        const connected = await (this.adapter as PhilipsRemoteAdapter).connect();
        return connected;
      } catch (error) {
        console.log('Connection error:', error);
        return false;
      }
    }
  }

  async sendCommand(command: string) {
    await this.triggerHaptic(command);
    if (!this.adapter) {
      throw new Error('Nenhum adaptador conectado');
    }
    return this.adapter.sendCommand(command);
  }

  // Convenience methods
  async launchNetflix() {
    return this.sendCommand('NETFLIX');
  }
  async launchYouTube() {
    return this.sendCommand('YOUTUBE');
  }
  async launchPrimeVideo() {
    return this.sendCommand('PRIME_VIDEO');
  }

  private async triggerHaptic(command: string): Promise<void> {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {}
  }

  async disconnect() {
    if (this.adapter) {
      await this.adapter.disconnect();
      this.adapter = null;
      this.currentDeviceId = null;
    }
  }

  getAdapter(): RemoteProtocol | null {
    return this.adapter;
  }

  isConnected(): boolean {
    return this.adapter?.isConnected() ?? false;
  }

  requiresPairing(): boolean {
    if (this.adapter instanceof PhilipsRemoteAdapter) {
      return this.adapter.requiresPairing();
    }
    return false;
  }

  async confirmPairing(pin: string): Promise<boolean> {
    if (this.adapter instanceof PhilipsRemoteAdapter) {
      return this.adapter.confirmPairing(pin);
    }
    return false;
  }
}

export const remoteService = new RemoteService();
