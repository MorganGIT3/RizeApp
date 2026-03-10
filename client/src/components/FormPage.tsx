import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, X, RefreshCw, Download, Trash2, ArrowRight, ArrowLeft, Shield } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { DigitalSerenityBackground } from './DigitalSerenityBackground';
import logoImage from '../ChatGPT Image 10 oct. 2025, 21_52_06.png';

interface FormData {
  prenom: string;
  nom: string;
  decouverte: string;
  conviction: number;
  pourquoiMoi: string;
  declicConversion: string;
  supports: string;
  hesitations: string;
  alternatives: string;
  tempsDecision: string;
}

interface FormResponse extends FormData {
  id: number;
  submittedAt: string;
}

const ADMIN_CODE = 'B3rpine1#';

const TEMPS_OPTIONS = [
  "Moins d'une semaine",
  '1 à 2 semaines',
  '2 à 4 semaines',
  '1 à 3 mois',
  'Plus de 3 mois',
];

const STEPS = [
  {
    number: 1,
    title: 'Avant de commencer',
    subtitle: 'Dis-moi qui tu es pour que je puisse associer tes réponses.',
    type: 'name',
    field: null,
    placeholder: null,
    options: null,
    hint: 'Appuie sur Entrée ↵ pour continuer',
  },
  {
    number: 2,
    title: 'Premier point de contact',
    subtitle: "Comment tu m'as découvert ? (Reel, YouTube, story, quelqu'un t'en a parlé ?)",
    type: 'text',
    field: 'decouverte',
    placeholder: '',
    options: null,
    hint: 'Appuie sur Entrée ↵ pour continuer',
  },
  {
    number: 3,
    title: "Niveau de conviction avant l'appel",
    subtitle: "De 1 à 10, t'étais convaincu à combien AVANT l'appel ?",
    type: 'slider',
    field: 'conviction',
    placeholder: null,
    options: null,
    hint: null,
  },
  {
    number: 4,
    title: 'Pourquoi moi spécifiquement ?',
    subtitle: "T'as vu d'autres personnes parler de business en ligne. Pourquoi t'as choisi moi ?",
    type: 'textarea',
    field: 'pourquoiMoi',
    placeholder: '',
    options: null,
    hint: '⌘ + Entrée ↵ pour continuer',
  },
  {
    number: 5,
    title: "Qu'est-ce qui t'a fait convertir ?",
    subtitle: "C'est quoi le déclic exact qui t'a fait passer à l'action ?",
    type: 'textarea',
    field: 'declicConversion',
    placeholder: 'Raconte-moi ce moment décisif...',
    options: null,
    hint: '⌘ + Entrée ↵ pour continuer',
  },
  {
    number: 6,
    title: 'Conversion après envoi de supports',
    subtitle:
      "Est-ce qu'une vidéo YouTube, un prompt (une ressource gratuite) ou une story en particulier a renforcé ta décision ?",
    type: 'textarea',
    field: 'supports',
    placeholder: 'Quel contenu a eu le plus d\'impact pour toi...',
    options: null,
    hint: '⌘ + Entrée ↵ pour continuer',
  },
  {
    number: 7,
    title: 'Tes plus grandes hésitations',
    subtitle: "C'est quoi le truc qui te faisait le plus douter avant de te lancer ?",
    type: 'textarea',
    field: 'hesitations',
    placeholder: "Qu'est-ce qui te retenait...",
    options: null,
    hint: '⌘ + Entrée ↵ pour continuer',
  },
  {
    number: 8,
    title: 'Alternatives considérées',
    subtitle:
      "T'avais regardé d'autres formations ou accompagnements avant ? C'est quoi qui t'a fait convertir dans MON accompagnement spécifiquement et pas dans un autre ?",
    type: 'textarea',
    field: 'alternatives',
    placeholder: "Parle-moi des autres options que t'avais envisagées...",
    options: null,
    hint: '⌘ + Entrée ↵ pour continuer',
  },
  {
    number: 9,
    title: 'Temps de décision',
    subtitle: "Combien de temps s'est écoulé entre ton premier contact avec mon contenu et ton achat ?",
    type: 'radio',
    field: 'tempsDecision',
    placeholder: null,
    options: TEMPS_OPTIONS,
    hint: null,
  },
];

