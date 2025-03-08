import { View, Text, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { MotiView } from "moti";

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white items-center justify-center p-5">
      {/* Falling Animation */}
      <MotiView
        from={{ opacity: 0, translateY: -20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 1000 }}
      >
        <Image
          source={require("../assets/images/pet-removebg-preview-removebg-preview.png")} // Replace with actual path
          className="w-32 h-32 mb-5"
          resizeMode="contain"
        />
      </MotiView>

      {/* 404 Message */}
      <Text className="text-3xl font-bold text-gray-800 mb-2">Oops!</Text>
      <Text className="text-lg text-gray-600 text-center">
        The page you're looking for doesn't exist.
      </Text>

      {/* Back to Home Button */}
      <TouchableOpacity
        onPress={() => router.replace("/")}
        className="mt-5 bg-[#8E5E3C] px-5 py-2 rounded-lg"
      >
        <Text className="text-white text-lg font-medium">Go Back Home</Text>
      </TouchableOpacity>
    </View>
  );
}
