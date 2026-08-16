import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, StatusBar } from 'react-native';
import { COLORS } from '../utils/constants';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowContent(true), 300);
    const t2 = setTimeout(() => onComplete(), 2200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <View style={styles.logoContainer}>
        <Text style={styles.logoIcon}>📱</Text>
        <Text style={styles.logoText}>CONTROCOM</Text>
        <Text style={styles.tagline}>Seu controle remoto inteligente.</Text>
      </View>
      {showContent && (
        <View style={styles.footer}>
          <Text style={styles.version}>v1.0.0</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoIcon: {
    fontSize: 60,
    marginBottom: 16,
  },
  logoText: {
    fontSize: 32,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: 2,
  },
  tagline: {
    color: '#8e8e93',
    fontSize: 15,
    marginTop: 8,
    fontWeight: '400',
  },
  footer: {
    position: 'absolute',
    bottom: 60,
    alignItems: 'center',
  },
  version: {
    color: '#636366',
    fontSize: 13,
  },
});