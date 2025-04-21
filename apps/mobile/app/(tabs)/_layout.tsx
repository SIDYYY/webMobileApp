import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "../context/cartContext";

import '../../global.css';

export default function Layout() {
  const { cartItems } = useCart();
  const totalItems = cartItems.length;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FF9500", // active tab icon/text
        tabBarInactiveTintColor: "#8E8E93", // iOS-like subtle gray
        tabBarStyle: {
          backgroundColor: "#fff", // clean white background
          height: 70,
          paddingBottom: 8,
          paddingRight: 20,
          paddingLeft: 20,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="shop"
        options={{
          title: "Shop",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bag-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart-outline" size={size} color={color} />
          ),
          tabBarBadge: totalItems > 0 ? totalItems : null,
          tabBarBadgeStyle: {
            backgroundColor: "#FF9500",
            color: "#fff",
            fontSize: 12,
            fontWeight: "bold",
          },
        }}
      />
      <Tabs.Screen
        name="Order"
        options={{
          title: "Order",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cube-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
