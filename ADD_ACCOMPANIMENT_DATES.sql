-- =====================================================
-- AJOUT DES DATES D'ACCOMPAGNEMENT À USER_PROFILES
-- =====================================================

-- Ajouter les colonnes pour les dates d'accompagnement
ALTER TABLE public.user_profiles 
ADD COLUMN IF NOT EXISTS accompaniment_start_date DATE,
ADD COLUMN IF NOT EXISTS accompaniment_end_date DATE;

-- Créer un index pour faciliter les recherches
CREATE INDEX IF NOT EXISTS idx_user_profiles_accompaniment_dates 
ON public.user_profiles(accompaniment_start_date, accompaniment_end_date);

-- Commentaires pour la documentation
COMMENT ON COLUMN public.user_profiles.accompaniment_start_date IS 'Date de début de l''accompagnement';
COMMENT ON COLUMN public.user_profiles.accompaniment_end_date IS 'Date de fin de l''accompagnement';
