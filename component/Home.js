import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import ProductCard from "./ProductCard"; // Make sure to create this component

const HomeScreen = () => {
  // Static product data, replace with your actual API fetch if needed
  const [products, setProducts] = useState([
    {
      _id: "1",
      name: "Best Dog Food",
      description: "Latest model with advanced features",
      price: 10,
      ratings: 0,
      images: [
        {
          public_id: "ByteProducts/ql23ouxprps3ygmzhdun",
          url: "https://image.chewy.com/is/image/catalog/86251_MAIN._AC_SL600_V1649133132_.jpg",
          _id: "6629f20f8a9ac8d92e1ae187",
        },
      ],
    },
    {
      _id: "2",
      name: "Dog food Pedigree",
      description: "Latest model with advanced features",
      price: 12,
      ratings: 0,
      images: [
        {
          public_id: "ByteProducts/ql23ouxprps3ygmzhdun",
          url: "https://image.chewy.com/is/image/catalog/86251_MAIN._AC_SL600_V1649133132_.jpg",
          _id: "6629f20f8a9ac8d92e1ae187",
        },
      ],
    },
    {
      _id: "3",
      name: "Cat Food",
      description: "Latest model with advanced features",
      price: 50,
      ratings: 0,
      images: [
        {
          public_id: "ByteProducts/ql23ouxprps3ygmzhdun",
          url: "https://image.chewy.com/is/image/catalog/86251_MAIN._AC_SL600_V1649133132_.jpg",
          _id: "6629f20f8a9ac8d92e1ae187",
        },
      ],
    },
    {
      _id: "4",
      name: "Cat toy",
      description: "Latest model with advanced features",
      price: 55,
      ratings: 0,
      images: [
        {
          public_id: "ByteProducts/ql23ouxprps3ygmzhdun",
          url: "https://image.chewy.com/is/image/catalog/86251_MAIN._AC_SL600_V1649133132_.jpg",
          _id: "6629f20f8a9ac8d92e1ae187",
        },
      ],
    },
    // Add more products here as needed
  ]);

  const updateProductDetails = async (products) => {
    console.log("Login credentials", email, password);
    try {
      const response = await fetch("", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();
      if (json.products) {
        products = json.products;
        let startingPrice = 50;

        products.forEach((product, index) => {
          product.name = index % 2 === 0 ? "Dog Food" : "Cat Food";

          product.price = startingPrice;
          product.images[0].url =
            "https://image.chewy.com/is/image/catalog/86251_MAIN._AC_SL600_V1649133132_.jpg";

          startingPrice += 10;
        });

        return products;
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => <ProductCard product={item} />}
      numColumns={2} // Set the number of columns for the grid
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
