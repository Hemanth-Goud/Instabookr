import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';

const { height, width } = Dimensions.get('window');
const salonImages = {
  "Jawed Habib Hair & Beauty Rajam": [
    "https://images.unsplash.com/photo-1612444530582-d35d94c5cb9c",
    "https://images.unsplash.com/photo-1613043064976-6f6d06f7ed55",
    "https://images.unsplash.com/photo-1559599238-95a8ba3f34aa"
  ],
  "Naturals Salon": [
    "https://images.unsplash.com/photo-1594824476967-48c8b964273a",
    "https://images.unsplash.com/photo-1588776814546-d929f9b05be0",
    "https://images.unsplash.com/photo-1613145998994-1db01be8aa03"
  ],
  "Charishma beauty & Spa": [
    "https://images.unsplash.com/photo-1594824476967-48c8b964273a",
    "https://images.unsplash.com/photo-1616541136561-2ca2ff409aeb",
    "https://images.unsplash.com/photo-1599932664965-b7e321edbe6d"
  ],
  "Shine Beauty Parlour": [
    "https://images.unsplash.com/photo-1621086893821-e82552f2013f",
    "https://images.unsplash.com/photo-1596477602103-bb12d262cf35",
    "https://images.unsplash.com/photo-1615793532285-1eec166a4632"
  ],
  "BLACK BRAND UNISEX FAMILY SALON & SPA": [
    "https://images.unsplash.com/photo-1607330288455-e41d5468cfd9",
    "https://images.unsplash.com/photo-1599932664965-b7e321edbe6d",
    "https://images.unsplash.com/photo-1589820296156-2454bb8ee9a2"
  ],
  "New trends salon & Tattoo": [
    "https://images.unsplash.com/photo-1612444530582-d35d94c5cb9c",
    "https://images.unsplash.com/photo-1617040977584-1154c46d7ad9",
    "https://images.unsplash.com/photo-1588776814546-d929f9b05be0"
  ],
  "Anusri beauty parlour": [
    "https://images.unsplash.com/photo-1599932664965-b7e321edbe6d",
    "https://images.unsplash.com/photo-1613145998994-1db01be8aa03",
    "https://images.unsplash.com/photo-1594824476967-48c8b964273a"
  ],
  "Sai Salon And Spa": [
    "https://images.unsplash.com/photo-1607330288455-e41d5468cfd9",
    "https://images.unsplash.com/photo-1588776814546-d929f9b05be0",
    "https://images.unsplash.com/photo-1612444530582-d35d94c5cb9c"
  ],
  "SAI SAHAJA EMPORIUM": [
    "https://images.unsplash.com/photo-1613145998994-1db01be8aa03",
    "https://images.unsplash.com/photo-1615793532285-1eec166a4632",
    "https://images.unsplash.com/photo-1599932664965-b7e321edbe6d"
  ],
  "Anil Saloon Hair Style And Spa": [
    "https://images.unsplash.com/photo-1621086893821-e82552f2013f",
    "https://images.unsplash.com/photo-1594824476967-48c8b964273a",
    "https://images.unsplash.com/photo-1613145998994-1db01be8aa03"
  ],
  "Shree Mamatha": [
    "https://images.unsplash.com/photo-1607330288455-e41d5468cfd9",
    "https://images.unsplash.com/photo-1596477602103-bb12d262cf35",
    "https://images.unsplash.com/photo-1617040977584-1154c46d7ad9"
  ],
  "Balaji Styles Saloon": [
    "https://images.unsplash.com/photo-1612444530582-d35d94c5cb9c",
    "https://images.unsplash.com/photo-1615793532285-1eec166a4632",
    "https://images.unsplash.com/photo-1589820296156-2454bb8ee9a2"
  ],
  "SVR Hairstyles": [
    "https://images.unsplash.com/photo-1599932664965-b7e321edbe6d",
    "https://images.unsplash.com/photo-1617040977584-1154c46d7ad9",
    "https://images.unsplash.com/photo-1594824476967-48c8b964273a"
  ],
  "Lakme Salon Rajam": [
    "https://images.unsplash.com/photo-1613145998994-1db01be8aa03",
    "https://images.unsplash.com/photo-1596477602103-bb12d262cf35",
    "https://images.unsplash.com/photo-1589820296156-2454bb8ee9a2"
  ],
  "VLCC Salon & Wellness": [
    "https://images.unsplash.com/photo-1596477602103-bb12d262cf35",
    "https://images.unsplash.com/photo-1621086893821-e82552f2013f",
    "https://images.unsplash.com/photo-1612444530582-d35d94c5cb9c"
  ],
  "Trends Gents Parlour": [
    "https://images.unsplash.com/photo-1588776814546-d929f9b05be0",
    "https://images.unsplash.com/photo-1613145998994-1db01be8aa03",
    "https://images.unsplash.com/photo-1599932664965-b7e321edbe6d"
  ],
  "Sri Sai Beauty Parlour": [
    "https://images.unsplash.com/photo-1594824476967-48c8b964273a",
    "https://images.unsplash.com/photo-1607330288455-e41d5468cfd9",
    "https://images.unsplash.com/photo-1621086893821-e82552f2013f"
  ],
  "Glow Beauty Hub": [
    "https://images.unsplash.com/photo-1596477602103-bb12d262cf35",
    "https://images.unsplash.com/photo-1615793532285-1eec166a4632",
    "https://images.unsplash.com/photo-1589820296156-2454bb8ee9a2"
  ],
  "Classic Men's Parlour": [
    "https://images.unsplash.com/photo-1599932664965-b7e321edbe6d",
    "https://images.unsplash.com/photo-1612444530582-d35d94c5cb9c",
    "https://images.unsplash.com/photo-1613145998994-1db01be8aa03"
  ],
  "Sri Venkateswara Beauty Parlour": [
    "https://images.unsplash.com/photo-1607330288455-e41d5468cfd9",
    "https://images.unsplash.com/photo-1615793532285-1eec166a4632",
    "https://images.unsplash.com/photo-1594824476967-48c8b964273a"
  ]
};


