import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const defaultUserIcon = "https://via.placeholder.com/200";

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    // Initialize with the default image
    setImage(defaultUserIcon);
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result, "res");

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const signUp = async () => {
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("name", name);
      formData.append("password", password);
      formData.append("image", {
        uri: image,
        name: "image.jpg",
        type: "image/jpg",
      });

      const response = await axios.post("YOUR_API_ENDPOINT", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Response:", response.data);
      // Handle successful signup response
    } catch (error) {
      console.error("Error signing up:", error);
      // Handle error
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
        <Image
          source={{ uri: image }}
          style={styles.previewImage}
          resizeMode="cover"
        />
      </TouchableOpacity>
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
      <Button
        title="Sign Up"
        onPress={signUp}
        disabled={!image || image === defaultUserIcon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: "hidden",
    marginBottom: 20,
  },
  previewImage: {
    width: 200, // Larger width for better preview
    height: 200, // Larger height for better preview
    borderRadius: 100, // Make the preview round
  },
  input: {
    width: "80%",
    height: 40,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default SignUpScreen;
