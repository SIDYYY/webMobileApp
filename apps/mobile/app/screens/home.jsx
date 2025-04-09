import { useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, ActivityIndicator } from "react-native";

export default function HomeScreen() {
  const { role } = useLocalSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (role === "admin") {
      router.replace("/(admin)/admin");
    } else {
      router.replace("/(tabs)/dashboard");
    }
  }, [role]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#8E5E3C" />
      <Text>Redirecting...</Text>
    </View>
  );
}
