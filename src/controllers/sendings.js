'use strict';

var Sendings = require('../models/sendings.js')


exports.list_all = function (req, res) {
  console.log(req.params)
  Sendings.list(req.params.UserId, function (err, contacts) {
    console.log("controller");
    if (err) {
      res.send(err);
    }
    console.log('res', contacts);
    res.send(contacts);
  })
}

exports.create_sending = function (req, res) {
  console.log(req.body)
  var new_sending = new Sendings(req.body)

  Sendings.create(req.params.UserId, new_sending, function (err, contact) {
    if (err) {
      res.send(err);
    }
    res.json(contact);
  });
}

exports.get_sendings_receivers = function (req, res) {
  Sendings.get_receivers(req.params.SMSId, function (err, contact) {
    if (err) {
      res.send(err)
    }
    res.json(contact)
  })
}
