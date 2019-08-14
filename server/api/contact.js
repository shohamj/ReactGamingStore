import express from 'express';

let router = express.Router();  

router.post('/sendEmail', (req,res) => {
    var data = req.body;
    var email = data.email;
    var message = data.emailMessage;
    console.log(email,message);

    //   import nodemailer from 'nodemailer';
      //   var transporter = nodemailer.createTransport({
      //     service: 'gmail',
      //     auth: {
      //       user: 'davidyoels@gmail.com',
      //       pass: '0548482348'
      //     }
      //   });
      //   var mailOptions = {
      //     from: 'davidyoels@gmail.com',
      //     to: 'davidyoels@gmail.com',
      //     subject: 'Sending E',
      //     text: ' qweiuqwieuqweqwueiqwe'
      //   };
      //   transporter.sendMail(mailOptions, function(err,info)
      //   {
      //     if(error)
      //     {
      //       console.log(err);
      //     }else{
      //       console.log('Email sent' + info.response);
      //     }
      //   })
})  

export default router;




      //   import nodemailer from 'nodemailer';
      //   var transporter = nodemailer.createTransport({
      //     service: 'gmail',
      //     auth: {
      //       user: 'davidyoels@gmail.com',
      //       pass: '0548482348'
      //     }
      //   });
      //   var mailOptions = {
      //     from: 'davidyoels@gmail.com',
      //     to: 'davidyoels@gmail.com',
      //     subject: 'Sending E',
      //     text: ' qweiuqwieuqweqwueiqwe'
      //   };
      //   transporter.sendMail(mailOptions, function(err,info)
      //   {
      //     if(error)
      //     {
      //       console.log(err);
      //     }else{
      //       console.log('Email sent' + info.response);
      //     }
      //   })
