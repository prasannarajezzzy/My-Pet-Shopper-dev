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

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(
    "https://via.placeholder.com/200" // Default image URL
  );
  const [isImagePicked, setIsImagePicked] = useState(false);

  useEffect(() => {
    setIsImagePicked(image !== "https://via.placeholder.com/200");
  }, [image]);

  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      console.log("test test");
      setImage(
        "https://static.wixstatic.com/media/fd287c_33656db543a349c980497631344f7bf9~mv2.png/v1/crop/x_932,y_0,w_1068,h_979/fill/w_853,h_979,fp_0.50_0.50,q_90,enc_auto/home_background7.png"
      );
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
      <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
        <Text style={styles.imagePickerButtonText}>Take Image</Text>
      </TouchableOpacity>
      {!isImagePicked && (
        <Image
          source={{ uri: image }}
          style={styles.imagePreview}
          resizeMode="contain"
        />
      )}
      {isImagePicked && (
        <Image source={{ uri: image }} style={styles.imagePreview} />
      )}
      <Button title="Sign Up" onPress={signUp} disabled={!isImagePicked} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "80%",
    height: 40,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
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
});

export default SignUpScreen;
