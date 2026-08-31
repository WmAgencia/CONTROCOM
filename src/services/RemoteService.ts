import { DeviceEventEmitter, Platform } from 'react-native';
import * as Haptics from 'expo-haptics';

export abstract class RemoteProtocol {
  abstract sendCommand(command: string): Promise<any>;
  abstract getDeviceInfo(): Promise<any>;
  abstract disconnect(): Promise<void>;
}

export class DemoRemoteAdapter extends RemoteProtocol {
  private volume: number = 20;
  private channel: number = 1;
  private power: boolean = true;
  private muted: boolean = false;

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
        DeviceEventEmitter.emit('demo:app', { app: 'Netflix' });
        return { success: true, status: 'DEMO', app: 'Netflix' };
      case 'YOUTUBE':
        DeviceEventEmitter.emit('demo:app', { app: 'YouTube' });
        return { success: true, status: 'DEMO', app: 'YouTube' };
      case 'PRIME_VIDEO':
        DeviceEventEmitter.emit('demo:app', { app: 'Prime Video' });
        return { success: true, status: 'DEMO', app: 'Prime Video' };
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
    };
  }

  async disconnect(): Promise<void> {
    return Promise.resolve();
  }

  getState() {
    return {
      power: this.power,
      volume: this.volume,
      channel: this.channel,
      muted: this.muted,
    };
  }
}

export class PhilipsRemoteAdapter extends RemoteProtocol {
  private ip: string;
  private port: number = 1925;
  private timeout: number = 3000;

  constructor(ip: string) {
    super();
    this.ip = ip;
  }

  async sendCommand(command: string): Promise<any> {
    throw new Error(
      'Protocolo Philips não configurado. Implementar após investigação do protocolo da TV Philips 43PFG5100/78.'
    );
  }

  async getDeviceInfo(): Promise<any> {
    throw new Error(
      'Protocolo Philips não configurado. Implementar após investigação do protocolo da TV Philips 43PFG5100/78.'
    );
  }

  async disconnect(): Promise<void> {
    return Promise.resolve();
  }
}

export class RemoteService {
  private adapter: RemoteProtocol | null = null;
  private currentDeviceId: string | null = null;

  async connect(deviceId: string, ip: string | null, isDemo: boolean): Promise<void> {
    this.currentDeviceId = deviceId;
    if (isDemo || ip === null) {
      this.adapter = new DemoRemoteAdapter();
    } else {
      this.adapter = new PhilipsRemoteAdapter(ip);
    }
  }

  async sendCommand(command: string) {
    await this.triggerHaptic(command);
    if (!this.adapter) {
      throw new Error('Nenhum adaptador de comunicação conectado. Use modo demonstração.');
    }
    return this.adapter.sendCommand(command);
  }

  // Convenience methods for app shortcuts
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
    if (Platform.OS === 'ios') {
      try {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } catch (e) {
        // noop
      }
    } else {
      try {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } catch (e) {
        // noop
      }
    }
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
}

export const remoteService = new RemoteService();