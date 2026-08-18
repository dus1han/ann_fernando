/**
 * Google Apps Script — receives enquiries from annfernando.com and appends
 * them to this spreadsheet.
 *
 * This file is NOT part of the Next.js build. It is a copy of what runs inside
 * Google, kept in the repo so the two cannot silently drift apart. Editing it
 * here changes nothing until it is pasted back into the Apps Script editor and
 * re-deployed.
 *
 * SETUP — see the "Google Sheet" section of README.md for the full walkthrough.
 *
 * ⚠ SECRET must match LEAD_WEBHOOK_SECRET in Vercel. A web app deployed with
 * "Anyone" access is callable by the whole internet; this shared secret is the
 * only thing standing between Ann's sheet and whoever finds the URL. Change
 * both values together, or writes stop silently.
 *
 * The placeholder below stays a placeholder IN THIS REPO on purpose. The real
 * secret lives in exactly two places: the Apps Script editor and the Vercel
 * environment variable. Do not paste it here and do not commit it.
 */

var SECRET = 'CHANGE_ME_TO_A_LONG_RANDOM_STRING';
var SHEET_NAME = 'Leads';

var HEADERS = [
  'Received', 'Name', 'Phone', 'Email',
  'Interest', 'Budget', 'Message', 'Page', 'Referrer'
];

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    if (data.secret !== SECRET) {
      return json({ ok: false, error: 'bad secret' });
    }

    var sheet = getSheet();

    sheet.appendRow([
      new Date(),
      data.name || '',
      // Leading apostrophe stops Sheets mangling "+971 50 883 6296" into a
      // number or a formula. Without it a leading + is read as an expression.
      "'" + (data.phone || ''),
      data.email || '',
      data.interest || '',
      data.budget || '',
      data.message || '',
      data.page || '',
      data.referrer || ''
    ]);

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

/** Creates the tab and header row on first use, so setup is one less step. */
function getSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Run this once from the Apps Script editor to check the sheet writes before
 * wiring up the website. A row should appear within a second or two.
 */
function testAppend() {
  doPost({
    postData: {
      contents: JSON.stringify({
        secret: SECRET,
        name: 'Test Row',
        phone: '+971 50 000 0000',
        email: 'test@example.com',
        interest: 'Golden Visa',
        budget: 'AED 2M - 5M',
        message: 'Delete this row.',
        page: '/',
        referrer: 'apps-script-test'
      })
    }
  });
}
