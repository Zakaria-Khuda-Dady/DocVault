import React from "react";

const Button = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  variant = "primary",
  size = "md",
}) => {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200";

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-orange-500 to-violet-600 hover:from-orange-600 hover:to-violet-700 text-white disabled:opacity-50 shadow-md hover:shadow-lg",
    secondary:
      "bg-slate-200 hover:bg-slate-300 text-slate-800 disabled:opacity-50",
    outline:
      "bg-white border-2 border-slate-200 text-slate-800 hover:bg-slate-50 disabled:opacity-50",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
