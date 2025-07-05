import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';

const dates = ['Jul 3', 'Jul 4', 'Jul 5', 'Jul 6', 'Jul 7'];
const slots = ['10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM'];
const seats = ['seat1', 'seat2', 'seat3', 'seat4'];

const SlotBooking = () => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { services, salon } = route.params;

  const handleBooking = async () => {
    if (!selectedSlot || !selectedDate || !selectedSeat) {
      return Alert.alert('Missing Fields', 'Please select seat, date, and slot');
    }

    const months = {
      Jan: '01', Feb: '02', Mar: '03', Apr: '04',
      May: '05', Jun: '06', Jul: '07', Aug: '08',
      Sep: '09', Oct: '10', Nov: '11', Dec: '12'
    };

    const [monthStr, dayStr] = selectedDate.split(' ');
    const isoDate = `2025-${months[monthStr]}-${dayStr.padStart(2, '0')}`;

    const convertTo24Hour = (timeStr) => {
      const [time, modifier] = timeStr.split(' ');
      let [hours, minutes] = time.split(':');
      if (modifier === 'PM' && hours !== '12') hours = (parseInt(hours) + 12).toString();
      if (modifier === 'AM' && hours === '12') hours = '00';
      return `${hours.padStart(2, '0')}:${minutes}:00`;
    };

    const isoTime = convertTo24Hour(selectedSlot);

    const bookingDetails = {
      username: 'Yash',
      email: 'Yash@example.com',
      salonName: salon,
      serviceName: services.join(', '),
      seatNumber: selectedSeat,
      date: isoDate,
      slotTime: isoTime,
    };

    try {
      const response = await axios.post(
        'http://localhost:8080/api/bookings/add', bookingDetails
      );

      if (response.status === 200 || response.status === 201) {
        Alert.alert('Booking Confirmed', `Booked ${selectedSlot} on ${selectedDate} at ${salon}`);

        // 👉 Send Notification
        await axios.post('http://localhost:8080/api/notifications/add', {
          message: `Booking confirmed for ${salon} at ${selectedSlot} on ${selectedDate}`
        });

        navigation.navigate('BookingConfirmationScreen', {
          username: 'Yash',
          email: 'Yash@example.com',
          salonName: salon,
          serviceName: services.join(', '),
          seatNumber: selectedSeat,
          date: isoDate,
          slotTime: isoTime,
        });
      } else {
        Alert.alert('Error', 'Failed to confirm booking. Please try again.');
      }
    } catch (error) {
      console.error('Booking Error:', error);
      Alert.alert('Error', 'Unable to complete booking. Check your network or server.');
    }
  };

  // ... your existing return JSX stays unchanged ...
  return (
    <View style={styles.container}>
      {/* Top bar */}
      <View style={styles.display}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.summaryHeading}>Selected Services</Text>
      </View>

      <Text style={styles.heading}>Services: {services.join(', ')}</Text>
      <Text style={styles.heading}>Select a Seat</Text>

      {/* Seats */}
      <View style={styles.seatsContainer}>
        {seats.map((seat) => (
          <TouchableOpacity
            key={seat}
            style={[styles.seatItem, selectedSeat === seat && styles.seatItemSelected]}
            onPress={() => setSelectedSeat(seat)}
          >
            <Text style={[styles.seatText, selectedSeat === seat && styles.seatTextSelected]}>
              {seat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.heading}>Select a Date</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateScroll}>
        {dates.map((date) => (
          <TouchableOpacity
            key={date}
            style={[styles.dateItem, selectedDate === date && styles.dateItemSelected]}
            onPress={() => setSelectedDate(date)}
          >
            <Text style={[styles.dateText, selectedDate === date && styles.dateTextSelected]}>
              {date}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.heading}>Available Slots</Text>
      <View style={styles.slotsContainer}>
        {slots.map((slot) => (
          <TouchableOpacity
            key={slot}
            style={[styles.slotItem, selectedSlot === slot && styles.slotItemSelected]}
            onPress={() => setSelectedSlot(slot)}
          >
            <Text style={[styles.slotText, selectedSlot === slot && styles.slotTextSelected]}>
              {slot}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[
          styles.bookButton,
          selectedSlot && selectedDate && selectedSeat ? styles.bookButtonActive : styles.bookButtonDisabled,
        ]}
        disabled={!selectedSlot || !selectedDate || !selectedSeat}
        onPress={handleBooking}
      >
        <Text style={styles.bookButtonText}>Book Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', paddingTop: 60, paddingHorizontal: 20 },
  display: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  backButton: { padding: 1 },
  summaryHeading: { color: '#fff', fontSize: 18, marginLeft: 10 },
  heading: { color: '#fff', fontSize: 16, marginBottom: 10, marginTop: 20 },
  seatsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  seatItem: { backgroundColor: '#222', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, marginRight: 10, marginBottom: 10 },
  seatItemSelected: { backgroundColor: '#FF9800' },
  seatText: { color: '#aaa', fontSize: 14 },
  seatTextSelected: { color: '#fff', fontWeight: 'bold' },
  dateScroll: { marginBottom: 20 },
  dateItem: { padding: 8, marginRight: 8, borderRadius: 6, backgroundColor: '#333' },
  dateItemSelected: { backgroundColor: '#1E88E5' },
  dateText: { color: '#aaa', fontSize: 13 },
  dateTextSelected: { color: '#fff', fontWeight: 'bold' },
  slotsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 30 },
  slotItem: { backgroundColor: '#222', paddingVertical: 10, paddingHorizontal: 15, borderRadius: 8, marginRight: 10, marginBottom: 10 },
  slotItemSelected: { backgroundColor: '#4CAF50' },
  slotText: { color: '#aaa' },
  slotTextSelected: { color: '#fff', fontWeight: 'bold' },
  bookButton: { padding: 15, borderRadius: 10, alignItems: 'center' },
  bookButtonActive: { backgroundColor: '#FF4C5B' },
  bookButtonDisabled: { backgroundColor: '#444' },
  bookButtonText: { color: '#fff', fontSize: 16 },
});

export default SlotBooking;
