import React, { useState } from 'react';

const Exercise18 = () => {
  const [count, setCount] = useState(0);
  const [snapshot, setSnapshot] = useState(null);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleSnapshot = () => {
    setSnapshot(count);
  };

  const handleRestore = () => {
    if (snapshot !== null) {
      setCount(snapshot);
    }
  };

  return (
    <div className="container my-4">
      <div className="card shadow border-0">
        <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Exercise 18: Demo about State as a Snapshot</h4>
          <span className="badge bg-warning text-dark fs-6">Undo / Restore Patterns</span>
        </div>
        <div className="card-body">
          <p className="lead text-muted">
            State values in React act like static snapshots for each render pass. You can store previous snapshots to implement restore or undo operations.
          </p>

          <div className="row text-center mb-4">
            <div className="col-md-6 mb-3">
              <div className="p-4 bg-light rounded border border-primary">
                <h6 className="text-muted fw-bold text-uppercase">Current Count</h6>
                <h2 className="display-4 text-primary fw-bold">{count}</h2>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="p-4 bg-light rounded border border-secondary">
                <h6 className="text-muted fw-bold text-uppercase">Saved Snapshot Value</h6>
                <h2 className="display-4 text-secondary fw-bold">
                  {snapshot !== null ? snapshot : <span className="fs-4 text-muted italic">None</span>}
                </h2>
              </div>
            </div>
          </div>

          <div className="d-flex flex-wrap justify-content-center gap-3 mb-4">
            <button className="btn btn-primary btn-lg shadow-sm" onClick={handleIncrement}>
              Increment (+1)
            </button>
            <button className="btn btn-warning text-dark btn-lg shadow-sm" onClick={handleSnapshot}>
              Take Snapshot
            </button>
            <button
              className="btn btn-success btn-lg shadow-sm"
              onClick={handleRestore}
              disabled={snapshot === null}
            >
              Restore Snapshot
            </button>
          </div>

          <div className="alert alert-info border-0 shadow-sm">
            <h6 className="fw-bold mb-1">How it works:</h6>
            <small>
              Click <strong>Increment</strong> to change count. Click <strong>Take Snapshot</strong> to freeze the current count in memory. Continue incrementing, then click <strong>Restore Snapshot</strong> to revert count back to the saved state value.
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exercise18;
