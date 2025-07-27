/**
 * DeveloperModeScreen - Development-only screen for advanced debugging
 * Only available in __DEV__ mode and via deep link or shake gesture
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  useColorScheme,
  Alert,
} from 'react-native';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Header from '../../components/Header';
import DevBottomBarLauncher from '../../components/developer/DevBottomBarLauncher';

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  WebView: { url?: string };
  DeveloperMode: undefined;
};

type DeveloperModeNavigationProp = NativeStackNavigationProp<RootStackParamList, 'DeveloperMode'>;

function DeveloperModeScreen() {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation<DeveloperModeNavigationProp>();
  const [stackInfo, setStackInfo] = useState<any[]>([]);

  // Get current navigation state to show active screens
  const navigationState = useNavigationState((state) => state);

  useEffect(() => {
    if (navigationState?.routes) {
      setStackInfo(navigationState.routes);
    }
  }, [navigationState]);

  // Don't render anything in production
  if (!__DEV__) {
    return null;
  }

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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      
      <Header 
        backgroundColor="#ff6b35" 
        subtitle="Developer Tools & Stack Management"
        showBackButton={true}
      />

      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          {/* Stack Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📱 Active Navigation Stack</Text>
            <Text style={styles.sectionSubtitle}>
              Total screens: {stackInfo.length}
            </Text>
            
            {stackInfo.map((route, index) => (
              <View key={index} style={styles.stackItem}>
                <Text style={styles.stackIcon}>{getScreenIcon(route.name)}</Text>
                <View style={styles.stackContent}>
                  <Text style={styles.stackTitle}>
                    {index === stackInfo.length - 1 ? '→ ' : '  '}
                    {route.name}
                    {index === stackInfo.length - 1 ? ' (Current)' : ''}
                  </Text>
                  <Text style={styles.stackDescription}>
                    {getScreenDescription(route)}
                  </Text>
                </View>
                <Text style={styles.stackIndex}>#{index}</Text>
              </View>
            ))}
          </View>

          {/* Quick Actions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>⚡ Quick Actions</Text>
            
            <TouchableOpacity style={styles.actionButton} onPress={handleGoToHome}>
              <Text style={styles.actionButtonText}>🏠 Navigate to Home</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={handlePopScreen}>
              <Text style={styles.actionButtonText}>⬅️ Pop Current Screen</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={handlePopToTop}>
              <Text style={styles.actionButtonText}>⬆️ Pop to First Screen</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.actionButton, styles.dangerButton]} 
              onPress={handleResetToLogin}
            >
              <Text style={styles.actionButtonText}>🔄 Reset to Login</Text>
            </TouchableOpacity>
          </View>

          {/* Debug Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🐛 Debug Information</Text>
            <View style={styles.debugBox}>
              <Text style={styles.debugText}>DEV Mode: {__DEV__ ? '✅' : '❌'}</Text>
              <Text style={styles.debugText}>Platform: React Native</Text>
              <Text style={styles.debugText}>Navigation: React Navigation 7</Text>
              <Text style={styles.debugText}>Stack Depth: {stackInfo.length}</Text>
            </View>
          </View>

          {/* Instructions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📖 Instructions</Text>
            <View style={styles.instructionBox}>
              <Text style={styles.instructionText}>
                • Shake your device to open this screen anytime{'\n'}
                • Use deep link: ress://developer-mode{'\n'}
                • This screen only exists in development builds{'\n'}
                • Manage your navigation stack safely
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <DevBottomBarLauncher />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 12,
  },
  stackItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  stackIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  stackContent: {
    flex: 1,
  },
  stackTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  stackDescription: {
    fontSize: 12,
    color: '#666666',
    marginTop: 2,
  },
  stackIndex: {
    fontSize: 12,
    color: '#999999',
    fontWeight: 'bold',
  },
  actionButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  dangerButton: {
    backgroundColor: '#FF5722',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  debugBox: {
    backgroundColor: '#333333',
    borderRadius: 8,
    padding: 16,
  },
  debugText: {
    color: '#00FF00',
    fontSize: 14,
    fontFamily: 'monospace',
    marginBottom: 4,
  },
  instructionBox: {
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  instructionText: {
    fontSize: 14,
    color: '#1976D2',
    lineHeight: 20,
  },
});

export default DeveloperModeScreen;
