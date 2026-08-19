import React, { useState } from 'react';

// Initial products catalog
const sampleProducts = [
  {
    id: '123456',
    name: 'Wireless Ergonomic Mouse',
    price: 29.99,
    description: 'High precision wireless mouse with rechargeable battery.',
    catalogs: ['Electronics', 'Accessories'],
  },
  {
    id: '234567',
    name: 'Mechanical Gaming Keyboard',
    price: 79.99,
    description: 'RGB Backlit mechanical keyboard with tactile switches.',
    catalogs: ['Electronics', 'Gaming'],
  },
  {
    id: '345678',
    name: 'Noise Cancelling Headphones',
    price: 149.99,
    description: 'Over-ear headphones with active noise cancellation.',
    catalogs: ['Audio', 'Accessories'],
  },
];

const Exercise24 = () => {
  // Local state representing Redux store state
  const [cart, setCart] = useState([
    {
      id: '123456',
      name: 'Wireless Ergonomic Mouse',
      price: 29.99,
      catalogs: ['Electronics', 'Accessories'],
      quantity: 1,
    },
  ]);

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const handleDeleteFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const totalCost = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container my-4">
      <div className="card shadow border-0">
        <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Exercise 24: Introduction to Redux</h4>
          <span className="badge bg-danger fs-6">Redux Architecture Cart</span>
        </div>
        <div className="card-body">
          <p className="lead text-muted">
            Redux provides a centralized state container to manage application data flow (Products, Add/Update/Delete Cart Actions, and Total Calculation).
          </p>

          <div className="row g-4">
            {/* Left Column: Product List */}
            <div className="col-lg-7">
              <h5 className="fw-bold text-primary mb-3">Product Catalog (Dispatch Actions)</h5>
              <div className="d-flex flex-column gap-3">
                {sampleProducts.map((prod) => {
                  const inCartItem = cart.find((item) => item.id === prod.id);
                  return (
                    <div key={prod.id} className="card border shadow-sm">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start">
                          <div>
                            <h5 className="card-title fw-bold text-dark mb-1">{prod.name}</h5>
                            <small className="text-muted d-block mb-2">ID: {prod.id}</small>
                          </div>
                          <span className="fs-5 fw-bold text-success">${prod.price.toFixed(2)}</span>
                        </div>
                        <p className="card-text text-secondary small mb-2">{prod.description}</p>
                        <div className="mb-3">
                          {prod.catalogs.map((cat, i) => (
                            <span key={i} className="badge bg-secondary me-1">
                              {cat}
                            </span>
                          ))}
                        </div>
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-primary btn-sm fw-bold"
                            onClick={() => handleAddToCart(prod)}
                          >
                            Add to Cart
                          </button>
                          {inCartItem && (
                            <>
                              <button
                                className="btn btn-warning btn-sm text-dark fw-bold"
                                onClick={() => handleUpdateQuantity(prod.id, 1)}
                              >
                                Update (+1)
                              </button>
                              <button
                                className="btn btn-outline-danger btn-sm fw-bold"
                                onClick={() => handleDeleteFromCart(prod.id)}
                              >
                                Delete from Cart
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Redux Cart Component */}
            <div className="col-lg-5">
              <div className="card border-primary shadow-sm sticky-top" style={{ top: '80px' }}>
                <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                  <h5 className="mb-0 fw-bold">Shopping Cart</h5>
                  <span className="badge bg-light text-primary">{cart.length} items</span>
                </div>
                <div className="card-body">
                  {cart.length === 0 ? (
                    <div className="text-center text-muted py-4">Your cart is empty.</div>
                  ) : (
                    <div className="list-group list-group-flush mb-3">
                      {cart.map((item) => (
                        <div key={item.id} className="list-group-item px-0">
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <h6 className="mb-0 fw-bold">{item.name}</h6>
                              <small className="text-muted">
                                ${item.price.toFixed(2)} x {item.quantity}
                              </small>
                            </div>
                            <div className="d-flex align-items-center gap-1">
                              <button
                                className="btn btn-sm btn-outline-secondary px-2 py-0"
                                onClick={() => handleUpdateQuantity(item.id, -1)}
                              >
                                -
                              </button>
                              <span className="fw-bold px-2">{item.quantity}</span>
                              <button
                                className="btn btn-sm btn-outline-secondary px-2 py-0"
                                onClick={() => handleUpdateQuantity(item.id, 1)}
                              >
                                +
                              </button>
                              <button
                                className="btn btn-sm btn-danger ms-2"
                                onClick={() => handleDeleteFromCart(item.id)}
                              >
                                &times;
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="border-top pt-3 text-end">
                    <h5 className="fw-bold text-dark">
                      Total Cost:{' '}
                      <span className="text-success">${totalCost.toFixed(2)}</span>
                    </h5>
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

export default Exercise24;
