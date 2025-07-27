/**
 * Main App Component with React Navigation and Deep Linking
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useRef } from 'react';
import { NavigationContainerRef } from '@react-navigation/native';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RNShake from 'react-native-shake';

// Import screens
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import WebViewScreen from './src/screens/WebViewScreen';
import DeveloperModeScreen from './src/screens/developer/DeveloperModeScreen';

// Import navigation types and config
import type { RootStackParamList } from './src/types/navigation';
import { LINKING_CONFIG } from './src/config/linking';

// Create the stack navigator
const RootStack = createNativeStackNavigator<RootStackParamList>({
  screens: {
    Login: {
      screen: LoginScreen,
      linking: {
        path: 'login',
      },
      options: {
        title: 'Login',
        headerShown: false,
      },
    },
    Home: {
      screen: HomeScreen,
      linking: {
        path: 'home',
      },
      options: {
        title: 'Home',
        headerShown: false,
      },
    },
    WebView: {
      screen: WebViewScreen,
      linking: {
        path: 'webview/:url?',
      },
      options: {
        title: 'WebView',
        headerShown: false,
      },
    },
    DeveloperMode: {
      screen: DeveloperModeScreen,
      linking: {
        path: 'developer-mode',
      },
      options: {
        title: 'Developer Mode',
        headerShown: false,
      },
    },
  },
  initialRouteName: 'Login',
});

// Create the navigation with deep linking support
const Navigation = createStaticNavigation(RootStack);

export default function App() {
  const navigationRef = useRef<NavigationContainerRef<RootStackParamList>>(null);

  useEffect(() => {
    // Only add shake listener in development mode
    if (__DEV__) {
      const subscription = RNShake.addListener(() => {
        // Check if we're already on the DeveloperMode screen to prevent stacking
        const currentRoute = navigationRef.current?.getCurrentRoute();
        if (currentRoute?.name !== 'DeveloperMode') {
          navigationRef.current?.navigate('DeveloperMode');
        }
      });

      return () => {
        subscription.remove();
      };
    }
  }, []);

  return <Navigation linking={LINKING_CONFIG} ref={navigationRef} />;
}
