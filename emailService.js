const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const logger = require('../utils/logger');
const config = require('../config/config');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.email.host,
      port: config.email.port,
      secure: config.email.secure,
      auth: {
        user: config.email.user,
        pass: config.email.password
      }
    });
  }

  async sendTemplateEmail(templateName, data, to, subject) {
    try {
      const templatePath = path.join(__dirname, `../templates/email/${templateName}.ejs`);
      const html = await ejs.renderFile(templatePath, data);

      const mailOptions = {
        from: `"NextEdge IT Service" <${config.email.from}>`,
        to,
        subject,
        html
      };

      await this.transporter.sendMail(mailOptions);
      logger.info(`Email sent to ${to} with template ${templateName}`);
      
    } catch (error) {
      logger.error('Email sending error:', error);
      throw error;
    }
  }

  async sendContactConfirmation(contact) {
    const data = {
      name: contact.name,
      email: contact.email,
      date: new Date().toLocaleDateString(),
      supportEmail: config.email.support
    };

    await this.sendTemplateEmail(
      'contact-confirmation',
      data,
      contact.email,
      'Thank You for Contacting NextEdge IT Service'
    );
  }

  async sendAdminNotification(contact) {
    const data = {
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      message: contact.message,
      service: contact.service,
      date: new Date().toLocaleDateString(),
      adminUrl: `${config.adminUrl}/contacts/${contact._id}`
    };

    await this.sendTemplateEmail(
      'contact-admin-notification',
      data,
      config.email.admin,
      'New Contact Form Submission'
    );
  }

  // ... Additional email methods
}

module.exports = new EmailService();
