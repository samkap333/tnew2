// netlify/functions/submit-form.js
const { GoogleSpreadsheet } = require('google-spreadsheet');

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Parse the request body
    const data = JSON.parse(event.body);
    const { fullName, email, phoneNumber, identity, revenue } = data;

    // Check qualification criteria
    const unqualifiedIdentities = ['working-professional', 'student-fresher'];
    const unqualifiedRevenue = ['less-than-10'];
    
    const isQualified = !unqualifiedIdentities.includes(identity) && 
                      !unqualifiedRevenue.includes(revenue);

    // Only save data if user is qualified
    if (!isQualified) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          success: true, 
          qualified: false,
          message: 'User not qualified - data not saved' 
        }),
      };
    }

    // Google Sheets configuration
    const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID;
    const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    if (!SPREADSHEET_ID || !GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY) {
      throw new Error('Missing Google Sheets configuration');
    }

    // Initialize Google Sheets document
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

    // Authenticate with service account
    await doc.useServiceAccountAuth({
      client_email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: GOOGLE_PRIVATE_KEY,
    });

    // Load document info
    await doc.loadInfo();

    // Get the first sheet (or create one if it doesn't exist)
    let sheet = doc.sheetsByIndex[0];
    if (!sheet) {
      sheet = await doc.addSheet({ title: 'Form Submissions' });
    }

    // Set headers if the sheet is empty
    await sheet.loadHeaderRow();
    if (!sheet.headerValues || sheet.headerValues.length === 0) {
      await sheet.setHeaderRow([
        'Timestamp',
        'Full Name', 
        'Email', 
        'Phone Number', 
        'Identity', 
        'Revenue',
        'Status'
      ]);
    }

    // Add the data to the sheet
    const timestamp = new Date().toISOString();
    await sheet.addRow({
      'Timestamp': timestamp,
      'Full Name': fullName,
      'Email': email,
      'Phone Number': phoneNumber,
      'Identity': identity,
      'Revenue': revenue,
      'Status': 'Qualified'
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        qualified: true,
        message: 'Data saved successfully' 
      }),
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      }),
    };
  }
};