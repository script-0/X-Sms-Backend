var dotenv = require('dotenv')
dotenv.config();

var PlatformModel = require('../models/platform.js')
var XToken = require('../utils/xtoken.js')

exports.list_all = function (req, res) {
  PlatformModel.list(function (err, platforms) {
    console.log("controller");
    if (err) {
      res.send(err);
    }
    console.log('res', platforms);
    res.send(platforms);
  })
}


exports.create_platform = function (req, res) {
  console.log(req.body)
  var new_platform = new PlatformModel(req.body)

  PlatformModel.create(platform, function (err, platform) {
    if (err) {
      res.send(err);
    }
    console.log("Platform Created")
    res.json(platform);
  });
}

exports.get_platform = function (req, res) {
    var platform = new PlatformModel(req.body)
    PlatformModel.get_id(platform, function (err, id) {
        if (err) {
        res.send(err)
        }
        platform.id = id
        res.json(platform)
    })
}

exports.update_platform = function (req, res) {
  console.log(req.body)
  var updated_user = new PlatformModel(req.body)
  UserModel.update(updated_user, function (err, user) {
    if (err) {
      res.send(err);
    }
    res.json(user);
  });
}

exports.login = function (req, res) {
  console.log(req.body)

  PlatformModel.find(req.body.name, req.body.token, function (err, platform) {
    if (err) {
      res.send(err);
    }
    var token = XToken.sign(platform.id)
    req.session.platform_token = token
    res.send(JSON.stringify({value:"Platform Loged in"}));
  })
}

exports.authentificate = function(req,res,next){
  console.log("Authentification starting ...")
  const token = req.session.platform_token;
  if(typeof token !== 'undefined') {
      console.log("Token found : "+token);
      if (XToken.decode(token)!=process.env.TOKEN_INVALID){
        console.log("Platform authentificated")
        next();
      }else{
        console.log("Authenfication failed")
        res.json({error:process.env.TOKEN_INVALID})
      }
  } else {
      res.json({error:"Token not found",description:"Platform is not authentificated. Log in again"})
  }
}