const AboutPage = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const salon = route.params?.salon ?? { name: 'Salon', address: '', location: '' };

  const [selectedTab, setSelectedTab] = useState('About');
  const [expanded, setExpanded] = useState({
    staff: false, location: false, timing: false, info: false, reviews: false,
  });
  const [selectedServices, setSelectedServices] = useState({});

  const toggleExpand = (section) =>
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }));

  // Staff lists for salons based on salon name
  const staffData = {
    "Jawed Habib Hair & Beauty Rajam": ["Suresh Kumar", "Ravi Teja", "Lakshmi Devi"],
    "Naturals Salon": ["Anil Kumar", "Suma Rani", "Venkatesh"],
    "Charishma beauty & Spa": ["Rajesh Babu", "Sunita", "Anitha"],
    "Shine Beauty Parlour": ["Krishna", "Sravani", "Karthik"],
    "BLACK BRAND UNISEX FAMILY SALON & SPA": ["Ramesh", "Jyothi", "Prakash"],
    "New trends salon & Tattoo": ["Vijay", "Nirmala", "Suresh"],
    "Anusri beauty parlour": ["Mahesh", "Lakshmi", "Raju"],
    "Sai Salon And Spa": ["Siddharth", "Pooja", "Naveen"],
    "SAI SAHAJA EMPORIUM": ["Kiran", "Divya", "Rohit"],
    "Anil Saloon Hair Style And Spa": ["Srinivas", "Manasa", "Harsha"],
    "Shree Mamatha": ["Ajay", "Neelima", "Rahul"],
    "Balaji Styles Saloon": ["Sandeep", "Swathi", "Gopi"],
    "SVR Hairstyles": ["Venkat", "Padma", "Sunil"],
    "Lakme Salon Rajam": ["Raja", "Sneha", "Raghav"],
    "VLCC Salon & Wellness": ["Deepak", "Harini", "Arjun"],
    "Trends Gents Parlour": ["Vamsi", "Pavani", "Chaitanya"],
    "Sri Sai Beauty Parlour": ["Kalyan", "Keerthi", "Tarun"],
    "Glow Beauty Hub": ["Anand", "Manjula", "Siva"],
    "Classic Men's Parlour": ["Raju", "Madhavi", "Ganesh"],
    "Sri Venkateswara Beauty Parlour": ["Sushil", "Bhavana", "Ramesh"]
  };

  const staffList = staffData[salon.name] || ["Staff info not available"];

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* ---------- Header ---------- */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{salon.name}</Text>
      </View>

      {/* ---------- Image Slider ---------- */}
     <ScrollView
  horizontal
  pagingEnabled
  showsHorizontalScrollIndicator={false}
  style={styles.imageSlider}
