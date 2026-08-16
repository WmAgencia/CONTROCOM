import React, { useState, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDeviceStore } from './src/store/deviceStore';
import { useSettingsStore } from './src/store/settingsStore';
import { remoteService, DemoRemoteAdapter } from './src/services';
import { DeviceEventEmitter } from 'react-native';
import { SplashScreen } from './src/screens/SplashScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { FirstUseScreen } from './src/screens/FirstUseScreen';
import { DiscoveryScreen } from './src/screens/DiscoveryScreen';
import { RemoteScreen } from './src/screens/RemoteScreen';
import { DevicesScreen } from './src/screens/DevicesScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { DiagnosticsScreen } from './src/screens/DiagnosticsScreen';

export type RootStackParamList = {
  splash: undefined;
  firstUse: undefined;
  home: undefined;
  remote: undefined;
  discovery: undefined;
  devices: undefined;
  settings: undefined;
  diagnostics: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [splashing, setSplashing] = useState(true);
  const [firstUse, setFirstUse] = useState(true);

  const { ensureDemoDevice, devices, selectDevice, setConnectionStatus, addDevice } =
    useDeviceStore();
  const { setDemoMode } = useSettingsStore();

  const handleSplashComplete = useCallback(() => {
    setSplashing(false);
  }, []);

  const handleOnboarded = useCallback(() => {
    setFirstUse(false);
  }, []);

  const handleSkipDemo = useCallback(() => {
    setFirstUse(false);
  }, []);

  const goBack = (navigation: any) => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const handleFindTV = useCallback(
    (navigation: any) => () => {
      navigation.navigate('discovery');
    },
    []
  );

  const handleDemoMode = useCallback(
    (navigation: any) => () => {
      ensureDemoDevice();
      setDemoMode(true);
      remoteService.connect('demo', null, true).then(() => {
        setConnectionStatus('demo', 'DEMO');
        selectDevice('demo');
        DeviceEventEmitter.emit('demo:tvState', { power: true });
        DeviceEventEmitter.emit('demo:volume', { volume: 20 });
        DeviceEventEmitter.emit('demo:channel', { channel: 1 });
      });
      navigation.navigate('remote');
    },
    [ensureDemoDevice, setDemoMode, setConnectionStatus, selectDevice]
  );

  const handleDevices = useCallback(
    (navigation: any) => () => {
      navigation.navigate('devices');
    },
    []
  );

  const handleRemote = useCallback(
    (navigation: any) => () => {
      navigation.navigate('remote');
    },
    []
  );

  const handleDeviceFound = useCallback(
    (navigation: any) => (device: any) => {
      addDevice({
        id: device.id,
        name: device.name,
        model: device.model,
        ip: device.ip,
        status: 'CONNECTED' as any,
        isDefault: true,
      });
      selectDevice(device.id);
      remoteService.connect(device.id, device.ip, false).then(() => {
        setConnectionStatus(device.id, 'DEMO');
      });
      setDemoMode(false);
      navigation.navigate('remote');
    },
    [addDevice, selectDevice, remoteService, setConnectionStatus, setDemoMode]
  );

  const handleDeviceConnect = useCallback(
    (navigation: any) => (_id: string) => {
      navigation.navigate('remote');
    },
    []
  );

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        initialRouteName="splash"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#000000' },
          animation: 'fade_from_bottom',
          fullScreenGestureEnabled: true,
          gestureEnabled: true,
        }}
      >
        {splashing ? (
          <Stack.Screen name="splash">
            {(props) => (
              <SplashScreen {...props} onComplete={handleSplashComplete} />
            )}
          </Stack.Screen>
        ) : firstUse ? (
          <Stack.Screen name="firstUse">
            {(props) => (
              <FirstUseScreen
                {...props}
                onFindTV={handleFindTV(props.navigation)}
                onDemoMode={handleDemoMode(props.navigation)}
                onBack={() => {}}
              />
            )}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="home">
              {(props) => (
                <HomeScreen
                  {...props}
                  onFindTV={handleFindTV(props.navigation)}
                  onDemoMode={handleDemoMode(props.navigation)}
                  onDevices={handleDevices(props.navigation)}
                  onRemote={handleRemote(props.navigation)}
                />
              )}
            </Stack.Screen>

            <Stack.Screen name="remote">
              {(props) => (
                <RemoteScreen {...props} navigation={props.navigation} />
              )}
            </Stack.Screen>

            <Stack.Screen name="discovery">
              {(props) => (
                <DiscoveryScreen
                  {...props}
                  onDeviceFound={handleDeviceFound(props.navigation)}
                  onSkipToDemo={handleDemoMode(props.navigation)}
                  onBack={() => goBack(props.navigation)}
                />
              )}
            </Stack.Screen>

            <Stack.Screen name="devices">
              {(props) => (
                <DevicesScreen
                  {...props}
                  onBack={() => goBack(props.navigation)}
                  onConnect={handleDeviceConnect(props.navigation)}
                />
              )}
            </Stack.Screen>

            <Stack.Screen name="settings">
              {(props) => (
                <SettingsScreen
                  {...props}
                  onBack={() => goBack(props.navigation)}
                  onNavigate={(screen) =>
                    props.navigation.navigate(screen as any)
                  }
                />
              )}
            </Stack.Screen>

            <Stack.Screen name="diagnostics">
              {(props) => (
                <DiagnosticsScreen
                  {...props}
                  onBack={() => goBack(props.navigation)}
                />
              )}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}