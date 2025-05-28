const Switch = ({ 
    checked, 
    onChange, 
    className = '',
    disabled = false,
    ...props 
  }) => {
    const baseClasses = `
      relative inline-flex h-6 w-11 items-center rounded-full 
      transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-opacity-50
      ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      ${checked 
        ? 'focus:ring-green-400' 
        : 'focus:ring-gray-300'
      }
    `;
  
    const switchStyle = {
      backgroundColor: checked ? '#6CB798' : '#e5e7eb',
      boxShadow: checked ? '0px 2.19px 2.19px 0px rgba(0, 0, 0, 0.25)' : 'none'
    };
  
    const handleClick = () => {
      if (!disabled && onChange) {
        onChange();
      }
    };
  
    const handleKeyDown = (e) => {
      if ((e.key === ' ' || e.key === 'Enter') && !disabled && onChange) {
        e.preventDefault();
        onChange();
      }
    };
  
    return (
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        className={`${baseClasses} ${className}`}
        style={switchStyle}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        {...props}
      >
        <span
          className={`
            inline-block h-4 w-4 transform rounded-full bg-white transition-all duration-200 ease-in-out
            ${checked ? 'translate-x-6' : 'translate-x-1'}
          `}
          style={{
            boxShadow: checked ? '0px 2.19px 2.19px 0px rgba(0, 0, 0, 0.25)' : '0px 1px 2px 0px rgba(0, 0, 0, 0.1)'
          }}
        />
      </button>
    );
  };
  
export default Switch  