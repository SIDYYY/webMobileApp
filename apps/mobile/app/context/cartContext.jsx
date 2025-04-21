import React, { createContext, useState, useContext, useEffect } from "react";
import { auth, db } from "../config"; // Firebase config
import {
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  collection,
  addDoc,
  serverTimestamp,
  increment,
  query,
  where,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Toast from "react-native-toast-message";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(null);

  // ✅ Listen to user auth and load cart
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        const cartRef = doc(db, "carts", user.uid);
        const cartDoc = await getDoc(cartRef);
        if (cartDoc.exists()) {
          setCartItems(cartDoc.data().items || []);
        } else {
          await setDoc(cartRef, { items: [] });
        }
      } else {
        setUserId(null);
        setCartItems([]);
      }
    });

    return () => unsubscribe();
  }, []);

  // ✅ Save cart to Firestore on change
  useEffect(() => {
    if (!userId) return;

    const saveCart = async () => {
      try {
        const cartRef = doc(db, "carts", userId);
        const cartDoc = await getDoc(cartRef);

        if (cartDoc.exists()) {
          await updateDoc(cartRef, { items: cartItems });
        } else {
          await setDoc(cartRef, { items: cartItems });
        }
      } catch (error) {
        console.error("🔥 Failed to save cart to Firestore", error);
      }
    };

    saveCart();
  }, [cartItems, userId]);

  // ✅ Cart functions
  const updateQuantity = async (productId, change) => {
    const updatedCart = [...cartItems];
    const itemIndex = updatedCart.findIndex((item) => item.id === productId);
  
    if (itemIndex === -1) return;
  
    const item = updatedCart[itemIndex];
    const newQuantity = item.quantity + change;
  
    try {
      const productRef = doc(db, "products", productId);
      const productSnap = await getDoc(productRef);
  
      if (!productSnap.exists()) {
        throw new Error("Product not found");
      }
  
      const stock = productSnap.data().quantity || 0;
  
      if (newQuantity > stock) {
        Toast.show({
          type: "error",
          text1: "No more stocks",
          text2: `Only ${stock} ${item.name} left.`,
          position: "top",
        });
        return;
      }
  
      updatedCart[itemIndex].quantity = Math.max(1, newQuantity);
      setCartItems(updatedCart);
    } catch (error) {
      console.error("⚠️ Stock check failed", error);
    }
  };

  const fetchOrders = async (userId) => {
    try {
      const ordersRef = collection(db, "orders");
      const q = query(ordersRef, where("userId", "==", userId));
      const snapshot = await getDocs(q);
  
      const userOrders = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      setOrders(userOrders);
    } catch (error) {
      console.error("⚠️ Failed to fetch orders:", error.message);
    }
  };
  
  

  const addToCart = async (product) => {
    try {
      const productRef = doc(db, "products", product.id);
      const productSnap = await getDoc(productRef);
  
      if (!productSnap.exists()) {
        throw new Error("Product not found");
      }
  
      const stock = productSnap.data().quantity || 0;
      if (stock <= 0) {
        Toast.show({
          type: "error",
          text1: "No Stock",
          text2: `${product.name} is out of stock.`,
          position: "top",
        });
        return;
      }
  
      setCartItems((prev) => {
        const existing = prev.find((item) => item.id === product.id);
        let updatedCart;
  
        if (existing) {
          if (existing.quantity + 1 > stock) {
            Toast.show({
              type: "error",
              text1: "No more stocks",
              text2: `Only ${stock} ${product.name} left.`,
              position: "top",
            });
            return prev;
          }
  
          updatedCart = prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          updatedCart = [...prev, { ...product, quantity: 1 }];
        }
  
        Toast.show({
          type: "success",
          text1: "Added to Cart",
          text2: `${product.name} has been added.`,
          position: "top",
        });
  
        return updatedCart;
      });
    } catch (error) {
      console.error("⚠️ Add to Cart Error", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message,
        position: "top",
      });
    }
  };
  

  const removeFromCart = (id) => {
    setCartItems((prev) => {
      const removedItem = prev.find((item) => item.id === id);
      if (removedItem) {
        Toast.show({
          type: "info",
          text1: "Removed from Cart",
          text2: `${removedItem.name} has been removed.`,
          position: "top",
        });
      }

      return prev.filter((item) => item.id !== id);
    });
  };

  const clearCart = () => setCartItems([]);

  // ✅ Checkout Function
  const checkout = async () => {
    if (!userId || cartItems.length === 0) {
      Toast.show({
        type: "error",
        text1: "Checkout Failed",
        text2: "Please sign in and add items to cart.",
        position: "top",
      });
      return;
    }
  
    try {
      // Step 1: Check stock availability first
      for (const item of cartItems) {
        const productRef = doc(db, "products", item.id);
        const productSnap = await getDoc(productRef);
  
        if (!productSnap.exists()) {
          throw new Error(`Product ${item.name} not found`);
        }
  
        const stock = productSnap.data().quantity || 0;
        if (item.quantity > stock) {
          Toast.show({
            type: "error",
            text1: "No Stock",
            text2: `${item.name} has only ${stock} left in stock.`,
            position: "top",
          });
          return;
        }
      }
  
      // Step 2: Proceed to place order
      const total = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
  
      const order = {
        userId,
        items: cartItems,
        total,
        createdAt: serverTimestamp(),
        status: "Pending",
      };
  
      await addDoc(collection(db, "orders"), order);
  
      // Step 3: Deduct stock after placing the order
      for (const item of cartItems) {
        const productRef = doc(db, "products", item.id);
        const productSnap = await getDoc(productRef);
        const stock = productSnap.data().quantity || 0;
        const newStock = stock - item.quantity;
  
        await updateDoc(productRef, { quantity: newStock });
      }
  
      clearCart();
  
      Toast.show({
        type: "success",
        text1: "Order Placed!",
        text2: "Your order has been submitted successfully.",
        position: "top",
      });
    } catch (error) {
      console.error("❌ Checkout Error:", error);
      Toast.show({
        type: "error",
        text1: "Checkout Failed",
        text2: error.message || "Something went wrong.",
        position: "top",
      });
    }
  };
  const cancelOrder = async (order) => {
    try {
      const orderRef = doc(db, "orders", order.id);
      const orderSnap = await getDoc(orderRef);

      if (!orderSnap.exists()) {
        console.error("Order not found.");
        return;
      }

      // Only allow cancel if status is not already cancelled
      if (order.status === "Cancelled") {
        console.warn("Order is already cancelled.");
        return;
      }

      // Restore stock for each item
      for (const item of order.items) {
        const productRef = doc(db, "products", item.id);
        await updateDoc(productRef, {
          quantity: increment(item.quantity),
        });
      }

      // Update order status
      await updateDoc(orderRef, {
        status: "Cancelled",
      });

      // Refresh order list
      fetchOrders(order.userId);
    } catch (error) {
      console.error("❌ Failed to cancel order:", error.message);
    }
  };
  

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        checkout,
        cancelOrder, // ⬅ added here
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
