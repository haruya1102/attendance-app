import React from 'react';

// ボタンの色を指定するための型を定義
type ButtonColor = 'blue' | 'red' | 'green' | 'yellow' | 'purple' | 'pink';

interface ButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  color: ButtonColor;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, color, children }) => (
  <button
    onClick={onClick}
    className={`bg-${color}-500 text-white p-4 rounded-lg text-lg hover:bg-${color}-600 transition duration-300 ease-in-out`}
  >
    {children}
  </button>
);

export default Button;
