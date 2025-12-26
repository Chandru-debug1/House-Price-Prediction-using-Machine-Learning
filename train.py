import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import joblib
import warnings
warnings.filterwarnings('ignore')

print("Loading dataset...")
try:
    df = pd.read_csv('AmesHousing.csv')
    print(f"Dataset loaded successfully. Shape: {df.shape}")
except FileNotFoundError:
    print("Error: AmesHousing.csv not found. Please download the dataset from Kaggle.")
    print("URL: https://www.kaggle.com/datasets/prevek18/ames-housing-dataset")
    exit(1)

print("Cleaning data...")
# Basic data cleaning
df = df.dropna(subset=['SalePrice'])

# Handle missing values
numerical_cols = df.select_dtypes(include=[np.number]).columns
for col in numerical_cols:
    if df[col].isnull().sum() > 0:
        df[col].fillna(df[col].median(), inplace=True)

categorical_cols = df.select_dtypes(include=['object']).columns
for col in categorical_cols:
    if df[col].isnull().sum() > 0:
        df[col].fillna(df[col].mode()[0], inplace=True)

print("Performing feature engineering...")
# Feature engineering
df['Total SF'] = df['Total Bsmt SF'] + df['1st Flr SF'] + df['2nd Flr SF']
df['House Age'] = df['Yr Sold'] - df['Year Built']
df['Years Since Remodel'] = df['Yr Sold'] - df['Year Remod/Add']
df['Total Bathrooms'] = (df['Bsmt Full Bath'] + df['Bsmt Half Bath'] * 0.5 +
                        df['Full Bath'] + df['Half Bath'] * 0.5)
df['Has Garage'] = (df['Garage Area'] > 0).astype(int)
df['Has Basement'] = (df['Total Bsmt SF'] > 0).astype(int)

# Select important features
features = ['Overall Qual', 'Gr Liv Area', 'Total Bsmt SF', '1st Flr SF',
           'Full Bath', 'Year Built', 'Year Remod/Add', 'Garage Cars',
           'Garage Area', 'Total SF', 'House Age', 'Years Since Remodel',
           'Total Bathrooms', 'Has Garage', 'Has Basement']

X = df[features]
y = np.log1p(df['SalePrice'])  # Log transform target

print("Splitting data and training model...")
# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Scale features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Train Random Forest model
model = RandomForestRegressor(n_estimators=100, random_state=42, n_jobs=-1)
model.fit(X_train_scaled, y_train)

print("Evaluating model...")
# Make predictions
pred_log = model.predict(X_test_scaled)
pred = np.expm1(pred_log)  # Convert back from log
y_test_actual = np.expm1(y_test)

# Calculate metrics
mae = mean_absolute_error(y_test_actual, pred)
rmse = np.sqrt(mean_squared_error(y_test_actual, pred))
r2 = r2_score(y_test_actual, pred)

print("Model Performance:")
print(f"MAE: ${mae:,.2f}")
print(f"RMSE: ${rmse:,.2f}")
print(f"R² Score: {r2:.4f}")

print("Saving model...")
# Save model components
model_components = {
    'model': model,
    'scaler': scaler,
    'feature_names': features,
    'target_transform': 'log1p'
}

joblib.dump(model_components, 'house_price_model.pkl')
print("Model saved as 'house_price_model.pkl'")

print("\nTraining completed successfully!")
print("You can now run 'python app.py' to start the prediction API.")