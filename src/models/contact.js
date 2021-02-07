'use strict';

var sql = require('./db.js');

var Contact = function (contact) {
  this.name = contact.name;
  if (contact.surname != undefined) {
    this.surname = contact.surname;
  }
  this.phoneNumber = contact.phoneNumber;
  if (contact.email != undefined) {
    this.email = contact.email;
  }
};

Contact.create = function (proprietor, contact, result) {
  contact.proprietor = Number(proprietor);
  console.log(contact)
  sql.query("INSERT INTO Contact SET ?", contact, function (err, res) {
    if (err) {
      console.error("Error: ", err);
      result(err, null);
    }
    else {
      console.log("Contact created: ", res.insertId);
      const sortie = {
        "ContactId": res.insertId,
      }
      result(null, sortie);
      return sortie
    }
  });
}

Contact.get = function(proprietor, id, result) {
  sql.query("SELECT * from Contact WHERE id = ? AND proprietor = ?", [id, proprietor], function (err, res) {
    if (err) {
      console.error("Error: ", err);
      result(err, null);
    }
    else {
      console.log("Contact "+id+": ", res);
      result(null, res);
    }
  });
};

Contact.list = function(proprietor, result) {
  sql.query("SELECT * FROM Contact WHERE proprietor = ? ", proprietor, function (err, res) {
    if (err) {
      console.error("Error: ", err);
      result(err, null);
    }
    else {
      console.log('Contact list of proprietor: ', res);
      result(null, res);
    }
  });
}

Contact.update = function(proprietor, id, Contact, result) {
  sql.query("UPDATE Contact SET ? WHERE id = ? AND proprietor = ?", [Contact, id, proprietor], function (err, res) {
    if (err) {
      console.error("Error: ", err);
      result(err, null);
    }
    else {
      console.log('Contact update: ', res);
      result(null, res);
    }
  });
}

Contact.remove = function (proprietor, id, result) {
sql.query("DELETE FROM Contact WHERE id = ? AND proprietor = ?", [id, proprietor], function (err, res) {
  if (err) {
    console.error("Error: ", err);
    result(err, null);
  }
  else {
    console.log('Contact deleted: ', res);
    result(null, res);
  }
});
};

module.exports = Contact;