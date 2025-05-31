/**
 * LegalWise AI - Smart Legal Document Analyzer
 * --------------------------------------------------------
 * Author: Takatso Martin
 * GitHub: https://github.com/teekaym16/legalwise-ai
 * LinkedIn: https://www.linkedin.com/in/takatso-martin-5521b8185/
 * Support: https://paystack.shop/pay/e-qp72-foq
 */

require('dotenv').config();
const express = require('express');
const path = require('path');
const analyzeRoute = require('./routes/analyze');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api/analyze', analyzeRoute);

// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`LegalWise AI server running on http://localhost:${PORT}`);
});