import React from "react";

const NutritionBox = () => {
  return (
    <div className="bg-orange-500 text-black p-10 md:p-16 rounded-xl flex flex-col md:flex-row items-center justify-between">
      {/* Left Section - Text */}
      <div className="md:w-1/2 text-center md:text-left">
        <h1 className="text-4xl font-bold text-gray-900">Dial up your diet</h1>
        <p className="text-gray-800 mt-4">
          See which of the essential 84 vitamins and minerals you’re getting the
          most and least of, helping you eat a more balanced diet.
        </p>
      </div>

      {/* Right Section - Image with Overlay */}
      <div className="relative md:w-1/2 mt-6 md:mt-0">
        <img
          src="https://cdn1.cronometer.com/wf-2025-03-20/images/home-card-1.png-converted.webp" // Replace with your image path
          alt="Healthy Food"
          className="rounded-lg shadow-lg w-full h-auto"
        />
        {/* Floating Nutritional Card */}
        <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg w-48">
          <div className="text-sm font-medium text-gray-800">
            <p>Protein <span className="float-right">90%</span></p>
            <div className="w-full bg-gray-200 rounded">
              <div className="bg-gray-600 h-2 rounded w-9/12"></div>
            </div>

            <p className="mt-2 text-green-600">Vitamin C <span className="float-right">100%</span></p>
            <div className="w-full bg-gray-200 rounded">
              <div className="bg-green-500 h-2 rounded w-full"></div>
            </div>

            <p className="mt-2">Magnesium <span className="float-right">63%</span></p>
            <div className="w-full bg-gray-200 rounded">
              <div className="bg-gray-500 h-2 rounded w-2/3"></div>
            </div>

            <p className="mt-2">Calcium <span className="float-right">50%</span></p>
            <div className="w-full bg-gray-200 rounded">
              <div className="bg-gray-400 h-2 rounded w-1/2"></div>
            </div>

            <p className="mt-2">Net Carbs <span className="float-right">22%</span></p>
            <div className="w-full bg-gray-200 rounded">
              <div className="bg-gray-300 h-2 rounded w-1/4"></div>
            </div>

            <p className="mt-2">Zinc <span className="float-right">75%</span></p>
            <div className="w-full bg-gray-200 rounded">
              <div className="bg-gray-500 h-2 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionBox;
