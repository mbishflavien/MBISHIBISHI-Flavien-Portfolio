import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, User, Loader2, Minimize2, Maximize2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const PORTFOLIO_CONTEXT = `
You are the AI Assistant for Flavien Mbishibishi's Portfolio. Your goal is to provide intelligent, helpful, and accurate information about Flavien's professional background, skills, projects, and experience.

Flavien Mbishibishi is a Software Engineer & AI Enthusiast based in Kigali, Rwanda.

Core Expertise:
- Software Engineering
- Artificial Intelligence (AI)
- Full-stack Development
- Data-driven Systems

Work Experience:
- Trainee Software Engineer at A2SV (Dec 2025 – Present): Solving advanced DSA problems (arrays, graphs, DP) and building scalable solutions.
- Big Data Analytics Instructor at AUCA Software Innovation Center (Dec 2025 – Feb 2026): Taught Big Data and ML concepts, mentored projects from collection to deployment.
- Software Development Trainee at The Gym Rwanda (May 2025 – Sep 2025): Web and software development, debugging, and version control.

Education:
- BSc Software Engineering (June 2024 – Present).

Featured Projects:
1. RapidAid AI: Emergency AI voice assistant for immediate healthcare guidance and emergency response. Built with Python, OpenAI API, and Speech Recognition.
2. MediTrack: Health Risk Prediction System using ML (Scikit-learn, Pandas) to predict health risks based on patient data.
3. CareConnect: Healthcare Management System with optimized PL/SQL queries and Oracle database.

Technical Skills:
- Programming: Python (Django, FastAPI, NumPy, Pandas)
- Database: SQL (PostgreSQL, MySQL, Oracle PL/SQL)
- AI: Machine Learning (Scikit-learn, TensorFlow, Hugging Face Transformers)
- Core CS: Data Structures & Algorithms
- DevOps: Linux/Bash, Git

Certifications:
- Hugging Face NLP Specialization
- Cisco Networking Basics
- Introduction to Network Operations (Internet Society)
- The Gym Certification (Software Engineering)

Contact Information:
- Email: flavmbish@gmail.com
- LinkedIn: linkedin.com/in/mbishibishi-flavien-4120a52b8
- GitHub: github.com/mbishflavien
- Medium: medium.com/@flavmbish

Guidelines for your responses:
- Be professional, friendly, and concise.
- Always speak in the first person when representing the portfolio assistant (e.g., "Flavien has experience in...").
- If asked about something not in the portfolio, politely redirect the user to Flavien's contact information.
- Highlight Flavien's passion for the intersection of healthcare and technology.
- You can answer in English, Swahili, Kinyarwanda, or French as the portfolio supports these languages.
`;

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hi! I'm Flavien's AI assistant. How can I help you learn more about his work today?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, isOpen, isMinimized]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      
      const chatHistory = messages.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }));

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          ...chatHistory,
          { role: 'user', parts: [{ text: userMessage }] }
        ],
        config: {
          systemInstruction: PORTFOLIO_CONTEXT,
          temperature: 0.7,
        }
      });

      const aiResponse = response.text || "I'm sorry, I couldn't process that request.";
      setMessages(prev => [...prev, { role: 'model', text: aiResponse }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "I'm having a bit of trouble connecting right now. Please try again or contact Flavien directly!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              height: isMinimized ? '64px' : '500px',
              width: '350px'
            }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={cn(
              "bg-background border border-primary/20 rounded-3xl shadow-2xl overflow-hidden flex flex-col mb-4",
              isMinimized && "rounded-full"
            )}
          >
            {/* Header */}
            <div className="p-4 bg-primary text-primary-foreground flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold">Portfolio Assistant</h3>
                  {!isMinimized && <p className="text-[10px] opacity-80">Online & ready to help</p>}
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-full hover:bg-white/10"
                  onClick={() => setIsMinimized(!isMinimized)}
                >
                  {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-full hover:bg-white/10"
                  onClick={() => setIsOpen(false)}
                >
                  <X size={16} />
                </Button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <ScrollArea ref={scrollRef} className="flex-1 p-4 space-y-4">
                  <div className="space-y-4 pb-4">
                    {messages.map((msg, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: msg.role === 'user' ? 10 : -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={cn(
                          "flex items-start space-x-2 max-w-[85%]",
                          msg.role === 'user' ? "ml-auto flex-row-reverse space-x-reverse" : "mr-auto"
                        )}
                      >
                        <div className={cn(
                          "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1",
                          msg.role === 'user' ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                        )}>
                          {msg.role === 'user' ? <User size={12} /> : <Bot size={12} />}
                        </div>
                        <div className={cn(
                          "p-3 rounded-2xl text-sm leading-relaxed",
                          msg.role === 'user' 
                            ? "bg-primary text-primary-foreground rounded-tr-none" 
                            : "bg-muted text-foreground rounded-tl-none"
                        )}>
                          {msg.text}
                        </div>
                      </motion.div>
                    ))}
                    {isLoading && (
                      <div className="flex items-start space-x-2 mr-auto max-w-[85%]">
                        <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-1">
                          <Bot size={12} />
                        </div>
                        <div className="bg-muted p-3 rounded-2xl rounded-tl-none">
                          <Loader2 className="w-4 h-4 animate-spin text-primary" />
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                {/* Input */}
                <div className="p-4 border-t bg-muted/10">
                  <form 
                    onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask about Flavien..."
                      className="flex-1 bg-background border border-primary/10 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                    <Button 
                      type="submit" 
                      size="icon" 
                      disabled={!input.trim() || isLoading}
                      className="rounded-full h-9 w-9 shrink-0"
                    >
                      <Send size={16} />
                    </Button>
                  </form>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          setIsOpen(true);
          setIsMinimized(false);
        }}
        className={cn(
          "w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-2xl flex items-center justify-center transition-all duration-300",
          isOpen && "scale-0 opacity-0 pointer-events-none"
        )}
      >
        <MessageSquare size={24} />
      </motion.button>
    </div>
  );
};
