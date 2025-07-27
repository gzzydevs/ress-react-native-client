/**
 * useLoginScreen Hook - Business logic and state management for LoginScreen
 */

import { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  WebView: { url?: string };
};

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export const useLoginScreen = () => {
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

  return {
    username,
    setUsername,
    password,
    setPassword,
    handleLogin,
    goToWebView,
  };
};
