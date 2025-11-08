import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
interface Message {
  id: number;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
  username: string;
}
interface ChatSidebarProps {
  username: string;
  onMessagesChange?: (messages: Message[]) => void;
}

export type { Message };
const ChatSidebar = ({
  username,
  onMessagesChange
}: ChatSidebarProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const handleSend = () => {
    if (inputValue.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: inputValue,
        sender: "user",
        timestamp: new Date(),
        username: username
      };
      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);
      setInputValue("");
      onMessagesChange?.(updatedMessages);
    }
  };
  return <div className="flex flex-col h-full bg-card border-l border-border">
      <div className="p-4 border-b border-border">
        <h2 className="font-semibold text-foreground">Community Chat</h2>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map(message => <div key={message.id} className={`flex ${message.sender === "user" ? "justify-start" : "justify-end"} animate-fade-in`}>
              <div className={`max-w-[80%] p-3 rounded-lg ${message.sender === "user" ? "bg-secondary text-secondary-foreground" : "bg-accent text-accent-foreground"}`}>
                <p className="text-xs font-semibold mb-1 opacity-80">{message.username}</p>
                <p className="text-sm">{message.text}</p>
                <span className="text-xs opacity-70 mt-1 block">
                  {message.timestamp.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
              })}
                </span>
              </div>
            </div>)}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Input value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyPress={e => e.key === "Enter" && handleSend()} placeholder="Type your message..." className="flex-1" />
          <Button onClick={handleSend} size="icon" className="shrink-0">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>;
};
export default ChatSidebar;