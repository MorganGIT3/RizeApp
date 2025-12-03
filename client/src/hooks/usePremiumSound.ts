import { useCallback } from 'react';

/**
 * Hook pour créer un son premium, sobre et élégant
 * Utilisé pour les interactions importantes (connexion, dashboard, etc.)
 */
export const usePremiumSound = () => {
  const playPremiumSound = useCallback(() => {
    try {
      const AudioCtx = (window as any).AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      // Créer une chaîne d'effets premium
      const reverb = ctx.createConvolver();
      const lowpass = ctx.createBiquadFilter();
      const compressor = ctx.createDynamicsCompressor();
      
      // Configuration du filtre passe-bas pour un son chaleureux et sobre
      lowpass.type = "lowpass";
      lowpass.frequency.setValueAtTime(4000, now);
      lowpass.Q.setValueAtTime(0.8, now);
      
      // Compression pour un son plus équilibré et professionnel
      compressor.threshold.setValueAtTime(-24, now);
      compressor.knee.setValueAtTime(30, now);
      compressor.ratio.setValueAtTime(12, now);
      compressor.attack.setValueAtTime(0.003, now);
      compressor.release.setValueAtTime(0.25, now);

      // Gain master avec fade-in/out élégant
      const master = ctx.createGain();
      master.gain.setValueAtTime(0, now);
      master.gain.linearRampToValueAtTime(0.18, now + 0.1);
      master.gain.exponentialRampToValueAtTime(0.001, now + 2.5);
      
      // Connexion : master -> compressor -> lowpass -> destination
      master.connect(compressor);
      compressor.connect(lowpass);
      lowpass.connect(ctx.destination);

      // Fonction pour créer une note avec enveloppe ADSR premium
      const playPremiumTone = (
        freq: number, 
        start: number, 
        duration: number, 
        detune = 0,
        type: OscillatorType = "sine"
      ) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, now + start);
        if (detune !== 0) {
          osc.detune.setValueAtTime(detune, now + start);
        }

        // Enveloppe ADSR premium : Attack, Decay, Sustain, Release
        const attackTime = 0.15;  // Montée douce
        const decayTime = 0.2;    // Légère descente
        const sustainLevel = 0.7; // Niveau de sustain
        const releaseTime = duration * 0.6; // Fade-out élégant

        gain.gain.setValueAtTime(0, now + start);
        gain.gain.linearRampToValueAtTime(0.8, now + start + attackTime); // Attack
        gain.gain.linearRampToValueAtTime(sustainLevel, now + start + attackTime + decayTime); // Decay
        gain.gain.setValueAtTime(sustainLevel, now + start + duration - releaseTime); // Sustain
        gain.gain.exponentialRampToValueAtTime(0.001, now + start + duration); // Release

        osc.connect(gain);
        gain.connect(master);

        osc.start(now + start);
        osc.stop(now + start + duration);
      };

      // Séquence harmonieuse et élégante en accord majeur 7ème
      // Progression sophistiquée et sobre : Do-Mi-Sol-Si-Do
      // Fréquences soigneusement choisies pour un effet premium
      
      // Première note : fondamentale douce
      playPremiumTone(261.63, 0.0, 1.2, 0, "sine");      // C4 - Do (fondamentale)
      
      // Harmoniques subtiles qui s'ajoutent progressivement
      playPremiumTone(329.63, 0.2, 1.0, 0, "sine");      // E4 - Mi (tierce majeure)
      playPremiumTone(392.00, 0.35, 0.9, 0, "sine");     // G4 - Sol (quinte)
      
      // Note aiguë qui apporte de l'élégance
      playPremiumTone(493.88, 0.5, 0.7, 0, "sine");      // B4 - Si (septième)
      
      // Finale avec octave supérieure pour une conclusion premium
      playPremiumTone(523.25, 0.7, 0.6, 0, "sine");      // C5 - Do (octave)
      
      // Harmonie subtile avec une légère variation de détune pour plus de profondeur
      playPremiumTone(261.63, 0.8, 0.5, 3, "sine");      // Légère variation pour la profondeur
      
      // Fermeture élégante du contexte audio
      setTimeout(() => {
        try { 
          ctx.close(); 
        } catch (e) {
          // Ignorer les erreurs de fermeture
        }
      }, 3000);
    } catch (error) {
      console.log("Audio not available:", error);
    }
  }, []);

  return { playPremiumSound };
};

