import React from "react";
import { View, Text, StyleSheet, Button, FlatList } from "react-native";

const ShoppingCartScreen = () => {
  // Dummy data for cart items
  const cartItems = [
    { id: "1", name: "Dog Food", quantity: 2, price: 20 },
    { id: "2", name: "Cat Toy", quantity: 1, price: 10 },
    // Add more items here
  ];

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text>
        {item.name} - ${item.price}
      </Text>
      <Text>Quantity: {item.quantity}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListFooterComponent={
          <Button
            title="Proceed to Checkout"
            onPress={() => {
              /* Add checkout navigation */
            }}
          />
        }
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
  itemContainer: {
    padding: 10,
    marginVertical: 8,
    backgroundColor: "white",
    borderRadius: 5,
  },
});

export default ShoppingCartScreen;
