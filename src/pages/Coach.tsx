import { useState, useRef, useEffect } from "react";
import { Send, Mic, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import ChatMessage from "@/components/ChatMessage";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: string;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const quickPrompts = [
  "Suggest a workout for today",
  "How can I improve my squat form?",
  "Give me nutrition tips for muscle gain",
  "What's the best recovery routine?",
];

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/fitness-coach`;

async function streamChat({
  messages,
  onDelta,
  onDone,
  onError,
}: {
  messages: ChatMessage[];
  onDelta: (deltaText: string) => void;
  onDone: () => void;
  onError: (error: string) => void;
}) {
  const resp = await fetch(CHAT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ messages }),
  });

  if (!resp.ok) {
    const errorData = await resp.json().catch(() => ({ error: "Failed to connect to AI coach" }));
    onError(errorData.error || "Failed to get response");
    return;
  }

  if (!resp.body) {
    onError("No response body");
    return;
  }

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let textBuffer = "";
  let streamDone = false;

  while (!streamDone) {
    const { done, value } = await reader.read();
    if (done) break;
    textBuffer += decoder.decode(value, { stream: true });

    let newlineIndex: number;
    while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
      let line = textBuffer.slice(0, newlineIndex);
      textBuffer = textBuffer.slice(newlineIndex + 1);

      if (line.endsWith("\r")) line = line.slice(0, -1);
      if (line.startsWith(":") || line.trim() === "") continue;
      if (!line.startsWith("data: ")) continue;

      const jsonStr = line.slice(6).trim();
      if (jsonStr === "[DONE]") {
        streamDone = true;
        break;
      }

      try {
        const parsed = JSON.parse(jsonStr);
        const content = parsed.choices?.[0]?.delta?.content as string | undefined;
        if (content) onDelta(content);
      } catch {
        textBuffer = line + "\n" + textBuffer;
        break;
      }
    }
  }

  if (textBuffer.trim()) {
    for (let raw of textBuffer.split("\n")) {
      if (!raw) continue;
      if (raw.endsWith("\r")) raw = raw.slice(0, -1);
      if (raw.startsWith(":") || raw.trim() === "") continue;
      if (!raw.startsWith("data: ")) continue;
      const jsonStr = raw.slice(6).trim();
      if (jsonStr === "[DONE]") continue;
      try {
        const parsed = JSON.parse(jsonStr);
        const content = parsed.choices?.[0]?.delta?.content as string | undefined;
        if (content) onDelta(content);
      } catch { /* ignore partial leftovers */ }
    }
  }

  onDone();
}

const Coach = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hey there! 👋 I'm your AI fitness coach powered by real AI. I'm here to help you crush your fitness goals with personalized workout advice, form tips, nutrition guidance, and motivation. What can I help you with today?",
      isBot: true,
      timestamp: "Just now",
    },
  ]);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
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
    if (!messageText.trim() || isTyping) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: messageText,
      isBot: false,
      timestamp: "Just now",
    };

    const newChatHistory: ChatMessage[] = [...chatHistory, { role: "user", content: messageText }];
    
    setMessages((prev) => [...prev, userMessage]);
    setChatHistory(newChatHistory);
    setInputValue("");
    setIsTyping(true);

    let assistantContent = "";
    
    const updateAssistantMessage = (chunk: string) => {
      assistantContent += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.isBot && last.id === messages.length + 2) {
          return prev.map((m, i) => 
            i === prev.length - 1 ? { ...m, text: assistantContent } : m
          );
        }
        return [...prev, {
          id: messages.length + 2,
          text: assistantContent,
          isBot: true,
          timestamp: "Just now",
        }];
      });
    };

    try {
      await streamChat({
        messages: newChatHistory,
        onDelta: updateAssistantMessage,
        onDone: () => {
          setIsTyping(false);
          setChatHistory((prev) => [...prev, { role: "assistant", content: assistantContent }]);
        },
        onError: (error) => {
          setIsTyping(false);
          toast({
            title: "Error",
            description: error,
            variant: "destructive",
          });
        },
      });
    } catch (error) {
      setIsTyping(false);
      toast({
        title: "Connection Error",
        description: "Failed to connect to AI coach. Please try again.",
        variant: "destructive",
      });
    }
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
