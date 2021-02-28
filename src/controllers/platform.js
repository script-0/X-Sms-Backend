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

  PlatformModel.create(new_platform, function (err, platform) {
    if (err) {
      res.send(err);
    }else{
        console.log("Platform Created")
        res.json(platform);
    }
  });
}

exports.get_platform = function (req, res) {
    var platform = new PlatformModel(req.body)
    PlatformModel.get_id(platform, function (err, ids) {
        if (err) {
        res.send(err)
        }
        platform.id = ids.id
        res.json(platform)
    })
}

exports.update_platform = function (req, res) {
  console.log(req.body)
  var updated_platform = new PlatformModel(req.body)
  PlatformModel.update(updated_platform, function (err, user) {
    if (err) {
      res.send(err);
    }else if(user.affectedRows == 1){
        res.json(updated_platform)
    }
    else{
        // Cas de duplication dans la B.D.
        // ou pas de modification de la B.D. (pas d'id fourni)
        res.json('malformed Request');
    }
  });
}

exports.login = function (req, res) {
  console.log(req.body)

  PlatformModel.find(req.body.name, req.body.token, function (err, platform) {
    if (err){
      res.send(err);
    }else{
        var token = XToken.sign(platform.id)
        req.session.platform_token = token
        res.send(JSON.stringify({value:"Platform Loged in"}));
    }
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