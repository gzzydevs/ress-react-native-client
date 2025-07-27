/**
 * useDevBottomBarLauncher Hook - Business logic and state management for DevBottomBarLauncher component
 */

import { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  WebView: { url?: string };
};

type DevNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const useDevBottomBarLauncher = () => {
  const navigation = useNavigation<DevNavigationProp>();
  const [showModal, setShowModal] = useState(false);

  const quickActions = [
    {
      title: '🏠 Go to Home',
      action: () => navigation.navigate('Home'),
      color: '#4CAF50',
    },
    {
      title: '📱 Push Screens',
      action: () => setShowModal(true),
      color: '#2196F3',
    },
  ];

  const pushOptions = [
    {
      title: '🔐 Login Screen',
      description: 'Push Login screen',
      action: () => {
        navigation.push('Login' as any);
        setShowModal(false);
      },
    },
    {
      title: '🏠 Home Screen',
      description: 'Push Home screen',
      action: () => {
        navigation.push('Home' as any);
        setShowModal(false);
      },
    },
    {
      title: '🔥 WebView - Pokedex',
      description: 'Push WebView with Pokedex',
      action: () => {
        navigation.push('WebView' as any, { url: 'pokedex' });
        setShowModal(false);
      },
    },
    {
      title: '📄 WebView - Page1',
      description: 'Push WebView with Page1',
      action: () => {
        navigation.push('WebView' as any, { url: 'page1' });
        setShowModal(false);
      },
    },
    {
      title: '🌐 WebView - Custom',
      description: 'Push WebView with custom path',
      action: () => {
        Alert.prompt(
          'Custom WebView Path',
          'Enter the path for the WebView:',
          [
            {
              text: 'Cancel',
              style: 'cancel',
              onPress: () => setShowModal(false),
            },
            {
              text: 'Push',
              onPress: (path?: string) => {
                navigation.push('WebView' as any, { url: path || 'pokedex' });
                setShowModal(false);
              },
            },
          ],
          'plain-text',
          'custom-path'
        );
      },
    },
    {
      title: '⚙️ Developer Mode',
      description: 'Navigate to Developer Mode screen',
      action: () => {
        navigation.navigate('DeveloperMode' as any);
        setShowModal(false);
      },
    },
  ];

  return {
    showModal,
    setShowModal,
    quickActions,
    pushOptions,
  };
};
