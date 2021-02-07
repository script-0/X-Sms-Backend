
# Plateforme d'envoi de SMS : Base de donnée
-----

Ce dossier contient des scripts SQL permettant de créer la base de donnée du projet et de l'initialiser.
Ces scripts ont été prévus pour s'exécuter sur MySQL.
Les caractéristiques de la base de donnée sont:
<ul>
  <li>name : SMSDatabase</li>
  <li>
    Tables :
    <ul>
      <li>User (id, name, phoneNumber, email, country, login, password, smsCredit, ...)</li>
      <li>SMS (id, sender, receiver, content, datehour, sent, read)</li>
      <li>Contact (id, proprietor, name, surName, email, phoneNumber)</li>
    </ul>
  </li>
</ul>

Pour initialiser la bd il faut:
 - ouvrir le terminal et se déplacer dans ce répertoire (à coups de `cd`)
 - lancer mysql en tant que root
 - exécuter la commande suivante dans mysql : `source init_db.sql;`

Ce processus crée les tables de la bd, et une identité `smsplatform` qui sera utilisée par l'api SMS platform pour discuter avec la base de donnée
