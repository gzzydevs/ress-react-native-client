/**
 * DevBottomBarLauncher - Development-only bottom bar for quick navigation
 * Only visible in __DEV__ mode
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  WebView: { url?: string };
};

type DevNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface DevBottomBarLauncherProps {
  visible?: boolean;
}

function DevBottomBarLauncher({ visible = __DEV__ }: DevBottomBarLauncherProps) {
  const navigation = useNavigation<DevNavigationProp>();
  const [showModal, setShowModal] = useState(false);

  // Don't render anything in production
  if (!visible || !__DEV__) {
    return null;
  }

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

  return (
    <>
      <View style={styles.bottomBar}>
        <Text style={styles.devLabel}>DEV MODE</Text>
        {quickActions.map((action, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.actionButton, { backgroundColor: action.color }]}
            onPress={action.action}
          >
            <Text style={styles.actionButtonText}>{action.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Modal
        visible={showModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowModal(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Push Screen</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <Text style={styles.modalSubtitle}>
              Select a screen to push on top of the current stack:
            </Text>

            {pushOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.pushOption}
                onPress={option.action}
              >
                <Text style={styles.pushOptionTitle}>{option.title}</Text>
                <Text style={styles.pushOptionDescription}>
                  {option.description}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: 34, // Account for home indicator on iOS
  },
  devLabel: {
    color: '#FF6B35',
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 12,
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    marginRight: 8,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#666666',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 20,
    textAlign: 'center',
  },
  pushOption: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pushOptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  pushOptionDescription: {
    fontSize: 14,
    color: '#666666',
  },
});

export default DevBottomBarLauncher;
