# ⚠ Le code source et les autres ameliorations arrive bientot !

# 🎲 HasardApp — Laissez le hasard décider pour vous

[![Made with TypeScript](https://img.shields.io/badge/Made%20with-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-5A0FC8?style=for-the-badge&logo=googlechrome&logoColor=white)]()
[![Responsive](https://img.shields.io/badge/UI-Responsive-brightgreen?style=for-the-badge&logo=css3)]()
[![Open Source](https://img.shields.io/badge/Open%20Source-%E2%9D%A4-red?style=for-the-badge)]()

---

## ✨ À propos

**HasardApp** est une application web moderne qui vous permet de :
- 🎯 **Tirer au sort des noms** ou des éléments en un clic,  
- 👥 **Créer des groupes aléatoires** selon la taille souhaitée,  
- 💾 **Sauvegarder vos listes localement**,  
- 📤 **Exporter ou imprimer vos résultats**,  
- 📱 Et même de l’utiliser **hors ligne**, grâce à sa compatibilité **PWA** !

> 🚀 **En clair :** c’est l’application parfaite pour les professeurs, organisateurs, associations, ou toute personne qui veut laisser le hasard faire le travail à sa place.

---

## 🧠 Pourquoi utiliser HasardApp ?

| 🎯 Besoin | 💡 Solution HasardApp |
|-----------|-----------------------|
| Tirer un nom au hasard | Cliquez, c’est fait ! |
| Créer des groupes équitables | Automatisation intelligente |
| Supprimer ou corriger une erreur | Fonction **Undo** instantanée |
| Garder vos résultats | Sauvegarde locale + Export CSV |
| Travailler sans Internet | Mode **offline PWA** intégré |

---

## ⚙️ Fonctionnalités modernes

- ✅ **Undo / Supprimer des participants**  
- 🧩 **Import CSV** (ajoutez vos noms en masse)  ⚠
- 📜 **Export CSV / Impression directe**  ⚠
- 🧠 **Mémoire locale automatique (LocalStorage)**  
- 🗂️ **Groupes aléatoires dynamiques**  
- 🌗 **Mode clair / sombre** (personnalisable via Sass)  
- 🔧 **TypeScript + Vite = Performance et sécurité**  
- ⚡ **Service Worker & Manifest PWA**  ⚠
- 💅 **Interface fluide & responsive**

---

## 🖼️ Aperçu visuel

> *(Ajoutez ici vos captures d’écran une fois le projet en ligne)*  

| Écran principal | Mode sombre | Résultats aléatoires |
|:----------------:|:------------:|:--------------------:|
| ![main](./screenshots/main.png) | ![dark](./screenshots/dark.png) | ![result](./screenshots/result.png) |

---

## 🧭 Utilisation rapide

1. **Ajoutez vos participants** dans le champ prévu.  
2. Cliquez sur **« Ajouter »** pour les valider.  
3. Appuyez sur **« Tirer au hasard »** ou choisissez un **nombre de groupes**.  
4. Visualisez instantanément les résultats à l’écran.  
5. **Exportez ou imprimez** vos résultats si besoin.  

> Bonus 💡 : cochez *« par groupe »* pour créer des équipes automatiquement !

---

## 💻 Installation locale (optionnelle)

```bash
# Clonez le dépôt
git clone https://github.com/votre-nom/hasard-app.git

# Accédez au dossier
cd hasard-app

# Installez les dépendances
npm install

# Lancez le serveur local
npm run dev
