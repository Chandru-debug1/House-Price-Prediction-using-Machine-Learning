import React, { useState, useEffect } from 'react';
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
  const [currentStep, setCurrentStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);
  useEffect(() => {
    if (showResults) {
      const createConfetti = () => {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.backgroundColor = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'][Math.floor(Math.random() * 6)];
        document.body.appendChild(confetti);

        setTimeout(() => {
          if (confetti.parentNode) {
            confetti.parentNode.removeChild(confetti);
          }
        }, 4000);
      };

      // Create multiple confetti pieces
      for (let i = 0; i < 50; i++) {
        setTimeout(createConfetti, i * 100);
      }
    }
  }, [showResults]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value) || value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setShowResults(false);
    setProgress(0);
    setAnimationKey(prev => prev + 1);

    // Simulate progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

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
      setProgress(100);
      setPrediction(result);

      // Add delay for better UX
      setTimeout(() => {
        setShowResults(true);
        setIsLoading(false);
      }, 500);

    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      clearInterval(progressInterval);
    }
  };

  const resetForm = () => {
    setPrediction(null);
    setShowResults(false);
    setError(null);
    setCurrentStep(0);
    setProgress(0);
    setAnimationKey(prev => prev + 1);
  };

  // Form sections for better organization
  const formSections = [
    {
      title: "🏠 Basic Property Info",
      icon: "🏠",
      fields: [
        { name: 'Overall Qual', label: 'Overall Quality', type: 'range', min: 1, max: 10, step: 1 },
        { name: 'Lot Area', label: 'Lot Area (sq ft)', type: 'number', min: 1000, max: 50000 },
        { name: 'Year Built', label: 'Year Built', type: 'number', min: 1800, max: 2025 }
      ]
    },
    {
      title: "🏡 Living Spaces",
      icon: "🏡",
      fields: [
        { name: 'Gr Liv Area', label: 'Ground Living Area (sq ft)', type: 'number', min: 300, max: 10000 },
        { name: 'Total Bsmt SF', label: 'Total Basement (sq ft)', type: 'number', min: 0, max: 5000 },
        { name: '1st Flr SF', label: 'First Floor (sq ft)', type: 'number', min: 300, max: 5000 }
      ]
    },
    {
      title: "🚗 Garage & Amenities",
      icon: "🚗",
      fields: [
        { name: 'Garage Cars', label: 'Garage Capacity', type: 'range', min: 0, max: 4, step: 1 },
        { name: 'Garage Area', label: 'Garage Area (sq ft)', type: 'number', min: 0, max: 1500 },
        { name: 'Year Remod/Add', label: 'Year Remodeled', type: 'number', min: 1800, max: 2025 }
      ]
    },
    {
      title: "👥 Rooms & Facilities",
      icon: "👥",
      fields: [
        { name: 'Full Bath', label: 'Full Bathrooms', type: 'range', min: 0, max: 5, step: 1 },
        { name: 'Bedroom AbvGr', label: 'Bedrooms', type: 'range', min: 0, max: 10, step: 1 },
        { name: 'TotRms AbvGrd', label: 'Total Rooms', type: 'range', min: 2, max: 15, step: 1 }
      ]
    }
  ];

  return (
    <div className="App">
      {/* Animated Background */}
      <div className="animated-bg">
        <div className="bg-shape shape-1"></div>
        <div className="bg-shape shape-2"></div>
        <div className="bg-shape shape-3"></div>
      </div>

      {/* Header */}
      <header className="hero-section">
        <div className="hero-content">
          <div className="hero-icon">🏠</div>
          <h1 className="hero-title">
            <span className="gradient-text">House Price</span>
            <br />
            <span className="hero-subtitle">Predictor</span>
          </h1>
          <p className="hero-description">
            Discover your dream home's market value with our AI-powered prediction tool.
            Get accurate estimates in seconds!
          </p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">85%</span>
              <span className="stat-label">Accuracy</span>
            </div>
            <div className="stat">
              <span className="stat-number">10K+</span>
              <span className="stat-label">Predictions</span>
            </div>
            <div className="stat">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Available</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {!showResults ? (
          <div className="prediction-form-container">
            <div className="form-header">
              <h2>Enter Property Details</h2>
              <p>Fill in the information below to get an instant price prediction</p>
            </div>

            <form onSubmit={handleSubmit} className="prediction-form">
              {formSections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="form-section">
                  <div className="section-header">
                    <span className="section-icon">{section.icon}</span>
                    <h3 className="section-title">{section.title}</h3>
                  </div>

                  <div className="section-fields">
                    {section.fields.map((field, fieldIndex) => (
                      <div key={fieldIndex} className="form-field">
                        <label htmlFor={field.name} className="field-label">
                          {field.label}
                        </label>

                        {field.type === 'range' ? (
                          <div className="range-input-container">
                            <input
                              type="range"
                              id={field.name}
                              name={field.name}
                              min={field.min}
                              max={field.max}
                              step={field.step}
                              value={formData[field.name]}
                              onChange={handleInputChange}
                              className="range-input"
                            />
                            <div className="range-value">
                              <span className="value-display">{formData[field.name]}</span>
                              {field.name === 'Overall Qual' && (
                                <span className="quality-label">
                                  {formData[field.name] <= 3 ? 'Poor' :
                                   formData[field.name] <= 5 ? 'Fair' :
                                   formData[field.name] <= 7 ? 'Good' :
                                   formData[field.name] <= 9 ? 'Excellent' : 'Outstanding'}
                                </span>
                              )}
                            </div>
                          </div>
                        ) : (
                          <input
                            type={field.type}
                            id={field.name}
                            name={field.name}
                            min={field.min}
                            max={field.max}
                            value={formData[field.name]}
                            onChange={handleInputChange}
                            className="text-input"
                            placeholder={`Enter ${field.label.toLowerCase()}`}
                            required
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {error && (
                <div className="error-message">
                  <div className="error-icon">⚠️</div>
                  <div className="error-content">
                    <h3>Prediction Error</h3>
                    <p>{error}</p>
                    <p className="error-hint">Make sure the backend API is running on port 5000</p>
                  </div>
                </div>
              )}

              <div className="form-actions">
                {isLoading && (
                  <div className="progress-container">
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <div className="progress-text">
                      {progress < 30 && "Analyzing property data..."}
                      {progress >= 30 && progress < 70 && "Processing with AI model..."}
                      {progress >= 70 && progress < 100 && "Generating prediction..."}
                      {progress >= 100 && "Complete!"}
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="predict-button"
                >
                  {isLoading ? (
                    <>
                      <div className="loading-spinner"></div>
                      <span>Analyzing Property...</span>
                    </>
                  ) : (
                    <>
                      <span className="button-icon">🔮</span>
                      <span>Predict House Price</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="results-container">
            <div className="results-header">
              <div className="success-icon">🎉</div>
              <h2>Prediction Complete!</h2>
              <p>Your property valuation is ready</p>
            </div>

            <div className="price-display">
              <div className="price-card">
                <div className="price-label">Estimated Value</div>
                <div className="price-amount">
                  <span className="currency">$</span>
                  <span className="amount">
                    {prediction?.predicted_price?.toLocaleString()}
                  </span>
                </div>
                <div className="price-subtitle">USD</div>
              </div>

              <div className="confidence-range">
                <div className="range-header">
                  <span className="range-icon">📊</span>
                  <span>Confidence Range</span>
                </div>
                <div className="range-values">
                  <div className="range-item">
                    <span className="range-label">Low</span>
                    <span className="range-value">
                      ${prediction?.confidence_range?.lower?.toLocaleString()}
                    </span>
                  </div>
                  <div className="range-item">
                    <span className="range-label">High</span>
                    <span className="range-value">
                      ${prediction?.confidence_range?.upper?.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="prediction-details">
              <div className="detail-item">
                <span className="detail-icon">🤖</span>
                <span className="detail-label">Model Version:</span>
                <span className="detail-value">{prediction?.model_version}</span>
              </div>
              <div className="detail-item">
                <span className="detail-icon">🕒</span>
                <span className="detail-label">Generated:</span>
                <span className="detail-value">
                  {new Date(prediction?.timestamp).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Property Insights */}
            <div className="property-insights">
              <h3>🏠 Property Insights</h3>
              <div className="insights-grid">
                <div className="insight-card">
                  <div className="insight-icon">📊</div>
                  <div className="insight-content">
                    <h4>Market Position</h4>
                    <p>
                      {prediction?.predicted_price > 300000 ? 'Premium Property' :
                       prediction?.predicted_price > 200000 ? 'Mid-Range Property' :
                       'Affordable Property'}
                    </p>
                  </div>
                </div>
                <div className="insight-card">
                  <div className="insight-icon">📈</div>
                  <div className="insight-content">
                    <h4>Investment Potential</h4>
                    <p>
                      {formData['Year Built'] > 2000 ? 'Modern construction with good resale value' :
                       formData['Year Built'] > 1980 ? 'Well-maintained with stable appreciation' :
                       'Character property with renovation potential'}
                    </p>
                  </div>
                </div>
                <div className="insight-card">
                  <div className="insight-icon">🏘️</div>
                  <div className="insight-content">
                    <h4>Property Type</h4>
                    <p>
                      {formData['TotRms AbvGrd'] > 8 ? 'Large family home' :
                       formData['TotRms AbvGrd'] > 6 ? 'Comfortable family home' :
                       'Cozy starter home'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {prediction?.warning && (
              <div className="warning-notice">
                <span className="warning-icon">ℹ️</span>
                <p>{prediction.warning}</p>
              </div>
            )}

            <div className="results-actions">
              <button onClick={resetForm} className="new-prediction-button">
                <span className="button-icon">🔄</span>
                <span>New Prediction</span>
              </button>
              <button onClick={() => window.print()} className="share-button">
                <span className="button-icon">📤</span>
                <span>Share Results</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-content">
          <p>Powered by Machine Learning • Built with React & Flask</p>
          <div className="footer-links">
            <a href="https://github.com/Chandru-debug1/House-Price-Prediction-using-Machine-Learning" target="_blank" rel="noopener noreferrer">
              <span>📂</span> View Source
            </a>
            <a href="/health" target="_blank">
              <span>❤️</span> API Health
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
