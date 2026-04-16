"use client";

import Header from "@/components/layout/Header";
import Badge from "@/components/ui/Badge";
import { useState, useRef, useEffect } from "react";
import { Send, Lightbulb, Search } from "lucide-react";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
}

const suggestions = [
  "📊 Quel est le taux de réussite 2024 ?",
  "👥 Combien d'étudiants en alternance ?",
  "🎯 Qui sont les meilleurs intervenants ?",
  "⚠️ Quels étudiants sont à risque ?",
  "📈 Évolution des effectifs par promotion",
  "🏆 Classement par taux de réussite",
];

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content: "Bonjour! Je suis EPSI Assistant, votre chatbot IA. Je peux vous aider avec des questions sur les promotions, les étudiants, la pédagogie et les analyses prédictives. Comment puis-je vous aider?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text?: string) => {
    const userMessage = text || input;
    if (!userMessage.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: userMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInput("");
    setLoading(true);

    // Simulate bot response with RAG-like answers
    setTimeout(() => {
      let botResponse = "";

      if (userMessage.toLowerCase().includes("taux de réussite") || userMessage.toLowerCase().includes("réussite 2024")) {
        botResponse =
          "Le taux de réussite moyen pour 2024 est de **87.6%**. Les MSc IA et Data Science ont les meilleurs résultats avec 94.4% et 90.0% respectivement. Les BTS SISR ont le taux le plus bas avec 78.6%.";
      } else if (userMessage.toLowerCase().includes("alternance") || userMessage.toLowerCase().includes("effectif")) {
        botResponse =
          "En 2024, nous avons **112 étudiants** en alternance sur un total de 204 étudiants. Cela représente 55% de notre population. L'alternance est notre mode principal de formation.";
      } else if (userMessage.toLowerCase().includes("meilleur") || userMessage.toLowerCase().includes("intervenant")) {
        botResponse =
          "Les top 5 intervenants sont :\n1. **Prof. Sophie Lefebvre** (Data Science) - 4.9/5\n2. **Prof. Marie Dupont** (Cybersécurité) - 4.8/5\n3. **Prof. Antoine Dubois** (IA) - 4.8/5\n4. **Prof. Karim Benali** (DevOps) - 4.7/5\n5. **Prof. Jean-Paul Martin** (Web) - 4.6/5";
      } else if (userMessage.toLowerCase().includes("risque") || userMessage.toLowerCase().includes("décrochage")) {
        botResponse =
          "Actuellement, **14 étudiants** présentent un risque de décrochage élevé selon notre modèle IA. Cela représente 6.9% de la population. Les principaux facteurs de risque sont l'absentéisme élevé et les mauvaises performances académiques.";
      } else if (userMessage.toLowerCase().includes("satisfaction") || userMessage.toLowerCase().includes("qualité")) {
        botResponse =
          "Le score de satisfaction des entreprises est en hausse constante. Score moyen actuel: **86.6/100**. Les points forts sont l'intégration en équipe et la maîtrise technique. Points d'amélioration: communication écrite.";
      } else if (userMessage.toLowerCase().includes("bonjour") || userMessage.toLowerCase().includes("salut")) {
        botResponse = "Bonjour! Comment puis-je vous aider aujourd'hui? Vous pouvez me poser des questions sur les promotions, les étudiants, ou les analyses.";
      } else {
        botResponse =
          "Je comprends votre question. Basé sur nos données, voici ce que je peux vous dire: pour plus de détails spécifiques, je vous recommande de consulter les tableaux de bord dédiés. Y a-t-il autre chose que vous souhaitez savoir?";
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: botResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header title="Chatbot EPSI Assistant" subtitle="Interrogez vos données avec l'IA" />

      <div className="flex-1 flex flex-col p-6 gap-4 overflow-hidden">
        {/* Chat Container */}
        <div className="flex-1 bg-white rounded-xl shadow-card border border-gray-100 flex flex-col overflow-hidden">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"} gap-3`}
              >
                {msg.type === "bot" && (
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary text-xs font-bold">EA</span>
                  </div>
                )}
                <div
                  className={`max-w-xl rounded-xl p-4 ${
                    msg.type === "user"
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-900 border border-gray-200"
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  <p className={`text-xs mt-1 ${msg.type === "user" ? "text-white/70" : "text-gray-500"}`}>
                    {msg.timestamp.toLocaleTimeString("fr-FR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary text-xs font-bold">EA</span>
                </div>
                <div className="bg-gray-100 text-gray-900 rounded-xl p-4 border border-gray-200">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse animation-delay-200"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse animation-delay-400"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions (only show if no messages yet or first time) */}
          {messages.length <= 1 && (
            <div className="border-t border-gray-100 p-6">
              <p className="text-xs text-gray-500 font-medium mb-3 flex items-center gap-2">
                <Lightbulb size={14} /> Suggestions
              </p>
              <div className="space-y-2">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(s)}
                    className="w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 transition text-sm text-gray-700 hover:text-gray-900"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="border-t border-gray-100 p-4">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Posez une question..."
                disabled={loading}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm disabled:bg-gray-50"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={loading || !input.trim()}
                title="Envoyer le message"
                aria-label="Envoyer le message"
                className="w-10 h-10 rounded-lg bg-primary text-white flex items-center justify-center hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
