import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../../components/ScreenHeader';
import { Colors, Spacing, Radius, Shadow } from '../../theme';

const FILTERS = ['All', 'Training', 'HSE', 'Company', 'Holidays'];

const EVENTS = [
  {
    id: '1',
    type: 'HSE',
    title: 'Mandatory HSE Safety Training',
    date: 'May 10, 2026',
    time: '09:00 — 12:00',
    location: 'Main Office, Doha',
    color: '#EF4444',
    icon: 'shield-checkmark-outline',
    attendees: 142,
    featured: true,
  },
  {
    id: '2',
    type: 'Training',
    title: 'New Work Order System Walkthrough',
    date: 'May 12, 2026',
    time: '14:00 — 15:30',
    location: 'Online — MS Teams',
    color: '#3B82F6',
    icon: 'desktop-outline',
    attendees: 86,
  },
  {
    id: '3',
    type: 'Company',
    title: 'Q2 Town Hall Meeting',
    date: 'May 18, 2026',
    time: '10:00 — 11:30',
    location: 'DIFM Auditorium',
    color: '#8B5CF6',
    icon: 'people-outline',
    attendees: 320,
  },
  {
    id: '4',
    type: 'Holidays',
    title: 'Eid Al-Adha Holiday',
    date: 'May 27 — 30, 2026',
    time: 'All Day',
    location: 'Company-wide',
    color: '#10B981',
    icon: 'calendar-outline',
    attendees: null,
  },
  {
    id: '5',
    type: 'Training',
    title: 'Customer Service Excellence',
    date: 'Jun 02, 2026',
    time: '13:00 — 17:00',
    location: 'Training Room B',
    color: '#F59E0B',
    icon: 'school-outline',
    attendees: 45,
  },
];

