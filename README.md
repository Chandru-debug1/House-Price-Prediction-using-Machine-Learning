<<<<<<< HEAD
# House Price Prediction - React Frontend

A modern React web application for predicting house prices using machine learning.

## Features

- 🏠 Interactive house price prediction form
- 📊 Real-time price estimation with confidence ranges
- 🎨 Modern, responsive UI design
- 🔗 Seamless integration with Flask API backend

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Running Flask API backend on `http://localhost:5000`

## Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

1. **Start the Flask API backend first:**
   ```bash
   # In the main project directory
   python app.py
   ```

2. **Start the React development server:**
   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Fill in the house features in the form:
   - Overall Quality (1-10 scale)
   - Ground Living Area (square feet)
   - Total Basement Area (square feet)
   - First Floor Area (square feet)
   - Number of Full Bathrooms
   - Year Built
   - Year Remodeled
   - Garage Capacity (number of cars)
   - Garage Area (square feet)
   - Lot Area (square feet)
   - Bedrooms Above Ground
   - Total Rooms Above Ground

2. Click "Predict House Price"

3. View the predicted price with confidence range

## API Integration

The frontend communicates with a Flask API backend that uses a trained Random Forest model. The API endpoint expects:

- **URL:** `/predict`
- **Method:** POST
- **Content-Type:** application/json
- **Body:** JSON object with house features

Example request:
```json
{
  "Overall Qual": 7,
  "Gr Liv Area": 1710,
  "Total Bsmt SF": 856,
  "1st Flr SF": 856,
  "Full Bath": 2,
  "Year Built": 2003,
  "Year Remod/Add": 2003,
  "Garage Cars": 2,
  "Garage Area": 548,
  "Lot Area": 8450,
  "Bedroom AbvGr": 3,
  "TotRms AbvGrd": 8
}
```

## Building for Production

```bash
npm run build
```

This creates a `build` directory with optimized production files.
=======
# House Price Prediction Project

## Overview

This project implements a machine learning model to predict house prices using the Ames Housing dataset. The system includes:

- **Data Preprocessing**: Cleaning, feature engineering, and transformation
- **Model Training**: Random Forest regression model
- **API Deployment**: Flask-based REST API for predictions
- **Containerization**: Docker support for easy deployment

## Dataset

The project uses the Ames Housing dataset, which contains 79 explanatory variables describing residential homes in Ames, Iowa. The target variable is the sale price of the houses.

**Data Source**: The dataset can be downloaded from [Kaggle Ames Housing Dataset](https://www.kaggle.com/datasets/prevek18/ames-housing-dataset) or the original source at DePaul University.

Place the `AmesHousing.csv` file in the project root directory.

## Installation

1. **Clone or download the project files**

2. **Create a virtual environment** (optional but recommended):
   ```bash
   python -m venv .venv
   # On Windows:
   .venv\Scripts\activate
   # On macOS/Linux:
   source .venv/bin/activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Download the dataset**:
   - Download `AmesHousing.csv` from Kaggle
   - Place it in the project root directory

## Model Training

To train the model, you need to run the training script. Since the detailed notebook is not included, here's a summary of the training process:

### Training Steps

1. **Data Loading and Cleaning**:
   - Load the AmesHousing.csv dataset
   - Handle missing values (median for numerical, mode for categorical)
   - Remove duplicates

2. **Feature Engineering**:
   - Create new features: Total SF, House Age, Years Since Remodel, Total Bathrooms, etc.
   - Encode categorical variables (ordinal and nominal)
   - Scale numerical features

3. **Model Training**:
   - Split data into train/test sets (80/20)
   - Log-transform target variable (SalePrice)
   - Train Random Forest Regressor
   - Evaluate performance

### Running Training

Create a `train.py` file with the training code (based on the original notebook):

```python
# train.py
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import joblib

# Load data
df = pd.read_csv('AmesHousing.csv')

# Basic cleaning (simplified)
df = df.dropna(subset=['SalePrice'])
numerical_cols = df.select_dtypes(include=[np.number]).columns
for col in numerical_cols:
    if df[col].isnull().sum() > 0:
        df[col].fillna(df[col].median(), inplace=True)

categorical_cols = df.select_dtypes(include=['object']).columns
for col in categorical_cols:
    if df[col].isnull().sum() > 0:
        df[col].fillna(df[col].mode()[0], inplace=True)

# Feature engineering (simplified)
df['Total SF'] = df['Total Bsmt SF'] + df['1st Flr SF'] + df['2nd Flr SF']
df['House Age'] = df['Yr Sold'] - df['Year Built']
df['Total Bathrooms'] = (df['Bsmt Full Bath'] + df['Bsmt Half Bath'] * 0.5 +
                        df['Full Bath'] + df['Half Bath'] * 0.5)

# Select important features (simplified)
features = ['Overall Qual', 'Gr Liv Area', 'Total Bsmt SF', '1st Flr SF',
           'Full Bath', 'Year Built', 'Year Remod/Add', 'Garage Cars',
           'Garage Area', 'Total SF', 'House Age', 'Total Bathrooms']

X = df[features]
y = np.log1p(df['SalePrice'])

# Split and scale
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Train model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train_scaled, y_train)

# Evaluate
pred_log = model.predict(X_test_scaled)
pred = np.expm1(pred_log)
y_test_actual = np.expm1(y_test)

