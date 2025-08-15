
const emailjs = require('emailjs-com');

exports.handler = async function(event, context) {
  // Vérification de la méthode HTTP et du contenu
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ 
        error: 'Method Not Allowed',
        message: 'Seules les requêtes POST sont acceptées' 
      }),
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store' 
      }
    };
  }

  // Vérification du corps de la requête
  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ 
        error: 'Bad Request',
        message: 'Données du formulaire manquantes' 
      }),
      headers: { 'Content-Type': 'application/json' }
    };
  }

  try {
    // Parse et validation des données
    const formData = JSON.parse(event.body);
    
    // Vérification des champs obligatoires
    if (!formData.email || !formData.prenom || !formData.nom) {
      return {
        statusCode: 422,
        body: JSON.stringify({ 
          error: 'Unprocessable Entity',
          message: 'Les champs email, prénom et nom sont obligatoires' 
        }),
        headers: { 'Content-Type': 'application/json' }
      };
    }

    // Configuration de l'email admin
    const emailParams = {
      to_email: process.env.EMAILJS_ADMIN_EMAIL || 'contactbtece@gmail.com',
      from_name: 'BTECE Formation',
      reply_to: formData.email,
      subject: `[BTECE] Nouvelle inscription - ${formData.prenom} ${formData.nom}`,
      message_html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2 style="color: #2c3e50;">Nouvelle inscription reçue</h2>
          
          <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
            <h3 style="margin-top: 0; color: #3498db;">Informations personnelles</h3>
            <p><strong>Nom complet:</strong> ${formData.prenom} ${formData.nom}</p>
            <p><strong>Email:</strong> <a href="mailto:${formData.email}">${formData.email}</a></p>
            ${formData.telephone ? `<p><strong>Téléphone:</strong> ${formData.telephone}</p>` : ''}
          </div>
          
          <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
            <h3 style="margin-top: 0; color: #3498db;">Détails de l'inscription</h3>
            ${formData.formations ? `<p><strong>Formations:</strong> ${formData.formations}</p>` : ''}
            ${formData.session ? `<p><strong>Session:</strong> ${formData.session}</p>` : ''}
            ${formData.payment_method ? `<p><strong>Méthode de paiement:</strong> ${formData.payment_method}</p>` : ''}
            ${formData.total ? `<p><strong>Montant:</strong> ${formData.total}</p>` : ''}
          </div>
          
          <div style="margin-top: 20px; color: #7f8c8d; font-size: 0.9em;">
            <hr>
            <p>Date d'inscription: ${new Date().toLocaleString('fr-FR', { 
              day: '2-digit', 
              month: '2-digit', 
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</p>
            <p>Cet email a été envoyé automatiquement depuis le formulaire d'inscription BTECE.</p>
          </div>
        </div>
      `,
      message_text: `Nouvelle inscription:
      ${formData.prenom} ${formData.nom} (${formData.email})
      Formations: ${formData.formations || 'Non spécifié'}
      Session: ${formData.session || 'Non spécifié'}
      Paiement: ${formData.payment_method || 'Non spécifié'}
      Montant: ${formData.total || 'Non spécifié'}
      `
    };

    // Envoi de l'email via EmailJS
    const emailResponse = await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_ADMIN_TEMPLATE_ID,
      emailParams,
      process.env.EMAILJS_PUBLIC_ID
    );

    // Réponse de succès
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true,
        message: 'Notification envoyée avec succès',
        email_id: emailResponse.text 
      }),
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store'
      }
    };

  } catch (error) {
    // Journalisation de l'erreur complète
    console.error('Erreur lors de l\'envoi:', {
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });

    // Réponse d'erreur
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'internal_server_error',
        message: 'Une erreur est survenue lors de l\'envoi de la notification',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      }),
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store'
      }
    };
  }
};