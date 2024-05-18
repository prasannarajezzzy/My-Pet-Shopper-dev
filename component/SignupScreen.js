import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import axios from "axios";
import * as Location from "expo-location";

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState(null);
  const [place, setPlace] = useState("Fetching location...");
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        setPlace("Location permission denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setLocation(location);

      try {
        const response = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=82e3342f6dfe449da3623dc0d22a326c`
        );
        const data = await response.json();
        const locationDetails = data.results[0].components;
        const city =
          locationDetails.city ||
          locationDetails.town ||
          locationDetails.village;
        setPlace(city);
      } catch (error) {
        console.error("Failed to fetch location", error);
        setPlace("Failed to fetch location");
      }
    })();
  }, []);

  const signUp = async () => {
    if (!location) {
      Alert.alert(
        "Error",
        "Location is not available. Please enable location services."
      );
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);

      const response = await axios.post(
        "https://my-pet-shopper-api.onrender.com/api/v1/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Show success message
      navigation.navigate("Login"); // Navigate to the Login screen after signup
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Text style={styles.locationText}>Location: {place}</Text>
      <Text style={styles.locationText}>source geocode</Text>
      <TouchableOpacity style={styles.button} onPress={signUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <Text style={styles.redirectText}>
        Already have an account?{" "}
        <Text
          style={styles.redirectLink}
          onPress={() => navigation.navigate("Login")}
        >
          Login
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f4f4f8",
  },
  input: {
    width: "80%",
    height: 50,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#ffffff",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#6200ee",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  redirectText: {
    marginTop: 20,
  },
  redirectLink: {
    color: "#6200ee",
    textDecorationLine: "underline",
  },
  locationText: {
    fontSize: 16,
    marginVertical: 10,
  },
});

export default SignUpScreen;
