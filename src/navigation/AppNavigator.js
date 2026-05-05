import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from '../screens/WelcomeScreen';
import GuestLoginScreen from '../screens/guest/GuestLoginScreen';
import GuestOTPScreen from '../screens/guest/GuestOTPScreen';
import GuestHomeScreen from '../screens/guest/GuestHomeScreen';
import EmployeeRegisterScreen from '../screens/employee/EmployeeRegisterScreen';
import EmployeeOTPScreen from '../screens/employee/EmployeeOTPScreen';
import EmployeeHomeScreen from '../screens/employee/EmployeeHomeScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
      >
        {/* Landing */}
        <Stack.Screen name="Welcome" component={WelcomeScreen} />

        {/* Guest flow */}
        <Stack.Screen name="GuestLogin" component={GuestLoginScreen} />
        <Stack.Screen name="GuestOTP" component={GuestOTPScreen} />
        <Stack.Screen name="GuestHome" component={GuestHomeScreen} />

        {/* Employee flow */}
        <Stack.Screen name="EmployeeRegister" component={EmployeeRegisterScreen} />
        <Stack.Screen name="EmployeeOTP" component={EmployeeOTPScreen} />
        <Stack.Screen name="EmployeeHome" component={EmployeeHomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
