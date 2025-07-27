/**
 * WebView Screen - Displays web content based on path parameter
 */

import React from 'react';
import { StatusBar, useColorScheme, SafeAreaView, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { useRoute, RouteProp } from '@react-navigation/native';
import Header from '../components/Header';
import { WEBVIEW_BASE_PATH } from '../config/linking';
import DevBottomBarLauncher from '../components/developer/DevBottomBarLauncher';

type WebViewScreenRouteProp = RouteProp<{ params: { url?: string } }, 'params'>;

function WebViewScreen() {
  const isDarkMode = useColorScheme() === 'dark';
  const route = useRoute<WebViewScreenRouteProp>();
  
  // Get path from route params, default to 'pokedex'
  const path = route.params?.url || 'pokedex';
  
  // Construct the full URL using basePath + path
  const webUrl = `${WEBVIEW_BASE_PATH}/${path}`;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      
      {/* Header component */}
      <Header 
        backgroundColor="#f0f8ff" 
        subtitle="WebView Content"
        showUrl={true}
        url={webUrl}
      />

      {/* WebView que conecta con el servidor ress.js */}
      <WebView
        source={{ uri: webUrl }}
        style={styles.webview}
        onLoadStart={() => console.log(`WebView loading... URL: ${webUrl}`)}
        onLoadEnd={() => console.log(`WebView loaded! URL: ${webUrl}`)}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn('WebView error: ', nativeEvent);
        }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
        webviewDebuggingEnabled={true}
        mixedContentMode="compatibility"
        onMessage={(event) => {
          console.log('Message from WebView:', event.nativeEvent.data);
        }}
      />
      
      <DevBottomBarLauncher />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  webview: {
    flex: 1,
  },
});

export default WebViewScreen;
