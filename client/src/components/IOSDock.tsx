import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Image as ImageIcon, Code, Layout } from 'lucide-react';

// Icon components
const HomeIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const PhoneIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const CalendarIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

// Tooltip component
const Tooltip = ({ children, content }: { children: React.ReactNode; content: string }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-3 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 backdrop-blur-sm rounded-lg shadow-xl whitespace-nowrap z-50 border border-gray-700/50"
          style={{
            boxShadow: '0 4px 12px 0 rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1) inset'
          }}
        >
          {content}
        </motion.div>
      )}
    </div>
  );
};

// Dock item component
const DockItem = ({ children, tooltip, onClick }: { 
  children: React.ReactNode; 
  tooltip: string; 
  onClick?: () => void;
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.2, y: -8 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="relative cursor-pointer"
      onClick={onClick}
    >
      <Tooltip content={tooltip}>
        {children}
      </Tooltip>
    </motion.div>
  );
};

// Main dock component
interface IOSDockProps {
  onHomeClick: () => void;
  onCallClick: () => void;
  onFormationClick?: () => void;
  onResourcesClick?: () => void;
  onExamplesClick?: () => void;
  onFrameworkClick?: () => void;
  currentView?: string;
}

export const IOSDock = ({ 
  onHomeClick, 
  onCallClick,
  onFormationClick,
  onResourcesClick,
  onExamplesClick,
  onFrameworkClick,
  currentView = '/dashboard' 
}: IOSDockProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-6 left-0 right-0 flex justify-center z-50"
      style={{
        left: 0,
        right: 0,
        margin: '0 auto'
      }}
    >
      <div className="flex items-center gap-1.5 px-3 py-2 bg-black/80 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl"
           style={{
             boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.1) inset'
           }}>
        
        {/* Home */}
        <DockItem tooltip="Dashboard" onClick={onHomeClick}>
          <div className={`w-10 h-10 rounded-xl transition-all duration-300 shadow-lg flex items-center justify-center ${
            currentView === '/dashboard'
              ? 'bg-gradient-to-br from-white via-gray-100 to-gray-200'
              : 'bg-gradient-to-br from-gray-700 via-gray-600 to-gray-700 hover:from-gray-600 hover:via-gray-500 hover:to-gray-600'
          }`}
               style={currentView === '/dashboard' ? {
                 boxShadow: '0 4px 12px 0 rgba(255, 255, 255, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.4) inset'
               } : {}}>
            <HomeIcon className={`w-5 h-5 ${currentView === '/dashboard' ? 'text-gray-900' : 'text-gray-300'}`} />
          </div>
        </DockItem>

        {/* Réserver un Call */}
        <DockItem tooltip="Réserver un Call" onClick={onCallClick}>
          <div className={`w-10 h-10 rounded-xl transition-all duration-300 shadow-lg flex items-center justify-center ${
            currentView === '/book-call'
              ? 'bg-gradient-to-br from-white via-gray-100 to-gray-200'
              : 'bg-gradient-to-br from-gray-700 via-gray-600 to-gray-700 hover:from-gray-600 hover:via-gray-500 hover:to-gray-600'
          }`}
               style={currentView === '/book-call' ? {
                 boxShadow: '0 4px 12px 0 rgba(255, 255, 255, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.4) inset'
               } : {}}>
            <PhoneIcon className={`w-5 h-5 ${currentView === '/book-call' ? 'text-gray-900' : 'text-gray-300'}`} />
          </div>
        </DockItem>

        {/* Formation */}
        {onFormationClick && (
          <DockItem tooltip="Formation" onClick={onFormationClick}>
            <div className={`w-10 h-10 rounded-xl transition-all duration-300 shadow-lg flex items-center justify-center ${
              currentView === '/formation'
                ? 'bg-gradient-to-br from-white via-gray-100 to-gray-200'
                : 'bg-gradient-to-br from-gray-700 via-gray-600 to-gray-700 hover:from-gray-600 hover:via-gray-500 hover:to-gray-600'
            }`}
                 style={currentView === '/formation' ? {
                   boxShadow: '0 4px 12px 0 rgba(255, 255, 255, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.4) inset'
                 } : {}}>
              <BookOpen className={`w-5 h-5 ${currentView === '/formation' ? 'text-gray-900' : 'text-gray-300'}`} />
            </div>
          </DockItem>
        )}

        {/* Ressources Graphiques */}
        {onResourcesClick && (
          <DockItem tooltip="Ressources Graphiques" onClick={onResourcesClick}>
            <div className={`w-10 h-10 rounded-xl transition-all duration-300 shadow-lg flex items-center justify-center ${
              currentView === '/resources'
                ? 'bg-gradient-to-br from-white via-gray-100 to-gray-200'
                : 'bg-gradient-to-br from-gray-700 via-gray-600 to-gray-700 hover:from-gray-600 hover:via-gray-500 hover:to-gray-600'
            }`}
                 style={currentView === '/resources' ? {
                   boxShadow: '0 4px 12px 0 rgba(255, 255, 255, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.4) inset'
                 } : {}}>
              <ImageIcon className={`w-5 h-5 ${currentView === '/resources' ? 'text-gray-900' : 'text-gray-300'}`} />
            </div>
          </DockItem>
        )}

        {/* Application Exemple */}
        {onExamplesClick && (
          <DockItem tooltip="Application Exemple" onClick={onExamplesClick}>
            <div className={`w-10 h-10 rounded-xl transition-all duration-300 shadow-lg flex items-center justify-center ${
              currentView === '/examples'
                ? 'bg-gradient-to-br from-white via-gray-100 to-gray-200'
                : 'bg-gradient-to-br from-gray-700 via-gray-600 to-gray-700 hover:from-gray-600 hover:via-gray-500 hover:to-gray-600'
            }`}
                 style={currentView === '/examples' ? {
                   boxShadow: '0 4px 12px 0 rgba(255, 255, 255, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.4) inset'
                 } : {}}>
              <Code className={`w-5 h-5 ${currentView === '/examples' ? 'text-gray-900' : 'text-gray-300'}`} />
            </div>
          </DockItem>
        )}

        {/* Front-end téléchargeable */}
        {onFrameworkClick && (
          <DockItem tooltip="Front-end téléchargeable" onClick={onFrameworkClick}>
            <div className={`w-10 h-10 rounded-xl transition-all duration-300 shadow-lg flex items-center justify-center ${
              currentView === '/framework'
                ? 'bg-gradient-to-br from-white via-gray-100 to-gray-200'
                : 'bg-gradient-to-br from-gray-700 via-gray-600 to-gray-700 hover:from-gray-600 hover:via-gray-500 hover:to-gray-600'
            }`}
                 style={currentView === '/framework' ? {
                   boxShadow: '0 4px 12px 0 rgba(255, 255, 255, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.4) inset'
                 } : {}}>
              <Layout className={`w-5 h-5 ${currentView === '/framework' ? 'text-gray-900' : 'text-gray-300'}`} />
            </div>
          </DockItem>
        )}

      </div>
    </motion.div>
  );
};
