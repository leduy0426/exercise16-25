import React, { useState } from 'react';

const Exercise25 = () => {
  const [activePage, setActivePage] = useState('cart'); // 'cart' or 'productForm'
  const [loadingAsync, setLoadingAsync] = useState(false);

  // Redux store simulation
  const [products, setProducts] = useState([
    {
      id: '123456',
      name: 'Example Product',
      price: 9.99,
      description: 'This is an example product.',
      catalogs: ['catalog1', 'catalog2'],
    },
    {
      id: '987654',
      name: 'Thunk Managed Smartphone',
      price: 699.00,
      description: 'Async fetched via Redux Thunk middleware.',
      catalogs: ['electronics', 'mobile'],
    },
  ]);

  const [cart, setCart] = useState([
    {
      id: '123456',
      name: 'Example Product',
      price: 9.99,
      quantity: 2,
    },
  ]);

  // Form State
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCatalog, setNewCatalog] = useState('');

  // Async Thunk simulation: Dispatching async action to add product after delay
  const handleAddProductThunk = (e) => {
    e.preventDefault();
    if (!newName || !newPrice) return;

    setLoadingAsync(true);

    // Simulate Redux Thunk async API post request delay (1 second)
    setTimeout(() => {
      const newProductObj = {
        id: Math.floor(100000 + Math.random() * 900000).toString(),
        name: newName,
        price: parseFloat(newPrice),
        description: newDesc || 'No description provided',
        catalogs: newCatalog ? newCatalog.split(',').map((c) => c.trim()) : ['General'],
      };

      setProducts((prev) => [...prev, newProductObj]);
      setNewName('');
      setNewPrice('');
      setNewDesc('');
      setNewCatalog('');
      setLoadingAsync(false);
      setActivePage('cart'); // Navigate back to Cart view after successful thunk action
    }, 800);
  };

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

  const handleDeleteCartItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const totalCost = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container my-4">
      <div className="card shadow border-0">
        <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Exercise 25: Redux Thunk Async App</h4>
          <span className="badge bg-warning text-dark fs-6">Thunk Async Actions & Router</span>
        </div>
        <div className="card-body">
          <p className="lead text-muted">
            Redux Thunk enables writing asynchronous action creators to handle API side-effects before updating store state.
          </p>

          {/* Navigation Controls between ProductForm and Cart */}
          <div className="d-flex justify-content-between align-items-center bg-light p-3 rounded mb-4 border">
            <div className="btn-group">
              <button
                className={`btn fw-bold ${activePage === 'cart' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setActivePage('cart')}
              >
                Shopping Cart & Products Page
              </button>
              <button
                className={`btn fw-bold ${
                  activePage === 'productForm' ? 'btn-primary' : 'btn-outline-primary'
                }`}
                onClick={() => setActivePage('productForm')}
              >
                + Add Product (ProductForm)
              </button>
            </div>
            <span className="badge bg-success fs-6">
              Total Cart Items: {cart.reduce((sum, i) => sum + i.quantity, 0)}
            </span>
          </div>

          {/* Page 1: ProductForm Page */}
          {activePage === 'productForm' && (
            <div className="row justify-content-center">
              <div className="col-md-8">
                <div className="card border-primary shadow-sm">
                  <div className="card-header bg-primary text-white">
                    <h5 className="mb-0 fw-bold">ProductForm Component (Async Thunk Dispatch)</h5>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleAddProductThunk}>
                      <div className="mb-3">
                        <label className="form-label fw-bold">Product Name:</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="e.g. Example Product"
                          value={newName}
                          onChange={(e) => setNewName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label fw-bold">Price ($):</label>
                        <input
                          type="number"
                          step="0.01"
                          className="form-control"
                          placeholder="9.99"
                          value={newPrice}
                          onChange={(e) => setNewPrice(e.target.value)}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label fw-bold">Description:</label>
                        <textarea
                          className="form-control"
                          rows="2"
                          placeholder="Enter product description..."
                          value={newDesc}
                          onChange={(e) => setNewDesc(e.target.value)}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label fw-bold">Catalogs (comma separated):</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="catalog1, catalog2"
                          value={newCatalog}
                          onChange={(e) => setNewCatalog(e.target.value)}
                        />
                      </div>
                      <div className="d-flex justify-content-end gap-2">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={() => setActivePage('cart')}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="btn btn-success fw-bold"
                          disabled={loadingAsync}
                        >
                          {loadingAsync ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2"></span>
                              Dispatching Thunk...
                            </>
                          ) : (
                            'Submit via Redux Thunk'
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Page 2: Cart Page */}
          {activePage === 'cart' && (
            <div className="row g-4">
              <div className="col-lg-7">
                <h5 className="fw-bold text-dark mb-3">Products (Managed by Store)</h5>
                <div className="d-flex flex-column gap-3">
                  {products.map((prod) => (
                    <div key={prod.id} className="card border-0 shadow-sm bg-light">
                      <div className="card-body">
                        <div className="d-flex justify-content-between">
                          <h5 className="fw-bold text-primary">{prod.name}</h5>
                          <span className="fw-bold text-success fs-5">${prod.price.toFixed(2)}</span>
                        </div>
                        <small className="text-muted d-block mb-2">Product ID: #{prod.id}</small>
                        <p className="text-secondary small">{prod.description}</p>
                        <div className="mb-3">
                          {prod.catalogs.map((cat, idx) => (
                            <span key={idx} className="badge bg-secondary me-1">
                              {cat}
                            </span>
                          ))}
                        </div>
                        <button
                          className="btn btn-primary btn-sm fw-bold"
                          onClick={() => handleAddToCart(prod)}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-lg-5">
                <div className="card border-success shadow-sm sticky-top" style={{ top: '80px' }}>
                  <div className="card-header bg-success text-white d-flex justify-content-between">
                    <h5 className="mb-0 fw-bold">Cart Component</h5>
                    <span className="badge bg-light text-success">{cart.length} unique items</span>
                  </div>
                  <div className="card-body">
                    {cart.length === 0 ? (
                      <div className="text-muted text-center py-4">No products in cart</div>
                    ) : (
                      <div className="list-group list-group-flush mb-3">
                        {cart.map((item) => (
                          <div key={item.id} className="list-group-item px-0">
                            <div className="d-flex justify-content-between align-items-center">
                              <div>
                                <h6 className="fw-bold mb-0">{item.name}</h6>
                                <small className="text-muted">
                                  ${item.price.toFixed(2)} x {item.quantity}
                                </small>
                              </div>
                              <div className="d-flex align-items-center">
                                <span className="fw-bold me-3">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </span>
                                <button
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={() => handleDeleteCartItem(item.id)}
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
                      <h4 className="fw-bold">
                        Total: <span className="text-success">${totalCost.toFixed(2)}</span>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Exercise25;
