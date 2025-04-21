import { Tabs } from "expo-router";
import '../../global.css'
import { Ionicons } from "@expo/vector-icons";


export default function TabLayout() {
  return (
    <Tabs
    screenOptions={{
      tabBarActiveTintColor: "#FF9500", // active tab icon/text
      tabBarInactiveTintColor: "#8E8E93", // iOS-like subtle gray
      tabBarStyle: {
        backgroundColor: "#fff", // clean white background
        height: 70,
        paddingBottom: 8,
        paddingRight: 20,
        paddingLeft: 20,
      },
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: "600",
      },
      headerShown: false,
    }}>
      <Tabs.Screen name="admin" options={{ title: "Dashboard", 
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="home-outline" size={size} color={color} />
        ),
      }} />
      <Tabs.Screen name="manage" options={{ title: "Manage",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="cart-outline" size={size} color={color} />
        ),
       }} />
      <Tabs.Screen name="settings" options={{ title: "Settings",
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="settings-outline" size={size} color={color} />
      ),
       }} />    
    </Tabs>
  );
}
