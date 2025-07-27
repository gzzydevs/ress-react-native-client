/**
 * DeveloperModeScreen Styles - Style definitions for DeveloperModeScreen component
 */

import { StyleSheet } from 'react-native';

export const developerModeScreenStyles = StyleSheet.create({
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
