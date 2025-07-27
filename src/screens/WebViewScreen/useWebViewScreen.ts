/**
 * useWebViewScreen Hook - Business logic and state management for WebViewScreen
 */

import { useRoute, RouteProp } from '@react-navigation/native';
import type { WebViewErrorEvent, WebViewMessageEvent } from 'react-native-webview/lib/WebViewTypes';
import { WEBVIEW_BASE_PATH } from '../../config/linking';
import type { RootStackParamList } from '../../types/navigation';

type WebViewScreenRouteProp = RouteProp<RootStackParamList, 'WebView'>;

export const useWebViewScreen = () => {
  const route = useRoute<WebViewScreenRouteProp>();
  
  // Get path from route params, default to 'pokedex'
  const path = route.params?.url || 'pokedex';
  
  // Construct the full URL using basePath + path
  const webUrl = `${WEBVIEW_BASE_PATH}/${path}`;

  const handleLoadStart = (): void => {
    console.log(`WebView loading... URL: ${webUrl}`);
  };

  const handleLoadEnd = (): void => {
    console.log(`WebView loaded! URL: ${webUrl}`);
  };

  const handleError = (syntheticEvent: WebViewErrorEvent): void => {
    const { nativeEvent } = syntheticEvent;
    console.warn('WebView error: ', nativeEvent);
  };

  const handleMessage = (event: WebViewMessageEvent): void => {
    const { nativeEvent } = event;
    console.log('Message from WebView:', nativeEvent.data);
  };

  return {
    path,
    webUrl,
    handleLoadStart,
    handleLoadEnd,
    handleError,
    handleMessage,
  };
};
