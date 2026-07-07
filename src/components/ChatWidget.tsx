import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Clock } from 'lucide-react';

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

const WELCOME_MESSAGE: ChatMessage = {
  role: 'assistant',
  content:
    "Bienvenue chez TimeTravel Agency ! Je suis votre conseiller en voyages temporels. Posez-moi vos questions sur nos destinations, nos tarifs, ou laissez-moi vous aider a choisir votre epoque ideale.",
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const newMessages: ChatMessage[] = [...messages, { role: 'user', content: trimmed }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) {
        throw new Error('Erreur reseau');
      }

      const data = await response.json();
      setMessages([...newMessages, { role: 'assistant', content: data.reply }]);
    } catch (error) {
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content:
            "Desolee, une erreur technique m'empeche de repondre pour le moment. Veuillez reessayer dans un instant.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Bouton flottant */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-[60] w-14 h-14 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 shadow-lg shadow-gold-400/30 flex items-center justify-center"
        aria-label="Ouvrir le chat"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="w-6 h-6 text-obsidian-950" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle className="w-6 h-6 text-obsidian-950" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Fenetre de chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-24 right-6 z-[60] w-[90vw] max-w-sm h-[500px] max-h-[70vh] rounded-2xl bg-obsidian-950/98 backdrop-blur-lg border border-gold-400/20 shadow-2xl shadow-black/50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-4 border-b border-gold-400/10 bg-obsidian-900/50">
              <div className="relative w-8 h-8 flex items-center justify-center flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full opacity-30" />
                <Clock className="w-4 h-4 text-gold-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Conseiller TimeTravel</p>
                <p className="text-xs text-gold-400">En ligne</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-gold-400 text-obsidian-950 font-medium'
                        : 'bg-obsidian-800 text-gray-200 border border-gold-400/10'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-obsidian-800 border border-gold-400/10 rounded-2xl px-4 py-2.5 text-sm text-gray-400">
                    <span className="inline-flex gap-1">
                      <span className="w-1.5 h-1.5 bg-gold-400 rounded-full animate-pulse" />
                      <span className="w-1.5 h-1.5 bg-gold-400 rounded-full animate-pulse [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 bg-gold-400 rounded-full animate-pulse [animation-delay:0.4s]" />
                    </span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-gold-400/10 bg-obsidian-900/50">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Posez-moi vos questions sur les voyages temporels..."
                  className="flex-1 bg-obsidian-800 border border-gold-400/10 rounded-full px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-400/40 transition-colors"
                />
                <button
                  onClick={sendMessage}
                  disabled={isLoading || !input.trim()}
                  className="w-10 h-10 flex-shrink-0 rounded-full bg-gold-400 hover:bg-gold-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                  aria-label="Envoyer"
                >
                  <Send className="w-4 h-4 text-obsidian-950" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
