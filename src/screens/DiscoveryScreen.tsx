import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  StatusBar,
  Animated,
  Easing,
  ActivityIndicator,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { COLORS, SPACING } from '../utils/constants';
import { deviceDiscoveryService, NetworkDevice, DiscoveredTV } from '../services/DeviceDiscoveryService';

interface DiscoveryScreenProps {
  onDeviceFound: (device: any) => void;
  onSkipToDemo: () => void;
  onBack: () => void;
}

export function DiscoveryScreen({
  onDeviceFound,
  onSkipToDemo,
  onBack,
}: DiscoveryScreenProps) {
  const [status, setStatus] = useState<string>('Inicializando...');
  const [searching, setSearching] = useState(false);
  const [devices, setDevices] = useState<NetworkDevice[]>([]);
  const [manualIp, setManualIp] = useState('');
  const [showManual, setShowManual] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const spinAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startSearch();
  }, []);

  useEffect(() => {
    if (searching) {
      Animated.loop(
        Animated.timing(spinAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    }
  }, [searching]);

  const startSearch = async () => {
    setSearching(true);
    setStatus('Escaneando rede Wi-Fi em busca de TVs Philips...');
    setDevices([]);

    // Configurar callbacks do serviço
    const service = new (require('../services/DeviceDiscoveryService').DeviceDiscoveryService)(
      (device: NetworkDevice) => {
        setDevices((prev) => {
          if (prev.find((d) => d.id === device.id)) return prev;
          return [...prev, device];
        });
      },
      (statusMsg: string) => setStatus(statusMsg),
      (tv: DiscoveredTV) => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
      }
    );

    // Iniciar scan REAL
    setScanning(true);
    setProgress({ current: 0, total: 508 });

    const found = await service.quickScan((current: number, total: number) => {
      setProgress({ current, total });
    });

    setScanning(false);

    if (found.length > 0) {
      setStatus(`✅ ${found.length} TV(s) Philips encontrada(s)!`);
    } else {
      setStatus('Nenhuma TV Philips encontrada. Adicione manualmente ou use o modo demo.');
      // Adicionar devices demo como fallback
      const demoDevices: NetworkDevice[] = [
        {
          id: 'dev-philips',
          name: 'Philips Sala',
          model: '43PFG5100/78',
          brand: 'Philips',
          ip: '192.168.1.45',
          port: 1925,
          status: 'FOUND',
          supportsJointSpace: true,
        },
        {
          id: 'dev-lg',
          name: 'LG Quarto',
          model: '43UN7300',
          brand: 'LG',
          ip: '192.168.1.87',
          port: 1925,
          status: 'FOUND',
        },
        {
          id: 'dev-samsung',
          name: 'Samsung Living',
          model: 'TU8000',
          brand: 'Samsung',
          ip: '192.168.1.103',
          port: 1925,
          status: 'FOUND',
        },
      ];

      setTimeout(() => {
        setDevices(demoDevices);
        setStatus('Dispositivos de exemplo. Configure o IP da sua TV para controle real.');
      }, 1000);
    }
  };

  const handleConnect = (device: NetworkDevice) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    onDeviceFound({
      ...device,
      status: 'CONNECTED',
      isDemo: !device.supportsJointSpace,
    });
  };

  const handleManualAdd = async () => {
    if (!manualIp.trim()) {
      Alert.alert('IP inválido', 'Digite o IP da sua TV (ex: 192.168.1.45)');
      return;
    }

    setScanning(true);
    setStatus(`Testando ${manualIp}...`);

    const service = new (require('../services/DeviceDiscoveryService').DeviceDiscoveryService)(
      (device: NetworkDevice) => {
        setDevices((prev) => {
          if (prev.find((d) => d.id === device.id)) return prev;
          return [...prev, device];
        });
      },
      (statusMsg: string) => setStatus(statusMsg)
    );

    const result = await service.addManualDevice(manualIp);

    setScanning(false);

    if (result) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
      setManualIp('');
      setShowManual(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <View style={styles.header}>
        <Pressable
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
            onBack();
          }}
          hitSlop={10}
        >
          <Text style={styles.backBtn}>←</Text>
        </Pressable>
        <Text style={styles.title}>Encontrar minha TV</Text>
        <Pressable
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
            setShowManual(!showManual);
          }}
          hitSlop={10}
        >
          <Text style={styles.addBtn}>+</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Radar icon */}
        <View style={styles.iconContainer}>
          <Animated.Text
            style={[
              styles.radarIcon,
              {
                transform: [
                  {
                    rotate: spinAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '360deg'],
                    }),
                  },
                ],
              },
            ]}
          >
            🔍
          </Animated.Text>
        </View>

        <Text style={styles.statusText}>{status}</Text>

        {/* Progress bar during scan */}
        {scanning && progress.total > 0 && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${(progress.current / progress.total) * 100}%` },
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              {progress.current} / {progress.total} IPs
            </Text>
          </View>
        )}

        <Text style={styles.hint}>
          Seu celular e a TV devem estar na mesma rede Wi-Fi. TVs Philips suportam conexão direta pela porta 1925.
        </Text>

        {/* Manual IP Input */}
        {showManual && (
          <View style={styles.manualCard}>
            <Text style={styles.manualTitle}>Adicionar TV manualmente</Text>
            <Text style={styles.manualSubtitle}>
              Encontre o IP nas configurações de rede da sua TV
            </Text>
            <View style={styles.manualInputRow}>
              <TextInput
                style={styles.manualInput}
                placeholder="192.168.1.45"
                placeholderTextColor="#666"
                value={manualIp}
                onChangeText={setManualIp}
                keyboardType="numeric"
                autoCapitalize="none"
              />
              <Pressable
                style={styles.manualBtn}
                onPress={handleManualAdd}
                disabled={scanning}
              >
                <Text style={styles.manualBtnText}>Testar</Text>
              </Pressable>
            </View>
          </View>
        )}

        {/* Devices list */}
        {devices.length > 0 && (
          <View style={styles.deviceList}>
            <Text style={styles.deviceListTitle}>
              DISPOSITIVOS ENCONTRADOS ({devices.length})
            </Text>
            {devices.map((device) => (
              <Pressable
                key={device.id}
                style={styles.deviceRow}
                onPress={() => handleConnect(device)}
              >
                <View style={styles.deviceRowIcon}>
                  <Text style={styles.deviceRowIconText}>
                    {device.supportsJointSpace ? '📡' : '📺'}
                  </Text>
                </View>
                <View style={styles.deviceRowInfo}>
                  <Text style={styles.deviceRowName}>
                    {device.name}{' '}
                    <Text style={styles.deviceRowBrand}>({device.brand})</Text>
                  </Text>
                  <Text style={styles.deviceRowModel}>{device.model}</Text>
                  <Text style={styles.deviceRowIP}>
                    {device.ip}:{device.port}
                    {device.supportsJointSpace && (
                      <Text style={styles.jointSpaceBadge}> • JointSpace ✓</Text>
                    )}
                  </Text>
                </View>
                <Text style={styles.deviceRowConnect}>Conectar ›</Text>
              </Pressable>
            ))}
          </View>
        )}

        {searching && devices.length === 0 && (
          <View style={styles.searchingRow}>
            <ActivityIndicator size="large" color="#007aff" />
          </View>
        )}

        {/* Action buttons */}
        <Pressable
          style={styles.skipBtn}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
            onSkipToDemo();
          }}
        >
          <Text style={styles.skipBtnText}>🎮 MODO DEMONSTRAÇÃO</Text>
        </Pressable>

        <Pressable
          style={styles.retryBtn}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
            setDevices([]);
            startSearch();
          }}
        >
          <Text style={styles.retryBtnText}>� Buscar novamente</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

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
    width: 30,
  },
  title: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '600',
  },
  addBtn: {
    color: '#007aff',
    fontSize: 28,
    width: 30,
    textAlign: 'right',
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#1c1c1e',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  radarIcon: {
    fontSize: 48,
  },
  statusText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  hint: {
    color: '#8e8e93',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
    paddingHorizontal: 16,
  },
  progressContainer: {
    width: '100%',
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#1c1c1e',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007aff',
  },
  progressText: {
    color: '#8e8e93',
    fontSize: 12,
    textAlign: 'center',
  },
  manualCard: {
    width: '100%',
    backgroundColor: '#1c1c1e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  manualTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  manualSubtitle: {
    color: '#8e8e93',
    fontSize: 13,
    marginBottom: 12,
  },
  manualInputRow: {
    flexDirection: 'row',
    gap: 8,
  },
  manualInput: {
    flex: 1,
    backgroundColor: '#2c2c2e',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#ffffff',
    fontSize: 14,
  },
  manualBtn: {
    backgroundColor: '#007aff',
    borderRadius: 8,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  manualBtnText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  deviceList: {
    width: '100%',
    marginBottom: 16,
  },
  deviceListTitle: {
    color: '#636366',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 8,
  },
  deviceRow: {
    backgroundColor: '#1c1c1e',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  deviceRowIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#2c2c2e',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  deviceRowIconText: {
    fontSize: 22,
  },
  deviceRowInfo: {
    flex: 1,
  },
  deviceRowName: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  deviceRowBrand: {
    color: '#8e8e93',
    fontWeight: '400',
  },
  deviceRowModel: {
    color: '#8e8e93',
    fontSize: 12,
    marginTop: 1,
  },
  deviceRowIP: {
    color: '#636366',
    fontSize: 11,
    marginTop: 1,
  },
  jointSpaceBadge: {
    color: '#34c759',
    fontWeight: '600',
  },
  deviceRowConnect: {
    color: '#007aff',
    fontSize: 14,
    fontWeight: '600',
  },
  skipBtn: {
    backgroundColor: '#1c1c1e',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 32,
    marginBottom: 12,
    alignItems: 'center',
    width: '100%',
  },
  skipBtnText: {
    color: '#007aff',
    fontSize: 15,
    fontWeight: '600',
  },
  retryBtn: {
    paddingVertical: 12,
  },
  retryBtnText: {
    color: '#636366',
    fontSize: 14,
  },
  searchingRow: {
    alignItems: 'center',
    paddingVertical: 32,
  },
});
