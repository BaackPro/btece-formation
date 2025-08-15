
// netlify/functions/get-submissions.js
const { Client } = require('@notionhq/client');
const { parse } = require('csv-parse/sync');
const { stringify } = require('csv-stringify/sync');

// Initialiser le client Notion (si vous utilisez Notion comme base de données)
// Si vous utilisez les formulaires Netlify natifs, vous n'en aurez pas besoin
const notion = new Client({ auth: process.env.NOTION_API_KEY });

exports.handler = async function(event, context) {
  try {
    // Option 1: Si vous utilisez les formulaires Netlify natifs
    const netlifyForms = await getNetlifyFormSubmissions();
    
    // Option 2: Si vous utilisez Notion comme base de données
    // const notionData = await getNotionSubmissions();
    
    // Convertir les données en CSV
    const csvData = convertToCSV(netlifyForms);
    
    return {
      statusCode: 200,
      body: JSON.stringify(csvData),
      headers: {
        'Content-Type': 'application/json'
      }
    };
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch submissions' })
    };
  }
};

// Fonction pour récupérer les soumissions des formulaires Netlify
async function getNetlifyFormSubmissions() {
  // Vous aurez besoin de l'ID de votre formulaire Netlify
  const formId = process.env.NETLIFY_FORM_ID;
  const siteId = process.env.SITE_ID;
  
  const response = await fetch(`https://api.netlify.com/api/v1/sites/${siteId}/forms/${formId}/submissions`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.NETLIFY_ACCESS_TOKEN}`
    }
  });
  
  if (!response.ok) {
    throw new Error(`Netlify API error: ${response.status}`);
  }
  
  const data = await response.json();
  
  // Transformer les données dans un format plus simple
  return data.map(submission => {
    const result = {
      id: submission.id,
      created_at: submission.created_at,
      // Ajoutez ici tous les champs de votre formulaire
      nom: submission.data.nom,
      prenom: submission.data.prenom,
      email: submission.data.email,
      telephone: submission.data.telephone,
      formations: submission.data['formations[]'].join(', '),
      session: submission.data.session,
      mode_formation: submission.data['mode-formation'],
      payment_method: submission.data.payment_method
    };
    
    return result;
  });
}

// Fonction pour récupérer les données depuis Notion (optionnel)
async function getNotionSubmissions() {
  const databaseId = process.env.NOTION_DATABASE_ID;
  
  const response = await notion.databases.query({
    database_id: databaseId,
    sorts: [
      {
        property: 'Date',
        direction: 'descending'
      }
    ]
  });
  
  return response.results.map(page => {
    return {
      id: page.id,
      created_at: page.properties.Date?.date?.start || '',
      nom: page.properties.Nom?.title[0]?.plain_text || '',
      prenom: page.properties.Prénom?.rich_text[0]?.plain_text || '',
      email: page.properties.Email?.email || '',
      telephone: page.properties.Téléphone?.phone_number || '',
      formations: page.properties.Formations?.multi_select?.map(f => f.name).join(', ') || '',
      session: page.properties.Session?.select?.name || '',
      mode_formation: page.properties['Mode de formation']?.select?.name || '',
      payment_method: page.properties['Méthode de paiement']?.select?.name || ''
    };
  });
}

// Fonction pour convertir les données en CSV
function convertToCSV(data) {
  if (data.length === 0) return '';
  
  // Créer les en-têtes CSV
  const headers = Object.keys(data[0]);
  
  // Créer les lignes de données
  const rows = data.map(item => {
    return headers.map(header => {
      // Échapper les guillemets dans les valeurs
      let value = item[header] || '';
      if (typeof value === 'string') {
        value = value.replace(/"/g, '""');
        if (value.includes(',') || value.includes('\n') || value.includes('"')) {
          value = `"${value}"`;
        }
      }
      return value;
    });
  });
  
  // Convertir en chaîne CSV
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');
  
  return csvContent;
}