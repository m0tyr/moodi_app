# Moodi App
README généré avec l'aide de l'IA

Moodi App est une application web multiplateforme qui permet aux utilisateurs d’exprimer et partager leur humeur du moment. Elle intègre un système d’authentification sécurisé, un fil d’actualité, des profils utilisateurs éditables, et une interface fluide propulsée par des technologies web modernes.

---

## 🧠 Mention d’utilisation de l’IA

Durant le développement de cette application, **l’IA a été utilisée de manière ciblée** pour apprendre et résoudre certains problèmes. Voici comment :

- 🤖 **Sécurité Spring Boot** : L’IA m’a aidé à comprendre comment configurer une authentification basée sur les sessions.
- 🐞 **Débogage avancé** : En cas de bugs complexes ou peu clairs (ex. : erreurs de hook, décalage de session), l’IA a servi d’aide ponctuelle.
- ⚠️ **Erreurs mineures** : Pour corriger rapidement des erreurs TypeScript ou de syntaxe.

Toute la **logique métier, les décisions de conception et l’architecture des composants** ont été réalisées par moi, avec les docs officielles :
- [Documentation Next.js 15](https://nextjs.org/docs)
- [Documentation Spring Boot](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/)

---

## 🧩 Stack Technique

### 🔗 Frontend
- **Framework** : [Next.js 15](https://nextjs.org/) (basé sur React)
- **Style** : TailwindCSS + Framer Motion (animations)
- **State Management** : Zustand
- **API** : REST via `fetch` ou services personnalisés

### 🛠 Backend
- **Framework** : Spring Boot 3.5.2
- **Langage** : Java 21
- **Sécurité** : Spring Security avec gestion de session
- **Base de données** : H2 mem:testdb (in-memory pour dev)
- **ORM** : JPA / Hibernate

---

## 🔐 Authentification & Sécurité

Moodi App utilise **Spring Security** avec **gestion de session** pour une authentification sécurisée. Les sessions sont stockées côté serveur, ce qui évite toute exposition de jetons côté client.

Fonctionnalités :
- Connexion et inscription sécurisées
- Persistance de session (pas de JWT)
- Routes protégées
- API sécurisées

---

## 🧑‍💻 Fonctionnalités

- 🔐 **Connexion et inscription sécurisées**
- 👤 **Profils utilisateurs** – consulter et modifier son pseudo ou son humeur
- 📰 **Fil d’actualité** – découvrir les autres utilisateurs et leur humeur
- 📱 **Multiplateforme** – interface responsive mobile / desktop
- ✨ **UX fluide** – transitions animées, design épuré et navigation rapide

---

## 🚀 Démarrage

### 1. Backend (Spring Boot)

```bash
# Ouvre le projet backend dans IntelliJ IDEA
cd moodi-backend

# Lance l'application Spring Boot
./mvnw spring-boot:run
```

---

### 2. Frontend (Next.js)

```bash
# Ouvrir le projet frontend dans Visual Studio Code
cd moodi-frontend

# Installer les dépendances nécessaires
npm install

# Créer un fichier de configuration pour les variables d’environnement
touch .env.local

#Dans le fichier .env.local, ajoute cette ligne :
NEXT_PUBLIC_API_URL=http://localhost:8080

#Puis lance le serveur de développement :
npm run dev

```
