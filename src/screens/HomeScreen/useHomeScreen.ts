/**
 * useHomeScreen Hook - Business logic and state management for HomeScreen
 */

import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  WebView: { url?: string };
};

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface NavigationOption {
  title: string;
  path: string;
  description: string;
  icon: string;
}

export const useHomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const navigateToWebView = (path: string) => {
    navigation.navigate('WebView', { url: path });
  };

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  const navigationOptions: NavigationOption[] = [
    {
      title: 'Pokedex',
      path: 'pokedex',
      description: 'Explora el mundo Pokémon',
      icon: '🔥',
    },
    {
      title: 'Page 1',
      path: 'page1',
      description: 'Primera página de ejemplo',
      icon: '📄',
    },
  ];

  return {
    navigateToWebView,
    navigateToLogin,
    navigationOptions,
  };
};
