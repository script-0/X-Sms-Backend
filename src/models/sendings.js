'use strict';

var sql = require('./db.js');

class Sendings {
  constructor(sending) {
    this.sms = sending.sms;
    if (sending.dgroup) {
      this.dgroup = sending.dgroup;
    }
    else if (sending.contact) {
      this.contact = sending.contact;
    }
    else {
      console.error("Impossible!")
    }
    
  }

  static create(sending, result) {
    console.log(sending)
    sql.query("INSERT INTO Sendings SET ?", sending, function (err, res) {
      if (err) {
        console.error("Error: ", err);
        result(err, null);
      }
      else {
        console.log("Sendings created: ", res.insertId);
        const sortie = {
          "SendingId": res.insertId,
        }
        result(null, sortie);
      }
    });
  }

  static get_receiver(sms, result) {
    sql.query("SELECT * from Sendings WHERE sms = ?", sms, function (err, res) {
      if (err) {
        console.error("Error: ", err);
        result(err, null);
      }
      else {
        result(null, res);
      }
    });
  }

}

module.exports = Sendings;