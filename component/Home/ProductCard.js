// ProductCard.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

const ProductCard = ({ product, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: product.images[0].url }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {product.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 5,
    width: "48%", // Adjust the width to fit two cards per row with space in between
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 150, // Fixed height for uniformity
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  infoContainer: {
    padding: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    fontSize: 14,
    color: "#6200ee",
    marginBottom: 5,
  },
  description: {
    fontSize: 12,
    color: "#333",
  },
});

export default ProductCard;
