import { useState } from "react";

interface AgentAvatarProps {
  name: string;
  faceType: "smile" | "dot";
}

const AgentAvatar = ({ name, faceType }: AgentAvatarProps) => {
  const [reactions, setReactions] = useState({ heart: 0, thumbsDown: 0, laugh: 0 });

  const handleReaction = (type: keyof typeof reactions) => {
    setReactions((prev) => ({ ...prev, [type]: prev[type] + 1 }));
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <div className="w-32 h-32 rounded-full bg-agent-bg border-2 border-border flex items-center justify-center overflow-hidden transition-transform hover:scale-105 duration-300">
          <svg width="80" height="80" viewBox="0 0 80 80" className="text-foreground">
            {/* Eyes */}
            <circle cx="28" cy="32" r="3" fill="currentColor" />
            <circle cx="52" cy="32" r="3" fill="currentColor" />
            
            {/* Mouth */}
            {faceType === "smile" ? (
              <path
                d="M 25 48 Q 40 58 55 48"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
            ) : (
              <circle cx="40" cy="50" r="2" fill="currentColor" />
            )}
          </svg>
        </div>
      </div>
      
      <div className="text-center">
        <p className="font-medium text-foreground">{name}</p>
      </div>

      <div className="flex gap-2">
        {[
          { emoji: "❤️", type: "heart" as const },
          { emoji: "👎", type: "thumbsDown" as const },
          { emoji: "😂", type: "laugh" as const },
        ].map(({ emoji, type }) => (
          <button
            key={type}
            onClick={() => handleReaction(type)}
            className="group relative px-3 py-2 rounded-lg bg-card border border-border hover:bg-reaction-hover hover:border-accent transition-all duration-200 hover:scale-110"
          >
            <span className="text-xl">{emoji}</span>
            {reactions[type] > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium animate-scale-in">
                {reactions[type]}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AgentAvatar;
