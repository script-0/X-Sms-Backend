'use strict';

var ContactModel = require('../models/contact.js');

exports.list_all = function (req, res) {
  console.log(req.params)
  ContactModel.list(req.params.UserId, function (err, contacts) {
    console.log("controller");
    if (err) {
      res.send(err);
    }
    console.log('res', contacts);
    res.send(contacts);
  })
}

exports.create_contact = function (req, res) {
  console.log(req.body)
  var new_contact = new ContactModel(req.body)

  ContactModel.create(req.params.UserId, new_contact, function (err, contact) {
    if (err) {
      res.send(err);
    }
    res.json(contact);
  });
}

exports.get_contact = function (req, res) {
  ContactModel.get(req.params.UserId, req.params.ContactId, function (err, contact) {
    if (err) {
      res.send(err)
    }
    res.json(contact)
  })
}

exports.update_contact = function (req, res) {
  console.log(req.body)
  var updated_contact = new ContactModel(req.body)

  ContactModel.update(req.params.UserId, req.params.ContactId, updated_contact, function (err, contact) {
    if (err) {
      res.send(err);
    }
    res.json(contact);
  });
}

exports.delete_contact = function (req, res) {
  ContactModel.remove(req.params.UserId, req.params.ContactId, function (err, contact) {
    if (err) {
      res.send(err);
    }
    res.json(contact);
  });
}