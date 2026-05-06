import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../../components/ScreenHeader';
import { Colors, Spacing, Radius, Shadow } from '../../theme';

const SERVICES = [
  {
    icon: 'construct',
    title: 'Hard Services',
    description: 'Mechanical, Electrical, HVAC, Plumbing, and Civil maintenance solutions ensuring efficient and reliable operations.',
    color: '#3B82F6',
    tint: '#EBF2FF',
  },
  {
    icon: 'leaf',
    title: 'Soft Services',
    description: 'Cleaning, landscaping, pest control, and support services designed to maintain safe and comfortable environments.',
    color: '#10B981',
    tint: '#E6FBF3',
  },
  {
    icon: 'settings',
    title: 'Managed Services',
    description: 'Integrated FM solutions including energy management, consulting, and compliance with international standards.',
    color: '#8B5CF6',
    tint: '#F1ECFE',
  },
];

const HIGHLIGHTS = [
  { value: '3500+',  label: 'Skilled Employees',     icon: 'people',    color: '#3B82F6' },
  { value: '100+',   label: 'Active Projects',       icon: 'briefcase', color: '#C9A84C' },
  { value: '14+',    label: 'Years of Experience',   icon: 'trophy',    color: '#10B981' },
  { value: 'Qatar',  label: 'Operating Nationwide',  icon: 'location',  color: '#EF4444' },
];

const CLIENT_LOGOS = [
  { initials: 'HIA', label: 'Aviation', color: '#3B82F6' },
  { initials: 'QU',  label: 'Education', color: '#10B981' },
  { initials: 'KAT', label: 'Cultural',  color: '#8B5CF6' },
  { initials: 'AZ',  label: 'Sports',    color: '#F59E0B' },
  { initials: '+',   label: '20 more',   color: Colors.textLight },
];

