/**
 * Sample React Native App - STACK SIMULATION WITHOUT NAVIGATION
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { StatusBar, useColorScheme, View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

interface ScreenData {
  id: number;
  screenCount: number;
}

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [screenStack, setScreenStack] = useState<ScreenData[]>([{ id: 1, screenCount: 1 }]);
  
  const currentScreen = screenStack[screenStack.length - 1];
  const canGoBack = screenStack.length > 1;

  const handlePush = () => {
    const newScreen: ScreenData = {
      id: Date.now(), // Simple unique ID
      screenCount: screenStack.length + 1
    };
    setScreenStack(prev => [...prev, newScreen]);
  };

  const handlePop = () => {
    if (canGoBack) {
      setScreenStack(prev => prev.slice(0, -1));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      
      {/* Header with app info and navigation buttons */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>🥒 PEPINO 🥒</Text>
          <Text style={styles.subtitle}>React Native + Ress.js</Text>
          <Text style={styles.screenCounter}>Pantalla #{currentScreen.screenCount}</Text>
          <Text style={styles.stackInfo}>Stack: {screenStack.length} pantalla(s)</Text>
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.pushButton]} 
            onPress={handlePush}
          >
            <Text style={styles.buttonText}>📤 PUSH</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.button, 
              canGoBack ? styles.popButton : styles.disabledButton
            ]} 
            onPress={handlePop}
            disabled={!canGoBack}
          >
            <Text style={[
              styles.buttonText,
              !canGoBack && styles.disabledButtonText
            ]}>
              📥 POP
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* WebView que conecta con el servidor ress.js */}
      <WebView
        key={currentScreen.id} // Force re-render for each screen
        source={{ uri: 'http://localhost:3000/pokedex' }}
        style={styles.webview}
        onLoadStart={() => console.log(`WebView loading... Screen #${currentScreen.screenCount}`)}
        onLoadEnd={() => console.log(`WebView loaded! Screen #${currentScreen.screenCount}`)}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 12,
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
  screenCounter: {
    fontSize: 14,
    color: '#888888',
    fontStyle: 'italic',
    marginBottom: 2,
  },
  stackInfo: {
    fontSize: 12,
    color: '#aaaaaa',
    fontStyle: 'italic',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  pushButton: {
    backgroundColor: '#4CAF50',
  },
  popButton: {
    backgroundColor: '#FF9800',
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButtonText: {
    color: '#888888',
  },
  webview: {
    flex: 1,
  },
});

export default App;
