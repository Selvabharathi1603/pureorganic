import React, { createContext, useContext, useState, useEffect } from "react";
import { initialProducts } from "../data/InitialProduct";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem("organic_products");
      if (!saved) return initialProducts;

      const parsedSaved = JSON.parse(saved);

      // Map fresh details from InitialProduct.js by ID
      const initialMap = new Map(initialProducts.map((p) => [p.id, p]));

      // 1. Update existing default products with their latest image, name, and details
      const updatedSaved = parsedSaved.map((item) => {
        const fresh = initialMap.get(item.id);
        return fresh
          ? {
              ...item,
              name: fresh.name,
              category: fresh.category,
              image: fresh.image,
              description: fresh.description,
              unit: fresh.unit,
            }
          : item; // Retains custom products added via Admin panel
      });

      // 2. Add any completely new products from InitialProduct.js
      const existingIds = new Set(parsedSaved.map((p) => p.id));
      const newItems = initialProducts.filter((p) => !existingIds.has(p.id));

      return [...updatedSaved, ...newItems];
    } catch {
      return initialProducts;
    }
  });

  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("organic_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem("organic_orders");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Sync to localStorage whenever state updates
  useEffect(() => {
    localStorage.setItem("organic_products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("organic_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("organic_orders", JSON.stringify(orders));
  }, [orders]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item,
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.qty + delta;
            return nextQty > 0 ? { ...item, qty: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean),
    );
  };

  const clearCart = () => setCart([]);

  const placeOrder = (customerDetails) => {
    const trackingId = "ORG-" + Math.floor(100000 + Math.random() * 900000);
    const newOrder = {
      trackingId,
      items: [...cart],
      total: cart.reduce((sum, item) => sum + item.price * item.qty, 0),
      customer: customerDetails,
      date: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      status: "Placed",
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return trackingId;
  };

  const addProduct = (newProduct) => {
    setProducts((prev) => [
      { ...newProduct, id: "org-" + Date.now() },
      ...prev,
    ]);
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const updateOrderStatus = (trackingId, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.trackingId === trackingId
          ? { ...order, status: newStatus }
          : order,
      ),
    );
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        orders,
        isCartOpen,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        placeOrder,
        addProduct,
        deleteProduct,
        updateOrderStatus,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
