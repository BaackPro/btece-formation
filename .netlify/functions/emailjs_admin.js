const emailjs = require('emailjs-com');

exports.handler = async function(event, context) {
  // Vérification de la méthode HTTP
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
      headers: { 'Content-Type': 'application/json' }
    };
  }

  try {
    // Parse des données du formulaire
    const formData = JSON.parse(event.body);
    
    // Configuration du mail admin
    const emailParams = {
      to_email: 'contactbtece@gmail.com',
      from_name: 'BTECE Formation',
      reply_to: formData.email || 'no-reply@btece-formation.com',
      subject: `Nouvelle inscription: ${formData.prenom || ''} ${formData.nom || ''}`,
      message_html: `
        <h2>Nouvelle inscription reçue</h2>
        <p><strong>Nom complet:</strong> ${formData.prenom || ''} ${formData.nom || ''}</p>
        <p><strong>Email:</strong> ${formData.email || 'Non fourni'}</p>
        <p><strong>Téléphone:</strong> ${formData.telephone || 'Non fourni'}</p>
        <p><strong>Formations:</strong> ${formData.formations || 'Non spécifié'}</p>
        <p><strong>Méthode de paiement:</strong> ${formData.payment_method || 'Non spécifié'}</p>
        <p><strong>Montant:</strong> ${formData.total || 'Non spécifié'}</p>
        <hr>
        <p><em>Date d'inscription: ${new Date().toLocaleString('fr-FR')}</em></p>
      `
    };

    // Envoi de l'email
    const response = await emailjs.send(
      process.env.SERVICE_ID,  // Utilisez le même SERVICE_ID que pour les confirmations
      process.env.ADMIN_TEMPLATE_ID,  // Créez un template spécifique dans EmailJS
      emailParams,
      process.env.USER_ID
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Notification admin envoyée', response: response.text }),
      headers: { 'Content-Type': 'application/json' }
    };
  } catch (error) {
    console.error('Erreur détaillée:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Erreur lors de l\'envoi de la notification',
        details: error.message 
      }),
      headers: { 'Content-Type': 'application/json' }
    };
  }
};