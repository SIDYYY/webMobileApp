import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, KeyboardAvoidingView, ScrollView, Platform, Image } from "react-native";
import { auth, db,signInWithEmailAndPassword } from "../config"; // Firebase config
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, getDoc } from "firebase/firestore";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const storedRole = await AsyncStorage.getItem("userRole");
        router.replace({ pathname: "/screens/home", params: { role: storedRole } });
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch role from Firestore (Optional, depending on your app)
      const userDoc = await getDoc(doc(db, "users", user.uid)); // db from Firebase config
      const role = userDoc.exists() ? userDoc.data().role : "user"; // Default to "user" if no role found

      // Store the role in AsyncStorage
      await AsyncStorage.setItem("userRole", role);

      router.replace({ pathname: "/screens/home", params: { role } });

    } catch (error) {
      Alert.alert("Login Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1 bg-[#FF9500]">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View className="flex-1 justify-center items-center bg-[#FF9500]">
          <Image
            source={require("../../assets/images/pet-removebg-preview-removebg-preview.png")}
            style={{ width: 200, height: 200 }}
            resizeMode="contain"
          />
        </View>

        <View className="flex-1 justify-center text-center bg-white px-6 rounded-t-[50px]">
          <View className="flex-row justify-center items-center mb-6">
            <Text className="text-5xl text-center text-[#353232] font-bold mr-2">Login</Text>
            <FontAwesome5 name="paw" size={40} color="#8E5E3C" />
          </View>

          <TextInput
            className="w-full h-12 border border-gray-400 px-4 rounded-lg mb-4"
            placeholder="Email"
            placeholderTextColor="#1B1818"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            className="w-full h-12 border border-gray-400 px-4 rounded-lg"
            placeholder="Password"
            placeholderTextColor="#1B1818"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity className="mt-4 mb-6 self-end" onPress={() => router.replace("/screens/forgotpassword")}>
            <Text className="text-[#8E5E3C] text-sm">Forgot Password?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity
            className="bg-[#8E5E3C] w-full h-12 rounded-lg flex items-center justify-center"
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? <ActivityIndicator color="white" /> : <Text className="text-white text-lg font-semibold">Login</Text>}
          </TouchableOpacity>

          <TouchableOpacity className="mt-4 self-center" onPress={() => router.replace("/screens/register")}>
            <Text className="text-gray-400 text-sm">
              Don't have an account? <Text className="text-[#8E5E3C]">Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
