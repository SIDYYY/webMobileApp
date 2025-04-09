import { View, Text, KeyboardAvoidingView, ScrollView, TouchableOpacity, Platform, Image } from "react-native";
import React, { useState } from "react";
import { mostBoughtProducts } from "../../assets/datas/productDatas";

export default function ProfileScreen() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Accessories", "Food", "Health"];

  // Filter products based on selectedCategory
  const filteredProducts =
    selectedCategory === "All"
      ? mostBoughtProducts
      : mostBoughtProducts.filter((product) => product.category === selectedCategory);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-[#fff]"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View className="items-center mt-6">
          <Text className="text-3xl font-extrabold">Category</Text>

          {/* Navbar */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row">
              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  onPress={() => setSelectedCategory(category)}
                  className={`mt-5 mx-3 p-4 rounded-3xl w-32 ${
                    selectedCategory === category ? "bg-[#FF9500]" : "border-gray-400"
                  }`}
                >
                  <Text className="text-center">{category}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* Display Filtered Products */}
          <ScrollView>
            <View className="flex-row flex-wrap mt-10 justify-between">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <TouchableOpacity key={product.id} className="rounded-lg mr-4 m-3 bg-gray-200 shadow-black shadow-xl ">
                    <Image source={{ uri: product.image }} className="w-36 h-36" resizeMode="cover" />
                    <View className="bg-white w-full p-2 shadow-black  border-t">
                      <Text className="text-gray-900 font-medium mt-2">{product.name}</Text>
                      <Text className="text-gray-600">{product.price}</Text>
                    </View>
                  </TouchableOpacity>
                ))
              ) : (
                <Text className="text-gray-500 mt-5">No products available</Text>
              )}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
