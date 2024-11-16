interface ButtonProps {
    title: string;
    disabled?: boolean;
    onClick?: () => void;
    selected?: boolean;
  }
  
  const Button: React.FC<ButtonProps> = ({ 
    title, 
    disabled = false, 
    onClick,
    selected = false 
  }) => {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`
          px-4 py-2 rounded-lg text-sm font-medium
          transition-colors duration-200
          ${selected 
            ? 'bg-blue-600 text-white' 
            : disabled 
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
              : 'bg-white hover:bg-blue-50 text-blue-600'
          }
        `}
      >
        {title}
      </button>
    );
  };
  
  export default Button;