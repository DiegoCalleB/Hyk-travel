const fs = require('fs');
async function fetchSheet() {
  const url = "https://docs.google.com/spreadsheets/d/1vpv9B-sArPC77_Oxa6SU5nPEhCDQCJG3AGjfdvO8RMo/export?format=csv";
  const response = await fetch(url);
  const text = await response.text();
  console.log("HEADERS:", text.split('\n')[0]);
  console.log("FIRST ROW:", text.split('\n')[1]);
}
fetchSheet();
