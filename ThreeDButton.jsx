import React from "react";

export default function ThreeDButton({
  children,
  type = "button",
  onClick,
  disabled = false,
  className = "",
  style = {},
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`three-d-button ${className}`}
      style={style}
    >
      {children}
    </button>
  );
}