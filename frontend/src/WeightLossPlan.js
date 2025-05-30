import React, { useState } from "react";

const weightLossPlans = {
  "Day 1": `
🌅 Morning:
- Warm lemon water.
- Light stretching for 10 mins.
- Breakfast: Oats with chia seeds, almonds, and banana.

🍱 Lunch:
- 1 cup brown rice, 1 cup moong dal, salad with cucumber and carrots.

🥗 Evening:
- Green tea and 1 fruit (apple/orange).

🌙 Dinner:
- Grilled paneer with sautéed vegetables.
- Warm turmeric milk (optional).
`,
  "Day 2": `
🌅 Morning:
- Cumin water on an empty stomach.
- 10 min brisk walk.
- Breakfast: Poha with peas and lemon, 1 boiled egg (optional).

🍱 Lunch:
- Multigrain roti with palak sabzi, salad.

🥗 Evening:
- Buttermilk and a handful of nuts.

🌙 Dinner:
- Vegetable soup and roasted chana.
`,
  "Day 3": `
🌅 Morning:
- Apple cider vinegar in warm water.
- 15 mins of yoga.
- Breakfast: Vegetable upma with sprouts.

🍱 Lunch:
- Quinoa pulao with mixed vegetables.

🥗 Evening:
- Green tea and a small bowl of papaya.

🌙 Dinner:
- Moong dal cheela with mint chutney.
`,
'Day 4': `
    🌅 Morning:
    - Warm water with cinnamon.
    - 10-minute jog or walk.
    - Breakfast: 2 boiled eggs, 1 whole wheat toast, green tea.

    🍱 Lunch:
    - Bajra roti with baingan bharta, cucumber salad.

    🥗 Evening:
    - Coconut water and roasted seeds.

    🌙 Dinner:
    - Vegetable stew with 1 multigrain roti.
  `,
  'Day 5': `
    🌅 Morning:
    - Detox water (mint + lemon + cucumber).
    - 15 mins of jump rope or brisk walk.
    - Breakfast: Besan chilla with curd.

    🍱 Lunch:
    - 1 cup rice, rajma curry, and mixed salad.

    🥗 Evening:
    - Herbal tea and 2 dates.

    🌙 Dinner:
    - Paneer tikka with green chutney.
  `,
  'Day 6': `
    🌅 Morning:
    - Warm turmeric water.
    - Sun salutation (Surya Namaskar).
    - Breakfast: Smoothie (banana, spinach, almond milk).

    🍱 Lunch:
    - Chapati with bottle gourd curry, beetroot salad.

    🥗 Evening:
    - Lemon tea and a handful of peanuts.

    🌙 Dinner:
    - Khichdi with curd.
  `,
  'Day 7': `
    🌅 Morning:
    - Fennel seed water.
    - 20 minutes walk.
    - Breakfast: Idli with sambhar.

    🍱 Lunch:
    - Brown rice with spinach dal and salad.

    🥗 Evening:
    - Fruit salad with flax seeds.

    🌙 Dinner:
    - Mix veg soup with whole grain toast.
  `,
  'Day 8': `
    🌅 Morning:
    - Lemon and honey water.
    - Yoga or cycling.
    - Breakfast: Stuffed roti (methi or palak) with curd.

    🍱 Lunch:
    - Mixed vegetable curry, 2 rotis, salad.

    🥗 Evening:
    - Green tea and roasted fox nuts (makhana).

    🌙 Dinner:
    - Sautéed tofu with broccoli.
  `,
  'Day 9': `
    🌅 Morning:
    - Ginger water.
    - Stretching + breathing exercises.
    - Breakfast: Dhokla with coriander chutney.

    🍱 Lunch:
    - Dal tadka, jeera rice, onion salad.

    🥗 Evening:
    - Amla juice and walnuts.

    🌙 Dinner:
    - Stuffed capsicum and chapati.
  `,
  'Day 10': `
    🌅 Morning:
    - Cumin + ajwain water.
    - Skipping or brisk walk.
    - Breakfast: Fruit bowl with chia pudding.

    🍱 Lunch:
    - Roti with bhindi sabzi and salad.

    🥗 Evening:
    - Herbal tea and puffed rice.

    🌙 Dinner:
    - Veg oats khichdi.
  `,
  'Day 11': `
    🌅 Morning:
    - Warm lemon water.
    - Light yoga.
    - Breakfast: Boiled chana with chopped veggies.

    🍱 Lunch:
    - Tofu stir-fry with brown rice.

    🥗 Evening:
    - Buttermilk and apple.

    🌙 Dinner:
    - Cabbage soup with roasted tofu.
  `,
  'Day 12': `
    🌅 Morning:
    - Fenugreek seed water.
    - Walk for 30 mins.
    - Breakfast: Smoothie bowl with seeds.

    🍱 Lunch:
    - Multigrain roti with mixed dal and salad.

    🥗 Evening:
    - Green tea and fruit.

    🌙 Dinner:
    - Grilled vegetables and paneer.
  `,
  'Day 13': `
    🌅 Morning:
    - Ajwain + lemon water.
    - Brisk walk.
    - Breakfast: Upma with mixed veggies.

    🍱 Lunch:
    - Rice + sambar + carrot salad.

    🥗 Evening:
    - Amla juice and murmura.

    🌙 Dinner:
    - Moong soup and toast.
  `,
  'Day 14': `
    🌅 Morning:
    - Warm ginger water.
    - Stretching and yoga.
    - Breakfast: Masala oats.

    🍱 Lunch:
    - Bajra roti with tinda curry.

    🥗 Evening:
    - Coconut water and almonds.

    🌙 Dinner:
    - Zucchini stir-fry and 1 roti.
  `,
  'Day 15': `
    🌅 Morning:
    - Lemon water with honey.
    - Jogging.
    - Breakfast: Wheat flakes with milk.

    🍱 Lunch:
    - Rajma chawal and salad.

    🥗 Evening:
    - Herbal tea with makhana.

    🌙 Dinner:
    - Vegetable soup with toast.
  `,
  'Day 16': `
    🌅 Morning:
    - Detox water (mint + lemon).
    - Jumping jacks.
    - Breakfast: Mixed vegetable sandwich.

    🍱 Lunch:
    - Oats khichdi with salad.

    🥗 Evening:
    - Lemon tea and banana.

    🌙 Dinner:
    - Grilled mushroom and roti.
  `,
  'Day 17': `
    🌅 Morning:
    - Cinnamon water.
    - Sun salutation.
    - Breakfast: Idli with chutney.

    🍱 Lunch:
    - Chapati, moong dal and sabzi.

    🥗 Evening:
    - Green tea and handful of nuts.

    🌙 Dinner:
    - Tomato soup and stir-fried vegetables.
  `,
  'Day 18': `
    🌅 Morning:
    - Ginger tea.
    - Jogging.
    - Breakfast: Paneer sandwich.

    🍱 Lunch:
    - Rice with chole and salad.

    🥗 Evening:
    - Buttermilk and fruit.

    🌙 Dinner:
    - Sautéed vegetables and 1 roti.
  `,
  'Day 19': `
    🌅 Morning:
    - Warm water with lemon.
    - Yoga stretches.
    - Breakfast: Masala poha.

    🍱 Lunch:
    - Vegetable pulao with curd.

    🥗 Evening:
    - Green tea and chana.

    🌙 Dinner:
    - Moong dal soup and toast.
  `,
  'Day 20': `
    🌅 Morning:
    - Lemon honey water.
    - Morning walk.
    - Breakfast: Sprouts with fruit.

    🍱 Lunch:
    - Bajra roti, lauki curry and salad.

    🥗 Evening:
    - Herbal tea and peanuts.

    🌙 Dinner:
    - Grilled tofu and mixed vegetables.
  `,
  'Day 21': `
    🌅 Morning:
    - Detox drink.
    - Meditation and walk.
    - Breakfast: Smoothie with spinach, banana, almond milk.

    🍱 Lunch:
    - Roti, dal, sabzi and salad.

    🥗 Evening:
    - Fruit bowl with flaxseeds.

    🌙 Dinner:
    - Clear veg soup with roasted paneer.
  `

  // You can add plans for Day 4 to Day 21 here similarly
};

