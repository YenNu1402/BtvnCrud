import { text } from 'express';
import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "howell53@ethereal.email",
    pass: "5Ysa79gvhFe2VkKYfn",
  },
});


export const mailService = {
    async sendMail(
        {
            emailFrom,
            emailTo,
            emailSubject,
            emailText
        }
    ){
        const mailOptions ={
            from: emailFrom,
            to:emailTo,
            subject: emailSubject,
            text: emailText,
        }
        console.log("mailOptions: ", mailOptions);
        return await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
        return true;
    },

    
}

