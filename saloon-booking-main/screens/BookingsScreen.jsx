import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const BookingsScreen = () => {
  const navigation = useNavigation();
  const [bookings, setBookings] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('all','confirmed');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    axios
      .get('http://localhost:8080/api/bookings/all')
      .then(response => {
        // Sort bookings in LIFO order by ID (latest first)
        const sortedBookings = response.data.sort((a, b) => b.id - a.id);
        setBookings(sortedBookings);
      })
      .catch(error => {
        console.log('Error fetching bookings:', error);
      });
  };

  const filteredBookings = bookings.filter(booking => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'confirmed') return booking.status === 'confirmed';
    if (selectedFilter === 'cancelled') return booking.status === 'cancelled';
    return false;
  });

  const renderBookingItem = ({ item }) => (
    <View style={styles.bookingCard}>
      <Text style={styles.detail}>Salon: {item.salonName}</Text>
      <Text style={styles.detail}>Seat: {item.seatNumber}</Text>
      <Text style={styles.detail}>Services: {item.serviceName}</Text>
      <Text style={styles.detail}>Slot Time: {item.slotTime}</Text>
      <Text style={styles.detail}>Date: {item.date}</Text>
      <Text style={styles.detail}>Status: {item.status}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Bookings</Text>
      </View>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setSelectedFilter('all')}
        >
          <Text style={styles.filterText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setSelectedFilter('confirmed')}
        >
          <Text style={styles.filterText}>Confirmed</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setSelectedFilter('cancelled')}
        >
          <Text style={styles.filterText}>Cancelled</Text>
        </TouchableOpacity>
      </View>

      {/* Bookings List */}
      {filteredBookings.length === 0 ? (
        <View style={styles.centerContent}>
          <Text style={styles.noBookingsText}>No bookings found</Text>
        </View>
      ) : (
        <FlatList
          data={filteredBookings}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderBookingItem}
          contentContainerStyle={{ padding: 16 }}
        />
      )}
    </View>
  );
};

export default BookingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 12,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'black',
    paddingVertical: 12,
  },
  filterButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noBookingsText: {
    fontSize: 18,
    color: 'gray',
  },
  bookingCard: {
    backgroundColor: '#1c1c1c',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
  },
  detail: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 4,
  },
});
