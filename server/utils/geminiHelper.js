// server/utils/geminiHelper.js
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateInsight(textsArr) {
  const model  = genAI.getGenerativeModel({ model: 'models/gemini-1.5-flash' });

  const prompt = `
You are a compassionate mental-health journaling assistant.
Analyze the user's recent entries and give a brief, 2–3 sentence
insight on emotional trends and any notable patterns. Be kind but honest.

Entries:
${textsArr.map(t => `- ${t}`).join('\n')}
`;

  const result   = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

module.exports = { generateInsight };
