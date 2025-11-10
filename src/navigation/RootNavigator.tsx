import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { checkAuthThunk } from '@store/auth/authThunks';
import { AuthStack } from './AuthStack';
import { MainStack } from './MainStack';
import { LoadingSpinner } from '@components/common';

export const RootNavigator = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, isLoading } = useAppSelector(state => state.auth);
  const [isInitializing, setIsInitializing] = React.useState(true);

  useEffect(() => {
    dispatch(checkAuthThunk()).finally(() => {
      setIsInitializing(false);
    });
  }, [dispatch]);

  if (isInitializing) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

