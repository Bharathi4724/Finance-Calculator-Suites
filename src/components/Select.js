import React from 'react';

/**
 * Reusable Select Component
 * Provides consistent styling for dropdown selections
 */
const Select = ({
  label,
  value,
  onChange,
  options,
  error,
  required = false,
  disabled = false
}) => {
  return (
    <div className="form-group">
      {label && (
        <label className="form-label">
          {label}
          {required && <span style={{ color: 'var(--error)' }}> *</span>}
        </label>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`form-select ${error ? 'error' : ''}`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="form-error">{error}</p>}
    </div>
  );
};

export default Select;
