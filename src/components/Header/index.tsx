/**
 * Header Component - Reusable header with Pepino branding and back button
 */

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useHeader } from './useHeader';
import { headerStyles as styles } from './styles';

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
  const { handleBackPress, canGoBack } = useHeader();

  return (
    <View style={[styles.header, { backgroundColor }]}>
      {showBackButton && (
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={handleBackPress}
          disabled={!canGoBack}
        >
          <Text style={[
            styles.backButtonText,
            !canGoBack && styles.backButtonDisabled
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

export default Header;
