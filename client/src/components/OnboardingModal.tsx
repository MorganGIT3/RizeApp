import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, ArrowRight, Zap, BarChart3, Calendar } from "lucide-react";

interface OnboardingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const steps = [
  {
    icon: Zap,
    title: "Connectez vos comptes",
    description: "Connectez vos comptes publicitaires (Facebook, TikTok, YouTube) et vos plateformes de paiement (Stripe, PayPal) pour un suivi automatique."
  },
  {
    icon: Calendar,
    title: "Planifiez votre premier contenu",
    description: "Utilisez notre calendrier intelligent pour organiser vos posts, vidéos et emails. L'IA vous suggérera les meilleurs créneaux."
  },
  {
    icon: BarChart3,
    title: "Testez le chatbot IA",
    description: "Posez vos premières questions à l'IA Growth Operator pour obtenir des recommandations personnalisées basées sur vos métriques."
  }
];

export function OnboardingModal({ open, onOpenChange }: OnboardingModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (open) {
      setProgress((currentStep + 1) * (100 / steps.length));
    }
  }, [currentStep, open]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onOpenChange(false);
    }
  };

  const handleSkip = () => {
    onOpenChange(false);
  };

  const currentStepData = steps[currentStep];
  const Icon = currentStepData.icon;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Bienvenue sur RizeApps™ !
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Étape {currentStep + 1} sur {steps.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
          
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">{currentStepData.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {currentStepData.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Steps indicator */}
          <div className="flex justify-center gap-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${
                  index <= currentStep ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
          
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={handleSkip}
              className="flex-1"
              data-testid="button-skip-onboarding"
            >
              Passer
            </Button>
            <Button 
              onClick={handleNext}
              className="flex-1"
              data-testid="button-next-onboarding"
            >
              {currentStep === steps.length - 1 ? (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Commencer
                </>
              ) : (
                <>
                  Suivant
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}