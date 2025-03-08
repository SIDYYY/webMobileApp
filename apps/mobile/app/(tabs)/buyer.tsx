import { useLocalSearchParams } from "expo-router";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";

const mostBoughtProducts = [
  {
    id: 1,
    name: "Premium Dog Food",
    image: "https://www.caminadepet.com/wp-content/uploads/2022/09/omegapro.png",
    price: "$25.99",
    description: "Nutritious and delicious dog food.",
  },
  {
    id: 2,
    name: "Cat Play Tunnel",
    image: "https://m.media-amazon.com/images/I/61TKnP1-2MS._AC_UF894,1000_QL80_.jpg",
    price: "$18.50",
    description: "Foldable and fun play tunnel for cats.",
  },
];

const newArrivals = [
  {
    id: 3,
    name: "Automatic Pet Feeder",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDomphFkQOTYyBK0OOWB2gWTA4aQ6M5y9z5Q&s",
    price: "$39.99",
    description: "Schedule and auto-feed your pet.",
  },
  {
    id: 4,
    name: "Luxury Pet Bed",
    image: "https://media.licdn.com/dms/image/v2/D4D12AQHwwzqTAkHIPg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1699266572550?e=2147483647&v=beta&t=ALNTFliMRmfMrO_7kCLmwkvifOWBK0Z2iAFlq3_Mj3I",
    price: "$29.99",
    description: "Super soft and comfortable bed for pets.",
  },
];

export default function HomeScreen() {
  const { role } = useLocalSearchParams();

  return (
    <ScrollView className="bg-gray-100 flex-1">
      {/* Client Logo Section */}
      <View className="items-center mt-6">
        <Image
          source={require("../../assets/images/pet-removebg-preview-removebg-preview.png")}
          className="w-40 h-20"
          resizeMode="contain"
        />
      </View>

      {/* Banner Section */}
      <View className="m-5">
        <Image
          source={{ uri: "https://img.freepik.com/free-vector/hand-drawn-pet-shop-facebook-cover-template_23-2150383109.jpg" }} // Replace with actual banner
          className="w-full h-40 rounded-lg"
          resizeMode="cover"
        />
        <Text className="text-xl font-bold text-center mt-3 text-gray-900">
          Find Quality Products for Your Pets
        </Text>
      </View>

      {/* Most Bought Products Section */}
      <View className="mb-5 px-4">
        <Text className="text-lg font-semibold text-gray-900 mb-3">
          Most Bought Products
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {mostBoughtProducts.map((product) => (
            <TouchableOpacity
              key={product.id}
              className="border border-gray-300 rounded-lg p-3 mr-4 bg-white shadow-sm"
            >
              <Image
                source={{ uri: product.image }}
                className="w-36 h-36 rounded-lg"
                resizeMode="cover"
              />
              <Text className="text-gray-900 font-medium mt-2">{product.name}</Text>
              <Text className="text-gray-600">{product.price}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* New Arrivals Section */}
      <View className="mb-5 px-4">
        <Text className="text-lg font-semibold text-gray-900 mb-3">
          New Arrivals
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {newArrivals.map((product) => (
            <TouchableOpacity
              key={product.id}
              className="border border-gray-300 rounded-lg p-3 mr-4 bg-white shadow-sm"
            >
              <Image
                source={{ uri: product.image }}
                className="w-36 h-36 rounded-lg"
                resizeMode="cover"
              />
              <Text className="text-gray-900 font-medium mt-2">{product.name}</Text>
              <Text className="text-gray-600">{product.price}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}
