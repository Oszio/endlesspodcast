import { useEffect, useState, useRef } from "react";

interface AudioVisualizerProps {
  isActive?: boolean;
  barCount?: number;
  audioSrc?: string;
  onVolumeChange?: (volume: number) => void;
}

const AudioVisualizer = ({ isActive = true, barCount = 40, audioSrc, onVolumeChange }: AudioVisualizerProps) => {
  const [bars, setBars] = useState<number[]>(Array(barCount).fill(20));
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    if (!isActive) {
      setBars(Array(barCount).fill(20));
      if (audioElementRef.current) {
        audioElementRef.current.pause();
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    if (audioSrc) {
      // Initialize Web Audio API for real audio analysis
      const setupAudioAnalysis = async () => {
        try {
          audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
          analyserRef.current = audioContextRef.current.createAnalyser();
          analyserRef.current.fftSize = 256;
          analyserRef.current.smoothingTimeConstant = 0.8;

          audioElementRef.current = new Audio(audioSrc);
          audioElementRef.current.loop = true;
          audioElementRef.current.crossOrigin = "anonymous";
          
          const source = audioContextRef.current.createMediaElementSource(audioElementRef.current);
          source.connect(analyserRef.current);
          analyserRef.current.connect(audioContextRef.current.destination);

          await audioElementRef.current.play();

          const bufferLength = analyserRef.current.frequencyBinCount;
          const dataArray = new Uint8Array(bufferLength);

          const updateBars = () => {
            if (!analyserRef.current || !isActive) return;

            analyserRef.current.getByteFrequencyData(dataArray);

            // Calculate average volume for avatar scaling
            let sum = 0;
            for (let i = 0; i < bufferLength; i++) {
              sum += dataArray[i];
            }
            const averageVolume = sum / bufferLength / 255;
            if (onVolumeChange) {
              onVolumeChange(averageVolume);
            }

            // Map frequency bins to bars using the full spectrum
            const newBars = Array(barCount).fill(0).map((_, i) => {
              // Map bar index to frequency bin index across full spectrum
              const binIndex = Math.floor((i / barCount) * bufferLength);
              const value = dataArray[binIndex];
              // Amplify the values for better visualization
              const amplified = (value / 255) * 120;
              return Math.max(10, Math.min(100, amplified));
            });

            setBars(newBars);
            animationFrameRef.current = requestAnimationFrame(updateBars);
          };

          updateBars();
        } catch (error) {
          console.error("Error setting up audio analysis:", error);
          // Fallback to animated pattern
          fallbackAnimation();
        }
      };

      setupAudioAnalysis();
    } else {
      // Fallback animated pattern when no audio source
      fallbackAnimation();
    }

    function fallbackAnimation() {
      const interval = setInterval(() => {
        setBars(prev => 
          prev.map((_, i) => {
            const wave = Math.sin((Date.now() / 200) + (i / 3)) * 30 + 40;
            const randomVariation = Math.random() * 20;
            return Math.max(10, wave + randomVariation);
          })
        );
      }, 50);

      return () => clearInterval(interval);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioElementRef.current) {
        audioElementRef.current.pause();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [isActive, barCount, audioSrc]);

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
