"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { BackgroundPaths } from "./BackgroundPaths";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = false,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <main>
      <div
          className={cn(
          "relative flex flex-col h-[100vh] items-center justify-center bg-white dark:bg-neutral-950 overflow-hidden",
          className
        )}
        {...props}
      >
        <BackgroundPaths />
        {children}
      </div>
    </main>
  );
};

interface LandingPageNewProps {
  isAuthenticated?: boolean;
  onLogin?: () => void;
  onSignup?: () => void;
  onGo?: () => void;
}

export default function LandingPageNew({ isAuthenticated = false, onLogin, onSignup, onGo }: LandingPageNewProps) {
  
  const title = isAuthenticated ? "Bienvenue sur RizeAppHub™" : "Connecte toi à RizeAppHub™";
  const words = title.split(" ");

  return (
        <AuroraBackground>
          <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
              className="max-w-4xl mx-auto"
            >
              {/* Trust Badge */}
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-white/90 to-gray-100/90 border border-gray-300/30 shadow-lg shadow-gray-500/20 mb-8"
              >
                <div className="flex items-center justify-center w-4 h-4">
                  <svg className="w-3 h-3 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-800">
                  Seulement réservé aux membres de l'accompagnement à MorganRize
                </span>
              </motion.div>

              {/* Animated Title */}
              <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold mb-8 tracking-tighter">
                {words.map((word, wordIndex) => (
                  <span
                    key={wordIndex}
                    className="inline-block mr-4 last:mr-0"
                  >
                    {word.split("").map((letter, letterIndex) => (
                      <motion.span
                        key={`${wordIndex}-${letterIndex}`}
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                          delay: wordIndex * 0.1 + letterIndex * 0.03,
                          type: "spring",
                          stiffness: 150,
                          damping: 25,
                        }}
                        className="inline-block text-transparent bg-clip-text 
                          bg-gradient-to-r from-neutral-900 to-neutral-700/80 
                          dark:from-white dark:to-white/80"
                      >
                        {letter}
                      </motion.span>
                    ))}
                  </span>
                ))}
              </h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.5 }}
                className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12"
              >
                Crée, lance et vends ton application IA no‑code à des entreprises
              </motion.p>

              {/* Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                {isAuthenticated ? (
                  // Bouton GO si l'utilisateur est déjà connecté
                  <div className="inline-block group relative bg-gradient-to-b from-black/10 to-white/10 dark:from-white/10 dark:to-black/10 p-px rounded-2xl backdrop-blur-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <button
                      onClick={() => { onGo?.(); }}
                      className="rounded-[1.15rem] px-12 py-6 text-xl font-bold backdrop-blur-md 
                        bg-gradient-to-r from-white/95 to-gray-100/95 hover:from-white hover:to-gray-100 
                        dark:from-black/95 dark:to-gray-900/95 dark:hover:from-black dark:hover:to-gray-900
                        text-black dark:text-white transition-all duration-300 
                        group-hover:-translate-y-1 border border-black/10 dark:border-white/10
                        hover:shadow-lg dark:hover:shadow-neutral-800/50"
                    >
                      <span className="opacity-90 group-hover:opacity-100 transition-opacity">
                        GO
                      </span>
                      <span className="ml-3 opacity-70 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300 text-2xl">
                        →
                      </span>
                    </button>
                  </div>
                ) : (
                  // Boutons de connexion/inscription si l'utilisateur n'est pas connecté
                  <>
                    <div className="inline-block group relative bg-gradient-to-b from-black/10 to-white/10 dark:from-white/10 dark:to-black/10 p-px rounded-2xl backdrop-blur-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <button
                        onClick={() => { onSignup?.(); }}
                        className="rounded-[1.15rem] px-8 py-6 text-lg font-semibold backdrop-blur-md 
                          bg-white/95 hover:bg-white/100 dark:bg-black/95 dark:hover:bg-black/100 
                          text-black dark:text-white transition-all duration-300 
                          group-hover:-translate-y-0.5 border border-black/10 dark:border-white/10
                          hover:shadow-md dark:hover:shadow-neutral-800/50"
                      >
                        <span className="opacity-90 group-hover:opacity-100 transition-opacity">
                          Je m'inscris
                        </span>
                        <span className="ml-3 opacity-70 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all duration-300">
                          →
                        </span>
                      </button>
                    </div>

                    <div className="inline-block group relative bg-gradient-to-b from-black/10 to-white/10 dark:from-white/10 dark:to-black/10 p-px rounded-2xl backdrop-blur-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <button
                        onClick={() => { onLogin?.(); }}
                        className="rounded-[1.15rem] px-8 py-6 text-lg font-semibold backdrop-blur-md 
                          bg-transparent hover:bg-white/50 dark:hover:bg-black/50 
                          text-black dark:text-white transition-all duration-300 
                          group-hover:-translate-y-0.5 border border-black/10 dark:border-white/10
                          hover:shadow-md dark:hover:shadow-neutral-800/50"
                      >
                        <span className="opacity-90 group-hover:opacity-100 transition-opacity">
                          Connection
                        </span>
                        <span className="ml-3 opacity-70 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all duration-300">
                          →
                        </span>
                      </button>
                    </div>
                  </>
                )}
              </motion.div>
            </motion.div>
          </div>
          
          {/* Signature en bas à droite */}
          <div className="absolute bottom-4 right-4 z-20">
            <p className="text-xs text-gray-400 opacity-60">By MorganRize</p>
          </div>
        </AuroraBackground>
  );
}