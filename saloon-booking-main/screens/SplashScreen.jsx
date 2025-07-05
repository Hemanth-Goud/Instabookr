import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        setTimeout(() => {
          if (userToken) {
            navigation.replace("HomeScreen");  // Already logged in
          } else {
            navigation.replace("RegistrationScreen"); // First time login
          }
        }, 3000); // 3 seconds splash delay
      } catch (error) {
        console.error("Error checking login status:", error);
        navigation.replace("RegistrationScreen"); // fallback
      }
    };

    checkLoginStatus();
  }, [navigation]);

  return (
    <LinearGradient
      colors={["#6D00B6", "#8B2EDC"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <StatusBar style="light" />
      <View style={styles.textBox}>
        <Text style={styles.title}>Instabookr </Text>
        <Text style={styles.tagline}>tap.book.relax </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textBox: {
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "800",
    color: "#FFF",
  },
  tagline: {
    marginTop: 8,
    fontSize: 14,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    color: "#FFF",
    justifyContent: 'space-evenly'
  },
});
