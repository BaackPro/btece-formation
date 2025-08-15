
const emailjs = require('emailjs-com');
const sanitizeHtml = require('sanitize-html');

// Configuration initiale d'EmailJS
emailjs.init(process.env.EMAILJS_PUBLIC_ID);

exports.handler = async function(event, context) {
  // 1. Validation de la requête
  if (event.httpMethod !== 'POST') {
    return generateResponse(405, {
      error: 'Method Not Allowed',
      message: 'Seules les requêtes POST sont acceptées'
    });
  }

  if (!event.body) {
    return generateResponse(400, {
      error: 'Bad Request',
      message: 'Données du formulaire manquantes'
    });
  }

  try {
    // 2. Traitement des données
    const formData = JSON.parse(event.body);
    const requiredFields = ['email', 'prenom', 'nom'];
    const missingFields = requiredFields.filter(field => !formData[field]);

    if (missingFields.length > 0) {
      return generateResponse(422, {
        error: 'Unprocessable Entity',
        message: `Champs obligatoires manquants: ${missingFields.join(', ')}`,
        missing_fields: missingFields
      });
    }

    // 3. Préparation du contenu sécurisé
    const sanitizedData = {
      prenom: sanitizeHtml(formData.prenom),
      nom: sanitizeHtml(formData.nom),
      email: sanitizeHtml(formData.email),
      telephone: formData.telephone ? sanitizeHtml(formData.telephone) : null,
      formations: formData.formations ? sanitizeHtml(formData.formations) : null,
      session: formData.session ? sanitizeHtml(formData.session) : null,
      payment_method: formData.payment_method ? sanitizeHtml(formData.payment_method) : null,
      total: formData.total ? sanitizeHtml(formData.total) : null
    };

    // 4. Construction du template email
    const emailParams = {
      to_email: process.env.ADMIN_EMAIL || 'contactbtece@gmail.com',
      from_name: 'BTECE Formation',
      reply_to: sanitizedData.email,
      subject: `[BTECE] Nouvelle inscription - ${sanitizedData.prenom} ${sanitizedData.nom}`,
      message_html: buildEmailHtmlTemplate(sanitizedData),
      message_text: buildEmailTextTemplate(sanitizedData)
    };

    // 5. Envoi de l'email
    const emailResponse = await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_ADMIN_TEMPLATE_ID,
      emailParams
    );

    // 6. Réponse de succès
    return generateResponse(200, {
      success: true,
      message: 'Notification admin envoyée avec succès',
      email_id: emailResponse.text
    });

  } catch (error) {
    console.error('Erreur:', {
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });

    return generateResponse(500, {
      error: 'internal_server_error',
      message: 'Erreur lors du traitement de la demande',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Fonctions utilitaires
function generateResponse(statusCode, body) {
  return {
    statusCode,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff'
    }
  };
}

function buildEmailHtmlTemplate(data) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Nouvelle inscription BTECE</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px; }
        .section { background: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
        .section-title { color: #3498db; margin-top: 0; }
        .footer { margin-top: 20px; color: #7f8c8d; font-size: 0.9em; border-top: 1px solid #eee; padding-top: 10px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>Nouvelle inscription reçue</h2>
        </div>
        
        <div class="section">
          <h3 class="section-title">Informations personnelles</h3>
          <p><strong>Nom complet:</strong> ${data.prenom} ${data.nom}</p>
          <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
          ${data.telephone ? `<p><strong>Téléphone:</strong> ${data.telephone}</p>` : ''}
        </div>
        
        <div class="section">
          <h3 class="section-title">Détails de l'inscription</h3>
          ${data.formations ? `<p><strong>Formations:</strong> ${data.formations}</p>` : ''}
          ${data.session ? `<p><strong>Session:</strong> ${data.session}</p>` : ''}
          ${data.payment_method ? `<p><strong>Méthode de paiement:</strong> ${data.payment_method}</p>` : ''}
          ${data.total ? `<p><strong>Montant:</strong> ${data.total}</p>` : ''}
        </div>
        
        <div class="footer">
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
    </body>
    </html>
  `;
}

function buildEmailTextTemplate(data) {
  return `
Nouvelle inscription BTECE
-------------------------

Informations personnelles:
- Nom complet: ${data.prenom} ${data.nom}
- Email: ${data.email}
${data.telephone ? `- Téléphone: ${data.telephone}\n` : ''}

Détails de l'inscription:
${data.formations ? `- Formations: ${data.formations}\n` : ''}
${data.session ? `- Session: ${data.session}\n` : ''}
${data.payment_method ? `- Méthode de paiement: ${data.payment_method}\n` : ''}
${data.total ? `- Montant: ${data.total}\n` : ''}

Date: ${new Date().toLocaleString('fr-FR')}
  `;
}