mae = mean_absolute_error(y_test_actual, pred)
rmse = np.sqrt(mean_squared_error(y_test_actual, pred))
r2 = r2_score(y_test_actual, pred)

print(f"MAE: ${mae:,.2f}")
print(f"RMSE: ${rmse:,.2f}")
print(f"R² Score: {r2:.4f}")

# Save model
model_components = {
    'model': model,
    'scaler': scaler,
    'feature_names': features,
    'target_transform': 'log1p'
}
joblib.dump(model_components, 'house_price_model.pkl')
print("Model saved as 'house_price_model.pkl'")
```

Run the training:
```bash
python train.py
```

This will create `house_price_model.pkl` with the trained model.

## Running the API

Once the model is trained, start the Flask API:

```bash
python app.py
```

The API will be available at `http://localhost:5000`

### API Endpoints

- **GET /**: API information and available endpoints
- **GET /health**: Health check
- **POST /predict**: Make house price prediction

### Using the API

#### Health Check
```bash
curl http://localhost:5000/health
```

#### Make Prediction
Send a POST request with house features in JSON format:

```bash
curl -X POST http://localhost:5000/predict \
  -H "Content-Type: application/json" \
  -d '{
    "Overall Qual": 7,
    "Gr Liv Area": 1710,
    "Total Bsmt SF": 856,
    "1st Flr SF": 856,
    "Full Bath": 2,
    "Year Built": 2003,
    "Year Remod/Add": 2003,
    "Garage Cars": 2,
    "Garage Area": 548,
    "Total SF": 2566,
    "House Age": 14,
    "Total Bathrooms": 2.5
  }'
```

**Response**:
```json
{
  "predicted_price": 185000.0,
  "currency": "USD"
}
```

#### Python Example
```python
import requests

url = 'http://localhost:5000/predict'
data = {
    "Overall Qual": 7,
    "Gr Liv Area": 1710,
    "Total Bsmt SF": 856,
    "1st Flr SF": 856,
    "Full Bath": 2,
    "Year Built": 2003,
    "Year Remod/Add": 2003,
    "Garage Cars": 2,
    "Garage Area": 548,
    "Total SF": 2566,
    "House Age": 14,
    "Total Bathrooms": 2.5
}

response = requests.post(url, json=data)
result = response.json()
print(f"Predicted Price: ${result['predicted_price']:,.2f}")
```

## Deployment

### Local Deployment

1. Train the model: `python train.py`
2. Start the API: `python app.py`
3. Access at `http://localhost:5000`

### Docker Deployment

If you have Docker installed:

1. **Build the image**:
   ```bash
   docker build -t house-price-api .
   ```

2. **Run the container**:
   ```bash
   docker run -p 5000:5000 house-price-api
   ```

### Cloud Deployment

For production deployment, consider:

- **Heroku**: Use the provided `Procfile`
- **AWS/GCP/Azure**: Deploy as container or serverless function
- **Railway/Render**: Simple deployment platforms
>>>>>>> 8203cdef13b405fec4e9fb5600058a5db4446d36

## Project Structure

```
<<<<<<< HEAD
frontend/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── App.js          # Main application component
│   ├── App.css         # Application styles
│   ├── index.js        # Application entry point
│   └── ...
├── package.json        # Dependencies and scripts
└── README.md          # This file
```

## Technologies Used

- **React 18** - Frontend framework
- **CSS3** - Styling with modern features
- **Fetch API** - HTTP requests
- **Responsive Design** - Mobile-friendly interface

## Troubleshooting

**API Connection Issues:**
- Ensure the Flask backend is running on port 5000
- Check browser console for CORS errors
- Verify the API is accessible at `http://localhost:5000/health`

**Form Validation:**
- All fields are required
- Numeric inputs have min/max validation
- Check browser console for validation errors
=======
house-price-prediction/
├── app.py                 # Flask API application
├── train.py              # Model training script
├── requirements.txt      # Python dependencies
├── house_price_model.pkl # Trained model (generated)
├── AmesHousing.csv       # Dataset (download separately)
├── Dockerfile           # Docker configuration
├── Procfile             # Heroku deployment
├── README.md            # This file
└── .venv/               # Virtual environment
```

## Model Performance

The Random Forest model typically achieves:
- **MAE**: ~$18,000 - $22,000
- **RMSE**: ~$28,000 - $35,000
- **R² Score**: 0.85 - 0.90

## Troubleshooting

### Common Issues

1. **Model file not found**: Run `python train.py` first
2. **Missing dependencies**: Run `pip install -r requirements.txt`
3. **Port already in use**: Change the port in `app.py` or kill the process
4. **CORS errors**: The API has CORS enabled for web applications

### Missing Features

If some features are missing in prediction requests, they default to 0. For better accuracy, provide all features.
>>>>>>> 8203cdef13b405fec4e9fb5600058a5db4446d36

## Contributing

1. Fork the repository
2. Create a feature branch
<<<<<<< HEAD
3. Make your changes
=======
3. Make changes
>>>>>>> 8203cdef13b405fec4e9fb5600058a5db4446d36
4. Test thoroughly
5. Submit a pull request

## License

<<<<<<< HEAD
This project is licensed under the MIT License.

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
=======
This project is for educational purposes. Check dataset license for commercial use.

## Author

[Your Name]
Date: December 2025
>>>>>>> 8203cdef13b405fec4e9fb5600058a5db4446d36
