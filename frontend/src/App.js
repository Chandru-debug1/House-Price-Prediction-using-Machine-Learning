import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    'Overall Qual': 5,
    'Gr Liv Area': 1500,
    'Total Bsmt SF': 800,
    '1st Flr SF': 800,
    'Full Bath': 2,
    'Year Built': 2000,
    'Year Remod/Add': 2000,
    'Garage Cars': 2,
    'Garage Area': 400,
    'Lot Area': 8000,
    'Bedroom AbvGr': 3,
    'TotRms AbvGrd': 6
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value) || value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to get prediction');
      }

      const result = await response.json();
      setPrediction(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🏠 House Price Prediction</h1>
        <p>Enter house features to get a price prediction</p>
      </header>

      <main className="prediction-form">
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="overall-qual">Overall Quality (1-10):</label>
              <input
                type="number"
                id="overall-qual"
                name="Overall Qual"
                min="1"
                max="10"
                value={formData['Overall Qual']}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="gr-liv-area">Ground Living Area (sq ft):</label>
              <input
                type="number"
                id="gr-liv-area"
                name="Gr Liv Area"
                min="300"
                max="10000"
                value={formData['Gr Liv Area']}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="total-bsmt-sf">Total Basement Area (sq ft):</label>
              <input
                type="number"
                id="total-bsmt-sf"
                name="Total Bsmt SF"
                min="0"
                max="5000"
                value={formData['Total Bsmt SF']}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="1st-flr-sf">First Floor Area (sq ft):</label>
              <input
                type="number"
                id="1st-flr-sf"
                name="1st Flr SF"
                min="300"
                max="5000"
                value={formData['1st Flr SF']}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="full-bath">Full Bathrooms:</label>
              <input
                type="number"
                id="full-bath"
                name="Full Bath"
                min="0"
                max="5"
                value={formData['Full Bath']}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="year-built">Year Built:</label>
              <input
                type="number"
                id="year-built"
                name="Year Built"
                min="1800"
                max="2025"
                value={formData['Year Built']}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="year-remod">Year Remodeled:</label>
              <input
                type="number"
                id="year-remod"
                name="Year Remod/Add"
                min="1800"
                max="2025"
                value={formData['Year Remod/Add']}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="garage-cars">Garage Capacity (cars):</label>
              <input
                type="number"
                id="garage-cars"
                name="Garage Cars"
                min="0"
                max="4"
                value={formData['Garage Cars']}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="garage-area">Garage Area (sq ft):</label>
              <input
                type="number"
                id="garage-area"
                name="Garage Area"
                min="0"
                max="1500"
                value={formData['Garage Area']}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="lot-area">Lot Area (sq ft):</label>
              <input
                type="number"
                id="lot-area"
                name="Lot Area"
                min="1000"
                max="50000"
                value={formData['Lot Area']}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="bedrooms">Bedrooms Above Ground:</label>
              <input
                type="number"
                id="bedrooms"
                name="Bedroom AbvGr"
                min="0"
                max="10"
                value={formData['Bedroom AbvGr']}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="total-rooms">Total Rooms Above Ground:</label>
              <input
                type="number"
                id="total-rooms"
                name="TotRms AbvGrd"
                min="2"
                max="15"
                value={formData['TotRms AbvGrd']}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="predict-btn">
            {loading ? 'Predicting...' : 'Predict House Price'}
          </button>
        </form>

        {error && (
          <div className="error-message">
            <h3>Error:</h3>
            <p>{error}</p>
            <p>Make sure your Flask API is running on http://localhost:5000</p>
          </div>
        )}

        {prediction && (
          <div className="prediction-result">
            <h3>🏠 Price Prediction</h3>
            <div className="price-display">
              <span className="price">${prediction.predicted_price?.toLocaleString()}</span>
              <span className="currency">USD</span>
            </div>
            <div className="confidence-range">
              <p>Estimated Range: ${prediction.confidence_range?.lower?.toLocaleString()} - ${prediction.confidence_range?.upper?.toLocaleString()}</p>
            </div>
            <div className="prediction-details">
              <p><strong>Model Version:</strong> {prediction.model_version}</p>
              <p><strong>Timestamp:</strong> {new Date(prediction.timestamp).toLocaleString()}</p>
            </div>
            {prediction.warning && (
              <div className="warning">
                <p><strong>Note:</strong> {prediction.warning}</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
