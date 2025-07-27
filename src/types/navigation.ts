/**
 * Navigation Types
 */

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  WebView: { url?: string };
  DeveloperMode: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
