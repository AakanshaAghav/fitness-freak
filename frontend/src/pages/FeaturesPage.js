import { motion } from "framer-motion";

const features = [
  {
    title: "🍽️ Smart Diet Planner",
    desc: "Creates a personalized diet plan based on your last 7 days' health data.",
  },
  {
    title: "📊 Data Visualization",
    desc: "Shows graphs of steps, heart rate, and calories from the past week.",
  },
  {
    title: "📡 Live Health Tracking",
    desc: "Monitors heartbeat, steps, and calories in real time.",
  },
  {
    title: "🤖 AI Chatbot Assistant",
    desc: "Chat anytime to get health tips and answers from our fitness bot.",
  },
];

const containerStyle = {
  minHeight: "100vh",
  padding: "50px 20px",
  backgroundColor: "#69c0b4", // ✅ solid teal background
  fontFamily: "'Segoe UI', sans-serif",
};

const headingStyle = {
  fontSize: "42px",
  fontWeight: "bold",
  textAlign: "center",
  color: "#ffffff",
  marginBottom: "50px",
  textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "30px",
  maxWidth: "1100px",
  margin: "0 auto",
};

const cardStyle = {
  backgroundColor: "#ffffff",
  borderRadius: "20px",
  padding: "30px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  textAlign: "center",
};

const titleStyle = {
  fontSize: "24px",
  fontWeight: "700",
  marginBottom: "15px",
  color: "#333",
};

const descStyle = {
  fontSize: "16px",
  color: "#555",
  lineHeight: "1.6",
};

export default function FeaturesPage() {
  return (
    <div style={containerStyle}>
      <motion.h1
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={headingStyle}
      >
        ✨ Features You’ll Love ✨
      </motion.h1>

      <div style={gridStyle}>
        {features.map((feature, index) => (
          <motion.div
            key={index}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            style={cardStyle}
          >
            <h2 style={titleStyle}>{feature.title}</h2>
            <p style={descStyle}>{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
