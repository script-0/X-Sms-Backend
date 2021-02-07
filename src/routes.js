'use strict';

module.exports = function (app) {
  var user_controller = require("./controllers/user.js");
  var contact_controller = require("./controllers/contact.js")
  var sms_controller = require("./controllers/sms.js")
  var group_controller = require("./controllers/group.js")
  var membership_controller = require("./controllers/membership.js")
  var sendings_controller = require("./controllers/sendings.js")
  var verifier_controller =  require("./controllers/verifier.js")
  var cors = require('cors')

  app.use(cors())
  // Contact routes
  app.route("/api/users/:UserId/contacts")
    .get(contact_controller.list_all)
    /*
      res : [contacts]
    */
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

  app.route("/api/users/:UserId/contacts/:ContactId")
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
  app.route("/api/users/:UserId/sms")
    .get(sms_controller.list_all)
    /*
      res: [sms]
    */
    .post(sms_controller.create_sms)
    /*
      body: {
        content: required,
        group or contact: required (id)
      }
      res: smsId
    */

  app.route("/api/users/:UserId/sms/:SMSId")
    .get(sms_controller.get_sms)

  // User routes
  app.route('/api/users')
    .get(user_controller.authentificate,user_controller.list_all)
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
  
  app.route('/api/users/:id')
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
  
  // Login routes
  app.route("/api/login")
    .post(user_controller.login)
    /*
      body: {
        login: required, 
        password: required,
      }
      return id
    */
  
  // DGroup routes
  app.route("/api/users/:UserId/groups")
    .get(group_controller.list_all)
    .post(group_controller.create_group)
      /*
        body: {
          name: required
        }
      */
    .delete(group_controller.delete_group)

  app.route("/api/users/:UserId/groups/:GroupId")
    .get(group_controller.get_group)
    .put(group_controller.update_group)
      /*
        body: {
          name: required
        }
      */
    .delete(group_controller.delete_group)
  
  // Pour gérer les contacts d'un groupe
  app.route("/api/users/:UserId/groups/:GroupId/contacts")
    .get(group_controller.get_contacts_of_group)
    .post(group_controller.add_contact_to_group)
      /*
        body: {
          contact: required, (id)
        }
      */
  
  app.route("/api/users/:UserId/groups/:GroupId/contacts/:ContactId")
    .delete(group_controller.remove_contact_from_group)

    /*
        type = email,
        code1 = part1 of Token
        code2 = part2 of Token
        code3 = part3 of Token

    */
  app.route("/api/users/verify/:type/:code1/:code2/:code3")
    .get(user_controller.verify)

    
  app.route("/api/users/token/generate/:text")
    .get(verifier_controller.generate)
  
  app.route("/api/users/decode/:code")
    .get(verifier_controller.decode)

  app.route("/api/users/sendEmail/:address/:link")
    .get(user_controller.sendEmail)
};