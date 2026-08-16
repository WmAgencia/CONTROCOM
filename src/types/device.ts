export type ConnectionStatus = 'DISCONNECTED' | 'CONNECTING' | 'CONNECTED' | 'ERROR' | 'DEMO';

export interface TVDevice {
  id: string;
  name: string;
  model: string;
  ip: string | null;
  status: ConnectionStatus;
  isDefault: boolean;
  lastSeen?: string;
}