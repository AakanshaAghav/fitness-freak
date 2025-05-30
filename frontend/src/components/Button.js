import React from "react";

export const Button = ({ onClick, children }) => (
  <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={onClick}>
    {children}
  </button>
);
