/**
 * useDeveloperModeScreen Hook - Business logic and state management for DeveloperModeScreen
 */

import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  WebView: { url?: string };
  DeveloperMode: undefined;
};

type DeveloperModeNavigationProp = NativeStackNavigationProp<RootStackParamList, 'DeveloperMode'>;

export const useDeveloperModeScreen = () => {
  const navigation = useNavigation<DeveloperModeNavigationProp>();
  const [stackInfo, setStackInfo] = useState<any[]>([]);

  // Get current navigation state to show active screens
  const navigationState = useNavigationState((state) => state);

  useEffect(() => {
    if (navigationState?.routes) {
      setStackInfo(navigationState.routes);
    }
  }, [navigationState]);

  const handleGoToHome = () => {
    navigation.navigate('Home');
  };

  const handlePopToTop = () => {
    navigation.popToTop();
  };

  const handlePopScreen = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      Alert.alert('No hay pantallas', 'No hay pantallas anteriores para cerrar');
    }
  };

  const handleResetToLogin = () => {
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

  const getScreenIcon = (routeName: string) => {
    switch (routeName) {
      case 'Login': return '🔐';
      case 'Home': return '🏠';
      case 'WebView': return '🌐';
      case 'DeveloperMode': return '⚙️';
      default: return '📱';
    }
  };

  const getScreenDescription = (route: any) => {
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
