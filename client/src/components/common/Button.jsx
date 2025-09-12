const Button = ({ children, onClick, type = 'button', className = '', isLoading = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading}
      className={`w-full flex justify-center bg-primary-green text-white font-bold py-3 px-4 rounded-lg
                  hover:bg-opacity-90 transition-all duration-300
                  focus:outline-none focus:ring-2 focus:ring-primary-green/50
                  disabled:bg-gray-500 disabled:cursor-not-allowed
                  ${className}`}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
};

export default Button;
