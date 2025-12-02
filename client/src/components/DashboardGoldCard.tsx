import { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface GoldCardProps {
  name: string;
  Icon: any;
  background: ReactNode;
  onClick?: () => void;
  className?: string;
}

export const GoldCard = ({ name, Icon, background, onClick, className = "" }: GoldCardProps) => {
  return (
    <motion.div
      className={`relative group ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
    >
      {/* Bordure LED animée dorée */}
      <div className="absolute -inset-[1px] rounded-lg overflow-hidden">
        <div 
          className="absolute inset-0 rounded-lg animate-pulse"
          style={{
            background: 'radial-gradient(circle 230px at 0% 0%, rgba(255, 255, 255, 0.1), rgba(12, 13, 13, 0.9))',
          }}
        >
          {/* LED animée qui bouge autour de la bordure */}
          <motion.div
            className="absolute w-3 h-3 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] z-10"
            animate={{
              top: ['10%', '10%', 'calc(100% - 20px)', 'calc(100% - 20px)', '10%'],
              right: ['10%', 'calc(100% - 20px)', 'calc(100% - 20px)', '10%', '10%'],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </div>
      </div>

      {/* Carte principale */}
      <div 
        className="relative h-full rounded-lg overflow-hidden cursor-pointer"
        style={{
          background: 'radial-gradient(circle 280px at 0% 0%, rgba(68, 68, 68, 0.3), rgba(12, 13, 13, 1))',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* Background avec grille */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}
        />

        {/* Rayon lumineux */}
        <div 
          className="absolute w-64 h-16 rounded-full opacity-20 blur-xl"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            transform: 'rotate(40deg)',
            top: '0%',
            left: '0',
            transformOrigin: '10%',
          }}
        />

        {/* Lignes de bordure */}
        <div 
          className="absolute top-[10%] left-0 right-0 h-px"
          style={{
            background: 'linear-gradient(90deg, rgba(136, 136, 136, 0.3) 30%, rgba(29, 31, 31, 0.7) 70%)'
          }}
        />
        <div 
          className="absolute bottom-[10%] left-0 right-0 h-px bg-neutral-800"
        />
        <div 
          className="absolute left-[10%] top-0 bottom-0 w-px"
          style={{
            background: 'linear-gradient(180deg, rgba(116, 116, 116, 0.3) 30%, rgba(34, 36, 36, 0.7) 70%)'
          }}
        />
        <div 
          className="absolute right-[10%] top-0 bottom-0 w-px bg-neutral-800"
        />

        {/* Background du contenu */}
        {background}

        {/* Contenu */}
        <div className="relative z-10 h-full flex flex-col justify-between p-4">
          <div className="flex flex-col gap-2">
            <Icon className="h-7 w-7 text-white/80 group-hover:text-white transition-colors" />
            <h3 className="text-base font-semibold text-white">
              {name}
            </h3>
          </div>

          {/* Bouton CTA au hover */}
          <motion.div
            className="flex items-center gap-2 text-white/80 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity"
            initial={{ y: 10, opacity: 0 }}
            whileHover={{ y: 0, opacity: 1 }}
          >
            <span>Voir</span>
            <ArrowRight className="h-3 w-3" />
          </motion.div>
        </div>

        {/* Overlay au hover */}
        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </div>
    </motion.div>
  );
};

