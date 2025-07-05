import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const NotificationsPage = ({ navigation }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = () => {
    axios.get('http://localhost:8080/api/notifications/all')
      .then(response => {
        setNotifications(response.data);
      })
      .catch(error => {
        console.log('Error fetching notifications:', error);
      });
  };
  
  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notifications</Text>
        </View>

        {/* Notification list */}
        <ScrollView contentContainerStyle={styles.notificationList}>
          {notifications.length === 0 ? (
            <Text style={{ color: 'white' }}>No notifications yet.</Text>
          ) : (
            notifications.map((note, index) => (
              <View key={index} style={styles.notificationCard}>
                <Text style={styles.notificationText}>{note.message}</Text>
                 <Text style={styles.dateText}>{formatDateTime(note.createdAt)}</Text>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default NotificationsPage;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'black',
  },
  container: {
    flex: 1,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#444',
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  notificationList: {
    padding: 16,
  },
  notificationCard: {
    backgroundColor: '#222',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  notificationText: {
    color: 'white',
    fontSize: 16,
  },
  dateText: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 6,
  },
});
