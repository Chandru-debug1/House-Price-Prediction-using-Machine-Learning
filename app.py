from flask import Flask, request, jsonify
import joblib
import numpy as np
import pandas as pd
from flask_cors import CORS
import os
import platform

app = Flask(__name__)
CORS(app)  # Enable CORS for web applications

# Load the trained model
model_components = joblib.load('house_price_model.pkl')
model = model_components['model']
scaler = model_components['scaler']
feature_names = model_components['feature_names']
target_transform = model_components['target_transform']

@app.route('/')
def home():
    return jsonify({
        'message': 'House Price Prediction API',
        'version': '1.0',
        'endpoints': {
            'POST /predict': 'Make house price prediction',
            'GET /health': 'Check API health'
        }
    })

@app.route('/health')
def health():
    return jsonify({'status': 'healthy'})

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get JSON data from request
        data = request.get_json()

        if not data:
            return jsonify({'error': 'No data provided'}), 400

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
            }
        }

        if missing_features:
            response['warning'] = f'Some features were missing and set to default: {missing_features}'

        return jsonify(response)

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    print("Starting House Price Prediction API...")
    print(f"API will be available at: http://localhost:{port}")
    print("Test with: curl -X POST http://localhost:{port}/predict -H 'Content-Type: application/json' -d '{\"Overall Qual\": 7, \"Gr Liv Area\": 1710, \"Total Bsmt SF\": 856}'")
    
    if platform.system() == 'Windows':
        # Use Flask's built-in server for Windows development
        app.run(host='localhost', port=port, debug=False)
    else:
        app.run(host='0.0.0.0', port=port)