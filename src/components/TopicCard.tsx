import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface TopicCardProps {
  title: string;
  description: string;
  onVote: () => void;
}

const TopicCard = ({ title, description, onVote }: TopicCardProps) => {
  const [isActive, setIsActive] = useState(false);
  const [votes, setVotes] = useState(0);

  const handleVote = () => {
    setIsActive(!isActive);
    setVotes((prev) => (isActive ? prev - 1 : prev + 1));
    onVote();
  };

  return (
    <Card
      className={`p-6 transition-all duration-300 hover:shadow-card-hover cursor-pointer ${
        isActive ? "ring-2 ring-accent border-accent" : "border-border"
      }`}
    >
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        <div className="flex items-center justify-between">
          <Button
            onClick={handleVote}
            variant={isActive ? "default" : "outline"}
            className="transition-all duration-200"
          >
            {isActive ? "Voted" : "Vote"}
          </Button>
          
          {votes > 0 && (
            <span className="text-sm text-muted-foreground animate-fade-in">
              {votes} {votes === 1 ? "vote" : "votes"}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
};

export default TopicCard;
