import React, { Suspense } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../types'; 

const Welcome = React.lazy(() => import('@screens/Auth/Welcome/Welcome').then(m => ({ default: m.Welcome })));
const Login = React.lazy(() => import('@screens/Auth/Login/Login').then(m => ({ default: m.Login })));
const Register = React.lazy(() => import('@screens/Auth/Register/Register').then(m => ({ default: m.Register })));

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthStack = () => {
  return (
    <Suspense fallback={null}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right', // Use default/native animation
        }}
      >
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </Suspense>
  );
};

