"use client";
import Link from "next/link";
import { useAuth } from "@/components/Providers";

export default function Navbar() {
  const { user, loading, logout } = useAuth();

  if (loading) return null;

  return (
    <div className="fixed top-0 right-0 z-50 p-4 flex items-center gap-3">
      {user ? (
        <>
          <span className="text-[#b380ff] bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-[#b380ff]/20 text-sm">
            Bienvenido, {user.name.split(" ")[0]}
          </span>
          <Link
            href="/dashboard"
            className="bg-[#00ffff]/10 backdrop-blur-md px-4 py-2 rounded-full border border-[#00ffff]/30 text-[#00ffff] hover:bg-[#00ffff]/20 transition-all text-sm"
          >
            JARVIS
          </Link>
          <button
            onClick={logout}
            className="text-gray-400 hover:text-white text-sm transition-colors"
          >
            Salir
          </button>
        </>
      ) : (
        <Link
          href="/login"
          className="bg-[#b380ff]/20 backdrop-blur-md px-5 py-2 rounded-full border border-[#b380ff]/40 text-[#b380ff] hover:bg-[#b380ff]/30 transition-all shadow-lg text-sm font-medium"
        >
          Iniciar Sesión
        </Link>
      )}
    </div>
  );
}
