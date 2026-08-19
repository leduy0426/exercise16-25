import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Child Component: AnimalCard
const AnimalCard = ({ name, scientificName, size, diet, additional, showAdditional }) => {
  return (
    <div className="card h-100 shadow-sm border-0 bg-light">
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h4 className="card-title text-primary fw-bold mb-0">{name}</h4>
          <span className="badge bg-secondary">{size} kg</span>
        </div>
        <h6 className="card-subtitle text-muted italic mb-3">
          <em>{scientificName}</em>
        </h6>

        <div className="mb-3">
          <strong className="small text-uppercase text-secondary d-block mb-1">Diet:</strong>
          <div>
            {diet.map((item, idx) => (
              <span key={idx} className="badge bg-success me-1">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-auto pt-3 border-top">
          <button
            className="btn btn-outline-primary btn-sm w-100 fw-bold"
            onClick={() => showAdditional(additional)}
          >
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

// PropTypes validation
AnimalCard.propTypes = {
  name: PropTypes.string.isRequired,
  scientificName: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  diet: PropTypes.arrayOf(PropTypes.string).isRequired,
  showAdditional: PropTypes.func.isRequired,
  additional: PropTypes.shape({
    notes: PropTypes.string,
    link: PropTypes.string,
  }),
};

// defaultProps fallback for missing optional prop
AnimalCard.defaultProps = {
  additional: {
    notes: 'No Additional Information',
  },
};

// Main Parent Component
const Exercise19 = () => {
  const [selectedInfo, setSelectedInfo] = useState(null);

  const animalData = [
    {
      name: 'Lion',
      scientificName: 'Panthera leo',
      size: 140,
      diet: ['meat'],
    },
    {
      name: 'Gorilla',
      scientificName: 'Gorilla beringei',
      size: 205,
      diet: ['plants', 'insects'],
      additional: {
        notes: 'This is the eastern gorilla. There is also a western gorilla that is a different species.',
      },
    },
    {
      name: 'Zebra',
      scientificName: 'Equus quagga',
      size: 322,
      diet: ['plants'],
      additional: {
        notes: 'There are three different species of zebra.',
        link: 'https://en.wikipedia.org/wiki/Zebra',
      },
    },
  ];

  const showAdditionalData = (additional) => {
    const formatted = Object.entries(additional)
      .map(([key, val]) => `${key.toUpperCase()}: ${val}`)
      .join('\n');
    setSelectedInfo(formatted);
  };

  return (
    <div className="container my-4">
      <div className="card shadow border-0">
        <div className="card-header bg-danger text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Exercise 19: Demo about Validation in Component</h4>
          <span className="badge bg-light text-danger fs-6">PropTypes & defaultProps</span>
        </div>
        <div className="card-body">
          <p className="lead text-muted">
            This exercise demonstrates runtime prop validation using <code>PropTypes</code> and default value fallbacks using <code>defaultProps</code> when data fields (like <em>Lion</em>'s additional info) are missing.
          </p>

          <div className="row g-4 mb-4">
            {animalData.map((animal, index) => (
              <div className="col-md-4" key={index}>
                <AnimalCard
                  name={animal.name}
                  scientificName={animal.scientificName}
                  size={animal.size}
                  diet={animal.diet}
                  additional={animal.additional}
                  showAdditional={showAdditionalData}
                />
              </div>
            ))}
          </div>

          {selectedInfo && (
            <div className="alert alert-warning border border-warning shadow-sm">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="fw-bold mb-0 text-dark">Additional Details Alert:</h6>
                <button className="btn-close" onClick={() => setSelectedInfo(null)}></button>
              </div>
              <pre className="mb-0 bg-white p-3 rounded border font-monospace text-dark">
                {selectedInfo}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Exercise19;
