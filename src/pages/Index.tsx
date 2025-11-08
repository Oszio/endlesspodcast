import { useState, useEffect } from "react";
import AgentAvatar from "@/components/AgentAvatar";
import AudioVisualizer from "@/components/AudioVisualizer";
import TopicCard from "@/components/TopicCard";
import ChatSidebar, { type Message } from "@/components/ChatSidebar";
import UsernamePrompt from "@/components/UsernamePrompt";
import { toast } from "sonner";
import { fetchTopicSuggestions, type Topic } from "@/lib/api";


const Index = () => {
  const [username, setUsername] = useState<string>("");
  const [showPrompt, setShowPrompt] = useState(true);
  const [votedTopicId, setVotedTopicId] = useState<number | null>(null);
  const [audioVolume, setAudioVolume] = useState<number>(0);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoadingTopics, setIsLoadingTopics] = useState(false);
  
  const handleUsernameSubmit = (newUsername: string) => {
    setUsername(newUsername);
    setShowPrompt(false);
  };
  
  const handleVote = (topicId: number, topicTitle: string) => {
    if (votedTopicId === topicId) {
      setVotedTopicId(null);
      toast.info(`Removed vote for "${topicTitle}"`);
    } else {
      setVotedTopicId(topicId);
      toast.success(`Voted for "${topicTitle}"`, {
        description: "The agents will discuss this topic next",
      });
    }
  };

  const handleVolumeChange = (volume: number) => {
    setAudioVolume(volume);
  };

  const handleMessagesChange = async (newMessages: Message[]) => {
    setMessages(newMessages);
    setIsLoadingTopics(true);
    
    const chatMessages = newMessages.map(msg => ({
      text: msg.text,
      sender: msg.username,
      timestamp: msg.timestamp.toISOString(),
    }));
    
    const newTopics = await fetchTopicSuggestions(chatMessages);
    if (newTopics.length > 0) {
      setTopics(newTopics);
      toast.info("Topic suggestions updated based on conversation");
    }
    setIsLoadingTopics(false);
  };
  return (
    <div className="min-h-screen bg-background">
      <UsernamePrompt open={showPrompt} onSubmit={handleUsernameSubmit} />
      <div className="flex flex-col lg:flex-row h-screen">
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-4 py-8 lg:py-12">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-foreground mb-2">The Endless Podcast</h1>
              <p className="text-muted-foreground">Watch two AI agents discuss topics in real-time</p>
            </div>

            {/* Agent Avatars with Audio Visualizer */}
            <div className="max-w-5xl mx-auto mb-16">
              <div className="flex justify-center items-center gap-4 lg:gap-8">
                <AgentAvatar name="Alex" faceType="smile" isActive={true} volume={audioVolume} />
                <div className="flex-1 max-w-xs">
                  <AudioVisualizer isActive={true} barCount={40} onVolumeChange={handleVolumeChange} />
                </div>
                <AgentAvatar name="Mira" faceType="dot" isActive={false} volume={0} />
              </div>
            </div>

            {/* Topic Cards */}
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">
                {isLoadingTopics ? "Generating topic suggestions..." : "Vote for the next topic:"}
              </h2>
              {topics.length === 0 ? (
                <p className="text-center text-muted-foreground">
                  Start a conversation to see AI-generated topic suggestions
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {topics.map((topic) => (
                    <TopicCard
                      key={topic.id}
                      title={topic.title}
                      description={topic.description}
                      isVoted={votedTopicId === topic.id}
                      disabled={votedTopicId !== null && votedTopicId !== topic.id}
                      onVote={() => handleVote(topic.id, topic.title)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Chat Sidebar */}
        <div className="lg:w-96 h-64 lg:h-full">
          <ChatSidebar username={username} onMessagesChange={handleMessagesChange} />
        </div>
      </div>
    </div>
  );
};
export default Index;
