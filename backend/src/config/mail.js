export default {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  default: {
    from: 'Equipe goBarer <noreply@gobarber.com>',
  },
};

/**
 * Amazon SES
 * MailGun
 * SparkPost
 * Mandril(mailchimp)
 * gmail (não é legal por limits)
 * mailtrap(DEV) - apenas ambiente de desenvolvimento https://mailtrap.io/
 */
