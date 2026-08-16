import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { useDeviceStore } from '../store/deviceStore';
import { useSettingsStore } from '../store/settingsStore';
import { DeviceCard } from '../components/DeviceCard';
import { remoteService } from '../services/RemoteService';
import { DeviceDiscoveryService } from '../services/DeviceDiscoveryService';
import { COLORS, SPACING } from '../utils/constants';

interface DevicesScreenProps {
  onBack: () => void;
  onConnect: (deviceId: string) => void;
}

export function DevicesScreen({ onBack, onConnect }: DevicesScreenProps) {
  const { devices, removeDevice, updateDevice, selectDevice, selectedDeviceId } = useDeviceStore();
  const { settings, setDemoMode } = useSettingsStore();
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState('');
  const [newIp, setNewIp] = useState('');
  const discoveryService = DeviceDiscoveryService;

  const handleConnect = async (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    const device = devices.find((d) => d.id === id);
    if (!device) return;

    selectDevice(id);
    if (device.status === 'DEMO') {
      await remoteService.connect(id, null, true);
      setDemoMode(true);
    } else {
      setDemoMode(false);
      await remoteService.connect(id, device.ip, false);
    }
    onConnect(id);
  };

  const handleRemove = (id: string) => {
    Alert.alert('Remover dispositivo', 'Deseja remover este dispositivo da lista?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Remover',
        style: 'destructive',
        onPress: () => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
          removeDevice(id);
        },
      },
    ]);
  };

  const handleRename = (id: string) => {
    const device = devices.find((d) => d.id === id);
    if (!device) return;
    Alert.prompt(
      'Renomear dispositivo',
      'Digite o novo nome:',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Salvar',
          onPress: (name?: string) => {
            if (name && name.trim()) {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
              updateDevice(id, { name: name.trim() });
            }
          },
        },
      ],
      'plain-text',
      device.name
    );
  };

  const handleSelectDefault = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    devices.forEach((d) => updateDevice(d.id, { isDefault: d.id === id }));
  };

  const handleAddManual = () => {
    Alert.prompt(
      'Dispositivo IP',
      'Digite o IP da TV:',
      [
        { text: 'Cancelar', style: 'cancel' },
{
            text: 'Conectar',
            onPress: (ip?: string) => {
              if (ip && ip.trim()) {
                const newDevice = {
                  id: 'manual-' + Date.now(),
                  name: 'Nova TV',
                  model: 'Philips 43PFG5100/78',
                  ip: ip.trim(),
                  status: 'DISCONNECTED' as any,
                  isDefault: false,
                };
                useDeviceStore.getState().addDevice(newDevice);
              }
            },
          },
      ],
      'plain-text',
      '192.168.1.'
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable
          hitSlop={10}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
            onBack();
          }}
        >
          <Text style={styles.backBtn}>←</Text>
        </Pressable>
        <Text style={styles.title}>Dispositivos</Text>
        <Pressable
          hitSlop={10}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
            handleAddManual();
          }}
        >
          <Text style={styles.addBtn}>+</Text>
        </Pressable>
      </View>

      <View style={styles.content}>
        {settings.demoMode && (
          <Pressable
            style={styles.demoBadge}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
              handleConnect('demo');
            }}
          >
            <Text style={styles.demoIcon}>📱</Text>
            <View>
              <Text style={styles.demoName}>Modo demonstração</Text>
              <Text style={styles.demoSub}>Philips 43PFG5100/78</Text>
              <Text style={styles.demoStatus}>● Pronto para uso</Text>
            </View>
          </Pressable>
        )}

        <View style={styles.sectionLabel}>
          <Text style={styles.sectionLabelText}>MINHAS TVs</Text>
        </View>

        {devices
          .filter((d) => d.id !== 'demo')
          .map((device) => (
            <DeviceCard
              key={device.id}
              device={device}
              onConnect={handleConnect}
              onRemove={handleRemove}
              onRename={handleRename}
              onSelectDefault={handleSelectDefault}
            />
          ))}

        {devices.filter((d) => d.id !== 'demo').length === 0 && (
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>📺</Text>
            <Text style={styles.emptyText}>Nenhuma TV adicionada</Text>
            <Text style={styles.emptySub}>
              Adicione manualmente ou busque na rede local.
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const Spacng = SPACING;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.3,
    borderBottomColor: '#2c2c2e',
  },
  backBtn: {
    color: '#007aff',
    fontSize: 22,
    width: 28,
  },
  title: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '600',
  },
  addBtn: {
    color: '#007aff',
    fontSize: 28,
    fontWeight: '300',
    width: 28,
    textAlign: 'right',
  },
  content: {
    flex: 1,
  },
  demoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1c1c1e',
    borderRadius: 12,
    padding: 14,
    marginHorizontal: 12,
    marginVertical: 8,
  },
  demoIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  demoName: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  demoSub: {
    color: '#007aff',
    fontSize: 12,
    marginTop: 1,
  },
  demoStatus: {
    color: '#34c759',
    fontSize: 12,
    marginTop: 3,
  },
  sectionLabel: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 6,
  },
  sectionLabelText: {
    color: '#636366',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.2,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    color: '#8e8e93',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  emptySub: {
    color: '#636366',
    fontSize: 13,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});