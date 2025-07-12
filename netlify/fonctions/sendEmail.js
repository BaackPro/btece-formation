

// netlify/functions/sendEmail.js
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = async (event) => {
    // 1. Récupère les données du formulaire
    const data = JSON.parse(event.body);
    const {
        nom,
        prenom,
        email,
        pays,
        telephone,
        profession,
        objectifs,
        formations,
        session,
        modeFormation,
        paymentMethod,
    } = data;

    // 2. Formatage des données pour l'email
    const formationsList = formations.map(f => `- ${f}`).join("<br>");
    const sessionFormatted = session.charAt(0).toUpperCase() + session.slice(1) + " 2025";
    const modeFormationFormatted = modeFormation === "presentiel" 
        ? "Présentiel à Cotonou" 
        : "En ligne (à distance)";

    // 3. Construction du contenu HTML de l'email
    const emailHtml = `
        <h1 style="color: #005387;">Merci pour votre inscription, ${prenom} !</h1>
        <p>Voici le récapitulatif de votre inscription :</p>
        
        <h3>📋 Informations personnelles</h3>
        <p><strong>Nom complet :</strong> ${prenom} ${nom}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Téléphone :</strong> +${telephone}</p>
        <p><strong>Pays :</strong> ${pays}</p>
        <p><strong>Profession :</strong> ${profession}</p>
        <p><strong>Objectifs :</strong> ${objectifs}</p>

        <h3>🎓 Formations choisies</h3>
        ${formationsList}

        <h3>🗓 Session</h3>
        <p>${sessionFormatted} (${modeFormationFormatted})</p>

        <h3>💳 Paiement</h3>
        <p>Méthode : ${paymentMethod}</p>

        <p style="margin-top: 30px;">Nous vous contacterons sous peu pour les prochaines étapes.</p>
        <p>Cordialement,<br>L'équipe <strong style="color: #0b9c4c;">BTECE</strong></p>
    `;

    // 4. Envoi de l'email via SendGrid
    const msg = {
        to: email,
        from: "no-reply@btece-formation.com", // Email vérifié chez SendGrid
        subject: "Confirmation d'inscription à BTECE",
        html: emailHtml,
    };

    try {
        await sgMail.send(msg);
        return {
            statusCode: 200,
            body: JSON.stringify({ success: true }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                error: "Erreur lors de l'envoi de l'email",
                details: error.message 
            }),
        };
    }
};