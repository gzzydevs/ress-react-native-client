/**
 * Login Screen - Authentication screen
 */

import React from 'react';
import {
  StatusBar,
  useColorScheme,
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Header from '../../components/Header';
import DevBottomBarLauncher from '../../components/DevBottomBarLauncher';
import { useLoginScreen } from './useLoginScreen';
import { loginScreenStyles as styles } from './styles';

function LoginScreen() {
  const isDarkMode = useColorScheme() === 'dark';
  const {
    username,
    setUsername,
    password,
    setPassword,
    handleLogin,
    goToWebView,
  } = useLoginScreen();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      
      <Header 
        backgroundColor="#fff3e0" 
        subtitle="Accede a tu cuenta"
        showBackButton={false}
      />
      
      <View style={styles.content}>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Usuario"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            autoCorrect={false}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>INICIAR SESIÓN</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.webViewButton} onPress={goToWebView}>
            <Text style={styles.webViewButtonText}>IR A WEBVIEW</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <DevBottomBarLauncher />
    </SafeAreaView>
  );
}

export default LoginScreen;
