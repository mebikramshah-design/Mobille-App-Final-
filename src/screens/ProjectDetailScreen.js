import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Linking,
  Share,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Radius, Shadow } from '../theme';

const SERVICES_PROVIDED = [
  { icon: 'shield-checkmark', label: 'Preventive Maintenance', color: '#10B981' },
  { icon: 'warning',          label: 'Reactive Maintenance',   color: '#F59E0B' },
  { icon: 'sparkles',         label: 'Cleaning & Soft Services', color: '#8B5CF6' },
  { icon: 'flash',            label: 'Energy Optimization',    color: '#3B82F6' },
];

export default function ProjectDetailScreen({ navigation, route }) {
  const { project } = route.params;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={project.color} />

      {/* Hero header */}
      <LinearGradient
        colors={[project.color, project.color + 'CC']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerAccent} />

        <View style={styles.headerTop}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={20} color={Colors.white} />
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={() =>
                Share.share({
                  message: `${project.name} — ${project.client}\n\n${project.description}`,
                })
              }
            >
              <Ionicons name="share-social-outline" size={18} color={Colors.white} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="bookmark-outline" size={18} color={Colors.white} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.heroIcon}>
          <Ionicons name={project.icon} size={36} color={Colors.white} />
        </View>

        <View style={styles.heroTag}>
          <Text style={styles.heroTagText}>{project.short.toUpperCase()}</Text>
        </View>
        <Text style={styles.heroTitle}>{project.name}</Text>

        <View style={styles.heroMetaRow}>
          <Ionicons name="briefcase-outline" size={13} color="rgba(255,255,255,0.85)" />
          <Text style={styles.heroMeta}>Client: {project.client}</Text>
        </View>
      </LinearGradient>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Quick stats */}
        <View style={styles.statsCard}>
          <View style={styles.statBox}>
            <Ionicons name="location" size={16} color={Colors.primary} />
            <Text style={styles.statValue}>{project.sites}</Text>
            <Text style={styles.statLabel}>Sites</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Ionicons name="time" size={16} color={Colors.success} />
            <Text style={styles.statValue}>Active</Text>
            <Text style={styles.statLabel}>Status</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Ionicons name="calendar" size={16} color={Colors.accent} />
            <Text style={styles.statValue}>Multi-yr</Text>
            <Text style={styles.statLabel}>Duration</Text>
          </View>
        </View>

        {/* Overview */}
        <View style={styles.section}>
          <Text style={styles.eyebrow}>OVERVIEW</Text>
          <Text style={styles.sectionTitle}>About This Project</Text>
          <Text style={styles.body}>
            This project involves delivering integrated facilities management
            services tailored to client requirements, ensuring operational
            excellence and long-term asset value.
          </Text>
        </View>

        {/* Services Provided */}
        <View style={styles.section}>
          <Text style={styles.eyebrow}>SCOPE OF WORK</Text>
          <Text style={styles.sectionTitle}>Services Provided</Text>

          <View style={styles.servicesList}>
            {SERVICES_PROVIDED.map((s) => (
              <View key={s.label} style={styles.serviceRow}>
                <View style={[styles.serviceIcon, { backgroundColor: s.color + '18' }]}>
                  <Ionicons name={s.icon} size={18} color={s.color} />
                </View>
                <Text style={styles.serviceLabel}>{s.label}</Text>
                <Ionicons name="checkmark-circle" size={18} color={Colors.success} />
              </View>
            ))}
          </View>
        </View>

        {/* Duration */}
        <View style={styles.section}>
          <Text style={styles.eyebrow}>ENGAGEMENT</Text>
          <Text style={styles.sectionTitle}>Duration</Text>
          <View style={styles.durationCard}>
            <View style={styles.durationIcon}>
              <Ionicons name="time-outline" size={20} color={Colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.durationTitle}>Ongoing</Text>
              <Text style={styles.durationSub}>Multi-year contract</Text>
            </View>
            <View style={styles.activePill}>
              <View style={styles.dot} />
              <Text style={styles.activeText}>ACTIVE</Text>
            </View>
          </View>
        </View>

        {/* CTA */}
        <View style={styles.ctaWrap}>
          <TouchableOpacity
            style={styles.ctaPrimary}
            activeOpacity={0.85}
            onPress={() =>
              Linking.openURL(
                `mailto:info@darwishinterserve.com?subject=${encodeURIComponent(
                  `Project brief request: ${project.name}`,
                )}`,
              )
            }
          >
            <Ionicons name="document-text-outline" size={18} color={Colors.white} />
            <Text style={styles.ctaPrimaryText}>Request Project Brief</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.ctaSecondary}
            activeOpacity={0.85}
            onPress={() => Linking.openURL('tel:+97444657777')}
          >
            <Ionicons name="call-outline" size={18} color={Colors.primary} />
            <Text style={styles.ctaSecondaryText}>Contact Account Manager</Text>
          </TouchableOpacity>
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
    paddingBottom: 28,
    overflow: 'hidden',
  },
  headerAccent: {
    position: 'absolute',
    top: -80,
    right: -80,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  heroTag: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.22)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radius.full,
    marginBottom: 8,
  },
  heroTagText: { fontSize: 10, fontWeight: '800', color: Colors.white, letterSpacing: 1 },
  heroTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.white,
    letterSpacing: -0.4,
    lineHeight: 28,
  },
  heroMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 8,
  },
  heroMeta: { fontSize: 12, color: 'rgba(255,255,255,0.85)', fontWeight: '600' },

  scroll: { paddingBottom: 32 },

  statsCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    marginHorizontal: Spacing.lg,
    marginTop: -Spacing.md,
    borderRadius: Radius.md,
    paddingVertical: 14,
    ...Shadow.md,
  },
  statBox: { flex: 1, alignItems: 'center', gap: 4 },
  statValue: { fontSize: 14, fontWeight: '800', color: Colors.text },
  statLabel: { fontSize: 10, color: Colors.textSecondary, fontWeight: '600' },
  statDivider: { width: 1, backgroundColor: Colors.border },

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
    marginBottom: 8,
  },
  body: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 20,
  },

  servicesList: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    overflow: 'hidden',
    ...Shadow.sm,
  },
  serviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  serviceIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceLabel: { flex: 1, fontSize: 13, fontWeight: '600', color: Colors.text },

  durationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: 14,
    gap: 12,
    ...Shadow.sm,
  },
  durationIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  durationTitle: { fontSize: 14, fontWeight: '700', color: Colors.text },
  durationSub: { fontSize: 12, color: Colors.textSecondary, marginTop: 2 },
  activePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: Radius.full,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.success,
  },
  activeText: { fontSize: 9, fontWeight: '800', color: '#065F46', letterSpacing: 0.6 },

  ctaWrap: {
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
    gap: 8,
    ...Shadow.md,
  },
  ctaPrimaryText: { color: Colors.white, fontSize: 15, fontWeight: '700' },
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
  ctaSecondaryText: { color: Colors.primary, fontSize: 15, fontWeight: '700' },
});
