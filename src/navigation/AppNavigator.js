import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from '../screens/WelcomeScreen';
import GuestLoginScreen from '../screens/guest/GuestLoginScreen';
import GuestOTPScreen from '../screens/guest/GuestOTPScreen';
import EmployeeRegisterScreen from '../screens/employee/EmployeeRegisterScreen';
import EmployeeOTPScreen from '../screens/employee/EmployeeOTPScreen';
import MainTabs from './MainTabs';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
      >
        {/* Auth flow */}
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="GuestLogin" component={GuestLoginScreen} />
        <Stack.Screen name="GuestOTP" component={GuestOTPScreen} />
        <Stack.Screen name="EmployeeRegister" component={EmployeeRegisterScreen} />
        <Stack.Screen name="EmployeeOTP" component={EmployeeOTPScreen} />

        {/* Main app — bottom tabs */}
        <Stack.Screen
          name="Main"
          component={MainTabs}
          options={{ animation: 'fade' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
