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
import { verifyEmailOTP, sendEmailOTP } from '../../config/api';

const RESEND_COOLDOWN = 60;

export default function GuestOTPScreen({ navigation, route }) {
  const { name, gmail } = route.params;

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

    try {
      const data = await verifyEmailOTP(gmail, otp);
      if (!data.valid) {
        setVerifyError(data.message || 'Invalid code. Please try again.');
        shake();
        return;
      }
      navigation.replace('Main', {
        user: { type: 'guest', name, email: gmail },
      });
    } catch {
      setVerifyError('Network error. Make sure the server is running.');
      shake();
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (countdown > 0 || resending) return;
    setResending(true);
    setOtp('');
    setVerifyError('');
    try {
      const data = await sendEmailOTP(gmail, name);
      if (!data.success) setVerifyError(data.message || 'Failed to resend code.');
    } catch {
      setVerifyError('Network error while resending.');
    } finally {
      setResending(false);
      setCountdown(RESEND_COOLDOWN);
    }
  };

  const maskedGmail = gmail.replace(/(.{2})(.+)(@gmail\.com)/, '$1****$3');

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
        {/* Email icon */}
        <View style={styles.iconWrap}>
          <View style={styles.iconCircle}>
            <Ionicons name="mail" size={32} color={Colors.primary} />
          </View>
          <View style={styles.iconBadge}>
            <Ionicons name="shield-checkmark" size={14} color={Colors.white} />
          </View>
        </View>

        <Text style={styles.title}>Check Your Gmail</Text>
        <Text style={styles.subtitle}>
          Hi <Text style={styles.nameHighlight}>{name}</Text>! We sent a 6-digit verification code to
        </Text>
        <Text style={styles.emailText}>{maskedGmail}</Text>

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
          title="Verify & Continue"
          onPress={handleVerify}
          loading={loading}
          disabled={otp.length < 6}
          style={styles.verifyBtn}
        />

        {/* Resend */}
        <View style={styles.resendRow}>
          <Text style={styles.resendLabel}>Didn't receive the code? </Text>
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

        {/* Tips */}
        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>Didn't get the email?</Text>
          <Text style={styles.tipsItem}>• Check your spam / junk folder</Text>
          <Text style={styles.tipsItem}>• Make sure you entered the correct Gmail</Text>
          <Text style={styles.tipsItem}>• The code expires in 5 minutes</Text>
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
    backgroundColor: Colors.success,
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
  emailText: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.primary,
    marginTop: 4,
    marginBottom: Spacing.xl,
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
    marginBottom: Spacing.xl,
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
  tipsCard: {
    width: '100%',
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  tipsTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  tipsItem: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
});
