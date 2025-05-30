import React from "react";

export const Input = ({ type, value, onChange, placeholder }) => (
  <input
    className="border p-2 w-full rounded"
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
  />
);
