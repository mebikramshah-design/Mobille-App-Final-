import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeTab from '../screens/tabs/HomeTab';
import EventsTab from '../screens/tabs/EventsTab';
import ProjectsTab from '../screens/tabs/ProjectsTab';
import ProfileTab from '../screens/tabs/ProfileTab';

import { Colors } from '../theme';

const Tab = createBottomTabNavigator();

const ICONS = {
  Home:     { active: 'home',         inactive: 'home-outline' },
  Events:   { active: 'calendar',     inactive: 'calendar-outline' },
  Projects: { active: 'briefcase',    inactive: 'briefcase-outline' },
  Profile:  { active: 'person',       inactive: 'person-outline' },
};

function TabIcon({ routeName, focused }) {
  const iconSet = ICONS[routeName] || ICONS.Home;
  const name = focused ? iconSet.active : iconSet.inactive;

  return (
    <View style={styles.iconWrap}>
      {focused && <View style={styles.activeDot} />}
      <Ionicons
        name={name}
        size={22}
        color={focused ? Colors.primary : Colors.textLight}
      />
    </View>
  );
}

export default function MainTabs({ route }) {
  const user = route.params?.user;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textLight,
        tabBarLabelStyle: styles.label,
        tabBarStyle: styles.bar,
        tabBarItemStyle: styles.item,
        tabBarIcon: ({ focused }) => (
          <TabIcon routeName={route.name} focused={focused} />
        ),
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeTab}
        initialParams={{ user }}
      />
      <Tab.Screen
        name="Events"
        component={EventsTab}
        initialParams={{ user }}
        options={{
          tabBarBadge: user?.type === 'employee' ? 2 : undefined,
          tabBarBadgeStyle: { backgroundColor: Colors.error, color: Colors.white, fontSize: 10 },
        }}
      />
      <Tab.Screen
        name="Projects"
        component={ProjectsTab}
        initialParams={{ user }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileTab}
        initialParams={{ user }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    height: Platform.OS === 'ios' ? 86 : 68,
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 28 : 10,
    elevation: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  item: {
    paddingVertical: 4,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  iconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
  },
  activeDot: {
    position: 'absolute',
    top: -8,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.accent,
  },
});
