import React, { Suspense } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainStackParamList } from '../types';

const Profile = React.lazy(() => import('@screens/Profile/Profile').then(m => ({ default: m.Profile })));
const EditProfile = React.lazy(() => import('@screens/Profile/EditProfile').then(m => ({ default: m.EditProfile })));
const Settings = React.lazy(() => import('@screens/Profile/Settings').then(m => ({ default: m.Settings })));
const ClinicsScreen = React.lazy(() => import('@screens/Clinics/ClinicsScreen').then(m => ({ default: m.ClinicsScreen })));

const Stack = createNativeStackNavigator<MainStackParamList>();

export const MainStack = () => {
  return (
    <Suspense fallback={null}>
      <Stack.Navigator
        screenOptions={{
          animation: 'slide_from_right', // Use default/native animation
        }}
      >
        <Stack.Screen 
          name="Profile" 
          component={Profile}
          options={{ title: 'My Profile' }}
        />
        <Stack.Screen 
          name="EditProfile" 
          component={EditProfile}
          options={{ title: 'Edit Profile' }}
        />
        <Stack.Screen 
          name="Settings" 
          component={Settings}
          options={{ title: 'Settings' }}
        />
        <Stack.Screen 
          name="Clinics" 
          component={ClinicsScreen}
          options={{ title: 'Clinics' }}
        />
      </Stack.Navigator>
    </Suspense>
  );
};

