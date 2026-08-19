import React, { useState } from 'react';
import './App.css';
import Exercise16 from './components/Exercise16';
import Exercise17 from './components/Exercise17';
import Exercise18 from './components/Exercise18';
import Exercise19 from './components/Exercise19';
import Exercise20 from './components/Exercise20';
import Exercise21 from './components/Exercise21';
import Exercise22 from './components/Exercise22';
import Exercise23 from './components/Exercise23';
import Exercise24 from './components/Exercise24';
import Exercise25 from './components/Exercise25';

function App() {
  const [currentEx, setCurrentEx] = useState(16);

  const exercises = [
    { id: 16, name: 'Ex 16: Demo about Event Handling', hook: 'Event Handling' },
    { id: 17, name: 'Ex 17: Demo about Render and Commit', hook: 'Render & Commit' },
    { id: 18, name: 'Ex 18: Demo about State as a Snapshot', hook: 'State Snapshot' },
    { id: 19, name: 'Ex 19: Demo about Validation in Component', hook: 'PropTypes' },
    { id: 20, name: 'Ex 20: Demo about Decoupling route declarations', hook: 'Decoupled Routes' },
    { id: 21, name: 'Ex 21: Demo about Resource IDs in routes', hook: 'Resource IDs' },
    { id: 22, name: 'Ex 22: Demo about Optional parameters and Link', hook: 'Optional Params & Link' },
    { id: 23, name: 'Ex 23: Lazy loading', hook: 'Lazy & Suspense' },
    { id: 24, name: 'Ex 24: Introduction to Redux', hook: 'Redux Store' },
    { id: 25, name: 'Ex 25: Redux Thunk', hook: 'Redux Thunk' },
  ];

  return (
    <div className="App pb-5">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm px-3 py-2 border-bottom border-secondary">
        <div className="container-fluid justify-content-between">
          <span className="navbar-brand fw-bold text-warning fs-4 me-3">
            React Master (16 - 25)
          </span>

          <div className="d-flex flex-wrap gap-2">
            {exercises.map((ex) => (
              <button
                key={ex.id}
                className={`btn btn-sm px-2 fw-bold ${
                  currentEx === ex.id
                    ? 'btn-warning text-dark shadow-sm'
                    : 'btn-outline-light'
                }`}
                onClick={() => setCurrentEx(ex.id)}
              >
                Ex {ex.id}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Sub-header showing active Exercise Info */}
      <div className="bg-secondary bg-gradient text-white py-2 px-3 text-center border-bottom shadow-sm">
        <span className="badge bg-warning text-dark me-2 fs-6">
          {exercises.find((e) => e.id === currentEx)?.hook}
        </span>
        <strong className="fs-5">
          {exercises.find((e) => e.id === currentEx)?.name}
        </strong>
      </div>

      {/* Render Current Exercise Component */}
      <div className="mt-4">
        {currentEx === 16 && <Exercise16 />}
        {currentEx === 17 && <Exercise17 />}
        {currentEx === 18 && <Exercise18 />}
        {currentEx === 19 && <Exercise19 />}
        {currentEx === 20 && <Exercise20 />}
        {currentEx === 21 && <Exercise21 />}
        {currentEx === 22 && <Exercise22 />}
        {currentEx === 23 && <Exercise23 />}
        {currentEx === 24 && <Exercise24 />}
        {currentEx === 25 && <Exercise25 />}
      </div>
    </div>
  );
}

export default App;
