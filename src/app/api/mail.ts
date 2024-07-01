'use server'

import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';


const emailadd = 'hapuarachchikaviru@gmail.com';
const emailpass = process.env.MAILPASS;

export async function sendMail(formData:any) {
    const { email, name } = formData;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: emailadd,
            pass: emailpass
        }
    });

    const mailOptions = {
        from: emailadd,
        to: email,
        subject: 'WEB 101 | Welcome to the community!',
        html: `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333333;
            margin: 0;
            padding: 0;
            line-height: 1.6;
        }

        .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #ffffff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
        }

        h1 {
            color: #333333;
        }

        p {
            font-size: 16px;
            margin: 0 0 10px;
        }

        .button {
            display: inline-block;
            padding: 6px 20px;
            margin-top: 20px;
            background-color: #be27ff;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
        }

        .button:hover {
            color: #ffffff;
            background-color: #0056b3;
        }

        .footer {
            margin-top: 20px;
            color: #636363;
            font-size: 0.9em;
        }
    </style>
</head>

<body>
    <div class="container">
        <h1>Hello ${name},</h1>
        <p>Thank you for joining our community. We are excited to have you with us.</p>
        <p>If you have any questions or need any assistance, feel free to reach out.</p>
        <a target="_blank" href="https://kh.ko-de.org" class="button">Visit My Portfolio</a>
        <div class="footer">
            <p>Best Regards,</p>
            <p>Kaviru H.</p>
        </div>
    </div>
</body>

</html>
        `
        // attachments: [{
        //     path: 'https://test1.ko-de.org/acm1bn.png',
        //     cid: 'unique@image.cid'
        // }]
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${email}`);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Email could not be sent');
    }
}
