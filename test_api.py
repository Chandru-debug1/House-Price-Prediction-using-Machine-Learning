import requests
import json

def test_api():
    """Test the house price prediction API"""

    # API base URL
    base_url = 'http://localhost:5000'

    print("Testing House Price Prediction API")
    print("=" * 40)

    # Test health endpoint
    print("1. Testing health endpoint...")
    try:
        response = requests.get(f"{base_url}/health")
        if response.status_code == 200:
            print("✓ Health check passed")
        else:
            print("✗ Health check failed")
    except Exception as e:
        print(f"✗ Health check error: {e}")
        return

    # Test home endpoint
    print("2. Testing home endpoint...")
    try:
        response = requests.get(base_url)
        if response.status_code == 200:
            data = response.json()
            print("✓ Home endpoint working")
            print(f"  Message: {data.get('message', 'N/A')}")
        else:
            print("✗ Home endpoint failed")
    except Exception as e:
        print(f"✗ Home endpoint error: {e}")
        return

    # Test prediction endpoint
    print("3. Testing prediction endpoint...")

    # Sample house features
    sample_data = {
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

    try:
        response = requests.post(
            f"{base_url}/predict",
            json=sample_data,
            headers={'Content-Type': 'application/json'}
        )

        if response.status_code == 200:
            result = response.json()
            predicted_price = result.get('predicted_price', 0)
            print("✓ Prediction successful")
            print(f"  Predicted Price: ${predicted_price:,.2f}")
        else:
            print(f"✗ Prediction failed with status code: {response.status_code}")
            print(f"  Response: {response.text}")

    except Exception as e:
        print(f"✗ Prediction error: {e}")

    print("\nAPI testing completed!")

if __name__ == "__main__":
    test_api()