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

const EVENTS = [
  {
    id: '1',
    type: 'Industry',
    title: 'Industry Engagement & Participation',
    date: 'March 2026',
    description:
      'Active participation in industry events to strengthen partnerships and showcase our expertise in facilities management.',
    icon: 'people',
    color: '#3B82F6',
    tint: '#EBF2FF',
    featured: true,
  },
  {
    id: '2',
    type: 'Achievement',
    title: 'Project Milestone Achievement',
    date: 'January 2026',
    description:
      'Successful completion of key project milestones, demonstrating our commitment to quality and timely delivery.',
    icon: 'flag',
    color: '#10B981',
    tint: '#E6FBF3',
  },
  {
    id: '3',
    type: 'CSR',
    title: 'Corporate Social Responsibility Initiative',
    date: 'December 2025',
    description:
      'Engaging in community-driven initiatives to support sustainability and social responsibility.',
    icon: 'heart',
    color: '#EF4444',
    tint: '#FFEEEE',
  },
];

export default function EventsTab({ route }) {
  const user = route.params?.user || { type: 'guest', name: 'Guest' };
  const [selected, setSelected] = useState(null);

  const featured = EVENTS.find((e) => e.featured) || EVENTS[0];
  const others = EVENTS.filter((e) => e.id !== featured.id);

  return (
    <View style={styles.container}>
      <ScreenHeader
        user={user}
        title="News & Events"
        subtitle="Stay updated with DIFM"
        rightAction={{ icon: 'search-outline', onPress: () => {} }}
      />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <View style={styles.titleBlock}>
          <Text style={styles.eyebrow}>WHAT'S HAPPENING</Text>
          <Text style={styles.sectionTitle}>Latest News & Events</Text>
          <Text style={styles.sectionSub}>
            Discover our recent activities, milestones, and community initiatives.
          </Text>
        </View>

        {/* Featured event */}
        <TouchableOpacity activeOpacity={0.9} style={styles.featuredWrap}>
          <LinearGradient
            colors={[Colors.primary, Colors.primaryLight]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.featuredCard}
          >
            <View style={styles.featuredAccent} />

            <View style={styles.featuredBadge}>
              <Ionicons name="star" size={11} color={Colors.accentLight} />
              <Text style={styles.featuredBadgeText}>FEATURED</Text>
            </View>

            <View style={[styles.featuredIconBg, { backgroundColor: 'rgba(255,255,255,0.18)' }]}>
              <Ionicons name={featured.icon} size={26} color={Colors.white} />
            </View>

            <Text style={styles.featuredType}>{featured.type.toUpperCase()}</Text>
            <Text style={styles.featuredTitle}>{featured.title}</Text>

            <View style={styles.featuredMetaRow}>
              <Ionicons name="calendar-outline" size={13} color={Colors.accentLight} />
              <Text style={styles.featuredDate}>{featured.date}</Text>
            </View>

            <Text style={styles.featuredDesc}>{featured.description}</Text>

            <View style={styles.readMoreRow}>
              <Text style={styles.readMoreText}>Read more</Text>
              <Ionicons name="arrow-forward" size={14} color={Colors.accent} />
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* List */}
        <Text style={styles.listLabel}>More Updates</Text>
        <View style={styles.list}>
          {others.map((e) => (
            <TouchableOpacity
              key={e.id}
              style={styles.eventCard}
              activeOpacity={0.85}
              onPress={() => setSelected(e.id === selected ? null : e.id)}
            >
              <View style={[styles.eventIcon, { backgroundColor: e.tint }]}>
                <Ionicons name={e.icon} size={22} color={e.color} />
              </View>

              <View style={{ flex: 1 }}>
                <View style={styles.eventTopRow}>
                  <View style={[styles.typePill, { backgroundColor: e.tint }]}>
                    <Text style={[styles.typePillText, { color: e.color }]}>
                      {e.type}
                    </Text>
                  </View>
                  <View style={styles.dateRow}>
                    <Ionicons name="calendar-outline" size={11} color={Colors.textLight} />
                    <Text style={styles.dateText}>{e.date}</Text>
                  </View>
                </View>

                <Text style={styles.eventTitle}>{e.title}</Text>
                <Text
                  style={styles.eventDesc}
                  numberOfLines={selected === e.id ? undefined : 2}
                >
                  {e.description}
                </Text>

                <View style={styles.readRow}>
                  <Text style={[styles.readText, { color: e.color }]}>
                    {selected === e.id ? 'Show less' : 'Read more'}
                  </Text>
                  <Ionicons
                    name={selected === e.id ? 'chevron-up' : 'chevron-down'}
                    size={13}
                    color={e.color}
                  />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Footer note */}
        <View style={styles.footerNote}>
          <Ionicons name="megaphone-outline" size={16} color={Colors.primary} />
          <Text style={styles.footerNoteText}>
            Subscribe to our newsletter for the latest updates
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { paddingBottom: 24 },

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

  /* Featured */
  featuredWrap: {
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.md,
  },
  featuredCard: {
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    overflow: 'hidden',
    ...Shadow.md,
  },
  featuredAccent: {
    position: 'absolute',
    top: -60,
    right: -60,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: Colors.accent,
    opacity: 0.15,
  },
  featuredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(201,168,76,0.22)',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radius.full,
    marginBottom: 14,
  },
  featuredBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.accentLight,
    letterSpacing: 1.2,
  },
  featuredIconBg: {
    width: 52,
    height: 52,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  featuredType: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.accentLight,
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  featuredTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: Colors.white,
    lineHeight: 26,
    letterSpacing: -0.3,
    marginBottom: 8,
  },
  featuredMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  featuredDate: {
    fontSize: 12,
    color: Colors.accentLight,
    fontWeight: '600',
  },
  featuredDesc: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.82)',
    lineHeight: 20,
    marginBottom: 16,
  },
  readMoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.15)',
  },
  readMoreText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.accent,
  },

  /* List */
  listLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textSecondary,
    letterSpacing: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: 8,
  },
  list: {
    paddingHorizontal: Spacing.lg,
    gap: 10,
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: 14,
    gap: 12,
    ...Shadow.sm,
  },
  eventIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  typePill: {
    paddingHorizontal: 9,
    paddingVertical: 2,
    borderRadius: Radius.full,
  },
  typePillText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dateText: {
    fontSize: 11,
    color: Colors.textLight,
    fontWeight: '500',
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
    lineHeight: 19,
  },
  eventDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  readRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6,
  },
  readText: {
    fontSize: 11,
    fontWeight: '700',
  },

  /* Footer */
  footerNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
    paddingVertical: 12,
    backgroundColor: '#EEF2FF',
    borderRadius: Radius.md,
  },
  footerNoteText: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '600',
  },
});
