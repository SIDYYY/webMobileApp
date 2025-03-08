import { Tabs } from "expo-router";
import '../../global.css'

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="admin" options={{ title: "Dashboard" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
      <Tabs.Screen name="settings" options={{ title: "Settings" }} />    
    </Tabs>
  );
}
