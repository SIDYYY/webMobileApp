import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { View, Text, Image, ActivityIndicator, Animated } from "react-native";

export default function Index() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const fadeAnim = new Animated.Value(0); 

  useEffect(() => {
    // Start fade-in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Navigate after 1.5 (1500) seconds
    const timer = setTimeout(() => {
      setIsReady(true);
      router.replace("/screens/splash"); // Change/Balhin to "/screens/login" 
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!isReady) {
    return (
      <View className="flex-1 justify-center items-center bg-[#FF9500]">
        <Animated.Image
          source={require("../assets/images/pet-removebg-preview-removebg-preview.png")}
          style={{ width: 150, height: 150, opacity: fadeAnim }}
          resizeMode="contain"
        />
        <ActivityIndicator size="large" color="#fff" className="mt-12" />
      </View>
    );
  }

  return null;
}
