/**
 * LegalWise AI - Smart Legal Document Analyzer
 * --------------------------------------------------------
 * Author: Takatso Martin
 * License: MIT
 * Description: This Express route handles the file upload,
 * extracts text from PDF using a local service, and sends it to
 * AWS Bedrock for legal clause analysis and insight generation.
 * --------------------------------------------------------
 * GitHub: https://github.com/teekaym16/legalwise-ai
 * LinkedIn: https://www.linkedin.com/in/takatso-martin-5521b8185/
 * Support Me: https://paystack.shop/pay/e-qp72-foq
 */


const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const extractText = require('../services/extractText');
const analyzeWithBedrock = require('../services/bedrockPrompt');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

router.post('/', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        message: 'No file uploaded' 
      });
    }

    if (!req.body.country) {
      return res.status(400).json({ 
        success: false, 
        message: 'Country is required' 
      });
    }

    console.log('Processing file:', req.file.filename);
    console.log('Country:', req.body.country);

    // Extract text from PDF
    const text = await extractText(req.file.path);
    
    if (!text || text.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Could not extract text from PDF'
      });
    }

    // Analyze with Bedrock
    const analysis = await analyzeWithBedrock(text, req.body.country);

    // Clean up uploaded file
    fs.unlink(req.file.path, (err) => {
      if (err) console.error('Error deleting file:', err);
    });

    res.json({ 
      success: true, 
      analysis: analysis 
    });

  } catch (error) {
    console.error('Analysis error:', error);
    
    // Clean up uploaded file if it exists
    if (req.file && req.file.path) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error deleting file:', err);
      });
    }

    res.status(500).json({ 
      success: false, 
      message: error.message || 'Analysis failed' 
    });
  }
});

module.exports = router;