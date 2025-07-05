import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Location from 'expo-location';

const GOOGLE_API_KEY = 'AIzaSyBUHWHBC-nGS6asNviV-yHzb1llwxHtxTE';
const LOCAL_IP = '172.30.68.247'; // your backend IP here

const HomeScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const [searchText, setSearchText] = useState('');
  const [salons, setSalons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchedArea, setSearchedArea] = useState('');

 const fetchSalonsByCoords = async (lat, lng) => {
  setLoading(true);
  try {
    // Optional: skip geocode call if you know it's Rajam already
    const geoResponse = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
    );
    const geoData = await geoResponse.json();

    if (geoData.status !== 'OK' || geoData.results.length === 0) {
      setSearchedArea('Rajam'); // fallback if no address found
    } else {
      const formattedAddress = geoData.results[0].formatted_address;
      setSearchedArea(formattedAddress);
    }
     console.log("1111")
    // Call backend to fetch salons
    const salonResponse = await fetch(
      `http://localhost:8080/salons/nearby?lat=18.5900&lng=83.4000`
    );
console.log("2222")
    if (!salonResponse.ok) {
      throw new Error(`Backend response not OK: ${salonResponse.status}`);
    }
console.log("3333")
    const salonsData = await salonResponse.json();
    setSalons(salonsData);
console.log("4444")
  } catch (error) {
    console.error('Salon Fetch Error:', error);
    alert('Failed to fetch salons near Rajam. Please check network and backend status.');
  } finally {
    setLoading(false);
  }
};
console.log("5555")

  const fetchSalonsByLocation = async () => {
  if (!searchText) return;
  setLoading(true);
  try {
    const geoResponse = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        searchText
      )}&key=${GOOGLE_API_KEY}`
    );
    const geoData = await geoResponse.json();

    if (geoData.results.length === 0) {
      setSalons([]);
      setSearchedArea(searchText);
      setLoading(false);
      return;
    }

    const { lat, lng } = geoData.results[0].geometry.location;
    setSearchedArea(geoData.results[0].formatted_address);

    // <-- Use dynamic lat/lng here:
    const salonResponse = await fetch(
      `http://localhost:8080/salons/nearby?lat=18.5900&lng=83.4000`
    );

    if (!salonResponse.ok) {
      throw new Error(`Backend response not OK: ${salonResponse.status}`);
    }

    const salonsData = await salonResponse.json();
    setSalons(salonsData);
  } catch (error) {
    console.error('Salon Fetch Error:', error);
    alert('Failed to fetch salons for searched location.');
  } finally {
    setLoading(false);
  }
};


  const getCurrentLocation = async () => {
    setLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        setLoading(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const geoResponse = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`
      );
      const geoData = await geoResponse.json();

      const formattedAddress = geoData.results[0]?.formatted_address || 'your area';
      setSearchedArea(formattedAddress);

      const salonResponse = await fetch(
        `http://localhost:8080/salons/nearby?lat=18.5900&lng=83.4000`
      );
      const salonsData = await salonResponse.json();
      setSalons(salonsData);
    } catch (err) {
      console.error('Error fetching location:', err);
      alert('Something went wrong while fetching your location.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.locationText}>Search Salons</Text>
          <TouchableOpacity
            style={styles.notification}
            onPress={() => navigation.navigate('NotificationsPage')}
          >
            <Ionicons name="notifications-outline" size={28} color="white" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.useLocationBtn} onPress={getCurrentLocation}>
          <Ionicons name="locate" size={20} color="white" style={{ marginRight: 10 }} />
          <Text style={{ color: 'white', fontSize: 16 }}>Use Current Location</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.useLocationBtn, { marginTop: 12, backgroundColor: '#444' }]}
          onPress={fetchSalonsByCoords}
        >
          <Text style={{ color: 'white', fontSize: 16 }}>Search Rajam</Text>
        </TouchableOpacity>

        <View style={styles.searchBar}>
          <TextInput
            placeholder="Enter area/city"
            placeholderTextColor="#aaa"
            value={searchText}
            onChangeText={setSearchText}
            style={styles.searchInput}
          />
          <TouchableOpacity style={styles.searchButton} onPress={fetchSalonsByLocation}>
            <Ionicons name="search" size={22} color="white" />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>
          {searchedArea ? `Nearby Salons in ${searchedArea}` : 'Nearby Salons'}
        </Text>

        {loading ? (
          <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />
        ) : (
          <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
            {salons.length > 0 ? (
              salons.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.simpleSalonCard}
                  onPress={() => navigation.navigate('AboutPage', { salon: item })}
                >
                  <Text style={styles.simpleSalonName}>{item.name}</Text>
                  <Text>{item.address}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.noSalonsText}>No salons found in {searchedArea}.</Text>
            )}
          </ScrollView>
        )}

        <View style={[styles.footer, { paddingBottom: insets.bottom || 16 }]}>
          <TouchableOpacity style={styles.footerButton}>
            <Ionicons name="home" size={30} color="white" />
            <Text style={styles.footerLabel}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.footerButton}
            onPress={() => navigation.navigate('BookingsScreen')}
          >
            <MaterialIcons name="event-available" size={30} color="white" />
            <Text style={styles.footerLabel}>My Bookings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.footerButton}
            onPress={() => navigation.navigate('ProfileScreen')}
          >
            <MaterialIcons name="person-outline" size={30} color="white" />
            <Text style={styles.footerLabel}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

// ✅ your existing styles here as-is


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  notification: {
    padding: 8,
  },
  useLocationBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    backgroundColor: '#222',
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#222',
    color: 'white',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
  },
  searchButton: {
    backgroundColor: '#444',
    padding: 12,
    marginLeft: 8,
    borderRadius: 8,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 12,
  },
  noSalonsText: {
    color: '#aaa',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  simpleSalonCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    marginHorizontal: 1,
  },
  simpleSalonName: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderTopColor: '#333',
    borderTopWidth: 1,
    backgroundColor: '#000',
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  footerButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
  },
  footerLabel: {
    color: 'white',
    fontSize: 12,
    marginTop: 2,
    textAlign: 'center',
    flexWrap: 'wrap',
    overflow: 'visible',
    width: '100%',
    textAlignVertical: 'center',
  },
});
