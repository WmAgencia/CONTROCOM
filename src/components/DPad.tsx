import React from 'react';
import { View, StyleSheet } from 'react-native';
import { RemoteButton } from './RemoteButton';

export function DPad({ onCommand }: { onCommand: (cmd: string) => void }) {
  return (
    <View style={styles.container}>
      <View style={styles.midRow}>
        {null}
        <RemoteButton label="▲" onPress={() => onCommand('UP')} variant="dpad" />
        {null}
      </View>
      <View style={styles.midRow}>
        <RemoteButton label="◀" onPress={() => onCommand('LEFT')} variant="dpad" />
        <RemoteButton label="OK" onPress={() => onCommand('OK')} variant="dpad" size={58} />
        <RemoteButton label="▶" onPress={() => onCommand('RIGHT')} variant="dpad" />
      </View>
      <View style={styles.midRow}>
        {null}
        <RemoteButton label="▼" onPress={() => onCommand('DOWN')} variant="dpad" />
        {null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  midRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});