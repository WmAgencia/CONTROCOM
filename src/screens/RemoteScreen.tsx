import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  StatusBar,
  Platform,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { useDeviceStore } from '../store/deviceStore';
import { useSettingsStore } from '../store/settingsStore';
import { ConnectionStatusIndicator } from '../components/ConnectionStatus';
import { RemoteButton } from '../components/RemoteButton';
import { DPad } from '../components/DPad';
import { DeviceEventEmitter } from 'react-native';
import { RemoteCommand } from '../types/remote';
import { remoteService, DemoRemoteAdapter } from '../services/RemoteService';
import { COLORS, SPACING } from '../utils/constants';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export function RemoteScreen({ navigation }: any) {
  const { devices, selectedDeviceId, selectDevice, setConnectionStatus, ensureDemoDevice } = useDeviceStore();
  const { settings, setHaptic, setSound, setDemoMode } = useSettingsStore();
  const [showNumeric, setShowNumeric] = useState(false);
  const [tvPower, setTvPower] = useState(true);
  const [volume, setVolume] = useState(20);
  const [channel, setChannel] = useState(1);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    ensureDemoDevice();
  }, []);

  const device = devices.find((d) => d.id === selectedDeviceId) || devices[0] || {
    id: 'demo',
    name: 'Philips Sala',
    model: '43PFG5100/78',
    status: 'DEMO' as any,
  };

  const isDemo = device.status === 'DEMO' || settings.demoMode;

  useEffect(() => {
    const adapter = remoteService.getAdapter() as DemoRemoteAdapter | null;
    if (adapter) {
      const state = adapter.getState();
      setTvPower(state.power);
      setVolume(state.volume);
      setChannel(state.channel);
    }
  }, []);

  useEffect(() => {
    const subs = [
      DeviceEventEmitter.addListener('demo:tvState', (state: any) => setTvPower(state.power)),
      DeviceEventEmitter.addListener('demo:volume', (state: any) => setVolume(state.volume)),
      DeviceEventEmitter.addListener('demo:channel', (state: any) => setChannel(state.channel)),
    ];
    return () => subs.forEach((s) => s.remove());
  }, []);

  const triggerHaptic = useCallback(async () => {
    if (!settings.hapticEnabled) return;
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (e) {}
  }, [settings.hapticEnabled]);

  const sendCommand = useCallback(
    async (cmd: RemoteCommand) => {
      if (settings.hapticEnabled) {
        await triggerHaptic();
      }
      try {
        if (isDemo) {
          const adapter = remoteService.getAdapter() as DemoRemoteAdapter | null;
          if (adapter) {
            const result = await adapter.sendCommand(cmd);
            return result;
          }
        }
        await remoteService.sendCommand(cmd);
      } catch (e) {
        console.log('Command error:', e);
      }
    },
    [isDemo, settings.hapticEnabled]
  );

  const handlePower = () => sendCommand(RemoteCommand.POWER);
  const handleDPad = (cmd: string) => {
    const map: Record<string, RemoteCommand> = {
      UP: RemoteCommand.UP,
      DOWN: RemoteCommand.DOWN,
      LEFT: RemoteCommand.LEFT,
      RIGHT: RemoteCommand.RIGHT,
      OK: RemoteCommand.OK,
    };
    sendCommand(map[cmd]);
  };

  const handleVolUp = () => sendCommand(RemoteCommand.VOLUME_UP);
  const handleVolDown = () => sendCommand(RemoteCommand.VOLUME_DOWN);
  const handleMute = () => sendCommand(RemoteCommand.MUTE);
  const handleChUp = () => sendCommand(RemoteCommand.CHANNEL_UP);
  const handleChDown = () => sendCommand(RemoteCommand.CHANNEL_DOWN);
  const handleNumber = (n: number) =>
    sendCommand(
      RemoteCommand[('NUMBER_' + n) as keyof typeof RemoteCommand]
    );

  const buttonSize = (SCREEN_WIDTH - SPACING.lg * 2 - 20) / 5;
  const numPadSize = (SCREEN_WIDTH - SPACING.lg * 2 - 30) / 3;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topBar}>
          <Pressable
            hitSlop={10}
            onPress={() => {
              triggerHaptic();
              navigation.navigate('devices');
            }}
          >
            <Text style={styles.topLeft}>←</Text>
          </Pressable>
          <Text style={styles.topCenter}>CONTROCOM</Text>
          <Pressable
            hitSlop={10}
            onPress={() => {
              triggerHaptic();
              navigation.navigate('settings');
            }}
          >
            <Text style={styles.topRight}>⚙</Text>
          </Pressable>
        </View>

        <ConnectionStatusIndicator
          status={device.status}
          tvName={device.name}
          model={device.model}
        />

        <View style={styles.section}>
          <Pressable onPress={handlePower}>
            <RemoteButton label="⏻" onPress={handlePower} variant="power" size={76} />
          </Pressable>
        </View>

        <View style={styles.row}>
          <RemoteButton
            label="VOL+"
            onPress={handleVolUp}
            variant="default"
            size={buttonSize}
          />
          <RemoteButton
            label="CH+"
            onPress={handleChUp}
            variant="default"
            size={buttonSize}
          />
        </View>
        <View style={styles.row}>
          <RemoteButton
            label="MUTE"
            onPress={handleMute}
            variant="default"
            size={buttonSize}
          />
          <RemoteButton
            label="CH-"
            onPress={handleChDown}
            variant="default"
            size={buttonSize}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.sectionLabel}>
          <Text style={styles.sectionLabelText}>CONTROLES DE MÍDIA</Text>
        </View>
        <View style={styles.row}>
          <RemoteButton
            label="⏮"
            onPress={() => sendCommand(RemoteCommand.REWIND)}
            variant="media"
            size={46}
          />
          <RemoteButton
            label="▶/Ⅱ"
            onPress={() => {
              const adapter = remoteService.getAdapter() as DemoRemoteAdapter | null;
              const st = adapter?.getState();
              if (st?.power) sendCommand(RemoteCommand.PAUSE);
              else sendCommand(RemoteCommand.PLAY);
            }}
            variant="media"
            size={46}
          />
          <RemoteButton
            label="⏭"
            onPress={() => sendCommand(RemoteCommand.FORWARD)}
            variant="media"
            size={46}
          />
        </View>

        <View style={styles.divider} />

        <DPad onCommand={handleDPad} />

        <View style={styles.divider} />

        <View style={styles.sectionLabel}>
          <Text style={styles.sectionLabelText}>BOTÕES PRINCIPAIS</Text>
        </View>
        <View style={styles.row}>
          <RemoteButton
            label="HOME"
            onPress={() => sendCommand(RemoteCommand.HOME)}
            variant="default"
            size={buttonSize - 4}
          />
          <RemoteButton
            label="BACK"
            onPress={() => sendCommand(RemoteCommand.BACK)}
            variant="default"
            size={buttonSize - 4}
          />
          <RemoteButton
            label="MENU"
            onPress={() => sendCommand(RemoteCommand.MENU)}
            variant="default"
            size={buttonSize - 4}
          />
        </View>
        <View style={[styles.row, { justifyContent: 'center' }]}>
          <RemoteButton
            label="SOURCE"
            onPress={() => sendCommand(RemoteCommand.SOURCE)}
            variant="default"
            size={buttonSize - 4}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.sectionLabel}>
          <Text style={styles.sectionLabelText}>ATALHOS</Text>
        </View>
        <View style={styles.row}>
          <RemoteButton
            label="NETFLIX"
            onPress={() => sendCommand(RemoteCommand.NETFLIX)}
            variant="shortcut"
            size={70}
          />
          <RemoteButton
            label="YOUTUBE"
            onPress={() => sendCommand(RemoteCommand.YOUTUBE)}
            variant="shortcut"
            size={70}
          />
          <RemoteButton
            label="PRIME"
            onPress={() => sendCommand(RemoteCommand.PRIME)}
            variant="shortcut"
            size={70}
          />
        </View>

        <View style={styles.divider} />

        <Pressable
          style={styles.numericToggle}
          onPress={() => {
            triggerHaptic();
            setShowNumeric(!showNumeric);
          }}
        >
          <Text style={styles.numericToggleText}>
            {showNumeric ? '▴ OCULTAR TECLADO' : '▾ TECLADO NUMÉRICO 123'}
          </Text>
        </Pressable>

        {showNumeric && (
          <View style={styles.numericPad}>
            <View style={styles.numericRow}>
              <RemoteButton
                label="1"
                onPress={() => handleNumber(1)}
                variant="number"
                size={numPadSize}
              />
              <RemoteButton
                label="2"
                onPress={() => handleNumber(2)}
                variant="number"
                size={numPadSize}
              />
              <RemoteButton
                label="3"
                onPress={() => handleNumber(3)}
                variant="number"
                size={numPadSize}
              />
            </View>
            <View style={styles.numericRow}>
              <RemoteButton
                label="4"
                onPress={() => handleNumber(4)}
                variant="number"
                size={numPadSize}
              />
              <RemoteButton
                label="5"
                onPress={() => handleNumber(5)}
                variant="number"
                size={numPadSize}
              />
              <RemoteButton
                label="6"
                onPress={() => handleNumber(6)}
                variant="number"
                size={numPadSize}
              />
            </View>
            <View style={styles.numericRow}>
              <RemoteButton
                label="7"
                onPress={() => handleNumber(7)}
                variant="number"
                size={numPadSize}
              />
              <RemoteButton
                label="8"
                onPress={() => handleNumber(8)}
                variant="number"
                size={numPadSize}
              />
              <RemoteButton
                label="9"
                onPress={() => handleNumber(9)}
                variant="number"
                size={numPadSize}
              />
            </View>
            <View style={[styles.numericRow, { justifyContent: 'center' }]}>
              <View style={{ width: numPadSize }} />
              <RemoteButton
                label="0"
                onPress={() => handleNumber(0)}
                variant="number"
                size={numPadSize}
              />
              <View style={{ width: numPadSize }} />
            </View>
          </View>
        )}

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scroll: {
    alignItems: 'center',
    paddingBottom: 16,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  topLeft: {
    color: '#007aff',
    fontSize: 22,
    width: 28,
  },
  topCenter: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
  },
  topRight: {
    color: '#007aff',
    fontSize: 20,
    width: 28,
    textAlign: 'right',
  },
  section: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  sectionLabel: {
    paddingVertical: 6,
  },
  sectionLabelText: {
    color: '#636366',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 6,
    paddingVertical: 6,
  },
  divider: {
    height: SPACING.sm,
  },
  numericToggle: {
    paddingVertical: 8,
    alignItems: 'center',
  },
  numericToggleText: {
    color: '#007aff',
    fontSize: 13,
    fontWeight: '600',
  },
  numericPad: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  numericRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 4,
  },
});