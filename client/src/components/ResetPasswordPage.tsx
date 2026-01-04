import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { supabase } from "@/lib/supabase";
import AnimatedBackground from "./AnimatedBackground";
import { Zap } from "lucide-react";

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValidatingToken, setIsValidatingToken] = useState(true);

  useEffect(() => {
    const checkResetToken = async () => {
      try {
        const hashParams = new URLSearchParams(location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const type = hashParams.get('type');

        if (type === 'recovery' && accessToken) {
          setIsValidatingToken(false);
        } else {
          setError("Lien de réinitialisation invalide ou expiré. Veuillez demander un nouveau lien.");
          setIsValidatingToken(false);
        }
      } catch (error) {
        console.error('Erreur lors de la validation du token:', error);
        setError("Erreur lors de la validation du lien. Veuillez réessayer.");
        setIsValidatingToken(false);
      }
    };

    checkResetToken();
  }, [location]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) {
        console.error('Erreur lors de la mise à jour du mot de passe:', error);
        let errorMessage = "Erreur lors de la réinitialisation du mot de passe";
        if (error.message.includes('expired') || error.message.includes('invalid')) {
          errorMessage = "Le lien de réinitialisation a expiré ou est invalide. Veuillez demander un nouveau lien.";
        } else if (error.message.includes('password')) {
          errorMessage = "Le mot de passe ne respecte pas les critères requis.";
        } else {
          errorMessage = error.message || errorMessage;
        }
        
        setError(errorMessage);
        return;
      }

      if (data.user) {
        setSuccess("Votre mot de passe a été réinitialisé avec succès !");
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (error: any) {
      console.error('Exception lors de la réinitialisation:', error);
      setError("Une erreur est survenue lors de la réinitialisation du mot de passe");
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isValidatingToken) {
    return (
      <div className="relative min-h-screen bg-black flex items-center justify-center">
        <AnimatedBackground />
        <div className="relative z-10 text-center">
          <div className="text-white text-xl">Vérification du lien...</div>
        </div>
      </div>
    );
  }

  return (
          <div className="relative min-h-screen bg-black flex items-center justify-center p-4">
            <AnimatedBackground />
            
            <div className="absolute top-0 left-0 z-10 p-6">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-lg shadow-gray-500/30">
                  <Zap className="h-4 w-4 text-black" />
                </div>
                <span className="font-bold text-xl text-white">RizeApps™</span>
              </div>
            </div>
      
      <div className="relative z-10 w-full max-w-md">
        <Card className="border-0 shadow-none bg-transparent">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-white">
              Réinitialiser le mot de passe
            </CardTitle>
            <CardDescription className="text-white/70">
              Entrez votre nouveau mot de passe
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg text-sm mb-4">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-500/20 border border-green-500/50 text-green-200 px-4 py-3 rounded-lg text-sm mb-4">
                {success}
              </div>
            )}
            
            {!error && !success && (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">Nouveau mot de passe</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder-white/40 focus:bg-white/20 focus:border-white/40 rounded-2xl pr-10"
                      required
                      minLength={6}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-white/60 hover:text-white"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirm-password" className="text-white">Confirmer le mot de passe</Label>
                  <div className="relative">
                    <Input
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder-white/40 focus:bg-white/20 focus:border-white/40 rounded-2xl pr-10"
                      required
                      minLength={6}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-white/60 hover:text-white"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-white to-gray-100 hover:from-gray-100 hover:to-gray-200 disabled:opacity-50 disabled:cursor-not-allowed text-black font-medium py-2.5 rounded-lg transition-all duration-200 shadow-lg border border-gray-300" 
                >
                  {isLoading ? "Réinitialisation..." : "Réinitialiser le mot de passe"}
                </Button>
                
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => navigate('/')}
                    className="text-gray-200 hover:text-white text-sm underline transition-colors duration-200"
                  >
                    Retour à la page d'accueil
                  </button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
                  