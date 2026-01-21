# Pulsar Detection System

A machine learning-based system for detecting pulsars using both Artificial Neural Networks (ANN) and Convolutional Neural Networks (CNN). This project provides a web interface for pulsar detection from PHCX files and numerical data.

## 🌟 Features

- **Dual Model Architecture**: Combines ANN and CNN for improved detection accuracy
- **Multiple Input Formats**: 
  - PHCX file processing
  - Numerical data analysis
  - Image-based detection
- **Web Interface**: User-friendly frontend for easy interaction
- **Django Backend**: Robust REST API for model inference
- **ONNX Runtime**: Optimized model inference using ONNX format

## 🛠️ Technology Stack

- **Backend**: Django, Django REST Framework
- **Machine Learning**: PyTorch, ONNX Runtime
- **Frontend**: HTML, CSS, JavaScript
- **Data Processing**: NumPy, Pandas, scikit-learn

## 📁 Project Structure

```
pulsar-detection/
├── Backend/                 # Django backend application
│   ├── APIs/               # API endpoints and ML models
│   └── ISRO_Pulsar_Backend/ # Django settings
├── Developement/           # Model training and development
│   ├── Train/             # Training notebooks and scripts
│   └── Design/            # Project designs
├── ssd/                    # Frontend web application
├── sample data/           # Sample datasets for testing
└── assets/                # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Python 3.8+
- pip
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/vishwaksen21/pulsar-non-pulsar.git
cd pulsar-detection
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the Django backend:
```bash
cd Backend
python manage.py migrate
python manage.py runserver
```

4. Open the frontend:
- Navigate to `ssd/index.html` or
- Open `index.html` in the root directory

## 📊 Model Details

### ANN Model
- Input: Numerical features extracted from pulsar candidates
- Architecture: Multi-layer neural network
- Output: Binary classification (Pulsar/Non-Pulsar)

### CNN Model
- Input: Image representations of pulsar signals
- Architecture: Convolutional neural network
- Output: Binary classification with confidence score

### Ensemble Approach
The system combines predictions from both models for improved accuracy and reliability.

## 🧪 Sample Data

Sample data is provided in the `sample data/` directory:
- **phcx-files/**: Example PHCX files for testing
- **num-values/**: Excel files with numerical features
- **images/**: Pre-processed pulsar candidate images

## 📝 API Endpoints

- `POST /api/predict/phcx/` - Upload PHCX file for prediction
- `POST /api/predict/numerical/` - Submit numerical data for analysis
- `POST /api/predict/image/` - Upload image for classification

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Vishwaksen**

## 🙏 Acknowledgments

- ISRO for pulsar detection research support
- The astronomical community for pulsar data standards

---

**Note**: This is a research project for pulsar detection using machine learning techniques.
