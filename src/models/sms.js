'use strict';

var sql = require('./db.js');

var SMS = function (sms) {
  this.content = sms.content
};

SMS.create = function (sender, sms, result) {
  sms.sender = Number(sender);
  console.log(sms)
  sql.query("INSERT INTO SMS SET ?", sms, function (err, res) {
    if (err) {
      console.error("Error: ", err);
      result(err, null);
    }
    else {
      console.log("SMS created: ", res.insertId);
      const sortie = {
        "SMSId": res.insertId,
      }
      result(null, sortie);
      return sortie
    }
  });
}

SMS.get = function(sender, id, result) {
  sql.query("SELECT * from SMS WHERE id = ? AND sender = ?", [id, sender], function (err, res) {
    if (err) {
      console.error("Error: ", err);
      result(err, null);
    }
    else {
      console.log("SMS "+id+": ", res);
      result(null, res);
    }
  });
};

SMS.list = function(sender, result) {
  sql.query("SELECT * FROM SMS WHERE sender = ? ", sender, function (err, res) {
    if (err) {
      console.error("Error: ", err);
      result(err, null);
    }
    else {
      console.log('SMS list of sender: ', res);
      result(null, res);
    }
  });
}

/* SMS.update = function(sender, id, SMS, result) {
  sql.query("UPDATE SMS SET ? WHERE id = ? AND sender = ?", [SMS, id, sender], function (err, res) {
    if (err) {
      console.error("Error: ", err);
      result(err, null);
    }
    else {
      console.log('SMS update: ', res);
      result(null, res);
    }
  });
}

SMS.remove = function (sender, id, result) {
sql.query("DELETE FROM SMS WHERE id = ? AND sender = ?", [id, sender], function (err, res) {
  if (err) {
    console.error("Error: ", err);
    result(err, null);
  }
  else {
    console.log('SMS deleted: ', res);
    result(null, res);
  }
});
}; */

module.exports = SMS;