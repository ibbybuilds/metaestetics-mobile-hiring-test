import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store, persistor } from './src/store';
import { RootNavigator } from './src/navigation';
import { StyleSheet } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { ErrorBoundary } from './src/components/ErrorBoundary';

const queryClient = new QueryClient();

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

// --- Startup Performance Logging ---
const appStart = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();

export default function App() {
  React.useEffect(() => {
    const firstPaint = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
    const startupTime = firstPaint - appStart;
    if (typeof global !== 'undefined' && global.gmlogs) {
      global.gmlogs.push({
        event: 'AppStartupTime',
        time: startupTime,
        timestamp: Date.now(),
      });
    } else {
      console.log('[Performance] App startup/render time (ms):', startupTime);
    }
  }, []);

  return (
    
    <ErrorBoundary>
      <GestureHandlerRootView style={styles.root}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <QueryClientProvider client={queryClient}>
              <SafeAreaProvider>
                <RootNavigator />
                <StatusBar style="auto" />
              </SafeAreaProvider>
            </QueryClientProvider>
          </PersistGate>
        </Provider>
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
}

