import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StoreProvider } from "./context/storecontext";

import ClientLayout from "./components/ClientLayout";

import Home from "./pages/client/Home";
import Shop from "./pages/client/Shop";
import Cart from "./pages/client/Cart";
import TrackOrder from "./pages/client/Trackorder";
import AdminLogin from "./pages/Admin/AdminLogin";

export default function App() {
  return (
    <StoreProvider>
      <Router>
        <Routes>
          {/* 1. PUBLIC CLIENT STOREFRONT (Navbar + Drawer + Footer) */}
          <Route element={<ClientLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/track" element={<TrackOrder />} />
          </Route>

          {/* 2. STANDALONE ADMIN PORTAL (No customer navbar/footer) */}
          <Route path="/admin" element={<AdminLogin />} />
        </Routes>
      </Router>
    </StoreProvider>
  );
}
