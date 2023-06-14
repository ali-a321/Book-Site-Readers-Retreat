const nodemailer = require('nodemailer');
const db = require('../db');


//POST, /sendemail

const sendEmail = async (req, res) => {

  const { id, orderDetails, final } = req.body; 
  
  try {
    db.query('SELECT * FROM users WHERE id = ?', [id], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error retrieving user information' });
      } else {
        if (result.length > 0) {
          const { username, email } = result[0];
          const transporter = nodemailer.createTransport({
            service: 'hotmail',
            auth: {
              user: 'a1i86@outlook.com',
              pass: process.env.EMAILPASS,
            },
          });

          const mailOptions = {
            from: 'a1i86@outlook.com',
            to: email,
            subject: "Order Confirmation: Readers' Retreat ",
            html: `
            <h4> Dear ${username}, </h4>
            <p>Thank you for placing an order with Readers' Retreat! Here are your order details:</p>
            <ul>
              ${orderDetails.map((item) => `
              <div style="display: flex; align-items: center; margin-bottom: 20px;">
                <div>
                  <img src="${item.cover}" alt="Book Cover" style="width: 100px; height: 150px;">
                </div>
                <div style="margin-left: 20px;">
                  <p>Book: ${item.title}</p>
                  <p>Quantity: ${item.quantity}</p>
                  <p>Price: $${item.price}</p>
                  <p>Total Price: $${item.total_price}</p>
                </div>
              </div>
            `).join('')}
            <p><strong>Total Order: $${final}</strong></p>
            <p>Thank you for shopping with us!</p>
            `,
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error(error);
              res.status(500).json({ error: 'Error sending email' });
            } else {
              console.log('Email sent: ' + info.response);
              res.json({ message: 'Email sent successfully' });
            }
          });
        } else {
          res.status(404).json({ error: 'User not found' });
        }
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

module.exports = sendEmail;