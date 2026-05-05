import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Logo from '../components/Logo';
import PrimaryButton from '../components/PrimaryButton';
import { Colors, Spacing } from '../theme';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 8,
        tension: 60,
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 6,
        tension: 80,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />

      <LinearGradient
        colors={[Colors.primaryDark, Colors.primary, Colors.primaryLight]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Decorative circles */}
      <View style={[styles.circle, styles.circleTop]} />
      <View style={[styles.circle, styles.circleBottom]} />
      <View style={[styles.circle, styles.circleAccent]} />

      {/* Content */}
      <Animated.View
        style={[
          styles.content,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        {/* Logo */}
        <Animated.View style={{ transform: [{ scale: logoScale }] }}>
          <Logo size="lg" inverted />
        </Animated.View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Tagline */}
        <Text style={styles.tagline}>
          Your integrated facility{'\n'}management platform
        </Text>

        <Text style={styles.subtitle}>
          Delivering excellence across Qatar's{'\n'}most trusted facilities
        </Text>
      </Animated.View>

      {/* Bottom card */}
      <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
        <Text style={styles.cardTitle}>Welcome</Text>
        <Text style={styles.cardSubtitle}>
          Choose how you'd like to access the app
        </Text>

        <PrimaryButton
          title="Continue as Guest"
          onPress={() => navigation.navigate('GuestLogin')}
          variant="accent"
          style={styles.btn}
        />

        <PrimaryButton
          title="Employee Login / Register"
          onPress={() => navigation.navigate('EmployeeRegister')}
          variant="outline"
          style={[styles.btn, styles.btnOutline]}
        />

        <Text style={styles.footerText}>
          Darwish Interserve Facility Management W.L.L.{'\n'}Qatar
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  circle: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.08,
    backgroundColor: Colors.white,
  },
  circleTop: {
    width: 320,
    height: 320,
    top: -100,
    right: -80,
  },
  circleBottom: {
    width: 260,
    height: 260,
    bottom: 220,
    left: -100,
  },
  circleAccent: {
    width: 160,
    height: 160,
    top: height * 0.3,
    right: -40,
    backgroundColor: Colors.accent,
    opacity: 0.12,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingTop: 60,
  },
  divider: {
    width: 48,
    height: 3,
    backgroundColor: Colors.accent,
    borderRadius: 2,
    marginVertical: Spacing.lg,
  },
  tagline: {
    fontSize: 26,
    fontWeight: '700',
    color: Colors.white,
    textAlign: 'center',
    lineHeight: 34,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.65)',
    textAlign: 'center',
    marginTop: Spacing.sm,
    lineHeight: 22,
  },
  card: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: 36,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 6,
  },
  cardSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: Spacing.lg,
  },
  btn: {
    marginBottom: 12,
  },
  btnOutline: {
    borderColor: Colors.primary,
  },
  footerText: {
    textAlign: 'center',
    fontSize: 11,
    color: Colors.textLight,
    marginTop: Spacing.sm,
    lineHeight: 18,
  },
});
