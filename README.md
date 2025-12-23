# House Price Prediction Project

## Overview
This project implements a comprehensive machine learning solution for predicting house prices using the Ames Housing dataset. The project follows professional data science practices including data preprocessing, exploratory data analysis, feature engineering, model training, evaluation, and deployment.

## Dataset
The Ames Housing dataset contains 2,930 residential properties from Ames, Iowa, with 81 features describing various aspects of the houses. The target variable is the sale price.

**Key Features:**
- 2,930 observations
- 81 predictor variables
- Target: SalePrice (house sale price in USD)

## Methodology

### 1. Problem Definition
Predict house sale prices based on property characteristics to help real estate professionals, buyers, and sellers make informed decisions.

### 2. Data Collection
- Source: AmesHousing.csv
- Comprehensive dataset with detailed property information

### 3. Data Cleaning & Preprocessing
- Handled missing values appropriately (median for numerical, mode/'None' for categorical)
- Removed duplicates
- Ensured data quality

### 4. Exploratory Data Analysis (EDA)
- Analyzed target variable distribution (right-skewed, log-transformed)
- Identified key correlations with sale price
- Visualized relationships between features and target

### 5. Feature Engineering
- Created new features: Total SF, House Age, Total Bathrooms, etc.
- Encoded categorical variables (ordinal and nominal)
- One-hot encoding for nominal features
- Label encoding for ordinal features

### 6. Model Development
- **Algorithms Used:**
  - Linear Regression
  - Random Forest Regressor
- **Preprocessing:**
  - Log transformation of target variable
  - Feature scaling (StandardScaler)

### 7. Model Evaluation
**Random Forest Performance:**
- MAE: $15,421
- RMSE: $26,009
- R² Score: 0.916

**Key Insights:**
- Overall Quality is the most important feature (45.9% importance)
- Total Square Footage is second most important (29.4%)
- Model explains 91.6% of variance in house prices

### 8. Deployment
- Model saved as `house_price_model.pkl`
- Prediction function provided for easy inference
- Requirements file for environment setup

## Project Structure
```
├── house_price.ipynb          # Main Jupyter notebook
├── AmesHousing.csv           # Dataset
├── house_price_model.pkl     # Trained model
├── requirements.txt          # Python dependencies
└── README.md                # This file
```

## Installation & Usage

### Prerequisites
- Python 3.7+
- Jupyter Notebook

### Setup
1. Clone/download the project
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Open the notebook:
   ```bash
   jupyter notebook house_price.ipynb
   ```

### Making Predictions
Use the provided `predict_house_price()` function:

```python
from predict_function import predict_house_price

# Example features
features = {
    'Overall Qual': 7,
    'Gr Liv Area': 1710,
    'Total Bsmt SF': 856,
    '1st Flr SF': 856,
    'Full Bath': 2,
    'Year Built': 2003,
    'Year Remod/Add': 2003,
    'Garage Cars': 2,
    'Garage Area': 548
}

predicted_price = predict_house_price(features)
print(f"Predicted price: ${predicted_price:,.2f}")
```

## Key Findings

### Most Important Features
1. Overall Quality (45.9%)
2. Total Square Footage (29.4%)
3. Total Bathrooms (2.1%)
4. Central Air Conditioning (1.5%)
5. Garage Area (1.4%)

### Model Performance
- Random Forest significantly outperforms Linear Regression
- High R² score indicates good predictive power
- Reasonable error margins for real estate predictions

## Future Improvements
1. **Advanced Models:** Try XGBoost, LightGBM, or Neural Networks
2. **Hyperparameter Tuning:** Grid search for optimal parameters
3. **Feature Selection:** Remove less important features
4. **Ensemble Methods:** Combine multiple models
5. **Cross-validation:** More robust validation strategies
6. **Web Application:** Deploy as a web service

## Technologies Used
- **Python** - Programming language
- **Pandas** - Data manipulation
- **NumPy** - Numerical computing
- **Scikit-learn** - Machine learning
- **Matplotlib/Seaborn** - Data visualization
- **Jupyter Notebook** - Development environment

## Author
Professional Machine Learning Project
Date: December 2025

## License
This project is for educational purposes.