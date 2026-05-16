const fs = require('fs');
async function fetchSheet() {
  const url = "https://docs.google.com/spreadsheets/d/1vpv9B-sArPC77_Oxa6SU5nPEhCDQCJG3AGjfdvO8RMo/export?format=csv";
  const response = await fetch(url);
  const text = await response.text();
  const headers = text.split('\n')[0].split(',');
  console.log("Header 0:", headers[0], "Length:", headers[0].length);
  for(let i=0; i<headers[0].length; i++) {
     console.log(headers[0].charCodeAt(i));
  }
}
fetchSheet();
