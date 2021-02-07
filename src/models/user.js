'use strict';

var sql = require('./db.js');

var User = function (user) {
  this.name = user.name;
  this.phoneNumber = user.phoneNumber;
  this.email = user.email;
  if (!(user.country === undefined)) {
    this.country = user.country;
  }
  this.login = user.login;
  this.password = user.password;
};

User.create = function(user, result){
    sql.query("INSERT INTO User SET ?", user, function (err, res) {
      if (err) {
        console.error("Error: ", err);
        result(err, null);
      }
      else {
        console.log("User created: ", res.insertId);
        const sortie = {
          "userId": res.insertId,
        }
        result(null, sortie);
      }
    });
  };

User.get = function(id, result) {
    sql.query("SELECT * from User WHERE id = ?", id, function (err, res) {
      if (err) {
        console.error("Error: ", err);
        result(err, null);
      }
      else {
        console.log("User "+id+": ", res);
        result(null, res);
      }
    });
  };

User.list = function(result) {
    sql.query("SELECT * from User", function (err, res) {
      if (err) {
        console.error("Error: ", err);
        result(err, null);
      }
      else {
        console.log('User list: ', res);
        result(null, res);
      }
    });
  }

User.update = function(id, user, result) {
    sql.query("UPDATE User SET ? WHERE id = ?", [user, id], function (err, res) {
      if (err) {
        console.error("Error: ", err);
        result(err, null);
      }
      else {
        console.log('User update: ', res);
        result(null, res);
      }
    });
  }

User.remove = function (id, result) {
  sql.query("DELETE FROM User WHERE id = ?", id, function (err, res) {
    if (err) {
      console.error("Error: ", err);
      result(err, null);
    }
    else {
      console.log('User deleted: ', res);
      result(null, res);
    }
  });
};

User.find = function (login, password, result) {
  sql.query("SELECT * FROM User WHERE login = ? AND password = ?", [login, password], function (err, res) {
    if (err) {
      console.error("Error: ", err);
      result(err, null);
    }
    else {
      console.log("User with login=" + login + " and password=" + password + " found!");
      console.log(null, res);
      result(null, res[0])
    }
  })
}

User.verifyEmail = function(id,result){
  sql.query("SELECT * from User WHERE id = ?", id, function (err, res) {
    if (err) {
      console.error("Error: ", err);
      result(err, null);
    }
    else {
      res.emailIsVerified = true;
      sql.query("UPDATE User SET ? WHERE id = ?",id,function(err,res){
        if (err) {
          console.error("Error: ", err);
          result(err, null);
        }
        else {
          console.log("User with id ="+id+" has verified its email");
          console.log(null, res);
          result(null, res)
        }
      })
    }
  })
}


User.verifyNumber = function(id,result){
  let user = sql.query("SELECT * from User WHERE id = ?", id);
  userphoneNumberIsVerified = true;
  sql.query("UPDATE User SET ? WHERE id = ?",[user,id],function(err,res){
    if (err) {
      console.error("Error: ", err);
      result(err, null);
    }
    else {
      console.log("User with id ="+id+" has verified its number");
      console.log(null, res);
      result(null, res[0])
    }
  })
}


module.exports = User;