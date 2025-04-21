import { useLocalSearchParams } from "expo-router";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { role } = useLocalSearchParams();

  return (
    <SafeAreaView>
    <ScrollView>
    <View className="bg-white m-5 p-5 rounded-2xl shadow-md">
        <Text className="text-gray-700 text-base font-bold text-center leading-relaxed">
        Hello, Admin
      </Text>
    </View>
    </ScrollView>
    </SafeAreaView>
  );
}
