import { useState, useEffect } from 'react';
import LandingPageNew from './LandingPageNew';
import { AuthModal } from './AuthModal';
import { OTPVerification } from './OTPVerification';
import AnimatedBackground from './AnimatedBackground';
import { Zap } from 'lucide-react';
import { useClickSound } from '@/hooks/useClickSound';
import { supabase } from '@/lib/supabase';

interface LandingPageProps {
  onLogin?: () => void;
}

export function LandingPage({ onLogin }: LandingPageProps) {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const playClick = useClickSound(0.3);

  useEffect(() => {
    checkAuth();
    
    // Écouter les changements de session
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
      setIsCheckingAuth(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    } catch (error) {
      console.error('Erreur lors de la vérification de la session:', error);
      setIsAuthenticated(false);
    } finally {
      setIsCheckingAuth(false);
    }
  };

  const handleAuthSuccess = () => {
    // Fermer immédiatement le modal
    setAuthModalOpen(false);
    // Vérifier à nouveau la session
    checkAuth();
    // Appeler directement onLogin pour aller à l'onboarding
    onLogin?.();
  };

  const handleGoClick = () => {
    playClick();
    onLogin?.();
  };


  return (
    <div className="relative min-h-screen bg-black">
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Logo seulement en haut à gauche */}
      <div className="absolute top-0 left-0 z-10 p-6">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-lg shadow-gray-500/30">
            <Zap className="h-4 w-4 text-black" />
          </div>
          <span className="font-bold text-xl text-white">RizeAppHub™</span>
        </div>
      </div>

      {/* Bouton Admin discret en haut à droite */}
      <div className="absolute top-0 right-0 z-30 p-6">
        <button 
          onClick={() => { playClick(); setOtpModalOpen(true); }}
          className="text-xs text-gray-400 hover:text-gray-200 transition-colors duration-200 opacity-30 hover:opacity-60 cursor-pointer"
          title="Accès Admin"
        >
          Admin
        </button>
      </div>

      {/* New Landing Page Content */}
      <div className="relative z-20">
        {!isCheckingAuth && (
          <LandingPageNew 
            isAuthenticated={isAuthenticated}
            onLogin={() => setAuthModalOpen(true)}
            onSignup={() => setAuthModalOpen(true)}
            onGo={handleGoClick}
          />
        )}
      </div>

      {/* Modals */}
      <AuthModal 
        open={authModalOpen} 
        onOpenChange={setAuthModalOpen}
        onAuthSuccess={handleAuthSuccess}
      />
      
      {/* OTP Modal */}
      {otpModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ border: 'none', outline: 'none' }}>
          <div className="absolute inset-0 bg-black/80" onClick={() => setOtpModalOpen(false)} />
          <div className="relative z-10" style={{ border: 'none', outline: 'none' }}>
            <OTPVerification 
              onSuccess={() => {
                console.log("Accès admin accordé!")
                setOtpModalOpen(false)
                // Rediriger vers le dashboard admin
                window.location.href = '/admin-dashboard'
              }}
              onClose={() => setOtpModalOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}