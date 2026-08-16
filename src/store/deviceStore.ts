import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TVDevice, ConnectionStatus } from '../types/device';
import { RemoteCommand } from '../types/remote';

const DEMO_DEVICE: TVDevice = {
  id: 'demo',
  name: 'Philips Sala',
  model: '43PFG5100/78',
  ip: null,
  status: 'DEMO',
  isDefault: true,
};

interface DeviceState {
  devices: TVDevice[];
  selectedDeviceId: string | null;
  addDevice: (device: TVDevice) => void;
  removeDevice: (id: string) => void;
  updateDevice: (id: string, updates: Partial<TVDevice>) => void;
  selectDevice: (id: string) => void;
  setConnectionStatus: (id: string, status: ConnectionStatus) => void;
  ensureDemoDevice: () => void;
  getSelectedDevice: () => TVDevice | null;
}

export const useDeviceStore = create<DeviceState>()(
  persist(
    (set, get) => ({
      devices: [],
      selectedDeviceId: null,

      ensureDemoDevice: () => {
        const { devices } = get();
        const hasDemo = devices.some((d) => d.id === 'demo');
        if (!hasDemo) {
          set({ devices: [DEMO_DEVICE], selectedDeviceId: 'demo' });
        }
      },

      addDevice: (device) =>
        set((state) => ({
          devices: [...state.devices, device],
        })),

      removeDevice: (id) =>
        set((state) => ({
          devices: state.devices.filter((d) => d.id !== id),
          selectedDeviceId:
            state.selectedDeviceId === id
              ? state.devices.find((d) => d.id !== id)?.id || null
              : state.selectedDeviceId,
        })),

      updateDevice: (id, updates) =>
        set((state) => ({
          devices: state.devices.map((d) =>
            d.id === id ? { ...d, ...updates } : d
          ),
        })),

      selectDevice: (id) => set({ selectedDeviceId: id }),

      setConnectionStatus: (id, status) =>
        set((state) => ({
          devices: state.devices.map((d) =>
            d.id === id ? { ...d, status } : d
          ),
        })),

      getSelectedDevice: () => {
        const { devices, selectedDeviceId } = get();
        return devices.find((d) => d.id === selectedDeviceId) || null;
      },
    }),
    {
      name: 'device-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);