/**
 * Header Component - Reusable header with Pepino branding and back button
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface HeaderProps {
  backgroundColor?: string;
  subtitle?: string;
  showUrl?: boolean;
  url?: string;
  showBackButton?: boolean;
}

function Header({ 
  backgroundColor = '#ffffff', 
  subtitle = 'React Native + Ress.js',
  showUrl = false,
  url,
  showBackButton = true
}: HeaderProps) {
  const navigation = useNavigation();

  const handleBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <View style={[styles.header, { backgroundColor }]}>
      {showBackButton && (
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={handleBackPress}
          disabled={!navigation.canGoBack()}
        >
          <Text style={[
            styles.backButtonText,
            !navigation.canGoBack() && styles.backButtonDisabled
          ]}>
            ← Back
          </Text>
        </TouchableOpacity>
      )}
      
      <View style={styles.titleContainer}>
        <Text style={styles.title}>🥒 PEPINO 🥒</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        {showUrl && url && (
          <Text style={styles.urlInfo}>URL: {url}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  backButtonText: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '600',
  },
  backButtonDisabled: {
    color: '#cccccc',
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 4,
  },
  urlInfo: {
    fontSize: 12,
    color: '#888888',
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

export default Header;
