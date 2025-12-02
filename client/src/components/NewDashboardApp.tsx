import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';
import { getUserProfile, UserProfile, getCurrentUser } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { SimpleCalComRedirect } from './SimpleCalComRedirect';
import { IOSDock } from './IOSDock';
import { GoldCard } from './DashboardGoldCard';
import { GoldBentoGrid } from './GoldBentoGrid';
import { DigitalSerenityBackground } from './DigitalSerenityBackground';
import { 
  Calendar, 
  BookOpen, 
  Image as ImageIcon, 
  Code, 
  Layout,
  ExternalLink,
  ArrowRight,
  GraduationCap
} from 'lucide-react';
import logoImage from '../ChatGPT Image 10 oct. 2025, 21_52_06.png';

interface NewDashboardAppProps {
  onLogout?: () => void;
}

// Background components for each card - Palette noir/blanc
const CallBookingBackground = () => (
  <div className="absolute inset-0">
    {/* Grille blanche subtile */}
    <div 
      className="absolute inset-0 opacity-5"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px'
      }}
    />
    {/* Effet lumineux blanc */}
    <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" />
    {/* Icône de fond */}
    <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]">
      <Calendar className="w-32 h-32 text-white" />
    </div>
    {/* Ligne LED blanche en bas */}
    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
  </div>
);

const FormationBackground = () => (
  <div className="absolute inset-0">
    <div 
      className="absolute inset-0 opacity-5"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px'
      }}
    />
    <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" />
    <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]">
      <BookOpen className="w-32 h-32 text-white" />
    </div>
    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
  </div>
);

const RessourcesGraphiquesBackground = () => (
  <div className="absolute inset-0">
    <div 
      className="absolute inset-0 opacity-5"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px'
      }}
    />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[28rem] h-[28rem] bg-white/4 rounded-full blur-3xl animate-pulse" />
    <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]">
      <ImageIcon className="w-32 h-32 text-white" />
    </div>
    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
  </div>
);

const ApplicationExempleBackground = () => (
  <div className="absolute inset-0">
    <div 
      className="absolute inset-0 opacity-5"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px'
      }}
    />
    <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" />
    <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]">
      <Code className="w-32 h-32 text-white" />
    </div>
    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
  </div>
);

const FrameworkAppBackground = () => (
  <div className="absolute inset-0">
    <div 
      className="absolute inset-0 opacity-5"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px'
      }}
    />
    <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" />
    <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]">
      <Layout className="w-32 h-32 text-white" />
    </div>
    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
  </div>
);

