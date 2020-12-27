import sgMail from '@sendgrid/mail';
import { sendgridApiKey } from '../config/vars';

export interface ISendEmail {
  email: string;
  html: string;
  text: string;
  subject: string;
}

export const sendEmail = async ({ email, html, text, subject }: ISendEmail) => {
  try {
    sgMail.setApiKey(sendgridApiKey || '');

    const msg = {
      to: email, // Change to your recipient
      from: 'Sovrakofanela.gr | <info@sovrakofanela.gr>', // Change to your verified sender
      subject,
      text,
      html
    };

    const response = await sgMail.send(msg);

    console.log('SendGrid response: ', response);
  } catch (error) {
    console.log(error);
    return error;
  }
};
