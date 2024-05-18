import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  Button,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([]);
  const [place, setPlace] = useState("Fetching location...");
  const [errorMsg, setErrorMsg] = useState(null);
  const [totalCost, setTotalCost] = useState(0);
  const [deliveryEstimate, setDeliveryEstimate] = useState("");

  useEffect(() => {
    const getCartItems = async () => {
      try {
        const cart = await AsyncStorage.getItem("cart");
        if (cart) {
          const parsedCart = JSON.parse(cart);
          setCartItems(parsedCart);
          calculateTotalCost(parsedCart);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    getCartItems();
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

        if (city.toLowerCase() === "chico") {
          setDeliveryEstimate("1 day");
        } else {
          setDeliveryEstimate("3 days");
        }
      } catch (error) {
        console.error("Failed to fetch location", error);
        setPlace("Failed to fetch location");
      }
    })();
  }, []);

  const calculateTotalCost = (items) => {
    let total = 0;
    items.forEach((item) => {
      total += item.price;
    });
    setTotalCost(total);
  };

  const handleOrder = () => {
    Alert.alert("Order placed!", `Estimated delivery: ${deliveryEstimate}`);
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.images[0].url }} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text>Name: {item.name}</Text>
        <Text>Price: ${item.price}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.locationText}>Current Location: {place}</Text>
      <Text style={styles.deliveryText}>
        Estimated Delivery: {deliveryEstimate}
      </Text>
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <Text style={styles.totalText}>Total Cost: ${totalCost.toFixed(2)}</Text>
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
  locationText: {
    fontSize: 16,
    marginVertical: 10,
  },
  deliveryText: {
    fontSize: 16,
    marginBottom: 10,
  },
  totalText: {
    fontSize: 18,
    marginVertical: 20,
  },
});

export default CartScreen;
