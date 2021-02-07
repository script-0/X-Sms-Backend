var dotenv = require('dotenv')
dotenv.config();

var UserModel = require('../models/user.js')

var Xmailer = require('../utils/xmailer.js')

var XToken = require('../utils/xtoken.js')

exports.list_all = function (req, res) {
  UserModel.list(function (err, users) {
    console.log("controller");
    if (err) {
      res.send(err);
    }
    console.log('res', users);
    res.send(users);
  })
}

exports.create_user = function (req, res) {
  console.log(req.body)
  var new_user = new UserModel(req.body)

  UserModel.create(new_user, function (err, user) {
    if (err) {
      res.send(err);
    }
    console.log("User Created")

    let token = XToken.sign(user);
    if(token == XToken.GENERATE_TOKEN_FAILED)
    {
      res.send("User Created But Token Generation Failed");
    }else{
      console.log("Token Genereated")

      let codes = token.split(".")
      let verifyEmailLink = codes[0]+"/"+codes[1]+"/"+codes[2]
      console.log(" link generated :"+verifyEmailLink)
      Xmailer.send(req.body.email,verifyEmailLink)

      console.log("Verify Email sent")
    }

    res.json(user);
  });
}

exports.get_user = function (req, res) {
  UserModel.get(req.params.id, function (err, user) {
    if (err) {
      res.send(err)
    }
    res.json(user)
  })
}

exports.update_user = function (req, res) {
  console.log(req.body)
  var updated_user = new UserModel(req.body)
  const id = req.params.id

  UserModel.update(id, updated_user, function (err, user) {
    if (err) {
      res.send(err);
    }
    res.json(user);
  });
}

exports.find_user = function (req, res) {
  console.log(req.body)
  const login = req.body.login;
  const password = req.body.password;

  UserModel.find(login, password, function (err, user) {
    if (err) {
      res.send(err);
    }
    res.json(user);
  })
}


exports.login = function (req, res) {
  console.log(req.body)
  const login = req.body.login;
  const password = req.body.password;

  UserModel.find(login, password, function (err, user) {
    if (err) {
      res.send(err);
    }
    var token = XToken.sign(user.id)
    req.session.token = token
    res.send(JSON.stringify({value:"You are authentificated"}));
  })
}

exports.delete_user = function (req, res) {
  UserModel.remove(req.params.id, function (err, user) {
    if (err) {
      res.send(err);
    }
    res.json(user);
  });
}

exports.sendEmail = function(req,res){
  console.log(req.params)
   Xmailer.send(req.params.address,req.params.link);
   res.send("Ok")
}

/*exports.authentificate = function(req,res,next){
  console.log("Authentification starting ...")
  const header = req.headers['authorization'];
  if(typeof header !== 'undefined') {
      const bearer = header.split(' ');
      const token = bearer[1];
      console.log("Token found : "+token);
      if (XToken.decode(token)!=process.env.TOKEN_INVALID){
        console.log("User authentificated")
        next();
      }else{
        console.log("Authenfication failed")
        res.json({error:process.env.TOKEN_INVALID})
      }
  } else {
      res.json({error:"Malformed Request",description:"Header undefined"})
  }
}
*/

exports.authentificate = function(req,res,next){
  console.log("Authentification starting ...")
  const token = req.session.token;
  if(typeof token !== 'undefined') {
      console.log("Token found : "+token);
      if (XToken.decode(token)!=process.env.TOKEN_INVALID){
        console.log("User authentificated")
        next();
      }else{
        console.log("Authenfication failed")
        res.json({error:process.env.TOKEN_INVALID})
      }
  } else {
      res.json({error:"Token not found",description:"You are not authentificated. Log in again"})
  }
}

exports.verify = function (req, res) {
  if (!req.params) {
    res.send("malformed request")
  }

  if(!req.params.type){
    res.send("malformed request")
  }

  if (req.params.type == "email") {
    let token= req.params.code1+"."+req.params.code2+"."+req.params.code3
    console.log("Token Generated: "+token)
    let data = XToken.decode(token)
    if(data == "invalid token"){
      res.send("invalid token")
    }else{
      console.log("Token descrypted :"+data)
      console.log("Token descrypted : id = "+data.id)
      UserModel.verifyEmail(req.body.user_id, function (err, user) {
        if (err) {
          res.send(err)
        } else {
          res.json(user)
        }
      })
    }
  }else if (req.params.type == "sms"){

  }else{
    res.send("malformed request")
  }
}