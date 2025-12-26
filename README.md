# 🏠 House Price Prediction - Full Stack Application

A complete machine learning application with a React frontend and Flask API backend for predicting house prices using the Ames Housing dataset.

## 🚀 Features

- **Machine Learning Model**: Random Forest regression trained on Ames Housing dataset
- **Flask REST API**: Robust backend with CORS support and environment configuration
- **React Frontend**: Modern, responsive web interface for price predictions
- **Real-time Predictions**: Interactive form with instant price estimation
- **Confidence Ranges**: Price predictions with estimated ranges
- **Production Ready**: Environment variables, logging, and error handling

## 📊 Dataset

The project uses the Ames Housing dataset containing 79 explanatory variables describing residential homes in Ames, Iowa.

**Data Source**: [Kaggle Ames Housing Dataset](https://www.kaggle.com/datasets/prevek18/ames-housing-dataset)

## 🛠️ Tech Stack

### Backend
- **Python 3.9+**
- **Flask** - Web framework
- **scikit-learn** - Machine learning
- **pandas/numpy** - Data processing
- **joblib** - Model serialization

### Frontend
- **React 18** - UI framework
- **CSS3** - Modern styling
- **Fetch API** - HTTP requests

## 📁 Project Structure

```
house-price-prediction/
├── app.py                 # Flask API application
├── train.py              # Model training script
├── test_api.py           # API testing script
├── requirements.txt      # Python dependencies
├── .env.example          # Environment configuration template
├── .gitignore           # Git ignore rules
├── AmesHousing.csv      # Dataset (download separately)
├── house_price_model.pkl # Trained model (generated)
├── frontend/            # React application
│   ├── src/
│   │   ├── App.js       # Main React component
│   │   ├── App.css      # Application styles
│   │   └── ...
│   ├── package.json     # Node.js dependencies
│   └── README.md        # Frontend documentation
└── README.md            # This file
```

## 🚀 Quick Start

### Prerequisites
- Python 3.9+
- Node.js 14+
- Git

### 1. Clone and Setup Backend

```bash
# Install Python dependencies
pip install -r requirements.txt

# Download the dataset
# Place AmesHousing.csv in the project root
```

### 2. Train the Model

```bash
python train.py
```

This creates `house_price_model.pkl` with the trained model.

### 3. Setup Frontend

```bash
cd frontend
npm install
cd ..
```

### 4. Run the Application

**Option A: Run Backend and Frontend Separately**

Terminal 1 - Start Flask API:
```bash
python app.py
```

Terminal 2 - Start React App:
```bash
cd frontend
npm start
```

**Option B: Run Everything with Scripts**

Create a batch file or use multiple terminals as above.

### 5. Access the Application

- **Frontend**: http://localhost:3000
- **API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/health

## 🎯 Usage

1. Open http://localhost:3000 in your browser
2. Fill in house features (quality, size, year built, etc.)
3. Click "Predict House Price"
4. View the predicted price with confidence range

## 🔧 API Endpoints

### POST /predict
Predict house price based on features.

**Request Body:**
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

**Response:**
```json
{
  "predicted_price": 208500,
  "currency": "USD",
  "confidence_range": {
    "lower": 187650,
    "upper": 229350
  },
  "model_version": "1.0",
  "timestamp": "2024-01-15T10:30:00"
}
```

### GET /health
Check API health status.

## 🧪 Testing

### Test the API
```bash
python test_api.py
```

### Test the Frontend
```bash
cd frontend
npm test
```

## 🔐 Environment Configuration

1. Copy `.env.example` to `.env`
2. Update values as needed:
   ```env
   SECRET_KEY=your-secret-key-here
   FLASK_ENV=development
   PORT=5000
   ```

## 🚢 Free Hosting & Deployment

### 🚀 Recommended: Render.com (Free Tier - 750 hours/month)

**Step 1: Prepare for Deployment**
```bash
# Run deployment preparation script (Windows)
deploy.bat

# OR manually:
cd frontend && npm install && npm run build
git init && git add . && git commit -m "Initial commit"
```

**Step 2: Create GitHub Repository**
```bash
# Create new repository on GitHub
# Then push your code:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

**Step 3: Deploy Backend (Flask API)**
1. Go to [render.com](https://render.com) and sign up
2. Create new **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Runtime**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
   - **Environment Variables**: Copy from `.env.example`

**Step 4: Deploy Frontend (React)**
1. Create new **"Static Site"**
2. Connect same GitHub repository
3. Configure:
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/build`

### ⚡ Alternative: Railway.app (Super Easy - 512MB RAM free)

1. Go to [railway.app](https://railway.app) and sign up
2. Click **"Deploy from GitHub"**
3. Connect your repository
4. Railway auto-detects Python and deploys automatically!
5. Add environment variables in Railway dashboard

**That's it!** Railway handles everything automatically.

### 🎯 Alternative: Vercel (Modern - Handles both frontend & backend)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy (handles both frontend and backend)
vercel --prod
```

### 📊 Deployment Files Included

- `render.yaml` - Render.com configuration
- `vercel.json` - Vercel configuration
- `deploy.bat` - Windows deployment preparation script

## 🧪 Testing

### Test the API
```bash
python test_api.py
```

### Test the Frontend
```bash
cd frontend
npm test
```

1. Fork the repository
2. Create a feature branch
3. Make changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - feel free to use this project for learning and commercial purposes.

## 🙏 Acknowledgments

- Ames Housing Dataset creators
- scikit-learn and Flask communities
- React and Node.js communities
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

## Project Structure

```
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

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for educational purposes. Check dataset license for commercial use.

## Author

[Your Name]
Date: December 2025