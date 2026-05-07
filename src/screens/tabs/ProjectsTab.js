import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../../components/ScreenHeader';
import { Colors, Spacing, Radius, Shadow } from '../../theme';

export const PROJECTS = [
  {
    id: 'p1',
    name: 'Integrated Facility Management — Education Sector',
    short: 'Education Sector',
    client: 'Government Entity',
    description:
      'Comprehensive facility management services including maintenance, cleaning, and operational support for educational institutions.',
    icon: 'school',
    color: '#10B981',
    tint: '#E6FBF3',
    sites: 215,
  },
  {
    id: 'p2',
    name: 'Aviation Facility Maintenance',
    short: 'Aviation Sector',
    client: 'Aviation Sector',
    description:
      'Delivery of specialized maintenance services including HVAC systems, fire safety systems, and infrastructure support.',
    icon: 'airplane',
    color: '#3B82F6',
    tint: '#EBF2FF',
    sites: 12,
  },
  {
    id: 'p3',
    name: 'Commercial Property Management',
    short: 'Corporate',
    client: 'Corporate Client',
    description:
      'End-to-end facility management services ensuring operational efficiency and tenant satisfaction.',
    icon: 'business',
    color: '#8B5CF6',
    tint: '#F1ECFE',
    sites: 8,
  },
];

export default function ProjectsTab({ navigation, route }) {
  const user = route.params?.user || { type: 'guest', name: 'Guest' };

  return (
    <View style={styles.container}>
      <ScreenHeader
        user={user}
        title="Our Projects"
        subtitle="100+ active engagements"
        rightAction={{
          icon: 'options-outline',
          onPress: () => Alert.alert('Filter', 'Project filtering is coming soon.'),
        }}
      />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <View style={styles.titleBlock}>
          <Text style={styles.eyebrow}>OUR PORTFOLIO</Text>
          <Text style={styles.sectionTitle}>Our Projects</Text>
          <Text style={styles.sectionSub}>
            Selected projects that showcase our capability across multiple sectors.
          </Text>
        </View>

        {/* Stats strip */}
        <View style={styles.statsStrip}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>100+</Text>
            <Text style={styles.statLabel}>Active Projects</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statValue}>235</Text>
            <Text style={styles.statLabel}>Total Sites</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statValue}>3.5K+</Text>
            <Text style={styles.statLabel}>Workforce</Text>
          </View>
        </View>

        {/* Projects */}
        <View style={styles.list}>
          {PROJECTS.map((p, idx) => (
            <TouchableOpacity
              key={p.id}
              style={styles.card}
              activeOpacity={0.85}
              onPress={() => navigation.navigate('ProjectDetail', { project: p, user })}
            >
              {/* Banner */}
              <LinearGradient
                colors={[p.color, p.color + 'E0']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.banner}
              >
                <View style={styles.bannerAccent} />
                <View style={styles.bannerNumber}>
                  <Text style={styles.bannerNumberText}>0{idx + 1}</Text>
                </View>
                <View style={styles.bannerIconWrap}>
                  <Ionicons name={p.icon} size={32} color={Colors.white} />
                </View>
                <View style={styles.bannerTag}>
                  <Text style={styles.bannerTagText}>{p.short}</Text>
                </View>
              </LinearGradient>

              {/* Body */}
              <View style={styles.body}>
                <Text style={styles.projectName}>{p.name}</Text>

                <View style={styles.clientRow}>
                  <Ionicons name="briefcase-outline" size={13} color={Colors.textSecondary} />
                  <Text style={styles.clientLabel}>Client:</Text>
                  <Text style={styles.clientName}>{p.client}</Text>
                </View>

                <Text style={styles.description}>{p.description}</Text>

                <View style={styles.cardFooter}>
                  <View style={styles.footerLeft}>
                    <Ionicons name="location-outline" size={13} color={Colors.textSecondary} />
                    <Text style={styles.footerText}>{p.sites} sites</Text>
                  </View>
                  <View style={styles.viewBtn}>
                    <Text style={styles.viewBtnText}>View Details</Text>
                    <Ionicons name="arrow-forward" size={13} color={Colors.primary} />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { paddingBottom: 32 },

  titleBlock: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  eyebrow: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.accent,
    letterSpacing: 2,
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.text,
    letterSpacing: -0.4,
    marginBottom: 6,
  },
  sectionSub: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 19,
  },

  /* Stats strip */
  statsStrip: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.md,
    borderRadius: Radius.md,
    paddingVertical: 16,
    ...Shadow.sm,
  },
  statBox: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 19, fontWeight: '800', color: Colors.primary, letterSpacing: -0.3 },
  statLabel: { fontSize: 11, color: Colors.textSecondary, marginTop: 2, fontWeight: '600' },
  statDivider: { width: 1, backgroundColor: Colors.border },

  /* Project cards */
  list: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    gap: 14,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    ...Shadow.md,
  },
  banner: {
    height: 110,
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    position: 'relative',
    overflow: 'hidden',
  },
  bannerAccent: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  bannerNumber: {
    position: 'absolute',
    top: 14,
    right: 14,
  },
  bannerNumberText: {
    fontSize: 56,
    fontWeight: '900',
    color: 'rgba(255,255,255,0.18)',
    letterSpacing: -2,
  },
  bannerIconWrap: {
    width: 54,
    height: 54,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerTag: {
    position: 'absolute',
    bottom: 12,
    left: Spacing.md,
    backgroundColor: 'rgba(255,255,255,0.22)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radius.full,
  },
  bannerTagText: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.white,
    letterSpacing: 1,
  },

  body: {
    padding: Spacing.md,
  },
  projectName: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
    lineHeight: 21,
    marginBottom: 8,
    letterSpacing: -0.2,
  },
  clientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 8,
  },
  clientLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  clientName: {
    fontSize: 12,
    color: Colors.text,
    fontWeight: '700',
  },
  description: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 18,
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  footerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  footerText: { fontSize: 11, color: Colors.textSecondary, fontWeight: '600' },
  viewBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  viewBtnText: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '700',
  },
});
