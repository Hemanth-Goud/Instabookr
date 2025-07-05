import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ImageBackground,
  Alert
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // const handleLogin = () => {
  //   if (!username || !password) {
  //     Alert.alert('Error', 'Please fill all fields');
  //     return;
  //   }
  //   axios.post('http://localhost:8080/login', {
  //     username,
  //     password
  //   })
  //   .then(response => {
  //     console.log('Login API Response:', response.data);

  //     if (response.data.success) {
  //       Alert.alert(
  //         'Success',
  //         'Login successful!',
  //         [
  //           {
  //             text: 'OK',
  //             onPress: () => {
  //               setTimeout(() => {
  //                 navigation.navigate('HomeScreen');
  //               }, 100);
  //             }
  //           }
  //         ],
  //         { cancelable: false }
  //       );
  //     } else {
  //       Alert.alert('Error', response.data.message || 'Invalid credentials');
  //     }
  //   })
  //   .catch(error => {
  //     console.log('Login API Error:', error);
  //     Alert.alert('Error', 'Login failed. Please try again.');
  //   });
  // };
   const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/user/login', {
        username,
        password,
      });

      if (response.status === 200 || response.status === 201) {
        Alert.alert('Success', 'Login successful');
        await AsyncStorage.setItem('username', username);
        const response = await axios.get(`http://localhost:8080/api/user/user-by-username/${username}`);
        await AsyncStorage.setItem('email', response.data.email);
        navigation.navigate('HomeScreen'); // ✅ Navigate after success
      } else {
          Alert.alert('Error', 'Login failed');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong');
    }
  };
 


  return (
    <ImageBackground
      source={require('./bg_img.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backArrow}>{'\u2190'}</Text>
      </TouchableOpacity>

      <View style={styles.heading}>
        <Text style={styles.header}>Login</Text>
        <Text style={styles.subHeader}>with your details</Text>
      </View>

      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Enter Username"
          placeholderTextColor="#999"
          value={username}
          onChangeText={setUsername}
        />
      </View>

      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      <View style={styles.resendContainer}>
        <Text style={styles.didntGet}>New user? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegistrationScreen')}>
          <Text style={styles.resend}>Register here</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  backArrow: {
    fontSize: 40,
    color: '#fff',
    marginTop: 60,
    marginLeft: 30
  },
  heading: {
    marginTop: 30,
    marginLeft: -50
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  subHeader: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
    marginTop: 20,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#FF4C5B',
    paddingVertical: 10,
    paddingHorizontal: 100,
    borderRadius: 30,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resendContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    maxWidth: '90%',
    marginTop: 10,
  },
  didntGet: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  resend: {
    fontSize: 16,
    color: '#f98db4',
    textDecorationLine: 'underline',
    textAlign: 'center',
    paddingTop: 20
  }
});

export default LoginScreen;
