import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Phone, AlertCircle } from "lucide-react"
import { DigitalSerenityBackground } from "./DigitalSerenityBackground"

export function SimpleCalComRedirect() {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isRedirecting, setIsRedirecting] = useState(false)


  const handleButtonClick = () => {
    setShowConfirmation(true)
  }

  const handleConfirm = () => {
    setIsRedirecting(true)
    // Rediriger vers cal.com
    window.location.href = 'https://cal.com/smartappacademy/rizecall'
  }

  const handleCancel = () => {
    setShowConfirmation(false)
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-black to-slate-800" style={{ overflow: 'hidden', height: '100vh' }}>
      {/* Fond DigitalSerenity */}
      <DigitalSerenityBackground />

      {/* Contenu principal */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl"
        >
          {/* Icône animée avec LEDs */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring", bounce: 0.5 }}
            className="relative mb-8 mx-auto w-32 h-32 rounded-3xl flex items-center justify-center"
            style={{
              background: 'radial-gradient(circle 280px at 0% 0%, rgba(68, 68, 68, 0.3), rgba(12, 13, 13, 1))',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.08), 0 4px 12px rgba(0, 0, 0, 0.6)'
            }}
          >
            {/* LED animée autour de l'icône */}
            <motion.div
              className="absolute -inset-[2px] rounded-3xl"
              style={{
                background: 'radial-gradient(circle 230px at 0% 0%, rgba(255, 255, 255, 0.1), rgba(12, 13, 13, 0.9))',
              }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
            {/* Grille de fond */}
            <div 
              className="absolute inset-0 rounded-3xl opacity-5"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '10px 10px'
              }}
            />
            <Phone className="h-16 w-16 text-white relative z-10" />
          </motion.div>

          {/* Titre */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extralight leading-tight tracking-tight text-slate-50 mb-6"
          >
            Réserve tes appels de la semaine
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-white/60 mb-12"
          >
            Un moment privilégié pour échanger et avancer ensemble
          </motion.p>

          {/* Bouton principal avec LEDs */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4, type: "spring" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleButtonClick}
            className="relative text-white px-12 py-6 rounded-2xl font-semibold text-xl transition-all duration-300 flex items-center gap-3 mx-auto overflow-hidden"
            style={{
              background: 'radial-gradient(circle 280px at 0% 0%, rgba(68, 68, 68, 0.3), rgba(12, 13, 13, 1))',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.1), 0 4px 12px rgba(0, 0, 0, 0.6)'
            }}
          >
            {/* LED animée */}
            <motion.div
              className="absolute -inset-[1px] rounded-2xl"
              style={{
                background: 'radial-gradient(circle 230px at 0% 0%, rgba(255, 255, 255, 0.1), rgba(12, 13, 13, 0.9))',
              }}
              animate={{
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
            <Calendar className="h-8 w-8 relative z-10" />
            <span className="relative z-10">Booker mes appels de la semaine</span>
          </motion.button>
        </motion.div>
      </div>

      {/* Popup de confirmation personnalisée */}
      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay sombre */}
          <div 
            className="absolute inset-0 bg-black/60"
            onClick={handleCancel}
          />
          
          {/* Contenu de la popup */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 overflow-hidden"
            style={{
              background: 'radial-gradient(circle 280px at 0% 0%, rgba(68, 68, 68, 0.3), rgba(12, 13, 13, 1))',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.1), 0 8px 32px rgba(0, 0, 0, 0.8)'
            }}
          >
            {/* LED animée autour de la popup */}
            <motion.div
              className="absolute -inset-[1px] rounded-2xl"
              style={{
                background: 'radial-gradient(circle 230px at 0% 0%, rgba(255, 255, 255, 0.1), rgba(12, 13, 13, 0.9))',
              }}
              animate={{
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
            
            {/* Icône d'alerte */}
            <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-6 relative z-10"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
              <AlertCircle className="h-8 w-8 text-white" />
            </div>

            {/* Message */}
            <h2 className="text-2xl font-extralight leading-tight tracking-tight text-slate-50 mb-4 text-center relative z-10">
              Confirmation importante
            </h2>
            
            <div className="rounded-xl p-6 mb-6 relative z-10"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
              <p className="text-white/80 text-lg leading-relaxed">
                Si vous appuyez sur <span className="font-semibold text-white">continuer</span>, 
                vous n'aurez plus qu'<span className="font-semibold text-white">1 appel</span> disponible pour cette semaine.
              </p>
              <p className="text-white/60 mt-4">
                Voulez-vous vraiment continuer ?
              </p>
              <p className="text-white font-semibold mt-4">
                📅 Vous pourrez booker 2 nouveaux appels à partir de lundi prochain
              </p>
            </div>

            {/* Message important */}
            <div className="rounded-xl p-4 mb-6 relative z-10"
              style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)'
              }}>
              <p className="text-white font-semibold text-center">
                ⚠️ TRÈS IMPORTANT : Réserver votre appel avec le même email que vous avez utilisé pour votre connexion sur votre app RizeAppHub™
              </p>
            </div>

            {/* Boutons */}
            <div className="flex gap-4 justify-center relative z-10">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCancel}
                className="px-8 py-3 rounded-xl font-semibold transition-all"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'white'
                }}
              >
                Annuler
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleConfirm}
                disabled={isRedirecting}
                className="px-8 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 relative overflow-hidden"
                style={{
                  background: 'radial-gradient(circle 280px at 0% 0%, rgba(68, 68, 68, 0.3), rgba(12, 13, 13, 1))',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.6)'
                }}
              >
                {isRedirecting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full relative z-10"
                    />
                    <span className="relative z-10">Redirection...</span>
                  </>
                ) : (
                  <>
                    <Calendar className="h-5 w-5 relative z-10" />
                    <span className="relative z-10">Continuer</span>
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}

    </div>
  )
}
