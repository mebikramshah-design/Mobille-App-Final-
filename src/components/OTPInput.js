import React, { useRef, useState } from 'react';
import { View, TextInput, StyleSheet, Animated } from 'react-native';
import { Colors, Radius } from '../theme';

const OTP_LENGTH = 6;

export default function OTPInput({ value = '', onChange, hasError = false }) {
  const inputs = useRef([]);
  const shakeAnims = useRef(
    Array.from({ length: OTP_LENGTH }, () => new Animated.Value(0))
  ).current;

  const digits = value.padEnd(OTP_LENGTH, '').split('').slice(0, OTP_LENGTH);

  const handleChange = (text, index) => {
    const cleaned = text.replace(/[^0-9]/g, '');
    if (!cleaned) return;

    const newDigits = [...digits];
    newDigits[index] = cleaned[cleaned.length - 1];
    onChange(newDigits.join('').trim());

    if (index < OTP_LENGTH - 1 && cleaned) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace') {
      const newDigits = [...digits];
      if (newDigits[index]) {
        newDigits[index] = '';
        onChange(newDigits.join('').trimEnd());
      } else if (index > 0) {
        newDigits[index - 1] = '';
        onChange(newDigits.join('').trimEnd());
        inputs.current[index - 1]?.focus();
      }
    }
  };

  return (
    <View style={styles.row}>
      {Array.from({ length: OTP_LENGTH }).map((_, i) => {
        const filled = !!digits[i];
        const borderColor = hasError
          ? Colors.error
          : filled
          ? Colors.primary
          : Colors.border;

        return (
          <Animated.View
            key={i}
            style={[
              styles.cell,
              { borderColor },
              filled && styles.cellFilled,
            ]}
          >
            <TextInput
              ref={(ref) => (inputs.current[i] = ref)}
              style={styles.input}
              value={digits[i] || ''}
              onChangeText={(text) => handleChange(text, i)}
              onKeyPress={(e) => handleKeyPress(e, i)}
              keyboardType="number-pad"
              maxLength={1}
              textAlign="center"
              selectTextOnFocus
            />
          </Animated.View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  cell: {
    width: 48,
    height: 56,
    borderWidth: 1.5,
    borderRadius: Radius.md,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  cellFilled: {
    backgroundColor: '#EEF2FF',
  },
  input: {
    width: '100%',
    height: '100%',
    fontSize: 22,
    fontWeight: '700',
    color: Colors.primary,
    textAlign: 'center',
  },
});