>
  {(salonImages[salon.name] || [
    'https://via.placeholder.com/600x400?text=No+Image+Available',
  ]).map((uri, index) => (
    <Image key={index} source={{ uri }} style={styles.sliderImage} />
  ))}
</ScrollView>


      {/* ---------- Bottom Half ---------- */}
      <View style={styles.bottomHalf}>
        {/* Tab bar */}
        <View style={styles.tabBar}>
          {['About', 'Services'].map((tab) => (
            <TouchableOpacity key={tab} onPress={() => setSelectedTab(tab)}>
              <Text
                style={[
                  styles.tabText,
                  selectedTab === tab && styles.activeTab,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab content */}
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {selectedTab === 'About' ? (
            <>
              {/* ===== Staff ===== */}
              <AccordionButton
                label="Our Staff"
                expanded={expanded.staff}
                onPress={() => toggleExpand('staff')}
              />
              {expanded.staff && (
                <View style={styles.detailBox}>
                  {staffList.map((name) => (
                    <StaffCard key={name} name={name} role="Hair Stylist" />
                  ))}
                </View>
              )}

              {/* ===== Location ===== */}
              <AccordionButton
                label="Location"
                expanded={expanded.location}
                onPress={() => toggleExpand('location')}
              />
              {expanded.location && (
                <View style={styles.detailBox}>
                  <Text style={styles.detailText}>📍 {salon.address}</Text>
                </View>
              )}

              {/* ===== Timing ===== */}
              <AccordionButton
                label="Timings"
                expanded={expanded.timing}
                onPress={() => toggleExpand('timing')}
              />
              {expanded.timing && (
                <View style={styles.detailBox}>
                  <Text style={styles.detailText}>
                    Mon–Fri: 10 AM – 8 PM
                  </Text>
                  <Text style={styles.detailText}>
                    Sat–Sun: 9 AM – 9 PM
                  </Text>
                </View>
              )}

              {/* ===== Info ===== */}
              <AccordionButton
                label="Salon Info"
                expanded={expanded.info}
                onPress={() => toggleExpand('info')}
              />
              {expanded.info && (
                <View style={styles.detailBox}>
                  <Text style={styles.detailText}>
                    We provide premium grooming services with top-rated
                    stylists and strict hygiene practices.
                  </Text>
                </View>
              )}

              {/* ===== Reviews ===== */}
              <AccordionButton
                label="Reviews"
                expanded={expanded.reviews}
                onPress={() => toggleExpand('reviews')}
              />
              {expanded.reviews && (
                <View style={styles.detailBox}>
                  <Text style={styles.detailText}>
                    ⭐⭐⭐⭐⭐ – “Amazing service!”
                  </Text>
                  <Text style={styles.detailText}>
                    ⭐⭐⭐⭐ – “Very clean and professional.”
                  </Text>
                </View>
              )}
            </>
          ) : (
            /* -------- Services Tab -------- */
            <View style={styles.serviceTable}>
              <TableHeader />
              {[
                { service: 'Haircut', price: '100', time: '1 hr' },
                { service: 'Shaving', price: '50', time: '30 min' },
                { service: 'Hair Spa', price: '300', time: '1.5 hr' },
                { service: 'Facial', price: '250', time: '1 hr' },
                { service: 'Massage', price: '500', time: '2 hr' },
              ].map((item) => {
                const isSelected = selectedServices[item.service] ?? false;
                return (
                  <View key={item.service} style={styles.tableRow}>
                    <Text style={styles.tableCell}>{item.service}</Text>
                    <Text style={styles.tableCell}>{item.price}</Text>
                    <Text style={styles.tableCell}>{item.time}</Text>
                    <TouchableOpacity
                      style={styles.addRemoveButton}
                      onPress={() =>
                        setSelectedServices((prev) => ({
                          ...prev,
                          [item.service]: !prev[item.service],
                        }))
                      }
                    >
                      <Text style={styles.addRemoveText}>
                        {isSelected ? '−' : '+'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          )}
        </ScrollView>
      </View>

      {/* ---------- Proceed button (services tab only) ---------- */}
      {selectedTab === 'Services' && (
        <View style={styles.proceedWrapper}>
          <TouchableOpacity
            style={styles.proceedBtn}
            onPress={() => {
              // turn { Haircut:true, Shaving:false, Facial:true } ➜ ['Haircut','Facial']
              const chosen = Object.keys(selectedServices).filter(k => selectedServices[k]);
              navigation.navigate('SlotBooking', { services: chosen ,salon:salon.name});
            }}
          >
            <Text style={styles.proceedText}>Proceed</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

/* ========= Reusable components ========= */

const AccordionButton = ({ label, expanded, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>
      {expanded ? '▼ ' : '▶︎ '}
      {label}
    </Text>
  </TouchableOpacity>
);

const StaffCard = ({ name, role }) => (
  <View style={styles.staffCard}>
    <Image
      source={{ uri: 'https://via.placeholder.com/80' }}
      style={styles.staffImage}
    />
    <View>
      <Text style={styles.detailText}>{name}</Text>
      <Text style={styles.subDetailText}>{role}</Text>
    </View>
  </View>
);

const TableHeader = () => (
  <View style={styles.tableRow}>
    {['Service', 'Price (₹)', 'Time', ''].map((h) => (
      <Text key={h} style={[styles.tableCell, styles.headerCell]}>
        {h}
      </Text>
    ))}
  </View>
);

/* ========= Styles ========= */

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: 'black' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#444',
    marginTop:50
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 12,
    flexShrink: 1,
  },

  container: { flex: 1, backgroundColor: 'black' },

  imageSlider: {
  height:250,
    flex: 1,
    backgroundColor: '#222',
  },
  sliderImage: { width, height:'100%',resizeMode:'cover'},

  bottomHalf: {
    flex: 1,
    backgroundColor: 'black',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
  },

  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 6,
    backgroundColor: '#111',
  },
  tabText: { color: 'white', fontSize: 15 },
  activeTab: { fontWeight: 'bold', textDecorationLine: 'underline' },

  contentContainer: { padding: 16, paddingBottom: 100 },

  serviceTable: { paddingHorizontal: 10 },
  tableRow: { flexDirection: 'row', paddingVertical: 12 },
  tableCell: {
    flex: 1,
    color: 'white',
    fontSize: 14,
  },
  headerCell: { fontWeight: 'bold' },
  addRemoveButton: { paddingHorizontal: 10 },
  addRemoveText: { color: '#FF4C5B', fontSize: 20 },

  button: { marginVertical: 10 },
  buttonText: { color: 'white', fontSize: 18 },
  detailBox: { paddingVertical: 8 },
  detailText: { color: 'white' },
  subDetailText: { color: '#bbb' },

  staffCard: { flexDirection: 'row', paddingVertical: 8 },
  staffImage: { width: 60, height: 60, borderRadius: 30 },
  staffName: { color: 'white', fontSize: 14 },
  staffRole: { color: '#bbb', fontSize: 12 },

  proceedWrapper: {
    padding: 16,
    backgroundColor: '#222',
  },
  proceedBtn: {
    backgroundColor: '#FF4C5B',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  proceedText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});

export default AboutPage; 