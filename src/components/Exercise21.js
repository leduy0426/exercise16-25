import React, { useState } from 'react';

const users = [
  { id: 1, firstName: 'John', lastName: 'Done', age: 25, role: 'Developer' },
  { id: 2, firstName: 'Mary', lastName: 'Thompson', age: 35, role: 'Designer' },
  { id: 3, firstName: 'John', lastName: 'Smith', age: 30, role: 'Product Manager' },
  { id: 4, firstName: 'Emily', lastName: 'Johnson', age: 25, role: 'QA Lead' },
  { id: 5, firstName: 'William', lastName: 'Davis', age: 34, role: 'DevOps Engineer' },
];

const dishes = [
  {
    id: 0,
    name: 'Uthappizza',
    category: 'mains',
    label: 'Hot',
    price: '4.99',
    featured: true,
    description:
      'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.',
  },
  {
    id: 1,
    name: 'Zucchipakoda',
    category: 'appetizer',
    label: '',
    price: '1.99',
    featured: false,
    description:
      'Deep fried Zucchini coated with mildly spiced Chickpea flour batter accompanied with a sweet-tangy tamarind sauce.',
  },
  {
    id: 2,
    name: 'Vadonut',
    category: 'appetizer',
    label: 'New',
    price: '1.99',
    featured: false,
    description: 'A quintessential ConFusion experience, is it a vada or is it a donut?',
  },
  {
    id: 3,
    name: 'ElaiCheese Cake',
    category: 'dessert',
    label: '',
    price: '2.99',
    featured: false,
    description:
      'A delectable, semi-sweet New York Style Cheese Cake, with Graham cracker crust and spiced with Indian cardamoms.',
  },
];

const Exercise21 = () => {
  const [selectedUserId, setSelectedUserId] = useState(1);
  const [selectedDishId, setSelectedDishId] = useState(0);
  const [activeTab, setActiveTab] = useState('users');

  const selectedUser = users.find((u) => u.id === Number(selectedUserId));
  const selectedDish = dishes.find((d) => d.id === Number(selectedDishId));

  return (
    <div className="container my-4">
      <div className="card shadow border-0">
        <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Exercise 21: Demo about Resource IDs in Routes</h4>
          <span className="badge bg-light text-success fs-6">Resource ID Dynamic Param</span>
        </div>
        <div className="card-body">
          <p className="lead text-muted">
            Resource IDs in route paths allow fetching and rendering individual record details (e.g. <code>/users/:id</code> or <code>/dishes/:id</code>).
          </p>

          <ul className="nav nav-tabs mb-4">
            <li className="nav-item">
              <button
                className={`nav-link fw-bold ${activeTab === 'users' ? 'active' : ''}`}
                onClick={() => setActiveTab('users')}
              >
                User Resource Demo
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link fw-bold ${activeTab === 'dishes' ? 'active' : ''}`}
                onClick={() => setActiveTab('dishes')}
              >
                Dish Resource Demo
              </button>
            </li>
          </ul>

          {activeTab === 'users' && (
            <div className="row">
              <div className="col-md-5 mb-3">
                <div className="card">
                  <div className="card-header bg-primary text-white fw-bold">User Directory (Click ID)</div>
                  <div className="list-group list-group-flush">
                    {users.map((u) => (
                      <button
                        key={u.id}
                        className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${
                          selectedUserId === u.id ? 'active' : ''
                        }`}
                        onClick={() => setSelectedUserId(u.id)}
                      >
                        <span>
                          {u.firstName} {u.lastName}
                        </span>
                        <span className="badge bg-secondary rounded-pill">ID: #{u.id}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-md-7">
                {selectedUser ? (
                  <div className="card border-primary h-100 shadow-sm">
                    <div className="card-header bg-light">
                      <h5 className="card-title text-primary mb-0">
                        User Detail View <code>/users/{selectedUser.id}</code>
                      </h5>
                    </div>
                    <div className="card-body">
                      <h3 className="fw-bold">
                        {selectedUser.firstName} {selectedUser.lastName}
                      </h3>
                      <p className="text-muted fs-5 mb-2">{selectedUser.role}</p>
                      <div className="row g-2 mt-3">
                        <div className="col-6">
                          <div className="p-3 bg-light rounded border">
                            <small className="text-muted d-block">User ID</small>
                            <strong>#{selectedUser.id}</strong>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="p-3 bg-light rounded border">
                            <small className="text-muted d-block">Age</small>
                            <strong>{selectedUser.age} years old</strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="alert alert-secondary">Select a user to view details</div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'dishes' && (
            <div className="row">
              <div className="col-md-5 mb-3">
                <div className="card">
                  <div className="card-header bg-warning text-dark fw-bold">Dishes Menu (Click ID)</div>
                  <div className="list-group list-group-flush">
                    {dishes.map((d) => (
                      <button
                        key={d.id}
                        className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${
                          selectedDishId === d.id ? 'active bg-warning text-dark' : ''
                        }`}
                        onClick={() => setSelectedDishId(d.id)}
                      >
                        <span>{d.name}</span>
                        <span className="badge bg-dark">ID: #{d.id}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-md-7">
                {selectedDish ? (
                  <div className="card border-warning h-100 shadow-sm">
                    <div className="card-header bg-light d-flex justify-content-between align-items-center">
                      <h5 className="card-title text-dark mb-0">
                        Dish Detail View <code>/dishes/{selectedDish.id}</code>
                      </h5>
                      <span className="badge bg-success fs-6">${selectedDish.price}</span>
                    </div>
                    <div className="card-body">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <h3 className="fw-bold mb-0">{selectedDish.name}</h3>
                        {selectedDish.label && (
                          <span className="badge bg-danger">{selectedDish.label}</span>
                        )}
                        <span className="badge bg-secondary text-uppercase">{selectedDish.category}</span>
                      </div>
                      <p className="text-muted mt-3">{selectedDish.description}</p>
                    </div>
                  </div>
                ) : (
                  <div className="alert alert-secondary">Select a dish to view details</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Exercise21;
