import { View, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform, Image, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; 
import { auth, db } from "../config"; // Firebase setup
import { doc, getDoc } from "firebase/firestore";
import { logout } from "../config"; // Import logout from config
import React from "react";

interface UserData {
  firstName: string;
  lastName: string;
}

export default function SettingsScreen() {
  const router = useRouter(); // Initialize the router here
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data() as Partial<UserData>; // ✅ Type assertion
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
    return <ActivityIndicator size="large" color="#8E5E3C" />;
  }

    // Reusable Menu Item Component
  const MenuItem = ({ icon, label }: { icon: keyof typeof Ionicons.glyphMap; label: string }) => (
    <TouchableOpacity className="flex-row items-center my-2">
      <Ionicons name={icon} size={24} color="black" style={{ marginRight: 10 }} />
      <Text className="text-xl font-regular">{label}</Text>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-[#fff]"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <Text className="ml-10 mt-5 text-3xl font-semibold text-center mb-4">Account</Text>

        {/* User Info */}
        <View className="bg-[#FF9500] mx-5 rounded-3xl p-3">
          <View className="flex-row justify-around text-center items-center">
            <Image
              source={require("../../assets/images/pet-removebg-preview-removebg-preview.png")}
              style={{ width: 90, height: 80 }}
              resizeMode="contain"
            />
            {userData ? (
              <View>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  {userData.firstName} {userData.lastName}
                </Text>
              </View>
            ) : (
              <View>
                <Text>Username</Text>
              </View>
            )}
          </View>
        </View>

        {/* General Settings */}
        <View>
          <Text className="ml-10 mt-5 text-lg font-semibold">General</Text>
          <View className="bg-[#FF9500] mx-5 p-5 mt-3 rounded-3xl">
            <MenuItem icon="person-outline" label="Profile Details" />
            <MenuItem icon="location-outline" label="Addresses" />
            <MenuItem icon="lock-closed-outline" label="Security" />
            <MenuItem icon="notifications-outline" label="Notification" />
          </View>
        </View>

        {/* About Section */}
        <View className="bg-[#FF9500] mx-5 p-5 mt-3 rounded-3xl">
          <MenuItem icon="information-circle-outline" label="About Us" />
          <MenuItem icon="help-circle-outline" label="FAQ" />
        </View>

        {/* Delete Account */}
        <View className="bg-[#FF9500] mx-5 p-5 mt-3 rounded-3xl">
          <MenuItem icon="trash-outline" label="Delete Account" />
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          className="bg-red-700 p-2 mx-5 rounded-3xl flex items-center justify-center mt-5 mb-6"
          onPress={() => logout(router)} // Pass router here
        >
          <Text className="text-white text-lg font-semibold">Log out</Text>
        </TouchableOpacity>  
      </ScrollView>
    </KeyboardAvoidingView>
  );
}


