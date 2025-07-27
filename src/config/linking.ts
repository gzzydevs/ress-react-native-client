/**
 * Deep Linking Configuration
 * Configure the base scheme for deep links here
 */

import Config from 'react-native-config';

// You can change this base scheme through environment variables
export const DEEP_LINK_SCHEME = Config.DEEP_LINK_SCHEME || 'ress';

// Base path for WebView URLs
export const WEBVIEW_BASE_PATH = Config.WEBVIEW_BASE_PATH || 'http://localhost:3000';

// Available deep link URLs:
// - ${DEEP_LINK_SCHEME}://login
// - ${DEEP_LINK_SCHEME}://home  
// - ${DEEP_LINK_SCHEME}://webview
// - ${DEEP_LINK_SCHEME}://webview/[path]
// - ${DEEP_LINK_SCHEME}://developer-mode (dev builds only)

export const DEEP_LINK_PREFIXES = [
  `${DEEP_LINK_SCHEME}://`,
];

export const LINKING_CONFIG = {
  prefixes: DEEP_LINK_PREFIXES,
  enabled: 'auto' as const,
};
