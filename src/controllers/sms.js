'use strict';

var SMSModel = require('../models/sms.js');
var Sendings = require('../models/sendings.js')

exports.list_all = function (req, res) {
  console.log(req.params)
  SMSModel.list(req.params.UserId, function (err, sms) {
    console.log("controller");
    if (err) {
      res.send(err);
    }
    console.log('res', sms);
    res.send(sms);
  })
}

exports.create_sms = function (req, res) {
  console.log(req.body)
  var new_sms = new SMSModel(req.body.content)

  // Creating the sms
  const smsId = SMSModel.create(req.params.UserId, new_sms, function (err, sms) {
    if (err) {
      res.send(err);
    }
    res.json(sms);
  });

  // Linking the SMS to a group or a user by creating a new sending
  
  const sending = new Sending({
    sms: smsId,
    dgroup: req.body.dgroup,
    contact: req.body.contact
  })

  Sendings.create(sending, function (err, sending) {
    if (err) {
      res.send(err)
    }
  }) 

    
}

exports.get_sms = function (req, res) {
  SMSModel.get(req.params.UserId, req.params.SMSId, function (err, sms) {
    if (err) {
      res.send(err)
    }
    res.json(sms)
  })
}

/* 
exports.update_sms = function (req, res) {
  console.log(req.body)
  var updated_sms = new SMSModel(req.body)

  SMSModel.update(req.params.UserId, req.params.SMSId, updated_sms, function (err, sms) {
    if (err) {
      res.send(err);
    }
    res.json(sms);
  });
}

exports.delete_sms = function (req, res) {
  SMSModel.remove(req.params.UserId, req.params.SMSId, function (err, sms) {
    if (err) {
      res.send(err);
    }
    res.json(sms);
  });
} */