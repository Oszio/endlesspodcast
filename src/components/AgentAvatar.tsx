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
          {name === "Agent A" ? (
            <svg width="50" height="57" viewBox="0 0 50 57" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-foreground">
              <path d="M2.08704 35.5021C0.983861 35.4601 0.0546573 36.3198 0.0118408 37.423C-0.0816146 39.8528 0.359815 43.6135 1.97083 47.2374C3.59665 50.8944 6.47635 54.5319 11.299 56.3693C12.3311 56.7622 13.4868 56.2441 13.88 55.212C14.2729 54.18 13.7547 53.0242 12.7228 52.631C9.14597 51.2682 6.94084 48.5719 5.62512 45.6124C4.29506 42.6203 3.93576 39.4805 4.00891 37.5773C4.05112 36.4737 3.19064 35.5445 2.08704 35.5021ZM24.7833 1.09484C24.283 0.110519 23.0794 -0.282934 22.0948 0.216908C21.1104 0.717003 20.7174 1.92076 21.2169 2.90538L35.9894 31.9864L21.1622 34.5284C20.0739 34.7151 19.3422 35.7496 19.5284 36.838C19.7151 37.9266 20.7495 38.6582 21.838 38.4718L39.338 35.4718C39.9642 35.3644 40.5021 34.9653 40.7872 34.3976C41.0721 33.8301 41.0708 33.161 40.7833 32.5948L24.7833 1.09484ZM45.5001 4.50011C43.0151 4.50043 41.0003 8.08224 41.0001 12.5001C41.0001 16.9182 43.015 20.4998 45.5001 20.5001C47.9854 20.5001 50.0001 16.9184 50.0001 12.5001C50 8.08204 47.9853 4.50011 45.5001 4.50011ZM12.5001 4.50011C10.0151 4.50043 8.00026 8.08224 8.00012 12.5001C8.00012 16.9182 10.015 20.4998 12.5001 20.5001C14.9854 20.5001 17.0001 16.9184 17.0001 12.5001C17 8.08204 14.9853 4.50011 12.5001 4.50011Z" fill="currentColor"/>
            </svg>
          ) : (
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
          )}
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
