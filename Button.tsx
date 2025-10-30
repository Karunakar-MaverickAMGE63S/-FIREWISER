
import React from 'react';

// Using a type with an intersection ensures that all standard button attributes 
// are correctly included, allowing props like `onClick`, `type`, and `disabled`.
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
};

function Button({ children, variant = 'primary', className, ...props }: ButtonProps) {
  const baseClasses = "w-full font-bold py-3 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-opacity-50";
  
  const variantClasses = {
    primary: "bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-400 border-2 border-transparent",
    secondary: "bg-white text-orange-500 border-2 border-orange-500 hover:bg-orange-50 focus:ring-orange-300 ring-2 ring-yellow-400"
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className || ''}`} {...props}>
      {children}
    </button>
  );
}

export default Button;