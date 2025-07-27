/**
 * DeveloperModeScreen - Development-only screen for advanced debugging
 * Only available in __DEV__ mode and via deep link or shake gesture
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from 'react-native';
import Header from '../../components/Header';
import DevBottomBarLauncher from '../../components/DevBottomBarLauncher';
import { useDeveloperModeScreen } from './useDeveloperModeScreen';
import { developerModeScreenStyles as styles } from './styles';

function DeveloperModeScreen() {
  const isDarkMode = useColorScheme() === 'dark';
  const {
    stackInfo,
    handleGoToHome,
    handlePopToTop,
    handlePopScreen,
    handleResetToLogin,
    getScreenIcon,
    getScreenDescription,
  } = useDeveloperModeScreen();

  // Don't render anything in production
  if (!__DEV__) {
    return null;
  }

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

export default DeveloperModeScreen;