export default function HomeTab({ navigation, route }) {
  const user = route.params?.user || { type: 'guest', name: 'Guest' };
  const firstName = (user.name || '').split(' ')[0] || 'there';

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';

  return (
    <View style={styles.container}>
      <ScreenHeader
        user={user}
        title={`${greeting},`}
        subtitle={firstName}
        rightAction={{
          icon: 'notifications-outline',
          onPress: () => {},
          badge: user.type === 'employee' ? 5 : null,
        }}
      />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* ── HERO ── */}
        <View style={styles.heroWrap}>
          <LinearGradient
            colors={[Colors.primary, Colors.primaryLight]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.hero}
          >
            <View style={styles.heroAccent} />
            <View style={styles.heroAccentSm} />

            <View style={styles.heroEyebrowRow}>
              <View style={styles.heroDivider} />
              <Text style={styles.heroEyebrow}>WELCOME TO DIFM</Text>
            </View>

            <Text style={styles.heroTitle}>
              Redefining the Future{'\n'}for People and Places
            </Text>
            <Text style={styles.heroSubtitle}>
              Your Trusted Facilities Management Partner in Qatar
            </Text>
          </LinearGradient>
        </View>

        {/* ── ABOUT ── */}
        <View style={styles.section}>
          <Text style={styles.sectionEyebrow}>ABOUT US</Text>
          <Text style={styles.sectionTitle}>
            A leading integrated FM company
          </Text>
          <Text style={styles.sectionBody}>
            Darwish Interserve is a leading integrated facilities management
            company in Qatar, established in 2010. With a highly skilled
            workforce, we deliver high-quality services across commercial,
            residential, and government sectors.
          </Text>
        </View>

        {/* ── SERVICES ── */}
        <View style={styles.section}>
          <Text style={styles.sectionEyebrow}>WHAT WE DO</Text>
          <Text style={styles.sectionTitle}>Our Services</Text>

          <View style={styles.servicesList}>
            {SERVICES.map((s, idx) => (
              <TouchableOpacity
                key={s.title}
                style={[styles.serviceCard, idx === SERVICES.length - 1 && { marginBottom: 0 }]}
                activeOpacity={0.85}
              >
                <View style={[styles.serviceIcon, { backgroundColor: s.tint }]}>
                  <Ionicons name={s.icon} size={26} color={s.color} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.serviceTitle}>{s.title}</Text>
                  <Text style={styles.serviceDesc}>{s.description}</Text>
                </View>
                <View style={[styles.serviceArrow, { backgroundColor: s.tint }]}>
                  <Ionicons name="arrow-forward" size={14} color={s.color} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ── HIGHLIGHTS ── */}
        <View style={[styles.section, { backgroundColor: Colors.surface, paddingVertical: 22 }]}>
          <Text style={[styles.sectionEyebrow, { textAlign: 'center' }]}>BY THE NUMBERS</Text>
          <Text style={[styles.sectionTitle, { textAlign: 'center', marginBottom: 18 }]}>
            Company Highlights
          </Text>

          <View style={styles.highlightsGrid}>
            {HIGHLIGHTS.map((h) => (
              <View key={h.label} style={styles.highlightCard}>
                <View style={[styles.highlightIcon, { backgroundColor: h.color + '18' }]}>
                  <Ionicons name={h.icon} size={20} color={h.color} />
                </View>
                <Text style={[styles.highlightValue, { color: h.color }]}>{h.value}</Text>
                <Text style={styles.highlightLabel}>{h.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── CLIENTS ── */}
        <View style={styles.section}>
          <Text style={styles.sectionEyebrow}>OUR CLIENTS</Text>
          <Text style={styles.sectionTitle}>Trusted by leaders</Text>
          <Text style={styles.sectionBody}>
            Trusted by leading organizations across Qatar, including aviation,
            government, and commercial sectors.
          </Text>

          <View style={styles.clientsRow}>
            {CLIENT_LOGOS.map((c, i) => (
              <View key={i} style={styles.clientCard}>
                <View style={[styles.clientLogo, { backgroundColor: c.color + '18' }]}>
                  <Text style={[styles.clientInitials, { color: c.color }]}>{c.initials}</Text>
                </View>
                <Text style={styles.clientLabel}>{c.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── CTA ── */}
        <View style={styles.ctaSection}>
          <TouchableOpacity
            style={styles.ctaPrimary}
            activeOpacity={0.85}
            onPress={() => navigation?.navigate?.('Projects')}
          >
            <Ionicons name="briefcase" size={18} color={Colors.white} />
            <Text style={styles.ctaPrimaryText}>Explore Our Projects</Text>
            <Ionicons name="arrow-forward" size={16} color={Colors.white} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.ctaSecondary} activeOpacity={0.85}>
            <Ionicons name="call-outline" size={18} color={Colors.primary} />
            <Text style={styles.ctaSecondaryText}>Contact Us Today</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { paddingBottom: 24 },

  /* Hero */
  heroWrap: { paddingHorizontal: Spacing.lg, marginTop: -Spacing.md },
  hero: {
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    paddingVertical: 28,
    overflow: 'hidden',
    ...Shadow.md,
  },
  heroAccent: {
    position: 'absolute',
    top: -80,
    right: -80,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: Colors.accent,
    opacity: 0.18,
  },
  heroAccentSm: {
    position: 'absolute',
    bottom: -40,
    left: -40,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  heroEyebrowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
  },
  heroDivider: {
    width: 24,
    height: 2,
    backgroundColor: Colors.accent,
    borderRadius: 1,
  },
  heroEyebrow: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.accentLight,
    letterSpacing: 2,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.white,
    letterSpacing: -0.4,
    lineHeight: 30,
  },
  heroSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.78)',
    marginTop: 8,
    lineHeight: 20,
  },

  /* Section */
  section: {
    paddingHorizontal: Spacing.lg,
    paddingTop: 28,
  },
  sectionEyebrow: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.accent,
    letterSpacing: 2,
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    letterSpacing: -0.3,
    marginBottom: 8,
  },
  sectionBody: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 21,
    marginBottom: 14,
  },

  /* Services */
  servicesList: { marginTop: 6 },
  serviceCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: 14,
    marginBottom: 10,
    alignItems: 'center',
    gap: 12,
    ...Shadow.sm,
  },
  serviceIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 3,
  },
  serviceDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 17,
  },
  serviceArrow: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* Highlights */
  highlightsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  highlightCard: {
    width: '47.5%',
    backgroundColor: Colors.background,
    borderRadius: Radius.md,
    padding: 14,
    alignItems: 'flex-start',
    gap: 6,
  },
  highlightIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  highlightValue: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  highlightLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textSecondary,
  },

  /* Clients */
  clientsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 4,
  },
  clientCard: {
    width: '18%',
    alignItems: 'center',
    gap: 5,
  },
  clientLogo: {
    width: 52,
    height: 52,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clientInitials: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  clientLabel: {
    fontSize: 9,
    color: Colors.textSecondary,
    fontWeight: '600',
    textAlign: 'center',
  },

  /* CTA */
  ctaSection: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    gap: 10,
  },
  ctaPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: Radius.md,
    gap: 10,
    ...Shadow.md,
  },
  ctaPrimaryText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
    marginLeft: -10,
  },
  ctaSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    paddingVertical: 13,
    borderRadius: Radius.md,
    gap: 8,
  },
  ctaSecondaryText: {
    color: Colors.primary,
    fontSize: 15,
    fontWeight: '700',
  },
});
