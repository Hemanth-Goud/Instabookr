import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const RegistrationScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const handleRegister = () => {
  //   if (!username || !email || !password) {
  //     Alert.alert('Error', 'Please fill all fields');
  //     return;
  //   }

  //   axios.post('http://localhost:8080/register', {
  //     username,
  //     email,
  //     password
  //   })
  //     .then(response => {
  //        console.log(response.data);
  //       Alert.alert('Success', 'Registration done successfully', [
  //         { text: 'OK', onPress: () => navigation.navigate('LoginScreen') }
  //       ]);
  //     })
  //     .catch(error => {
  //       console.log('API Error:', error);
  //       Alert.alert('Error', 'Failed to register. Please try again.');
  //     });
  // };
   const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/user/register', {
        username,
        email,
        password,
      });

      if (response.status === 200 || response.status === 201) {
        Alert.alert('Success', 'Registration successful');
        await AsyncStorage.setItem('username', username);
        await AsyncStorage.setItem('email', email);
        navigation.navigate('LoginScreen'); // ✅ Navigate after success
     } else {
          Alert.alert('Error', 'Registration failed');
         
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
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
            <View style={styles.topContent}>
              <Text style={styles.logo}>Instabookr</Text>
              <Text style={styles.title}>
                Book your{"\n"}slot in{"\n"}60 seconds
              </Text>

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
                  placeholder="Enter Email"
                  placeholderTextColor="#999"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
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

              <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Register</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.footer}>
              <Text style={styles.terms}>
                By continuing, you agree to our{' '}
                <Text style={styles.link}>Terms of Use</Text> &{' '}
                <Text style={styles.link}>Privacy Policy</Text>
              </Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width:'100%',
    height:'100%',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    paddingTop: 30,
    paddingBottom: 20,
  },
  topContent: {
    marginTop: 20,
  },
  logo: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FF4C5B',
    marginBottom: 40,
    paddingTop:50,
  },
  title: {
    fontSize: 28,
    color: '#FFFFFF',
    marginBottom: 30,
    lineHeight: 38,
    fontWeight: '600',
  },
  inputWrapper: {
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 20,
  },
  input: {
    fontSize: 16,
    color: '#333',
  },
  button: {
  backgroundColor: '#FF4C5B',
  paddingVertical: 16,
  paddingHorizontal: 60,
  borderRadius: 30,
  alignItems: 'center',
  alignSelf: 'center',
  marginTop: 20,
  marginBottom: 30,
},
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    marginBottom: 20,
  },
  terms: {
    color: '#ccc',
    fontSize: 13,
    textAlign: 'center',
  },
  link: {
    color: '#FF4C5B',
    fontWeight: '600',
  },
});

export default RegistrationScreen;
