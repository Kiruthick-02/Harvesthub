const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-dark-card p-8 rounded-xl shadow-2xl border border-primary-green/20 ${className}`}>
      {children}
    </div>
  );
};

export default Card;