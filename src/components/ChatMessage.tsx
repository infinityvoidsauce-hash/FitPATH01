import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  message: string;
  isBot: boolean;
  timestamp?: string;
}

const ChatMessage = ({ message, isBot, timestamp }: ChatMessageProps) => {
  return (
    <div className={`flex gap-3 ${isBot ? "" : "flex-row-reverse"} animate-slide-up`}>
      <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
        isBot 
          ? "bg-gradient-primary shadow-glow" 
          : "bg-muted"
      }`}>
        {isBot ? (
          <Bot className="w-5 h-5 text-primary-foreground" />
        ) : (
          <User className="w-5 h-5 text-muted-foreground" />
        )}
      </div>
      
      <div className={`max-w-[75%] ${isBot ? "" : "text-right"}`}>
        <div className={`inline-block px-4 py-3 rounded-2xl ${
          isBot 
            ? "bg-card border border-border/50 rounded-tl-none" 
            : "bg-gradient-primary text-primary-foreground rounded-tr-none"
        }`}>
          <p className="text-sm leading-relaxed">{message}</p>
        </div>
        {timestamp && (
          <p className="text-xs text-muted-foreground mt-1 px-1">{timestamp}</p>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
