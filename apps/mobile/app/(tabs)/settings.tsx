import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Image,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { auth, db } from "../config";
import { doc, getDoc } from "firebase/firestore";
import { logout } from "../config";
import React from "react";

interface UserData {
  firstName: string;
  lastName: string;
}

export default function SettingsScreen() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data() as Partial<UserData>;
          setUserData({
            firstName: userData.firstName || "Unknown",
            lastName: userData.lastName || "User",
          });
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#FF9500]">
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  const MenuItem = ({
    icon,
    label,
  }: {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
  }) => (
    <TouchableOpacity className="flex-row items-center my-2">
      <Ionicons name={icon} size={24} color="#FF9500" style={{ marginRight: 10 }} />
      <Text className="text-lg text-gray-800">{label}</Text>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-[#FF9500]"
    >
      <SafeAreaView className="flex-1">
        <ScrollView
          contentContainerStyle={{ paddingBottom: 32 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Title */}
          <Text className="text-white text-4xl font-black text-center mt-4 mb-4">
            Account
          </Text>

          {/* User Card */}
          <View className="bg-white mx-5 rounded-3xl p-5 shadow-sm flex-row justify-around items-center">
            <Image
              source={require("../../assets/images/pet-removebg-preview-removebg-preview.png")}
              style={{ width: 90, height: 80 }}
              resizeMode="contain"
            />
            <View>
              <Text className="text-xl font-bold text-gray-800">
                {userData?.firstName} {userData?.lastName}
              </Text>
              <Text className="text-sm text-gray-500">Pet Lover</Text>
            </View>
          </View>

          {/* General Section */}
          <Text className="ml-8 mt-3 text-white text-xl font-bold">General</Text>
          <View className="bg-white mx-5 p-5 mt-2 rounded-3xl shadow-sm">
            <MenuItem icon="person-outline" label="Profile Details" />
            <MenuItem icon="location-outline" label="Addresses" />
            <MenuItem icon="lock-closed-outline" label="Security" />
            <MenuItem icon="notifications-outline" label="Notification" />
          </View>

          {/* About Section */}
          <Text className="ml-8 mt-6 text-white text-lg font-semibold">Support</Text>
          <View className="bg-white mx-5 p-5 mt-2 rounded-3xl shadow-md">
            <MenuItem icon="information-circle-outline" label="About Us" />
            <MenuItem icon="help-circle-outline" label="FAQ" />
          </View>

          {/* Danger Zone */}
          <Text className="ml-8 mt-6 text-white text-lg font-semibold">Danger Zone</Text>
          <View className="bg-white mx-5 p-5 mt-2 rounded-3xl shadow-md">
            <MenuItem icon="trash-outline" label="Delete Account" />
          </View>

          {/* Logout Button */}
          <TouchableOpacity
            className="bg-red-700 p-3 mx-5 mt-6 rounded-3xl flex items-center justify-center shadow-lg"
            onPress={() => logout(router)}
          >
            <Text className="text-white text-lg font-semibold">Log out</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
