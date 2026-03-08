import React from 'react';
import { motion } from 'framer-motion';
import { useDramaticSound } from '@/hooks/useDramaticSound';
import { DigitalSerenityBackground } from './DigitalSerenityBackground';
import { Button } from '@/components/ui/button';

interface WelcomeVideoPageProps {
  onContinue: () => void;
}

export function WelcomeVideoPage({ onContinue }: WelcomeVideoPageProps) {
  const { playDramaticSound } = useDramaticSound();

  const handleContinue = () => {
    playDramaticSound();
    onContinue();
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-black to-slate-800">
      {/* Fond DigitalSerenity global */}
      <div className="absolute inset-0 z-0">
        <DigitalSerenityBackground />
      </div>

      {/* Contenu principal centré verticalement et horizontalement */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-8 w-full max-w-4xl mx-auto">
        
        {/* Texte au-dessus de la vidéo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-50 tracking-tight">
            Regardez la vidéo avant de passer à la suite !
          </h1>
        </motion.div>

        {/* Vidéo YouTube */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full mb-8"
        >
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}> {/* 16:9 aspect ratio */}
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg shadow-2xl"
              src="https://www.youtube.com/embed/ToWTV6OAWkA?start=7"
              title="Vidéo de bienvenue"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </motion.div>

        {/* Bouton Continuer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Button
            onClick={handleContinue}
            size="lg"
            className="px-8 py-6 text-lg font-semibold"
          >
            Passez à la suite
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