export function FormPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    prenom: '',
    nom: '',
    decouverte: '',
    conviction: 7,
    pourquoiMoi: '',
    declicConversion: '',
    supports: '',
    hesitations: '',
    alternatives: '',
    tempsDecision: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Admin state
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminCode, setAdminCode] = useState('');
  const [adminError, setAdminError] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [responses, setResponses] = useState<FormResponse[]>([]);
  const [isLoadingResponses, setIsLoadingResponses] = useState(false);

  const totalSteps = STEPS.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;
  const step = STEPS[currentStep];

  const getFieldValue = (field: string | null) => {
    if (!field) return '';
    return formData[field as keyof FormData] as string;
  };

  const setFieldValue = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isStepValid = () => {
    switch (step.type) {
      case 'name':
        return formData.prenom.trim() !== '' && formData.nom.trim() !== '';
      case 'slider':
        return true;
      case 'radio':
        return (formData[step.field as keyof FormData] as string) !== '';
      default:
        return step.field ? (formData[step.field as keyof FormData] as string).trim() !== '' : false;
    }
  };

  const handleNext = () => {
    if (!isStepValid()) return;
    if (currentStep < totalSteps - 1) {
      setCurrentStep((p) => p + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((p) => p - 1);
    }
  };

  const handleSubmit = async () => {
    if (!isStepValid() || isSubmitting) return;
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const { error } = await supabase.from('form_responses').insert([{
        prenom: formData.prenom,
        nom: formData.nom,
        decouverte: formData.decouverte,
        conviction: formData.conviction,
        pourquoi_moi: formData.pourquoiMoi,
        declic_conversion: formData.declicConversion,
        supports: formData.supports,
        hesitations: formData.hesitations,
        alternatives: formData.alternatives,
        temps_decision: formData.tempsDecision,
      }]);
      if (!error) {
        setSubmitted(true);
      } else {
        const msg = error.code === 'PGRST205'
          ? 'La table form_responses n\'existe pas dans Supabase. Consultez FORM_SETUP_SUPABASE.md pour créer la table.'
          : error.message;
        setSubmitError(msg);
        console.error('Supabase error:', error);
      }
    } catch (e) {
      setSubmitError('Une erreur est survenue lors de l\'envoi.');
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (showAdminModal || submitted || isAdmin) return;
      if (e.key === 'Enter') {
        if (step.type === 'textarea') {
          if (e.metaKey || e.ctrlKey) {
            e.preventDefault();
            currentStep === totalSteps - 1 ? handleSubmit() : handleNext();
          }
        } else if (step.type !== 'radio' && step.type !== 'slider') {
          if (!e.shiftKey) {
            e.preventDefault();
            currentStep === totalSteps - 1 ? handleSubmit() : handleNext();
          }
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [currentStep, formData, showAdminModal, submitted, isAdmin]);

  // Admin
  const handleAdminLogin = () => {
    if (adminCode === ADMIN_CODE) {
      setIsAdmin(true);
      setShowAdminModal(false);
      setAdminCode('');
      setAdminError('');
      loadResponses();
    } else {
      setAdminError('Code incorrect. Réessayez.');
    }
  };

  const loadResponses = async () => {
    setIsLoadingResponses(true);
    try {
      const { data, error } = await supabase
        .from('form_responses')
        .select('*')
        .order('submitted_at', { ascending: true });
      if (!error && data) {
        setResponses(data.map((r: any) => ({
          id: r.id,
          submittedAt: r.submitted_at,
          prenom: r.prenom,
          nom: r.nom,
          decouverte: r.decouverte,
          conviction: r.conviction,
          pourquoiMoi: r.pourquoi_moi,
          declicConversion: r.declic_conversion,
          supports: r.supports,
          hesitations: r.hesitations,
          alternatives: r.alternatives,
          tempsDecision: r.temps_decision,
        })));
      } else {
        console.error('Supabase error:', error);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingResponses(false);
    }
  };

  const handleDeleteAll = async () => {
    if (!confirm('Supprimer toutes les réponses ? Cette action est irréversible.')) return;
    try {
      await supabase.from('form_responses').delete().neq('id', 0);
      setResponses([]);
    } catch (e) {
      console.error(e);
    }
  };

  const handleExportCSV = () => {
    const headers = [
      '#', 'Date', 'Prénom', 'Nom', 'Découverte', 'Conviction',
      'Pourquoi moi', 'Déclic conversion', 'Supports', 'Hésitations',
      'Alternatives', 'Temps décision',
    ];
    const rows = responses.map((r, i) => [
      i + 1,
      new Date(r.submittedAt).toLocaleString('fr-FR'),
      r.prenom, r.nom, r.decouverte, r.conviction,
      r.pourquoiMoi, r.declicConversion, r.supports,
      r.hesitations, r.alternatives, r.tempsDecision,
    ]);
    const csv = [headers, ...rows]
      .map((row) => row.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'reponses-formulaire.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const getInitials = (prenom: string, nom: string) =>
    `${prenom.charAt(0)}${nom.charAt(0)}`.toUpperCase();

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString('fr-FR', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
    });

  const avgConviction =
    responses.length > 0
      ? (responses.reduce((s, r) => s + r.conviction, 0) / responses.length).toFixed(1)
      : '—';

  const topChannel =
    responses.length > 0
      ? Object.entries(
          responses.reduce((acc, r) => {
            const ch = (r.decouverte || 'Autre').split(/[\s,]/)[0];
            acc[ch] = (acc[ch] || 0) + 1;
            return acc;
          }, {} as Record<string, number>)
        ).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '—'
      : '—';

  /* ─── ADMIN PANEL ─── */
  if (isAdmin) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-black to-slate-800 text-white relative overflow-hidden">
        <DigitalSerenityBackground />
        <header className="relative z-50 p-6 flex justify-between items-center border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-lg shadow-white/10 overflow-hidden ring-1 ring-white/20">
              <img src={logoImage} alt="RizeApp Logo" className="w-full h-full object-cover rounded-lg" />
            </div>
            <div>
              <h1 className="text-lg font-extralight leading-tight tracking-tight text-slate-50">RizeApps™</h1>
              <p className="text-sm text-white/60">Réponses du formulaire</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
                onClick={loadResponses}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Rafraîchir
              </button>
              <button
                onClick={handleExportCSV}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm transition-all"
              >
                <Download className="w-3.5 h-3.5" /> Exporter CSV
              </button>
              <button
                onClick={handleDeleteAll}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-lg text-sm text-red-400 transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" /> Tout supprimer
              </button>
              <button
                onClick={() => setIsAdmin(false)}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm transition-all"
              >
                <X className="w-3.5 h-3.5" /> Fermer
            </button>
          </div>
        </header>
        <div className="relative z-20 max-w-4xl mx-auto px-6 py-10">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            {[
              { label: 'Total réponses', value: responses.length },
              { label: 'Conviction moyenne', value: `${avgConviction}/10` },
              { label: 'Canal #1', value: topChannel },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="rounded-2xl p-6 border border-white/10"
                style={{
                  background: 'radial-gradient(circle 280px at 0% 0%, rgba(68, 68, 68, 0.3), rgba(12, 13, 13, 1))',
                  boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.08)',
                }}
              >
                <p className="text-white/60 text-sm mb-2">{label}</p>
                <p className="text-4xl font-extralight tracking-tight text-slate-50">{value}</p>
              </div>
            ))}
          </div>

          {/* Responses */}
          {isLoadingResponses ? (
            <div className="text-center text-white/30 py-20">Chargement...</div>
          ) : responses.length === 0 ? (
            <div className="text-center text-white/20 py-20 text-sm">
              Aucune réponse pour le moment.
            </div>
          ) : (
            <div className="space-y-4">
              {[...responses].reverse().map((r, idx) => (
                <div
                  key={r.id}
                  className="rounded-2xl p-6 border border-white/10"
                  style={{
                    background: 'radial-gradient(circle 280px at 0% 0%, rgba(68, 68, 68, 0.25), rgba(12, 13, 13, 1))',
                    boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.06)',
                  }}
                >
                  {/* Card header */}
                  <div className="flex items-center gap-3 mb-5 pb-5 border-b border-white/[0.06]">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold text-white">
                      {getInitials(r.prenom, r.nom)}
                    </div>
                    <div>
                      <p className="font-semibold text-white">
                        {r.prenom} {r.nom}
                      </p>
                      <p className="text-white/30 text-xs">
                        #{responses.length - idx} · {formatDate(r.submittedAt)}
                      </p>
                    </div>
                  </div>

                  {/* Fields */}
                  <div className="space-y-3">
                    {[
                      { label: 'Découverte', value: r.decouverte },
                      { label: 'Conviction', value: `${r.conviction}/10` },
                      { label: 'Pourquoi moi', value: r.pourquoiMoi },
                      { label: 'Déclic conversion', value: r.declicConversion },
                      { label: 'Supports', value: r.supports },
                      { label: 'Hésitations', value: r.hesitations },
                      { label: 'Alternatives', value: r.alternatives },
                      { label: 'Temps décision', value: r.tempsDecision },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex gap-4">
                        <span className="text-white/35 text-sm w-36 flex-shrink-0 pt-0.5">
                          {label}
                        </span>
                        <span className="text-white/80 text-sm leading-relaxed">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  /* ─── SUCCESS SCREEN ─── */
  if (submitted) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-black to-slate-800 relative overflow-hidden flex flex-col">
        <DigitalSerenityBackground />
        <header className="relative z-50 p-6 flex justify-between items-center border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-lg shadow-white/10 overflow-hidden ring-1 ring-white/20">
              <img src={logoImage} alt="RizeApp Logo" className="w-full h-full object-cover rounded-lg" />
            </div>
            <div>
              <h1 className="text-lg font-extralight leading-tight tracking-tight text-slate-50">RizeApps™</h1>
              <p className="text-sm text-white/60">Formulaire</p>
            </div>
          </div>
        </header>
        <div className="flex-1 flex items-center justify-center relative z-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center px-6"
          >
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-white/10 overflow-hidden ring-1 ring-white/20">
              <img src={logoImage} alt="RizeApp Logo" className="w-full h-full object-cover rounded-2xl" />
            </div>
            <h2 className="text-3xl font-extralight leading-tight tracking-tight text-slate-50 mb-3">
              Merci {formData.prenom} !
            </h2>
            <p className="text-white/60 text-lg">Tes réponses ont bien été envoyées.</p>
            <p className="text-white/40 text-sm mt-2">
              Je les analyserai attentivement pour m'améliorer.
            </p>
            <a
              href="/"
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-2xl font-semibold text-sm bg-gradient-to-r from-orange-500 via-amber-500 to-orange-400 text-white hover:from-orange-400 hover:via-amber-400 hover:to-orange-300 active:scale-95 shadow-[0_0_12px_rgba(249,115,22,0.3)] transition-all"
            >
              Me connecter pour accéder au dashboard
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </div>
    );
  }

  /* ─── FORM ─── */
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-black to-slate-800 text-white relative overflow-hidden">
      <DigitalSerenityBackground />

      {/* Top progress bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/10 z-30 overflow-hidden rounded-full">
        <motion.div
          className="h-full bg-white"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        />
      </div>

      {/* Header - same as dashboard */}
      <header className="relative z-50 p-6 flex justify-between items-center border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-lg shadow-white/10 overflow-hidden ring-1 ring-white/20">
            <img src={logoImage} alt="RizeApp Logo" className="w-full h-full object-cover rounded-lg" />
          </div>
          <div>
            <h1 className="text-lg font-extralight leading-tight tracking-tight text-slate-50">RizeApps™</h1>
            <p className="text-sm text-white/60">Formulaire</p>
          </div>
        </div>
        <button
          onClick={() => setShowAdminModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 rounded-xl text-sm text-white/80 hover:text-white transition-all"
        >
          <Shield className="w-4 h-4" />
          Admin
        </button>
      </header>

      {/* Content */}
      <main className="relative z-20 pb-24">
      <div className="min-h-[calc(100vh-140px)] flex flex-col items-center">
        {/* Subtitle block */}
        <div className="pt-12 pb-2 text-center">
          <p className="text-white/60 text-sm font-medium tracking-wide">Formulaire confidentiel</p>
          <p className="text-slate-50 text-base font-extralight mt-1">Ton feedback compte</p>
          <p className="text-white/50 text-xs mt-1 max-w-xs mx-auto leading-relaxed">
            Aide-moi à comprendre ton parcours. Ça prend 2 minutes et ça m'aide énormément à m'améliorer.
          </p>
        </div>

        {/* Step indicator */}
        <div className="mt-6 mb-1 text-center w-full max-w-lg px-6">
          <p className="text-white/25 text-xs tracking-widest uppercase">
            Question {currentStep + 1} sur {totalSteps} · {Math.round(progress)}%
          </p>
          {/* Barre de progression orange stylée */}
          <div className="mt-3 h-2 w-full rounded-full bg-white/10 overflow-hidden backdrop-blur-sm">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-orange-400 shadow-[0_0_12px_rgba(249,115,22,0.5)]"
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            />
          </div>
        </div>

        {/* Step content */}
        <div className="flex-1 w-full flex items-start justify-center px-6 pt-10 pb-20">
          <div className="w-full max-w-lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
              >
                {/* Question number + title */}
                <div className="mb-8">
                  <div className="flex items-start gap-4 mb-3">
                    <span className="text-white/20 text-sm font-mono mt-1">{step.number}</span>
                    <h2 className="text-2xl font-extralight leading-tight tracking-tight text-slate-50">{step.title}</h2>
                  </div>
                  <p className="text-white/60 text-[15px] leading-relaxed ml-8">{step.subtitle}</p>
                </div>

                {/* ── NAME ── */}
                {step.type === 'name' && (
                  <div className="space-y-5">
                    <input
                      autoFocus
                      type="text"
                      placeholder="Prénom"
                      value={formData.prenom}
                      onChange={(e) => setFormData((p) => ({ ...p, prenom: e.target.value }))}
                      className="w-full bg-white/[0.04] border border-white/15 focus:border-white/40 rounded-xl px-4 py-3 text-xl text-white placeholder:text-white/40 outline-none transition-colors"
                    />
                    <input
                      type="text"
                      placeholder="Nom"
                      value={formData.nom}
                      onChange={(e) => setFormData((p) => ({ ...p, nom: e.target.value }))}
                      className="w-full bg-white/[0.04] border border-white/15 focus:border-white/40 rounded-xl px-4 py-3 text-xl text-white placeholder:text-white/40 outline-none transition-colors"
                    />
                  </div>
                )}

                {/* ── TEXT ── */}
                {step.type === 'text' && step.field && (
                  <input
                    autoFocus
                    type="text"
                    placeholder={step.placeholder ?? ''}
                    value={getFieldValue(step.field)}
                    onChange={(e) => setFieldValue(step.field!, e.target.value)}
                    className="w-full bg-white/[0.04] border border-white/15 focus:border-white/40 rounded-xl px-4 py-3 text-xl text-white placeholder:text-white/40 outline-none transition-colors"
                  />
                )}

                {/* ── SLIDER ── */}
                {step.type === 'slider' && (
                  <div className="py-4">
                    <div className="text-center mb-8">
                      <span className="text-6xl font-bold bg-gradient-to-r from-orange-500 via-amber-500 to-orange-400 bg-clip-text text-transparent">{formData.conviction}</span>
                      <span className="text-orange-400/60 text-3xl">/10</span>
                    </div>
                    <div className="relative rounded-full overflow-hidden">
                      <input
                        type="range"
                        min={1}
                        max={10}
                        value={formData.conviction}
                        onChange={(e) => setFormData((p) => ({ ...p, conviction: Number(e.target.value) }))}
                        className="w-full cursor-pointer"
                        style={{
                          WebkitAppearance: 'none',
                          appearance: 'none',
                          height: '2px',
                          background: `linear-gradient(to right, rgb(249,115,22) ${((formData.conviction - 1) / 9) * 100}%, rgba(249,115,22,0.2) ${((formData.conviction - 1) / 9) * 100}%)`,
                          outline: 'none',
                        }}
                      />
                    </div>
                    <div className="flex justify-between text-white/25 text-xs mt-4">
                      <span>Pas du tout</span>
                      <span>Totalement convaincu</span>
                    </div>
                  </div>
                )}

                {/* ── TEXTAREA ── */}
                {step.type === 'textarea' && step.field && (
                  <textarea
                    autoFocus
                    placeholder={step.placeholder ?? ''}
                    value={getFieldValue(step.field)}
                    onChange={(e) => setFieldValue(step.field!, e.target.value)}
                    rows={4}
                    className="w-full bg-white/[0.04] border border-white/15 focus:border-white/40 rounded-xl px-4 py-3 text-lg text-white placeholder:text-white/40 outline-none transition-colors resize-none"
                  />
                )}

                {/* ── RADIO ── */}
                {step.type === 'radio' && step.field && step.options && (
                  <div className="space-y-2.5">
                    {step.options.map((opt) => {
                      const selected = formData[step.field as keyof FormData] === opt;
                      return (
                        <button
                          key={opt}
                          onClick={() => setFieldValue(step.field!, opt)}
                          className={`w-full text-left px-5 py-4 rounded-2xl border transition-all text-sm ${
                            selected
                              ? 'border-white bg-white/10 text-white font-medium'
                              : 'border-white/10 bg-white/[0.02] text-white/50 hover:border-white/25 hover:text-white/80'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* CTA */}
                <div className="mt-10">
                  <div className="flex flex-wrap items-center gap-3">
                    {currentStep > 0 && (
                      <button
                        onClick={handlePrevious}
                        type="button"
                        className="flex items-center gap-2 px-5 py-3 rounded-2xl font-medium text-sm bg-white/10 hover:bg-white/20 border border-white/20 text-white/90 transition-all"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Précédent
                      </button>
                    )}
                    {currentStep < totalSteps - 1 ? (
                      <button
                        onClick={handleNext}
                        disabled={!isStepValid()}
                        className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-sm transition-all ${
                          isStepValid()
                            ? 'bg-gradient-to-r from-orange-500 via-amber-500 to-orange-400 text-white hover:from-orange-400 hover:via-amber-400 hover:to-orange-300 active:scale-95 shadow-[0_0_12px_rgba(249,115,22,0.3)]'
                            : 'bg-white/8 text-white/20 cursor-not-allowed'
                        }`}
                      >
                        Continuer
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={handleSubmit}
                        disabled={!isStepValid() || isSubmitting}
                        className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-sm transition-all ${
                          isStepValid() && !isSubmitting
                            ? 'bg-gradient-to-r from-orange-500 via-amber-500 to-orange-400 text-white hover:from-orange-400 hover:via-amber-400 hover:to-orange-300 active:scale-95 shadow-[0_0_12px_rgba(249,115,22,0.3)]'
                            : 'bg-white/8 text-white/20 cursor-not-allowed'
                        }`}
                      >
                        {isSubmitting ? 'Envoi en cours...' : 'Envoyer mes réponses'}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  {step.hint && (
                    <p className="text-white/20 text-xs mt-3">{step.hint}</p>
                  )}
                  {submitError && (
                    <p className="text-red-400 text-sm mt-3 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                      {submitError}
                    </p>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      </main>

      {/* Admin modal */}
      <AnimatePresence>
        {showAdminModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center"
            onClick={() => { setShowAdminModal(false); setAdminCode(''); setAdminError(''); }}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="rounded-2xl p-8 w-full max-w-sm mx-4 overflow-hidden"
              style={{
                background: 'radial-gradient(circle 280px at 0% 0%, rgba(68, 68, 68, 0.3), rgba(12, 13, 13, 1))',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.08), 0 8px 32px rgba(0, 0, 0, 0.6)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-7">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-white/10 border border-white/20 overflow-hidden">
                  <Lock className="w-6 h-6 text-white/80" />
                </div>
                <div>
                  <h3 className="text-lg font-extralight leading-tight tracking-tight text-slate-50">Accès admin</h3>
                  <p className="text-white/60 text-xs">Entrez votre code d'accès</p>
                </div>
              </div>

              <input
                autoFocus
                type="password"
                value={adminCode}
                onChange={(e) => { setAdminCode(e.target.value); setAdminError(''); }}
                onKeyDown={(e) => e.key === 'Enter' && handleAdminLogin()}
                placeholder="Code d'accès..."
                className="w-full bg-white/[0.05] border border-white/10 focus:border-white/30 rounded-xl px-4 py-3 text-white placeholder:text-white/15 outline-none transition-colors mb-2 text-sm"
              />

              {adminError && (
                <p className="text-red-400 text-xs mb-3">{adminError}</p>
              )}

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => { setShowAdminModal(false); setAdminCode(''); setAdminError(''); }}
                  className="flex-1 py-2.5 rounded-xl border border-white/10 text-white/40 hover:text-white/70 text-sm transition-all"
                >
                  Annuler
                </button>
                <button
                  onClick={handleAdminLogin}
                  className="flex-1 py-2.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-white/90 transition-all"
                >
                  Accéder
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slider thumb style */}
      <style>{`
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgb(249,115,22), rgb(245,158,11));
          cursor: pointer;
          border: none;
          box-shadow: 0 0 12px rgba(249,115,22,0.5);
        }
        input[type='range']::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgb(249,115,22), rgb(245,158,11));
          cursor: pointer;
          border: none;
          box-shadow: 0 0 12px rgba(249,115,22,0.5);
        }
      `}</style>
    </div>
  );
}
