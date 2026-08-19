import React, { useState } from 'react';

// Decoupled routes configuration object array
const routesConfig = [
  {
    path: '/',
    name: 'Home',
    component: () => (
      <div className="p-4 bg-light rounded text-center border">
        <h3 className="text-primary fw-bold">Welcome to Home Page</h3>
        <p className="text-muted">This view was rendered from a decoupled route configuration.</p>
      </div>
    ),
  },
  {
    path: '/products',
    name: 'Products',
    component: () => (
      <div className="p-4 bg-light rounded border">
        <h3 className="text-success fw-bold">Product Catalog</h3>
        <ul className="list-group mt-3">
          <li className="list-group-item d-flex justify-content-between">
            <span>Laptop Pro 15</span>
            <span className="badge bg-primary">$1,299</span>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <span>Smartphone Ultra</span>
            <span className="badge bg-primary">$899</span>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <span>Wireless Headphones</span>
            <span className="badge bg-primary">$199</span>
          </li>
        </ul>
      </div>
    ),
  },
  {
    path: '/about',
    name: 'About',
    component: () => (
      <div className="p-4 bg-light rounded text-center border">
        <h3 className="text-info fw-bold">About Us</h3>
        <p className="text-muted">Decoupling route declarations simplifies dynamic routing and maintenance.</p>
      </div>
    ),
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => (
      <div className="p-4 bg-light rounded border">
        <h3 className="text-warning fw-bold">Contact Support</h3>
        <p className="text-muted">Email: support@example.com | Phone: +1 800 555 0199</p>
      </div>
    ),
  },
  {
    path: '/users/:userId?',
    name: 'User Profile',
    component: ({ userId }) => (
      <div className="p-4 bg-light rounded border border-info">
        <h3 className="text-info fw-bold">User Profile View</h3>
        <p className="lead mb-0">Active User ID: <span className="badge bg-info fs-5">{userId || 'Default / Guest'}</span></p>
      </div>
    ),
  },
];

const Exercise20 = () => {
  const [activePath, setActivePath] = useState('/');
  const [userParam, setUserParam] = useState('101');

  const activeRoute = routesConfig.find((r) => r.path === activePath) || routesConfig[0];
  const ComponentToRender = activeRoute.component;

  return (
    <div className="container my-4">
      <div className="card shadow border-0">
        <div className="card-header bg-info text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Exercise 20: Demo about Decoupling Route Declarations</h4>
          <span className="badge bg-light text-info fs-6">Route Configuration Array</span>
        </div>
        <div className="card-body">
          <p className="lead text-muted">
            Instead of hardcoding <code>&lt;Route&gt;</code> tags inside JSX, routes are defined as data objects in a central array and mapped dynamically.
          </p>

          {/* Navigation Bar */}
          <nav className="nav nav-pills nav-fill bg-light p-2 rounded mb-4 border">
            {routesConfig.map((route, idx) => (
              <button
                key={idx}
                className={`nav-link fw-bold ${activePath === route.path ? 'active bg-info' : 'text-dark'}`}
                onClick={() => setActivePath(route.path)}
              >
                {route.name}
              </button>
            ))}
          </nav>

          {activePath === '/users/:userId?' && (
            <div className="mb-3 d-flex align-items-center gap-2">
              <label className="fw-bold">Test User ID Param:</label>
              <input
                type="text"
                className="form-control w-auto"
                value={userParam}
                onChange={(e) => setUserParam(e.target.value)}
              />
            </div>
          )}

          {/* Render active route component */}
          <div className="mt-3">
            <ComponentToRender userId={userParam} />
          </div>

          <div className="mt-4 p-3 bg-dark text-light rounded font-monospace small">
            <div className="text-warning fw-bold mb-1">Route Config Data Structure:</div>
            <code>{JSON.stringify(routesConfig.map(r => ({ path: r.path, name: r.name })), null, 2)}</code>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exercise20;
