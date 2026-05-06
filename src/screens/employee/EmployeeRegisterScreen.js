import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Logo from '../../components/Logo';
import PrimaryButton from '../../components/PrimaryButton';
import InputField from '../../components/InputField';
import { Colors, Spacing, Radius } from '../../theme';
import { sendSmsOTP } from '../../config/api';

function validate(fields) {
  const errors = {};

  if (!fields.fullName.trim()) {
    errors.fullName = 'Full name is required';
  } else if (fields.fullName.trim().length < 3) {
    errors.fullName = 'Name must be at least 3 characters';
  }

  if (!fields.employeeId.trim()) {
    errors.employeeId = 'Employee ID is required';
  } else if (!/^[A-Za-z0-9\-]{4,16}$/.test(fields.employeeId.trim())) {
    errors.employeeId = 'Employee ID must be 4–16 alphanumeric characters';
  }

  if (!fields.mobile.trim()) {
    errors.mobile = 'Mobile number is required';
  } else if (!/^\+?[0-9]{8,15}$/.test(fields.mobile.replace(/\s/g, ''))) {
    errors.mobile = 'Enter a valid mobile number (e.g. +974 3312 3456)';
  }

  if (!fields.password) {
    errors.password = 'Password is required';
  } else if (fields.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  } else if (!/(?=.*[A-Z])(?=.*[0-9])/.test(fields.password)) {
    errors.password = 'Must contain at least one uppercase letter and one number';
  }

  if (!fields.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password';
  } else if (fields.password !== fields.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return errors;
}

function PasswordStrength({ password }) {
  if (!password) return null;

  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  const labels = ['Weak', 'Fair', 'Good', 'Strong'];
  const colors = [Colors.error, '#F59E0B', '#3B82F6', Colors.success];

  return (
    <View style={pwStyles.wrap}>
      <View style={pwStyles.bars}>
        {[0, 1, 2, 3].map((i) => (
          <View
            key={i}
            style={[
              pwStyles.bar,
              { backgroundColor: i < strength ? colors[strength - 1] : Colors.border },
            ]}
          />
        ))}
      </View>
      <Text style={[pwStyles.label, { color: colors[strength - 1] || Colors.textLight }]}>
        {strength > 0 ? labels[strength - 1] : ''}
      </Text>
    </View>
  );
}

const pwStyles = StyleSheet.create({
  wrap: { flexDirection: 'row', alignItems: 'center', marginTop: -10, marginBottom: 16, gap: 8 },
  bars: { flex: 1, flexDirection: 'row', gap: 4 },
  bar: { flex: 1, height: 3, borderRadius: 2 },
  label: { fontSize: 11, fontWeight: '600', width: 44, textAlign: 'right' },
});

export default function EmployeeRegisterScreen({ navigation }) {
  const [fields, setFields] = useState({
    fullName: '',
    employeeId: '',
    mobile: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const set = (key) => (val) => {
    setFields((f) => ({ ...f, [key]: val }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const handleRegister = async () => {
    const errs = validate(fields);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);

    try {
      const data = await sendSmsOTP(fields.mobile.trim(), fields.fullName.trim());
      if (!data.success) {
        setErrors({ mobile: data.message || 'Failed to send SMS code. Try again.' });
        return;
      }
      navigation.navigate('EmployeeOTP', {
        fullName: fields.fullName.trim(),
        employeeId: fields.employeeId.trim().toUpperCase(),
        mobile: fields.mobile.trim(),
      });
    } catch {
      setErrors({ mobile: 'Network error. Make sure the server is running.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
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

      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Badge */}
        <View style={styles.badge}>
          <Ionicons name="briefcase-outline" size={14} color={Colors.primary} />
          <Text style={styles.badgeText}>Internal Employee</Text>
        </View>

        <Text style={styles.title}>Employee Registration</Text>
        <Text style={styles.subtitle}>
          Create your Darwish Interserve account. Your mobile number will be verified by SMS.
        </Text>

        {/* Form */}
        <InputField
          label="Full Name"
          value={fields.fullName}
          onChangeText={set('fullName')}
          placeholder="e.g. Mohammed Al-Mansoori"
          autoCapitalize="words"
          leftIcon="person-outline"
          error={errors.fullName}
        />

        <InputField
          label="Employee ID"
          value={fields.employeeId}
          onChangeText={set('employeeId')}
          placeholder="e.g. DI-2024-001"
          autoCapitalize="characters"
          leftIcon="card-outline"
          error={errors.employeeId}
          hint="Provided by HR — check your onboarding letter"
          maxLength={16}
        />

        <InputField
          label="Mobile Number"
          value={fields.mobile}
          onChangeText={set('mobile')}
          placeholder="+974 3312 3456"
          keyboardType="phone-pad"
          autoCapitalize="none"
          leftIcon="call-outline"
          error={errors.mobile}
          hint="Qatar (+974) or international format"
        />

        <InputField
          label="Password"
          value={fields.password}
          onChangeText={set('password')}
          placeholder="Min. 8 chars, 1 uppercase, 1 number"
          secureTextEntry
          leftIcon="lock-closed-outline"
          error={errors.password}
        />
        <PasswordStrength password={fields.password} />

        <InputField
          label="Confirm Password"
          value={fields.confirmPassword}
          onChangeText={set('confirmPassword')}
          placeholder="Re-enter your password"
          secureTextEntry
          leftIcon="lock-closed-outline"
          error={errors.confirmPassword}
        />

        {/* Security note */}
        <View style={styles.securityNote}>
          <Ionicons name="shield-checkmark-outline" size={16} color={Colors.success} />
          <Text style={styles.securityText}>
            Your data is encrypted and stored securely. Only Darwish Interserve HR has access.
          </Text>
        </View>

        <PrimaryButton
          title="Register & Send SMS Code"
          onPress={handleRegister}
          loading={loading}
          style={styles.submitBtn}
        />

        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity
          style={styles.guestLink}
          onPress={() => navigation.replace('GuestLogin')}
        >
          <Ionicons name="person-outline" size={16} color={Colors.textSecondary} />
          <Text style={styles.guestLinkText}>Continue as Guest instead</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
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
  scroll: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: 40,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: Radius.full,
    marginBottom: 16,
    gap: 6,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.primary,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 22,
    marginBottom: Spacing.lg,
  },
  securityNote: {
    flexDirection: 'row',
    backgroundColor: Colors.successLight,
    borderRadius: Radius.md,
    padding: 14,
    marginBottom: Spacing.md,
    gap: 10,
    alignItems: 'flex-start',
  },
  securityText: {
    flex: 1,
    fontSize: 13,
    color: '#065F46',
    lineHeight: 20,
  },
  submitBtn: {
    marginTop: 4,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  dividerText: {
    fontSize: 13,
    color: Colors.textLight,
  },
  guestLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    gap: 8,
  },
  guestLinkText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
});
