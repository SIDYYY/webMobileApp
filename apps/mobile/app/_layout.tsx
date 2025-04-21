import { Stack, Slot } from "expo-router";
import { CartProvider } from "./context/cartContext";
import Toast from "react-native-toast-message";
import '../global.css'



export default function RootLayout() {
  return (
  <CartProvider>
    <>
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="screens" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(admin)" options={{ headerShown: false }} />
      <Stack.Screen name="notfound" options={{ title: "Page Not Found" }} />
    </Stack>
    <Toast />
    </>

  </CartProvider>
  );
}