import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  collection,
  onSnapshot,
  getDocs,
  query,
  orderBy,
  where,
  Timestamp,
} from "firebase/firestore";
import { db } from "../config";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();
  const [role, setRole] = useState(null); // Role fetched from AsyncStorage
  const [mostBought, setMostBought] = useState([]);
  const [newArrivalsList, setNewArrivalsList] = useState([]);

  // Fetch user role from AsyncStorage
  useEffect(() => {
    const fetchRole = async () => {
      const storedRole = await AsyncStorage.getItem("userRole");
      console.log("Fetched Role from AsyncStorage:", storedRole);
      setRole(storedRole);
    };

    fetchRole();
  }, []);

  // Fetch the most bought products and new arrivals
  useEffect(() => {
    let unsubscribeOrders;
  
    const fetchNewArrivals = async () => {
      try {
        const oneWeekAgo = Timestamp.fromDate(
          new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        );
        const q = query(
          collection(db, "products"),
          where("createdAt", ">", oneWeekAgo)
        );
        const snapshot = await getDocs(q);
        const newProducts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNewArrivalsList(newProducts);
      } catch (error) {
        console.error("Error fetching new arrivals:", error);
      }
    };

    fetchNewArrivals();

    return () => {
      if (unsubscribeOrders) unsubscribeOrders();
    };
  }, [role]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-[#FF9500]"
    >
      <SafeAreaView>
        {/* Locate Us Section */}
        <View className="items-center mt-4 bg-white flex-row justify-center p-5 mx-4 rounded-2xl">
          <View>
            <View className="w-[150px] mb-4">
              <Text className="text-center font-bold text-2xl">
                Locate Where we are
              </Text>
            </View>
            <View className="w-[140px]">
              <TouchableOpacity className="bg-white p-3 rounded-full">
                <Text className="text-center font-extrabold text-[17px] bg-[#FF9500] text-white p-3 rounded-full">
                  Locate Us
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="justify-center items-center">
            <Image
              source={require("../../assets/images/pet-removebg-preview-removebg-preview.png")}
              style={{ width: 150, height: 120 }}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* New Arrivals Section */}
        <View className="mb-5 px-4 mt-10">
          <View className="flex-row justify-between mx-4">
            <Text className="text-2xl font-extrabold text-white mb-6">
              New Arrivals
            </Text>
            <Text className="text-lg font-semibold text-white mb-3">
              View All
            </Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {newArrivalsList.map((product) => (
              <TouchableOpacity
                 key={product.id}
                 onPress={() =>
                   router.push({
                    pathname: "/screens/productDetail",
                    params: {
                      id: product.id.toString(),
                      name: product.name,
                      image: product.image,
                      description: product.description,
                      price: product.price.toString(),
                      quantity: product.quantity.toString(),
                    },
                  })
                }
                className="border border-gray-300 rounded-lg p-3 mr-4 bg-white shadow-sm"
              >
                <Image
                  source={{
                    uri: product.image || "https://via.placeholder.com/150",
                  }}
                  className="w-36 h-36 rounded-lg"
                  resizeMode="cover"
                />
                <Text className="text-gray-900 font-medium mt-2">
                  {product.name}
                </Text>
                <Text className="text-gray-600">
                ₱ {(parseFloat(product.price) || 0).toFixed(2)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
