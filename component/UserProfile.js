import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const UserProfileScreen = () => {
  // Dummy user data
  const userInfo = {
    name: "John Doe",
    email: "johndoe@example.com",
  };

  return (
    <View style={styles.container}>
      <Text style={styles.infoText}>Name: {userInfo.name}</Text>
      <Text style={styles.infoText}>Email: {userInfo.email}</Text>
      <Button
        title="Edit Profile"
        onPress={() => {
          /* Add edit profile navigation */
        }}
      />
      <Button
        title="Logout"
        onPress={() => {
          /* Add logout functionality */
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f4f8",
  },
  infoText: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default UserProfileScreen;
