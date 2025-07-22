const Contact = require('../models/Contact');
const Email = require('../utils/email');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const logger = require('../utils/logger');

/**
 * @desc    Submit contact form
 * @route   POST /api/v1/contact
 * @access  Public
 */
exports.submitContactForm = catchAsync(async (req, res, next) => {
  const { name, email, phone, message, service } = req.body;
  
  // 1) Validate required fields
  if (!name || !email || !message) {
    return next(new AppError('Please provide name, email and message', 400));
  }
  
  // 2) Create contact record
  const newContact = await Contact.create({
    name,
    email,
    phone,
    message,
    service
  });
  
  // 3) Send confirmation email to user
  try {
    await new Email(
      newContact,
      `${process.env.FRONTEND_URL}/contact-confirmation`
    ).sendContactConfirmation();
  } catch (err) {
    logger.error('Error sending contact confirmation email:', err);
  }
  
  // 4) Send notification to admin
  try {
    await new Email(
      newContact,
      `${process.env.FRONTEND_URL}/admin/contacts`
    ).sendContactNotification();
  } catch (err) {
    logger.error('Error sending admin notification email:', err);
  }
  
  // 5) Send response
  res.status(201).json({
    status: 'success',
    data: {
      contact: newContact
    }
  });
});

// ... Additional contact controller methods
