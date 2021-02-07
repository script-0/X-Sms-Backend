'use strict';

var XToken = require('../utils/xtoken.js');

exports.generate = function (req, res) {
    console.log("Generating token for : "+req.params.text)
    var token = XToken.sign(req.params.text)
    console.log("Token Generated, value = "+req.params.text)
    res.send(JSON.stringify({value:token}))
  }

exports.decode = function (req, res) {
    console.log(req.params.code);
    var decoded = XToken.decode(req.params.code) 
    res.send(JSON.stringify({value:decoded}))
  }
  
exports.verify = function (req, res) {
    var token = req.params.code1 + req.params.code2 + req.params.code3;
    var data = XToken.decode(token);
    res.send(JSON.stringify({value:data}))
  }