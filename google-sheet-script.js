/**
 * Google Apps Script for SkyOne International Courier
 * Automatically adds each Form Submission (Quotes & Contact inquiries) as a row in your Google Sheet / Excel.
 *
 * HOW TO SET THIS UP (Takes 2 minutes):
 * 1. Open Google Sheets (https://sheets.new)
 * 2. In Row 1, add these headers in columns A through J:
 *    [Timestamp | Type | Reference ID | Full Name | Phone | Email | Pickup Location | Destination | Shipment Type | Weight (kg) | Message]
 * 3. In the top menu, click: Extensions -> Apps Script
 * 4. Delete any code in the editor and PASTE this entire script.
 * 5. Click "Deploy" (top right blue button) -> "New deployment"
 * 6. Select type: "Web app"
 * 7. Set:
 *    - Description: "SkyOne Lead Form Webhook"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone" (important!)
 * 8. Click "Deploy", authorize access, and COPY the Web App URL.
 * 9. Paste that URL into your Vercel Environment Variables or .env as:
 *    GOOGLE_SHEET_URL=https://script.google.com/macros/s/XXXXX/exec
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    // Format IST date and time
    var dateString = Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss");

    // Append new row with all details
    sheet.appendRow([
      dateString,
      data.type || "QUOTE",
      data.referenceId || "",
      data.name || "",
      data.phone || "",
      data.email || "",
      data.pickupLocation || "-",
      data.destinationLocation || "-",
      data.shipmentType || "-",
      data.weight || "-",
      data.message || ""
    ]);

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Row added successfully"
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("SkyOne Google Sheet Webhook is active and listening for POST requests.");
}
