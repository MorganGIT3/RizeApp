// Styles et effets dorés pour le dashboard
import { ReactNode } from "react";

// Composant de bordure animée avec LED dorée
export const LEDBorderCard = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
  return (
    <div className={`relative ${className}`}>
      {/* Bordure extérieure avec LED animée */}
      <div className="absolute -inset-[1px] rounded-lg bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 opacity-30 blur-sm animate-pulse" />
      <div className="absolute -inset-[1px] rounded-lg">
        <div className="absolute top-0 left-0 w-full h-full rounded-lg" style={{
          background: 'radial-gradient(circle 230px at 0% 0%, rgba(251, 191, 36, 0.3), rgba(12, 13, 13, 0.9))',
          position: 'relative'
        }}>
          {/* LED animée qui bouge */}
          <div className="absolute w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.8)] z-10 animate-led-move" />
        </div>
      </div>
      {/* Contenu */}
      <div className="relative bg-black/80 backdrop-blur-sm rounded-lg border border-amber-900/30 overflow-hidden">
        {children}
      </div>
    </div>
  );
};

// Background avec grille et effets dorés
export const GoldGridBackground = () => (
  <>
    {/* Grille de fond */}
    <div 
      className="absolute inset-0 opacity-20"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(251, 191, 36, 0.1) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(251, 191, 36, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px'
      }}
    />
    {/* Rayons lumineux dorés */}
    <div 
      className="absolute top-0 left-0 w-full h-full opacity-10"
      style={{
        background: 'radial-gradient(circle at 30% 20%, rgba(251, 191, 36, 0.3), transparent 50%)'
      }}
    />
  </>
);

// Animation CSS pour la LED
export const LEDAnimationStyles = `
  @keyframes led-move {
    0%, 100% {
      top: 10%;
      right: 10%;
    }
    25% {
      top: 10%;
      right: calc(100% - 20px);
    }
    50% {
      top: calc(100% - 20px);
      right: calc(100% - 20px);
    }
    75% {
      top: calc(100% - 20px);
      right: 10%;
    }
  }
  
  .animate-led-move {
    animation: led-move 6s linear infinite;
  }
  
  @keyframes gold-pulse {
    0%, 100% {
      opacity: 0.3;
      transform: scale(1);
    }
    50% {
      opacity: 0.6;
      transform: scale(1.1);
    }
  }
  
  .animate-gold-pulse {
    animation: gold-pulse 3s ease-in-out infinite;
  }
  
  @keyframes gold-shimmer {
    0% {
      background-position: -200% center;
    }
    100% {
      background-position: 200% center;
    }
  }
  
  .gold-shimmer {
    background: linear-gradient(
      90deg,
      transparent,
      rgba(251, 191, 36, 0.4),
      transparent
    );
    background-size: 200% 100%;
    animation: gold-shimmer 3s linear infinite;
  }
`;