const colors = [
  "#FFEDD5", // bg-orange-100
  "#DBEAFE", // bg-blue-100
  "#FEF3C7", // bg-yellow-100
  "#CCFBF1", // bg-teal-100
  "#FCE7F3", // bg-pink-100
  "#EDE9FE", // bg-purple-100
  "#DCFCE7", // bg-green-100
  "#FEE2E2", // bg-red-100
  "#FEF3C7", // bg-amber-100
  "#E0E7FF", // bg-indigo-100
  "#CFFAFE", // bg-cyan-100
  "#ECFCCB", // bg-lime-100
  "#FFE4E6", // bg-rose-100
  "#E0F2FE", // bg-sky-100
  "#D1FAE5", // bg-emerald-100
  "#FCE7F3", // bg-fuchsia-100
  "#EDE9FE", // bg-violet-100
  "#F1F5F9", // bg-slate-100
  "#F4F4F5", // bg-zinc-100
  "#FAFAFA", // bg-stone-100
  "#FFFFFF", // white
];

const emojis = [
  "🌞", "🌊", "🍉", "🏃‍♀️", "🥗", "🚴‍♂️", "🧘", "💧", "🌴", "🕊️",
  "🧃", "🍋", "🍍", "🌅", "🧘‍♂️", "🕶️", "🍇", "🪷", "🌻", "🥥", "💪"
];

