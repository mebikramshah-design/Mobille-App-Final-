import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Radius, Shadow } from '../../theme';

const VALUES = [
  { icon: 'shield-checkmark', label: 'Integrity',  desc: 'We do the right thing',                     color: '#3B82F6' },
  { icon: 'star',             label: 'Excellence', desc: 'We deliver quality in everything we do',    color: '#C9A84C' },
  { icon: 'bulb',             label: 'Innovation', desc: 'We continuously improve',                   color: '#8B5CF6' },
  { icon: 'people',           label: 'Teamwork',   desc: 'We achieve more together',                  color: '#10B981' },
];

const CERTIFICATIONS = [
  { code: 'ISO 9001',  title: 'Quality Management',          color: '#3B82F6' },
  { code: 'ISO 14001', title: 'Environmental Management',    color: '#10B981' },
  { code: 'ISO 45001', title: 'Occupational Health & Safety', color: '#EF4444' },
  { code: 'ISO 41001', title: 'Facility Management Standards', color: '#8B5CF6' },
];

export default function ProfileTab({ navigation, route }) {
  const user = route.params?.user || { type: 'guest', name: 'Guest', email: '' };
  const isEmployee = user.type === 'employee';
  const initial = (user.name || 'U').charAt(0).toUpperCase();

  const handleLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Log Out',
          style: 'destructive',
          onPress: () => {
            const parent = navigation.getParent();
            if (parent?.reset) {
              parent.reset({ index: 0, routes: [{ name: 'Welcome' }] });
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.primaryDark, Colors.primary]}
        style={styles.headerGradient}
      >
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity
            style={styles.headerBtn}
            onPress={() =>
              Alert.alert('Settings', 'App settings will be available in a future update.')
            }
          >
            <Ionicons name="settings-outline" size={20} color={Colors.white} />
          </TouchableOpacity>
        </View>

        <View style={styles.profileCard}>
          <View style={styles.avatarLarge}>
            <Text style={styles.avatarLargeText}>{initial}</Text>
            {isEmployee && (
              <View style={styles.verifiedBadge}>
                <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
              </View>
            )}
          </View>
          <Text style={styles.profileName}>{user.name || 'User'}</Text>
          <View style={styles.profileType}>
            <Ionicons
              name={isEmployee ? 'briefcase' : 'person'}
              size={11}
              color={Colors.accent}
            />
            <Text style={styles.profileTypeText}>
              {isEmployee ? `Employee · ${user.employeeId || 'DI-XXXX-XXX'}` : 'Guest User'}
            </Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Company Overview */}
        <View style={styles.section}>
          <Text style={styles.eyebrow}>WHO WE ARE</Text>
          <Text style={styles.sectionTitle}>Company Overview</Text>
          <View style={styles.overviewCard}>
            <View style={styles.overviewIcon}>
              <Ionicons name="business" size={22} color={Colors.primary} />
            </View>
            <Text style={styles.overviewText}>
              Darwish Interserve is a 100% Qatari-owned integrated facilities
              management company delivering world-class services across multiple
              sectors.
            </Text>
          </View>
        </View>

        {/* Vision & Mission */}
        <View style={styles.section}>
          <Text style={styles.eyebrow}>OUR PURPOSE</Text>
          <Text style={styles.sectionTitle}>Vision & Mission</Text>

          <View style={styles.vmRow}>
            <View style={[styles.vmCard, { backgroundColor: '#EEF2FF' }]}>
              <View style={[styles.vmIcon, { backgroundColor: Colors.primary }]}>
                <Ionicons name="eye" size={18} color={Colors.white} />
              </View>
              <Text style={styles.vmLabel}>VISION</Text>
              <Text style={styles.vmText}>
                To be the leading facilities management provider in Qatar,
                delivering excellence through innovation, quality, and
                customer satisfaction.
              </Text>
            </View>

            <View style={[styles.vmCard, { backgroundColor: '#FFF8E7' }]}>
              <View style={[styles.vmIcon, { backgroundColor: Colors.accent }]}>
                <Ionicons name="flag" size={18} color={Colors.white} />
              </View>
              <Text style={[styles.vmLabel, { color: Colors.accent }]}>MISSION</Text>
              <Text style={styles.vmText}>
                To provide reliable and efficient facilities management services
                while maintaining the highest standards of safety, quality, and
                sustainability.
              </Text>
            </View>
          </View>
        </View>

        {/* Core Values */}
        <View style={styles.section}>
          <Text style={styles.eyebrow}>WHAT DRIVES US</Text>
          <Text style={styles.sectionTitle}>Core Values</Text>

          <View style={styles.valuesList}>
            {VALUES.map((v, idx) => (
              <View
                key={v.label}
                style={[
                  styles.valueRow,
                  idx === VALUES.length - 1 && { borderBottomWidth: 0 },
                ]}
              >
                <View style={[styles.valueIcon, { backgroundColor: v.color + '18' }]}>
                  <Ionicons name={v.icon} size={20} color={v.color} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.valueLabel}>{v.label}</Text>
                  <Text style={styles.valueDesc}>{v.desc}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Certifications */}
        <View style={styles.section}>
          <Text style={styles.eyebrow}>CERTIFIED EXCELLENCE</Text>
          <Text style={styles.sectionTitle}>Certifications</Text>

          <View style={styles.certGrid}>
            {CERTIFICATIONS.map((c) => (
              <View key={c.code} style={styles.certCard}>
                <View style={[styles.certBadge, { borderColor: c.color }]}>
                  <Ionicons name="ribbon" size={20} color={c.color} />
                </View>
                <Text style={[styles.certCode, { color: c.color }]}>{c.code}</Text>
                <Text style={styles.certTitle}>{c.title}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Contact */}
        <View style={styles.section}>
          <Text style={styles.eyebrow}>GET IN TOUCH</Text>
          <Text style={styles.sectionTitle}>Contact Information</Text>

          <View style={styles.contactList}>
            <TouchableOpacity style={styles.contactRow}>
              <View style={[styles.contactIcon, { backgroundColor: '#FFEEEE' }]}>
                <Ionicons name="location" size={18} color={Colors.error} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.contactLabel}>Office</Text>
                <Text style={styles.contactValue}>Doha, Qatar</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={Colors.textLight} />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.contactRow}
              onPress={() => Linking.openURL('mailto:info@darwishinterserve.com')}
            >
              <View style={[styles.contactIcon, { backgroundColor: '#EBF2FF' }]}>
                <Ionicons name="mail" size={18} color="#3B82F6" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.contactLabel}>Email</Text>
                <Text style={styles.contactValue}>info@darwishinterserve.com</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={Colors.textLight} />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.contactRow}
              onPress={() => Linking.openURL('tel:+97444657777')}
            >
              <View style={[styles.contactIcon, { backgroundColor: '#E6FBF3' }]}>
                <Ionicons name="call" size={18} color={Colors.success} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.contactLabel}>Phone</Text>
                <Text style={styles.contactValue}>+974 4465 7777</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={Colors.textLight} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={18} color={Colors.error} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <Text style={styles.version}>Darwish Interserve · v1.0.0</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },

  /* Header */
  headerGradient: {
    paddingTop: 52,
    paddingHorizontal: Spacing.lg,
    paddingBottom: 40,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  headerTitle: { fontSize: 22, fontWeight: '700', color: Colors.white, letterSpacing: -0.3 },
  headerBtn: {
    width: 38, height: 38, borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center', alignItems: 'center',
  },
  profileCard: { alignItems: 'center' },
  avatarLarge: {
    width: 76, height: 76,
    borderRadius: 38,
    backgroundColor: Colors.accent,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.25)',
    position: 'relative',
  },
  avatarLargeText: { fontSize: 30, fontWeight: '800', color: Colors.primary },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.white,
    borderRadius: 12,
  },
  profileName: { fontSize: 20, fontWeight: '700', color: Colors.white, marginTop: 10 },
  profileType: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(201,168,76,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radius.full,
    marginTop: 6,
  },
  profileTypeText: { fontSize: 11, color: Colors.accentLight, fontWeight: '700', letterSpacing: 0.5 },

  scroll: { paddingBottom: 32 },

  /* Section */
  section: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
  },
  eyebrow: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.accent,
    letterSpacing: 2,
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    letterSpacing: -0.3,
    marginBottom: 12,
  },

  /* Overview */
  overviewCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: 14,
    gap: 12,
    alignItems: 'flex-start',
    marginTop: -20,
    ...Shadow.md,
  },
  overviewIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overviewText: {
    flex: 1,
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 20,
  },

  /* Vision & Mission */
  vmRow: { flexDirection: 'row', gap: 10 },
  vmCard: {
    flex: 1,
    borderRadius: Radius.md,
    padding: 14,
  },
  vmIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  vmLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.primary,
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  vmText: {
    fontSize: 12,
    color: Colors.text,
    lineHeight: 18,
  },

  /* Values */
  valuesList: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    overflow: 'hidden',
    ...Shadow.sm,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  valueIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  valueLabel: { fontSize: 14, fontWeight: '700', color: Colors.text },
  valueDesc: { fontSize: 12, color: Colors.textSecondary, marginTop: 2 },

  /* Certifications */
  certGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  certCard: {
    width: '47.5%',
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: 14,
    alignItems: 'center',
    gap: 6,
    ...Shadow.sm,
  },
  certBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  certCode: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  certTitle: {
    fontSize: 11,
    color: Colors.textSecondary,
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 15,
  },

  /* Contact */
  contactList: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    overflow: 'hidden',
    ...Shadow.sm,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 12,
  },
  contactIcon: {
    width: 38,
    height: 38,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactLabel: { fontSize: 11, color: Colors.textSecondary, fontWeight: '600' },
  contactValue: { fontSize: 14, fontWeight: '700', color: Colors.text, marginTop: 2 },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginLeft: 64,
  },

  /* Logout */
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FEE2E2',
    paddingVertical: 14,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
    borderRadius: Radius.md,
  },
  logoutText: { fontSize: 14, fontWeight: '700', color: Colors.error },

  version: {
    textAlign: 'center',
    fontSize: 11,
    color: Colors.textLight,
    marginTop: Spacing.md,
  },
});
