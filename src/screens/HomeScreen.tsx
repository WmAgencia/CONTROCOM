import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  StatusBar,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { useDeviceStore } from '../store/deviceStore';
import { useSettingsStore } from '../store/settingsStore';
import { COLORS, SPACING } from '../utils/constants';

interface HomeScreenProps {
  onFindTV: () => void;
  onDemoMode: () => void;
  onDevices: () => void;
  onRemote: () => void;
}

export function HomeScreen({ onFindTV, onDemoMode, onDevices, onRemote }: HomeScreenProps) {
  const { devices, ensureDemoDevice } = useDeviceStore();
  const { settings } = useSettingsStore();
  const defaultDevice = devices.find((d) => d.isDefault) || devices[0];

  React.useEffect(() => {
    ensureDemoDevice();
  }, []);

  const ConnectedCard = () => (
    <Pressable
      style={styles.connectedCard}
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
        onRemote();
      }}
    >
      <View style={styles.connectedRow}>
        <View style={styles.connectedIcon}>
          <Text style={styles.connectedTVIcon}>📺</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.connectedName}>
            {defaultDevice?.name || 'Philips Sala'}
          </Text>
          <Text style={styles.connectedModel}>{defaultDevice?.model || '43PFG5100/78'}</Text>
          <Text style={[
            styles.connectedStatus,
            { color: settings.demoMode ? COLORS.primary : COLORS.success }
          ]}>
            {settings.demoMode ? '● Modo demonstração' : '● Conectada'}
          </Text>
        </View>
        <Text style={styles.chevron}>›</Text>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.logoIcon}>📱</Text>
          <Text style={styles.logoText}>CONTROCOM</Text>
          <Text style={styles.tagline}>Controle sua TV pelo celular</Text>
        </View>

        <ConnectedCard />

        <View style={styles.section}>
          <Pressable
            style={[styles.actionBtn, styles.primaryBtn]}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
              onFindTV();
            }}
          >
            <Text style={styles.primaryBtnText}>🔍 ENCONTRAR MINHA TV</Text>
          </Pressable>

          <Pressable
            style={[styles.actionBtn, styles.secondaryBtn]}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
              onDemoMode();
            }}
          >
            <Text style={styles.secondaryBtnText}>
              🎮 MODO DEMONSTRAÇÃO
            </Text>
          </Pressable>

          <Pressable
            style={[styles.actionBtn, styles.tertiaryBtn]}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
              onDevices();
            }}
          >
            <Text style={styles.tertiaryBtnText}>📋 DISPOSITIVOS</Text>
          </Pressable>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Philips 43PFG5100/78</Text>
          <Text style={styles.infoText}>
            Controle sua Smart TV pela rede Wi-Fi local.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const Spacng = SPACING;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 20,
  },
  logoIcon: {
    fontSize: 52,
    marginBottom: 8,
  },
  logoText: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: 2,
  },
  tagline: {
    color: '#8e8e93',
    fontSize: 14,
    marginTop: 4,
  },
  connectedCard: {
    backgroundColor: '#1c1c1e',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  connectedRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  connectedIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#2c2c2e',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  connectedTVIcon: {
    fontSize: 22,
  },
  connectedName: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  connectedModel: {
    color: '#8e8e93',
    fontSize: 12,
    marginTop: 1,
  },
  connectedStatus: {
    fontSize: 13,
    fontWeight: '500',
    marginTop: 2,
  },
  chevron: {
    color: '#636366',
    fontSize: 24,
    marginLeft: 8,
  },
  section: {
    gap: 12,
    marginBottom: 20,
  },
  actionBtn: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  primaryBtn: {
    backgroundColor: '#007aff',
  },
  primaryBtnText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  secondaryBtn: {
    backgroundColor: '#1c1c1e',
    borderWidth: 1,
    borderColor: '#007aff',
  },
  secondaryBtnText: {
    color: '#007aff',
    fontSize: 15,
    fontWeight: '600',
  },
  tertiaryBtn: {
    backgroundColor: '#1c1c1e',
  },
  tertiaryBtnText: {
    color: '#8e8e93',
    fontSize: 15,
    fontWeight: '500',
  },
  infoBox: {
    backgroundColor: '#1c1c1e',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  infoTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  infoText: {
    color: '#8e8e93',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
  },
});