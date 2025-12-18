import { useEffect, useState, useRef } from "react";

interface Snowflake {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
  drift: number;
}

const SnowParticles = () => {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const flakes: Snowflake[] = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 15,
      duration: 12 + Math.random() * 10,
      size: 2 + Math.random() * 6,
      opacity: 0.2 + Math.random() * 0.6,
      drift: -20 + Math.random() * 40,
    }));
    setSnowflakes(flakes);
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute rounded-full"
          style={{
            left: `${flake.left}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            opacity: flake.opacity,
            background: `radial-gradient(circle, hsl(40, 60%, 90%) 0%, hsl(40, 60%, 72%) 100%)`,
            boxShadow: flake.size > 4 ? `0 0 ${flake.size * 2}px hsl(40, 60%, 72%, 0.3)` : 'none',
            animation: `snowfall ${flake.duration}s linear infinite`,
            animationDelay: `${flake.delay}s`,
            ['--drift' as string]: `${flake.drift}px`,
          }}
        />
      ))}
      <style>{`
        @keyframes snowfall {
          0% {
            transform: translateY(-20px) translateX(0) rotate(0deg);
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          50% {
            transform: translateY(50vh) translateX(var(--drift)) rotate(180deg);
          }
          95% {
            opacity: 1;
          }
          100% {
            transform: translateY(105vh) translateX(calc(var(--drift) * -1)) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default SnowParticles;
