const { GoogleSpreadsheet } = require("google-spreadsheet")
const { JWT } = require("google-auth-library")

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  }

  // Handle preflight OPTIONS request
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    }
  }

  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    }
  }

  try {
    // Parse the request body
    const data = JSON.parse(event.body)
    const { fullName, email, phoneNumber, identity, revenue } = data

    console.log("Received form data:", data)

    // Check qualification criteria
    const unqualifiedIdentities = ["working-professional", "student-fresher"]
    const unqualifiedRevenue = ["less-than-10"]

    const isQualified = !unqualifiedIdentities.includes(identity) && !unqualifiedRevenue.includes(revenue)

    console.log("User qualified:", isQualified)

    // Only save data if user is qualified
    if (!isQualified) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          qualified: false,
          message: "User not qualified - data not saved",
        }),
      }
    }

    // Google Sheets configuration
    const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID
    const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
    const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n")

    console.log("Environment check:", {
      hasSpreadsheetId: !!SPREADSHEET_ID,
      hasEmail: !!GOOGLE_SERVICE_ACCOUNT_EMAIL,
      hasKey: !!GOOGLE_PRIVATE_KEY,
    })

    if (!SPREADSHEET_ID || !GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY) {
      throw new Error("Missing Google Sheets configuration")
    }

    // Create JWT auth
    const serviceAccountAuth = new JWT({
      email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: GOOGLE_PRIVATE_KEY,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    })

    // Initialize Google Sheets document
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth)

    // Load document info
    await doc.loadInfo()
    console.log("Connected to Google Sheet:", doc.title)

    // Get the first sheet (or create one if it doesn't exist)
    let sheet = doc.sheetsByIndex[0]
    if (!sheet) {
      sheet = await doc.addSheet({ title: "Form Submissions" })
      console.log("Created new sheet")
    }

    // Load headers
    await sheet.loadHeaderRow()

    // Set headers if the sheet is empty
    if (!sheet.headerValues || sheet.headerValues.length === 0) {
      await sheet.setHeaderRow(["Timestamp", "Full Name", "Email", "Phone Number", "Identity", "Revenue", "Status"])
      console.log("Set header row")
    }

    // Add the data to the sheet
    const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
    const rowData = {
      Timestamp: timestamp,
      "Full Name": fullName,
      Email: email,
      "Phone Number": phoneNumber,
      Identity: identity,
      Revenue: revenue,
      Status: "Qualified",
    }

    console.log("Adding row data:", rowData)
    await sheet.addRow(rowData)
    console.log("Row added successfully")

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        qualified: true,
        message: "Data saved successfully",
      }),
    }
  } catch (error) {
    console.error("Error details:", {
      message: error.message,
      stack: error.stack,
      name: error.name,
    })

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Internal server error",
        message: error.message,
      }),
    }
  }
}