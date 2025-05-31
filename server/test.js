require('dotenv').config();
const { BedrockRuntimeClient, InvokeModelCommand } = require('@aws-sdk/client-bedrock-runtime');

const client = new BedrockRuntimeClient({
  region: process.env.AWS_REGION
});

async function testBedrock() {
  try {
    const prompt = "\n\nHuman: Give a short summary of the South African constitution.\n\nAssistant:";
    const body = JSON.stringify({
      prompt: prompt,
      max_tokens_to_sample: 100,
      temperature: 0.5,
    });

    const command = new InvokeModelCommand({
      modelId: process.env.BEDROCK_MODEL_ID,
      contentType: "application/json",
      accept: "application/json",
      body: body
    });

    console.log("Sending test request to AWS Bedrock...");
    const response = await client.send(command);
    const decoded = new TextDecoder().decode(response.body);
    console.log("✅ Success! Bedrock response:");
    console.log(decoded);
  } catch (err) {
    console.error("❌ Failed to call Bedrock:", err.name, err.message);
  }
}

testBedrock();
