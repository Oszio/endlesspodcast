import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface TopicCardProps {
  title: string;
  description: string;
  isVoted?: boolean;
  disabled?: boolean;
  onVote: () => void;
}

const TopicCard = ({ title, description, isVoted = false, disabled = false, onVote }: TopicCardProps) => {
  const [votes, setVotes] = useState(0);

  const handleVote = () => {
    if (disabled) return;
    onVote();
    if (!isVoted) {
      setVotes((prev) => prev + 1);
    }
  };

  return (
    <Card
      className={`p-6 transition-all duration-300 hover:shadow-card-hover flex flex-col ${
        isVoted ? "ring-2 ring-accent border-accent" : "border-border"
      } ${disabled ? "opacity-50" : ""}`}
    >
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="flex items-center justify-between mt-4">
        <Button
          onClick={handleVote}
          variant={isVoted ? "default" : "outline"}
          disabled={disabled}
          className="transition-all duration-200"
        >
          {isVoted ? "Remove" : "Vote"}
        </Button>
        
        {votes > 0 && (
          <span className="text-sm text-muted-foreground animate-fade-in">
            {votes} {votes === 1 ? "vote" : "votes"}
          </span>
        )}
      </div>
    </Card>
  );
};

export default TopicCard;
