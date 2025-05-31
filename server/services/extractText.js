const fs = require('fs');
const pdf = require('pdf-parse');

async function extractText(filePath) {
  try {
    console.log('Extracting text from:', filePath);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      throw new Error('PDF file not found');
    }
    
    // Read the PDF file
    const buffer = fs.readFileSync(filePath);
    
    // Parse the PDF
    const data = await pdf(buffer);
    
    if (!data.text || data.text.trim().length === 0) {
      throw new Error('No text could be extracted from the PDF');
    }
    
    console.log(`Extracted ${data.text.length} characters from PDF`);
    
    // Clean up the text a bit
    const cleanText = data.text
      .replace(/\r\n/g, '\n')  // Normalize line endings
      .replace(/\n{3,}/g, '\n\n')  // Remove excessive line breaks
      .trim();
    
    return cleanText;
    
  } catch (error) {
    console.error('Text extraction error:', error);
    throw new Error(`Failed to extract text from PDF: ${error.message}`);
  }
}

module.exports = extractText;