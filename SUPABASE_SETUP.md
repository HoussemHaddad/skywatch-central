

# Configuration Supabase

Pour une authentification complète, connectez votre projet à Supabase via le bouton vert en haut à droite du tableau de bord Supabase.

Instructions rapides :

- 1) Créez un projet sur https://app.supabase.com/ ou ouvrez votre projet existant.
- 2) Dans le tableau de bord du projet, utilisez le bouton vert (en haut à droite) pour connecter ou configurer les extensions et les services nécessaires.
- 3) Récupérez votre URL Supabase et la clé publique (ANON key) depuis la rubrique "Settings" → "API".
- 4) Ajoutez ces valeurs dans vos variables d'environnement (par exemple `.env` ou `env.example`) :
	- SUPABASE_URL=https://your-project.supabase.co
	- SUPABASE_ANON_KEY=public-anon-key

Vérification :
- Lancez l'application en local et testez l'authentification via le formulaire d'authentification pour vous assurer que les appels vers Supabase fonctionnent.

Remarques :
- Cette documentation est volontairement concise — pour des instructions pas-à-pas (migrations, tables, règles RLS), voir la documentation Supabase officielle.

