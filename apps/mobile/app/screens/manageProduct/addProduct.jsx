import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { db } from "../../config";
import { collection, addDoc } from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/Ionicons';

export default function ManageScreen() {
  const [product, setProduct] = useState({
    name: "",
    images: [],
    price: "",
    quantity: "",
    category: "",
    description: "",
  });

  const handleChange = (key, value) => {
    setProduct({ ...product, [key]: value });
  };

  const handleImagePick = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Camera roll permission is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImage = result.assets[0].uri;
      setProduct({ ...product, images: [...product.images, selectedImage] });
    }
  };

  const handleSubmit = async () => {
    const { name, image, price, quantity, category, description } = product;

    if (!name || !image || !price || !quantity || !category || !description) {
      Alert.alert("Missing Fields", "Please fill in all product fields.");
      return;
    }

    try {
      await addDoc(collection(db, "products"), {
        ...product,
        createdAt: new Date(),
      });

      Alert.alert("Success", `Product added Successfully`);
      setProduct({
        name: "",
        images: [],
        price: "",
        quantity: "",
        category: "",
        description: "",
      });
    } catch (error) {
      console.error("Error adding product: ", error);
      Alert.alert("Error", "Failed to add product.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
      style={{ backgroundColor: "#FF9500" }}
    >
      <SafeAreaView>
        <ScrollView           
          contentContainerStyle={{ paddingBottom: 32, paddingHorizontal: 20}}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <Text className="text-white text-4xl font-black text-center mt-4 mb-4">
            Add Product
          </Text>

          {/* Image Picker */}
          <TouchableOpacity
            onPress={handleImagePick}
            className="rounded-xl bg-white/20 p-4 mb-4 items-center"
            style={{
              borderWidth: 1,
              borderColor: "white",
            }}
          >
            <Text className="text-white font-black text-base">
              Choose Image
            </Text>
          </TouchableOpacity>

          <ScrollView horizontal className="mb-4 space-x-2">
            {product.images.map((uri, index) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  Alert.alert(
                    "Remove Image",
                    "Do you want to remove this image?",
                    [
                      { text: "Cancel", style: "cancel" },
                      {
                        text: "Remove",
                        onPress: () => {
                          setProduct((prev) => ({
                            ...prev,
                            images: prev.images.filter((_, i) => i !== index),
                          }));
                        },
                        style: "destructive",
                      },
                    ]
                  )
                }
              >
                <View className="relative">
                  {/* Remove icon */}
                  <View className="absolute top-2 right-2 bg-black rounded-xl p-1 z-10">
                    <Icon name="bag-remove" size={20} color="#fff" />
                  </View>

                  {/* Image */}
                  <Image
                    source={{ uri }}
                    className="w-32 h-32 rounded-md m-1"
                    resizeMode="cover"
                  />
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>



          {/* Inputs */}
          {["name", "price", "quantity", "category", "description"].map(
            (field) => (
              <TextInput
                key={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={product[field]}
                onChangeText={(value) => handleChange(field, value)}
                className="rounded-lg p-4 mb-4 text-base bg-white"
                placeholderTextColor="#999"
                style={{
                  elevation: 2,
                  shadowColor: "#000",
                }}
              />
            )
          )}

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleSubmit}
            className="py-4 rounded-lg items-center mt-2"
            style={{
              backgroundColor: "#8E5E3C",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <Text className="text-white font-bold text-lg">
              Submit Product
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
