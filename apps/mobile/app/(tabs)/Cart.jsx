// app/(user)/cart.js
import { View, Text, ScrollView, TouchableOpacity, Image, KeyboardAvoidingView, Platform, SafeAreaView } from "react-native";
import { useCart } from "../context/cartContext";
import { db } from "../config";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import Icon from 'react-native-vector-icons/Ionicons';


export default function CartScreen() {
  const { cartItems, removeFromCart, clearCart, updateQuantity,checkout } = useCart();
  console.log("Cart Items:", cartItems);


  const total = cartItems.reduce((sum, item) => {
    const qty = item.quantity || 1; // default to 1 just in case
    return sum + item.price * qty;
  }, 0);


  return (
    <KeyboardAvoidingView
  behavior={Platform.OS === "ios" ? "padding" : "height"}
  className="flex-1 bg-[#FF9500]"
>
  <SafeAreaView>
  <ScrollView
    contentContainerStyle={{ flexGrow: 1, paddingBottom: 120 }}
    keyboardShouldPersistTaps="handled"
    showsVerticalScrollIndicator={false}
  >
    <View className=" px-6 ">
    <View className="flex-row items-center justify-between px-4 mb-6 mt-4">
      <Text className="text-3xl font-black text-white">Your Cart</Text>

      <TouchableOpacity
        onPress={clearCart} 
        className="bg-white px-4 py-2 rounded-full shadow-sm"
        activeOpacity={0.8}
      >
        <Text className="text-[#FF9500] font-bold text-base">Clear Cart</Text>
      </TouchableOpacity>
    </View>


    {cartItems.length === 0 ? (
      <View className="items-center justify-center mt-20">
        <Image
          source={{ uri: "https://cdn-icons-png.flaticon.com/512/2038/2038854.png" }}
          style={{ width: 120, height: 120, marginBottom: 10 }}
        />
        <Text className="text-xl text-white font-bold">Nothing's here yet</Text>
        <Text className="text-base text-white mt-1">Add some items to your cart</Text>
      </View>
    ) : (
      cartItems.map((item) => (
        <View
          key={item.id}
          className="flex-row items-center justify-between mb-4 p-4 bg-white rounded-2xl shadow-md"
        >
          <Image
            source={{ uri: item.image }}
            className="w-24 h-24 rounded-xl object-cover"
          />

          <View className="flex-1 ml-4">
            <Text className="font-bold text-lg">{item.name}</Text>
            <Text className="text-gray-600 mb-2">₱ {item.price}</Text>

            <View className="flex-row items-center space-x-3 my-3">
              <TouchableOpacity
                onPress={() => updateQuantity(item.id, -1)}
                className="bg-[#FF9500] w-8 h-8 rounded-full items-center justify-center"
              >
                <Text className="text-white text-xl font-bold">−</Text>
              </TouchableOpacity>

              <Text className="text-lg font-bold mx-4">{item.quantity}</Text>

              <TouchableOpacity
                onPress={() => updateQuantity(item.id, 1)}
                className="bg-[#FF9500] w-8 h-8 rounded-full items-center justify-center"
              >
                <Text className="text-white text-xl font-bold">+</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity 
          className="absolute top-0 right-0"
          onPress={() => removeFromCart(item.id)}>
          <Text className="bg-[#ff0000] p-2 rounded-bl-lg rounded-tr-lg text-white font-medium">
            <Icon name="bag-remove" size={20} color="#fff" />
          </Text>
        </TouchableOpacity>
        </View>
      )))}
    </View>
  </ScrollView>
  </SafeAreaView>


  {/* Total + Checkout (Sticky Bottom) */}
  {cartItems.length > 0 && (
  <View className="absolute bottom-0 w-full px-6 py-4 bg-white border-t border-gray-200">
    <View className="flex-row justify-between mb-4">
      <Text className="text-lg font-semibold">Total </Text>
      <Text className="text-lg font-bold">₱ {total}.00</Text>
    </View>

    <TouchableOpacity
      onPress={checkout}
      className="bg-[#FF9500] rounded-xl py-3"
    >
      <Text className="text-white text-center font-semibold text-lg">
        Checkout
      </Text>
    </TouchableOpacity>
  </View>
  )}
</KeyboardAvoidingView>

  );
}
