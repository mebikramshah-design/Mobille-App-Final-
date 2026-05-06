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

function validate(name, gmail) {
  const errors = {};
  if (!name.trim()) {
    errors.name = 'Full name is required';
  } else if (name.trim().length < 3) {
    errors.name = 'Name must be at least 3 characters';
  }
  if (!gmail.trim()) {
    errors.gmail = 'Gmail address is required';
  } else if (!/^[^\s@]+@gmail\.com$/i.test(gmail.trim())) {
    errors.gmail = 'Please enter a valid Gmail address (@gmail.com)';
  }
  return errors;
}

export default function GuestLoginScreen({ navigation }) {
  const [name, setName] = useState('');
  const [gmail, setGmail] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async () => {
    const errs = validate(name, gmail);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);

    // Simulate API call to send OTP to Gmail
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);

    navigation.navigate('GuestOTP', {
      name: name.trim(),
      gmail: gmail.trim().toLowerCase(),
    });
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
          <Ionicons name="person-outline" size={14} color={Colors.accent} />
          <Text style={styles.badgeText}>Guest Access</Text>
        </View>

        <Text style={styles.title}>Guest Login</Text>
        <Text style={styles.subtitle}>
          Enter your name and Gmail to receive a one-time verification code.
        </Text>

        {/* Info card */}
        <View style={styles.infoCard}>
          <Ionicons name="information-circle" size={18} color={Colors.primaryLight} />
          <Text style={styles.infoText}>
            A 6-digit OTP will be sent to your Gmail inbox. No account creation required.
          </Text>
        </View>

        {/* Form */}
        <InputField
          label="Full Name"
          value={name}
          onChangeText={(t) => { setName(t); setErrors((e) => ({ ...e, name: undefined })); }}
          placeholder="e.g. Ahmed Al-Rashid"
          autoCapitalize="words"
          leftIcon="person-outline"
          error={errors.name}
        />

        <InputField
          label="Gmail Address"
          value={gmail}
          onChangeText={(t) => { setGmail(t); setErrors((e) => ({ ...e, gmail: undefined })); }}
          placeholder="yourname@gmail.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          leftIcon="mail-outline"
          error={errors.gmail}
          hint="We only accept @gmail.com addresses"
        />

        <PrimaryButton
          title="Send Verification Code"
          onPress={handleSendOTP}
          loading={loading}
          style={styles.submitBtn}
        />

        {/* Terms */}
        <Text style={styles.terms}>
          By continuing, you agree to Darwish Interserve's{' '}
          <Text style={styles.link}>Terms of Service</Text> and{' '}
          <Text style={styles.link}>Privacy Policy</Text>.
        </Text>

        {/* Divider */}
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity
          style={styles.employeeLink}
          onPress={() => navigation.replace('EmployeeRegister')}
        >
          <Ionicons name="briefcase-outline" size={16} color={Colors.primary} />
          <Text style={styles.employeeLinkText}>I'm an Employee — Login / Register</Text>
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
    backgroundColor: '#FFF8E7',
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
    color: Colors.accent,
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
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#EEF2FF',
    borderRadius: Radius.md,
    padding: 14,
    marginBottom: Spacing.lg,
    gap: 10,
    alignItems: 'flex-start',
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: Colors.primaryLight,
    lineHeight: 20,
  },
  submitBtn: {
    marginTop: 8,
  },
  terms: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 18,
  },
  link: {
    color: Colors.primary,
    fontWeight: '600',
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
  employeeLink: {
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
  employeeLinkText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
});
