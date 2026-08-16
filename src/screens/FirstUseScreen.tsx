import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  StatusBar,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING } from '../utils/constants';

interface FirstUseScreenProps {
  onFindTV: () => void;
  onDemoMode: () => void;
  onBack: () => void;
}

export function FirstUseScreen({ onFindTV, onDemoMode, onBack }: FirstUseScreenProps) {
  const [step, setStep] = useState(0);
  const [checks, setChecks] = useState({
    wifi: false,
    tvNet: false,
    sameNet: false,
    tvOn: false,
  });

  const toggle = (key: 'wifi' | 'tvNet' | 'sameNet' | 'tvOn') => {
    setChecks((c) => ({ ...c, [key]: !c[key] }));
  };

  const allOk = checks.wifi && checks.tvNet && checks.sameNet && checks.tvOn;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <View style={styles.content}>
        <View style={styles.logoSection}>
          <Text style={styles.logoIcon}>📱</Text>
          <Text style={styles.logoText}>CONTROCOM</Text>
          <Text style={styles.tagline}>Seu controle remoto inteligente.</Text>
        </View>

        {step === 0 && (
          <View style={styles.centerSection}>
            <Text style={styles.welcomeText}>
              Vamos configurar o CONTROCOM para sua TV Philips.
            </Text>
            <Pressable
              style={styles.mainBtn}
              onPress={onFindTV}
            >
              <Text style={styles.mainBtnText}>ENCONTRAR MINHA TV</Text>
            </Pressable>
            <Pressable
              style={styles.altBtn}
              onPress={onDemoMode}
            >
              <Text style={styles.altBtnText}>PULAR — MODO DEMONSTRAÇÃO</Text>
            </Pressable>
          </View>
        )}

        {step === 1 && (
          <View style={styles.centerSection}>
            <Text style={styles.stepTitle}>Procurando TV...</Text>
            <View style={styles.radarContainer}>
              <Text style={styles.radarText}>📡</Text>
            </View>
            <Text style={styles.stepText}>
              Certifique-se de que seu celular e sua TV estejam conectados à mesma rede Wi-Fi.
            </Text>
            <Pressable style={[styles.mainBtn, { marginTop: 24 }]} onPress={() => setStep(2)}>
              <Text style={styles.mainBtnText}>PROCURAR</Text>
            </Pressable>
          </View>
        )}

        {step === 2 && (
          <View style={styles.centerSection}>
            <Text style={styles.stepTitle}>Verifique os itens abaixo:</Text>

            <View style={styles.checklist}>
              {([
                ['wifi', 'Celular conectado ao Wi-Fi'],
                ['tvNet', 'TV conectada à rede'],
                ['sameNet', 'Mesma rede'],
                ['tvOn', 'TV ligada'],
              ] as const).map(([key, label]) => (
                <Pressable key={key} style={styles.checkItem} onPress={() => toggle(key)}>
                  <Text
                    style={[
                      styles.checkIcon,
                      { color: checks[key] ? COLORS.success : '#636366' },
                    ]}
                  >
                    {checks[key] ? '✓' : '○'}
                  </Text>
                  <Text style={styles.checkText}>{label}</Text>
                </Pressable>
              ))}
            </View>

            <Pressable
              style={[styles.mainBtn, { marginTop: 12 }]}
              onPress={allOk ? onFindTV : () => setStep(1)}
            >
              <Text style={styles.mainBtnText}>
                {allOk ? 'TENTAR NOVAMENTE' : 'VOLTAR'}
              </Text>
            </Pressable>
            <Pressable style={[styles.altBtn, { marginTop: 8 }]} onPress={onDemoMode}>
              <Text style={styles.altBtnText}>MODO DEMONSTRAÇÃO</Text>
            </Pressable>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

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
  logoSection: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 24,
  },
  logoIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  logoText: {
    fontSize: 26,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: 2,
  },
  tagline: {
    color: '#8e8e93',
    fontSize: 14,
    marginTop: 4,
  },
  centerSection: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  welcomeText: {
    color: '#ffffff',
    fontSize: 17,
    textAlign: 'center',
    marginBottom: 28,
    lineHeight: 24,
  },
  stepTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 12,
  },
  radarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#1c1c1e',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  radarText: {
    fontSize: 44,
  },
  stepText: {
    color: '#8e8e93',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 8,
  },
  mainBtn: {
    backgroundColor: '#007aff',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 28,
    alignItems: 'center',
    width: '100%',
  },
  mainBtnText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  altBtn: {
    backgroundColor: '#1c1c1e',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 28,
    alignItems: 'center',
    marginTop: 8,
    width: '100%',
  },
  altBtnText: {
    color: '#007aff',
    fontSize: 14,
    fontWeight: '600',
  },
  checklist: {
    width: '100%',
    marginVertical: 20,
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1c1c1e',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
  },
  checkIcon: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 12,
    width: 24,
  },
  checkText: {
    color: '#ffffff',
    fontSize: 14,
  },
});