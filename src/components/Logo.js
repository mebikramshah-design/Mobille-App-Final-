import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../theme';

export default function Logo({ size = 'md', inverted = false }) {
  const scale = size === 'lg' ? 1.4 : size === 'sm' ? 0.75 : 1;
  const textColor = inverted ? Colors.white : Colors.primary;
  const accentColor = inverted ? Colors.accentLight : Colors.accent;
  const bgColor = inverted ? Colors.white : Colors.primary;

  return (
    <View style={[styles.container, { transform: [{ scale }] }]}>
      {/* Emblem mark */}
      <View style={[styles.emblem, { backgroundColor: bgColor }]}>
        <Text style={[styles.emblemText, { color: inverted ? Colors.primary : Colors.white }]}>DI</Text>
        <View style={[styles.emblemBar, { backgroundColor: accentColor }]} />
      </View>

      <View style={styles.textBlock}>
        <Text style={[styles.companyName, { color: textColor }]}>
          DARWISH
        </Text>
        <Text style={[styles.companySubName, { color: accentColor }]}>
          INTERSERVE
        </Text>
        <Text style={[styles.tagline, { color: inverted ? 'rgba(255,255,255,0.7)' : Colors.textSecondary }]}>
          Facility Management
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  emblem: {
    width: 52,
    height: 52,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  emblemText: {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 1,
  },
  emblemBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
  },
  textBlock: {
    flexDirection: 'column',
  },
  companyName: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 2,
    lineHeight: 19,
  },
  companySubName: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1.5,
    lineHeight: 17,
  },
  tagline: {
    fontSize: 10,
    fontWeight: '400',
    letterSpacing: 0.5,
    marginTop: 2,
  },
});
