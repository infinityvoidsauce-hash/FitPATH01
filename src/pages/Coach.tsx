import { useState, useRef, useEffect } from "react";
import { Send, Mic, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ChatMessage from "@/components/ChatMessage";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: string;
}

const quickPrompts = [
  "Suggest a workout",
  "How to improve form?",
  "Nutrition tips",
  "Recovery advice",
];

const botResponses: Record<string, string> = {
  "suggest a workout": "Based on your recent activity, I recommend a 25-minute HIIT session today! It'll help boost your metabolism and complement your strength training from yesterday. Want me to show you the exercises?",
  "how to improve form": "Great question! Proper form is crucial for results and injury prevention. For squats, focus on: 1) Keep your chest up, 2) Push your knees out over your toes, 3) Go as deep as your mobility allows. Would you like tips for any specific exercise?",
  "nutrition tips": "To maximize your workouts, focus on: 1) Eating protein within 30 mins post-workout (20-30g), 2) Staying hydrated (aim for 3L daily), 3) Complex carbs for energy. What's your current goal - muscle building or fat loss?",
  "recovery advice": "Recovery is when the magic happens! Here's what I recommend: 1) Sleep 7-9 hours, 2) Light stretching or yoga on rest days, 3) Foam rolling for 10 mins, 4) Stay hydrated. How are you currently recovering between sessions?",
};

const getResponse = (input: string): string => {
  const lowerInput = input.toLowerCase();
  
  for (const [key, response] of Object.entries(botResponses)) {
    if (lowerInput.includes(key) || key.includes(lowerInput)) {
      return response;
    }
  }
  
  const defaultResponses = [
    "That's a great question! As your AI fitness coach, I'm here to help you reach your goals. Could you tell me more about what you're looking to achieve?",
    "I love your enthusiasm! 💪 Let me help you with that. What specific aspect of your fitness journey would you like to focus on?",
    "Awesome! I'm analyzing your progress and have some personalized suggestions. What would you like to work on - strength, endurance, or flexibility?",
  ];
  
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
};

const Coach = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hey there! 👋 I'm your AI fitness coach. I'm here to help you crush your fitness goals with personalized workout advice, form tips, and motivation. What can I help you with today?",
      isBot: true,
      timestamp: "Just now",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text?: string) => {
    const messageText = text || inputValue;
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: messageText,
      isBot: false,
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: getResponse(messageText),
        isBot: true,
        timestamp: "Just now",
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)]">
      {/* Header */}
      <header className="px-4 py-4 border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow animate-pulse-glow">
            <Sparkles className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold">AI Fitness Coach</h1>
            <p className="text-sm text-secondary">Online • Ready to help</p>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message.text}
            isBot={message.isBot}
            timestamp={message.timestamp}
          />
        ))}
        
        {isTyping && (
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="bg-card border border-border/50 px-4 py-3 rounded-2xl rounded-tl-none">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts */}
      <div className="px-4 pb-2">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {quickPrompts.map((prompt) => (
            <Button
              key={prompt}
              variant="glass"
              size="sm"
              className="flex-shrink-0 text-xs"
              onClick={() => handleSend(prompt)}
            >
              {prompt}
            </Button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="px-4 pb-4">
        <div className="flex gap-2 items-center bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-2">
          <Input
            placeholder="Ask your AI coach..."
            className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Mic className="w-5 h-5" />
          </Button>
          <Button 
            size="icon" 
            onClick={() => handleSend()}
            disabled={!inputValue.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Coach;
