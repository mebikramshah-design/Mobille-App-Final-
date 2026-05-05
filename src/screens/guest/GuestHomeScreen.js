import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Logo from '../../components/Logo';
import { Colors, Spacing, Radius, Shadow } from '../../theme';

const SERVICES = [
  { icon: 'construct-outline', label: 'Hard Services', color: '#3B82F6' },
  { icon: 'leaf-outline', label: 'Soft Services', color: '#10B981' },
  { icon: 'settings-outline', label: 'Managed Services', color: '#8B5CF6' },
  { icon: 'shield-outline', label: 'Security', color: '#EF4444' },
  { icon: 'flash-outline', label: 'MEP Services', color: '#F59E0B' },
  { icon: 'water-outline', label: 'Cleaning', color: '#06B6D4' },
];

const QUICK_LINKS = [
  { icon: 'call-outline', label: 'Contact Us', color: Colors.primary },
  { icon: 'location-outline', label: 'Locations', color: Colors.accent },
  { icon: 'document-text-outline', label: 'Reports', color: '#8B5CF6' },
  { icon: 'help-circle-outline', label: 'Support', color: Colors.success },
];

export default function GuestHomeScreen({ navigation, route }) {
  const { name, gmail } = route.params || {};

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />

      {/* Header */}
      <LinearGradient
        colors={[Colors.primaryDark, Colors.primary]}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <Logo size="sm" inverted />
          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={() => navigation.replace('Welcome')}
          >
            <Ionicons name="log-out-outline" size={22} color={Colors.white} />
          </TouchableOpacity>
        </View>

        <View style={styles.welcomeRow}>
          <View>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.userName}>{name || 'Guest'}</Text>
            <View style={styles.guestBadge}>
              <Ionicons name="person-outline" size={11} color={Colors.accent} />
              <Text style={styles.guestBadgeText}>Guest Access</Text>
            </View>
          </View>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>
              {(name || 'G').charAt(0).toUpperCase()}
            </Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Services grid */}
        <Text style={styles.sectionTitle}>Our Services</Text>
        <View style={styles.grid}>
          {SERVICES.map((s) => (
            <TouchableOpacity key={s.label} style={styles.serviceCard}>
              <View style={[styles.serviceIcon, { backgroundColor: s.color + '18' }]}>
                <Ionicons name={s.icon} size={24} color={s.color} />
              </View>
              <Text style={styles.serviceLabel}>{s.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick links */}
        <Text style={styles.sectionTitle}>Quick Access</Text>
        <View style={styles.quickRow}>
          {QUICK_LINKS.map((q) => (
            <TouchableOpacity key={q.label} style={styles.quickCard}>
              <Ionicons name={q.icon} size={22} color={q.color} />
              <Text style={styles.quickLabel}>{q.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Info card */}
        <View style={styles.infoCard}>
          <LinearGradient
            colors={[Colors.primary, Colors.primaryLight]}
            style={styles.infoGradient}
          >
            <Text style={styles.infoTitle}>Qatar's Leading FM Company</Text>
            <Text style={styles.infoBody}>
              Serving 85% of Qatar's public school sector and landmark facilities
              including Hamad International Airport, Aspire Zone, and more.
            </Text>
            <TouchableOpacity style={styles.infoBtn}>
              <Text style={styles.infoBtnText}>Learn More</Text>
              <Ionicons name="arrow-forward" size={14} color={Colors.accent} />
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    paddingTop: 52,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  logoutBtn: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  welcomeText: { fontSize: 14, color: 'rgba(255,255,255,0.7)' },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.white,
    marginVertical: 2,
  },
  guestBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(201,168,76,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.full,
    gap: 4,
    alignSelf: 'flex-start',
  },
  guestBadgeText: { fontSize: 11, color: Colors.accentLight, fontWeight: '600' },
  avatarCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: { fontSize: 22, fontWeight: '700', color: Colors.primary },
  scroll: { paddingHorizontal: Spacing.lg, paddingTop: Spacing.lg, paddingBottom: 40 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.md,
    marginTop: Spacing.sm,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: Spacing.lg,
  },
  serviceCard: {
    width: '30%',
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: 14,
    alignItems: 'center',
    gap: 8,
    ...Shadow.sm,
  },
  serviceIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceLabel: { fontSize: 11, fontWeight: '600', color: Colors.text, textAlign: 'center' },
  quickRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: Spacing.lg,
  },
  quickCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: 14,
    alignItems: 'center',
    gap: 6,
    ...Shadow.sm,
  },
  quickLabel: { fontSize: 10, fontWeight: '600', color: Colors.textSecondary, textAlign: 'center' },
  infoCard: {
    borderRadius: Radius.lg,
    overflow: 'hidden',
    ...Shadow.md,
  },
  infoGradient: { padding: Spacing.lg },
  infoTitle: { fontSize: 17, fontWeight: '700', color: Colors.white, marginBottom: 8 },
  infoBody: { fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 20, marginBottom: 16 },
  infoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
  },
  infoBtnText: { fontSize: 14, fontWeight: '600', color: Colors.accent },
});
