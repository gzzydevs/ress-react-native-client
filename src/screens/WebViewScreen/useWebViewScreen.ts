/**
 * useWebViewScreen Hook - Business logic and state management for WebViewScreen
 */

import { useRoute, RouteProp } from '@react-navigation/native';
import { WEBVIEW_BASE_PATH } from '../../config/linking';

type WebViewScreenRouteProp = RouteProp<{ params: { url?: string } }, 'params'>;

export const useWebViewScreen = () => {
  const route = useRoute<WebViewScreenRouteProp>();
  
  // Get path from route params, default to 'pokedex'
  const path = route.params?.url || 'pokedex';
  
  // Construct the full URL using basePath + path
  const webUrl = `${WEBVIEW_BASE_PATH}/${path}`;

  const handleLoadStart = () => {
    console.log(`WebView loading... URL: ${webUrl}`);
  };

  const handleLoadEnd = () => {
    console.log(`WebView loaded! URL: ${webUrl}`);
  };

  const handleError = (syntheticEvent: any) => {
    const { nativeEvent } = syntheticEvent;
    console.warn('WebView error: ', nativeEvent);
  };

  const handleMessage = (event: any) => {
    console.log('Message from WebView:', event.nativeEvent.data);
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
