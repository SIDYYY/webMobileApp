import { useLocalSearchParams } from "expo-router";
import { View, Text, ScrollView, Image, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import {mostBoughtProducts} from '../../assets/datas/productDatas';
import {newArrivals} from '../../assets/datas/productDatas';

export default function HomeScreen() {
  const { role } = useLocalSearchParams();

  return (
    <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1 bg-[#fff]"
        >
          <ScrollView 
            contentContainerStyle={{ flexGrow: 1 }} 
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={true}
          >
      <View className="items-center mt-6 bg-[#FF9500] flex-row justify-center p-5 mx-4 rounded-2xl">
        <View>
        <View className="w-[150px] mb-4"> 
          <Text className="text-center font-extrabold text-2xl">Locate Where we are </Text>
        </View>
        <View className="w-[140px]">
        <TouchableOpacity className="bg-white p-3 rounded-full">
          <Text className="text-center font-extrabold text-[17px]">Locate Us</Text>
        </TouchableOpacity>
        </View>
        </View>
        <View className=" justify-center items-center bg-[#FF9500] ">
          {/* Client Logo */}
          <Image
            source={require("../../assets/images/pet-removebg-preview-removebg-preview.png")}
            style={{ width: 150, height: 120 }}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Most Bought Products Section */}
      <View className="my-8 px-4">
      <View className="flex-row justify-between mx-4">
        <Text className="text-lg font-semibold text-gray-900 mb-3">
          Most Bought Products
        </Text>
        <Text> View All </Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {mostBoughtProducts.map((product) => (
            <TouchableOpacity
              key={product.id}
              className="border border-gray-300 rounded-lg p-3 mr-4 bg-white shadow-sm"
            >
              <Image
                source={{ uri: product.image }}
                className="w-36 h-36 rounded-lg"
                resizeMode="cover"
              />
              <Text className="text-gray-900 font-medium mt-2">{product.name}</Text>
              <Text className="text-gray-600">{product.price}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* New Arrivals Section */}
      <View className="mb-5 px-4">
        <View className="flex-row justify-between mx-4">
        <Text className="text-lg font-semibold text-gray-900 mb-3">
          New Arrivals
        </Text>
        <Text> View All </Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {newArrivals.map((product) => (
            <TouchableOpacity
              key={product.id}
              className="border border-gray-300 rounded-lg p-3 mr-4 bg-white shadow-sm"
            >
              <Image
                source={{ uri: product.image }}
                className="w-36 h-36 rounded-lg"
                resizeMode="cover"
              />
              <Text className="text-gray-900 font-medium mt-2">{product.name}</Text>
              <Text className="text-gray-600">{product.price}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}
