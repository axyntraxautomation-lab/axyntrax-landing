"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/Providers";

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, refresh } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isRegister) {
        const res = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, name, password }),
        });
        if (!res.ok) {
          const d = await res.json();
          setError(d.error || "Error al registrar");
          return;
        }
        // Auto-login after register
        const loginError = await login(email, password);
        if (loginError) { setError(loginError); return; }
      } else {
        const loginError = await login(email, password);
        if (loginError) { setError(loginError); return; }
      }
      await refresh();
      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f]">
      {/* Fondo sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#b380ff]/5 via-transparent to-[#00ffff]/5 pointer-events-none" />

      <div className="relative bg-[#111118] p-8 rounded-2xl border border-[#b380ff]/20 w-full max-w-md shadow-2xl shadow-[#b380ff]/5">
        {/* Logo */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#b380ff] to-[#00ffff] bg-clip-text text-transparent">
            AXYNTRAX
          </h1>
          <p className="text-gray-500 text-sm mt-1">Centro de Comando</p>
        </div>

        <h2 className="text-xl font-semibold text-white mb-6 text-center">
          {isRegister ? "Crear Cuenta" : "Iniciar Sesión"}
        </h2>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <input
              type="text"
              placeholder="Nombre completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 bg-[#0a0a0f] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#b380ff] transition-colors"
              required
            />
          )}
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-[#0a0a0f] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#b380ff] transition-colors"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-[#0a0a0f] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#b380ff] transition-colors"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-[#b380ff] hover:bg-[#9966ee] rounded-lg font-semibold text-white transition-all disabled:opacity-50"
          >
            {loading ? "Procesando..." : isRegister ? "Crear Cuenta" : "Entrar"}
          </button>
        </form>

        <p className="text-center mt-5 text-gray-500 text-sm">
          {isRegister ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}{" "}
          <button
            onClick={() => { setIsRegister(!isRegister); setError(""); }}
            className="text-[#00ffff] hover:underline"
          >
            {isRegister ? "Inicia sesión" : "Regístrate gratis"}
          </button>
        </p>
      </div>
    </div>
  );
}
