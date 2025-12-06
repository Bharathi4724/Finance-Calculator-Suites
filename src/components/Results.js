import React from 'react';

/**
 * Reusable Results Component
 * Displays calculation results in a grid layout
 */
const Results = ({ title, items, icon }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="results fade-in">
      <h3 className="results-title">
        {icon && icon}
        {title || 'Results'}
      </h3>
      <div className="results-grid">
        {items.map((item, index) => (
          <div key={index} className="result-item">
            <p className="result-label">{item.label}</p>
            <p className={`result-value ${item.className || ''}`}>
              {item.value}
            </p>
            {item.badge && (
              <span className={`bmi-badge ${item.badgeClass || ''}`}>
                {item.badge}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Results;
