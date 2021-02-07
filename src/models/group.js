'use strict';

var sql = require('./db.js');

var DGroup = function (dgroup) {
  this.name = dgroup.name;
}

DGroup.create = function (proprietor, group, result) {
  dgroup.proprietor = Number(proprietor);
  console.log(dgroup)
  sql.query("INSERT INTO DGroup SET ?", group, function (err, res) {
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
    }
  });
}

DGroup.get = function (proprietor, id, result) {
  sql.query("SELECT * from DGroup WHERE id = ? AND proprietor = ?", [id, proprietor], function (err, res) {
    if (err) {
      console.error("Error: ", err);
      result(err, null);
    }
    else {
      console.log("Contact "+id+": ", res);
      result(null, res);
    }
  });
}

DGroup.list = function (proprietor, result) {
  sql.query("SELECT * FROM DGroup WHERE proprietor = ? ", proprietor, function (err, res) {
    if (err) {
      console.error("Error: ", err);
      result(err, null);
    }
    else {
      console.log('DGroup list of proprietor: ', res);
      result(null, res);
    }
  });
}

DGroup.update = function (proprietor, id, dgroup, result) {
  sql.query("UPDATE DGroup SET ? WHERE id = ? AND proprietor = ?", [dgroup, id, proprietor], function (err, res) {
    if (err) {
      console.error("Error: ", err);
      result(err, null);
    }
    else {
      console.log('DGroup update: ', res);
      result(null, res);
    }
  });
}

DGroup.remove = function (proprietor, id, result) {
  sql.query("DELETE FROM DGroup WHERE id = ? AND proprietor = ?", [id, proprietor], function (err, res) {
    if (err) {
      console.error("Error: ", err);
      result(err, null);
    }
    else {
      console.log('DGroup deleted: ', res);
      result(null, res);
    }
  });
}

module.exports = DGroup;