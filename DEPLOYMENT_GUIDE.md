# House Price Prediction API - Deployment Guide

## Local Execution

### Prerequisites
- Conda environment set up
- All dependencies installed

### Steps to Run Locally

1. **Activate Environment**
   ```bash
   conda activate house-price-env
   ```

2. **Train Model (if needed)**
   ```bash
   python train.py
   ```
   This will create `house_price_model.pkl`

3. **Start API Server**
   ```bash
   python app.py
   ```
   Server will run on `http://localhost:5000`

4. **Test API**
   ```bash
   python test_api.py
   ```

5. **Make Predictions**
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
       "Years Since Remodel": 14,
       "Total Bathrooms": 2.5,
       "Has Garage": 1,
       "Has Basement": 1
     }'
   ```

## Free Deployment Options

### 1. Render.com (Recommended)

**Features:**
- Free tier: 750 hours/month
- Automatic SSL
- Custom domains
- PostgreSQL database (paid)

**Deployment Steps:**

1. **Create Account**
   - Go to https://render.com
   - Sign up with GitHub

2. **Connect Repository**
   - Click "New" → "Web Service"
   - Connect your GitHub repo: `https://github.com/Chandru-debug1/House-Price-Prediction-using-Machine-Learning.git`

3. **Configure Service**
   - **Name**: house-price-api
   - **Environment**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `python app.py`

4. **Environment Variables** (if needed)
   - Add any required environment variables

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)

**URL**: `https://your-service-name.onrender.com`

### 2. Railway.app

**Features:**
- Free tier: $5/month credit
- PostgreSQL, Redis included
- Easy GitHub integration

**Deployment Steps:**

1. **Create Account**
   - Go to https://railway.app
   - Sign up with GitHub

2. **Create Project**
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository

3. **Configure**
   - Railway auto-detects Python
   - Add environment variables if needed

4. **Deploy**
   - Railway will build and deploy automatically

### 3. PythonAnywhere.com

**Features:**
- Free tier: 1 web app, limited CPU
- Python 3.9+ support
- MySQL database

**Deployment Steps:**

1. **Create Account**
   - Go to https://www.pythonanywhere.com
   - Sign up for free account

2. **Upload Files**
   - Use "Files" tab to upload your project files
   - Or use Git: `git clone https://github.com/Chandru-debug1/House-Price-Prediction-using-Machine-Learning.git`

3. **Create Web App**
   - Go to "Web" tab → "Add a new web app"
   - Choose "Flask" → "Python 3.9"
   - Set path to your app.py

4. **Configure WSGI**
   - Edit the WSGI configuration file
   - Point to your Flask app

5. **Reload**
   - Click "Reload" to deploy

### 4. Replit.com

**Features:**
- Free tier available
- Built-in IDE
- Easy deployment

**Deployment Steps:**

1. **Create Account**
   - Go to https://replit.com
   - Sign up

2. **Import from GitHub**
   - Click "Create" → "Import from GitHub"
   - Paste your repo URL

3. **Configure**
   - Replit auto-detects Python/Flask
   - Add `requirements.txt` dependencies

4. **Deploy**
   - Click "Run" to start
   - Use "Deploy" button for public URL

## API Usage Examples

### Health Check
```bash
curl https://your-api-url.onrender.com/health
```

### Prediction Request
```python
import requests

url = 'https://your-api-url.onrender.com/predict'
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
    "Years Since Remodel": 14,
    "Total Bathrooms": 2.5,
    "Has Garage": 1,
    "Has Basement": 1
}

response = requests.post(url, json=data)
result = response.json()
print(f"Predicted Price: ${result['predicted_price']:,.2f}")
```

## Troubleshooting

### Common Issues

1. **Model not found**: Ensure `house_price_model.pkl` is in the repository
2. **Dependencies**: Check that all packages in `requirements.txt` are installed
3. **Port issues**: Free tiers may have port restrictions
4. **Memory limits**: Large models may exceed free tier limits

### Performance Optimization

- **Model size**: Compress or optimize the model file
- **Dependencies**: Remove unused packages
- **Caching**: Implement response caching for better performance

## Cost Comparison

| Platform | Free Tier | Paid Plan | Best For |
|----------|-----------|-----------|----------|
| Render | 750 hrs/month | $7/month | Production apps |
| Railway | $5 credit | $5/month | Full-stack apps |
| PythonAnywhere | Limited | $5/month | Python apps |
| Replit | Basic | $7/month | Prototyping |

## Production Server Setup

For production deployment, replace the development server with a WSGI server:

## Environment Variables

The application supports comprehensive environment variable configuration for different deployment environments.

### Configuration Options

Copy `.env.example` to `.env` and customize the values:

```bash
cp .env.example .env
```

### Available Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `SECRET_KEY` | dev-secret-key | Flask secret key for sessions |
| `FLASK_ENV` | development | Environment (development/production) |
| `DEBUG` | false | Enable debug mode |
| `PORT` | 5000 | Server port |
| `HOST` | localhost | Server host |
| `API_TITLE` | House Price Prediction API | API title |
| `API_VERSION` | 1.0 | API version |
| `MAX_REQUEST_SIZE` | 1048576 | Max request size in bytes |
| `MODEL_PATH` | house_price_model.pkl | Path to model file |
| `CORS_ORIGINS` | * | Allowed CORS origins (comma-separated) |
| `LOG_LEVEL` | INFO | Logging level (DEBUG, INFO, WARNING, ERROR) |

### Production Environment Variables

For production deployment, set these variables:

```bash
FLASK_ENV=production
DEBUG=false
SECRET_KEY=your-secure-random-key-here
LOG_LEVEL=WARNING
```

### Platform-Specific Setup

#### Render.com
Add environment variables in the dashboard:
- `FLASK_ENV=production`
- `DEBUG=false`
- `PORT` (automatically set)

#### Railway.app
Set environment variables in project settings:
- `FLASK_ENV=production`
- `DEBUG=false`

#### PythonAnywhere
Set environment variables in the web app configuration or use a `.env` file.

## Support

For issues:
1. Check the logs in your deployment platform
2. Test locally first
3. Verify all files are uploaded
4. Check environment variables

Date: December 2025