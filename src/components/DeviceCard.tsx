import React from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import * as Haptics from 'expo-haptics';
import { TVDevice, ConnectionStatus } from '../types/device';

const statusConfig: Record<ConnectionStatus, { color: string; text: string; dot: string }> = {
  CONNECTED: { color: '#34c759', text: 'Conectada', dot: '●' },
  CONNECTING: { color: '#ff9500', text: 'Conectando...', dot: '◌' },
  DISCONNECTED: { color: '#8e8e93', text: 'Desconectada', dot: '○' },
  ERROR: { color: '#ff3b30', text: 'Erro na conexão', dot: '✕' },
  DEMO: { color: '#007aff', text: 'Modo demonstração', dot: '●' },
};

interface DeviceCardProps {
  device: TVDevice;
  onConnect: (id: string) => void;
  onRemove: (id: string) => void;
  onRename: (id: string) => void;
  onSelectDefault: (id: string) => void;
}

export function DeviceCard({
  device,
  onConnect,
  onRemove,
  onRename,
  onSelectDefault,
}: DeviceCardProps) {
  const sc = statusConfig[device.status] || statusConfig.DISCONNECTED;

  return (
    <Pressable
      style={styles.card}
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
        onConnect(device.id);
      }}
    >
      <View style={styles.cardHeader}>
        <View style={styles.iconContainer}>
          <Text style={styles.tvIcon}>📺</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.deviceName}>{device.name}</Text>
          <Text style={styles.deviceModel}>{device.model}</Text>
          <Text style={styles.deviceIP}>
            {device.ip ? `IP: ${device.ip}` : 'Sem IP'}
          </Text>
        </View>
        <View style={styles.statusBadge}>
          <Text style={[styles.statusDot, { color: sc.color }]}>
            {sc.dot}
          </Text>
          <Text style={[styles.statusText, { color: sc.color }]}>
            {sc.text}
          </Text>
        </View>
      </View>
      <View style={styles.actions}>
        {device.id !== 'demo' && (
          <>
            <Pressable
              style={styles.actionBtn}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(
                  () => {}
                );
                onRename(device.id);
              }}
            >
              <Text style={styles.actionText}>Renomear</Text>
            </Pressable>
            <Pressable
              style={styles.actionBtn}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(
                  () => {}
                );
                onSelectDefault(device.id);
              }}
            >
              <Text style={styles.actionText}>Padrão</Text>
            </Pressable>
            <Pressable
              style={[styles.actionBtn, styles.dangerBtn]}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(
                  () => {}
                );
                onRemove(device.id);
              }}
            >
              <Text style={[styles.actionText, styles.dangerText]}>
                Remover
              </Text>
            </Pressable>
          </>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1c1c1e',
    borderRadius: 14,
    padding: 16,
    marginVertical: 6,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#2c2c2e',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  tvIcon: {
    fontSize: 24,
  },
  info: {
    flex: 1,
  },
  deviceName: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  deviceModel: {
    color: '#8e8e93',
    fontSize: 12,
    marginTop: 1,
  },
  deviceIP: {
    color: '#636366',
    fontSize: 11,
    marginTop: 1,
  },
  statusBadge: {
    alignItems: 'center',
    backgroundColor: '#2c2c2e',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  statusDot: {
    fontSize: 8,
    fontWeight: 'bold',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 8,
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#2c2c2e',
    alignItems: 'center',
  },
  actionText: {
    color: '#007aff',
    fontSize: 12,
    fontWeight: '600',
  },
  dangerBtn: {
    backgroundColor: '#2c1c1e',
  },
  dangerText: {
    color: '#ff3b30',
  },
});