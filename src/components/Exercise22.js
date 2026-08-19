import React, { useState } from 'react';

const Home = () => (
  <div className="p-5 text-center bg-light rounded border">
    <h2 className="text-primary fw-bold">Home Component</h2>
    <p className="lead text-muted">Welcome to the main homepage of Exercise 22!</p>
  </div>
);

const About = () => (
  <div className="p-5 text-center bg-light rounded border">
    <h2 className="text-success fw-bold">About Component</h2>
    <p className="lead text-muted">Learn more about our React router demo application.</p>
  </div>
);

const Contact = () => (
  <div className="p-5 text-center bg-light rounded border">
    <h2 className="text-warning fw-bold">Contact Component</h2>
    <p className="lead text-muted">Reach out to us via email or customer hotline.</p>
  </div>
);

const Profile = ({ username }) => (
  <div className="p-5 text-center bg-light rounded border border-info">
    <h2 className="text-info fw-bold">Profile Component</h2>
    <p className="lead">
      Viewing profile for user: <strong className="text-dark">{username || 'Guest (Optional Param omitted)'}</strong>
    </p>
  </div>
);

const Exercise22 = () => {
  const [activeRoute, setActiveRoute] = useState('home');
  const [optionalUser, setOptionalUser] = useState('alex_dev');

  return (
    <div className="container my-4">
      <div className="card shadow border-0">
        <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Exercise 22: Demo about Optional Parameters and Link</h4>
          <span className="badge bg-warning text-dark fs-6">Custom Navbar & Links</span>
        </div>
        <div className="card-body">
          <p className="lead text-muted">
            Demonstrates custom navigation bar links with optional parameters and active tab routing state.
          </p>

          {/* Custom Navbar */}
          <nav className="navbar navbar-expand-md navbar-dark bg-dark rounded mb-4 px-3 shadow-sm">
            <span
              className="navbar-brand fw-bold text-warning cursor-pointer me-4"
              style={{ cursor: 'pointer' }}
              onClick={() => setActiveRoute('home')}
            >
              Logo
            </span>
            <div className="navbar-nav me-auto">
              <button
                className={`nav-link border-0 bg-transparent text-start ${
                  activeRoute === 'home' ? 'active fw-bold text-warning' : ''
                }`}
                onClick={() => setActiveRoute('home')}
              >
                Home
              </button>
              <button
                className={`nav-link border-0 bg-transparent text-start ${
                  activeRoute === 'about' ? 'active fw-bold text-warning' : ''
                }`}
                onClick={() => setActiveRoute('about')}
              >
                About
              </button>
              <button
                className={`nav-link border-0 bg-transparent text-start ${
                  activeRoute === 'contact' ? 'active fw-bold text-warning' : ''
                }`}
                onClick={() => setActiveRoute('contact')}
              >
                Contact
              </button>
              <button
                className={`nav-link border-0 bg-transparent text-start ${
                  activeRoute === 'profile' ? 'active fw-bold text-warning' : ''
                }`}
                onClick={() => setActiveRoute('profile')}
              >
                Profile
              </button>
            </div>
          </nav>

          {activeRoute === 'profile' && (
            <div className="row justify-content-center mb-4">
              <div className="col-md-6 bg-light p-3 rounded border">
                <label className="fw-bold me-2">Test Optional Param (Username):</label>
                <div className="input-group mt-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter optional username..."
                    value={optionalUser}
                    onChange={(e) => setOptionalUser(e.target.value)}
                  />
                  <button className="btn btn-outline-danger" onClick={() => setOptionalUser('')}>
                    Clear Param
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Render Route Component */}
          <div>
            {activeRoute === 'home' && <Home />}
            {activeRoute === 'about' && <About />}
            {activeRoute === 'contact' && <Contact />}
            {activeRoute === 'profile' && <Profile username={optionalUser} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exercise22;
