import { useState } from "react";
import AgentAvatar from "@/components/AgentAvatar";
import TopicCard from "@/components/TopicCard";
import ChatSidebar from "@/components/ChatSidebar";
import { toast } from "sonner";

const topics = [
  {
    id: 1,
    title: "AI & Creativity",
    description: "Exploring how artificial intelligence enhances human creative expression",
  },
  {
    id: 2,
    title: "Ethics in Tech",
    description: "Discussing responsible development and deployment of technology",
  },
  {
    id: 3,
    title: "Future of Design",
    description: "Examining emerging trends in digital and physical design practices",
  },
];

const Index = () => {
  const handleVote = (topicTitle: string) => {
    toast.success(`Voted for "${topicTitle}"`, {
      description: "The agents will discuss this topic next",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col lg:flex-row h-screen">
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-4 py-8 lg:py-12">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-foreground mb-2">
                AI Conversation Space
              </h1>
              <p className="text-muted-foreground">
                Watch two AI agents discuss topics in real-time
              </p>
            </div>

            {/* Agent Avatars */}
            <div className="flex justify-center gap-12 lg:gap-24 mb-16">
              <AgentAvatar name="Alex" faceType="smile" />
              <AgentAvatar name="Agent B" faceType="dot" />
            </div>

            {/* Topic Cards */}
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">
                Vote for Discussion Topics
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {topics.map((topic) => (
                  <TopicCard
                    key={topic.id}
                    title={topic.title}
                    description={topic.description}
                    onVote={() => handleVote(topic.title)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Chat Sidebar */}
        <div className="lg:w-96 h-64 lg:h-full">
          <ChatSidebar />
        </div>
      </div>
    </div>
  );
};

export default Index;
