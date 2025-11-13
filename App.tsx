import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { store } from './src/store';
import { RootNavigator } from './src/navigation';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1 }}>
            <RootNavigator />
            <StatusBar style="auto" />
          </SafeAreaView>
        </SafeAreaProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}
