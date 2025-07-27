/**
 * useDeveloperModeScreen Hook - Business logic and state management for DeveloperModeScreen
 */

import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../types/navigation';

type DeveloperModeNavigationProp = NativeStackNavigationProp<RootStackParamList, 'DeveloperMode'>;

interface ScreenIconMap {
  [key: string]: string;
}

interface ScreenRoute {
  key: string;
  name: string;
  params?: Record<string, any>;
}

export const useDeveloperModeScreen = () => {
  const navigation = useNavigation<DeveloperModeNavigationProp>();
  const [stackInfo, setStackInfo] = useState<ScreenRoute[]>([]);

  // Get current navigation state to show active screens
  const navigationState = useNavigationState(state => state);

  useEffect(() => {
    if (navigationState?.routes) {
      setStackInfo(navigationState.routes);
    }
  }, [navigationState]);

  const handleGoToHome = (): void => {
    navigation.navigate('Home');
  };

  const handlePopToTop = (): void => {
    navigation.popToTop();
  };

  const handlePopScreen = (): void => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      Alert.alert('No hay pantallas', 'No hay pantallas anteriores para cerrar');
    }
  };

  const handleResetToLogin = (): void => {
    Alert.alert(
      'Reset Navigation',
      '¿Quieres resetear la navegación al Login?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          },
        },
      ]
    );
  };

  const screenIconMap: ScreenIconMap = {
    Login: '🔐',
    Home: '🏠',
    WebView: '🌐',
    DeveloperMode: '⚙️',
  };

  const getScreenIcon = (routeName: string): string => {
    return screenIconMap[routeName] || '📱';
  };

  const getScreenDescription = (route: ScreenRoute): string => {
    if (route.name === 'WebView' && route.params?.url) {
      return `Path: ${route.params.url}`;
    }
    return `Screen: ${route.name}`;
  };

  return {
    stackInfo,
    handleGoToHome,
    handlePopToTop,
    handlePopScreen,
    handleResetToLogin,
    getScreenIcon,
    getScreenDescription,
  };
};
