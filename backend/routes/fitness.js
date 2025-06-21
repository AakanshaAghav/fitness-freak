const express = require('express');
const router = express.Router();
const FitnessData = require('../models/FitnessData');

// Save or Update Fitness Data (Upsert)
router.post('/save-fitness-data', async (req, res) => {
  const {
    email,
    date,
    steps,
    heartRate,
    calories,
    weight,
    spo2,
    sleepQuality,
    sugarStatus,
    bpStatus,
    cholesterol,
    activityLevel
  } = req.body;

  try {
    const result = await FitnessData.updateOne(
      { email, date },
      {
        $set: {
          steps,
          heartRate,
          calories,
          weight,
          spo2,
          sleepQuality,
          sugarStatus,
          bpStatus,
          cholesterol,
          activityLevel
        }
      },
      { upsert: true }
    );

    console.log("✅ Upsert result:", result);
    res.status(200).json({ message: "Fitness data saved or updated successfully!" });

  } catch (error) {
    console.error("❌ Error saving fitness data:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Generate Personalized Diet Plan Based on Last 7 Days
// Generate Personalized Diet Plan Based on Last 7 Days
router.get('/generate-diet-plan/:email', async (req, res) => {
  const { email } = req.params;

  try {
    const today = new Date();
    const fromDate = new Date(today.setDate(today.getDate() - 6))
      .toISOString()
      .split("T")[0];

    const data = await FitnessData.find({
      email,
      date: { $gte: fromDate }
    }).sort({ date: -1 });

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "No fitness data found for the last 7 days." });
    }

    // Analyze data
    let totalSteps = 0, totalCalories = 0, totalHeartRate = 0;
    let weights = [], lastDay = data[0];

    data.forEach(day => {
      totalSteps += day.steps || 0;
      totalCalories += day.calories || 0;
      totalHeartRate += day.heartRate || 0;
      weights.push(day.weight || 0);
    });

    const avgSteps = totalSteps / data.length;
    const avgCalories = totalCalories / data.length;
    const avgHeartRate = totalHeartRate / data.length;
    const weightChange = weights[weights.length - 1] - weights[0];

    // Personalized advice pool
    let relevantTips = [];

    if (avgSteps < 5000 || lastDay.activityLevel === "Sedentary") {
      relevantTips.push("Increase physical activity. Start daily 30-minute walks.");
    }

    if (lastDay.sugarStatus === "Diabetic" || lastDay.sugarStatus === "Prediabetic") {
      relevantTips.push("Eat low-GI foods: oats, quinoa, leafy greens. Avoid sugary drinks.");
    }

    if (lastDay.bpStatus?.includes("Hypertension")) {
      relevantTips.push("Reduce salt intake. Eat potassium-rich foods like bananas and spinach.");
    }

    if (lastDay.cholesterol === "High" || lastDay.cholesterol === "Very High") {
      relevantTips.push("Avoid fried foods. Include oats, nuts, and fatty fish in meals.");
    }

    if (avgCalories > 1800 && weightChange > 0.3) {
      relevantTips.push("Create a slight caloric deficit. Focus on high-fiber, low-calorie foods.");
    }

    if (lastDay.sleepQuality === "Poor" || lastDay.sleepQuality === "Very Poor") {
      relevantTips.push("Consume magnesium-rich foods. Avoid caffeine and late-night snacks.");
    }

    // Filler health tips
    const fillerTips = [
      "Drink at least 2.5 liters of water daily.",
      "Include more fiber: apples, lentils, brown rice.",
      "Avoid late-night meals. Eat 2-3 hours before sleep.",
      "Limit processed foods and sugary snacks.",
      "Ensure 7-8 hours of quality sleep daily.",
      "Add healthy fats: nuts, olive oil, seeds.",
      "Practice mindful eating to avoid overeating.",
      "Do 5 minutes of stretching in the morning.",
      "Replace refined grains with whole grains.",
      "Avoid trans fats. Check labels on packaged food.",
    ];

    // Helper: shuffle array
    const shuffleArray = (arr) => arr.sort(() => 0.5 - Math.random());

    // Shuffle both relevant and filler tips
    relevantTips = shuffleArray(relevantTips);
    const shuffledFiller = shuffleArray(fillerTips);

    // Fill tips to ensure minimum of 8 unique suggestions
    const dietPlan = [...relevantTips];

    for (let tip of shuffledFiller) {
      if (dietPlan.length >= 8) break;
      if (!dietPlan.includes(tip)) {
        dietPlan.push(tip);
      }
    }

    // If still less than 8, repeat random filler tips
    while (dietPlan.length < 8) {
      const randomTip = fillerTips[Math.floor(Math.random() * fillerTips.length)];
      if (!dietPlan.includes(randomTip)) dietPlan.push(randomTip);
    }

    return res.status(200).json({ dietPlan });

  } catch (error) {
    console.error("❌ Error generating diet plan:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get Fitness History for the Last 7 Days
router.get('/get-fitness-history/:email', async (req, res) => {
  const { email } = req.params;

  try {
    const today = new Date();
    const fromDate = new Date(today.setDate(today.getDate() - 6))
      .toISOString()
      .split("T")[0];

    const history = await FitnessData.find({
      email,
      date: { $gte: fromDate }
    }).sort({ date: 1 }); // ascending for easier graph plotting

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
