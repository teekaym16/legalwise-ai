/**
 * AWS Bedrock Integration for LegalWise AI
 * Author: Takatso Martin
 * Support: https://paystack.shop/pay/e-qp72-foq
 */

const { BedrockRuntimeClient, InvokeModelCommand } = require('@aws-sdk/client-bedrock-runtime');

// Initialize Bedrock client
const client = new BedrockRuntimeClient({ 
  region: process.env.AWS_REGION || 'us-east-1'
});

async function analyzeWithBedrock(text, country) {
  const prompt = `You are a legal assistant specializing in ${country} law. Analyze this legal document and provide a comprehensive breakdown.

Document text:
---
${text}
---

Please respond with a JSON object in exactly this format:
{
  "summary": "Brief overall summary of the document",
  "clauses": [
    {
      "title": "Clause name or section",
      "summary": "What this clause means in plain language",
      "risk": "Low|Medium|High",
      "questions": ["Specific question about this clause", "Another relevant question"]
    }
  ]
}

Focus on identifying key legal provisions, potential risks, obligations, and areas that might need clarification. Ensure all risk levels are either "Low", "Medium", or "High".`;

  try {
    const command = new InvokeModelCommand({
      modelId: process.env.BEDROCK_MODEL_ID || 'anthropic.claude-v2',
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify({
        prompt: `\n\nHuman: ${prompt}\n\nAssistant:`,
        max_tokens_to_sample: 2048,
        temperature: 0.3,
        top_p: 1,
        stop_sequences: ["\n\nHuman:"]
      })
    });

    console.log('Sending request to Bedrock...');
    const response = await client.send(command);
    
    const responseBody = new TextDecoder().decode(response.body);
    const parsedResponse = JSON.parse(responseBody);
    
    console.log('Bedrock response received');
    
    // Extract the completion text
    let completionText = parsedResponse.completion;
    
    // Clean up the response text
    completionText = completionText.trim();
    
    // Try to extract JSON from the response
    let jsonMatch = completionText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      completionText = jsonMatch[0];
    }
    
    // Parse the JSON response
    const analysis = JSON.parse(completionText);
    
    // Validate the response structure
    if (!analysis.summary || !Array.isArray(analysis.clauses)) {
      throw new Error('Invalid response format from AI model');
    }
    
    // Ensure all clauses have required fields
    analysis.clauses = analysis.clauses.map(clause => ({
      title: clause.title || 'Untitled Clause',
      summary: clause.summary || 'No summary available',
      risk: ['Low', 'Medium', 'High'].includes(clause.risk) ? clause.risk : 'Medium',
      questions: Array.isArray(clause.questions) ? clause.questions : []
    }));
    
    return analysis;
    
  } catch (error) {
    console.error('Bedrock analysis error:', error);
    
    // Return a fallback response
    return {
      summary: "Unable to analyze document due to technical issues. Please try again.",
      clauses: [{
        title: "Analysis Error",
        summary: "The AI service encountered an error while processing your document.",
        risk: "High",
        questions: [
          "Please check your AWS credentials and Bedrock configuration",
          "Ensure the document is readable and contains legal text"
        ]
      }]
    };
  }
}

module.exports = analyzeWithBedrock;