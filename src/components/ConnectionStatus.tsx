import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ConnectionStatus } from '../types/device';

interface ConnectionStatusProps {
  status: ConnectionStatus;
  tvName: string;
  model: string;
}

export function ConnectionStatusIndicator({
  status,
  tvName,
  model,
}: ConnectionStatusProps) {
  const config = {
    CONNECTED: { color: '#34c759', text: 'Conectada', dot: '●' },
    CONNECTING: { color: '#ff9500', text: 'Conectando...', dot: '◌' },
    DISCONNECTED: { color: '#8e8e93', text: 'Desconectada', dot: '○' },
    ERROR: { color: '#ff3b30', text: 'Erro na conexão', dot: '✕' },
    DEMO: { color: '#007aff', text: 'Modo demonstração', dot: '●' },
  }[status] || { color: '#8e8e93', text: status, dot: '○' };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.tvName} numberOfLines={1}>
          {tvName}
        </Text>
        <Text style={styles.model} numberOfLines={1}>
          {model}
        </Text>
      </View>
      <View style={styles.statusRow}>
        <Text style={[styles.dot, { color: config.color }]}>{config.dot}</Text>
        <Text style={[styles.statusText, { color: config.color }]}>
          {config.text}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  header: {
    alignItems: 'center',
  },
  tvName: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '600',
  },
  model: {
    color: '#8e8e93',
    fontSize: 12,
    marginTop: 2,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  dot: {
    fontSize: 10,
    marginRight: 4,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '500',
  },
});