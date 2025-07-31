
const emailjs = require('emailjs-com');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  
  const formData = JSON.parse(event.body);
  
  // Configuration EmailJS
  const emailParams = {
    to_email: 'contactbtece@gmail.com',
    from_name: 'BTECE Formation',
    subject: 'Nouvelle inscription sur BTECE Formation',
    message: `
    Nouvelle inscription reçue:
    
    Nom: ${formData.name || 'Non fourni'}
    Email: ${formData.email || 'Non fourni'}
    Téléphone: ${formData.phone || 'Non fourni'}
    
    Date: ${new Date().toLocaleString()}
    `
  };
  
  try {
    await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_ID,
      emailParams,
      process.env.EMAILJS_USER_ID
    );
    
    return { statusCode: 200, body: 'Notification envoyée' };
  } catch (error) {
    return { statusCode: 500, body: 'Erreur lors de l\'envoi' };
  }
};