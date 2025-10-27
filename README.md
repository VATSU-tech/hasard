# Hasard App — Guide complet (FR)

Ce README explique comment fonctionne le projet, comment le lancer, et détaille la logique fichier par fichier.

## Structure
- `index.html` : point d'entrée HTML.
- `src/` : code TypeScript.
  - `App.ts` : classe principale (logique métier).
  - `main.ts` : liaison UI <-> App et logique d'import/export/modal.
  - `dom.ts` : références DOM typées.
  - `services/storage.ts` : abstraction sur localStorage.
  - `utils/random.ts` : utilitaires hasard.
  - `styles.css` : styles.
  - `tests/` : tests unitaires (Vitest).
- `manifest.json` et `sw.js` : PWA skeleton.
- `icons/` : icônes pour le manifest.

## Lancer le projet
1. Installer les dépendances :
   ```bash
   npm install
   ```
2. Dev server :
   ```bash
   npm run dev
   ```
3. Build :
   ```bash
   npm run build
   npm run preview
   ```

## Fonctionnalités
- Ajouter participant (Enter ou bouton).
- Supprimer (bouton 🗑) → ouvre une modal de confirmation pour suppression définitive.
- Undo : annuler la dernière suppression (non permanente).
- Export CSV / Import CSV.
- Impression.
- PWA : service worker simple et manifest.

## Notes techniques
- Tout le rendu DOM utilise `createElement` + `textContent` (sécurité XSS).
- `StorageService` centralise la persistance.
- `deletedStack` est limité (UNDO_LIMIT).
- `sw.js` implémente un cache-first minimal.

Pour toute question, consulte les commentaires en français dans les fichiers TypeScript.
