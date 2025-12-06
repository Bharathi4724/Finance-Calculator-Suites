import React from 'react';

/**
 * History Component
 * Displays calculation history with clear functionality
 */
const History = ({ items, onClear, title = 'Calculation History' }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="history fade-in">
      <div className="history-header">
        <h3 className="history-title">{title}</h3>
        <button className="history-clear" onClick={onClear}>
          Clear History
        </button>
      </div>
      <div className="history-list">
        {items.map((item, index) => (
          <div key={index} className="history-item">
            <span className="history-item-label">{item.label}</span>
            <span className="history-item-value">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
