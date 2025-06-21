export const nutrition = {
  conditions: [
    {
      name: "Iron Deficiency",
      recommendedFoods: ["Spinach", "Beetroot", "Dates", "Ragi", "Jaggery", "Red meat", "Legumes", "Pumpkin seeds"],
      avoidFoods: ["Tea", "Coffee", "Calcium supplements with iron"]
    },
    {
      name: "Diabetes",
      recommendedFoods: ["Oats", "Quinoa", "Leafy Greens", "Bitter Gourd", "Chia Seeds", "Fenugreek", "Cinnamon", "Lentils"],
      avoidFoods: ["White rice", "Sugary drinks", "Refined flour", "Sweets"]
    },
    {
      name: "Thyroid",
      recommendedFoods: ["Iodized Salt", "Brazil Nuts", "Seaweed", "Eggs", "Pumpkin Seeds"],
      avoidFoods: ["Soy", "Gluten (if sensitive)", "Cruciferous vegetables raw (like cabbage, broccoli)"]
    },
    {
      name: "PCOS/PCOD",
      recommendedFoods: ["Low-GI fruits", "Flaxseeds", "Cinnamon", "Whole grains", "Green Tea"],
      avoidFoods: ["Sugar", "Dairy", "Refined carbs"]
    },
    {
      name: "Acidity",
      recommendedFoods: ["Bananas", "Cold milk", "Coconut water", "Oatmeal", "Cucumber"],
      avoidFoods: ["Spicy food", "Citrus fruits", "Soda", "Tomatoes"]
    }
  ],

  goals: {
    weightLoss: {
      tips: [
        "Eat more protein (lentils, eggs, tofu).",
        "Avoid sugar and refined carbs.",
        "Walk 30–40 minutes daily.",
        "Drink 3–4 liters of water.",
        "Intermittent fasting (if advised by doctor)."
      ],
      recommendedFoods: ["Boiled eggs", "Grilled paneer", "Moong dal", "Sprouts", "Cabbage soup", "Green tea"]
    },
    weightGain: {
      tips: [
        "Increase calorie intake with healthy fats.",
        "Eat 5–6 times a day.",
        "Drink banana milkshake or peanut butter smoothie.",
        "Include strength training exercises."
      ],
      recommendedFoods: ["Peanut butter", "Ghee", "Bananas", "Whole milk", "Paneer", "Dry fruits"]
    },
    immunity: {
      tips: [
        "Start your day with warm water + honey + lemon.",
        "Add amla and turmeric to meals.",
        "Sleep at least 7–8 hours.",
        "Exercise daily for 30 minutes."
      ],
      recommendedFoods: ["Amla", "Turmeric milk", "Citrus fruits", "Tulsi tea", "Garlic"]
    }
  },

  foodGroups: {
    proteins: ["Eggs", "Paneer", "Tofu", "Lentils", "Chickpeas", "Chicken", "Fish", "Soya chunks"],
    carbs: ["Brown rice", "Quinoa", "Sweet potatoes", "Oats", "Whole wheat chapati"],
    fats: ["Almonds", "Avocados", "Flaxseeds", "Olive oil", "Ghee (in moderation)", "Peanuts"],
    vitamins: {
      vitaminA: ["Carrots", "Sweet potatoes", "Pumpkin", "Mango"],
      vitaminC: ["Guava", "Amla", "Oranges", "Lemon", "Bell peppers"],
      vitaminD: ["Sunlight", "Fortified milk", "Mushrooms", "Egg yolk"],
      vitaminB12: ["Milk", "Paneer", "Eggs", "Animal liver", "Fortified cereals"]
    }
  },

  hydrationTips: [
    "Drink at least 8 glasses (2–3 liters) of water daily.",
    "Start your morning with a glass of warm water.",
    "Add cucumber, lemon, or mint for detox water.",
    "Avoid sugary drinks; opt for coconut water or buttermilk instead.",
    "During summer, increase intake of water-rich fruits like watermelon."
  ],

  dailyTips: [
    "Eat seasonal fruits and vegetables.",
    "Use ghee in small quantities for better digestion.",
    "Avoid eating late at night.",
    "Do not skip breakfast — make it protein-rich.",
    "Use natural herbs like ginger, turmeric, and tulsi regularly.",
    "Reduce screen time before sleeping.",
    "Eat slowly and chew properly for better digestion."
  ]
};
