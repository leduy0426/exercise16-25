import React, { useState } from 'react';

const Exercise16 = () => {
  const [count, setCount] = useState(0);
  const [logs, setLogs] = useState([]);

  const handleButtonClick = () => {
    const nextCount = count + 1;
    setCount(nextCount);
    setLogs((prev) => [
      `[${new Date().toLocaleTimeString()}] Clicked button -> Count increased to ${nextCount}`,
      ...prev,
    ]);
  };

  const handleReset = () => {
    setCount(0);
    setLogs((prev) => [
      `[${new Date().toLocaleTimeString()}] Reset count to 0`,
      ...prev,
    ]);
  };

  return (
    <div className="container my-4">
      <div className="card shadow border-0">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Exercise 16: Demo about Event Handling</h4>
          <span className="badge bg-light text-primary fs-6">useState & Event Handlers</span>
        </div>
        <div className="card-body">
          <p className="lead text-muted">
            This exercise demonstrates basic event handling in React using state updates triggered by user button clicks.
          </p>

          <div className="p-4 mb-4 bg-light rounded text-center border">
            <h2 className="display-4 text-primary fw-bold mb-3">Count: {count}</h2>
            <div className="d-flex justify-content-center gap-3">
              <button className="btn btn-primary btn-lg shadow-sm" onClick={handleButtonClick}>
                <i className="bi bi-plus-circle me-2"></i>Increase Count
              </button>
              <button className="btn btn-outline-danger btn-lg shadow-sm" onClick={handleReset}>
                Reset
              </button>
            </div>
          </div>

          <div className="card border-info">
            <div className="card-header bg-info text-white fw-bold">
              Event Log Stream
            </div>
            <div className="card-body bg-dark text-light font-monospace" style={{ maxHeight: '180px', overflowY: 'auto' }}>
              {logs.length === 0 ? (
                <div className="text-secondary italic">No events triggered yet. Click the button above.</div>
              ) : (
                logs.map((log, index) => (
                  <div key={index} className="text-success small py-1 border-bottom border-secondary">
                    {log}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exercise16;
