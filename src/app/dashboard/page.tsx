import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-dark flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold text-neon-purple mb-4">CENTRO DE COMANDO JARVIS</h1>
      <p className="text-gray-400 max-w-md mb-8">
        Esta ruta está protegida por Vercel. Si ves esto, has ingresado la contraseña correcta.
      </p>
      <Link href="/" className="text-neon-blue underline hover:text-neon-purple transition-colors">
        Volver a la Landing
      </Link>
    </div>
  );
}
