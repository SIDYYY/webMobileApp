import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";


export default function SettingsScreen() {
  const router = useRouter();
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-xl font-bold">Settings Page</Text>

    <TouchableOpacity
                className="bg-red-800 w-full h-12 rounded-lg flex items-center justify-center"
                onPress={() => router.replace("/screens/splash")}
              >
                <Text className="text-white text-lg font-semibold">LOGOUT</Text>
              </TouchableOpacity>  
    </View>

    
  );
}
