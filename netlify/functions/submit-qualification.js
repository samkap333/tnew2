// netlify/functions/submit-qualification.js
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');

// Helper function to map form data to readable format
function mapFormDataToReadable(formData) {
  const mappings = {
    businessType: {
      'coach-consultant': 'Coach/Consultant running own business',
      'service-based': 'Service-based business',
      'professional': 'Working professional exploring sales coaching',
      'student': 'Student/Fresher'
    },
    yearsInBusiness: {
      'less-than-1': 'Less than 1 year',
      '1-2': '1-2 years',
      '2-5': '2-5 years',
      '5-plus': '5+ years'
    },
    annualRevenue: {
      '5-10': '₹5-10 lakhs',
      '10-25': '₹10-25 lakhs',
      '25-plus': '₹25 lakhs+'
    },
    biggestChallenge: {
      'lead-qualification': 'Lead Qualification',
      'lead-nurturing': 'Lead Nurturing',
      'objection-handling': 'Objection Handling',
      'sales-closing': '1:1 Sales Closing',
      'other': 'Other'
    },
    openToContact: {
      'yes': 'Yes, open to being contacted',
      'no': 'No, not at this time'
    }
  };

  return {
    businessType: mappings.businessType[formData.businessType] || formData.businessType,
    yearsInBusiness: mappings.yearsInBusiness[formData.yearsInBusiness] || formData.yearsInBusiness,
    annualRevenue: mappings.annualRevenue[formData.annualRevenue] || formData.annualRevenue,
    biggestChallenge: mappings.biggestChallenge[formData.biggestChallenge] || formData.biggestChallenge,
    openToContact: mappings.openToContact[formData.openToContact] || formData.openToContact
  };
}

// Initialize Google Sheet headers
async function initializeSheet() {
  try {
    const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
    const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    const serviceAccountAuth = new JWT({
      email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: GOOGLE_PRIVATE_KEY,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth);
    
    await doc.loadInfo();
    console.log('Connected to Google Sheet:', doc.title);
    
    // Get or create the first sheet
    let sheet = doc.sheetsByIndex[0];
    if (!sheet) {
      sheet = await doc.addSheet({ title: 'Qualification Form Submissions' });
    }
    
    // Load the sheet to get existing headers
    await sheet.loadHeaderRow();
    
    // Define expected headers
    const expectedHeaders = [
      'Timestamp',
      'Full Name',
      'Email',
      'Phone Number',
      'Business Type',
      'Years in Business',
      'Annual Revenue',
      'Biggest Challenge',
      'Open to Contact',
      'Qualified',
      'Submitted At',
      'IP Address',
      'User Agent'
    ];
    
    // Check if headers need to be set
    if (!sheet.headerValues || sheet.headerValues.length === 0) {
      await sheet.setHeaderRow(expectedHeaders);
      console.log('Sheet headers initialized with:', expectedHeaders);
    }
    
    return sheet;
  } catch (error) {
    console.error('Error initializing Google Sheet:', error);
    throw error;
  }
}

exports.handler = async (event, context) => {
  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const formData = JSON.parse(event.body);
    
    console.log('Received form data:', formData);
    
    // Get client IP and User Agent
    const clientIP = event.headers['x-forwarded-for'] || event.headers['client-ip'] || 'Unknown';
    const userAgent = event.headers['user-agent'] || 'Unknown';
    
    // Map form data to readable format
    const readableData = mapFormDataToReadable(formData);
    
    console.log('Mapped readable data:', readableData);
    
    // Initialize sheet
    const sheet = await initializeSheet();
    
    // Prepare row data
    const rowData = {
      'Timestamp': new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      'Full Name': formData.fullName || '',
      'Email': formData.email || '',
      'Phone Number': formData.phoneNumber || '',
      'Business Type': readableData.businessType || '',
      'Years in Business': readableData.yearsInBusiness || '',
      'Annual Revenue': readableData.annualRevenue || '',
      'Biggest Challenge': readableData.biggestChallenge || '',
      'Open to Contact': readableData.openToContact || '',
      'Qualified': formData.qualified ? 'Yes' : 'No',
      'Submitted At': formData.submittedAt || new Date().toISOString(),
      'IP Address': clientIP,
      'User Agent': userAgent
    };
    
    console.log('Row data to be saved:', rowData);
    
    // Add row to sheet
    await sheet.addRow(rowData);
    
    console.log('Form submission saved to Google Sheet successfully');
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Form submitted successfully',
        qualified: formData.qualified,
        savedData: rowData
      })
    };
    
  } catch (error) {
    console.error('Error saving to Google Sheet:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        message: 'Failed to submit form',
        error: error.message
      })
    };
  }
};