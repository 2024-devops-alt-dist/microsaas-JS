## microsaas JS : Surprise

# Instructions de mise en place

Clonez le projet avec la commande suivante :

`git clone https://github.com/2024-devops-alt-dist/microsaas-JS.git`

Créez un fichier .env à la racine du projet avec le contenu suivant :
DB_HOST=db
DB_USER=myuser
DB_PASSWORD=mypassword123soleil
DB_NAME=surprisedb
DB_PORT=5432
API_PORT=3000

Puis lancez la commande `docker compose up --build` dans le terminal.

Dans un navigateur, aller sur http://localhost:5173/ pour accéder à l'affichage de la page. Cliquez sur le bouton pour tester la connection au back-end et à la base de données.

# Features

- CommitLint pour vérifier la validité des commits.
- GitHub Actions simples
- Une base de données simple
- Une route simple health dans l'api
- Une requête du front pour récupérer l'endpoint health de l'api
- Une page web pour tester la connexion à l'api
