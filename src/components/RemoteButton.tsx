import React, { useState } from 'react';
import { Pressable, Text, StyleSheet, Platform } from 'react-native';
import * as Haptics from 'expo-haptics';

interface RemoteButtonProps {
  label: string;
  onPress: () => void;
  size?: number;
  variant?: 'default' | 'power' | 'dpad' | 'media' | 'shortcut' | 'number';
  disabled?: boolean;
}

export function RemoteButton({
  label,
  onPress,
  size = 56,
  variant = 'default',
  disabled = false,
}: RemoteButtonProps) {
  const [pressed, setPressed] = useState(false);

  const handlePressIn = async () => {
    setPressed(true);
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (e) {}
  };

  const handlePressOut = () => setPressed(false);

  const dynamicStyle: any = [styles.button, { width: size, height: size }];

  if (variant === 'power') {
    Object.assign(dynamicStyle, styles.powerButton);
  } else if (variant === 'dpad') {
    Object.assign(dynamicStyle, styles.dpadButton);
  } else if (variant === 'media') {
    Object.assign(dynamicStyle, styles.mediaButton);
  } else if (variant === 'shortcut') {
    Object.assign(dynamicStyle, styles.shortcutButton);
  } else if (variant === 'number') {
    Object.assign(dynamicStyle, styles.numberButton);
  } else {
    Object.assign(dynamicStyle, styles.defaultButton);
  }

  if (pressed) Object.assign(dynamicStyle, styles.pressed);
  if (disabled) Object.assign(dynamicStyle, styles.disabled);

  return (
    <Pressable
      style={dynamicStyle as any}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      android_ripple={{ color: 'rgba(255,255,255,0.15)', borderless: false }}
    >
      <Text
        style={[
          styles.label,
          variant === 'shortcut' && styles.shortcutLabel,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2c2c2e',
    margin: 5,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  pressed: {
    transform: [{ scale: 0.95 }],
    backgroundColor: '#3a3a3d',
  },
  disabled: {
    opacity: 0.4,
  },
  defaultButton: {
    borderRadius: 14,
  },
  powerButton: {
    backgroundColor: '#cf192e',
    borderRadius: 16,
    width: 80,
    height: 80,
    alignSelf: 'center',
    margin: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#cf192e',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  dpadButton: {
    width: 52,
    height: 52,
  },
  mediaButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#1c1c1e',
  },
  shortcutButton: {
    backgroundColor: '#1c1c1e',
    borderRadius: 12,
    width: 70,
    height: 50,
    paddingHorizontal: 8,
  },
  numberButton: {
    backgroundColor: '#1c1c1e',
    borderRadius: 12,
  },
  label: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  shortcutLabel: {
    fontSize: 10,
    fontWeight: '700',
    textAlign: 'center',
  },
});