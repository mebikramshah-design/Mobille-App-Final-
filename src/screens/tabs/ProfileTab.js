import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Radius, Shadow } from '../../theme';

const SECTIONS = [
  {
    title: 'Account',
    items: [
      { icon: 'person-outline',          label: 'Personal Information', chevron: true },
      { icon: 'shield-checkmark-outline', label: 'Security & Password',  chevron: true },
      { icon: 'card-outline',            label: 'Employee Details',     chevron: true, employeeOnly: true },
    ],
  },
  {
    title: 'Preferences',
    items: [
      { icon: 'notifications-outline', label: 'Push Notifications',  toggle: true, value: true },
      { icon: 'mail-outline',          label: 'Email Updates',       toggle: true, value: true },
      { icon: 'finger-print-outline',  label: 'Biometric Login',     toggle: true, value: false, employeeOnly: true },
      { icon: 'language-outline',      label: 'Language',            chevron: true, hint: 'English' },
    ],
  },
  {
    title: 'Support',
    items: [
      { icon: 'help-circle-outline',     label: 'Help Center',        chevron: true },
      { icon: 'chatbubbles-outline',     label: 'Contact Support',    chevron: true },
      { icon: 'document-text-outline',   label: 'Terms of Service',   chevron: true },
      { icon: 'lock-closed-outline',     label: 'Privacy Policy',     chevron: true },
    ],
  },
];

function ProfileRow({ item }) {
  const [on, setOn] = React.useState(item.value);
  return (
    <TouchableOpacity style={styles.row} activeOpacity={item.toggle ? 1 : 0.7}>
      <View style={styles.rowIcon}>
        <Ionicons name={item.icon} size={18} color={Colors.primary} />
      </View>
      <Text style={styles.rowLabel}>{item.label}</Text>
      {item.toggle ? (
        <Switch
          value={on}
          onValueChange={setOn}
          trackColor={{ false: Colors.border, true: Colors.primary }}
          thumbColor={Colors.white}
        />
      ) : (
        <>
          {item.hint ? <Text style={styles.rowHint}>{item.hint}</Text> : null}
          {item.chevron ? <Ionicons name="chevron-forward" size={16} color={Colors.textLight} /> : null}
        </>
      )}
    </TouchableOpacity>
  );
}

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
          onPress: () => navigation.getParent()?.replace?.('Welcome') || navigation.replace('Welcome'),
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
          <TouchableOpacity style={styles.headerBtn}>
            <Ionicons name="settings-outline" size={20} color={Colors.white} />
          </TouchableOpacity>
        </View>

        {/* Profile card */}
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

          {isEmployee ? (
            <View style={styles.contactRow}>
              <View style={styles.contactItem}>
                <Ionicons name="call" size={12} color="rgba(255,255,255,0.65)" />
                <Text style={styles.contactText}>{user.mobile || '+974 ••••'}</Text>
              </View>
              <View style={styles.contactDivider} />
              <View style={styles.contactItem}>
                <Ionicons name="location" size={12} color="rgba(255,255,255,0.65)" />
                <Text style={styles.contactText}>Doha, Qatar</Text>
              </View>
            </View>
          ) : (
            <View style={styles.contactRow}>
              <View style={styles.contactItem}>
                <Ionicons name="mail" size={12} color="rgba(255,255,255,0.65)" />
                <Text style={styles.contactText}>{user.email || ''}</Text>
              </View>
            </View>
          )}
        </View>
      </LinearGradient>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Stat tiles — employee only */}
        {isEmployee && (
          <View style={styles.tileRow}>
            <View style={[styles.tile, { backgroundColor: '#EEF2FF' }]}>
              <Ionicons name="checkmark-done" size={20} color={Colors.primary} />
              <Text style={styles.tileValue}>248</Text>
              <Text style={styles.tileLabel}>Tasks Done</Text>
            </View>
            <View style={[styles.tile, { backgroundColor: '#FFF8E7' }]}>
              <Ionicons name="trophy" size={20} color={Colors.accent} />
              <Text style={styles.tileValue}>3</Text>
              <Text style={styles.tileLabel}>Awards</Text>
            </View>
            <View style={[styles.tile, { backgroundColor: '#D1FAE5' }]}>
              <Ionicons name="time" size={20} color={Colors.success} />
              <Text style={styles.tileValue}>1.2y</Text>
              <Text style={styles.tileLabel}>Tenure</Text>
            </View>
          </View>
        )}

        {/* Sections */}
        {SECTIONS.map((section) => {
          const items = section.items.filter((i) => !i.employeeOnly || isEmployee);
          if (items.length === 0) return null;

          return (
            <View key={section.title} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <View style={styles.card}>
                {items.map((item, idx) => (
                  <View key={item.label}>
                    <ProfileRow item={item} />
                    {idx < items.length - 1 && <View style={styles.rowDivider} />}
                  </View>
                ))}
              </View>
            </View>
          );
        })}

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={18} color={Colors.error} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <Text style={styles.version}>Darwish Interserve v1.0.0</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },

  headerGradient: {
    paddingTop: 52,
    paddingHorizontal: Spacing.lg,
    paddingBottom: 64,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  headerTitle: { fontSize: 22, fontWeight: '700', color: Colors.white, letterSpacing: -0.3 },
  headerBtn: {
    width: 38, height: 38, borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center', alignItems: 'center',
  },

  profileCard: { alignItems: 'center' },
  avatarLarge: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.25)',
    position: 'relative',
  },
  avatarLargeText: { fontSize: 36, fontWeight: '800', color: Colors.primary },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.white,
    borderRadius: 12,
  },
  profileName: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.white,
    marginTop: 12,
    letterSpacing: -0.3,
  },
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
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
  },
  contactItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  contactText: { fontSize: 12, color: 'rgba(255,255,255,0.7)' },
  contactDivider: { width: 1, height: 12, backgroundColor: 'rgba(255,255,255,0.25)' },

  scroll: { paddingBottom: 32 },

  tileRow: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: Spacing.lg,
    marginTop: -40,
  },
  tile: {
    flex: 1,
    borderRadius: Radius.md,
    padding: 14,
    alignItems: 'center',
    gap: 4,
    ...Shadow.md,
  },
  tileValue: { fontSize: 18, fontWeight: '800', color: Colors.text },
  tileLabel: { fontSize: 11, color: Colors.textSecondary, fontWeight: '600' },

  section: {
    marginTop: Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textSecondary,
    letterSpacing: 1,
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    overflow: 'hidden',
    ...Shadow.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 12,
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowLabel: { flex: 1, fontSize: 14, fontWeight: '500', color: Colors.text },
  rowHint: { fontSize: 12, color: Colors.textSecondary, marginRight: 4 },
  rowDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginLeft: 58,
  },

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
