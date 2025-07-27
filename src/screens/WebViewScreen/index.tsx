/**
 * WebView Screen - Displays web content based on path parameter
 */

import React from 'react';
import { StatusBar, useColorScheme, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import Header from '../../components/Header';
import DevBottomBarLauncher from '../../components/DevBottomBarLauncher';
import { useWebViewScreen } from './useWebViewScreen';
import { webViewScreenStyles as styles } from './styles';

function WebViewScreen() {
  const isDarkMode = useColorScheme() === 'dark';
  const {
    webUrl,
    handleLoadStart,
    handleLoadEnd,
    handleError,
    handleMessage,
  } = useWebViewScreen();

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
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        onError={handleError}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
        webviewDebuggingEnabled={true}
        mixedContentMode="compatibility"
        onMessage={handleMessage}
      />
      
      <DevBottomBarLauncher />
    </SafeAreaView>
  );
}

export default WebViewScreen;
