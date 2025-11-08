import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface UsernamePromptProps {
  open: boolean;
  onSubmit: (username: string) => void;
}

const UsernamePrompt = ({ open, onSubmit }: UsernamePromptProps) => {
  const [username, setUsername] = useState("");

  const handleSubmit = () => {
    if (username.trim()) {
      onSubmit(username.trim());
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Welcome to the Conversation</DialogTitle>
          <DialogDescription>
            Choose a username to join the community chat
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="Enter your username..."
              autoFocus
              maxLength={20}
            />
          </div>
          <Button 
            onClick={handleSubmit} 
            className="w-full"
            disabled={!username.trim()}
          >
            Join the Conversation
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UsernamePrompt;
