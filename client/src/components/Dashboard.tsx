import React from 'react';
import { motion } from 'framer-motion';
import { BentoCard, BentoGrid } from './BentoGrid';
import { 
  Calendar, 
  BookOpen, 
  Image as ImageIcon, 
  Code, 
  Layout,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface DashboardProps {
  onNavigate?: (path: string) => void;
}

// Background components for each card
const CallBookingBackground = () => (
  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />
    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />
    <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/20 rounded-full blur-2xl" />
    <div className="absolute inset-0 flex items-center justify-center opacity-10">
      <Calendar className="w-64 h-64 text-white" />
    </div>
  </div>
);

const FormationBackground = () => (
  <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-purple-700 to-pink-800">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />
    <div className="absolute top-0 right-0 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl" />
    <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-400/20 rounded-full blur-2xl" />
    <div className="absolute inset-0 flex items-center justify-center opacity-10">
      <BookOpen className="w-64 h-64 text-white" />
    </div>
  </div>
);

const RessourcesGraphiquesBackground = () => (
  <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-emerald-700 to-teal-800">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />
    <div className="absolute top-0 right-0 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl" />
    <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-400/20 rounded-full blur-2xl" />
    <div className="absolute inset-0 flex items-center justify-center opacity-10">
      <ImageIcon className="w-64 h-64 text-white" />
    </div>
  </div>
);

const ApplicationExempleBackground = () => (
  <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-orange-700 to-red-800">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />
    <div className="absolute top-0 right-0 w-96 h-96 bg-red-400/20 rounded-full blur-3xl" />
    <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-400/20 rounded-full blur-2xl" />
    <div className="absolute inset-0 flex items-center justify-center opacity-10">
      <Code className="w-64 h-64 text-white" />
    </div>
  </div>
);

const FrameworkAppBackground = () => (
  <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 via-cyan-700 to-blue-800">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />
    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />
    <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-400/20 rounded-full blur-2xl" />
    <div className="absolute inset-0 flex items-center justify-center opacity-10">
      <Layout className="w-64 h-64 text-white" />
    </div>
  </div>
);

export function Dashboard({ onNavigate }: DashboardProps = {}) {
  const handleCardClick = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-white via-gray-100 to-gray-200 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-xl md:text-2xl text-gray-300">
            Bienvenue dans votre espace RizeApps™
          </p>
        </motion.div>

        {/* Bento Grid */}
        <BentoGrid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[22rem]">
          <BentoCard
            name="Réservation d'appel"
            className="col-span-3 md:col-span-2"
            description="Réservez un appel stratégique avec nos experts pour accélérer votre croissance et obtenir des conseils personnalisés."
            href="/book-call"
            cta="Réserve ton appel de semaine"
            Icon={Calendar}
            background={<CallBookingBackground />}
            onClick={() => handleCardClick('/book-call')}
          />
          
          <BentoCard
            name="Formation"
            className="col-span-3 md:col-span-1"
            description="Accédez à nos formations exclusives et développez vos compétences en marketing, vente et croissance."
            href="/formation"
            cta="Voir les formations"
            Icon={BookOpen}
            background={<FormationBackground />}
            onClick={() => handleCardClick('/formation')}
          />
          
          <BentoCard
            name="Ressources Graphiques"
            className="col-span-3 md:col-span-1"
            description="Bibliothèque complète de ressources graphiques, templates et designs pour booster votre communication visuelle."
            href="/resources"
            cta="Explorer les ressources"
            Icon={ImageIcon}
            background={<RessourcesGraphiquesBackground />}
            onClick={() => handleCardClick('/resources')}
          />
          
          <BentoCard
            name="Application Exemple"
            className="col-span-3 md:col-span-2"
            description="Découvrez des exemples d'applications réussies et inspirez-vous pour créer la vôtre."
            href="/examples"
            cta="Voir les exemples"
            Icon={Code}
            background={<ApplicationExempleBackground />}
            onClick={() => handleCardClick('/examples')}
          />
          
          <BentoCard
            name="Framework App"
            className="col-span-3 md:col-span-3"
            description="Utilisez notre framework puissant pour construire rapidement votre application avec les meilleures pratiques."
            href="/framework"
            cta="Commencer avec le framework"
            Icon={Layout}
            background={<FrameworkAppBackground />}
            onClick={() => handleCardClick('/framework')}
          />
        </BentoGrid>
      </div>
    </div>
  );
}
