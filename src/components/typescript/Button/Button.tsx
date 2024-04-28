import React, { ButtonHTMLAttributes } from 'react';

// Definimos los tipos para las variantes y tamaños del botón
type Variant = 'primary' | 'secondary' | 'danger';
type Size = 'small' | 'medium' | 'large';

// Definimos las props del componente de botón
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

// Definimos el componente de botón
const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  children,
  ...props
}) => {
  return (
    <button
      className={`button ${variant} ${size}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
