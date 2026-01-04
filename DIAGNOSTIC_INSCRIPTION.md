# 🔍 Guide de Diagnostic - Inscription Supabase

## Problème
L'inscription ne crée pas de compte visible dans Supabase Auth.

## ✅ Ce qui a été fait

### 1. Refonte complète de la fonction `signUpUser`
- Version simplifiée et directe
- Logs détaillés à chaque étape
- Validation des données avant envoi
- Gestion d'erreur améliorée

### 2. Configuration du client Supabase
- Options d'authentification ajoutées
- Auto-refresh des tokens
- Persistance de session
- Détection automatique de session dans l'URL

## 🔍 Comment vérifier si le compte est créé

### Étape 1 : Ouvrir la console du navigateur
1. Ouvrez votre application
2. Appuyez sur **F12** ou **Ctrl+Shift+I**
3. Allez dans l'onglet **Console**

### Étape 2 : Créer un compte
1. Remplissez le formulaire d'inscription
2. Cliquez sur "Créer mon compte"
3. **Regardez la console** - vous devriez voir :

```
═══════════════════════════════════════════════
🔵 INSCRIPTION - Début
📧 Email: votre@email.com
👤 Nom: Votre Nom
═══════════════════════════════════════════════
📤 Envoi de la demande à Supabase Auth...
📥 Réponse de Supabase Auth reçue
   - User créé: true/false
   - Session créée: true/false
   - User ID: [ID si créé]
   - Email: [email]
   - Erreur: [message d'erreur ou "Aucune"]
```

### Étape 3 : Vérifier dans Supabase Dashboard

1. Allez sur [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Connectez-vous à votre projet
3. Allez dans **Authentication** → **Users**
4. Vérifiez si votre compte apparaît dans la liste

## 🐛 Problèmes possibles et solutions

### Problème 1 : "User créé: false" dans les logs

**Causes possibles :**
- Configuration Supabase incorrecte
- Clé API invalide
- Problème réseau

**Solution :**
1. Vérifiez que les credentials Supabase dans `client/src/lib/supabase.ts` sont corrects
2. Vérifiez que votre projet Supabase est actif
3. Vérifiez la connexion internet

### Problème 2 : Erreur "Email already registered"

**Causes :**
- Le compte existe déjà dans Supabase

**Solution :**
- Utilisez un autre email pour tester
- Ou supprimez le compte dans Supabase Dashboard

### Problème 3 : Le compte est créé mais n'apparaît pas dans Supabase

**Causes possibles :**
- Confirmation email requise
- Filtres dans Supabase Dashboard

**Solution :**
1. Vérifiez dans Supabase : **Authentication** → **Settings** → **Auth Providers** → **Email**
2. Désactivez temporairement "Enable email confirmations" pour tester
3. Rafraîchissez la liste des utilisateurs dans Supabase

### Problème 4 : Le compte est créé mais pas de session

**Causes :**
- Confirmation email requise par Supabase

**Solution :**
1. Allez dans Supabase Dashboard
2. **Authentication** → **Settings** → **Auth Providers** → **Email**
3. Désactivez "Enable email confirmations" temporairement
4. Réessayez l'inscription

## 📝 Vérification manuelle dans Supabase

### Méthode 1 : Via le Dashboard

1. **Allez sur Supabase Dashboard** : https://supabase.com/dashboard
2. **Sélectionnez votre projet**
3. **Allez dans Authentication → Users**
4. **Vérifiez la liste des utilisateurs**

### Méthode 2 : Via SQL Editor

1. Allez dans **SQL Editor** dans Supabase Dashboard
2. Exécutez cette requête :

```sql
SELECT 
    id,
    email,
    created_at,
    email_confirmed_at,
    raw_user_meta_data
FROM auth.users
ORDER BY created_at DESC
LIMIT 10;
```

Cette requête affichera les 10 derniers utilisateurs créés.

## 🔧 Configuration Supabase recommandée

Pour que l'inscription fonctionne sans confirmation email :

1. Allez dans **Authentication** → **Settings** → **Auth Providers** → **Email**
2. **DÉSACTIVEZ** "Enable email confirmations" (pour les tests)
3. Cliquez sur **Save**

⚠️ **Note** : En production, il est recommandé d'activer la confirmation email.

## 🚀 Test rapide

Pour tester rapidement si ça fonctionne :

1. Ouvrez la console du navigateur (F12)
2. Créez un compte avec un email de test
3. Regardez les logs dans la console
4. Vérifiez dans Supabase Dashboard → Authentication → Users

Si le compte apparaît dans Supabase mais que vous ne pouvez pas vous connecter, vérifiez :
- Que le mot de passe est correct
- Que la confirmation email n'est pas requise
- Les logs dans la console lors de la connexion

## 📞 Support

Si le problème persiste après avoir suivi ce guide :

1. Copiez les logs complets de la console
2. Vérifiez dans Supabase Dashboard si le compte existe
3. Notez les messages d'erreur exacts
4. Vérifiez la configuration Supabase (URL, clé API)


