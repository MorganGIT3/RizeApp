"use client"

import * as React from "react"
import { useState } from "react"
import { Calendar, Clock, Users, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

// Types TypeScript pour Cal.com
declare global {
  interface Window {
    Cal: any
  }
}

// Composant Cal.com intégré avec le code fourni
const CalComIntegratedWidget = () => {
  const [showCalendar, setShowCalendar] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const handleOpenCalendar = () => {
    setIsLoading(true)
    setShowCalendar(true)
    
    // Charger le script Cal.com et initialiser le calendrier
    const loadCalComScript = () => {
      // Vérifier si le script est déjà chargé
      if (window.Cal) {
        initializeCalendar()
        return
      }
      
      // Charger le script Cal.com
      const script = document.createElement('script')
      script.src = 'https://app.cal.com/embed/embed.js'
      script.onload = () => {
        initializeCalendar()
      }
      script.onerror = () => {
        console.error('Erreur lors du chargement du script Cal.com')
        setIsLoading(false)
      }
      document.head.appendChild(script)
    }
    
    const initializeCalendar = () => {
      try {
        // Initialiser Cal.com avec le code fourni
        if (window.Cal) {
          console.log('Initialisation de Cal.com...')
          
          // Initialiser avec le namespace
          window.Cal('init', '1h-d-accompagnement', {origin: 'https://app.cal.com'})
          
          // Attendre un peu que l'initialisation soit terminée
          setTimeout(() => {
            try {
              // Créer le calendrier inline
              if (window.Cal.ns && window.Cal.ns['1h-d-accompagnement']) {
                window.Cal.ns['1h-d-accompagnement']('inline', {
                  elementOrSelector: '#my-cal-inline-1h-d-accompagnement',
                  config: {layout: 'month_view'},
                  calLink: 'smartappacademy/1h-d-accompagnement'
                })
                
                window.Cal.ns['1h-d-accompagnement']('ui', {
                  hideEventTypeDetails: false,
                  layout: 'month_view'
                })
                
                console.log('Calendrier Cal.com initialisé avec succès')
              } else {
                console.error('Namespace Cal.com non disponible')
              }
            } catch (innerError) {
              console.error('Erreur lors de la création du calendrier:', innerError)
            }
            setIsLoading(false)
          }, 1000)
        } else {
          console.error('Cal.com non disponible')
          setIsLoading(false)
        }
      } catch (error) {
        console.error('Erreur lors de l\'initialisation du calendrier:', error)
        setIsLoading(false)
      }
    }
    
    // Délai pour permettre le rendu du DOM
    setTimeout(loadCalComScript, 100)
  }
  
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-lg">
      <div className="text-center mb-8">
        <div className="bg-blue-100 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
          <Calendar className="h-10 w-10 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Réserver votre appel d'accompagnement
        </h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Choisissez votre créneau pour une session d'accompagnement personnalisée de 1 heure. 
          Notre calendrier Cal.com est directement intégré dans l'application.
        </p>
        <Button
          onClick={handleOpenCalendar}
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
        >
          {isLoading ? 'Chargement du calendrier...' : 'Ouvrir le calendrier'}
        </Button>
      </div>
      
      {/* Zone d'affichage du calendrier Cal.com */}
      {showCalendar && (
        <div className="border-t pt-8">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              📅 Calendrier Cal.com - 1h d'accompagnement
            </h3>
            <p className="text-gray-600">
              Sélectionnez votre créneau disponible ci-dessous
            </p>
          </div>
          
          <div 
            id="my-cal-inline-1h-d-accompagnement"
            style={{width: '100%', height: '700px', overflow: 'scroll'}}
            className="border border-gray-200 rounded-lg bg-white"
          >
            {isLoading && (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Calendar className="h-16 w-16 mx-auto mb-4 text-blue-600 animate-spin" />
                  <p className="text-gray-600 text-lg">Chargement du calendrier...</p>
                  <p className="text-gray-500 text-sm mt-2">
                    Si le calendrier ne se charge pas, utilisez le bouton "Ouvrir Cal.com" ci-dessous
                  </p>
                </div>
              </div>
            )}
          </div>
          
          {/* Fallback avec iframe si le script ne fonctionne pas */}
          <div className="mt-4 text-center">
            <p className="text-gray-600 mb-4">
              Ou utilisez directement le calendrier Cal.com :
            </p>
            <Button 
              onClick={() => window.open('https://cal.com/smartappacademy/1h-d-accompagnement', '_blank')}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Ouvrir Cal.com dans un nouvel onglet
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

// Composant alternatif avec iframe Cal.com
const CalComIframeWidget = () => {
  const [showIframe, setShowIframe] = useState(false)
  
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-lg">
      <div className="text-center mb-8">
        <div className="bg-blue-100 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
          <Calendar className="h-10 w-10 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Réserver votre appel d'accompagnement
        </h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Choisissez votre créneau pour une session d'accompagnement personnalisée de 1 heure. 
          Cal.com est intégré directement dans l'application.
        </p>
        <Button
          onClick={() => setShowIframe(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
        >
          Ouvrir le calendrier Cal.com
        </Button>
      </div>
      
      {showIframe && (
        <div className="border-t pt-8">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              📅 Calendrier Cal.com - 1h d'accompagnement
            </h3>
            <p className="text-gray-600">
              Sélectionnez votre créneau disponible ci-dessous
            </p>
          </div>
          
          <iframe
            src="https://cal.com/smartappacademy/1h-d-accompagnement"
            width="100%"
            height="700"
            frameBorder="0"
            className="border border-gray-200 rounded-lg"
            title="Cal.com Booking Widget"
          />
        </div>
      )}
    </div>
  )
}

// Composant principal pour la page de réservation
export function CalComBookingPage() {
  const [isLoading, setIsLoading] = React.useState(true)
  const [useIframe, setUseIframe] = React.useState(false)

  // Simulation du chargement initial
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)
    
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <Calendar className="h-16 w-16 mx-auto mb-4 text-blue-600 animate-spin" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Chargement de la page de réservation...
          </h2>
          <p className="text-gray-600">
            Veuillez patienter pendant le chargement.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🎯 Réserver un Appel
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Prenez rendez-vous pour une session d'accompagnement personnalisée avec RizeApps™
          </p>
        </div>

        {/* Informations sur l'appel */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <Clock className="h-12 w-12 mx-auto mb-4 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Durée</h3>
            <p className="text-gray-600">1 heure d'accompagnement</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <Users className="h-12 w-12 mx-auto mb-4 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Format</h3>
            <p className="text-gray-600">Session personnalisée</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <CheckCircle className="h-12 w-12 mx-auto mb-4 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Disponibilité</h3>
            <p className="text-gray-600">Créneaux flexibles</p>
          </div>
        </div>

        {/* Choix entre script intégré et iframe */}
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Choisissez votre méthode de réservation
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => setUseIframe(false)}
                variant={!useIframe ? "default" : "outline"}
                className="px-6 py-3"
              >
                Script Cal.com intégré
              </Button>
              <Button
                onClick={() => setUseIframe(true)}
                variant={useIframe ? "default" : "outline"}
                className="px-6 py-3"
              >
                Iframe Cal.com
              </Button>
            </div>
          </div>
          
          {useIframe ? <CalComIframeWidget /> : <CalComIntegratedWidget />}
        </div>

        {/* Informations supplémentaires */}
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
            ℹ️ Informations importantes
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">✅ Ce qui est inclus :</h4>
              <ul className="text-gray-600 space-y-1">
                <li>• Analyse de votre situation actuelle</li>
                <li>• Plan d'action personnalisé</li>
                <li>• Conseils stratégiques</li>
                <li>• Support post-session</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">📋 Préparation :</h4>
              <ul className="text-gray-600 space-y-1">
                <li>• Ayez vos objectifs en tête</li>
                <li>• Préparez vos questions</li>
                <li>• Testez votre connexion</li>
                <li>• Trouvez un endroit calme</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
