import React, { useState, useEffect, useRef } from "react";
import "./WorkoutTrack.css";
import Chart from "chart.js/auto";

const Workout = () => {
  const [workouts, setWorkouts] = useState([]);
  const [workoutName, setWorkoutName] = useState("");
  const [caloriesBurned, setCaloriesBurned] = useState("");
  const [totalCalories, setTotalCalories] = useState(0);
  const chartRef = React.useRef(null);
  let caloriesChart = null;

  useEffect(() => {
    const storedWorkouts = localStorage.getItem("workouts");
    if (storedWorkouts) {
      setWorkouts(JSON.parse(storedWorkouts));
    }
  }, []);

  useEffect(() => {
    updateTotalCalories();
    saveWorkouts();
    updateChart();
  }, [workouts]);

  const saveWorkouts = () => {
    localStorage.setItem("workouts", JSON.stringify(workouts));
  };

  const addWorkout = (e) => {
    e.preventDefault();
    if (workoutName.trim() === "" || isNaN(caloriesBurned) || caloriesBurned <= 0) {
      alert("Please enter valid workout details.");
      return;
    }

    const newWorkout = {
      id: Date.now(),
      name: workoutName,
      calories: parseInt(caloriesBurned, 10),
    };

    setWorkouts([...workouts, newWorkout]);
    setWorkoutName("");
    setCaloriesBurned("");
  };

  const deleteWorkout = (id) => {
    setWorkouts(workouts.filter((workout) => workout.id !== id));
  };

  const updateTotalCalories = () => {
    setTotalCalories(workouts.reduce((total, workout) => total + workout.calories, 0));
  };

  const chartInstanceRef = useRef(null);

const updateChart = () => {
  if (chartRef.current) {
    // Destroy the existing chart before creating a new one
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(chartRef.current, {
      type: "bar",
      data: {
        labels: workouts.map((workout) => workout.name),
        datasets: [
          {
            label: "Calories Burned",
            data: workouts.map((workout) => workout.calories),
            backgroundColor: "rgba(39, 174, 96, 0.6)",
            borderColor: "rgba(39, 174, 96, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: { title: { display: true, text: "Workout" } },
          y: { beginAtZero: true, title: { display: true, text: "Calories Burned" } },
        },
      },
    });
  }
};


  return (
    <div className="workout-container">
      <header>
        <h1>Fitness Tracker</h1>
        <p>Track your workouts and calories burned</p>
      </header>

      <section className="input-section">
        <h2>Add Workout</h2>
        <form onSubmit={addWorkout}>
          <input
            type="text"
            placeholder="Workout Name"
            value={workoutName}
            onChange={(e) => setWorkoutName(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Calories Burned"
            value={caloriesBurned}
            onChange={(e) => setCaloriesBurned(e.target.value)}
            required
            min="1"
          />
          <button type="submit">Add Workout</button>
        </form>
        <div className="total-calories">
          <h3>Total Calories Burned: <span>{totalCalories}</span></h3>
        </div>
      </section>

      <section className="workout-list">
        <h2>Your Workouts</h2>
        <ul>
          {workouts.map((workout) => (
            <li key={workout.id}>
              <span>{workout.name}</span>
              <span>{workout.calories} Calories</span>
              <button className="delete-btn" onClick={() => deleteWorkout(workout.id)}>&times;</button>
            </li>
          ))}
        </ul>
      </section>

      <section className="chart-section">
        <h2>Calories Burned Chart</h2>
        <canvas ref={chartRef}></canvas>
      </section>
    </div>
  );
};

export default Workout;
