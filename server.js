const express = require('express');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const cors = require('cors'); // Import the cors package
require('dotenv').config();

const app = express();
const port = 3000;

// Configure CORS options
const corsOptions = {
  origin: 'http://127.0.0.1:5500', // Frontend origin
  methods: ['POST'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type'], // Allowed Headers
};

// Use CORS middleware with the specified options
app.use(cors(corsOptions));

app.use(bodyParser.json());

// **Important:** Use environment variables for API keys to enhance security
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('Error: GEMINI_API_KEY is not defined in the environment variables.');
  process.exit(1); // Exit the application if API key is missing
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
  systemInstruction: `You will be given a user's symptoms and descriptions, including severity, duration, onset, associated factors, and any relevant medical history. Based on the provided information and Ontario’s medical triage guidelines, determine whether the user should visit the Emergency Room (ER) or seek care from a family doctor, walk-in clinic, or another healthcare provider. Respond with yes if the symptoms indicate a life-threatening or severe condition that requires immediate hospital intervention, such as chest pain suggestive of a heart attack (especially with radiating pain, sweating, nausea, or shortness of breath), stroke symptoms (sudden weakness, slurred speech, facial drooping), severe difficulty breathing (e.g., gasping for air, blue lips, unable to speak in full sentences), major trauma (severe head injury, deep wounds, compound fractures), seizures lasting longer than 5 minutes, severe allergic reactions (anaphylaxis), uncontrolled bleeding, or any other critical medical emergency. Additionally, if the user is very young, keep this in mind when making suggestions as depending on age, some symptoms may be more severe. Additionally, if normal symptoms persist over long periods of times, take that into account as it may be severe. Respond with no if the symptoms are non-life-threatening, stable, or better suited for primary care (such as a walk-in clinic, family doctor, or Telehealth Ontario (811)), including mild infections, minor injuries (sprains, mild burns), stable chronic condition flare-ups, mild fever in adults, minor gastrointestinal issues (such as mild nausea or diarrhea), or non-severe pain. Consider Ontario’s high ER wait times, and prioritize directing non-urgent cases to more appropriate healthcare providers to avoid unnecessary emergency visits. If symptoms suggest an urgent but not immediately life-threatening condition (such as a possible fracture, severe but stable pain, persistent vomiting or dehydration), indicate no but recommend seeking urgent care or a same-day clinic. Do not provide a medical diagnosis—only assess urgency and recommend the most appropriate level of care based on recognized medical criteria.`,
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

app.post('/evaluate', async (req, res) => {
  const userResponses = req.body;

  // Construct input for Gemini
  const input = `
    This is the user's Gender: ${userResponses.user_gender}.
    This is the user's Birthday: ${userResponses.user_birthday} so that you know their age and understand whether or not their age may impact their symptoms and affect its severity.
    This is the user's Past Known Medical Conditions: ${userResponses.medical_conditions}
    This is the user's Current Symptoms: ${userResponses.user_symptoms}
    This is how long the user has been experiencing the symptoms: ${userResponses.user_duration}
  `;

  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(input);
    const evaluation = result.response.text();

    res.json({ evaluation });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error processing your request.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});