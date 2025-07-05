import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const BookingConfirmationScreen = ({ navigation, route }) => {
  const { username,email,slotTime, date, seatNumber, salonName,serviceName} = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconWrapper}>
          <Icon name="check-circle" size={80} color="#4CAF50" />
        </View>
        <Text style={styles.title}>Your slot booked Successfully!</Text>
        <Text style={styles.details}>Your slot is confirmed on: </Text>
        <Text style={styles.time}>{slotTime}, {date}</Text>

        <Text style={styles.details}>Seat: {seatNumber} </Text>
        <Text style={styles.details}>Salon: {salonName} </Text>
         <Text style={styles.details}>Services: {serviceName}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BookingsScreen')}>
            <Text style={styles.buttonText}>View My Bookings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('HomeScreen')}>
            <Text style={styles.buttonText}>Go to Home</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.helpButton}>
        <Text style={styles.helpText}>Need help? Contact us. </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default BookingConfirmationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'space-between',
    padding: 24,
  },
  content: {
    alignItems: 'center',
    marginTop: 60,
  },
  iconWrapper: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 16,
  },
  details: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  time: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: '600',
    marginBottom: 12,
  },
  buttonContainer: {
    marginTop: 32,
    width: '100%',
  },
  button: {
    backgroundColor: '#FF4C5B',
    paddingVertical: 14,
    paddingLeft:10,
    paddingRight:10,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
    marginHorizontal: 100,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  helpButton: {
    alignItems: 'center',
    marginBottom: 24,
  },
  helpText: {
    color: '#888',
    fontSize: 14,
    paddingRight:-80
  },
});
