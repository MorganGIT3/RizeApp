import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';
import { getUserProfile, UserProfile } from '@/lib/supabase';
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
  Layout
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
                  name="Réservation d'appel"
                  className="col-span-2 md:col-span-2"
                  Icon={Calendar}
                  background={<CallBookingBackground />}
                  onClick={() => setCurrentView('/book-call')}
                />
                
                <GoldCard
                  name="Formation"
                  className="col-span-1 md:col-span-1"
                  Icon={BookOpen}
                  background={<FormationBackground />}
                  onClick={() => setCurrentView('/formation')}
                />
                
                <GoldCard
                  name="Ressources Graphiques"
                  className="col-span-1 md:col-span-1"
                  Icon={ImageIcon}
                  background={<RessourcesGraphiquesBackground />}
                  onClick={() => setCurrentView('/resources')}
                />
                
                <GoldCard
                  name="Application Exemple"
                  className="col-span-1 md:col-span-1"
                  Icon={Code}
                  background={<ApplicationExempleBackground />}
                  onClick={() => setCurrentView('/examples')}
                />
                
                <GoldCard
                  name="Framework App"
                  className="col-span-1 md:col-span-1"
                  Icon={Layout}
                  background={<FrameworkAppBackground />}
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
      case '/resources':
      case '/examples':
      case '/framework':
        return (
          <div className="min-h-screen relative overflow-hidden" style={{ overflow: 'hidden', height: '100vh' }}>
            <div className="relative z-10 p-8 md:p-12">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  {currentView === '/formation' && 'Formation'}
                  {currentView === '/resources' && 'Ressources Graphiques'}
                  {currentView === '/examples' && 'Application Exemple'}
                  {currentView === '/framework' && 'Framework App'}
                </h1>
                <p className="text-xl text-white/60">
                  Page en développement
                </p>
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setLoading(true);
    try {
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
                      <span className="text-white">{profile?.email || 'Non disponible'}</span>
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
