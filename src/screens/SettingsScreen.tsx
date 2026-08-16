import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Switch,
  Alert,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { useSettingsStore } from '../store/settingsStore';
import { useDeviceStore } from '../store/deviceStore';
import { COLORS, SPACING } from '../utils/constants';

interface SettingsScreenProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

export function SettingsScreen({ onBack, onNavigate }: SettingsScreenProps) {
  const { settings, setHaptic, setSound, setDemoMode } = useSettingsStore();
  const colorScheme = useColorScheme();

  const handleToggleHaptic = (value: boolean) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    setHaptic(value);
  };

  const handleToggleSound = (value: boolean) => {
    setSound(value);
  };

  const handleToggleDemo = (value: boolean) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    setDemoMode(value);
  };

  const SettingRow = ({
    title,
    description,
    right,
    onPress,
    danger = false,
  }: {
    title: string;
    description?: string;
    right?: React.ReactNode;
    onPress?: () => void;
    danger?: boolean;
  }) => (
    <Pressable
      style={styles.row}
      onPress={onPress}
      disabled={!onPress}
      hitSlop={4}
    >
      <View style={styles.rowInfo}>
        <Text
          style={[styles.rowTitle, danger && styles.dangerText]}
          numberOfLines={1}
        >
          {title}
        </Text>
        {description && (
          <Text style={styles.rowDesc} numberOfLines={1}>
            {description}
          </Text>
        )}
      </View>
      {right}
    </Pressable>
  );

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
        <Text style={styles.title}>Configurações</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>DISPOSITIVO</Text>
          <SettingRow
            title="Dispositivos"
            description="Gerenciar TVs conectadas"
            onPress={() => onNavigate('dispositivos')}
          />
          <SettingRow
            title="Modo demonstração"
            right={
              <Switch
                value={settings.demoMode}
                onValueChange={handleToggleDemo}
                trackColor={{ false: '#3a3a3d', true: '#007aff' }}
                thumbColor="#ffffff"
              />
            }
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>EXPERIÊNCIA</Text>
          <SettingRow
            title="Vibração"
            description="Feedback háptico nos botões"
            right={
              <Switch
                value={settings.hapticEnabled}
                onValueChange={handleToggleHaptic}
                trackColor={{ false: '#3a3a3d', true: '#007aff' }}
                thumbColor="#ffffff"
              />
            }
          />
          <SettingRow
            title="Som dos botões"
            description="Efeitos sonoros ao pressionar"
            right={
              <Switch
                value={settings.soundEnabled}
                onValueChange={handleToggleSound}
                trackColor={{ false: '#3a3a3d', true: '#007aff' }}
                thumbColor="#ffffff"
              />
            }
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>INFORMAÇÕES</Text>
          <SettingRow
            title="Diagnóstico"
            description="Ver status e logs"
            onPress={() => onNavigate('diagnostico')}
          />
          <SettingRow
            title="Sobre"
            description="CONTROCOM v1.0.0"
            onPress={() =>
              Alert.alert(
                'CONTROCOM',
                'Controle remoto inteligente para Smart TVs.\n\nVersão: 1.0.0\n\nDevice: Philips 43PFG5100/78'
              )
            }
          />
        </View>
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
  content: {
    flex: 1,
  },
  section: {
    marginHorizontal: 12,
    marginVertical: 8,
    backgroundColor: '#1c1c1e',
    borderRadius: 12,
    overflow: 'hidden',
  },
  sectionLabel: {
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 4,
  },
  sectionLabelText: {
    color: '#636366',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 0.3,
    borderBottomColor: '#2c2c2e',
  },
  rowInfo: {
    flex: 1,
    marginRight: 12,
  },
  rowTitle: {
    color: '#ffffff',
    fontSize: 15,
  },
  rowDesc: {
    color: '#8e8e93',
    fontSize: 13,
    marginTop: 1,
  },
  dangerText: {
    color: '#ff3b30',
  },
});