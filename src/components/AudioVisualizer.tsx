import { useEffect, useState } from "react";

interface AudioVisualizerProps {
  isActive?: boolean;
  barCount?: number;
}

const AudioVisualizer = ({ isActive = true, barCount = 40 }: AudioVisualizerProps) => {
  const [bars, setBars] = useState<number[]>(Array(barCount).fill(20));

  useEffect(() => {
    if (!isActive) {
      setBars(Array(barCount).fill(20));
      return;
    }

    const interval = setInterval(() => {
      setBars(prev => 
        prev.map((_, i) => {
          // Create wave-like pattern
          const wave = Math.sin((Date.now() / 200) + (i / 3)) * 30 + 40;
          const randomVariation = Math.random() * 20;
          return Math.max(10, wave + randomVariation);
        })
      );
    }, 50);

    return () => clearInterval(interval);
  }, [isActive, barCount]);

  const getBarColor = (index: number) => {
    const position = index / barCount;
    if (position < 0.25) return "hsl(45, 90%, 55%)"; // Yellow
    if (position < 0.5) return "hsl(30, 90%, 60%)"; // Orange
    if (position < 0.75) return "hsl(340, 80%, 60%)"; // Pink
    return "hsl(240, 60%, 65%)"; // Blue
  };

  return (
    <div className="flex items-center justify-center gap-1 h-32">
      {bars.map((height, i) => (
        <div
          key={i}
          className="w-1 rounded-full transition-all duration-75 ease-out"
          style={{
            height: `${height}%`,
            backgroundColor: getBarColor(i),
            opacity: 0.8,
          }}
        />
      ))}
    </div>
  );
};

export default AudioVisualizer;
