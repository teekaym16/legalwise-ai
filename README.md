# 🏛️ LegalWise AI - Legal Document Analyzer

A Node.js web application that uses AWS Bedrock (Claude AI) to analyze legal documents, providing summaries, clause breakdowns, risk assessments, and suggested questions.

## ✨ Features

- **Document Upload**: Upload PDF legal documents for analysis
- **Country-Specific Analysis**: Select jurisdiction for relevant legal context
- **AI-Powered Analysis**: Uses Anthropic Claude via AWS Bedrock
- **Comprehensive Results**: 
  - Document summary
  - Clause-by-clause breakdown
  - Risk level assessment (Low/Medium/High)
  - Suggested questions for each clause
- **Modern UI**: Clean, responsive HTML interface

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ installed
- AWS account with Bedrock access
- AWS CLI configured or environment variables set

### Installation

1. **Clone/Create the project structure:**
```bash
mkdir legalwise-ai
cd legalwise-ai
mkdir server
mkdir server/routes
mkdir server/services
mkdir server/public
mkdir server/uploads
```

2. **Create the files** using the provided code artifacts

3. **Install dependencies:**
```bash
cd server
npm install
```

4. **Configure environment variables:**
```bash
cp .env.example .env
# Edit .env with your AWS credentials
```

5. **Start the server:**
```bash
npm start
# or for development:
npm run dev
```

6. **Open your browser:**
```
http://localhost:3000
```

## 📁 Project Structure

```
legalwise-ai/
├── server/
│   ├── index.js                 # Main Express server
│   ├── package.json            # Dependencies
│   ├── routes/
│   │   └── analyze.js          # API endpoint for document analysis
│   ├── services/
│   │   ├── extractText.js      # PDF text extraction
│   │   └── bedrockPrompt.js    #