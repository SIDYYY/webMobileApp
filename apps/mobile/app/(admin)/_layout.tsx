import { Tabs } from "expo-router";
import '../../global.css'
import { Ionicons } from "@expo/vector-icons";


export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="admin" options={{ title: "Dashboard", 
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="home-outline" size={size} color={color} />
        ),
      }} />
      <Tabs.Screen name="profile" options={{ title: "Profile",
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
