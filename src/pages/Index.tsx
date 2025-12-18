import { useState } from "react";
import SnowParticles from "@/components/SnowParticles";
import WelcomeModal from "@/components/WelcomeModal";
import SpinWheel from "@/components/SpinWheel";
import ResultCard from "@/components/ResultCard";
import ImageGallery from "@/components/ImageGallery";
import FinalCTA from "@/components/FinalCTA";

type Stage = "welcome" | "spin" | "result" | "gallery" | "final";

const Index = () => {
  const [stage, setStage] = useState<Stage>("welcome");
  const [prize, setPrize] = useState<string>("");

  const handleWelcomeContinue = () => {
    setStage("spin");
  };

  const handleSpinComplete = (wonPrize: string) => {
    setPrize(wonPrize);
    setStage("result");
  };

  const handleResultContinue = () => {
    setStage("gallery");
  };

  const handleGalleryContinue = () => {
    setStage("final");
  };

  return (
    <div className="min-h-[100dvh] bg-background relative overflow-x-hidden">
      <SnowParticles />
      
      {/* Background gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-background via-background to-muted/30 pointer-events-none" />

      {/* Welcome Modal */}
      {stage === "welcome" && (
        <WelcomeModal onContinue={handleWelcomeContinue} />
      )}

      {/* Main Content */}
      <main className="relative z-20 container max-w-2xl mx-auto min-h-[100dvh] flex flex-col justify-center safe-area-inset">
        {stage === "spin" && (
          <SpinWheel onComplete={handleSpinComplete} />
        )}

        {stage === "result" && (
          <ResultCard prize={prize} onContinue={handleResultContinue} />
        )}

        {stage === "gallery" && (
          <ImageGallery onContinue={handleGalleryContinue} />
        )}

        {stage === "final" && (
          <FinalCTA />
        )}
      </main>
    </div>
  );
};

export default Index;
