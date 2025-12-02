import { useState } from 'react';
import { Dashboard } from './Dashboard';
import { AIChatbot } from './AIChatbot';
import { IOSBar } from './IOSBar';
import { Button } from '@/components/ui/button';
import { LogOut, Calendar } from 'lucide-react';

interface DashboardAppProps {
  onLogout?: () => void;
}

export function DashboardApp({ onLogout }: DashboardAppProps) {
  const [currentView, setCurrentView] = useState('/dashboard');

  const handleLogout = () => {
    onLogout?.();
  };

  const renderContent = () => {
    switch (currentView) {
      case '/book-call':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">Booker un Call</h1>
            <p className="text-gray-300">Planifiez un appel avec notre équipe d'experts pour accélérer votre croissance.</p>
            
            {/* Call Booking Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Calendar Integration */}
              <div className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border border-neutral-700 rounded-2xl p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-blue-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Calendrier</h2>
                </div>
                <p className="text-gray-400 mb-6">Choisissez un créneau qui vous convient pour votre appel stratégique.</p>
                
                {/* Calendar Placeholder */}
                <div className="bg-neutral-800 rounded-xl p-6 mb-6">
                  <div className="grid grid-cols-7 gap-2 text-center">
                    {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => (
                      <div key={day} className="text-gray-400 text-sm py-2">{day}</div>
                    ))}
                    {Array.from({ length: 35 }, (_, i) => (
                      <div key={i} className={`h-8 rounded-lg flex items-center justify-center text-sm ${
                        i >= 15 && i <= 20 ? 'bg-blue-500 text-white' : 'text-gray-500 hover:bg-neutral-700'
                      }`}>
                        {i + 1}
                      </div>
                    ))}
                  </div>
                </div>
                
                <button className="w-full py-3 px-6 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors font-semibold">
                  Réserver un créneau
                </button>
              </div>

              {/* Call Types */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-white">Types d'appels disponibles</h3>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-xl p-6">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold">1</span>
                      </div>
                      <h4 className="text-lg font-semibold text-white">Audit Gratuit</h4>
                    </div>
                    <p className="text-gray-400 text-sm mb-4">Analyse complète de votre stratégie marketing actuelle (30 min)</p>
                    <div className="flex items-center justify-between">
                      <span className="text-green-400 font-semibold">Gratuit</span>
                      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
                        Réserver
                      </button>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 border border-purple-500/20 rounded-xl p-6">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold">2</span>
                      </div>
                      <h4 className="text-lg font-semibold text-white">Stratégie Personnalisée</h4>
                    </div>
                    <p className="text-gray-400 text-sm mb-4">Plan d'action sur mesure pour votre entreprise (60 min)</p>
                    <div className="flex items-center justify-between">
                      <span className="text-yellow-400 font-semibold">Sur devis</span>
                      <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm">
                        Réserver
                      </button>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-500/10 to-green-600/10 border border-green-500/20 rounded-xl p-6">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold">3</span>
                      </div>
                      <h4 className="text-lg font-semibold text-white">Accompagnement VIP</h4>
                    </div>
                    <p className="text-gray-400 text-sm mb-4">Suivi personnalisé et prioritaire (90 min)</p>
                    <div className="flex items-center justify-between">
                      <span className="text-green-400 font-semibold">Premium</span>
                      <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm">
                        Réserver
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case '/formation':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">Formations</h1>
            <p className="text-gray-300">Accédez à nos formations premium pour maîtriser le marketing digital et l'IA.</p>
            
            {/* Featured Courses */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* MarketingOS Course */}
              <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-2xl p-6 hover:border-red-500/50 transition-all duration-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">MarketingOS</h3>
                    <p className="text-gray-400 text-sm">Formation complète</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-4">Maîtrisez les stratégies marketing avancées et les outils d'automatisation.</p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    <span>15 modules vidéo</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    <span>Certification incluse</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    <span>Accès à vie</span>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-white">497€</span>
                    <span className="text-gray-400 text-sm line-through ml-2">997€</span>
                  </div>
                  <button className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold">
                    Commencer
                  </button>
                </div>
              </div>

              {/* PartnerAI Course */}
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🤖</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">PartnerAI</h3>
                    <p className="text-gray-400 text-sm">Intelligence Artificielle</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-4">Découvrez comment intégrer l'IA dans votre stratégie business.</p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    <span>12 modules pratiques</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    <span>Outils IA inclus</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    <span>Support communautaire</span>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-white">297€</span>
                    <span className="text-gray-400 text-sm line-through ml-2">597€</span>
                  </div>
                  <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold">
                    Commencer
                  </button>
                </div>
              </div>

              {/* Growth Mastery Course */}
              <div className="bg-gradient-to-br from-green-500/20 to-teal-500/20 border border-green-500/30 rounded-2xl p-6 hover:border-green-500/50 transition-all duration-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Growth Mastery</h3>
                    <p className="text-gray-400 text-sm">Accélération</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-4">Techniques avancées pour accélérer la croissance de votre entreprise.</p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    <span>20 modules intensifs</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    <span>Coaching 1:1 inclus</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    <span>Garantie résultats</span>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-white">997€</span>
                    <span className="text-gray-400 text-sm line-through ml-2">1997€</span>
                  </div>
                  <button className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold">
                    Commencer
                  </button>
                </div>
              </div>
            </div>

            {/* Learning Progress */}
            <div className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 border border-neutral-700 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Vos Progrès</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-blue-400">3</span>
                  </div>
                  <h4 className="text-lg font-semibold text-white">Formations terminées</h4>
                  <p className="text-gray-400 text-sm">Sur 5 disponibles</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-green-400">85%</span>
                  </div>
                  <h4 className="text-lg font-semibold text-white">Progression moyenne</h4>
                  <p className="text-gray-400 text-sm">Excellent travail !</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-purple-400">12</span>
                  </div>
                  <h4 className="text-lg font-semibold text-white">Certifications</h4>
                  <p className="text-gray-400 text-sm">Obtenues cette année</p>
                </div>
              </div>
            </div>
          </div>
        );
      case '/chatbot':
        return (
          <div className="max-w-4xl mx-auto">
            <AIChatbot />
          </div>
        );
      case '/content':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">Suivi du Contenu</h1>
            <p className="text-gray-300">Analysez les performances de vos posts, vidéos et emails.</p>
            <div className="text-center py-12 text-gray-400">
              🚧 Module en développement - Sera disponible dans la version complète
            </div>
          </div>
        );
      case '/ads':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">Suivi des Publicités</h1>
            <p className="text-gray-300">Gérez vos campagnes Facebook, TikTok et YouTube.</p>
            <div className="text-center py-12 text-gray-400">
              🚧 Module en développement - Sera disponible dans la version complète
            </div>
          </div>
        );
      case '/funnel':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">Analyse d'Entonnoir</h1>
            <p className="text-gray-300">Suivez les conversions de leads à la vente.</p>
            <div className="text-center py-12 text-gray-400">
              🚧 Module en développement - Sera disponible dans la version complète
            </div>
          </div>
        );
      case '/calendar':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">Calendrier de Contenu</h1>
            <p className="text-gray-300">Planifiez vos posts avec un système drag & drop.</p>
            <div className="text-center py-12 text-gray-400">
              🚧 Module en développement - Sera disponible dans la version complète
            </div>
          </div>
        );
      case '/revenue':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">Suivi des Revenus</h1>
            <p className="text-gray-300">Analyse détaillée de vos revenus et objectifs.</p>
            <div className="text-center py-12 text-gray-400">
              🚧 Module en développement - Sera disponible dans la version complète
            </div>
          </div>
        );
      case '/leaderboard':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">Leaderboard du Contenu</h1>
            <p className="text-gray-300">Classement de vos contenus les plus performants.</p>
            <div className="text-center py-12 text-gray-400">
              🚧 Module en développement - Sera disponible dans la version complète
            </div>
          </div>
        );
      case '/kpis':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">KPIs & Gamification</h1>
            <p className="text-gray-300">Objectifs quotidiens et système de badges.</p>
            <div className="text-center py-12 text-gray-400">
              🚧 Module en développement - Sera disponible dans la version complète
            </div>
          </div>
        );
      case '/landing-pages':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">LandingPage et site</h1>
            <p className="text-gray-300">Créez et gérez vos landing pages avec l'IA.</p>
            
            {/* Search and Create Section */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Rechercher vos pages..."
                  className="w-full px-4 py-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <button
                onClick={() => window.open('/page-builder', '_blank')}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium"
              >
                🤖 Créer une page grâce à l'IA
              </button>
            </div>

            {/* Pages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Example pages */}
              <div className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border border-neutral-700 rounded-lg p-6 hover:border-blue-500/50 transition-all duration-200">
                <div className="aspect-video bg-neutral-700 rounded-md mb-4 flex items-center justify-center">
                  <span className="text-gray-400">Aperçu de la page</span>
                </div>
                <h3 className="text-white font-semibold mb-2">Page de vente produit</h3>
                <p className="text-gray-400 text-sm mb-4">Créée il y a 2 jours</p>
                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-2 bg-blue-500/20 text-blue-400 rounded-md hover:bg-blue-500/30 transition-colors text-sm">
                    Modifier
                  </button>
                  <button className="px-3 py-2 bg-neutral-700 text-gray-300 rounded-md hover:bg-neutral-600 transition-colors text-sm">
                    Dupliquer
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border border-neutral-700 rounded-lg p-6 hover:border-blue-500/50 transition-all duration-200">
                <div className="aspect-video bg-neutral-700 rounded-md mb-4 flex items-center justify-center">
                  <span className="text-gray-400">Aperçu de la page</span>
                </div>
                <h3 className="text-white font-semibold mb-2">Landing page service</h3>
                <p className="text-gray-400 text-sm mb-4">Créée il y a 1 semaine</p>
                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-2 bg-blue-500/20 text-blue-400 rounded-md hover:bg-blue-500/30 transition-colors text-sm">
                    Modifier
                  </button>
                  <button className="px-3 py-2 bg-neutral-700 text-gray-300 rounded-md hover:bg-neutral-600 transition-colors text-sm">
                    Dupliquer
                  </button>
                </div>
              </div>

              {/* Add New Page Card */}
              <div 
                onClick={() => window.open('/page-builder', '_blank')}
                className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border-2 border-dashed border-neutral-600 rounded-lg p-6 hover:border-blue-500/50 transition-all duration-200 cursor-pointer group"
              >
                <div className="aspect-video rounded-md mb-4 flex items-center justify-center border-2 border-dashed border-neutral-600 group-hover:border-blue-500/50 transition-colors">
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-2">
                      <span className="text-2xl">+</span>
                    </div>
                    <span className="text-gray-400 text-sm">Nouvelle page</span>
                  </div>
                </div>
                <h3 className="text-white font-semibold mb-2 text-center">Créer avec l'IA</h3>
                <p className="text-gray-400 text-sm text-center">Laissez l'IA créer votre page parfaite</p>
              </div>
            </div>
          </div>
        );
      case '/settings':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">Paramètres</h1>
            <p className="text-gray-300">Configurez votre compte et vos intégrations.</p>
            <div className="text-center py-12 text-gray-400">
              🚧 Module en développement - Sera disponible dans la version complète
            </div>
          </div>
        );
      case '/more':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">Plus d'options</h1>
            <p className="text-gray-300">Accédez aux fonctionnalités avancées de votre dashboard.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Additional navigation items */}
              <div className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border border-neutral-700 rounded-lg p-6 hover:border-blue-500/50 transition-all duration-200 cursor-pointer">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-blue-400">📊</span>
                  </div>
                  <h3 className="text-white font-semibold">Revenus</h3>
                </div>
                <p className="text-gray-400 text-sm mb-4">Analyse détaillée de vos revenus et objectifs.</p>
                <button 
                  onClick={() => setCurrentView('/revenue')}
                  className="w-full py-2 px-4 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors text-sm"
                >
                  Accéder
                </button>
              </div>

              <div className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border border-neutral-700 rounded-lg p-6 hover:border-blue-500/50 transition-all duration-200 cursor-pointer">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-green-400">🏆</span>
                  </div>
                  <h3 className="text-white font-semibold">Leaderboard</h3>
                </div>
                <p className="text-gray-400 text-sm mb-4">Classement de vos contenus les plus performants.</p>
                <button 
                  onClick={() => setCurrentView('/leaderboard')}
                  className="w-full py-2 px-4 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors text-sm"
                >
                  Accéder
                </button>
              </div>

              <div className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border border-neutral-700 rounded-lg p-6 hover:border-blue-500/50 transition-all duration-200 cursor-pointer">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-purple-400">⚡</span>
                  </div>
                  <h3 className="text-white font-semibold">KPIs</h3>
                </div>
                <p className="text-gray-400 text-sm mb-4">Objectifs quotidiens et système de badges.</p>
                <button 
                  onClick={() => setCurrentView('/kpis')}
                  className="w-full py-2 px-4 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors text-sm"
                >
                  Accéder
                </button>
              </div>

              <div className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border border-neutral-700 rounded-lg p-6 hover:border-blue-500/50 transition-all duration-200 cursor-pointer">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-orange-400">🏠</span>
                  </div>
                  <h3 className="text-white font-semibold">Landing Pages</h3>
                </div>
                <p className="text-gray-400 text-sm mb-4">Créez et gérez vos landing pages avec l'IA.</p>
                <button 
                  onClick={() => setCurrentView('/landing-pages')}
                  className="w-full py-2 px-4 bg-orange-500/20 text-orange-400 rounded-lg hover:bg-orange-500/30 transition-colors text-sm"
                >
                  Accéder
                </button>
              </div>

              <div className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border border-neutral-700 rounded-lg p-6 hover:border-blue-500/50 transition-all duration-200 cursor-pointer">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gray-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400">⚙️</span>
                  </div>
                  <h3 className="text-white font-semibold">Paramètres</h3>
                </div>
                <p className="text-gray-400 text-sm mb-4">Configurez votre compte et vos intégrations.</p>
                <button 
                  onClick={() => setCurrentView('/settings')}
                  className="w-full py-2 px-4 bg-gray-500/20 text-gray-400 rounded-lg hover:bg-gray-500/30 transition-colors text-sm"
                >
                  Accéder
                </button>
              </div>

              <div className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border border-neutral-700 rounded-lg p-6 hover:border-blue-500/50 transition-all duration-200 cursor-pointer">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-blue-400">🏠</span>
                  </div>
                  <h3 className="text-white font-semibold">Dashboard</h3>
                </div>
                <p className="text-gray-400 text-sm mb-4">Retour au tableau de bord principal.</p>
                <button 
                  onClick={() => setCurrentView('/dashboard')}
                  className="w-full py-2 px-4 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors text-sm"
                >
                  Accéder
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return <Dashboard onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#ffffff2c_1px,transparent_1px),linear-gradient(to_bottom,#3a3a3a01_1px,transparent_1px)] bg-[size:70px_80px]"></div>
        <div
          className="absolute top-0 left-[10%] right-[10%] w-[80%] h-full z-0"
          style={{
            backgroundImage: `radial-gradient(circle at center, #206ce8 0%, transparent 70%)`,
            opacity: 0.6,
            mixBlendMode: "multiply",
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b border-neutral-800 bg-black/80 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <h2 className="font-semibold text-white">
              {currentView === '/dashboard' ? 'Dashboard' : 
               currentView === '/book-call' ? 'Booker un Call' :
               currentView === '/formation' ? 'Formations' :
               currentView === '/chatbot' ? 'Growth Operator IA' :
               currentView.replace('/', '').charAt(0).toUpperCase() + currentView.replace('/', '').slice(1)}
            </h2>
          </div>
          <div className="flex items-center gap-2">
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6 pb-24">
          {renderContent()}
        </main>

        {/* iOS Bar */}
        <IOSBar onNavigate={setCurrentView} currentView={currentView} />
      </div>
    </div>
  );
}