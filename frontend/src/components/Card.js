import React from "react";

export const Card = ({ children }) => (
  <div className="border p-4 rounded-lg shadow-md">{children}</div>
);

export const CardContent = ({ children }) => <div>{children}</div>;
