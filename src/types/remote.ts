export enum RemoteCommand {
  POWER = 'POWER',
  VOLUME_UP = 'VOLUME_UP',
  VOLUME_DOWN = 'VOLUME_DOWN',
  MUTE = 'MUTE',
  CHANNEL_UP = 'CHANNEL_UP',
  CHANNEL_DOWN = 'CHANNEL_DOWN',
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  OK = 'OK',
  HOME = 'HOME',
  BACK = 'BACK',
  MENU = 'MENU',
  SOURCE = 'SOURCE',
  PLAY = 'PLAY',
  PAUSE = 'PAUSE',
  REWIND = 'REWIND',
  FORWARD = 'FORWARD',
  NUMBER_0 = 'NUMBER_0',
  NUMBER_1 = 'NUMBER_1',
  NUMBER_2 = 'NUMBER_2',
  NUMBER_3 = 'NUMBER_3',
  NUMBER_4 = 'NUMBER_4',
  NUMBER_5 = 'NUMBER_5',
  NUMBER_6 = 'NUMBER_6',
  NUMBER_7 = 'NUMBER_7',
  NUMBER_8 = 'NUMBER_8',
  NUMBER_9 = 'NUMBER_9',
  // App shortcuts
  NETFLIX = 'NETFLIX',
  YOUTUBE = 'YOUTUBE',
  PRIME = 'PRIME_VIDEO',
}

export interface CommandResult {
  success: boolean;
  status: string;
  latency?: number;
  response?: string;
}