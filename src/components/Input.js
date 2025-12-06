import React from 'react';

/**
 * Reusable Input Component
 * Provides consistent styling and validation for form inputs
 */
const Input = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  min,
  max,
  step,
  required = false,
  disabled = false,
  prefix,
  suffix
}) => {
  return (
    <div className="form-group">
      {label && (
        <label className="form-label">
          {label}
          {required && <span style={{ color: 'var(--error)' }}> *</span>}
        </label>
      )}
      <div style={{ position: 'relative' }}>
        {prefix && (
          <span style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-secondary)',
            fontSize: '14px'
          }}>
            {prefix}
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          className={`form-input ${error ? 'error' : ''}`}
          style={{
            paddingLeft: prefix ? '32px' : '16px',
            paddingRight: suffix ? '48px' : '16px'
          }}
        />
        {suffix && (
          <span style={{
            position: 'absolute',
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-secondary)',
            fontSize: '14px'
          }}>
            {suffix}
          </span>
        )}
      </div>
      {error && <p className="form-error">{error}</p>}
    </div>
  );
};

export default Input;
