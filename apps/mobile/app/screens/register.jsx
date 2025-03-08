import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";

export default function RegisterScreen() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const genders = ["Male", "Female"];  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-[#FF9500]"
    >
      {/* Fixed Logo Section */}
      

      {/* Scrollable Form Section */}
      <ScrollView
        contentContainerStyle={{ flexGrow: 1}}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-auto justify-center items-center">
        <FontAwesome5 name="paw" size={80} color="#8E5E3C" />
        </View>
        <View className="flex-1 justify-center items-center bg-[#FF9500] px-6 py-8 rounded-t-[50px]">
          {/* Register Title with Paw Icon */}
          
          <View className="flex-row justify-center items-center mb-6">
            <Text className="text-5xl text-center text-[#fff] font-bold">
              Register
            </Text>
          </View>

          {/* Form Inputs */}
          <TextInput
            className="w-full h-12 border border-gray-400 px-4 rounded-lg mb-4"
            placeholder="First Name"
            placeholderTextColor="#fff"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            className="w-full h-12 border border-gray-400 px-4 rounded-lg mb-4"
            placeholder="Last Name"
            placeholderTextColor="#ffff"
            value={lastName}
            onChangeText={setLastName}
          />
          <View className="w-full mb-4">
            <TouchableOpacity
              className="w-full h-12 border border-gray-400 px-4 rounded-lg justify-center bg-white"
              onPress={() => setIsOpen(!isOpen)}
            >
              <Text className="text-gray-700">{gender || "Select Gender"}</Text>
            </TouchableOpacity>

            {isOpen && (
              <View className="border border-gray-400 rounded-lg mt-2 bg-white">
                {genders.map((item) => (
                  <TouchableOpacity
                    key={item}
                    className="p-3 border-b border-gray-300"
                    onPress={() => {
                      setGender(item);
                      setIsOpen(false);
                    }}
                  >
                    <Text className="text-gray-700">{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
          <TextInput
            className="w-full h-12 border border-gray-400 px-4 rounded-lg mb-4"
            placeholder="Email"
            placeholderTextColor="#ffff"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            className="w-full h-12 border border-gray-400 px-4 rounded-lg mb-4"
            placeholder="Password"
            placeholderTextColor="#ffff"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TextInput
            className="w-full h-12 border border-gray-400 px-4 rounded-lg mb-4"
            placeholder="Confirm Password"
            placeholderTextColor="#ffff"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          {/* Register Button */}
          <TouchableOpacity
            className="bg-[#8E5E3C] w-full h-12 rounded-lg flex items-center justify-center"
            onPress={() => router.replace("/screens/home")}
          >
            <Text className="text-white text-lg font-semibold">Register</Text>
          </TouchableOpacity>

          {/* Already have an account? Login */}
          <TouchableOpacity className="my-6" onPress={() => router.replace("/screens/login")}>
            <Text className="text-white text-sm">
              Already have an account? <Text className="text-[#fff] font-extrabold underline">Login</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
