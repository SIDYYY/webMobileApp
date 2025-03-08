import { Stack } from "expo-router";
import '../../global.css'


export default function ScreenLayout() {
  return (
    <Stack>
      <Stack.Screen name="splash" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{  headerShown: false  }} />
      <Stack.Screen name="register" options={{  headerShown: false  }} />
      <Stack.Screen name="home" options={{  headerShown: false }} />
    </Stack>
  );
}
