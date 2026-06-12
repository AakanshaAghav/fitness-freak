const express = require('express');
const router = express.Router();
const FitnessData = require('../models/FitnessData');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

// Save or Update Fitness Data (Upsert)
router.post('/save-fitness-data', async (req, res) => {
  const { email, date, steps, heartRate, calories, weight, spo2, sleepQuality, sugarStatus, bpStatus, cholesterol, activityLevel } = req.body;
  try {
    await FitnessData.updateOne(
      { email, date },
      { $set: { steps, heartRate, calories, weight, spo2, sleepQuality, sugarStatus, bpStatus, cholesterol, activityLevel } },
      { upsert: true }
    );
    res.status(200).json({ message: "Fitness data saved or updated successfully!" });
  } catch (error) {
    console.error("❌ Error saving fitness data:", error.message, error.errors || '');
    res.status(500).json({ message: "Internal server error", detail: error.message });
  }
});

// Generate AI-Powered Personalized Diet Plan
router.get('/generate-diet-plan/:email', async (req, res) => {
  const { email } = req.params;
  try {
    const today = new Date();
    const localDate = new Date(today.getTime() + (5.5 * 60 * 60 * 1000)); // IST offset
    const fromDate = new Date(localDate.setDate(localDate.getDate() - 6)).toISOString().split("T")[0];

    const data = await FitnessData.find({ email, date: { $gte: fromDate } }).sort({ date: -1 });

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "No fitness data found for the last 7 days." });
    }

    let totalSteps = 0, totalCalories = 0, totalHeartRate = 0, weights = [];
    data.forEach(day => {
      totalSteps += day.steps || 0;
      totalCalories += day.calories || 0;
      totalHeartRate += day.heartRate || 0;
      weights.push(day.weight || 0);
    });

    const avgSteps = (totalSteps / data.length).toFixed(0);
    const avgCalories = (totalCalories / data.length).toFixed(0);
    const avgHeartRate = (totalHeartRate / data.length).toFixed(1);
    const weightChange = (weights[0] - weights[weights.length - 1]).toFixed(1);
    const latest = data[0];

    const prompt = `
You are a certified nutritionist and fitness coach. Based on the following real health data from the past 7 days, generate a highly personalized diet plan.

User Health Summary:
- Average daily steps: ${avgSteps}
- Average daily calories burned: ${avgCalories} kcal
- Average heart rate: ${avgHeartRate} bpm
- Weight change over 7 days: ${weightChange} kg (positive = loss, negative = gain)
- Latest SpO2: ${latest.spo2 || 'N/A'} %
- Latest sleep quality: ${latest.sleepQuality || 'N/A'}
- Sugar status: ${latest.sugarStatus || 'N/A'}
- Blood pressure: ${latest.bpStatus || 'N/A'}
- Cholesterol: ${latest.cholesterol || 'N/A'}
- Activity level: ${latest.activityLevel || 'N/A'}

Instructions:
- Generate exactly 10 specific, actionable diet and nutrition recommendations
- Each tip must directly reference the user's actual data values
- Include specific foods, meal timings, portion sizes, and nutrients where relevant
- Address any health concerns (high BP, sugar, cholesterol, low SpO2, poor sleep) with targeted food advice
- Keep each tip to 1-2 sentences
- Return ONLY a valid JSON array of 10 strings, no markdown, no extra text
- Format: ["Tip 1.", "Tip 2.", ...]
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();

    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) throw new Error("Invalid AI response format");

    const dietPlan = JSON.parse(jsonMatch[0]);
    return res.status(200).json({ dietPlan });

  } catch (error) {
    console.error("❌ Error generating diet plan:", error.message);
    res.status(500).json({ message: "Failed to generate diet plan. Please try again." });
  }
});

// Get Fitness History for the Last 7 Days
router.get('/get-fitness-history/:email', async (req, res) => {
  const { email } = req.params;
  try {
    const today = new Date();
    const localDate = new Date(today.getTime() + (5.5 * 60 * 60 * 1000));
    const fromDate = new Date(localDate.setDate(localDate.getDate() - 6)).toISOString().split("T")[0];

    const history = await FitnessData.find({ email, date: { $gte: fromDate } }).sort({ date: 1 });

    if (!history.length) {
      return res.status(404).json({ message: "No data found." });
    }
    res.status(200).json({ history });
  } catch (error) {
    console.error("❌ Error fetching fitness history:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
