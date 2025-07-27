/**
 * Header Styles - Style definitions for Header component
 */

import { StyleSheet } from 'react-native';

export const headerStyles = StyleSheet.create({
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
