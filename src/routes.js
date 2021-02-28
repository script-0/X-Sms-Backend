'use strict';

module.exports = function (app) {
  var user_controller = require("./controllers/user.js");
  var platform_controller = require("./controllers/platform.js");
  var contact_controller = require("./controllers/contact.js")
  var sms_controller = require("./controllers/sms.js")
  var group_controller = require("./controllers/group.js")
  var membership_controller = require("./controllers/membership.js")
  var sendings_controller = require("./controllers/sendings.js")
  var verifier_controller =  require("./controllers/verifier.js")
  var cors = require('cors')

  app.use(cors())

  //Platform routes
    /*
      body: {
        name: required, 
        token: required,
      }
      return "Platform Loged in"
    */
  app.route("/api/loginPlatform")
    .post(platform_controller.login)
  
  /*   To delete */
  app.route("/api/platforms")
    .get(platform_controller.list_all)

  
  app.route("/api/platform")
    .post(platform_controller.create_platform)

  app.route("/api/platform")
    .put(platform_controller.authentificate, platform_controller.update_platform)

  app.route("/api/platform/")
    .get(platform_controller.authentificate, platform_controller.get_platform)

  // User routes
   app.route('/api/user/create')
   .post(user_controller.create_user)
   /*
     body: {
       name: required,
       phoneNumber: required,
       login: required,
       password: required,
       email: required,
       country: optionnal (?? for 2 characters)
     }
     res: id
   */
 
  app.route('/api/users')
    .get(platform_controller.authentificate,user_controller.list_all)
  
  app.route("/api/login")
    .post(user_controller.login)
    /*
      body: {
        login: required, 
        password: required,
      }
      return id
    */
    
  app.route('/api/user')
    .get(user_controller.get_user)
    .put(user_controller.update_user)
    /*
      body: {
        name: required,
        phoneNumber: required,
        login: required,
        password: required,
        email: required,
        country: optionnal (?? for 2 characters)
      }
      res: id
    */
    .delete(user_controller.delete_user)


  // Contact routes
  app.route("/api/user/contacts")
    .get(contact_controller.list_all)
    /*
      res : [contacts]
    */
  app.route("/api/user/contact/create")
    .post(contact_controller.create_contact)
    /*
      body: {
        name: required,
        phoneNumber: required,
        surname: optionnal,
        email: optionnal
      }
      res: {
        contactId
      }
    */

  app.route("/api/user/contact/:ContactId")
    .get(contact_controller.get_contact)
    /*
      res: {
        id,
        proprietor,
        name,
        surname,
        phoneNumber,
        email
      }
    */
    .put(contact_controller.update_contact)
    /*
      body: {
        name: required,
        phoneNumber: required,
        surname: optionnal,
        email: optionnal
      }
      res: {
        contactId
      }
    */
    .delete(contact_controller.delete_contact)
  
  // SMS routes
  app.route("/api/user/sms")
    .get(sms_controller.list_all)
    /*
      res: [sms]
    */
    .post(sms_controller.create_sms)
    /*
      body: {
        content: required,
        group_id: required ( may ne null),
        user_id: required ( may ne null)
    }
      res: smsId
    */

  app.route("/api/user/sms/:SMSId")
    .get(sms_controller.get_sms)

  // DGroup routes
  app.route("/api/users/groups")
    .get(group_controller.list_all)
    .post(group_controller.create_group)
      /*
        body: {
          name: required
        }
      */
    .delete(group_controller.delete_group)

  app.route("/api/user/groups/:GroupId")
    .get(group_controller.get_group)
    .put(group_controller.update_group)
      /*
        body: {
          name: required
        }
      */
    .delete(group_controller.delete_group)
  
  // Pour gérer les contacts d'un groupe
  app.route("/api/user/groups/:GroupId/contacts")
    .get(group_controller.get_contacts_of_group)
      /*
        body: {
          contact: required, (id)
        }
      */
  
  app.route("/api/user/groups/:GroupId/contacts/:ContactId")
    .put(group_controller.add_contact_to_group)
    .delete(group_controller.remove_contact_from_group)

    /*
        type = email,
        code1 = part1 of Token
        code2 = part2 of Token
        code3 = part3 of Token

    */
   
  app.route("/api/users/verify/:type/:code1/:code2/:code3")
    .get(user_controller.verify)

    
  app.route("/api/user/token/generate/:text")
    .get(verifier_controller.generate)
  
  app.route("/api/user/decode/:code")
    .get(verifier_controller.decode)

  app.route("/api/user/sendEmail/:address/:link")
    .get(user_controller.sendEmail)
};