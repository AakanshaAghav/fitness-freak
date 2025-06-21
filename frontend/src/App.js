import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Workout from "./Workout";
import Homedash from "./Homedash";
import Caloricounter from "./Caloricounter";  // Updated import
import TalkAi from "./TalkAi";
import Dashboard from './pages/Dashboard';
import WeightLossDiary from "./WeightLossDiary";
import FitnessTrends from "./FitnessTrends";
import Food from "./Food";
import Support from "./Support";
import About from "./About";
import WeightLossPlan from "./WeightLossPlan";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import DietPlan from "./DietPlan";
import FitnessHistory from "./components/FitnessHistory"; // ✅ New import

function App() {
  const email = localStorage.getItem("email"); // ✅ Assuming you store it on login

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/diet-plan/:email" element={<DietPlan />} />
        <Route path="/workout" element={<Workout />} />
        <Route path="/homedash" element={<Homedash />} />
        <Route path="/caloricounter" element={<Caloricounter />} />
        <Route path="/talkai" element={<TalkAi />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/weightLossDiary" element={<WeightLossDiary />} />
        <Route path="/fitnessTrends" element={<FitnessTrends />} />
        <Route path="/food" element={<Food />} />
        <Route path="/plan" element={<WeightLossPlan />} />
        <Route path="/support" element={<Support />} />
        <Route path="/about" element={<About />} />

        {/* ✅ New Route for Fitness History */}
        <Route path="/fitness-history" element={<FitnessHistory email={email} />} />
      </Routes>
    </Router>
  );
}

export default App;
