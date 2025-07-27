/**
 * Home Screen - Main dashboard screen
 */

import React from 'react';
import {
  StatusBar,
  useColorScheme,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Text,
  View,
} from 'react-native';
import Header from '../../components/Header';
import DevBottomBarLauncher from '../../components/DevBottomBarLauncher';
import { useHomeScreen } from './useHomeScreen';
import { homeScreenStyles as styles } from './styles';

function HomeScreen() {
  const isDarkMode = useColorScheme() === 'dark';
  const { navigateToWebView, navigateToLogin, navigationOptions } = useHomeScreen();

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

export default HomeScreen;
