import { useRouter } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";

export default function ManageScreen() {
  const router = useRouter();

  return (
      <SafeAreaView className="flex-1 bg-[#FF9500]">
        <ScrollView
          contentContainerStyle={{ paddingBottom: 32, paddingHorizontal: 20}}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text className="text-white text-3xl font-extrabold text-center my-6">
            Manage Products
          </Text>

          {/* Add Product */}
          <TouchableOpacity
            onPress={() => router.push("../screens/manageProduct/addProduct")}
            className="bg-white rounded-2xl px-5 py-6 mb-6 flex-row items-center justify-between"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <View>
              <Text className="text-lg font-bold text-orange-600">
                Add Product
              </Text>
              <Text className="text-gray-500 text-sm">
                Upload and save new products
              </Text>
            </View>
            <MaterialIcons name="add-box" size={36} color="#FF9500" />
          </TouchableOpacity>

          {/* Update Product */}
          <TouchableOpacity
            onPress={() => router.push("../screens/manageProduct/updateProduct")}
            className="bg-white rounded-2xl px-5 py-6 mb-6 flex-row items-center justify-between"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <View>
              <Text className="text-lg font-bold text-orange-600">
                Update Product
              </Text>
              <Text className="text-gray-500 text-sm">
                Edit or remove existing products
              </Text>
            </View>
            <MaterialIcons name="update" size={36} color="#FF9500" />
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
  );
}
