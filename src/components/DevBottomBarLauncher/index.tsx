/**
 * DevBottomBarLauncher - Development-only bottom bar for quick navigation
 * Only visible in __DEV__ mode
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useDevBottomBarLauncher } from './useDevBottomBarLauncher';
import { devBottomBarLauncherStyles as styles } from './styles';

interface DevBottomBarLauncherProps {
  visible?: boolean;
}

function DevBottomBarLauncher({ visible = __DEV__ }: DevBottomBarLauncherProps) {
  const { showModal, setShowModal, quickActions, pushOptions } = useDevBottomBarLauncher();

  // Don't render anything in production
  if (!visible || !__DEV__) {
    return null;
  }

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

export default DevBottomBarLauncher;
