import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProductCard from "./ProductCard"; // Make sure to create this component
const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        const response = await fetch(
          "https://my-pet-shopper-api.onrender.com/api/v1/products",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const json = await response.json();

        if (json.success) {
          setProducts(json.products);
        } else if (json.message === "jwt expired") {
          // Handle JWT expiration
          navigation.navigate("Login"); // Ensure "Login" is the correct route name for your login screen
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
        Alert.alert("Error", "Failed to load data from server.");
      }
    };

    fetchProducts();
  }, [navigation]);

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <ProductCard
          product={item}
          onPress={() => navigation.navigate("ProductView", { product: item })}
        />
      )}
      numColumns={2}
      columnWrapperStyle={styles.column}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#f4f4f8",
  },
  column: {
    justifyContent: "space-between",
  },
});

export default HomeScreen;
