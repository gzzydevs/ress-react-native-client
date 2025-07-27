/**
 * Home Screen - Main dashboard screen
 */

import React from 'react';
import {
  StatusBar,
  useColorScheme,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Header from '../components/Header';
import DevBottomBarLauncher from '../components/developer/DevBottomBarLauncher';

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  WebView: { url?: string };
};

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

function HomeScreen() {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const navigateToWebView = (path: string) => {
    navigation.navigate('WebView', { url: path });
  };

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  const navigationOptions = [
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      
      <ScrollView style={styles.scrollView}>
        <Header 
          backgroundColor="#e8f5e8" 
          subtitle="Panel principal de navegación"
        />

        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Navegar a WebViews</Text>
          
          {navigationOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionCard}
              onPress={() => navigateToWebView(option.path)}
            >
              <View style={styles.optionIcon}>
                <Text style={styles.optionIconText}>{option.icon}</Text>
              </View>
              <View style={styles.optionContent}>
                <Text style={styles.optionTitle}>{option.title}</Text>
                <Text style={styles.optionDescription}>{option.description}</Text>
                <Text style={styles.optionUrl}>Path: {option.path}</Text>
              </View>
              <View style={styles.optionArrow}>
                <Text style={styles.optionArrowText}>→</Text>
              </View>
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.logoutButton} onPress={navigateToLogin}>
            <Text style={styles.logoutButtonText}>🔒 IR AL LOGIN</Text>
          </TouchableOpacity>
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
  },
  optionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  optionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  optionIconText: {
    fontSize: 24,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  optionUrl: {
    fontSize: 12,
    color: '#888888',
    fontStyle: 'italic',
  },
  optionArrow: {
    marginLeft: 12,
  },
  optionArrowText: {
    fontSize: 20,
    color: '#666666',
  },
  logoutButton: {
    backgroundColor: '#FF5722',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
