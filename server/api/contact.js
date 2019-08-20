import express from 'express';
import nodemailer from 'nodemailer';
import { extname } from 'path';
import {outputCustomer, outputCompany, outputCompanyAnswer} from './contactEmailTemplate/emailTemplate.js';
let router = express.Router();  




// answer mail from the comapny to the customer for some question.
// function sendEmailToClient(email, question, answer){
//   var transporter = nodemailer.createTransport({
//     service: 'gmail',
//     secure: false,
//     port: 25,
//     auth: {
//       user: 'React2019JCT@gmail.com',
//       pass: 'React2019JCT'
//     },
//     tls: {
//       rejectUnauthorized: false
//     }
//   });
//   var mailOptions = {
//     from: 'React2019JCT@gmail.com',
//     to: 'React2019JCT@gmail.com',
//     subject: 'Answer',
//     text: message,
//     html: outputCompanyAnswer(email, question, answer)
//   };
//   console.log('sendingEmailToClient');
//   // transporter.sendMail(mailOptions, function(err,info)
//   // {
//   //   if(err)
//   //   {
//   //     console.log(err);
//   //   }else{
//   //     console.log('Email sent' + info.response);
//   //   }
//   // })
// }

router.post('/sendEmail', (req,res) => {
    var data = req.body;
    var email = data.email;
    var message = data.emailMessage;
    console.log(email,message);

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: false,
      port: 25,
      auth: {
        user: 'React2019JCT@gmail.com',
        pass: 'React2019JCT'
      },
      tls: {
        rejectUnauthorized: false
      }
    });
    var mailOptionsToCompany = {
      from: 'React2019JCT@gmail.com',
      to: 'React2019JCT@gmail.com',
      subject: 'Support',
      text: message,
      html: outputCompany(email, message)
    };

   

    transporter.sendMail(mailOptionsToCompany, function(err,info)
    {
      if(err)
      {
        console.log(err);
      }else{
        console.log('Email sent' + info.response);
        var mailOptionsToCustomer = {
          from: 'React2019JCT@gmail.com',
          to: email,
          subject: 'Contact React 2019',
          text: message,
          html: outputCustomer(message)
        };
        transporter.sendMail(mailOptionsToCustomer, function(err,info)
        {
          if(err)
          {
            console.log(err);
          }else{
            console.log('Email sent' + info.response);
          }
        })
      }
    })
})  

export default router;