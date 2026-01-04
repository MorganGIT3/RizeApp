-- =====================================================
-- SCRIPT SIMPLE POUR DÉSACTIVER LE TRIGGER
-- Copiez ce script dans Supabase Dashboard → SQL Editor
-- =====================================================

-- Désactiver le trigger qui cause l'erreur "Database error saving new user"
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Vérifier que le trigger est bien supprimé (ne doit rien retourner)
SELECT trigger_name 
FROM information_schema.triggers
WHERE trigger_name = 'on_auth_user_created';

-- S'assurer que la policy permet l'insertion
DROP POLICY IF EXISTS "Allow insert for authenticated users" ON public.user_profiles;
CREATE POLICY "Allow insert for all" ON public.user_profiles
    FOR INSERT WITH CHECK (true);

-- =====================================================
-- ✅ TERMINÉ !
-- Le trigger est désactivé, le profil sera créé manuellement dans le code
-- =====================================================


