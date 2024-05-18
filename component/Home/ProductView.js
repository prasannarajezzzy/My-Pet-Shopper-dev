import React, { useState } from "react";
import { View, Text, Button, Image, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProductView = ({ route, navigation }) => {
  const { product } = route.params;
  const [quantity, setQuantity] = useState(1);

  const addToCart = async () => {
    try {
      // await AsyncStorage.setItem("cart", "[]");
      let existingCart = await AsyncStorage.getItem("cart");

      if (!existingCart) {
        existingCart = "[]"; // Initialize cart as empty array if it's undefined
      }

      const cart = JSON.parse(existingCart);
      // Add multiple instances of the product based on quantity
      for (let i = 0; i < quantity; i++) {
        cart.push(product);
      }
      await AsyncStorage.setItem("cart", JSON.stringify(cart));
      alert("Product added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const goToCart = () => {
    navigation.navigate("Cart");
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.images[0].url }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.price}>Price: ${product.price}</Text>
        <View style={styles.quantityContainer}>
          <Text>Quantity: </Text>
          <Button title="-" onPress={decrementQuantity} />
          <Text>{quantity}</Text>
          <Button title="+" onPress={incrementQuantity} />
        </View>
        <Button title="Add to Cart" onPress={addToCart} />
        <Button title="Go to Cart" onPress={goToCart} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  infoContainer: {
    alignItems: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    marginBottom: 10,
  },
  price: {
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
});

export default ProductView;
