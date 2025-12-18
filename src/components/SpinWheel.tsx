import { useState } from "react";
import { Button } from "@/components/ui/button";
import Confetti from "@/components/Confetti";

interface SpinWheelProps {
  onComplete: (prize: string) => void;
}

// The predetermined prize - ALWAYS lands on "De Vere Trip" (index 3)
const PREDETERMINED_PRIZE_INDEX = 3;
const PREDETERMINED_PRIZE_NAME = "De Vere Trip";

const PRIZES = [
  "Sea Life Centre",
  "Walk in the Park",
  "Trip to London",
  "De Vere Trip", // Index 3 - This is what we always land on
  "Pottery Painting",
  "Weston-Super-Mare Trip",
]; 

const SEGMENT_COLORS = [
  "hsl(350, 66%, 33%)", // cranberry
  "hsl(151, 42%, 21%)", // evergreen
  "hsl(350, 66%, 33%)", // lighter cranberry
  "hsl(151, 42%, 21%)", // lighter evergreen
  "hsl(350, 66%, 33%)", // cranberry
  "hsl(151, 42%, 21%)", // evergreen
];

const SpinWheel = ({ onComplete }: SpinWheelProps) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    
    // Calculate exact rotation to land on PREDETERMINED_PRIZE_INDEX (Spa Retreat)
    // The wheel has 6 segments, each 60 degrees
    // Pointer is at top (0 degrees), so we need to calculate where segment 3 should stop
    const segmentAngle = 360 / PRIZES.length; // 60 degrees per segment
    
    // To land on segment 3, the center of that segment needs to be at the top
    // Segment 3 center is at: 3 * 60 + 30 = 210 degrees from start
    // So we need to rotate: 360 - 210 = 150 degrees (plus full rotations)
    const targetAngle = 360 - (PREDETERMINED_PRIZE_INDEX * segmentAngle + segmentAngle / 2);
    
    // Add 6 full rotations for dramatic effect (2160 degrees)
    const spins = 6 * 360;
    const finalRotation = rotation + spins + targetAngle;
    
    setRotation(finalRotation);

    // Wait for spin animation to complete
    setTimeout(() => {
      setIsSpinning(false);
      setShowConfetti(true);
      
      // Slight delay before transitioning to result
      setTimeout(() => {
        onComplete(PREDETERMINED_PRIZE_NAME);
      }, 2000);
    }, 4000);
  };

  return (
    <div className="flex flex-col items-center py-6 md:py-8 px-4">
      {showConfetti && <Confetti />}
      
      <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground mb-2 animate-fade-up text-center">
        Spin to Reveal
      </h2>
      <p className="text-muted-foreground mb-6 md:mb-8 animate-fade-up text-center" style={{ animationDelay: "0.1s" }}>
        Your special gift awaits
      </p>

      {/* Wheel Container */}
      <div className="relative mb-6 md:mb-8 animate-fade-up" style={{ animationDelay: "0.2s" }}>
        {/* Pointer */}
        <div className="absolute -top-4 md:-top-5 left-1/2 -translate-x-1/2 z-20">
          <div 
            className="w-0 h-0 border-l-[12px] md:border-l-[14px] border-r-[12px] md:border-r-[14px] border-t-[20px] md:border-t-[24px] border-l-transparent border-r-transparent border-t-champagne"
            style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}
          />
        </div>

        {/* Outer glow ring */}
        <div className="absolute inset-[-10px] md:inset-[-14px] rounded-full bg-gradient-to-r from-champagne/30 via-primary/20 to-champagne/30 animate-pulse" />

        {/* Wheel - BIGGER SIZES */}
        <div
          className="relative w-[300px] h-[300px] sm:w-[340px] sm:h-[340px] md:w-[400px] md:h-[400px] lg:w-[450px] lg:h-[450px] rounded-full shadow-elevated"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning ? "transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)" : "none",
          }}
        >
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-lg">
            {/* Outer ring */}
            <circle cx="100" cy="100" r="99" fill="none" stroke="hsl(40, 60%, 72%)" strokeWidth="2" />
            
            {PRIZES.map((prize, index) => {
              const angle = (360 / PRIZES.length) * index;
              const nextAngle = (360 / PRIZES.length) * (index + 1);
              const midAngle = (angle + nextAngle) / 2;
              
              const startX = 100 + 96 * Math.cos((angle - 90) * Math.PI / 180);
              const startY = 100 + 96 * Math.sin((angle - 90) * Math.PI / 180);
              const endX = 100 + 96 * Math.cos((nextAngle - 90) * Math.PI / 180);
              const endY = 100 + 96 * Math.sin((nextAngle - 90) * Math.PI / 180);
              
              // Position text closer to edge for better readability
              const textRadius = 65;
              const textX = 100 + textRadius * Math.cos((midAngle - 90) * Math.PI / 180);
              const textY = 100 + textRadius * Math.sin((midAngle - 90) * Math.PI / 180);

              // Split long prize names into two lines if needed
              const words = prize.split(' ');
              const hasMultipleWords = words.length > 1;

              return (
                <g key={index}>
                  <path
                    d={`M 100 100 L ${startX} ${startY} A 96 96 0 0 1 ${endX} ${endY} Z`}
                    fill={SEGMENT_COLORS[index]}
                    stroke="hsl(40, 60%, 72%)"
                    strokeWidth="1.5"
                  />
                  {hasMultipleWords ? (
                    // Multi-line text for longer names
                    <text
                      x={textX}
                      y={textY}
                      fill="white"
                      fontSize="6.5"
                      fontWeight="600"
                      textAnchor="middle"
                      transform={`rotate(${midAngle}, ${textX}, ${textY})`}
                      className="font-sans"
                      style={{ textShadow: '0 1px 2px rgba(0,0,0,0.4)' }}
                    >
                      <tspan x={textX} dy="-3">{words[0]}</tspan>
                      <tspan x={textX} dy="7">{words.slice(1).join(' ')}</tspan>
                    </text>
                  ) : (
                    // Single line for short names
                    <text
                      x={textX}
                      y={textY}
                      fill="white"
                      fontSize="7"
                      fontWeight="600"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      transform={`rotate(${midAngle}, ${textX}, ${textY})`}
                      className="font-sans"
                      style={{ textShadow: '0 1px 2px rgba(0,0,0,0.4)' }}
                    >
                      {prize}
                    </text>
                  )}
                </g>
              );
            })}
            
            {/* Center decorative circles */}
            <circle cx="100" cy="100" r="20" fill="hsl(40, 60%, 72%)" />
            <circle cx="100" cy="100" r="16" fill="hsl(40, 33%, 97%)" />
            <circle cx="100" cy="100" r="12" fill="hsl(40, 60%, 72%)" />
            <circle cx="100" cy="100" r="6" fill="hsl(350, 66%, 33%)" />
          </svg>
        </div>

        {/* Animated glow effect */}
        <div 
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            boxShadow: isSpinning 
              ? '0 0 60px hsl(40, 60%, 72%, 0.5)' 
              : '0 0 30px hsl(40, 60%, 72%, 0.3)',
            transition: 'box-shadow 0.3s ease',
          }}
        />
      </div>

      {/* Spin Button */}
      <Button
        variant="hero"
        size="lg"
        onClick={handleSpin}
        disabled={isSpinning}
        className="animate-fade-up w-full sm:w-auto"
        style={{ animationDelay: "0.3s" }}
      >
        {isSpinning ? "Spinning..." : "Spin the Wheel"}
      </Button>
      
      {/* Small note - hidden visually but confirms behavior */}
      <p className="sr-only">
        This wheel is predetermined to always land on {PREDETERMINED_PRIZE_NAME}
      </p>
    </div>
  );
};

export default SpinWheel;