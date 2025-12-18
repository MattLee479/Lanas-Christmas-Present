import { useState, useEffect } from "react";

const images = [
  {
    url: "https://www.devere.co.uk/sites/default/files/styles/gallery_small_md/public/2023-02/CWP_GALLERY_POOL_1800x1200.jpg?h=04d2733c&itok=ZxqCEPC1",
    caption: "Lovely Inside Pool"
  },
  {
    url: "https://www.devere.co.uk/sites/default/files/styles/gallery_large_md/public/2024-06/CWP-8967.jpg?h=28121b77&itok=xty-thyw",
    caption: "Modern Room with a View"
  },
  {
    url: "https://www.devere.co.uk/sites/default/files/styles/gallery_large_md/public/2023-02/CWP_GALLERY_TERRACE_1800x1200.jpg?h=4362216e&itok=XIXOzjEY",
    caption: "Bouje Restraunt / Bar"
  },
];


interface ImageGalleryProps {
  onContinue: () => void;
}

const ImageGallery = ({ onContinue }: ImageGalleryProps) => {
  const [visibleImages, setVisibleImages] = useState<number[]>([]);

  useEffect(() => {
    images.forEach((_, index) => {
      setTimeout(() => {
        setVisibleImages(prev => [...prev, index]);
      }, index * 300);
    });
  }, []);

  return (
    <div className="py-8 sm:py-12 px-4">
      <div className="text-center mb-8 sm:mb-12 animate-fade-up">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground mb-2 sm:mb-3">
          Your Escape Awaits
        </h2>
        <p className="text-muted-foreground text-base sm:text-lg max-w-md mx-auto">
          A glimpse of the luxury that's waiting for you...
        </p>
      </div>

      <div className="space-y-4 sm:space-y-6 max-w-2xl mx-auto mb-8 sm:mb-12">
        {images.map((image, index) => (
          <div
            key={index}
            className={`relative overflow-hidden rounded-xl sm:rounded-2xl shadow-elevated transition-all duration-700 ${
              visibleImages.includes(index) 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-48 sm:h-64 md:h-80 object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
              <p className="text-ivory font-display text-lg sm:text-xl font-medium">
                {image.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center animate-fade-up" style={{ animationDelay: "0.6s" }}>
        <button
          onClick={onContinue}
          className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 mx-auto py-3 px-6"
        >
          <span>Continue</span>
          <svg className="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ImageGallery;
