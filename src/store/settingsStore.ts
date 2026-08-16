import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppSettings, defaultSettings } from '../types/settings';

interface SettingsState {
  settings: AppSettings;
  updateSetting: <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => void;
  setHaptic: (enabled: boolean) => void;
  setSound: (enabled: boolean) => void;
  setDemoMode: (enabled: boolean) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      settings: defaultSettings,

      updateSetting: (key, value) =>
        set((state) => ({
          settings: { ...state.settings, [key]: value },
        })),

      setHaptic: (enabled) =>
        set((state) => ({
          settings: { ...state.settings, hapticEnabled: enabled },
        })),

      setSound: (enabled) =>
        set((state) => ({
          settings: { ...state.settings, soundEnabled: enabled },
        })),

      setDemoMode: (enabled) =>
        set((state) => ({
          settings: { ...state.settings, demoMode: enabled },
        })),
    }),
    {
      name: 'settings-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);