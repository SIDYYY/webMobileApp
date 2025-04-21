import React, { useEffect } from "react";
import { View, Text, Image, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { checkUserSession } from "./config"; // Import the checkUserSession function

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    // Call the checkUserSession function to handle routing based on authentication state
    checkUserSession(router);
  }, [router]);

  return (
    <View className="flex-1 bg-[#FF9500] justify-center items-center">
      <Image
        source={require("../assets/images/pet-removebg-preview-removebg-preview.png")}
        style={{ width: 150, height: 150 }}
        resizeMode="contain"
      />
      <Text className="text-white text-lg font-semibold mt-4">Loading...</Text>
      <ActivityIndicator size="large" color="white" className="mt-2" />
    </View>
  );
}