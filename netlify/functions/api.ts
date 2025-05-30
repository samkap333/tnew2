import { Handler } from '@netlify/functions';
import express from 'express';
import serverless from 'serverless-http';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { insertBookingSchema } from '../../shared/schema';
import { z } from 'zod';

const app = express();
app.use(express.json());

// Save to Google Sheets endpoint
app.post('/save-to-sheets', async (req, res) => {
  try {
    const validatedData = insertBookingSchema.parse(req.body);
    
    // Initialize Google Sheets
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID!, serviceAccountAuth);
    await doc.loadInfo();
    
    const sheet = doc.sheetsByIndex[0];
    
    await sheet.addRow({
      'Business Description': validatedData.businessDescription,
      'Business Years': validatedData.businessYears,
      'Annual Revenue': validatedData.annualRevenue,
      'Name': validatedData.name,
      'Phone': validatedData.phone,
      'Email': validatedData.email,
      'Biggest Challenge': validatedData.biggestChallenge,
      'Open to Contact': validatedData.openToContact ? 'Yes' : 'No',
      'Submitted At': new Date().toISOString(),
    });

    res.json({ success: true, message: "Data saved successfully" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ 
        success: false, 
        message: "Validation error", 
        errors: error.errors 
      });
    } else {
      console.error("Error saving to Google Sheets:", error);
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  }
});

export const handler: Handler = serverless(app);
