"use client";
import { useState, useRef, useEffect } from "react";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", text: data.reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", text: "Error de conexión." }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-neon-purple/20 backdrop-blur-md rounded-full border border-neon-purple/40 flex items-center justify-center text-2xl z-50 hover:scale-110 transition-transform shadow-lg"
      >
        💬
      </button>

      {open && (
        <div className="fixed bottom-24 right-8 w-80 sm:w-96 h-[28rem] bg-dark/95 backdrop-blur-xl border border-neon-purple/20 rounded-2xl flex flex-col z-50 shadow-2xl">
          <div className="flex-1 p-4 overflow-y-auto space-y-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-[85%] ${
                  msg.role === "user"
                    ? "bg-neon-purple/20 ml-auto"
                    : "bg-gray-800/50 mr-auto"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {loading && <div className="text-gray-400 text-sm">CECILIA está pensando...</div>}
            <div ref={endRef} />
          </div>
          <div className="p-3 border-t border-neon-purple/20 flex">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-500"
              placeholder="Habla con CECILIA..."
            />
            <button onClick={sendMessage} className="ml-2 text-neon-purple hover:text-neon-blue transition-colors">
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}
