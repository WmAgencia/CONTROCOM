export interface AppSettings {
  hapticEnabled: boolean;
  soundEnabled: boolean;
  demoMode: boolean;
  showNumericPad: boolean;
  showShortcuts: boolean;
  lastSelectedDeviceId: string | null;
}

export const defaultSettings: AppSettings = {
  hapticEnabled: true,
  soundEnabled: false,
  demoMode: true,
  showNumericPad: false,
  showShortcuts: true,
  lastSelectedDeviceId: null,
};