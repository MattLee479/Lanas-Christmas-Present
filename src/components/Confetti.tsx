import { useEffect, useState } from "react";

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  size: number;
  velocity: { x: number; y: number };
  rotationSpeed: number;
  shape: 'circle' | 'square' | 'star' | 'ribbon';
  delay: number;
}

const COLORS = [
  "hsl(350, 66%, 33%)",  // cranberry
  "hsl(350, 66%, 45%)",  // lighter cranberry
  "hsl(151, 42%, 21%)",  // evergreen
  "hsl(151, 42%, 35%)",  // lighter evergreen
  "hsl(40, 60%, 72%)",   // champagne
  "hsl(40, 80%, 80%)",   // bright gold
  "hsl(40, 33%, 97%)",   // ivory
];

const Confetti = () => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number; delay: number }[]>([]);

  useEffect(() => {
    // Main confetti burst
    const confetti: ConfettiPiece[] = Array.from({ length: 100 }, (_, i) => {
      const angle = (Math.random() * Math.PI * 2);
      const velocity = 8 + Math.random() * 12;
      const shapes: ('circle' | 'square' | 'star' | 'ribbon')[] = ['circle', 'square', 'star', 'ribbon'];
      
      return {
        id: i,
        x: 50 + (Math.random() - 0.5) * 20,
        y: 40,
        rotation: Math.random() * 360,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 6 + Math.random() * 10,
        velocity: {
          x: Math.cos(angle) * velocity,
          y: Math.sin(angle) * velocity - 5,
        },
        rotationSpeed: (Math.random() - 0.5) * 20,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        delay: Math.random() * 0.3,
      };
    });

    // Sparkle effects
    const sparkleEffects = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: 30 + Math.random() * 40,
      y: 30 + Math.random() * 30,
      delay: Math.random() * 0.5,
    }));

    setPieces(confetti);
    setSparkles(sparkleEffects);

    const timeout = setTimeout(() => {
      setPieces([]);
      setSparkles([]);
    }, 4000);

    return () => clearTimeout(timeout);
  }, []);

  const renderShape = (piece: ConfettiPiece) => {
    switch (piece.shape) {
      case 'star':
        return (
          <svg width={piece.size} height={piece.size} viewBox="0 0 24 24" fill={piece.color}>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        );
      case 'ribbon':
        return (
          <div
            style={{
              width: piece.size * 0.3,
              height: piece.size * 1.5,
              backgroundColor: piece.color,
              borderRadius: '2px',
            }}
          />
        );
      case 'square':
        return (
          <div
            style={{
              width: piece.size,
              height: piece.size,
              backgroundColor: piece.color,
              borderRadius: '2px',
            }}
          />
        );
      default:
        return (
          <div
            style={{
              width: piece.size,
              height: piece.size,
              backgroundColor: piece.color,
              borderRadius: '50%',
            }}
          />
        );
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {/* Main confetti pieces */}
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute"
          style={{
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            transform: `rotate(${piece.rotation}deg)`,
            animation: `confetti-burst 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`,
            animationDelay: `${piece.delay}s`,
            ['--vx' as string]: `${piece.velocity.x}vw`,
            ['--vy' as string]: `${piece.velocity.y}vh`,
            ['--rotation' as string]: `${piece.rotationSpeed * 20}deg`,
          }}
        >
          {renderShape(piece)}
        </div>
      ))}

      {/* Sparkle effects */}
      {sparkles.map((sparkle) => (
        <div
          key={`sparkle-${sparkle.id}`}
          className="absolute"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            animation: `sparkle 0.8s ease-out forwards`,
            animationDelay: `${sparkle.delay}s`,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="hsl(40, 80%, 80%)">
            <path d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10L12 0Z" />
          </svg>
        </div>
      ))}

      {/* Center burst glow */}
      <div
        className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(40, 60%, 72%, 0.6) 0%, transparent 70%)',
          animation: 'glow-burst 0.5s ease-out forwards',
        }}
      />

      <style>{`
        @keyframes confetti-burst {
          0% {
            transform: translate(0, 0) rotate(0deg) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
          100% {
            transform: translate(var(--vx), calc(var(--vy) + 60vh)) rotate(var(--rotation)) scale(0.5);
            opacity: 0;
          }
        }

        @keyframes sparkle {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.5) rotate(90deg);
            opacity: 1;
          }
          100% {
            transform: scale(0) rotate(180deg);
            opacity: 0;
          }
        }

        @keyframes glow-burst {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Confetti;
