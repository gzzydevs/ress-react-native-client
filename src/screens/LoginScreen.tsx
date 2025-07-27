/**
 * Login Screen - Authentication screen
 */

import React, { useState } from 'react';
import {
  StatusBar,
  useColorScheme,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Header from '../components/Header';
import DevBottomBarLauncher from '../components/developer/DevBottomBarLauncher';

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  WebView: { url?: string };
};

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

function LoginScreen() {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username.trim() === '' || password.trim() === '') {
      Alert.alert('Error', 'Por favor ingresa usuario y contraseña');
      return;
    }

    // Simular login exitoso
    Alert.alert(
      'Login Exitoso',
      `Bienvenido ${username}!`,
      [
        {
          text: 'IR AL HOME',
          onPress: () => navigation.navigate('Home'),
        },
      ]
    );
  };

  const goToWebView = () => {
    navigation.navigate('WebView', { url: 'pokedex' });
  };

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  form: {
    gap: 16,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  webViewButton: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  webViewButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
