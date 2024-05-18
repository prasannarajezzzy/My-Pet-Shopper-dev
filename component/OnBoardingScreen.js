import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";

function OnboardingScreen({ navigation }) {
  return (
    <ScrollView
      horizontal={true}
      pagingEnabled={true}
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      <View style={styles.slide}>
        <Text style={styles.header}>Welcome to My Pet Shopper</Text>
        <Text style={styles.text}>
          Find the best products for your beloved pets at your fingertips.
        </Text>
      </View>
      <View style={styles.slide}>
        <Text style={styles.header}>Fast Delivery</Text>
        <Text style={styles.text}>
          Get your products delivered fast to your doorstep with our reliable
          service.
        </Text>
      </View>
      <View style={styles.slide}>
        <Text style={styles.header}>High Quality</Text>
        <Text style={styles.text}>
          All products are guaranteed to be of the highest quality to ensure
          your pet's happiness.
        </Text>
      </View>
      <View style={styles.slide}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f8",
  },
  slide: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#6200ee",
    padding: 15,
    borderRadius: 5,
    width: "70%",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default OnboardingScreen;
