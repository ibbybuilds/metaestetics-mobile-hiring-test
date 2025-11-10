import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainStackParamList } from '@types';
import { Profile, EditProfile, Settings } from '@screens/Profile';
import { ClinicsScreen } from '@screens/Clinics';

const Stack = createNativeStackNavigator<MainStackParamList>();

export const MainStack = () => {
  return (
    <Stack.Navigator>
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
  );
};

