import React, { useState, useEffect, Suspense } from 'react';

// Simulated API helper functions matching doc specification
const fetchUser = async (userId) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
  return await response.json();
};

const fetchPost = async (postId) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  return await response.json();
};

// User card sub-component
const UserView = ({ user }) => (
  <div className="card border-primary shadow-sm h-100">
    <div className="card-header bg-primary text-white font-monospace">
      <small>User ID #{user?.id}</small>
    </div>
    <div className="card-body">
      <h4 className="card-title text-primary fw-bold">{user?.name}</h4>
      <p className="card-text text-muted mb-2">
        <strong>Email:</strong> {user?.email}
      </p>
      <p className="card-text text-muted mb-2">
        <strong>Company:</strong> {user?.company?.name || 'N/A'}
      </p>
      <p className="card-text text-muted mb-0">
        <strong>City:</strong> {user?.address?.city || 'N/A'}
      </p>
    </div>
  </div>
);

// Post card sub-component
const PostView = ({ post }) => (
  <div className="card border-success shadow-sm h-100">
    <div className="card-header bg-success text-white font-monospace">
      <small>Post ID #{post?.id}</small>
    </div>
    <div className="card-body">
      <h4 className="card-title text-success fw-bold">{post?.title}</h4>
      <p className="card-text text-secondary">{post?.body}</p>
    </div>
  </div>
);

const Exercise23 = () => {
  const [userId, setUserId] = useState(1);
  const [postId, setPostId] = useState(1);
  const [userData, setUserData] = useState(null);
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    Promise.all([fetchUser(userId), fetchPost(postId)])
      .then(([u, p]) => {
        if (isMounted) {
          setUserData(u);
          setPostData(p);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [userId, postId]);

  return (
    <div className="container my-4">
      <div className="card shadow border-0">
        <div className="card-header bg-purple text-white bg-primary d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Exercise 23: Demo about Lazy Components</h4>
          <span className="badge bg-light text-primary fs-6">React Suspense & API Fetching</span>
        </div>
        <div className="card-body">
          <p className="lead text-muted">
            Combines dynamic data loading from JSONPlaceholder API with asynchronous rendering and Suspense fallback states.
          </p>

          <div className="row g-3 mb-4 p-3 bg-light rounded border align-items-center">
            <div className="col-md-5">
              <label className="fw-bold">Select User ID (1 - 10):</label>
              <select
                className="form-select mt-1"
                value={userId}
                onChange={(e) => setUserId(Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((id) => (
                  <option key={id} value={id}>
                    User #{id}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-5">
              <label className="fw-bold">Select Post ID (1 - 10):</label>
              <select
                className="form-select mt-1"
                value={postId}
                onChange={(e) => setPostId(Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((id) => (
                  <option key={id} value={id}>
                    Post #{id}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-2 text-center pt-3">
              <button
                className="btn btn-outline-primary w-100"
                onClick={() => {
                  setUserId((prev) => (prev % 10) + 1);
                  setPostId((prev) => (prev % 10) + 1);
                }}
              >
                Next Item
              </button>
            </div>
          </div>

          {loading ? (
            <div className="text-center p-5 bg-light rounded border">
              <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
                <span className="visually-hidden">Loading...</span>
              </div>
              <h5 className="mt-3 text-muted">Fetching API resources asynchronously...</h5>
            </div>
          ) : (
            <Suspense
              fallback={
                <div className="alert alert-info text-center p-4">
                  <span className="spinner-border spinner-border-sm me-2"></span> Loading component chunk...
                </div>
              }
            >
              <div className="row g-4">
                <div className="col-md-6">{userData && <UserView user={userData} />}</div>
                <div className="col-md-6">{postData && <PostView post={postData} />}</div>
              </div>
            </Suspense>
          )}
        </div>
      </div>
    </div>
  );
};

export default Exercise23;
