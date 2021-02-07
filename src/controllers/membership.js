'use strict';

var Membership = require('../models/membership.js')


exports.list_contacts = function (req, res) {
  console.log(req.params)
  Membership.get_contacts(req.params.UserId, function (err, contacts) {
    console.log("controller");
    if (err) {
      res.send(err);
    }
    console.log('res', contacts);
    res.send(contacts);
  })
}

exports.create_membership = function (req, res) {
  console.log(req.body)
  var new_membership = new Membership(req.body)

  Membership.create(new_membership, function (err, contact) {
    if (err) {
      res.send(err);
    }
    res.json(contact);
  });
}

exports.get_memberships_receivers = function (req, res) {
  Membership.get_receivers(req.params.SMSId, function (err, contact) {
    if (err) {
      res.send(err)
    }
    res.json(contact)
  })
}

exports.remove_contact = function (req, res) {
  Membership.remove_contact(req.body.contact, req.body.dgroup, function (err, contact) {
    if (err) {
      res.send(err)
    }
    res.json(contact)
  });
}