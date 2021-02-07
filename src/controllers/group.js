'use strict';

var DGroup = require('../models/group.js')
var Membership = require("../models/membership.js")
var Contact = require("../models/contact.js")


exports.list_all = function (req, res) {
  console.log(req.params)
  DGroup.list(req.params.UserId, function (err, contacts) {
    console.log("controller");
    if (err) {
      res.send(err);
    }
    console.log('res', contacts);
    res.send(contacts);
  })
}

exports.create_group = function (req, res) {
  console.log(req.body)

  var new_group = new DGroup(req.body)

  DGroup.create(req.params.UserId, new_group, function (err, contact) {
    if (err) {
      res.send(err);
    }
    res.json(contact);
  });
}

exports.get_group = function (req, res) {
  DGroup.get(req.params.UserId, req.params.GroupId, function (err, contact) {
    if (err) {
      res.send(err)
    }
    res.json(contact)
  })
}

exports.get_contacts_of_group = function (req, res) {
  Membership.get_contacts(req.body.UserId, req.body.GroupId, function (err, contact) {
    if (err) {
      res.send(err)
    }
    res.json(contact)
  })
}

exports.add_contact_to_group = function (req, res) {
  var membership = new Membership({
    group: req.params.GroupId,
    contact: req.body.contact
  })

  Membership.create(membership, function (err, membership) {
    if (err) {
      res.send(err)
    }
    res.send({
      status: "Ok",
      message: "Created!"
    })
  })
}

exports.remove_contact_from_group = function (req, res) {
  Membership.remove_contact(req.params.ContactId, req.params.GroupId, function (err, sortie) {
    if (err) {
      res.send(err)
    }
    res.send({
      message: "Deleted!",
      status: "Ok!"
    })
  })
}

exports.update_group = function (req, res) {
  console.log(req.body)
  var updated_group = new DGroup(req.body)

  DGroup.update(req.params.UserId, req.params.GroupId, updated_group, function (err, contact) {
    if (err) {
      res.send(err);
    }
    res.json(contact);
  });
}

exports.delete_group = function (req, res) {
  DGroup.remove(req.params.UserId, req.params.GroupId, function (err, contact) {
    if (err) {
      res.send(err);
    }
    res.json(contact);
  });
}