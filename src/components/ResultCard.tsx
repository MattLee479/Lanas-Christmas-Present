import { Button } from "@/components/ui/button";
import { Gift, ArrowRight } from "lucide-react";

interface ResultCardProps {
  prize: string;
  onContinue: () => void;
}

const ResultCard = ({ prize, onContinue }: ResultCardProps) => {
  return (
    <div className="flex flex-col items-center py-6 md:py-8 px-4 animate-reveal">
      {/* Icon */}
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-champagne/20 flex items-center justify-center mb-4 sm:mb-6 animate-glow-pulse">
        <Gift className="w-8 h-8 sm:w-10 sm:h-10 text-champagne" />
      </div>

      {/* Congratulations text */}
      <p className="text-base sm:text-lg text-muted-foreground mb-2">Congratulations, Lana!</p>
      
      {/* Prize title */}
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground mb-3 sm:mb-4 text-center">
        You've won a
      </h2>
      
      {/* Prize name with accent */}
      <div className="relative mb-6 sm:mb-8">
        <h3 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-primary">
          {prize}
        </h3>
        <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-champagne to-transparent" />
      </div>

      {/* Description */}
      <p className="text-muted-foreground text-center max-w-md mb-6 sm:mb-8 text-base sm:text-lg px-2">
        A luxurious escape designed just for you (and me). Relax, rejuvenate, and let all your worries melt away.
      </p>

      {/* Glass card with details */}
      <div className="glass-card rounded-xl p-5 sm:p-6 mb-6 sm:mb-8 max-w-sm w-full gold-glow">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <span className="text-muted-foreground text-sm sm:text-base">Experience</span>
          <span className="font-semibold text-foreground text-sm sm:text-base">Cotswold Spa Trip</span>
        </div>
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <span className="text-muted-foreground text-sm sm:text-base">Includes</span>
          <span className="font-semibold text-foreground text-sm sm:text-base">Spa + Dinner</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm sm:text-base">Duration</span>
          <span className="font-semibold text-foreground text-sm sm:text-base">One Night Away</span>
        </div>
      </div>

      {/* CTA */}
      <Button variant="hero" onClick={onContinue} className="w-full sm:w-auto">
        View Your Trip
        <ArrowRight className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default ResultCard;
