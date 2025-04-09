import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { app } from "../config"; // Make sure you have configured Firebase

export default function RegisterScreen() {
  const router = useRouter();
  const auth = getAuth(app);
  const db = getFirestore(app);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const genders = ["Male", "Female"];
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user"); // Default role is "user"

  // Function to handle registration
  const handleRegister = async () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword || !gender) {
      Alert.alert("Error", "Please fill out all fields.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store user details in Firestore
      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        email,
        gender,
        role, // Store user role in Firestore
        createdAt: new Date(),
      });

      Alert.alert("Success", "Registration successful!");

      // Navigate based on role
      if (role === "admin") {
        router.replace("/(admin)/admin");
      } else {
        router.replace("/(tabs)/dashboard");
      }
    } catch (error) {
      Alert.alert("Registration Error", error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-[#FF9500]"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View className="flex-auto justify-center items-center">
          <FontAwesome5 name="paw" size={80} color="#8E5E3C" />
        </View>
        <View className="flex-1 justify-center items-center bg-[#FF9500] px-6 py-8 rounded-t-[50px]">
          <View className="flex-row justify-center items-center mb-6">
            <Text className="text-5xl text-center text-[#fff] font-bold">Register</Text>
          </View>

          {/* Form Inputs */}
          <TextInput
            className="w-full h-12 border border-gray-400 px-4 rounded-lg mb-4 bg-white"
            placeholder="First Name"
            placeholderTextColor="#000"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            className="w-full h-12 border border-gray-400 px-4 rounded-lg mb-4 bg-white"
            placeholder="Last Name"
            placeholderTextColor="#000"
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
            className="w-full h-12 border border-gray-400 px-4 rounded-lg mb-4 bg-white"
            placeholder="Email"
            placeholderTextColor="#000"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            className="w-full h-12 border border-gray-400 px-4 rounded-lg mb-4 bg-white"
            placeholder="Password"
            placeholderTextColor="#000"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TextInput
            className="w-full h-12 border border-gray-400 px-4 rounded-lg mb-4 bg-white"
            placeholder="Confirm Password"
            placeholderTextColor="#000"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
                    
          {/* Register Button */}
          <TouchableOpacity
            className="bg-[#8E5E3C] w-full h-12 rounded-lg flex items-center justify-center"
            onPress={handleRegister}
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
