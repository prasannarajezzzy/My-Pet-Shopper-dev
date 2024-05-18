import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";

const ProfileScreen = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [image, setImage] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [isImagePicked, setIsImagePicked] = useState(false);
  const [place, setPlace] = useState("Fetching location...");
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    setIsImagePicked(image !== null);
  }, [image]);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData");
        if (userData !== null) {
          setUserInfo(JSON.parse(userData).user);
        }
      } catch (error) {
        console.error("Error retrieving user data:", error);
      }
    };

    getUserData();
  }, []);

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

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userData");
      await AsyncStorage.removeItem("userToken");
      Alert.alert("Success", "You have been logged out.");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setAvatarPreview(result.uri);
      setImage({
        uri: result.uri,
        name: "profile_picture.jpg", // Provide a unique name for the image
        type: "image/jpeg",
      });
      setIsImagePicked(true);
    }
  };

  return (
    <View style={styles.container}>
      {userInfo ? (
        <>
          <TouchableOpacity
            style={styles.imagePickerButton}
            onPress={pickImage}
          >
            <Text style={styles.imagePickerButtonText}>Take Image</Text>
          </TouchableOpacity>
          {isImagePicked && avatarPreview && (
            <Image
              source={{ uri: avatarPreview }}
              style={styles.imagePreview}
            />
          )}
          {!isImagePicked && (
            <Image
              source={{ uri: avatarPreview }}
              style={styles.imagePreview}
              resizeMode="contain"
            />
          )}
          <Text style={styles.infoText}>Name: {userInfo.name}</Text>
          <Text style={styles.infoText}>Email: {userInfo.email}</Text>
          <Text style={styles.infoText}>Location: {place}</Text>
          <Button
            title="Edit Profile"
            onPress={() => {
              navigation.navigate("EditProfile");
            }}
          />
          <Button title="Logout" onPress={handleLogout} />
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  infoText: {
    fontSize: 18,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f4f4f8",
  },
  imagePickerButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  imagePickerButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  imagePreview: {
    width: 200,
    height: 200,
    marginTop: 10,
  },
  button: {
    backgroundColor: "#6200ee",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ProfileScreen;
