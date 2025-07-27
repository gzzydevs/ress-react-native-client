/**
 * useHeader Hook - Business logic for Header component
 */

import { useNavigation } from '@react-navigation/native';

export const useHeader = () => {
  const navigation = useNavigation();

  const handleBackPress = (): void => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const canGoBack: boolean = navigation.canGoBack();

  return {
    handleBackPress,
    canGoBack,
  };
};
