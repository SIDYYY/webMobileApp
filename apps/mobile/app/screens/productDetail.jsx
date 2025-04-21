import { View, Text, Image, ScrollView, TouchableOpacity,SafeAreaView } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { useCart } from "../context/cartContext";

export default function ProductDetailsScreen() {
  const params = useLocalSearchParams();
  const { addToCart } = useCart();

  const id = params.id || null;
  const name = params.name || "Unknown";
  const image = params.image || "";
  const description = params.description || "No description";
  const price = params.price ? Number(params.price) : 0;
  const quantity = params.quantity || 0;

  const handleAddToCart = () => {
    if (!id) {
      console.warn("Invalid product ID");
      return;
    }
  
    addToCart({ id, name, image, price, quantity });
  };
  

  return (
    <ScrollView className="flex-1 bg-[#FF9500] px-5">
      <View className="bg-white rounded-2xl shadow-md overflow-hidden flex mt-10 ">
        <View className="aspect-square border-b-2 border-[#FF9500]">
          <Image
            source={{ uri: image }}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>

        <View className="p-5">
          <Text className="text-2xl font-bold text-gray-900 mb-2">{name}</Text>
          <Text className="text-gray-600 text-base mb-4">{description}</Text>

          <View className="pt-4">
            <View className="mb-4">
              <Text className="text-xl font-bold text-gray-800 mb-1.5">Price</Text>
              <Text className="text-gray-700 text-xl font-extrabold">₱ {price}.00</Text>
            </View>

            <View>
              <Text className="text-xl font-bold text-gray-800 mb-1.5">In Stock</Text>
              <Text className="text-gray-700 text-xl font-extrabold">{quantity}</Text>
            </View>
          </View>
        </View>

        <View className="px-5 pb-5">
          <TouchableOpacity
            onPress={handleAddToCart}
            className="bg-[#FF9500] rounded-xl py-6 mt-3"
          >
            <Text className="text-white text-center font-semibold">Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
