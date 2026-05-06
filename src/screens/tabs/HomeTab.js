import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../../components/ScreenHeader';
import { Colors, Spacing, Radius, Shadow } from '../../theme';

const SERVICES = [
  { icon: 'construct-outline', label: 'Hard FM',     color: '#3B82F6' },
  { icon: 'leaf-outline',      label: 'Soft FM',     color: '#10B981' },
  { icon: 'shield-outline',    label: 'Security',    color: '#EF4444' },
  { icon: 'flash-outline',     label: 'MEP',         color: '#F59E0B' },
  { icon: 'water-outline',     label: 'Cleaning',    color: '#06B6D4' },
  { icon: 'leaf-sharp',        label: 'Landscaping', color: '#84CC16' },
];

const EMP_QUICK = [
  { icon: 'clipboard-outline', label: 'Work Orders',  badge: 3 },
  { icon: 'time-outline',      label: 'Clock In',     badge: null },
  { icon: 'calendar-outline',  label: 'My Schedule',  badge: null },
  { icon: 'document-outline',  label: 'Reports',      badge: 1 },
];

const STATS = [
  { value: '14+',  label: 'Years in Qatar' },
  { value: '85%',  label: 'Public Schools' },
  { value: '7K+',  label: 'Staff Strength' },
];

export default function HomeTab({ navigation, route }) {
  const user = route.params?.user || { type: 'guest', name: 'Guest' };
  const isEmployee = user.type === 'employee';
  const firstName = (user.name || '').split(' ')[0] || 'there';

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';

  return (
    <View style={styles.container}>
      <ScreenHeader
        user={user}
        title={`${greeting},`}
        subtitle={firstName}
        rightAction={{ icon: 'notifications-outline', onPress: () => {}, badge: isEmployee ? 5 : null }}
      />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero card */}
        <View style={styles.heroWrap}>
          <LinearGradient
            colors={[Colors.primary, Colors.primaryLight]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.hero}
          >
            <View style={styles.heroAccent} />
            <Text style={styles.heroLabel}>QATAR'S LEADING FM COMPANY</Text>
            <Text style={styles.heroTitle}>Excellence{'\n'}in Every Detail</Text>
            <Text style={styles.heroBody}>
              {isEmployee
                ? "Your work powers Qatar's most trusted facilities. Stay connected, stay productive."
                : 'Discover our integrated facility management services across Qatar.'}
            </Text>
            <View style={styles.statsRow}>
              {STATS.map((s) => (
                <View key={s.label} style={styles.statBox}>
                  <Text style={styles.statValue}>{s.value}</Text>
                  <Text style={styles.statLabel}>{s.label}</Text>
                </View>
              ))}
            </View>
          </LinearGradient>
        </View>

        {/* Quick actions — employee only */}
        {isEmployee && (
          <>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.quickRow}>
              {EMP_QUICK.map((q) => (
                <TouchableOpacity key={q.label} style={styles.quickCard}>
                  {q.badge ? (
                    <View style={styles.quickBadge}>
                      <Text style={styles.quickBadgeText}>{q.badge}</Text>
                    </View>
                  ) : null}
                  <View style={styles.quickIcon}>
                    <Ionicons name={q.icon} size={22} color={Colors.primary} />
                  </View>
                  <Text style={styles.quickLabel}>{q.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        {/* Services */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Our Services</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.grid}>
          {SERVICES.map((s) => (
            <TouchableOpacity key={s.label} style={styles.serviceCard}>
              <View style={[styles.serviceIcon, { backgroundColor: s.color + '18' }]}>
                <Ionicons name={s.icon} size={22} color={s.color} />
              </View>
              <Text style={styles.serviceLabel}>{s.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Featured client */}
        <Text style={styles.sectionTitle}>Featured Client</Text>
        <TouchableOpacity style={styles.featuredCard}>
          <View style={styles.featuredLeft}>
            <View style={styles.featuredIcon}>
              <Ionicons name="airplane" size={22} color={Colors.accent} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.featuredTitle}>Hamad International Airport</Text>
              <Text style={styles.featuredBody}>
                Integrated FM services for one of the world's leading airports.
              </Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={18} color={Colors.textLight} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { paddingBottom: 24 },
  heroWrap: { paddingHorizontal: Spacing.lg, marginTop: -Spacing.md },
  hero: {
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    overflow: 'hidden',
    ...Shadow.md,
  },
  heroAccent: {
    position: 'absolute',
    top: -60,
    right: -60,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: Colors.accent,
    opacity: 0.18,
  },
  heroLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.accentLight,
    letterSpacing: 1.5,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.white,
    marginTop: 8,
    letterSpacing: -0.5,
    lineHeight: 30,
  },
  heroBody: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 8,
    marginBottom: 16,
    lineHeight: 20,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: Radius.md,
    padding: 12,
  },
  statBox: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 18, fontWeight: '800', color: Colors.accent },
  statLabel: { fontSize: 10, color: 'rgba(255,255,255,0.7)', marginTop: 2, textAlign: 'center' },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  seeAll: { fontSize: 13, color: Colors.primary, fontWeight: '600' },
  quickRow: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: Spacing.lg,
  },
  quickCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: 12,
    alignItems: 'center',
    gap: 6,
    position: 'relative',
    ...Shadow.sm,
  },
  quickBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: Colors.error,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  quickBadgeText: { fontSize: 10, fontWeight: '700', color: Colors.white },
  quickIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickLabel: { fontSize: 11, fontWeight: '600', color: Colors.text, textAlign: 'center' },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingHorizontal: Spacing.lg,
  },
  serviceCard: {
    width: '31.5%',
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: 14,
    alignItems: 'center',
    gap: 8,
    ...Shadow.sm,
  },
  serviceIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceLabel: { fontSize: 11, fontWeight: '600', color: Colors.text, textAlign: 'center' },
  featuredCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginHorizontal: Spacing.lg,
    ...Shadow.sm,
  },
  featuredLeft: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 12 },
  featuredIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#FFF8E7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  featuredTitle: { fontSize: 14, fontWeight: '700', color: Colors.text },
  featuredBody: { fontSize: 12, color: Colors.textSecondary, marginTop: 2, lineHeight: 18 },
});
