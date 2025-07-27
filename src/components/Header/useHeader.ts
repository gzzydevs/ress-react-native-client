/**
 * useHeader Hook - Business logic and state management for Header component
 */

import { useNavigation } from '@react-navigation/native';

export const useHeader = () => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const canGoBack = navigation.canGoBack();

  return {
    handleBackPress,
    canGoBack,
  };
};
