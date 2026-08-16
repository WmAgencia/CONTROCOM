import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { COLORS, SPACING } from '../utils/constants';

interface DiagnosticScreenProps {
  onBack: () => void;
}

export function DiagnosticsScreen({ onBack }: DiagnosticScreenProps) {
  const [logs, setLogs] = useState<Array<{ time: string; type: string; message: string }>>([
    { time: '12:31:20', type: 'COMMAND', message: 'VOLUME_UP' },
    { time: '12:31:20', type: 'STATUS', message: 'DEMO' },
    { time: '12:30:00', type: 'CONNECTION', message: 'Modo demonstração ativo' },
  ]);
  const logsEnd = useRef<View>(null);

  const clearLogs = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    setLogs([]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
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
        <Text style={styles.title}>Diagnóstico</Text>
        <Pressable
          hitSlop={10}
          onPress={clearLogs}
        >
          <Text style={styles.clearBtn}>Limpar</Text>
        </Pressable>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Modelo</Text>
          <Text style={styles.infoValue}>Philips 43PFG5100/78</Text>
        </View>
        <View style={styles.infoRow}>
          <View style={[styles.infoCard, { flex: 1 }]}>
            <Text style={styles.infoLabel}>IP</Text>
            <Text style={styles.infoValue}>--</Text>
          </View>
          <View style={[styles.infoCard, { flex: 1 }]}>
            <Text style={styles.infoLabel}>Status</Text>
            <Text style={[styles.infoValue, { color: COLORS.primary }]}>
              Modo demonstração
            </Text>
          </View>
        </View>
        <View style={styles.infoRow}>
          <View style={[styles.infoCard, { flex: 1 }]}>
            <Text style={styles.infoLabel}>Protocolo</Text>
            <Text style={[styles.infoValue, { color: COLORS.warning }]}>
              Não configurado
            </Text>
          </View>
          <View style={[styles.infoCard, { flex: 1 }]}>
            <Text style={styles.infoLabel}>Último comando</Text>
            <Text style={styles.infoValue}>--</Text>
          </View>
        </View>
        <View style={styles.infoRow}>
          <View style={[styles.infoCard, { flex: 1 }]}>
            <Text style={styles.infoLabel}>Última resposta</Text>
            <Text style={styles.infoValue}>--</Text>
          </View>
          <View style={[styles.infoCard, { flex: 1 }]}>
            <Text style={styles.infoLabel}>Latência</Text>
            <Text style={styles.infoValue}>--</Text>
          </View>
        </View>

        <View style={styles.logHeader}>
          <Text style={styles.logTitle}>LOG DE COMANDOS</Text>
        </View>

        {logs.map((log, i) => (
          <View key={i} style={styles.logRow}>
            <Text style={styles.logTime}>[{log.time}]</Text>
            <Text style={styles.logType}>{log.type}:</Text>
            <Text style={styles.logMessage}>{log.message}</Text>
          </View>
        ))}

        {logs.length === 0 && (
          <Text style={styles.emptyLog}>Nenhum log.</Text>
        )}
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
    width: 60,
  },
  title: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '600',
  },
  clearBtn: {
    color: '#007aff',
    fontSize: 15,
    fontWeight: '600',
    width: 60,
    textAlign: 'right',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  infoRow: {
    flexDirection: 'row',
    marginHorizontal: 12,
    gap: 12,
  },
  infoCard: {
    backgroundColor: '#1c1c1e',
    borderRadius: 10,
    padding: 12,
    marginVertical: 4,
  },
  infoLabel: {
    color: '#636366',
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 2,
  },
  infoValue: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  logHeader: {
    paddingHorizontal: 4,
    marginTop: 16,
    marginBottom: 6,
  },
  logTitle: {
    color: '#636366',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.2,
  },
  logRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#1c1c1e',
    borderRadius: 8,
    padding: 10,
    marginVertical: 2,
  },
  logTime: {
    color: '#636366',
    fontSize: 11,
    fontFamily: 'monospace',
    marginRight: 6,
  },
  logType: {
    color: '#007aff',
    fontSize: 12,
    fontWeight: '600',
    marginRight: 6,
  },
  logMessage: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'monospace',
    flex: 1,
  },
  emptyLog: {
    color: '#636366',
    fontSize: 13,
    textAlign: 'center',
    paddingVertical: 16,
  },
});