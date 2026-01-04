# 🧪 Guide de Test - Inscription Supabase

## Fichier de test créé : `test-signup.html`

Ce fichier permet de tester directement la création de compte dans Supabase, indépendamment de l'application React.

## 📋 Comment utiliser le fichier de test

### Méthode 1 : Ouvrir directement dans le navigateur

1. **Ouvrez le fichier** `test-signup.html` dans votre navigateur
   - Double-cliquez sur le fichier
   - Ou faites un clic droit → "Ouvrir avec" → votre navigateur

2. **Remplissez le formulaire** :
   - Nom complet (optionnel)
   - Email de test (ex: `test123@example.com`)
   - Mot de passe (minimum 6 caractères)

3. **Cliquez sur "Créer le compte test"**

4. **Regardez les logs** en bas du formulaire pour voir exactement ce qui se passe

### Méthode 2 : Servir via un serveur local

Si vous avez des problèmes CORS, servez le fichier via un serveur HTTP :

```bash
# Avec Python
python -m http.server 8000

# Avec Node.js (si vous avez http-server installé)
npx http-server -p 8000

# Puis ouvrez dans le navigateur
# http://localhost:8000/test-signup.html
```

## 🔍 Ce que vous verrez

### Si le compte est créé avec succès :

```
✅ COMPTE CRÉÉ DANS SUPABASE AUTH
   User ID: [UUID]
   Email: test123@example.com
   Créé le: [date]
✅ SESSION ACTIVE - L'utilisateur est connecté
```

### Si il y a une erreur :

```
❌ ERREUR: [message d'erreur]
   Code: [code d'erreur]
```

## ✅ Vérification dans Supabase Dashboard

Après avoir créé un compte de test :

1. Allez sur [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Sélectionnez votre projet
3. Allez dans **Authentication** → **Users**
4. Cherchez l'email que vous avez utilisé
5. Le compte devrait apparaître dans la liste

## 🐛 Diagnostic des problèmes

### Le compte n'apparaît pas dans Supabase

**Vérifiez :**

1. **Configuration Supabase** :
   - URL correcte : `https://dewpygnammmyvhporthh.supabase.co`
   - Clé API correcte (dans le code du fichier test)

2. **Paramètres d'authentification** :
   - Allez dans **Authentication** → **Settings** → **Auth Providers** → **Email**
   - Vérifiez que "Enable email confirmations" est configuré comme vous le souhaitez

3. **Regardez les logs dans le fichier de test** :
   - Ils vous diront exactement ce qui se passe
   - Copiez les logs et vérifiez les erreurs

### Erreur "Email already registered"

- Le compte existe déjà
- Utilisez un autre email ou supprimez le compte dans Supabase Dashboard

### Erreur "Invalid email"

- Vérifiez le format de l'email
- Il doit contenir un @ et un domaine valide

### Le compte est créé mais pas de session

- Vérifiez dans Supabase si la confirmation email est requise
- Si oui, désactivez-la temporairement pour tester

## 🎯 Prochaines étapes

1. **Testez avec le fichier HTML** pour vérifier que Supabase fonctionne
2. Si ça marche dans le fichier HTML mais pas dans l'app React, le problème vient de l'app
3. Si ça ne marche pas dans le fichier HTML, le problème vient de la configuration Supabase

## 📞 Support

Si le test échoue :
1. Copiez tous les logs du fichier de test
2. Vérifiez dans Supabase Dashboard si le compte existe
3. Notez les messages d'erreur exacts
4. Vérifiez la configuration Supabase


