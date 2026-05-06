import React, { useState } from 'react';
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

const STATUSES = [
  { key: 'all',      label: 'All',       count: 24 },
  { key: 'active',   label: 'Active',    count: 18 },
  { key: 'pending',  label: 'Pending',   count: 4 },
  { key: 'complete', label: 'Complete',  count: 2 },
];

const PROJECTS = [
  {
    id: '1',
    name: 'Hamad International Airport',
    code: 'HIA-2024-FM',
    sector: 'Aviation',
    status: 'active',
    progress: 78,
    icon: 'airplane',
    color: '#3B82F6',
    sites: 12,
    staff: 240,
    nextMilestone: 'Annual MEP audit · May 22',
  },
  {
    id: '2',
    name: 'Qatar Public Schools Network',
    code: 'PSN-2024-INT',
    sector: 'Education',
    status: 'active',
    progress: 92,
    icon: 'school',
    color: '#10B981',
    sites: 215,
    staff: 1200,
    nextMilestone: 'Term-end deep clean · May 28',
  },
  {
    id: '3',
    name: 'Aspire Zone Foundation',
    code: 'AZF-2024-SPT',
    sector: 'Sports',
    status: 'active',
    progress: 64,
    icon: 'fitness',
    color: '#F59E0B',
    sites: 8,
    staff: 180,
    nextMilestone: 'Stadium prep · May 15',
  },
  {
    id: '4',
    name: 'Katara Cultural Village',
    code: 'KAT-2024-CLT',
    sector: 'Culture',
    status: 'pending',
    progress: 35,
    icon: 'business',
    color: '#8B5CF6',
    sites: 6,
    staff: 95,
    nextMilestone: 'Phase 2 kickoff · Jun 03',
  },
  {
    id: '5',
    name: 'Qatar Airways HQ',
    code: 'QA-2024-FM',
    sector: 'Aviation',
    status: 'active',
    progress: 88,
    icon: 'briefcase',
    color: '#06B6D4',
    sites: 3,
    staff: 110,
    nextMilestone: 'HVAC quarterly · May 19',
  },
];

const STATUS_COLORS = {
  active:   { bg: '#D1FAE5', text: '#065F46', label: 'Active' },
  pending:  { bg: '#FEF3C7', text: '#92400E', label: 'Pending' },
  complete: { bg: '#DBEAFE', text: '#1E40AF', label: 'Complete' },
};

