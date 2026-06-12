import { motion } from "framer-motion";

const tips = [
  "Understanding Macronutrients",
  "How to Track Calories Properly",
  "The Importance of Sleep in Fitness",
  "Beginner's Guide to Heart Rate Zones",
];

export default function LearnPage() {
  return (
    <div className="p-8">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-4xl font-bold text-center mb-6"
      >
        Learn with Fitness-Freak
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tips.map((tip, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            className="bg-white border rounded-xl p-6 shadow-sm transition-all"
          >
            <h2 className="text-xl font-bold mb-2">{tip}</h2>
            <p className="text-gray-600">
              Click to learn more about <span className="italic">{tip.toLowerCase()}</span>.
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
