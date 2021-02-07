var nodemailer = require('nodemailer')

const HOST = "192.168.8.14:3000/api/users/verify/email/"
var message = {
    priority:"high",
    from: "'X-SMS Bulk' <verify@xbulk.com>",
    to: "",
    subject: "Verify your Email",
    html:"<p>"+
                "You are receiving this e-mail because you have just registered for X-Bulk Platform."+
                "You can check your email"+
          "</p>"+
                " <br/> <h1 style='justify-content:center; align-items:center'> <a href= '"+HOST+"$link$' > here </a>"+
           "<p>"+"If it is not from you, simply ignore this email<br/> Best Regards, <br/> @The X-Bulk SMS Team </p>"
          
  }

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'lab.script0@gmail.com',     
      pass: '@passwordLabScript@'
    }
  });

exports.send = function(receiver, link){
    message.to=receiver;
    message.html = message.html.replace("$link$",link)
    
    transporter.sendMail(message, function(error, info){
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
    })
}