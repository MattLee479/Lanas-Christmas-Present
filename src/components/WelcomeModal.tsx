import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface WelcomeModalProps {
  onContinue: () => void;
}

const WelcomeModal = ({ onContinue }: WelcomeModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm" />
      
      {/* Modal Card */}
      <div className="relative glass-card rounded-2xl p-6 sm:p-8 md:p-12 max-w-sm sm:max-w-md w-full text-center animate-reveal gold-glow">
        {/* Decorative top accent */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 sm:w-16 h-1 bg-gradient-to-r from-transparent via-champagne to-transparent rounded-full" />
        
        {/* Icon */}
        <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-champagne/20 flex items-center justify-center mb-4 sm:mb-6 animate-glow-pulse">
          <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-champagne" />
        </div>
        
        {/* Content */}
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground mb-2 sm:mb-3">
          Welcome, <span className="text-primary">Lana</span>
        </h1>
        
        <p className="text-lg sm:text-xl text-muted-foreground font-light mb-6 sm:mb-8">
          Your Present Awaits
        </p>
        
        {/* Decorative line */}
        <div className="w-20 sm:w-24 h-px bg-gradient-to-r from-transparent via-champagne to-transparent mx-auto mb-6 sm:mb-8" />
        
        {/* CTA */}
        <Button 
          variant="hero" 
          onClick={onContinue}
          className="w-full"
        >
          <Sparkles className="w-5 h-5" />
          Discover Your Surprise
        </Button>
        
        {/* Bottom decorative accent */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-12 sm:w-16 h-1 bg-gradient-to-r from-transparent via-champagne to-transparent rounded-full" />
      </div>
    </div>
  );
};

export default WelcomeModal;