export default function EventsTab({ route }) {
  const user = route.params?.user || { type: 'guest', name: 'Guest' };
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All'
    ? EVENTS
    : EVENTS.filter((e) => e.type === filter);

  const featured = EVENTS.find((e) => e.featured);

  return (
    <View style={styles.container}>
      <ScreenHeader
        user={user}
        title="Events"
        subtitle={`${EVENTS.length} upcoming events`}
        rightAction={{ icon: 'search-outline', onPress: () => {} }}
      />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Featured event */}
        {featured && filter === 'All' && (
          <TouchableOpacity activeOpacity={0.9} style={styles.featuredWrap}>
            <LinearGradient
              colors={['#EF4444', '#B91C1C']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.featuredCard}
            >
              <View style={styles.featuredAccent} />
              <View style={styles.featuredBadge}>
                <Ionicons name="star" size={11} color={'#FEF3C7'} />
                <Text style={styles.featuredBadgeText}>FEATURED</Text>
              </View>
              <View style={styles.featuredIconRow}>
                <View style={styles.featuredIconBg}>
                  <Ionicons name={featured.icon} size={24} color={Colors.white} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.featuredType}>{featured.type.toUpperCase()}</Text>
                  <Text style={styles.featuredTitle}>{featured.title}</Text>
                </View>
              </View>
              <View style={styles.featuredMeta}>
                <View style={styles.featuredMetaRow}>
                  <Ionicons name="calendar-outline" size={13} color="rgba(255,255,255,0.85)" />
                  <Text style={styles.featuredMetaText}>{featured.date}  ·  {featured.time}</Text>
                </View>
                <View style={styles.featuredMetaRow}>
                  <Ionicons name="location-outline" size={13} color="rgba(255,255,255,0.85)" />
                  <Text style={styles.featuredMetaText}>{featured.location}</Text>
                </View>
              </View>
              <View style={styles.featuredFooter}>
                <View style={styles.attendees}>
                  {[0, 1, 2].map((i) => (
                    <View key={i} style={[styles.avatarMini, { left: i * 14 }]}>
                      <Text style={styles.avatarMiniText}>{['A','M','S'][i]}</Text>
                    </View>
                  ))}
                  <Text style={styles.attendeesText}>+{featured.attendees} attending</Text>
                </View>
                <View style={styles.rsvpBtn}>
                  <Text style={styles.rsvpText}>RSVP</Text>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        )}

        {/* Filter chips */}
        <View style={styles.filtersWrap}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filters}
          >
            {FILTERS.map((f) => (
              <TouchableOpacity
                key={f}
                style={[styles.filterChip, filter === f && styles.filterChipActive]}
                onPress={() => setFilter(f)}
              >
                <Text style={[
                  styles.filterChipText,
                  filter === f && styles.filterChipTextActive,
                ]}>{f}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Event list */}
        <View style={styles.list}>
          {filtered.map((e) => (
            <TouchableOpacity key={e.id} style={styles.eventCard}>
              <View style={[styles.dateBlock, { backgroundColor: e.color + '18' }]}>
                <Text style={[styles.dateDay, { color: e.color }]}>
                  {e.date.split(' ')[1].replace(',', '')}
                </Text>
                <Text style={[styles.dateMonth, { color: e.color }]}>
                  {e.date.split(' ')[0].toUpperCase()}
                </Text>
              </View>
              <View style={styles.eventBody}>
                <View style={styles.eventTypeRow}>
                  <View style={[styles.typePill, { backgroundColor: e.color + '18' }]}>
                    <Ionicons name={e.icon} size={11} color={e.color} />
                    <Text style={[styles.typePillText, { color: e.color }]}>{e.type}</Text>
                  </View>
                </View>
                <Text style={styles.eventTitle}>{e.title}</Text>
                <View style={styles.eventMetaRow}>
                  <Ionicons name="time-outline" size={12} color={Colors.textSecondary} />
                  <Text style={styles.eventMeta}>{e.time}</Text>
                  <Text style={styles.eventDot}>•</Text>
                  <Ionicons name="location-outline" size={12} color={Colors.textSecondary} />
                  <Text style={styles.eventMeta} numberOfLines={1}>{e.location}</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={16} color={Colors.textLight} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { paddingBottom: 24 },

  featuredWrap: { paddingHorizontal: Spacing.lg, marginTop: -Spacing.md },
  featuredCard: {
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    overflow: 'hidden',
    ...Shadow.md,
  },
  featuredAccent: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  featuredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.full,
    marginBottom: 12,
  },
  featuredBadgeText: { fontSize: 9, fontWeight: '800', color: '#FEF3C7', letterSpacing: 1 },
  featuredIconRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 14,
  },
  featuredIconBg: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  featuredType: { fontSize: 10, fontWeight: '700', color: 'rgba(255,255,255,0.7)', letterSpacing: 1 },
  featuredTitle: { fontSize: 18, fontWeight: '800', color: Colors.white, marginTop: 2, lineHeight: 22 },
  featuredMeta: { gap: 6, marginBottom: 16 },
  featuredMetaRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  featuredMetaText: { fontSize: 12, color: 'rgba(255,255,255,0.85)' },
  featuredFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.15)',
  },
  attendees: { flexDirection: 'row', alignItems: 'center', position: 'relative' },
  avatarMini: {
    position: 'absolute',
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#B91C1C',
  },
  avatarMiniText: { fontSize: 10, fontWeight: '700', color: Colors.primary },
  attendeesText: {
    fontSize: 11,
    color: Colors.white,
    fontWeight: '600',
    marginLeft: 56,
  },
  rsvpBtn: {
    backgroundColor: Colors.white,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: Radius.full,
  },
  rsvpText: { fontSize: 12, fontWeight: '800', color: '#B91C1C', letterSpacing: 0.5 },

  filtersWrap: { marginTop: Spacing.lg },
  filters: { paddingHorizontal: Spacing.lg, gap: 8 },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: Radius.full,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterChipText: { fontSize: 13, color: Colors.textSecondary, fontWeight: '600' },
  filterChipTextActive: { color: Colors.white },

  list: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    gap: 10,
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: 12,
    gap: 12,
    alignItems: 'center',
    ...Shadow.sm,
  },
  dateBlock: {
    width: 52,
    height: 52,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateDay: { fontSize: 18, fontWeight: '800', lineHeight: 22 },
  dateMonth: { fontSize: 9, fontWeight: '700', letterSpacing: 1 },
  eventBody: { flex: 1 },
  eventTypeRow: { marginBottom: 4 },
  typePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: Radius.full,
  },
  typePillText: { fontSize: 10, fontWeight: '700', letterSpacing: 0.5 },
  eventTitle: { fontSize: 14, fontWeight: '700', color: Colors.text, marginTop: 2 },
  eventMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
    flexWrap: 'wrap',
  },
  eventMeta: { fontSize: 11, color: Colors.textSecondary },
  eventDot: { color: Colors.textLight, marginHorizontal: 2 },
});
