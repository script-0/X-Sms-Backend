# API de SMS Platform

Dans cette partie ont été définies les routes que le frontend utilisera.
Les routes sont détaillées dans le fichier `src/routes.js`.
A noter qu'il s'agit bien d'une API `RESTFUL`.

--------

## Déployer l'api

Pour fonctionner, cet API a besoin:
  - de mysql (8.0 dans les tests)
  - de node js

Les étapes:

1. D'abord, il faut faire `npm install` pour installer toutes les dépendances (express, mysqlconnector, ...)
2. Exécuter le script qui se trouve dans `$HOME_PROJECT/backend/database/init_db.sql` (dans un shell mysql évidemment). Lire le `README.md` dudit dossier pour plus d'infos
3. Dans le fichier se trouvant dans `$API_PROJECT/src/models/db.js`, remplacer les infos de connexion par les paramètres du serveur MySQL local
4. Ouvrir le terminal, se déplacer dans le dossier courant (`$HOME_PROJECT/`) et lancer `npm start`.

Bon Courage!

## Les Routes

Les routes ont été implémentées dans une logique d'authentification par session
Les différentes routes et leur format sont:

### A-Routes de gestion des utilisateurs
1. `/api/user/create` : `POST` creation des utilisateurs. Attend un JSON :
  {
       name: required,
       phoneNumber: required,
       login: required,
       password: required,
       email: required,
       country: optionnal (?? for 2 characters)
  }

2. `/api/users` : `GET` pour lister  tous les users (route de test (Elle sera supprimée)), `POST` pour enregistrer un User).

3. `/api/login` : `POST` uniquement (login et authentifie l'utilisateur). Le body doit contenir : `login` et `password`
  {
        login: required, 
        password: required,
  }

4. `/api/user` : `GET` pour récupérer les infos de l'user authentifié, `PUT` pour modifier ses infos. Dans le cas du `PUT`, le format de JSON est attendu est celui de la creation d'un utilisateur, pour les champs non fournis, leurs valeurs précédantes seront utilisés.

### B-Routes de gestion des contacts
1. `/api/user/contacts` : `GET` pour recuperer les contacts de l'utilisateur de la session en cours.
2. `/api/user/contact/create` : `POST` pour ajouter un contact à l'utilisateur de la session en cours. un JSON est attendu :
  {
        name: required,
        phoneNumber: required,
        surname: optionnal,
        email: optionnal
  }
3. `/api/user/contact/<ContactId>` : pour gérer un contact avec son id
    `GET` pour recuperer les informations du contact
    `PUT` pour les modifier
    'DELETE` pour le supprimer

### C-Routes de gestion des SMS

1. `/api/user/sms` : `GET` pour récupérer la liste des sms d'un user
  `POST` pour envoyer un sms. Un JSON est attendu :
    {
      content: required,
      group_id: required ( may ne null),
      user_id: required ( may ne null)
    }

2. `/api/user/sms/<SMSId>` : `GET` pour récupérer les infos d'un SMS (pas de Modification , ni de suppression)

### D-Routes de gestion des Groupes
1. `/api/user/groups/:GroupId`
  `GET`  pour recuperer les informations d'un groupe 
  `PUT` pour modifier le nom du groupe 
    {
      contact: required, (id)
    }
    `DELETE` pour supprimer un groupe

2. `/api/user/groups/:GroupId/contacts` : `GET` pour recuperer la liste des contacts d'un groupe. 

3. `/api/user/groups/:GroupId/contacts/:ContactId`
  `PUT` : ajouter un contact à un groupe
  `DELETE` : retirer un contact d'un groupe

### E-Quelques Routes de test
1. `/api/user/token/generate/:text` : `GET` générer et renvoyer le token correspondant à  `:text`

2. `/api/user/decode/:code` : `GET` verify le token `:code` et le decode

3. `/api/user/sendEmail/:address/:link` : `GET` pour envoyer un e-amil à `:address` contenant un le lien `:link`