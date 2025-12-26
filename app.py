from flask import Flask, request, jsonify
import joblib
import numpy as np
import pandas as pd
from flask_cors import CORS
import os
import platform
from dotenv import load_dotenv

# Load environment variables from .env file if it exists
load_dotenv()

# Environment Variables Configuration
class Config:
    """Application configuration from environment variables"""
    
    # Flask configuration
    SECRET_KEY = os.environ.get('SECRET_KEY', 'dev-secret-key-change-in-production')
    FLASK_ENV = os.environ.get('FLASK_ENV', 'development')
    DEBUG = os.environ.get('DEBUG', 'False').lower() == 'true'
    
    # Server configuration
    PORT = int(os.environ.get('PORT', 5000))
    HOST = os.environ.get('HOST', 'localhost')
    
    # API configuration
    API_TITLE = os.environ.get('API_TITLE', 'House Price Prediction API')
    API_VERSION = os.environ.get('API_VERSION', '1.0')
    MAX_REQUEST_SIZE = int(os.environ.get('MAX_REQUEST_SIZE', 1024 * 1024))  # 1MB
    
    # Model configuration
    MODEL_PATH = os.environ.get('MODEL_PATH', 'house_price_model.pkl')
    
    # CORS configuration
    CORS_ORIGINS = os.environ.get('CORS_ORIGINS', '*').split(',')
    
    # Logging configuration
    LOG_LEVEL = os.environ.get('LOG_LEVEL', 'INFO')

# Initialize Flask app with configuration
app = Flask(__name__)
app.config.from_object(Config)

# Configure CORS
CORS(app, origins=Config.CORS_ORIGINS)

# Configure logging
import logging
logging.basicConfig(level=getattr(logging, Config.LOG_LEVEL))
logger = logging.getLogger(__name__)

# Load the trained model
try:
    model_components = joblib.load(Config.MODEL_PATH)
    model = model_components['model']
    scaler = model_components['scaler']
    feature_names = model_components['feature_names']
    target_transform = model_components['target_transform']
    logger.info(f"Model loaded successfully from {Config.MODEL_PATH}")
except Exception as e:
    logger.error(f"Failed to load model: {e}")
    raise
feature_names = model_components['feature_names']
target_transform = model_components['target_transform']

@app.route('/')
def home():
    logger.info("Home endpoint accessed")
    return jsonify({
        'message': Config.API_TITLE,
        'version': Config.API_VERSION,
        'environment': Config.FLASK_ENV,
        'endpoints': {
            'POST /predict': 'Make house price prediction',
            'GET /health': 'Check API health'
        }
    })

@app.route('/health')
def health():
    logger.info("Health check requested")
    return jsonify({
        'status': 'healthy',
        'timestamp': pd.Timestamp.now().isoformat(),
        'environment': Config.FLASK_ENV
    })

@app.route('/predict', methods=['POST'])
def predict():
    try:
        logger.info("Prediction request received")
        
        # Check request size
        if request.content_length and request.content_length > Config.MAX_REQUEST_SIZE:
            logger.warning(f"Request too large: {request.content_length} bytes")
            return jsonify({'error': 'Request too large'}), 413

        # Get JSON data from request
        data = request.get_json()

        if not data:
            logger.warning("No JSON data provided")
            return jsonify({'error': 'No data provided'}), 400

        logger.debug(f"Received prediction data: {list(data.keys())}")

        # Convert to DataFrame
        features_df = pd.DataFrame([data])

        # Ensure all required features are present
        missing_features = []
        for feature in feature_names:
            if feature not in features_df.columns:
                features_df[feature] = 0  # Default value for missing features
                missing_features.append(feature)

        # Select only the features used in training
        features_df = features_df[feature_names]

        # Scale features
        features_scaled = scaler.transform(features_df)

        # Make prediction (log scale)
        pred_log = model.predict(features_scaled)[0]

        # Convert back from log scale
        predicted_price = np.expm1(pred_log)

        # Prepare response
        response = {
            'predicted_price': round(float(predicted_price), 2),
            'currency': 'USD',
            'confidence_range': {
                'lower': round(float(predicted_price * 0.9), 2),  # Rough estimate
                'upper': round(float(predicted_price * 1.1), 2)
            },
            'model_version': '1.0',
            'timestamp': pd.Timestamp.now().isoformat()
        }

        if missing_features:
            response['warning'] = f'Some features were missing and set to default: {missing_features}'
            logger.warning(f"Missing features in prediction: {missing_features}")

        logger.info(f"Prediction completed: ${predicted_price:,.2f}")
        return jsonify(response)

    except ValueError as e:
        logger.error(f"Validation error: {e}")
        return jsonify({'error': f'Invalid input data: {str(e)}'}), 400
    except Exception as e:
        logger.error(f"Prediction error: {e}")
        return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    logger.info(f"Starting {Config.API_TITLE} v{Config.API_VERSION}")
    logger.info(f"Environment: {Config.FLASK_ENV}")
    logger.info(f"Debug mode: {Config.DEBUG}")
    logger.info(f"Server will run on {Config.HOST}:{Config.PORT}")
    
    print("Starting House Price Prediction API...")
    print(f"API will be available at: http://{Config.HOST}:{Config.PORT}")
    print(f"Environment: {Config.FLASK_ENV}")
    print("Test with: curl -X POST http://localhost:{}/predict -H 'Content-Type: application/json' -d '{{\"Overall Qual\": 7, \"Gr Liv Area\": 1710, \"Total Bsmt SF\": 856}}'".format(Config.PORT))
    
    # Use production server for production environment
    if Config.FLASK_ENV == 'production':
        from gunicorn.app.wsgiapp import WSGIApplication
        WSGIApplication("%(prog)s [OPTIONS] [APP_MODULE]").run()
    else:
        # Development server
        app.run(
            host=Config.HOST, 
            port=Config.PORT, 
            debug=Config.DEBUG
        )