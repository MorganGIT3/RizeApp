import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { DigitalSerenityBackground } from './DigitalSerenityBackground';
import logoImage from '../ChatGPT Image 10 oct. 2025, 21_52_06.png';

// ID de la vidéo YouTube (ex: https://youtube.com/watch?v=XXXXXXXX → XXXXXXXXX)
const YOUTUBE_VIDEO_ID = 'P9dqz5Or52I';

interface WelcomeVideoPageProps {
  onContinue: () => void;
}

export function WelcomeVideoPage({ onContinue }: WelcomeVideoPageProps) {
  const [videoStarted, setVideoStarted] = useState(false);
  const [iframeSrc, setIframeSrc] = useState<string | null>(null);

  // Délai le chargement du src pour que le conteneur ait ses dimensions
  // (fix: iframe ne charge pas quand DevTools fermé = layout pas encore calculé)
  useEffect(() => {
    if (!videoStarted) return;
    const id = requestAnimationFrame(() => {
      setIframeSrc(`https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`);
    });
    return () => cancelAnimationFrame(id);
  }, [videoStarted]);

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-slate-900 via-black to-slate-800 overflow-hidden flex flex-col">
      <DigitalSerenityBackground />

      {/* Header */}
      <header className="relative z-50 p-6 flex items-center border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-lg shadow-white/10 overflow-hidden ring-1 ring-white/20">
            <img src={logoImage} alt="RizeApp Logo" className="w-full h-full object-cover rounded-lg" />
          </div>
          <div>
            <h1 className="text-lg font-extralight leading-tight tracking-tight text-slate-50">RizeApps™</h1>
            <p className="text-sm text-white/50">Bienvenue</p>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-20 flex-1 flex flex-col items-center justify-center px-6 py-10">
        <div className="w-full max-w-3xl mx-auto">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex justify-center mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-white/50 text-xs tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
              Étape 1 sur 2
            </span>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl sm:text-4xl font-extralight leading-tight tracking-tight text-slate-50 mb-3">
              Avant de commencer,{' '}
              <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-orange-300 bg-clip-text text-transparent">
                regarde cette vidéo
              </span>
            </h2>
            <p className="text-white/50 text-base max-w-md mx-auto leading-relaxed">
              Je t'explique comment tirer le maximum de ton accès.
            </p>
          </motion.div>

          {/* Video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="w-full mb-8"
          >
            <div
              className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black min-h-[320px]"
              style={{
                boxShadow: '0 0 0 1px rgba(255,255,255,0.06), 0 24px 60px rgba(0,0,0,0.6)',
              }}
            >
              {!videoStarted ? (
                <button
                  onClick={() => setVideoStarted(true)}
                  className="group absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-black/80 hover:bg-black/70 transition-colors"
                  type="button"
                  aria-label="Lancer la vidéo"
                >
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-orange-500/20 blur-2xl scale-150" />
                    <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 via-amber-500 to-orange-400 flex items-center justify-center shadow-[0_0_30px_rgba(249,115,22,0.4)] group-hover:scale-105 transition-transform">
                      <Play className="w-8 h-8 text-white fill-white ml-1" />
                    </div>
                  </div>
                  <p className="text-white/40 text-sm mt-5 tracking-wide">Clique pour lancer la vidéo</p>
                </button>
              ) : (
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={iframeSrc ?? undefined}
                  title="Vidéo de bienvenue RizeApps™"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col items-center gap-3"
          >
            <button
              onClick={onContinue}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl font-semibold text-base bg-gradient-to-r from-orange-500 via-amber-500 to-orange-400 text-white hover:opacity-90 active:scale-95 shadow-[0_0_20px_rgba(249,115,22,0.35)] transition-all"
            >
              Passer à la suite
              <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-white/25 text-xs">
              Tu pourras revenir sur cette vidéo à tout moment
            </p>
          </motion.div>

        </div>
      </main>

      {/* Bottom bar */}
      <div className="relative z-20 border-t border-white/[0.06] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-6 h-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-400" />
            <div className="w-6 h-1.5 rounded-full bg-white/15" />
          </div>
          <span className="text-white/30 text-xs">Étape 1 sur 2</span>
        </div>
        <span className="text-white/20 text-xs">RizeApps™ · Accès privé</span>
      </div>
    </div>
  );
}
