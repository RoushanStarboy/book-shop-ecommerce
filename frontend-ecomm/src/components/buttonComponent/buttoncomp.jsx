// ButtonComponent.jsx
import React from 'react';
import "./buttoncomp.css";
const ButtonComponent = ({ onClick, label }) => (
  <button onClick={onClick} className="fixed-button">
    {label}
  </button>
);

export default ButtonComponent;
