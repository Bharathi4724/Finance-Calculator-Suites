import React from 'react';

/**
 * Reusable Card Component
 * Provides consistent container styling for calculator sections
 */
const Card = ({ 
  title, 
  subtitle, 
  icon, 
  children,
  className = ''
}) => {
  return (
    <div className={`card fade-in ${className}`}>
      {(title || icon) && (
        <div className="card-header">
          {icon && (
            <div className="card-icon">
              {icon}
            </div>
          )}
          <div>
            {title && <h2 className="card-title">{title}</h2>}
            {subtitle && <p className="card-subtitle">{subtitle}</p>}
          </div>
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;
