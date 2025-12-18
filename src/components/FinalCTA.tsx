import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, ExternalLink } from "lucide-react";

const FinalCTA = () => {
  return (
    <div className="py-8 sm:py-12 px-4 animate-fade-up">
      <div className="max-w-lg mx-auto text-center">
        {/* Decorative element */}
        <div className="flex justify-center gap-2 mb-4 sm:mb-6">
          <div className="w-6 sm:w-8 h-px bg-champagne mt-3" />
          <span className="text-champagne text-xl sm:text-2xl">✨</span>
          <div className="w-6 sm:w-8 h-px bg-champagne mt-3" />
        </div>

        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground mb-2 sm:mb-3">
          Ready When You Are
        </h2>
        <p className="text-muted-foreground text-base sm:text-lg mb-6 sm:mb-8">
          Your spa escape is just one click away
        </p>

        {/* Details card */}
        <div className="glass-card rounded-xl sm:rounded-2xl p-6 sm:p-8 mb-6 sm:mb-8 gold-glow">
          <div className="space-y-3 sm:space-y-4 text-left">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-muted-foreground">Location</p>
                <p className="font-medium text-foreground text-sm sm:text-base truncate">De Vere - Cotswolds Water Park</p>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-muted-foreground">Availability</p>
                <p className="font-medium text-foreground text-sm sm:text-base">Choose Your Preferred Date</p>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-champagne/20 flex items-center justify-center flex-shrink-0">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-champagne" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-muted-foreground">Duration</p>
                <p className="font-medium text-foreground text-sm sm:text-base">One Night Stay</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-3 sm:space-y-4">
          <a
  href="https://www.devere.co.uk/cotswold-water-park-hotel"
  target="_blank"
  rel="noopener noreferrer"
>
  <Button variant="hero" size="lg" className="w-full gap-2">
    Book It Now
    <ExternalLink className="w-5 h-5" />
  </Button>
</a>

          
          <p className="text-xs sm:text-sm text-muted-foreground">
            This gift was lovingly prepared just for you 💝
          </p>
        </div>

        {/* Footer */}
        <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-border/50">
          <p className="font-display text-lg sm:text-xl text-foreground mt-2">
            Merry Christmas, Lana
          </p>
          <p className="font-display text-lg sm:text-xl text-foreground mt-2">
            Love you Loads ❤️
          </p>
          <p className="font-display text-lg sm:text-xl text-foreground mt-2">
            Matt x
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinalCTA;
