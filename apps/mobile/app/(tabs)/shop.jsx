import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Platform,
  Image,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../config"; // adjust path to your Firebase config

export default function ProfileScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [loading, setLoading] = useState(true);

  // Real-time Firestore listener for products
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "products"), (querySnapshot) => {
      const fetchedProducts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(fetchedProducts);

      // Extract unique categories
      const categorySet = new Set();
      fetchedProducts.forEach((product) => {
        if (product.category) {
          categorySet.add(product.category);
        }
      });
      setCategories(["All", ...Array.from(categorySet)]);
      setLoading(false);
    });

    // Cleanup listener when component unmounts
    return () => unsubscribe();
  }, []);

  // Filter by selected category
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-[#FF9500]"
    >
      <SafeAreaView>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="items-center mt-4">
            <Text className="text-3xl font-black text-white mb-3">
              Category
            </Text>

            {/* Category Navbar */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-5">
              <View className="flex-row px-4 space-x-3">
                {categories.map((category) => {
                  const isSelected = selectedCategory === category;
                  return (
                    <TouchableOpacity
                      key={category}
                      onPress={() => setSelectedCategory(category)}
                      className={`mt-5 mx-3 p-4 rounded-3xl w-32 border-2 ${
                        isSelected
                          ? "bg-[#FF9500] border-[#fff]"
                          : "bg-white border-[#FF9500]"
                      }`}
                    >
                      <Text
                        className={`text-center text-sm font-semibold ${
                          isSelected ? "text-white" : "text-[#FF9500]"
                        }`}
                      >
                        {category}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>

            {/* Display Products */}
            <View className="flex-row flex-wrap justify-between px-4 pt-6 pb-12 gap-y-5 gap-x-5">
              {loading ? (
                <View className="flex-1 justify-center items-center mt-20">
                  <ActivityIndicator size="large" color="#FF9500" />
                </View>
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
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
                    className="w-[47%] bg-white rounded-2xl overflow-hidden shadow-md"
                  >
                    <View className="aspect-square">
                      <Image
                        source={{ uri: product.image }}
                        className="w-full h-full p-3 border-b-[#FF9500] border border-x-0 border-t-0"
                        resizeMode="cover"
                      />
                    </View>
                    <View className="p-3 w-full h-100">
                      <Text
                        className="font-extrabold text-gray-800 text-xl"
                        numberOfLines={1}
                      >
                        {product.name}
                      </Text>
                      <Text className="font-normal mt-1 text-sm">
                        Stock : {product.quantity}
                      </Text>
                      <Text className="text-[#FF9500] font-bold mt-1 text-lg">
                        ₱ {(parseFloat(product.price) || 0).toFixed(2)}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))
              ) : (
                <Text className="text-white">No products found</Text>
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
