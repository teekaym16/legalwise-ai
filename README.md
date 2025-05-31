# 🧠 LegalWise AI (v2)

**LegalWise AI** is a simple, open-source legal document analyzer powered by **AWS Bedrock (Claude v2)**. It extracts legal insights from PDF documents, summarizes content, flags risks, and generates questions — all through a minimal Node.js and HTML frontend.

> ⚡️ Built with simplicity: No React, no Tailwind — just HTML + Node.js.

---

## 🔍 Features

- Upload **PDF legal documents**
- Choose **country** for local context (South Africa, US, UK, Nigeria, etc.)
- Extract text and **summarize** clauses using Claude AI
- Highlight **risks**, generate **questions**, and identify **key clauses**
- Fully open-source and developer-friendly

---

## 📸 Preview

Frontend - Before Analysis
![image](https://github.com/user-attachments/assets/a22287ca-40c0-4f8c-9742-227f593fe44a)

## During Document Analysis
![image](https://github.com/user-attachments/assets/db7b80eb-f67d-4be0-a765-ce82ec7c2676)

## Analysis Results
![image](https://github.com/user-attachments/assets/be4c52b4-ca1a-49a1-82fb-6785861a9a4a)

## Verdict
![image](https://github.com/user-attachments/assets/6292734b-c594-49d4-8531-95b7c69c88b4)

---

## ⚙️ Tech Stack

- **Frontend**: HTML + CSS
- **Backend**: Node.js + Express
- **AI**: AWS Bedrock (Claude v2)
- **PDF Parsing**: `pdf-parse`
- **File Uploads**: `multer`

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/teekaym16/legalwise-ai.git
cd legalwise-ai
2. Set up AWS credentials
Create a .env file in the server/ directory:

bash
Copy
Edit
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_REGION=us-east-1
BEDROCK_MODEL_ID=anthropic.claude-v2
⚠️ Claude 3.x requires different logic. This version supports claude-v2.

3. Install dependencies
bash
Copy
Edit
cd server
npm install
4. Start the server
bash
Copy
Edit
npm start
Visit http://localhost:3000

🧪 Testing Claude AI
You can test your Bedrock credentials with:

bash
Copy
Edit
node test.js
📂 Folder Structure
pgsql
Copy
Edit
legalwise-ai/
├── server/
│   ├── routes/
│   ├── services/
│   ├── uploads/
│   ├── index.js
│   ├── .env
│   ├── .gitignore
│   └── package.json
├── public/
│   └── index.html
├── LICENSE
└── README.md
🤝 Contributing
Feel free to fork and improve:

Add multi-model support

Add OCR for scanned documents

Build a dashboard to save analyses

All PRs welcome!

🙏 Support the Creator
If this tool helped you, consider buying me a coffee:

🔗 Buy Me a Coffee via Paystack

📄 License
This project is open-source under the MIT License.

👤 Author
Takatso Martin
GitHub: @teekaym16
Company: Jozi Blocks
