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

## Project Structure

```
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

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

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
