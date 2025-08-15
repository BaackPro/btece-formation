
const emailjs = require('emailjs-com');

exports.handler = async (event, context) => {
  // Vérifier que la méthode est POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    // Parser le corps de la requête
    const data = JSON.parse(event.body);

    // Configuration EmailJS avec les variables d'environnement
    emailjs.init(process.env.EMAILJS_PUBLIC_ID);

    // Paramètres de l'email
    const templateParams = {
      to_name: data.to_name,
      to_email: data.to_email,
      formations: data.formations,
      total_price: data.total_price,
      total_price_eur: data.total_price_eur,
      session: data.session,
      mode_formation: data.mode_formation,
      payment_method: data.payment_method,
      reply_to: process.env.ADMIN_EMAIL || 'contactbtece@gmail.com',
    };

    // Envoi de l'email
    const response = await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_ID, // Template spécifique utilisateur
      templateParams
    );

    // Réponse en cas de succès
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: 'Email de confirmation envoyé avec succès',
        emailjs_response: response 
      }),
    };
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);

    // Réponse en cas d'erreur
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Échec de l\'envoi de l\'email de confirmation',
        details: error.message 
      }),
    };
  }
};