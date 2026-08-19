import React, { useState, useRef } from 'react';

const Exercise17 = () => {
  const [count, setCount] = useState(0);
  const renderCount = useRef(1);

  // Increment render count on each render pass
  renderCount.current += 1;

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div className="container my-4">
      <div className="card shadow border-0">
        <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Exercise 17: Demo about Render and Commit</h4>
          <span className="badge bg-light text-success fs-6">Reconciliation & Virtual DOM</span>
        </div>
        <div className="card-body">
          <p className="lead text-muted">
            This demo illustrates how React handles rendering (calculating virtual DOM changes) and committing (updating actual DOM nodes).
          </p>

          <div className="row text-center mb-4">
            <div className="col-md-6 mb-3">
              <div className="p-4 bg-light rounded border border-success h-100">
                <h6 className="text-uppercase text-muted fw-bold">State Value</h6>
                <h2 className="display-4 text-success fw-bold">Count: {count}</h2>
                <button className="btn btn-success btn-lg mt-3 shadow-sm" onClick={handleClick}>
                  Increment Count
                </button>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="p-4 bg-light rounded border border-warning h-100">
                <h6 className="text-uppercase text-muted fw-bold">Component Pass Count</h6>
                <h2 className="display-4 text-warning fw-bold">{renderCount.current}</h2>
                <span className="badge bg-warning text-dark p-2">Renders Triggered</span>
              </div>
            </div>
          </div>

          <div className="card border-secondary">
            <div className="card-header bg-dark text-white fw-bold">
              3 Steps of React Render & Commit Cycle
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-4">
                  <div className="p-3 bg-light rounded border">
                    <h6 className="fw-bold text-primary">1. Triggering a Render</h6>
                    <small className="text-muted">User clicks button → <code>setCount()</code> requests state update.</small>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-3 bg-light rounded border">
                    <h6 className="fw-bold text-info">2. Rendering Component</h6>
                    <small className="text-muted">React calls component function and computes new Virtual DOM snapshot.</small>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-3 bg-light rounded border">
                    <h6 className="fw-bold text-success">3. Committing to DOM</h6>
                    <small className="text-muted">React applies minimal changes (diffs) to actual DOM nodes on screen.</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exercise17;
