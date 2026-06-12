import { motion } from "framer-motion";
import { FaAppleAlt, FaDumbbell, FaHeartbeat } from "react-icons/fa";

const cardStyle = {
  backgroundColor: "#fff",
  padding: "24px",
  borderRadius: "16px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  textAlign: "center",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  cursor: "pointer",
};

const iconStyle = {
  marginBottom: "16px",
};

const titleStyle = {
  fontSize: "22px",
  fontWeight: "600",
  marginBottom: "10px",
};

const descStyle = {
  color: "#555",
  fontSize: "16px",
};

const containerStyle = {
  minHeight: "100vh",
  backgroundColor: "#f3f4f6",
  padding: "40px 20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const gridStyle = {
  display: "grid",
  gap: "24px",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  width: "100%",
  maxWidth: "1100px",
};

export default function ProductsPage() {
  const products = [
    {
      title: "Nutrition Tracker",
      desc: "Track your daily intake of calories, macros, and micronutrients in one place.",
      icon: <FaAppleAlt size={40} color="#16a34a" style={iconStyle} />,
    },
    {
      title: "Workout Planner",
      desc: "Build customized workout routines with progress tracking and smart goals.",
      icon: <FaDumbbell size={40} color="#4f46e5" style={iconStyle} />,
    },
    {
      title: "Health Monitor",
      desc: "Monitor your heart rate, sleep, and other vital signs seamlessly.",
      icon: <FaHeartbeat size={40} color="#ef4444" style={iconStyle} />,
    },
  ];

  return (
    <div style={containerStyle}>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          fontSize: "36px",
          fontWeight: "bold",
          marginBottom: "40px",
          textAlign: "center",
        }}
      >
        🚀 Our Products
      </motion.h1>

      <div style={gridStyle}>
        {products.map((product, index) => (
          <motion.div
            key={index}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            style={cardStyle}
          >
            {product.icon}
            <h2 style={titleStyle}>{product.title}</h2>
            <p style={descStyle}>{product.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
