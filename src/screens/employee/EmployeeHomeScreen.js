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

const MODULES = [
  { icon: 'clipboard-outline', label: 'Work Orders', badge: 3, color: '#3B82F6' },
  { icon: 'time-outline', label: 'Attendance', badge: null, color: '#10B981' },
  { icon: 'people-outline', label: 'Team', badge: null, color: '#8B5CF6' },
  { icon: 'document-text-outline', label: 'Reports', badge: 1, color: '#EF4444' },
  { icon: 'calendar-outline', label: 'Schedule', badge: null, color: Colors.accent },
  { icon: 'notifications-outline', label: 'Alerts', badge: 5, color: '#F59E0B' },
  { icon: 'map-outline', label: 'Sites', badge: null, color: '#06B6D4' },
  { icon: 'settings-outline', label: 'Settings', badge: null, color: Colors.textSecondary },
];

const ANNOUNCEMENTS = [
  {
    title: 'Safety Training — May 10',
    body: 'Mandatory HSE safety training session for all field staff.',
    icon: 'shield-checkmark-outline',
    color: Colors.success,
  },
  {
    title: 'New Work Order System',
    body: 'The upgraded work order module is now live. Check your queue.',
    icon: 'construct-outline',
    color: Colors.primary,
  },
];

export default function EmployeeHomeScreen({ navigation, route }) {
  const { fullName, employeeId, mobile } = route.params || {};
  const firstName = (fullName || 'Employee').split(' ')[0];

  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primaryDark} />

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
          <View style={styles.welcomeInfo}>
            <Text style={styles.greetingText}>{greeting},</Text>
            <Text style={styles.userName}>{firstName}</Text>
            <View style={styles.idBadge}>
              <Ionicons name="card-outline" size={11} color={Colors.accent} />
              <Text style={styles.idBadgeText}>{employeeId}</Text>
            </View>
          </View>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>
              {(fullName || 'E').charAt(0).toUpperCase()}
            </Text>
          </View>
        </View>

        {/* Stats bar */}
        <View style={styles.statsBar}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>8</Text>
            <Text style={styles.statLabel}>Open Tasks</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>95%</Text>
            <Text style={styles.statLabel}>Attendance</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Modules grid */}
        <Text style={styles.sectionTitle}>Modules</Text>
        <View style={styles.grid}>
          {MODULES.map((m) => (
            <TouchableOpacity key={m.label} style={styles.moduleCard}>
              {m.badge ? (
                <View style={styles.badgeWrap}>
                  <Text style={styles.badgeCount}>{m.badge}</Text>
                </View>
              ) : null}
              <View style={[styles.moduleIcon, { backgroundColor: m.color + '18' }]}>
                <Ionicons name={m.icon} size={26} color={m.color} />
              </View>
              <Text style={styles.moduleLabel}>{m.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Announcements */}
        <Text style={styles.sectionTitle}>Announcements</Text>
        {ANNOUNCEMENTS.map((a) => (
          <TouchableOpacity key={a.title} style={styles.announcementCard}>
            <View style={[styles.announcementIcon, { backgroundColor: a.color + '18' }]}>
              <Ionicons name={a.icon} size={20} color={a.color} />
            </View>
            <View style={styles.announcementText}>
              <Text style={styles.announcementTitle}>{a.title}</Text>
              <Text style={styles.announcementBody}>{a.body}</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={Colors.textLight} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    paddingTop: 52,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
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
    marginBottom: Spacing.lg,
  },
  welcomeInfo: { flex: 1 },
  greetingText: { fontSize: 14, color: 'rgba(255,255,255,0.7)' },
  userName: { fontSize: 24, fontWeight: '700', color: Colors.white, marginVertical: 2 },
  idBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(201,168,76,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.full,
    gap: 4,
    alignSelf: 'flex-start',
  },
  idBadgeText: { fontSize: 11, color: Colors.accentLight, fontWeight: '600', letterSpacing: 0.5 },
  avatarCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: { fontSize: 22, fontWeight: '700', color: Colors.primary },
  statsBar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: Radius.md,
    paddingVertical: 14,
    paddingHorizontal: Spacing.md,
  },
  statItem: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 20, fontWeight: '700', color: Colors.white },
  statLabel: { fontSize: 11, color: 'rgba(255,255,255,0.65)', marginTop: 2 },
  statDivider: { width: 1, backgroundColor: 'rgba(255,255,255,0.2)' },
  scroll: { paddingHorizontal: Spacing.lg, paddingTop: Spacing.lg, paddingBottom: 40 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.md,
    marginTop: Spacing.sm,
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: Spacing.lg },
  moduleCard: {
    width: '22%',
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: 12,
    alignItems: 'center',
    gap: 8,
    position: 'relative',
    ...Shadow.sm,
  },
  badgeWrap: {
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
    zIndex: 1,
  },
  badgeCount: { fontSize: 10, fontWeight: '700', color: Colors.white },
  moduleIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moduleLabel: { fontSize: 10, fontWeight: '600', color: Colors.text, textAlign: 'center' },
  announcementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginBottom: 10,
    gap: 12,
    ...Shadow.sm,
  },
  announcementIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  announcementText: { flex: 1 },
  announcementTitle: { fontSize: 14, fontWeight: '600', color: Colors.text },
  announcementBody: { fontSize: 12, color: Colors.textSecondary, marginTop: 2, lineHeight: 18 },
});
