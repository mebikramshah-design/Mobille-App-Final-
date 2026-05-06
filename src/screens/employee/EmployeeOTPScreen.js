import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Logo from '../../components/Logo';
import PrimaryButton from '../../components/PrimaryButton';
import OTPInput from '../../components/OTPInput';
import { Colors, Spacing, Radius } from '../../theme';

const RESEND_COOLDOWN = 60;

export default function EmployeeOTPScreen({ navigation, route }) {
  const { fullName, employeeId, mobile } = route.params;

  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [verifyError, setVerifyError] = useState('');
  const [countdown, setCountdown] = useState(RESEND_COOLDOWN);
  const [resending, setResending] = useState(false);

  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (countdown === 0) return;
    const timer = setInterval(() => setCountdown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const shake = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 8, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -8, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 60, useNativeDriver: true }),
    ]).start();
  };

  const handleVerify = async () => {
    if (otp.length < 6) {
      setVerifyError('Please enter all 6 digits');
      shake();
      return;
    }
    setVerifyError('');
    setLoading(true);

    // Simulate SMS OTP verification — demo code is 654321
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);

    if (otp !== '654321') {
      setVerifyError('Invalid SMS code. Please try again or request a new one.');
      shake();
      return;
    }

    // Success — enter the main tab navigator
    navigation.replace('Main', {
      user: { type: 'employee', name: fullName, employeeId, mobile },
    });
  };

  const handleResend = async () => {
    if (countdown > 0 || resending) return;
    setResending(true);
    setOtp('');
    setVerifyError('');
    await new Promise((r) => setTimeout(r, 1000));
    setResending(false);
    setCountdown(RESEND_COOLDOWN);
  };

  const maskedMobile = mobile.replace(/(\+?\d{3})(\d+)(\d{4})/, '$1****$3');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={22} color={Colors.primary} />
        </TouchableOpacity>
        <Logo size="sm" />
      </View>

      <View style={styles.content}>
        {/* SMS icon */}
        <View style={styles.iconWrap}>
          <View style={styles.iconCircle}>
            <Ionicons name="phone-portrait" size={32} color={Colors.primary} />
          </View>
          <View style={styles.iconBadge}>
            <Ionicons name="chatbubble" size={12} color={Colors.white} />
          </View>
        </View>

        <Text style={styles.title}>Verify Your Mobile</Text>
        <Text style={styles.subtitle}>
          Welcome, <Text style={styles.nameHighlight}>{fullName}</Text>!{'\n'}
          A 6-digit SMS code was sent to
        </Text>
        <Text style={styles.phoneText}>{maskedMobile}</Text>

        {/* Employee ID display */}
        <View style={styles.idCard}>
          <Ionicons name="card-outline" size={16} color={Colors.primary} />
          <Text style={styles.idLabel}>Employee ID:</Text>
          <Text style={styles.idValue}>{employeeId}</Text>
        </View>

        {/* OTP */}
        <Animated.View
          style={[styles.otpWrap, { transform: [{ translateX: shakeAnim }] }]}
        >
          <OTPInput value={otp} onChange={setOtp} hasError={!!verifyError} />
        </Animated.View>

        {verifyError ? (
          <View style={styles.errorRow}>
            <Ionicons name="alert-circle" size={14} color={Colors.error} />
            <Text style={styles.errorText}>{verifyError}</Text>
          </View>
        ) : null}

        <PrimaryButton
          title="Verify & Complete Registration"
          onPress={handleVerify}
          loading={loading}
          disabled={otp.length < 6}
          style={styles.verifyBtn}
        />

        {/* Resend */}
        <View style={styles.resendRow}>
          <Text style={styles.resendLabel}>Didn't receive the SMS? </Text>
          {countdown > 0 ? (
            <Text style={styles.countdown}>Resend in {countdown}s</Text>
          ) : (
            <TouchableOpacity onPress={handleResend} disabled={resending}>
              <Text style={styles.resendLink}>
                {resending ? 'Sending...' : 'Resend Code'}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Steps done */}
        <View style={styles.stepsCard}>
          <Text style={styles.stepsTitle}>Registration Steps</Text>
          <View style={styles.stepRow}>
            <View style={[styles.stepDot, styles.stepDone]}>
              <Ionicons name="checkmark" size={10} color={Colors.white} />
            </View>
            <Text style={styles.stepText}>Account details entered</Text>
          </View>
          <View style={styles.stepRow}>
            <View style={[styles.stepDot, styles.stepActive]}>
              <Ionicons name="ellipsis-horizontal" size={10} color={Colors.white} />
            </View>
            <Text style={[styles.stepText, styles.stepActiveText]}>Mobile verification</Text>
          </View>
          <View style={styles.stepRow}>
            <View style={[styles.stepDot, styles.stepPending]} />
            <Text style={[styles.stepText, { color: Colors.textLight }]}>Account activated</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingTop: 52,
    paddingBottom: Spacing.md,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    alignItems: 'center',
  },
  iconWrap: {
    position: 'relative',
    marginBottom: Spacing.lg,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  iconBadge: {
    position: 'absolute',
    bottom: 0,
    right: -4,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.surface,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 10,
    letterSpacing: -0.4,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  nameHighlight: {
    color: Colors.primary,
    fontWeight: '600',
  },
  phoneText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.primary,
    marginTop: 4,
    marginBottom: 12,
  },
  idCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    borderRadius: Radius.md,
    paddingHorizontal: 14,
    paddingVertical: 8,
    gap: 8,
    marginBottom: Spacing.lg,
  },
  idLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  idValue: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary,
    letterSpacing: 1,
  },
  otpWrap: {
    width: '100%',
    marginBottom: 12,
  },
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  errorText: {
    fontSize: 13,
    color: Colors.error,
    fontWeight: '500',
  },
  verifyBtn: {
    width: '100%',
    marginTop: 8,
    marginBottom: 16,
  },
  resendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  resendLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  countdown: {
    fontSize: 14,
    color: Colors.textLight,
    fontWeight: '500',
  },
  resendLink: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '700',
  },
  stepsCard: {
    width: '100%',
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 10,
  },
  stepsTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  stepDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepDone: {
    backgroundColor: Colors.success,
  },
  stepActive: {
    backgroundColor: Colors.primary,
  },
  stepPending: {
    backgroundColor: Colors.border,
  },
  stepText: {
    fontSize: 13,
    color: Colors.text,
  },
  stepActiveText: {
    fontWeight: '600',
    color: Colors.primary,
  },
});