export default function ProjectsTab({ route }) {
  const user = route.params?.user || { type: 'guest', name: 'Guest' };
  const [status, setStatus] = useState('all');

  const filtered = status === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.status === status);

  return (
    <View style={styles.container}>
      <ScreenHeader
        user={user}
        title="Projects"
        subtitle={user.type === 'employee' ? 'Your assigned sites' : 'Our portfolio'}
        rightAction={{ icon: 'options-outline', onPress: () => {} }}
      />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Stats summary */}
        <View style={styles.statsCard}>
          <View style={styles.statsItem}>
            <Text style={styles.statsValue}>24</Text>
            <Text style={styles.statsLabel}>Total Projects</Text>
          </View>
          <View style={styles.statsDivider} />
          <View style={styles.statsItem}>
            <Text style={[styles.statsValue, { color: Colors.success }]}>18</Text>
            <Text style={styles.statsLabel}>Active</Text>
          </View>
          <View style={styles.statsDivider} />
          <View style={styles.statsItem}>
            <Text style={[styles.statsValue, { color: Colors.accent }]}>1.8K</Text>
            <Text style={styles.statsLabel}>Staff</Text>
          </View>
          <View style={styles.statsDivider} />
          <View style={styles.statsItem}>
            <Text style={[styles.statsValue, { color: '#3B82F6' }]}>244</Text>
            <Text style={styles.statsLabel}>Sites</Text>
          </View>
        </View>

        {/* Status filter pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filters}
        >
          {STATUSES.map((s) => (
            <TouchableOpacity
              key={s.key}
              style={[styles.filterPill, status === s.key && styles.filterPillActive]}
              onPress={() => setStatus(s.key)}
            >
              <Text style={[styles.filterText, status === s.key && styles.filterTextActive]}>
                {s.label}
              </Text>
              <View style={[styles.filterCount, status === s.key && styles.filterCountActive]}>
                <Text style={[
                  styles.filterCountText,
                  status === s.key && styles.filterCountTextActive,
                ]}>{s.count}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Project list */}
        <View style={styles.list}>
          {filtered.map((p) => {
            const sc = STATUS_COLORS[p.status];
            return (
              <TouchableOpacity key={p.id} style={styles.projectCard} activeOpacity={0.85}>
                {/* Top row */}
                <View style={styles.cardTop}>
                  <View style={[styles.projectIcon, { backgroundColor: p.color + '18' }]}>
                    <Ionicons name={p.icon} size={22} color={p.color} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <View style={styles.projectHead}>
                      <Text style={styles.projectName} numberOfLines={1}>{p.name}</Text>
                      <View style={[styles.statusPill, { backgroundColor: sc.bg }]}>
                        <Text style={[styles.statusText, { color: sc.text }]}>{sc.label}</Text>
                      </View>
                    </View>
                    <View style={styles.projectMetaRow}>
                      <Text style={styles.projectCode}>{p.code}</Text>
                      <Text style={styles.projectDot}>•</Text>
                      <Text style={styles.projectSector}>{p.sector}</Text>
                    </View>
                  </View>
                </View>

                {/* Progress */}
                <View style={styles.progressRow}>
                  <View style={styles.progressInfo}>
                    <Text style={styles.progressLabel}>Progress</Text>
                    <Text style={[styles.progressValue, { color: p.color }]}>{p.progress}%</Text>
                  </View>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressFill,
                        { width: `${p.progress}%`, backgroundColor: p.color },
                      ]}
                    />
                  </View>
                </View>

                {/* Footer */}
                <View style={styles.cardFooter}>
                  <View style={styles.metaItem}>
                    <Ionicons name="location-outline" size={13} color={Colors.textSecondary} />
                    <Text style={styles.metaText}>{p.sites} sites</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Ionicons name="people-outline" size={13} color={Colors.textSecondary} />
                    <Text style={styles.metaText}>{p.staff} staff</Text>
                  </View>
                  <View style={[styles.metaItem, styles.milestone]}>
                    <Ionicons name="flag-outline" size={13} color={Colors.accent} />
                    <Text style={styles.milestoneText} numberOfLines={1}>{p.nextMilestone}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { paddingBottom: 24 },

  statsCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    marginHorizontal: Spacing.lg,
    marginTop: -Spacing.md,
    borderRadius: Radius.md,
    paddingVertical: 16,
    ...Shadow.md,
  },
  statsItem: { flex: 1, alignItems: 'center' },
  statsValue: { fontSize: 20, fontWeight: '800', color: Colors.primary },
  statsLabel: { fontSize: 10, color: Colors.textSecondary, marginTop: 2 },
  statsDivider: { width: 1, backgroundColor: Colors.border },

  filters: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    gap: 8,
  },
  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: Radius.full,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterPillActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterText: { fontSize: 13, color: Colors.textSecondary, fontWeight: '600' },
  filterTextActive: { color: Colors.white },
  filterCount: {
    minWidth: 22,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 10,
    backgroundColor: Colors.background,
  },
  filterCountActive: { backgroundColor: 'rgba(255,255,255,0.2)' },
  filterCountText: { fontSize: 10, fontWeight: '700', color: Colors.textSecondary, textAlign: 'center' },
  filterCountTextActive: { color: Colors.white },

  list: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    gap: 12,
  },
  projectCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: 14,
    ...Shadow.sm,
  },
  cardTop: { flexDirection: 'row', gap: 12, marginBottom: 14 },
  projectIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  projectHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    justifyContent: 'space-between',
  },
  projectName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
  },
  statusPill: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: Radius.full,
  },
  statusText: { fontSize: 10, fontWeight: '700', letterSpacing: 0.4 },
  projectMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 3,
  },
  projectCode: { fontSize: 11, color: Colors.textSecondary, fontWeight: '600', letterSpacing: 0.5 },
  projectDot: { color: Colors.textLight },
  projectSector: { fontSize: 11, color: Colors.textSecondary },

  progressRow: { marginBottom: 12 },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  progressLabel: { fontSize: 11, color: Colors.textSecondary, fontWeight: '500' },
  progressValue: { fontSize: 12, fontWeight: '800' },
  progressBar: {
    height: 5,
    borderRadius: 3,
    backgroundColor: Colors.border,
    overflow: 'hidden',
  },
  progressFill: { height: '100%', borderRadius: 3 },

  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: { fontSize: 11, color: Colors.textSecondary, fontWeight: '500' },
  milestone: { flex: 1, justifyContent: 'flex-end' },
  milestoneText: { fontSize: 11, color: Colors.accent, fontWeight: '600' },
});
