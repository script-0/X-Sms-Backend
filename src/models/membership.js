'use strict';

var sql = require('./db.js');

class Membership {
  constructor(membership) {
    this.group = membership.group;
    this.contact = membership.contact;
  }

  static create(membership, result) {
    console.log(membership)
    sql.query("INSERT INTO Membership SET ?", membership, function (err, res) {
      if (err) {
        console.error("Error: ", err);
        result(err, null);
      }
      else {
        console.log("Membership created: ", res.insertId);
        const sortie = {
          "ContactId": res.insertId,
        }
        result(null, sortie);
        return 
      }
    });
  }

  static get_contacts(proprietor, group, result) {
    sql.query("SELECT * from Membership WHERE dgroup = ? AND proprietor = ?", [group, proprietor], function (err, res) {
      if (err) {
        console.error("Error: ", err);
        result(err, null);
      }
      else {
        result(null, res);
      }
    });
  }

  static remove_contact(contact, group, result) {
    sql.query("DELETE FROM Membership WHERE dgroup = ? AND contact = ?", [group, contact], function (err, res) {
      if (err) {
        console.error("Error: ", err);
        result(err, null);
      }
      else {
        console.log('Membership deleted: ', res);
        result(null, res);
      }
    });
  }

}

module.exports = Membership;