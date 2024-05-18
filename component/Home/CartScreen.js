import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const getCartItems = async () => {
      try {
        const cart = await AsyncStorage.getItem("cart");
        if (cart) {
          setCartItems(JSON.parse(cart));
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    getCartItems();
  }, []);

  const handleOrder = () => {
    // Implement order handling logic here
    alert("Order placed!");
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.images[0].url }} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text>Name: {item.name}</Text>
        <Text>Price: ${item.price}</Text>
        {/* Add more item details as needed */}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <Button title="Place Order" onPress={handleOrder} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  itemInfo: {
    flex: 1,
  },
});

export default CartScreen;
