# France Tocarde

Application web pour le projet France Tocarde.

## 🚀 Démarrage rapide

### Backend

```bash
# Lancer les services (base de données PostgreSQL et backend Django)
docker compose up -d

# Exécuter les migrations
docker compose exec backend python manage.py migrate
```

Le backend sera accessible sur http://localhost:8000

### Frontend

```bash
# Dans le dossier frontend
cd frontend

# Installer les dépendances
bun install

# Lancer le serveur de développement
bun dev
```

Le frontend sera accessible sur http://localhost:5173

## 📚 Documentation API

La documentation de l'API est automatiquement générée et accessible à:

- ReDoc: http://localhost:8000/api/schema/redoc

## 🏗️ Architecture

- **Frontend**: React 19 + React Router 7 + TailwindCSS 4
- **Backend**: Django + Django REST Framework
- **Base de données**: PostgreSQL 17

## 🛠️ Déploiement

Le déploiement en production est automatisé:

- Chaque push ou merge sur la branche `main` déclenche un déploiement automatique en production
- L'infrastructure est orchestrée via Kubernetes

## 🔧 Environnement de développement

### Variables d'environnement

Les variables d'environnement sont configurées dans le fichier `docker-compose.yml` pour le développement local.

### Structure du projet

```text
├── backend/           # Application Django
│   ├── tpt/           # Code source du backend
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/          # Application React
│   ├── app/           # Code source du frontend
│   └── package.json
├── kubernetes/        # Configuration Kubernetes
├── sql/               # Scripts SQL d'initialisation
├── .github/           # Actions GitHub pour CI/CD
└── docker-compose.yml # Configuration pour le dev local
```

## 📝 Licence

Ce projet est développé par @cesar-richard et @mael-belval
