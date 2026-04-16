"use client";

import { useState, useRef, useEffect } from "react";
import { Send, X, MessageCircle, Minimize2 } from "lucide-react";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
}

const SUGGESTIONS = [
  "📊 Quel est le taux de réussite moyen?",
  "👥 Combien d'étudiants en risque?",
  "📈 Meilleure promotion cette année?",
  "⚠️ Quels sont les alertes actives?",
  "🎓 Performance par parcours?",
  "📉 Tendance d'absentéisme?",
];

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content: "Bonjour! 👋 Je suis l'Assistant EPSI. Comment puis-je vous aider avec vos données?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    // Simulate bot response delay
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: generateResponse(input),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setLoading(false);
    }, 800);
  };

  const generateResponse = (query: string): string => {
    const lower = query.toLowerCase();
    if (
      lower.includes("réussite") ||
      lower.includes("success") ||
      lower.includes("taux")
    ) {
      return "✅ Le taux de réussite moyen est de 87.6% cette année. Les meilleures performances sont en MSc IA (94.4%) et Bachelor Cyber (91.7%).";
    }
    if (lower.includes("risque") || lower.includes("churn") || lower.includes("alert")) {
      return "⚠️ Actuellement, 14 étudiants présentent un risque très élevé de décrochage. Je peux vous montrer les détails sur la page IA & Prédictions.";
    }
    if (lower.includes("meilleur") || lower.includes("best") || lower.includes("top")) {
      return "🏆 Les meilleures promotions sont: MSc IA (94.4%), Bachelor Cyber (91.7%) et MSc Data Science (90.0%).";
    }
    if (lower.includes("promotion") || lower.includes("promo")) {
      return "🎓 Nous avons 12 promotions actives. BTS SIO SLAM a 32 étudiants avec un taux de réussite de 84.4%.";
    }
    if (lower.includes("absent") || lower.includes("assiduité") || lower.includes("attendance")) {
      return "📊 Le taux d'absentéisme moyen est de 8.3%. Certains étudiants dépassent les 20% d'absence.";
    }
    return "🤖 Je suis ici pour répondre à vos questions sur les données EPSI. Vous pouvez me demander des informations sur les étudiants, les promotions, la pédagogie ou les prédictions.";
  };

  const handleSuggestion = (suggestion: string) => {
    setInput(suggestion);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        title="Ouvrir l'assistant EPSI"
        aria-label="Ouvrir l'assistant EPSI"
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-[#4B3F99] to-[#4FC3C7] text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center z-40 animate-pulse-subtle group"
      >
        <MessageCircle size={24} className="group-hover:scale-125 transition-transform" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 flex flex-col z-50 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#4B3F99] to-[#4FC3C7] text-white px-6 py-4 flex items-center justify-between rounded-t-2xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <MessageCircle size={18} />
          </div>
          <div>
            <h3 className="font-semibold text-sm">Assistant EPSI 🤖</h3>
            <p className="text-xs text-white/70">En ligne</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            title={isMinimized ? "Restaurer" : "Réduire"}
            className="text-white/70 hover:text-white transition-colors p-1"
          >
            <Minimize2 size={18} />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            title="Fermer"
            className="text-white/70 hover:text-white transition-colors p-1"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-white to-slate-50/50">
            {messages.length === 1 && (
              <div className="mt-2">
                <p className="text-xs text-gray-500 text-center mb-4">Suggestions populaires</p>
                <div className="grid grid-cols-1 gap-2">
                  {SUGGESTIONS.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSuggestion(suggestion)}
                      className="text-left text-xs px-3 py-2 rounded-lg bg-gradient-to-r from-[#4B3F99]/10 to-[#4FC3C7]/10 hover:from-[#4B3F99]/20 hover:to-[#4FC3C7]/20 text-gray-700 transition-colors border border-[#4B3F99]/10"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 animate-fadeIn ${
                  msg.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.type === "bot" && (
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#4B3F99] to-[#4FC3C7] flex items-center justify-center flex-shrink-0 text-white text-xs font-bold">
                    E
                  </div>
                )}
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                    msg.type === "user"
                      ? "bg-gradient-to-br from-[#4B3F99] to-[#4FC3C7] text-white rounded-br-none"
                      : "bg-gray-100 text-gray-800 rounded-bl-none"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-3 items-center">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#4B3F99] to-[#4FC3C7] flex items-center justify-center text-white text-xs font-bold">
                  E
                </div>
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-100"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-200"></div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4 bg-white/50 backdrop-blur-sm">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Posez votre question..."
                disabled={loading}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4B3F99]/30 text-sm disabled:bg-gray-50"
              />
              <button
                onClick={handleSendMessage}
                disabled={loading || !input.trim()}
                title="Envoyer"
                className="w-9 h-9 rounded-lg bg-gradient-to-r from-[#4B3F99] to-[#4FC3C7] text-white flex items-center justify-center hover:shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed transition"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
