import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [Username, setUsername] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [walletVisible, setWalletVisible] = useState(false);
  const [changePassVisible, setChangePassVisible] = useState(false);

  // Password fields
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUsername = await AsyncStorage.getItem('username');
      const storedEmail = await AsyncStorage.getItem('email');
      if (!storedUsername || !storedEmail) {
        Alert.alert("No user data found, please login.");
        setLoading(false);
        return;
      }
       try {
      const response = await axios.get(`http://localhost:8080/api/user/user-by-username/${storedUsername}`);
      setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        Alert.alert("Failed to fetch profile data");
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.replace('LoginScreen');
  };

  // Handle change password submit
  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword) {
      Alert.alert('Validation', 'Please fill in both old and new passwords.');
      return;
    }
    setChangingPassword(true);
    try {
      const payload = {
        username: userData.username,
        oldPassword,
        newPassword,
      };
      // Replace URL with your real API endpoint to change password
      const response = await axios.post('http://localhost:8080/api/user/change-password', payload);

      if (response.status === 200) {
        Alert.alert('Success', 'Password changed successfully.');
        setChangePassVisible(false);
        setOldPassword('');
        setNewPassword('');
      } else {
        Alert.alert('Error', response.data.message || 'Failed to change password.');
      }
    } catch (error) {
      console.error('Change password error:', error);
      Alert.alert('Error', 'Could not change password. Please try again.');
    } finally {
      setChangingPassword(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <View style={styles.profileSection}>
        <MaterialIcons name="person" size={60} color="#fff" style={styles.profileIcon} />
        <View>
          <Text style={styles.name}>{userData?.username}</Text>
          <Text style={styles.email}>{userData?.email}</Text>
          <TouchableOpacity style={styles.editButton}>
            <Text style={{ color: '#fff' }}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Access</Text>

        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('BookingsScreen')}>
          <MaterialIcons name="event" size={22} color="#fff" />
          <Text style={styles.optionText}>My Bookings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => setWalletVisible(true)}>
          <MaterialIcons name="account-balance-wallet" size={22} color="#fff" />
          <Text style={styles.optionText}>My Wallet</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>

        <TouchableOpacity style={styles.option} onPress={() => setChangePassVisible(true)}>
          <MaterialIcons name="lock" size={22} color="#fff" />
          <Text style={styles.optionText}>Change Password</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('NotificationsPage')}>
          <MaterialIcons name="notifications" size={22} color="#fff" />
          <Text style={styles.optionText}>Notifications</Text>
        </TouchableOpacity>

        <View style={styles.option}>
          <MaterialIcons name="help" size={22} color="#fff" />
          <Text style={styles.optionText}>Help & Support</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.logout} onPress={handleLogout}>
        <MaterialIcons name="logout" size={22} color="#fff" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* Wallet Balance Modal */}
      <Modal
        transparent
        animationType="fade"
        visible={walletVisible}
        onRequestClose={() => setWalletVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.walletCard}>
            <Text style={styles.walletTitle}>InstaBookr Wallet</Text>
            <Text style={styles.walletAmount}>₹ 2000</Text>
            <TouchableOpacity onPress={() => setWalletVisible(false)} style={styles.closeButton}>
              <Text style={{ color: '#fff' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Change Password Modal */}
      <Modal
        transparent
        animationType="slide"
        visible={changePassVisible}
        onRequestClose={() => setChangePassVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.changePassCard}>
            <Text style={styles.modalTitle}>Change Password</Text>

            <Text style={styles.label}>Username</Text>
            <TextInput
              style={[styles.input, { backgroundColor: '#555', color: '#ccc' }]}
              value={userData?.username || ''}
              editable={false}
            />

            <Text style={styles.label}>Old Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter old password"
              secureTextEntry
              value={oldPassword}
              onChangeText={setOldPassword}
            />

            <Text style={styles.label}>New Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter new password"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />

            <TouchableOpacity
              style={[styles.changeButton, changingPassword && { backgroundColor: '#999' }]}
              disabled={changingPassword}
              onPress={handleChangePassword}
            >
              <Text style={styles.changeButtonText}>
                {changingPassword ? 'Changing...' : 'Change Password'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setChangePassVisible(false)} style={styles.closeButton}>
              <Text style={{ color: '#fff' }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: '#000', padding: 20, flex: 1 },
  header: { marginTop: 50, marginBottom: 20 },
  iconButton: { marginBottom: 10 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  profileSection: { flexDirection: 'row', alignItems: 'center', paddingVertical: 20 },
  profileIcon: { marginRight: 20 },
  name: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  email: { fontSize: 14, color: '#aaa', marginTop: 4 },
  phone: { fontSize: 14, color: '#aaa', marginTop: 2 },
  editButton: {
    marginTop: 12,
    backgroundColor: '#222',
    paddingHorizontal: 25,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  section: { marginTop: 30 },
  sectionTitle: { color: '#999', fontSize: 14, marginBottom: 10 },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  optionText: { fontSize: 16, marginLeft: 15, color: '#fff' },
  logout: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    justifyContent: 'center',
  },
  logoutText: { fontSize: 16, marginLeft: 10, color: '#fff' },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },

  walletCard: {
    backgroundColor: '#222',
    padding: 30,
    borderRadius: 16,
    alignItems: 'center',
  },
  walletTitle: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
  walletAmount: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  changePassCard: {
    backgroundColor: '#222',
    padding: 30,
    borderRadius: 16,
    width: '85%',
  },
  modalTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    color: '#ccc',
    marginBottom: 6,
    fontSize: 14,
  },
  input: {
    backgroundColor: '#333',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
    color: '#fff',
  },
  changeButton: {
    backgroundColor: '#FF4C5B',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  changeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    alignItems: 'center',
    paddingVertical: 10,
  },
});

export default ProfileScreen;
