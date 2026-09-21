import React, { useState } from "react";
import { Trash2, LogOut, PackagePlus, ListFilter } from "lucide-react";
import { useStore } from "../../context/storecontext";

export default function Admindashboard({ onLogout }) {
  const { products, orders, addProduct, deleteProduct, updateOrderStatus } =
    useStore();

  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "Groceries",
    price: "",
    unit: "",
    image: "",
    description: "",
  });

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.unit) {
      alert("Please fill in required fields!");
      return;
    }

    const imageToUse =
      newProduct.image.trim() !== ""
        ? newProduct.image
        : "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80";

    addProduct({
      ...newProduct,
      price: Number(newProduct.price),
      image: imageToUse,
    });

    setNewProduct({
      name: "",
      category: "Groceries",
      price: "",
      unit: "",
      image: "",
      description: "",
    });

    alert("Product added successfully!");
  };

  return (
    <div className="min-h-screen bg-[#06140e] text-[#e8ece9] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-[#183d2d] pb-5">
          <div>
            <h1 className="text-2xl font-serif font-bold tracking-tight text-white">
              Admin Control Panel
            </h1>
            <p className="text-xs text-[#a3b8af]">
              Manage organic catalog inventory and update live customer orders
            </p>
          </div>
          <button
            onClick={onLogout}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0b2319] hover:bg-rose-950/60 hover:text-rose-300 text-[#a3b8af] border border-[#183d2d] text-xs font-semibold rounded-xl transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>

        {/* 1. Add New Product Form */}
        <div className="bg-[#0b2319] p-6 sm:p-8 rounded-3xl border border-[#183d2d] shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-[#d4af37]">
            <PackagePlus className="w-5 h-5" />
            <h2 className="text-base font-serif font-bold">
              Add New Organic Product
            </h2>
          </div>

          <form
            onSubmit={handleAddProduct}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
          >
            <div>
              <label className="block text-xs font-semibold text-[#a3b8af] mb-1">
                Product Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Organic Black Rice"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
                className="w-full px-3.5 py-2 text-sm rounded-xl bg-[#071a12] border border-[#183d2d] text-[#e8ece9] placeholder-[#738d81] focus:outline-none focus:border-[#d4af37] transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#a3b8af] mb-1">
                Category *
              </label>
              <select
                value={newProduct.category}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, category: e.target.value })
                }
                className="w-full px-3.5 py-2 text-sm rounded-xl bg-[#071a12] border border-[#183d2d] text-[#e8ece9] focus:outline-none focus:border-[#d4af37] transition-all"
              >
                <option value="Groceries">Groceries</option>
                <option value="Millets & Grains">Millets & Grains</option>
                <option value="Cold-Pressed Oils">Cold-Pressed Oils</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#a3b8af] mb-1">
                Price (₹) *
              </label>
              <input
                type="number"
                required
                placeholder="e.g. 180"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
                className="w-full px-3.5 py-2 text-sm rounded-xl bg-[#071a12] border border-[#183d2d] text-[#e8ece9] placeholder-[#738d81] focus:outline-none focus:border-[#d4af37] transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#a3b8af] mb-1">
                Unit / Size *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 500g, 1 kg, 1 Litre"
                value={newProduct.unit}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, unit: e.target.value })
                }
                className="w-full px-3.5 py-2 text-sm rounded-xl bg-[#071a12] border border-[#183d2d] text-[#e8ece9] placeholder-[#738d81] focus:outline-none focus:border-[#d4af37] transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#a3b8af] mb-1">
                Image URL (Optional)
              </label>
              <input
                type="url"
                placeholder="Paste image web link"
                value={newProduct.image}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, image: e.target.value })
                }
                className="w-full px-3.5 py-2 text-sm rounded-xl bg-[#071a12] border border-[#183d2d] text-[#e8ece9] placeholder-[#738d81] focus:outline-none focus:border-[#d4af37] transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#a3b8af] mb-1">
                Description
              </label>
              <input
                type="text"
                placeholder="Short benefits note"
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, description: e.target.value })
                }
                className="w-full px-3.5 py-2 text-sm rounded-xl bg-[#071a12] border border-[#183d2d] text-[#e8ece9] placeholder-[#738d81] focus:outline-none focus:border-[#d4af37] transition-all"
              />
            </div>

            <div className="sm:col-span-2 md:col-span-3 pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 bg-gradient-to-r from-[#d4af37] via-[#e5c558] to-[#c59e2b] text-[#06140e] text-xs font-bold uppercase tracking-wider rounded-xl shadow-md shadow-[#d4af37]/20 hover:brightness-110 cursor-pointer active:scale-95 transition-all"
              >
                Save Product
              </button>
            </div>
          </form>
        </div>

        {/* 2. Customer Orders Table */}
        <div className="bg-[#0b2319] rounded-3xl border border-[#183d2d] shadow-xl overflow-hidden">
          <div className="p-6 border-b border-[#183d2d] flex items-center justify-between">
            <h2 className="text-base font-serif font-bold text-white">
              Customer Orders ({orders.length})
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#a3b8af]">
              <thead className="bg-[#071a12] text-[#d4af37] font-semibold border-b border-[#183d2d]">
                <tr>
                  <th className="px-6 py-3.5">Order / Tracking ID</th>
                  <th className="px-6 py-3.5">Customer</th>
                  <th className="px-6 py-3.5">Date</th>
                  <th className="px-6 py-3.5">Amount</th>
                  <th className="px-6 py-3.5">Status Progress</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#183d2d]">
                {orders.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-8 text-center text-[#738d81]"
                    >
                      No customer orders placed yet.
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order.trackingId} className="hover:bg-[#0e2c1f]">
                      <td className="px-6 py-4 font-mono font-bold text-[#d4af37]">
                        {order.trackingId}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-white">
                          {order.customer?.name}
                        </div>
                        <div className="text-[#738d81]">
                          {order.customer?.phone}
                        </div>
                        <div className="text-[#738d81] text-[11px] truncate max-w-xs">
                          {order.customer?.address}
                        </div>
                      </td>
                      <td className="px-6 py-4">{order.date}</td>
                      <td className="px-6 py-4 font-semibold text-[#f3e5ab]">
                        ₹{order.total}
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={order.status}
                          onChange={(e) =>
                            updateOrderStatus(order.trackingId, e.target.value)
                          }
                          className="bg-[#071a12] border border-[#183d2d] text-[#d4af37] font-medium px-2.5 py-1.5 rounded-lg focus:outline-none focus:border-[#d4af37]"
                        >
                          <option value="Placed">Placed</option>
                          <option value="Packed">Packed</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. Products Inventory Table */}
        <div className="bg-[#0b2319] rounded-3xl border border-[#183d2d] shadow-xl overflow-hidden">
          <div className="p-6 border-b border-[#183d2d]">
            <h2 className="text-base font-serif font-bold text-white">
              Inventory Management ({products.length} Items)
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#a3b8af]">
              <thead className="bg-[#071a12] text-[#d4af37] font-semibold border-b border-[#183d2d]">
                <tr>
                  <th className="px-6 py-3.5">Product</th>
                  <th className="px-6 py-3.5">Category</th>
                  <th className="px-6 py-3.5">Price</th>
                  <th className="px-6 py-3.5">Unit</th>
                  <th className="px-6 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#183d2d]">
                {products.map((prod) => (
                  <tr key={prod.id} className="hover:bg-[#0e2c1f]">
                    <td className="px-6 py-4 font-semibold text-white">
                      {prod.name}
                    </td>
                    <td className="px-6 py-4">{prod.category}</td>
                    <td className="px-6 py-4 font-semibold text-[#d4af37]">
                      ₹{prod.price}
                    </td>
                    <td className="px-6 py-4">{prod.unit}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => deleteProduct(prod.id)}
                        className="text-stone-500 hover:text-rose-400 p-1.5 transition-colors cursor-pointer"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
