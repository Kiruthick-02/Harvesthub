const Input = ({ id, name, type = 'text', placeholder, value, onChange, className = '', ...props }) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full bg-dark-bg border-2 border-primary-green/30 rounded-lg
                  px-4 py-3 text-light-text placeholder-secondary-text
                  focus:outline-none focus:ring-2 focus:ring-primary-green
                  transition-all duration-300
                  disabled:bg-dark-card disabled:cursor-not-allowed
                  ${className}`}
      {...props}
    />
  );
};

export default Input;