// Composants d'animation au hover pour chaque carte
const CallBookingHoverAnimation = () => (
  <div className="absolute inset-0 p-4 pointer-events-none">
    <motion.div
      className="absolute inset-0 flex flex-col gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Éléments de calendrier animés */}
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute bg-white/5 rounded-lg border border-white/10 backdrop-blur-sm"
          style={{
            width: '60%',
            height: '20%',
            left: `${10 + i * 30}%`,
            top: `${20 + i * 25}%`,
          }}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0.8, 1, 1, 0.8],
            y: [20, 0, 0, -20],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
        >
          <div className="p-2">
            <div className="h-2 bg-white/20 rounded mb-1 w-3/4"></div>
            <div className="h-1 bg-white/10 rounded w-1/2"></div>
          </div>
        </motion.div>
      ))}
      
      {/* Points de calendrier */}
      {[1, 2, 3, 4, 5].map((i) => (
        <motion.div
          key={`dot-${i}`}
          className="absolute w-2 h-2 bg-white/30 rounded-full"
          style={{
            left: `${15 + i * 15}%`,
            top: `${60 + (i % 2) * 20}%`,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </motion.div>
  </div>
);

const FormationHoverAnimation = () => (
  <div className="absolute inset-0 p-4 pointer-events-none overflow-hidden">
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Livres/Pages qui apparaissent */}
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute bg-white/5 rounded border border-white/10"
          style={{
            width: '35%',
            height: '40%',
            left: `${5 + i * 30}%`,
            top: `${30}%`,
          }}
          initial={{ opacity: 0, rotate: -10, scale: 0.5 }}
          animate={{
            opacity: [0, 0.8, 0.8, 0],
            rotate: [-10, 0, 0, 10],
            scale: [0.5, 1, 1, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.7,
            ease: "easeInOut",
          }}
        >
          {/* Lignes de texte simulées */}
          <div className="p-3 space-y-1">
            {[1, 2, 3, 4].map((line) => (
              <motion.div
                key={line}
                className="h-1 bg-white/20 rounded"
                style={{ width: `${80 + line * 5}%` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1] }}
                transition={{ delay: line * 0.1 }}
              />
            ))}
          </div>
        </motion.div>
      ))}
      
      {/* Points de progression */}
      {[1, 2, 3, 4].map((i) => (
        <motion.div
          key={`progress-${i}`}
          className="absolute w-1.5 h-1.5 bg-white/40 rounded-full"
          style={{
            left: `${20 + i * 20}%`,
            bottom: `${20}%`,
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}
    </motion.div>
  </div>
);

const RessourcesGraphiquesHoverAnimation = () => (
  <div className="absolute inset-0 p-3 pointer-events-none overflow-hidden">
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Designs de landing pages animés */}
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute bg-white/8 rounded-lg border border-white/15 backdrop-blur-sm overflow-hidden"
          style={{
            width: '45%',
            height: '50%',
            left: `${5 + (i - 1) * 50}%`,
            top: `${25}%`,
          }}
          initial={{ opacity: 0, scale: 0.7, y: 30 }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0.7, 1, 1, 0.7],
            y: [30, 0, 0, -30],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            delay: i * 0.6,
            ease: "easeInOut",
          }}
        >
          {/* Header de landing page */}
          <div className="h-3 bg-white/20 mb-2"></div>
          {/* Contenu */}
          <div className="p-2 space-y-1.5">
            <div className="h-2 bg-white/25 rounded w-full"></div>
            <div className="h-2 bg-white/15 rounded w-3/4"></div>
            <div className="h-1.5 bg-white/20 rounded w-5/6"></div>
            {/* Bouton CTA */}
            <div className="mt-2 h-2 bg-white/30 rounded w-1/3"></div>
          </div>
          {/* Images/Décor */}
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white/10 to-transparent"></div>
        </motion.div>
      ))}
      
      {/* Éléments graphiques flottants */}
      {[1, 2, 3, 4, 5].map((i) => (
        <motion.div
          key={`graphic-${i}`}
          className="absolute"
          style={{
            width: `${8 + (i % 3) * 4}px`,
            height: `${8 + (i % 3) * 4}px`,
            left: `${10 + i * 18}%`,
            top: `${15 + (i % 2) * 70}%`,
            background: `linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 100%)`,
            borderRadius: i % 2 === 0 ? '50%' : '4px',
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.div>
  </div>
);

const ApplicationExempleHoverAnimation = () => (
  <div className="absolute inset-0 p-4 pointer-events-none overflow-hidden">
    <motion.div
      className="absolute inset-0 font-mono text-xs"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Snippets de code animés */}
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute bg-white/5 rounded border border-white/10 backdrop-blur-sm p-2"
          style={{
            width: '55%',
            height: '35%',
            left: `${10 + (i - 1) * 35}%`,
            top: `${30 + (i - 1) * 25}%`,
          }}
          initial={{ opacity: 0, x: -30 }}
          animate={{
            opacity: [0, 1, 1, 0],
            x: [-30, 0, 0, 30],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeInOut",
          }}
        >
          {/* Lignes de code */}
          <div className="space-y-1">
            {[1, 2, 3, 4, 5].map((line) => (
              <motion.div
                key={line}
                className="flex gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1] }}
                transition={{ delay: line * 0.1 }}
              >
                <span className="text-white/30">{line}</span>
                <div className="flex-1">
                  {line === 1 && <div className="h-1 bg-white/25 rounded w-3/4"></div>}
                  {line === 2 && <div className="h-1 bg-white/20 rounded w-full"></div>}
                  {line === 3 && <div className="h-1 bg-white/25 rounded w-2/3"></div>}
                  {line === 4 && <div className="h-1 bg-white/20 rounded w-5/6"></div>}
                  {line === 5 && <div className="h-1 bg-white/25 rounded w-1/2"></div>}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
      
      {/* Curseur clignotant */}
      <motion.div
        className="absolute w-0.5 h-4 bg-white/60"
        style={{
          left: '45%',
          top: '45%',
        }}
        animate={{
          opacity: [1, 0, 1],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
        }}
      />
    </motion.div>
  </div>
);

const FrameworkAppHoverAnimation = () => (
  <div className="absolute inset-0 p-4 pointer-events-none overflow-hidden">
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Composants de framework animés */}
      {[1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="absolute bg-white/6 rounded border border-white/10 backdrop-blur-sm"
          style={{
            width: '40%',
            height: '30%',
            left: `${10 + ((i - 1) % 2) * 50}%`,
            top: `${20 + Math.floor((i - 1) / 2) * 45}%`,
          }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{
            opacity: [0, 0.9, 0.9, 0],
            scale: [0.6, 1, 1, 0.6],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
        >
          {/* Structure de composant */}
          <div className="p-2">
            <div className="h-2 bg-white/25 rounded mb-2 w-2/3"></div>
            <div className="space-y-1">
              <div className="h-1 bg-white/15 rounded w-full"></div>
              <div className="h-1 bg-white/15 rounded w-5/6"></div>
              <div className="h-1 bg-white/15 rounded w-4/5"></div>
            </div>
            {/* Enfants */}
            <div className="ml-3 mt-2 space-y-0.5">
              <div className="h-0.5 bg-white/10 rounded w-3/4"></div>
              <div className="h-0.5 bg-white/10 rounded w-2/3"></div>
            </div>
          </div>
        </motion.div>
      ))}
      
      {/* Connecteurs entre composants */}
      {[1, 2].map((i) => (
        <motion.div
          key={`connector-${i}`}
          className="absolute h-px bg-white/20"
          style={{
            left: `${25 + i * 25}%`,
            top: '35%',
            width: '10%',
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: [0, 1, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}
      
      {/* Points de connexion */}
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <motion.div
          key={`node-${i}`}
          className="absolute w-2 h-2 bg-white/40 rounded-full"
          style={{
            left: `${15 + (i % 3) * 35}%`,
            top: `${35 + Math.floor(i / 3) * 35}%`,
          }}
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}
    </motion.div>
  </div>
);

// Composant pour la carte Formation avec visuel Notion
const FormationNotionCard = () => {
  const notionUrl = "https://tarry-parrotfish-a73.notion.site/RizeApp-Academy-Cr-e-lance-et-vends-ton-application-IA-no-code-des-entreprises-281c766a5d1181bfac04e3b924367e18?source=copy_link";
  const [shouldLoadIframe, setShouldLoadIframe] = useState(false);
  
  const handleClick = () => {
    window.open(notionUrl, '_blank', 'noopener,noreferrer');
  };

  // Créer un placeholder visuel détaillé pour Notion
  const createNotionPreview = () => {
    return (
      <div className="w-full h-full bg-gradient-to-br from-[#2e2e2e] via-[#1a1a1a] to-[#0f0f0f] flex flex-col">
        {/* Header Notion avec les 4 points colorés */}
        <div className="h-14 bg-[#2e2e2e] border-b border-white/10 flex items-center px-4 gap-3">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#EF4444] shadow-[0_0_8px_rgba(239,68,68,0.5)]"></div>
            <div className="w-3 h-3 rounded-full bg-[#F59E0B] shadow-[0_0_8px_rgba(245,158,11,0.5)]"></div>
            <div className="w-3 h-3 rounded-full bg-[#10B981] shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
            <div className="w-3 h-3 rounded-full bg-[#3B82F6] shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
          </div>
          <div className="flex-1 h-8 bg-white/5 rounded px-4 flex items-center border border-white/10">
            <span className="text-white/70 text-sm font-medium">RizeApp Academy</span>
          </div>
        </div>
        
        {/* Contenu principal avec style Notion */}
        <div className="flex-1 p-8 space-y-6 overflow-y-auto">
          {/* Titre principal */}
          <div className="space-y-3">
            <div className="h-10 bg-white/12 rounded w-4/5 border border-white/10"></div>
            <div className="h-6 bg-white/8 rounded w-2/3"></div>
            <div className="h-4 bg-white/6 rounded w-1/2"></div>
          </div>
          
          {/* Section avec texte */}
          <div className="space-y-4 mt-8">
            <div className="h-5 bg-white/10 rounded w-full"></div>
            <div className="h-5 bg-white/10 rounded w-[95%]"></div>
            <div className="h-5 bg-white/10 rounded w-[90%]"></div>
            <div className="h-5 bg-white/8 rounded w-full"></div>
            <div className="h-5 bg-white/8 rounded w-[85%]"></div>
          </div>
          
          {/* Section avec cards Notion */}
          <div className="grid grid-cols-2 gap-4 mt-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-28 bg-white/8 rounded-lg border border-white/10 flex items-center justify-center p-4">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white/40" />
                </div>
              </div>
            ))}
          </div>
          
          {/* Section avec liste */}
          <div className="space-y-3 mt-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-white/30 mt-1 flex-shrink-0"></div>
                <div className="h-4 bg-white/10 rounded flex-1"></div>
              </div>
            ))}
          </div>
          
          {/* Section avec colonnes */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-3 bg-white/10 rounded w-full"></div>
                <div className="h-3 bg-white/8 rounded w-4/5"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto"
    >
      <motion.div
        className="group relative cursor-pointer"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={handleClick}
      >
        {/* Bordure LED animée */}
        <div className="absolute -inset-[2px] rounded-2xl overflow-hidden">
          <div 
            className="absolute inset-0 rounded-2xl"
            style={{
              background: 'radial-gradient(circle 230px at 0% 0%, rgba(255, 255, 255, 0.15), rgba(12, 13, 13, 0.9))',
            }}
          >
            <motion.div
              className="absolute w-4 h-4 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.9)] z-10"
              animate={{
                top: ['10%', '10%', 'calc(100% - 30px)', 'calc(100% - 30px)', '10%'],
                right: ['10%', 'calc(100% - 30px)', 'calc(100% - 30px)', '10%', '10%'],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </div>
        </div>

        {/* Carte principale */}
        <div 
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: 'radial-gradient(circle 280px at 0% 0%, rgba(68, 68, 68, 0.4), rgba(12, 13, 13, 1))',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.1), 0 8px 32px rgba(0, 0, 0, 0.8)',
            minHeight: '600px'
          }}
        >
          {/* Grille de fond */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
              `,
              backgroundSize: '30px 30px'
            }}
          />

          {/* Header avec titre */}
          <div className="relative z-20 p-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-extralight text-white">RizeApp Academy</h2>
                  <p className="text-white/60 text-sm">Formation complète sur Notion</p>
                </div>
              </div>
              <ExternalLink className="w-6 h-6 text-white/60 group-hover:text-white transition-colors" />
            </div>
          </div>

          {/* Aperçu visuel du contenu Notion */}
          <div 
            className="relative h-[500px] overflow-hidden"
            onMouseEnter={() => setShouldLoadIframe(true)}
          >
            {shouldLoadIframe ? (
              <iframe
                src={notionUrl}
                className="w-full h-full border-0"
                title="Aperçu RizeApp Academy"
                style={{
                  transform: 'scale(0.35)',
                  transformOrigin: 'top left',
                  width: '285.7%',
                  height: '285.7%',
                }}
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                loading="lazy"
              />
            ) : (
              createNotionPreview()
            )}
            {/* Overlay pour améliorer la visibilité et indiquer que c'est cliquable */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 pointer-events-none" />
            {!shouldLoadIframe && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="px-4 py-2 bg-black/60 backdrop-blur-sm rounded-lg border border-white/20">
                  <span className="text-white/80 text-sm font-medium">Passer la souris pour voir l'aperçu</span>
                </div>
              </div>
            )}
          </div>

          {/* Footer avec CTA */}
          <div className="relative z-20 p-6 border-t border-white/10 bg-gradient-to-t from-black/40 to-transparent">
            <motion.div
              className="flex items-center justify-center gap-3 px-6 py-3 bg-white/10 hover:bg-white/15 rounded-xl border border-white/20 backdrop-blur-sm transition-all duration-300"
              whileHover={{ gap: 4 }}
            >
              <span className="text-white font-semibold">Accéder à la formation complète</span>
              <ArrowRight className="w-5 h-5 text-white" />
            </motion.div>
          </div>

          {/* Overlay au hover */}
          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors pointer-events-none" />
        </div>
      </motion.div>
    </motion.div>
  );
};

// Composant pour les cartes d'exemples d'applications
interface ExampleAppCardProps {
  title: string;
  url: string;
  description: string;
  previewImage?: string;
}

const ExampleAppCard = ({ title, url, description, previewImage }: ExampleAppCardProps) => {
  const handleClick = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const [shouldLoadIframe, setShouldLoadIframe] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  
  // Créer un placeholder visuel léger et stylisé
  const createLightweightPreview = () => {
    const initials = title
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 3);
    
    return (
      <div className="w-full h-full bg-gradient-to-br from-white/8 via-white/4 to-black/30 flex flex-col relative">
        {/* Header browser simulé */}
        <div className="h-10 bg-white/10 border-b border-white/10 flex items-center px-3 gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
          </div>
          <div className="flex-1 h-6 bg-white/8 rounded px-3 max-w-xs"></div>
        </div>
        
        {/* Contenu principal simplifié */}
        <div className="flex-1 p-4 flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 rounded-xl bg-white/12 border border-white/20 flex items-center justify-center">
            <span className="text-xl font-bold text-white/70">{initials}</span>
          </div>
          <div className="w-32 h-2 bg-white/10 rounded"></div>
          <div className="w-24 h-2 bg-white/8 rounded"></div>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      className="group relative cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      onClick={handleClick}
    >
      {/* Bordure LED animée */}
      <div className="absolute -inset-[1px] rounded-lg overflow-hidden">
        <div 
          className="absolute inset-0 rounded-lg"
          style={{
            background: 'radial-gradient(circle 230px at 0% 0%, rgba(255, 255, 255, 0.1), rgba(12, 13, 13, 0.9))',
          }}
        >
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
        className="relative h-[500px] rounded-lg overflow-hidden"
        style={{
          background: 'radial-gradient(circle 280px at 0% 0%, rgba(68, 68, 68, 0.3), rgba(12, 13, 13, 1))',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* Grille de fond */}
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

        {/* Header de la carte */}
        <div className="absolute top-0 left-0 right-0 z-20 p-4 bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
              <p className="text-xs text-white/60">{description}</p>
            </div>
            <ExternalLink className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
          </div>
        </div>

        {/* Aperçu du site web - Version optimisée légère */}
        <div 
          className="absolute inset-0 top-16 overflow-hidden"
          onMouseEnter={() => setShouldLoadIframe(true)}
        >
          {previewImage ? (
            <>
              {!isImageLoaded && (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-white/5 to-black/20">
                  <div className="text-center">
                    <div className="w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full animate-spin mx-auto mb-2"></div>
                    <p className="text-white/40 text-xs">Chargement...</p>
                  </div>
                </div>
              )}
              <img
                src={previewImage}
                alt={`Aperçu de ${title}`}
                className={`w-full h-full object-cover object-top transition-opacity duration-300 ${
                  isImageLoaded ? 'opacity-100' : 'opacity-0 absolute'
                }`}
                loading="lazy"
                decoding="async"
                onLoad={() => setIsImageLoaded(true)}
                onError={() => setIsImageLoaded(false)}
              />
            </>
          ) : shouldLoadIframe ? (
            // Charger l'iframe seulement au hover pour réduire la charge initiale
            <iframe
              src={url}
              className="w-full h-full border-0"
              title={`Aperçu de ${title}`}
              style={{
                transform: 'scale(0.25)',
                transformOrigin: 'top left',
                width: '400%',
                height: '400%',
              }}
              sandbox="allow-scripts allow-same-origin"
              loading="lazy"
            />
          ) : (
            // Placeholder léger qui ne charge rien
            createLightweightPreview()
          )}
          {/* Overlay pour améliorer la visibilité */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 pointer-events-none" />
        </div>

        {/* Overlay pour indiquer que c'est cliquable */}
        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors z-10" />

        {/* Footer avec indication */}
        <div className="absolute bottom-0 left-0 right-0 z-20 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex items-center justify-center gap-2 text-xs text-white/60 group-hover:text-white transition-colors">
            <ExternalLink className="w-4 h-4" />
            <span>Cliquez pour ouvrir dans un nouvel onglet</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export function NewDashboardApp({ onLogout }: NewDashboardAppProps) {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('/dashboard');

  // Désactiver le scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Animation des mots
  useEffect(() => {
    const animateWords = () => {
      const wordElements = document.querySelectorAll('.word-animate');
      wordElements.forEach(word => {
        const delay = parseInt(word.getAttribute('data-delay') || '0');
        setTimeout(() => {
          if (word) {
            (word as HTMLElement).style.animation = 'word-appear 0.8s ease-out forwards';
          }
        }, delay);
      });
    };
    const timeoutId = setTimeout(animateWords, 500);
    return () => clearTimeout(timeoutId);
  }, [currentView]);

  // Effet hover sur les mots
  useEffect(() => {
    const wordElements = document.querySelectorAll('.word-animate');
    const handleMouseEnter = (e: Event) => {
      if (e.target) {
        (e.target as HTMLElement).style.textShadow = '0 0 20px rgba(203, 213, 225, 0.5)';
      }
    };
    const handleMouseLeave = (e: Event) => {
      if (e.target) {
        (e.target as HTMLElement).style.textShadow = 'none';
      }
    };
    wordElements.forEach(word => {
      word.addEventListener('mouseenter', handleMouseEnter);
      word.addEventListener('mouseleave', handleMouseLeave);
    });
    return () => {
      wordElements.forEach(word => {
        word.removeEventListener('mouseenter', handleMouseEnter);
        word.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [currentView]);

  const handleLogout = () => {
    console.log('Logout button clicked!');
    onLogout?.();
    navigate('/');
  };

  // Handlers pour la barre iOS
  const handleHomeClick = () => {
    setCurrentView('/dashboard');
  };

  const handleCallClick = () => {
    setCurrentView('/book-call');
  };

  const handleFormationClick = () => {
    setCurrentView('/formation');
  };

  const handleResourcesClick = () => {
    setCurrentView('/resources');
  };

  const handleExamplesClick = () => {
    setCurrentView('/examples');
  };

  const handleFrameworkClick = () => {
    setCurrentView('/framework');
  };

  const renderContent = () => {
    switch (currentView) {
      case '/dashboard':
        return (
          <div className="min-h-screen relative overflow-hidden" style={{ overflow: 'hidden', height: '100vh' }}>
            {/* Contenu principal */}
            <div className="relative z-10 p-4 md:p-6 -mt-8 md:-mt-6">
              <div className="max-w-7xl mx-auto">
              {/* Titre animé */}
              <div className="mb-2 text-center">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight leading-tight tracking-tight text-slate-50">
                  {"Que voulez-vous faire aujourd'hui ?".split(" ").map((word, index) => (
                    <span
                      key={index}
                      className="word-animate"
                      data-delay={index * 100}
                      style={{ margin: '0 0.1em' }}
                    >
                      {word}
                    </span>
                  ))}
                </h2>
              </div>
              {/* Gold Bento Grid avec LEDs */}
              <GoldBentoGrid className="grid-cols-2 md:grid-cols-3 lg:grid-cols-3 auto-rows-[14rem]">
                <GoldCard
                  name="Booker un appel de la semaine"
                  className="col-span-2 md:col-span-2"
                  Icon={Calendar}
                  background={<CallBookingBackground />}
                  hoverContent={<CallBookingHoverAnimation />}
                  onClick={() => setCurrentView('/book-call')}
                />
                
                <GoldCard
                  name="Formation"
                  className="col-span-1 md:col-span-1"
                  Icon={BookOpen}
                  background={<FormationBackground />}
                  hoverContent={<FormationHoverAnimation />}
                  onClick={() => setCurrentView('/formation')}
                />
                
                <GoldCard
                  name="Ressources Graphiques"
                  className="col-span-1 md:col-span-1"
                  Icon={ImageIcon}
                  background={<RessourcesGraphiquesBackground />}
                  hoverContent={<RessourcesGraphiquesHoverAnimation />}
                  onClick={() => setCurrentView('/resources')}
                />
                
                <GoldCard
                  name="Application Exemple"
                  className="col-span-1 md:col-span-1"
                  Icon={Code}
                  background={<ApplicationExempleBackground />}
                  hoverContent={<ApplicationExempleHoverAnimation />}
                  onClick={() => setCurrentView('/examples')}
                />
                
                <GoldCard
                  name="Framework App"
                  className="col-span-1 md:col-span-1"
                  Icon={Layout}
                  background={<FrameworkAppBackground />}
                  hoverContent={<FrameworkAppHoverAnimation />}
                  onClick={() => setCurrentView('/framework')}
                />
              </GoldBentoGrid>
              </div>
            </div>
          </div>
        );

      case '/book-call':
        return (
          <div className="min-h-screen -mt-24" style={{ overflow: 'hidden', height: '100vh' }}>
            <SimpleCalComRedirect />
          </div>
        );

      case '/formation':
        return (
          <div className="min-h-screen relative overflow-hidden" style={{ overflow: 'hidden', height: '100vh' }}>
            <div className="relative z-10 p-8 md:p-12 overflow-y-auto" style={{ maxHeight: '100vh' }}>
              <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-extralight leading-tight tracking-tight text-slate-50 mb-8 text-center">
                  Formation
                </h1>
                
                {/* Grande carte avec visuel Notion */}
                <FormationNotionCard />
              </div>
            </div>
          </div>
        );

      case '/resources':
        return (
          <div className="min-h-screen relative overflow-hidden" style={{ overflow: 'hidden', height: '100vh' }}>
            <div className="relative z-10 p-8 md:p-12 overflow-y-auto" style={{ maxHeight: '100vh' }}>
              <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-extralight leading-tight tracking-tight text-slate-50 mb-8 text-center">
                  Ressources Graphiques
                </h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
                  {/* Carte 21st.dev */}
                  <ExampleAppCard
                    title="21st.dev"
                    url="https://21st.dev/community/components"
                    description="Bibliothèque de composants UI modernes"
                  />
                  
                  {/* Carte Uiverse */}
                  <ExampleAppCard
                    title="Uiverse"
                    url="https://uiverse.io/elements"
                    description="Éléments UI et composants open source"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case '/examples':
        return (
          <div className="min-h-screen relative overflow-hidden" style={{ overflow: 'hidden', height: '100vh' }}>
            <div className="relative z-10 p-8 md:p-12 overflow-y-auto" style={{ maxHeight: '100vh' }}>
              <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-extralight leading-tight tracking-tight text-slate-50 mb-8 text-center">
                  Application Exemple
                </h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Carte C-K Couverture */}
                  <ExampleAppCard
                    title="C-K Couverture"
                    url="https://c-kcouverture-app.vercel.app/"
                    description="Application de gestion pour couvreurs"
                  />
                  
                  {/* Carte Planchais */}
                  <ExampleAppCard
                    title="Planchais"
                    url="https://planchais-app-xvdn.vercel.app/"
                    description="Application de gestion pour plombiers"
                  />
                  
                  {/* Carte AOS Rénov */}
                  <ExampleAppCard
                    title="AOS Rénov"
                    url="https://aos-renov.vercel.app/"
                    description="Application de gestion pour rénovation"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case '/framework':
        return (
          <div className="min-h-screen relative overflow-hidden" style={{ overflow: 'hidden', height: '100vh' }}>
            <div className="relative z-10 p-8 md:p-12 overflow-y-auto" style={{ maxHeight: '100vh' }}>
              <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-extralight leading-tight tracking-tight text-slate-50 mb-8">
                  Framework App
                </h1>
                
                <div className="space-y-8 text-white/80">
                  <div>
                    <p className="text-lg font-semibold text-white mb-2">Niche : BTP</p>
                    <p className="text-white/70">Exemple : Plombier, Serrurier, Carreleur etc…</p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-extralight text-white mb-4">
                      Fonctionnalités principales de l'application — Niche BTP / Artisans
                    </h2>
                    <p className="text-white/60 mb-4">
                      (Les fonctionnalités en bleu sont essentielles, celles en rouge sont des bonus.)
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-blue-400 mb-4">
                        Estimation automatique des chantiers (IA intégrée)
                      </h3>
                      <p className="mb-3">
                        Une interface fluide et intuitive permettant à l'entreprise :
                      </p>
                      <ul className="space-y-2 ml-6 list-disc">
                        <li>d'ajouter un chantier existant ;</li>
                        <li>d'importer plusieurs photos ;</li>
                        <li>et de renseigner quelques données clés (surface, matériaux, localisation, délai souhaité…).</li>
                      </ul>
                      <p className="mt-3 mb-3">
                        L'IA (via ChatGPT) analyse ces éléments et génère automatiquement :
                      </p>
                      <ul className="space-y-2 ml-6">
                        <li>✅ Une estimation du temps de réalisation</li>
                        <li>✅ Une liste des matériaux nécessaires selon le métier (plombier, carreleur, électricien, etc.)</li>
                        <li>✅ Une estimation du nombre d'ouvriers requis</li>
                        <li>✅ Un coût total prévisionnel avec marge et bénéfice estimés</li>
                        <li>✅ Un graphique de répartition des coûts (ex. : Transport = 100 €, Main-d'œuvre = 1 200 €, Matériaux = 800 €)</li>
                        <li>✅ Des recommandations automatiques : "prévoir un échafaudage", "outil spécifique nécessaire", etc.</li>
                      </ul>
                      <p className="mt-3 text-white/60">
                        (Tous les calculs et suggestions sont réalisés via l'IA.)
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-blue-400 mb-4">
                        Mini CRM (Pipeline)
                      </h3>
                      <p className="mb-3">
                        👉 (Dans cette fonctionnalité, il faut intégrer un bouton pour connecter l'email professionnel de l'entreprise
                      </p>
                      <p className="mb-3">
                        Interface avec possibilité de déplacer les prospects sous forme de cards dans différentes colonnes.
                        À chaque déplacement, un webhook déclenche un workflow qui exécute l'action correspondante.
                      </p>
                      
                      <h4 className="text-lg font-semibold text-white mt-4 mb-2">
                        Structure des colonnes et automatisations
                      </h4>
                      
                      <div className="space-y-3 ml-4">
                        <div>
                          <p className="font-semibold text-white">Colonne : "Tous les prospects"</p>
                          <p className="text-white/70">→ Colonne par défaut, où arrivent les nouveaux prospects via le formulaire d'inscription.</p>
                        </div>
                        
                        <div>
                          <p className="font-semibold text-white">Colonne : "Envoi du devis"</p>
                          <p className="text-white/70">→ Lorsqu'un prospect est déplacé ici, une popup s'affiche avec la visualisation du devis avant envoi (pour vérification).</p>
                          <p className="text-white/70">→ Le workflow génère le devis et l'envoie à l'adresse email récupérée par le webhook.</p>
                        </div>
                        
                        <div>
                          <p className="font-semibold text-white">Colonne : "Relance 1"</p>
                          <p className="text-white/70">→ Lorsqu'un prospect est déplacé ici, une popup s'affiche avec le message de relance (modifiable avant envoi).</p>
                          <p className="text-white/70">→ Le workflow génère le message et l'envoie automatiquement.</p>
                        </div>
                        
                        <div>
                          <p className="font-semibold text-white">Colonne : "Relance 2 / 3 / 4"</p>
                          <p className="text-white/70">→ Identique à la relance 1, avec des messages différents à chaque étape.</p>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <p className="font-semibold text-white mb-2">Autre partie CRM : envoi automatique d'emails</p>
                        <p className="mb-3">
                          Une autre section du CRM permet d'envoyer des emails automatiques (comme un CRM classique).
                        </p>
                        <p className="mb-2">Lors de la première utilisation, l'entreprise doit :</p>
                        <ul className="space-y-1 ml-6 list-disc">
                          <li>Importer au minimum 5 emails déjà envoyés par son entreprise (pour entraîner l'IA).</li>
                          <li>Répondre à quelques questions pour que l'IA comprenne le ton, le style et les types de réponses attendues.</li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-blue-400 mb-4">
                        Planning de chantier
                      </h3>
                      <p className="text-white/70">
                        Pas besoin de détail ici : simple calendrier/planning pour suivre les chantiers.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-blue-400 mb-4">
                        Bilan financier
                      </h3>
                      <p className="mb-3">
                        Possibilité de prendre en photo les tickets de caisse directement depuis l'app.
                      </p>
                      <p className="mb-2">
                        L'IA analyse ensuite automatiquement les dépenses et les classe :
                      </p>
                      <ul className="space-y-1 ml-6 list-disc">
                        <li>Achat de repas</li>
                        <li>Plein d'essence</li>
                        <li>Achat de matériaux, etc.</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-blue-400 mb-4">
                        Équipe
                      </h3>
                      <p className="mb-3">
                        Une section dédiée à la gestion des membres de l'entreprise, utile pour suivre qui fait quoi sur chaque chantier.
                      </p>
                      <p className="font-semibold text-white mb-2">Fonctionnalités principales :</p>
                      <ul className="space-y-2 ml-6">
                        <li>👤 Ajout / suppression de membres (avec rôle : chef de chantier, ouvrier, commercial, etc.)</li>
                        <li>🔄 Affectation des membres à un chantier depuis la fiche chantier ou depuis le planning</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case '/account':
        return <AccountPage onLogout={handleLogout} />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-black to-slate-800 relative overflow-hidden" style={{ border: 'none !important', height: '100vh', overflow: 'hidden' }}>
      {/* Fond DigitalSerenity global */}
      <DigitalSerenityBackground />
      
      {/* Header avec logo et logout */}
      <header 
          className="relative z-50 p-6 flex justify-between items-center border-b border-white/10"
        style={{ 
          position: 'relative',
          zIndex: 9999,
          pointerEvents: 'auto',
          background: 'transparent',
        }}
      >
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-lg shadow-white/10 overflow-hidden ring-1 ring-white/20">
            <img 
              src={logoImage} 
              alt="RizeApp Logo" 
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div>
            <h1 className="text-2xl font-extralight leading-tight tracking-tight text-slate-50">
              RizeAppHub™
            </h1>
            <p className="text-sm text-white/60">Dashboard</p>
          </div>
        </div>
        
        {/* Bouton Compte */}
        <div 
          style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            zIndex: 10000,
            pointerEvents: 'auto'
          }}
        >
          <button 
            onClick={() => setCurrentView('/account')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '12px',
              color: '#ffffff',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600',
              pointerEvents: 'auto',
              boxShadow: '0 4px 12px rgba(255, 255, 255, 0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <User style={{ width: '24px', height: '24px' }} />
            <span>Compte</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-20 pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ border: 'none !important' }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Barre iOS en bas */}
      <IOSDock 
        onHomeClick={handleHomeClick}
        onCallClick={handleCallClick}
        onFormationClick={handleFormationClick}
        onResourcesClick={handleResourcesClick}
        onExamplesClick={handleExamplesClick}
        onFrameworkClick={handleFrameworkClick}
        currentView={currentView}
      />
    </div>
  );
}

// Composant AccountPage
function AccountPage({ onLogout }: { onLogout: () => void }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setLoading(true);
    try {
      // Récupérer l'email directement depuis l'utilisateur authentifié
      const currentUser = await getCurrentUser();
      
      if (currentUser?.email) {
        setUserEmail(currentUser.email);
      }
      
      // Récupérer le profil pour les autres informations (dates d'accompagnement, etc.)
      const userProfile = await getUserProfile();
      setProfile(userProfile);
    } catch (error) {
      console.error('Erreur lors du chargement du profil:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Non définie';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ overflow: 'hidden', height: '100vh' }}>
      <div className="relative z-10 p-8 md:p-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extralight leading-tight tracking-tight text-slate-50 mb-8 text-center">
            Mon Compte
          </h1>
          
          {loading ? (
            <div className="text-center text-white/60">Chargement...</div>
          ) : (
            <div className="space-y-6">
              {/* Informations de connexion */}
              <div className="relative rounded-lg overflow-hidden"
                style={{
                  background: 'radial-gradient(circle 280px at 0% 0%, rgba(68, 68, 68, 0.3), rgba(12, 13, 13, 1))',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.08), 0 4px 12px rgba(0, 0, 0, 0.6)'
                }}>
                <div className="p-6">
                  <h2 className="text-xl font-extralight text-slate-50 mb-4">Informations de connexion</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white/60">Email</span>
                      <span className="text-white">{userEmail || profile?.email || 'Non disponible'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dates d'accompagnement */}
              <div className="relative rounded-lg overflow-hidden"
                style={{
                  background: 'radial-gradient(circle 280px at 0% 0%, rgba(68, 68, 68, 0.3), rgba(12, 13, 13, 1))',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.08), 0 4px 12px rgba(0, 0, 0, 0.6)'
                }}>
                <div className="p-6">
                  <h2 className="text-xl font-extralight text-slate-50 mb-4">Accompagnement</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white/60">Date de début</span>
                      <span className="text-white">{formatDate(profile?.accompaniment_start_date || null)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/60">Date de fin</span>
                      <span className="text-white">{formatDate(profile?.accompaniment_end_date || null)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bouton Déconnexion */}
              <div className="flex justify-center pt-4">
                <button
                  onClick={onLogout}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 20px',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '12px',
                    color: '#ef4444',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: '600',
                  }}
                >
                  <LogOut style={{ width: '20px', height: '20px' }} />
                  <span>Déconnexion</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
