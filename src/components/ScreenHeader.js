import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Radius } from '../theme';

export default function ScreenHeader({
  user,
  title,
  subtitle,
  showAvatar = true,
  rightAction,
}) {
  const isGuest = user?.type === 'guest';
  const initial = (user?.name || 'U').charAt(0).toUpperCase();

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primaryDark} />
      <LinearGradient
        colors={[Colors.primaryDark, Colors.primary]}
        style={styles.header}
      >
        <View style={styles.row}>
          <View style={styles.left}>
            <Text style={styles.title}>{title}</Text>
            {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
          </View>

          <View style={styles.right}>
            {rightAction ? (
              <TouchableOpacity
                style={styles.iconBtn}
                onPress={rightAction.onPress}
              >
                <Ionicons name={rightAction.icon} size={20} color={Colors.white} />
                {rightAction.badge ? (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{rightAction.badge}</Text>
                  </View>
                ) : null}
              </TouchableOpacity>
            ) : null}

            {showAvatar ? (
              <View style={[styles.avatar, isGuest && styles.avatarGuest]}>
                <Text style={[styles.avatarText, isGuest && styles.avatarTextGuest]}>
                  {initial}
                </Text>
              </View>
            ) : null}
          </View>
        </View>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 52,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: { flex: 1 },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.white,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.65)',
    marginTop: 2,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 4,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: Colors.error,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: Colors.white,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarGuest: {
    backgroundColor: Colors.accent,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.primary,
  },
  avatarTextGuest: {
    color: Colors.primary,
  },
});
