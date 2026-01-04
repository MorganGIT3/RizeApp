import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useDramaticSound } from '@/hooks/useDramaticSound';
import { getCurrentUser } from '@/lib/supabase';
import { DigitalSerenityBackground } from './DigitalSerenityBackground';

interface OnboardingPageProps {
  onContinue: () => void;
}

export function OnboardingPage({ onContinue }: OnboardingPageProps) {
  const { playDramaticSound } = useDramaticSound();
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const user = await getCurrentUser();
        if (user) {
          // Utiliser les métadonnées de l'utilisateur pour récupérer le nom
          const firstName = user.user_metadata?.first_name || 
                           user.user_metadata?.full_name?.split(' ')[0] || 
                           user.email?.split('@')[0] || '';
          setUserName(firstName);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du nom:', error);
      }
    };

    fetchUserName();
  }, []);
  
  const title = userName ? `Bienvenue ${userName} dans RizeApps™` : "Bienvenue dans RizeApps™";
  const words = title.split(" ");

  const handleDashboardClick = () => {
    playDramaticSound();
    onContinue(); // Accès direct au dashboard
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-black to-slate-800">
      {/* Fond DigitalSerenity global */}
        <div className="absolute inset-0 z-0">
          <DigitalSerenityBackground />
        </div>

      {/* Contenu principal centré verticalement et horizontalement */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-8 w-full max-w-4xl mx-auto">
        
        {/* Badge de bienvenue - en haut */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-white/90 to-gray-100/90 border border-gray-300/30 shadow-md shadow-gray-500/20 mb-4"
        >
          <div className="flex items-center justify-center w-3 h-3">
            <svg className="w-2.5 h-2.5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <span className="text-xs font-medium text-gray-800">
            Votre espace d'accompagnement privé
          </span>
        </motion.div>

        {/* Titre principal - centre */}
            <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tighter"
        >
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
                    delay: wordIndex * 0.15 + letterIndex * 0.04,
                    type: "spring",
                    stiffness: 150,
                    damping: 25,
                  }}
                  className="inline-block text-transparent bg-clip-text 
                    bg-gradient-to-r from-white to-gray-300"
                >
                  {letter}
                </motion.span>
              ))}
            </span>
              ))}
            </motion.h1>


        {/* Bouton magnifique - centre */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.8, type: "spring", stiffness: 200 }}
          className="relative mt-8"
          >
            <button className="styled-button" onClick={handleDashboardClick}>
              <div className="bg"></div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 342 208"
                height="208"
                width="342"
                className="splash"
              >
                <path
                  strokeLinecap="round"
                  strokeWidth="3"
                  d="M54.1054 99.7837C54.1054 99.7837 40.0984 90.7874 26.6893 97.6362C13.2802 104.485 1.5 97.6362 1.5 97.6362"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeWidth="3"
                  d="M285.273 99.7841C285.273 99.7841 299.28 90.7879 312.689 97.6367C326.098 104.486 340.105 95.4893 340.105 95.4893"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeWidth="3"
                  strokeOpacity="0.3"
                  d="M281.133 64.9917C281.133 64.9917 287.96 49.8089 302.934 48.2295C317.908 46.6501 319.712 36.5272 319.712 36.5272"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeWidth="3"
                  strokeOpacity="0.3"
                  d="M281.133 138.984C281.133 138.984 287.96 154.167 302.934 155.746C317.908 157.326 319.712 167.449 319.712 167.449"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeWidth="3"
                  d="M230.578 57.4476C230.578 57.4476 225.785 41.5051 236.061 30.4998C246.337 19.4945 244.686 12.9998 244.686 12.9998"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeWidth="3"
                  d="M230.578 150.528C230.578 150.528 225.785 166.471 236.061 177.476C246.337 188.481 244.686 194.976 244.686 194.976"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeWidth="3"
                  strokeOpacity="0.3"
                  d="M170.392 57.0278C170.392 57.0278 173.89 42.1322 169.571 29.54C165.252 16.9478 168.751 2.05227 168.751 2.05227"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeWidth="3"
                  strokeOpacity="0.3"
                  d="M170.392 150.948C170.392 150.948 173.89 165.844 169.571 178.436C165.252 191.028 168.751 205.924 168.751 205.924"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeWidth="3"
                  d="M112.609 57.4476C112.609 57.4476 117.401 41.5051 107.125 30.4998C96.8492 19.4945 98.5 12.9998 98.5 12.9998"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeWidth="3"
                  d="M112.609 150.528C112.609 150.528 117.401 166.471 107.125 177.476C96.8492 188.481 98.5 194.976 98.5 194.976"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeWidth="3"
                  strokeOpacity="0.3"
                  d="M62.2941 64.9917C62.2941 64.9917 55.4671 49.8089 40.4932 48.2295C25.5194 46.6501 23.7159 36.5272 23.7159 36.5272"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeWidth="3"
                  strokeOpacity="0.3"
                  d="M62.2941 145.984C62.2941 145.984 55.4671 161.167 40.4932 162.746C25.5194 164.326 23.7159 174.449 23.7159 174.449"
                ></path>
              </svg>

              <div className="wrap">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 221 42"
                  height="42"
                  width="221"
                  className="path"
                >
                  <path
                    strokeLinecap="round"
                    strokeWidth="3"
                    d="M182.674 2H203C211.837 2 219 9.16344 219 18V24C219 32.8366 211.837 40 203 40H18C9.16345 40 2 32.8366 2 24V18C2 9.16344 9.16344 2 18 2H47.8855"
                  ></path>
                </svg>

                <div className="outline"></div>
                <div className="content">
                  <span className="char state-1">
                    <span data-label="D" style={{'--i': 1} as React.CSSProperties}>D</span>
                    <span data-label="a" style={{'--i': 2} as React.CSSProperties}>a</span>
                    <span data-label="s" style={{'--i': 3} as React.CSSProperties}>s</span>
                    <span data-label="h" style={{'--i': 4} as React.CSSProperties}>h</span>
                    <span data-label="b" style={{'--i': 5} as React.CSSProperties}>b</span>
                    <span data-label="o" style={{'--i': 6} as React.CSSProperties}>o</span>
                    <span data-label="a" style={{'--i': 7} as React.CSSProperties}>a</span>
                    <span data-label="r" style={{'--i': 8} as React.CSSProperties}>r</span>
                    <span data-label="d" style={{'--i': 9} as React.CSSProperties}>d</span>
                  </span>

                  <div className="icon">
                    <div></div>
                  </div>

                  <span className="char state-2">
                    <span data-label="D" style={{'--i': 1} as React.CSSProperties}>D</span>
                    <span data-label="a" style={{'--i': 2} as React.CSSProperties}>a</span>
                    <span data-label="s" style={{'--i': 3} as React.CSSProperties}>s</span>
                    <span data-label="h" style={{'--i': 4} as React.CSSProperties}>h</span>
                    <span data-label="b" style={{'--i': 5} as React.CSSProperties}>b</span>
                    <span data-label="o" style={{'--i': 6} as React.CSSProperties}>o</span>
                    <span data-label="a" style={{'--i': 7} as React.CSSProperties}>a</span>
                    <span data-label="r" style={{'--i': 8} as React.CSSProperties}>r</span>
                    <span data-label="d" style={{'--i': 9} as React.CSSProperties}>d</span>
                  </span>
                </div>
              </div>
            </button>
          </motion.div>
      </div>

      {/* Signature en bas à droite - position absolue */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.2 }}
        className="absolute bottom-4 right-4 z-20"
      >
        <p className="text-xs text-gray-400 opacity-60">By MorganRize</p>
      </motion.div>

    </div>
  );
}
