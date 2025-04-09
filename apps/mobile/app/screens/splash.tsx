import { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function SplashScreen() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  return (
    <View className="flex-1 bg-[#FF9500]">

    {/* Top */}
    <View className="flex-1 justify-center items-center bg-white rounded-b-[180px]">
        {/* Client Logo */}
      <Image
        source={require("../../assets/images/pet-removebg-preview-removebg-preview.png")}
        style={{ width: 200, height: 200 }}
        resizeMode="contain"
      />
    </View>

    {/* Bottom with Button */}
    <View className="flex-1 justify-center items-center bg-[#FF9500]">

      {/* Welcome Text */}
      <Text className="text-[#fff] text-5xl font-bold text-center leading-tight">
        Have a life with your pet!
      </Text>

      {/* Get Started Button */}
      <View className="w-1/2">
        <TouchableOpacity
            className="mt-10 bg-[#FFDBC6] rounded-full flex items-center justify-center h-14"
            onPress={() => router.replace("/screens/register")}
        >
            <Text className="text-black text-lg font-semibold">Create Account</Text>
        </TouchableOpacity>

        <TouchableOpacity
            className="mt-4 bg-transparent border-[#FFC49A]  border-2 rounded-full flex items-center justify-center h-14"
            onPress={() => router.replace("/screens/login")}
        >
            <Text className="text-black text-lg font-semibold">Sign In</Text>
        </TouchableOpacity>
    </View>
    </View>
    </View>
  );
}