const containerStyle = {
  backgroundColor: "#DBEAFE",
  minHeight: "100vh",
  color: "#1E293B", // gray-800
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  padding: "24px",
};

const headerStyle = {
  textAlign: "center",
  marginBottom: "40px",
};

const titleStyle = {
  fontSize: "2.5rem",
  fontWeight: "700",
  color: "#2563EB", // blue-700
  marginBottom: "16px",
};

const italicTextStyle = {
  fontStyle: "italic",
  fontSize: "1.125rem",
  color: "#4B5563", // gray-600
  margin: "4px 0",
};

const mainStyle = {
  maxWidth: "768px",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
};

const sectionStyle = (bgColor) => ({
  borderRadius: "12px",
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  overflow: "hidden",
  border: "1px solid #ccc",
  backgroundColor: bgColor,
});

const buttonStyle = {
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "16px 24px",
  fontSize: "1.25rem",
  fontWeight: "600",
  color: "#374151", // gray-800
  background: "none",
  border: "none",
  cursor: "pointer",
  userSelect: "none",
};

const contentStyle = {
  padding: "16px 24px",
  borderTop: "1px solid #ddd",
  color: "#374151", // gray-700
  whiteSpace: "pre-line",
  backgroundColor: "white",
};

function DayPlan({ day, color, emoji, content }) {
  const [open, setOpen] = useState(false);

  return (
    <section style={sectionStyle(color)}>
      <button
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        style={buttonStyle}
        aria-controls={`${day}-content`}
        id={`${day}-button`}
      >
        <span>{emoji} {day}</span>
        <span style={{ fontSize: "1.25rem" }}>{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div
          id={`${day}-content`}
          role="region"
          aria-labelledby={`${day}-button`}
          style={contentStyle}
        >
          {content || "Plan not found."}
        </div>
      )}
    </section>
  );
}

export default function WeightLossPlan() {
  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <h1 style={titleStyle}>🏖️ 21-Day Weight Loss Plan</h1>
        <p style={italicTextStyle}>"Discipline is choosing between what you want now and what you want most."</p>
        <p style={italicTextStyle}>"The body achieves what the mind believes."</p>
      </header>

      <main style={mainStyle}>
        {[...Array(21)].map((_, i) => {
          const day = `Day ${i + 1}`;
          const color = colors[i % colors.length];
          const emoji = emojis[i % emojis.length];
          const content = weightLossPlans[day];
          return (
            <DayPlan
              key={day}
              day={day}
              color={color}
              emoji={emoji}
              content={content}
            />
          );
        })}
      </main>
    </div>
  );
}
