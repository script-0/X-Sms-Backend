
# Plateforme d'envoi de SMS : Base de donnée
-----

Ce dossier contient des scripts SQL permettant de créer la base de donnée du projet et de l'initialiser.
Ces scripts ont été testes sur MySQL8.0.
Pour initialiser la bd il faut:
 - ouvrir le terminal 
 - lancer mysql en tant que root
 - exécuter la commande suivante dans mysql : `source init_db.sql;`

Ce processus crée la B.D. `smsdatabase` , les tables de la bd, et une identité `smsplatform` qui sera utilisée par l'api SMS platform pour discuter avec la base de donnée
Les caractéristiques de la base de donnée sont:
<ul>
  <li>name : SMSDatabase</li>
  <li>
    Tables :
    <ul>
      <li>User :
        <ul>
          <li> id, </li>
          <li> name, </li>
          <li> phoneNumber, </li>
          <li> email, </li>
          <li> country, </li>
          <li> login, </li>
          <li> password, </li>
          <li> phoneNumberIsVerified, </li>
          <li> apiLogin :le login de la passerelle d'envoi des SMS ,</li>
          <li> apiKey : le token de la passerelle ,</li>
          <li> proxySMSurl : l'url de la passerelle ,</li>
          <li> smsCredit,</li>
          <li> created_at ,</li>
          <li> last_updated </li>          
        </ul>
      </li>
      <li>SMS :
        <ul>
          <li> id, </li>
          <li> sender, foreign Key user(id) </li>
          <li> receiver, foreign Key contact(id) </li>
          <li> content, </li>
          <li> sent_at,</li>
          <li> is_sent</li>
        </ul>
      </li>
      <li>Contact :
        <ul>
          <li> id,</li>
          <li> proprietor, foreign Key user(id)</li>
          <li> name, </li>
          <li> surName, </li>
          <li> email, </li>
          <li> phoneNumber</li>
        </ul>
      </li>
      <li>Dgroup : Groupe de discussion
          <ul>
              <li> id ,</li>
              <li> proprietor, foreign Key user(id) </li>
              <li> name </li>
          </ul>
      </li>
      <li>Membership :
          <ul>
              <li> id ,</li>
              <li> dgroup , foreign key Dgroud(id) </li>
              <li> contact , foreign key Contact(id) </li>
          </ul>
      </li>
      <li>Sendings :
          <ul>
              <li> id ,</li>
              <li> sms , foreign key Sms(id) </li>
              <li> dgroup , foreign key Dgroup(id) </li>
              <li> contact , foreign key Contact(id) </li>
          </ul>
      </li>
      <li>Platform :
          <ul>
              <li> id , </li>
              <li> name,   </li>
              <li> token </li>
          </ul>
    </ul>
  </li>
  <li>User :
      <ul>
          <li> nom : `smsplatform` </li>
          <li> password : `smsplatform` </li>
      </ul>
  </li>
</ul>
