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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { COLORS, SPACING } from '../utils/constants';
import { NetworkDevice } from '../services/DeviceDiscoveryService';

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
  const [devices, setDevices] = useState<any[]>([]);
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
    setStatus('Procurando dispositivos na rede Wi-Fi...');
    setDevices([]);
  };

  const handleConnect = (device: NetworkDevice) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    onDeviceFound({ ...device, status: 'DEMO' });
  };

  // Simulated device injection (would come from service in real app)
  useEffect(() => {
    const timer = setTimeout(() => {
      const simulated = [
        {
          id: 'dev-001',
          name: 'Philips Sala',
          model: '43PFG5100/78',
          brand: 'Philips',
          ip: '192.168.1.45',
          status: 'DISCONNECTED',
        },
        {
          id: 'dev-002',
          name: 'LG Quarto',
          model: '43UN7300',
          brand: 'LG',
          ip: '192.168.1.87',
          status: 'DISCONNECTED',
        },
        {
          id: 'dev-003',
          name: 'Samsung Living',
          model: 'TU8000',
          brand: 'Samsung',
          ip: '192.168.1.103',
          status: 'DISCONNECTED',
        },
      ];
      setDevices(simulated);
      setStatus(`${simulated.length} dispositivo(s) encontrado(s). Escolha qualquer um.`);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

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
        <View style={{ width: 30 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
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

        <Text style={styles.hint}>
          Seu celular e o dispositivo devem estar na mesma rede Wi-Fi. Qualquer marca ou modelo pode ser conectado.
        </Text>

        {devices.length > 0 && (
          <View style={styles.deviceList}>
            <Text style={styles.deviceListTitle}>DISPOSITIVOS ENCONTRADOS</Text>
            {devices.map((device) => (
              <Pressable
                key={device.id}
                style={styles.deviceRow}
                onPress={() => handleConnect(device)}
              >
                <View style={styles.deviceRowIcon}>
                  <Text style={styles.deviceRowIconText}>📺</Text>
                </View>
                <View style={styles.deviceRowInfo}>
                  <Text style={styles.deviceRowName}>
                    {device.name} <Text style={styles.deviceRowBrand}>({device.brand})</Text>
                  </Text>
                  <Text style={styles.deviceRowModel}>{device.model}</Text>
                  <Text style={styles.deviceRowIP}>{device.ip}</Text>
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

        <Pressable
          style={styles.skipBtn}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
            onSkipToDemo();
          }}
        >
          <Text style={styles.skipBtnText}>MODO DEMONSTRAÇÃO</Text>
        </Pressable>

        <Pressable
          style={styles.retryBtn}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
            setDevices([]);
            startSearch();
          }}
        >
          <Text style={styles.retryBtnText}>Tentar novamente</Text>
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
  },
  hint: {
    color: '#8e8e93',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
    paddingHorizontal: 16,
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