import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { db, auth } from "../config";

import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useFocusEffect } from "@react-navigation/native";
import { useCart } from "../context/cartContext";
import moment from "moment";

const OrdersScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [statusFilters] = useState([
    "All",
    "Pending",
    "Processing",
    "Completed",
    "Cancelled",
  ]);
  const [activeFilter, setActiveFilter] = useState("All");

  const { cancelOrder } = useCart();

  const fetchOrders = async (uid) => {
    setLoading(true);
    try {
      const q = query(
        collection(db, "orders"),
        where("userId", "==", uid),
        orderBy("createdAt", "desc")
      );

      const querySnapshot = await getDocs(q);
      const userOrders = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate(),
        };
      });

      setOrders(userOrders);
    } catch (error) {
      console.error("❌ Failed to fetch orders:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = (order) => {
    Alert.alert("Cancel Order", "Are you sure you want to cancel this order?", [
      {
        text: "Yes",
        onPress: async () => {
          try {
            await cancelOrder(order);
            fetchOrders(userId);
          } catch (error) {
            console.error("❌ Failed to cancel order:", error.message);
          }
        },
      },
      { text: "No", style: "cancel" },
    ]);
  };

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUserId(user.uid);
          fetchOrders(user.uid);
        } else {
          setOrders([]);
          setLoading(false);
        }
      });

      return () => unsubscribe();
    }, [])
  );

  const renderOrder = ({ item }) => {
    const statusStyles = {
      Processing: "text-yellow-500",
      Completed: "text-green-500",
      Cancelled: "text-red-500",
      Pending: "text-blue-500",
    };

    const statusText = item.status || "Unknown Status";
    const statusStyle = statusStyles[item.status] || "bg-gray-500";

    return (
      <View className="bg-white rounded-2xl p-5 mb-5 shadow-sm">
        <Text className="text-xl font-semibold text-gray-900 mb-2">
          <Text className="text-gray-500">Order ID:</Text> {item.id}
        </Text>

        <Text className="text-lg text-gray-600 mb-2">
          Placed on:{" "}
          <Text className="text-gray-800">
            {moment(item.createdAt).format("MMMM D, YYYY - h:mm A")}
          </Text>
        </Text>

        <Text className="text-lg text-gray-600 mb-2">
          Status:{" "}
          <Text className={`${statusStyle} text-white font-semibold px-2 py-1 rounded`}>
            {statusText}
          </Text>
        </Text>

        <Text className="text-lg font-semibold text-gray-800 mb-2">Items:</Text>
        <View className="pl-2">
          {item.items.map((product, idx) => (
            <View key={idx} className="mb-4 flex-row items-center">
              <Image
                source={{ uri: product.image }}
                style={{ width: 60, height: 60, borderRadius: 10 }}
              />
              <Text className="text-lg text-gray-600 ml-3">
                • {product.name} × {product.quantity}
              </Text>
            </View>
          ))}
        </View>

        <Text className="text-2xl font-bold text-black mt-4">
          Total: ₱ {item.total.toFixed(2)}
        </Text>

        {item.status === "Pending" && (
          <TouchableOpacity
            onPress={() => handleCancel(item)}
            className="mt-4 bg-red-500 py-3 px-4 rounded-xl"
          >
            <Text className="text-white text-center font-semibold text-base">
              Cancel Order
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const filteredOrders =
    activeFilter === "All"
      ? orders
      : orders.filter((order) => order.status === activeFilter);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#FF9500" />
        <Text className="text-gray-500 mt-4">Loading your orders...</Text>
      </SafeAreaView>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-[#FF9500]"
    >
      <SafeAreaView className="flex-1">
        <View className="mt-4">
          <Text className="text-3xl font-black text-white mb-4 text-center">
            Your Orders
          </Text>

          {/* 🔶 Filter Bar */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-4 px-4"
            contentContainerStyle={{ gap: 10 }}
          >
            {statusFilters.map((status) => (
              <TouchableOpacity
                key={status}
                onPress={() => setActiveFilter(status)}
                className={`px-4 py-2 rounded-full ${
                  activeFilter === status ? "bg-white" : "bg-white/30"
                }`}
              >
                <Text
                  className={`font-semibold ${
                    activeFilter === status ? "text-[#FF9500]" : "text-white"
                  }`}
                >
                  {status}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* 🧾 Orders List */}
          {filteredOrders.length === 0 ? (
            <View className="items-center justify-center mt-20">
              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/869/869027.png",
                }}
                style={{ width: 120, height: 120, marginBottom: 10 }}
              />
              <Text className="text-xl text-white font-bold">Nothing's here yet</Text>
              <Text className="text-base text-white mt-1">
                No {activeFilter.toLowerCase()} orders found
              </Text>
            </View>
          ) : (
            <FlatList
              data={filteredOrders}
              renderItem={renderOrder}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: 100,
                paddingLeft: 15,
                paddingRight: 15,
              }}
            />
          )}
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default OrdersScreen;
