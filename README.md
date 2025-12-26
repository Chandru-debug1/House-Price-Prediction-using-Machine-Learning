# 🏠 House Price Prediction - Full Stack Application

A complete machine learning application with a React frontend and Flask API backend for predicting house prices using the Ames Housing dataset.

## 🚀 Features

- **Machine Learning Model**: Random Forest regression trained on Ames Housing dataset
- **Flask REST API**: Robust backend with CORS support and environment configuration
- **React Frontend**: Modern, responsive web interface for price predictions
- **Real-time Predictions**: Interactive form with instant price estimation
- **Confidence Ranges**: Price predictions with estimated ranges
- **Production Ready**: Environment variables, logging, and error handling
- **Free Hosting**: Ready for deployment on Railway, Render, or Vercel

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
- **Gunicorn** - Production WSGI server

### Frontend
- **React 18** - UI framework
- **CSS3** - Modern styling
- **Fetch API** - HTTP requests
- **Responsive Design** - Mobile-friendly

## 📁 Project Structure

```
house-price-prediction/
├── app.py                    # Flask API application
├── train.py                  # Model training script
├── test_api.py              # API testing script
├── requirements.txt         # Python dependencies
├── .env.example            # Environment configuration template
├── AmesHousing.csv         # Dataset
├── house_price_model.pkl   # Trained model
├── run_app.bat            # Windows launcher script
├── deploy.bat             # Deployment preparation script
├── render.yaml            # Render.com configuration
├── vercel.json            # Vercel configuration
├── README.md              # This file
└── frontend/              # React application
    ├── src/
    │   ├── App.js         # Main prediction interface
    │   ├── App.css        # Application styles
    │   └── ...
    ├── package.json       # Node.js dependencies
    └── README.md          # Frontend documentation
```

## 🚀 Quick Start

### Prerequisites
- Python 3.9+
- Node.js 14+
- Git

### 1. Clone and Setup

```bash
# Clone the repository
git clone https://github.com/Chandru-debug1/House-Price-Prediction-using-Machine-Learning.git
cd house-price-prediction

# Install Python dependencies
pip install -r requirements.txt

# Setup environment
cp .env.example .env
# Edit .env with your settings
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

**Option A: One-Click Launch (Windows)**
```bash
run_app.bat
```

**Option B: Manual Launch**
```bash
# Terminal 1: Start Flask API
python app.py

# Terminal 2: Start React Frontend
cd frontend && npm start
```

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

## 🚢 Free Hosting & Deployment

### 🚀 Recommended: Railway.app (Super Easy - 512MB RAM free)

1. Go to [railway.app](https://railway.app) and sign up
2. Click **"Deploy from GitHub"**
3. Connect your repository: `Chandru-debug1/House-Price-Prediction-using-Machine-Learning`
4. Railway auto-detects Python and deploys automatically!
5. Add environment variables in Railway dashboard

**That's it!** Railway handles everything automatically.

### 🔧 Alternative: Render.com (Professional - 750 hours/month free)

**Step 1: Prepare for Deployment**
```bash
deploy.bat  # Windows - builds React and prepares for deployment
```

**Step 2: Deploy Backend (Flask API)**
1. Go to [render.com](https://render.com) and sign up
2. Create new **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Runtime**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
   - **Environment Variables**: Copy from `.env.example`

**Step 3: Deploy Frontend (React)**
1. Create new **"Static Site"**
2. Connect same GitHub repository
3. Configure:
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/build`

### 🎯 Alternative: Vercel (Modern - Handles both frontend & backend)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy (handles both frontend and backend)
vercel --prod
```

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
   MODEL_PATH=house_price_model.pkl
   ```

## 📊 Model Performance

The Random Forest model achieves:
- **MAE**: ~$18,000 - $22,000
- **RMSE**: ~$28,000 - $35,000
- **R² Score**: 0.85 - 0.90

## 🐛 Troubleshooting

### Common Issues

1. **Model file not found**: Run `python train.py` first
2. **Missing dependencies**: Run `pip install -r requirements.txt`
3. **Port already in use**: Change the port in `app.py`
4. **CORS errors**: API has CORS enabled for web applications
5. **React not starting**: Run `cd frontend && npm install`

### Missing Features

If some features are missing in prediction requests, they default to 0. For better accuracy, provide all features.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is for educational purposes. Check dataset license for commercial use.

## 👨‍💻 Author

Chandru-debug1
Date: December 2025