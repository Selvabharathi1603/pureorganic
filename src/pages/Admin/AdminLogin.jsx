import React, { useState } from "react";
import { Lock, User, ShieldCheck } from "lucide-react";
import AdminDashboard from "./Admindashboard";

export default function AdminLogin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "farm" && password === "farm123") {
      setIsAuthenticated(true);
      setErrorMsg("");
    } else {
      setErrorMsg("Invalid username or password! (Use: farm / farm123)");
    }
  };

  if (isAuthenticated) {
    return <AdminDashboard onLogout={() => setIsAuthenticated(false)} />;
  }

  return (
    <div className="min-h-screen bg-[#06140e] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm bg-[#0b2319] p-8 rounded-3xl border border-[#183d2d] shadow-2xl shadow-black/80 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#071a12] border border-[#d4af37]/40 text-[#d4af37] flex items-center justify-center mx-auto shadow-[0_0_15px_rgba(212,175,55,0.2)]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-serif font-bold tracking-tight text-white">
            Admin Login
          </h2>
          <p className="text-xs text-[#a3b8af]">Store management portal</p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-rose-950/40 border border-rose-800/60 text-rose-300 text-xs rounded-xl text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#a3b8af] mb-1">
              Username
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#738d81]" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="farm"
                className="w-full pl-10 pr-3.5 py-2 text-sm rounded-xl bg-[#071a12] border border-[#183d2d] text-[#e8ece9] placeholder-[#738d81] focus:outline-none focus:border-[#d4af37] transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#a3b8af] mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#738d81]" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                className="w-full pl-10 pr-3.5 py-2 text-sm rounded-xl bg-[#071a12] border border-[#183d2d] text-[#e8ece9] placeholder-[#738d81] focus:outline-none focus:border-[#d4af37] transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-gradient-to-r from-[#d4af37] via-[#e5c558] to-[#c59e2b] text-[#06140e] text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-[0_0_15px_rgba(212,175,55,0.25)] hover:brightness-110 cursor-pointer active:scale-98"
          >
            Login to Admin Panel
          </button>
        </form>

        <p className="text-center text-[11px] text-[#738d81]">
          Demo Hint: User: <b className="text-[#f3e5ab]">farm</b> | Pass:{" "}
          <b className="text-[#f3e5ab]">farm123</b>
        </p>
      </div>
    </div>
  );
}
