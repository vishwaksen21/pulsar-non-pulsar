from sklearn.preprocessing import StandardScaler
from ucimlrepo import fetch_ucirepo
import joblib
import os

def recreate_scaler():
    print("Fetching HTRU2 dataset...")
    htru2 = fetch_ucirepo(id=372)
    X = htru2.data.features
    
    print("Fitting scaler...")
    scaler = StandardScaler()
    scaler.fit(X)
    
    output_path = os.path.join('Backend', 'models', 'std_scaler.bin')
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    print(f"Saving scaler to {output_path}...")
    joblib.dump(scaler, output_path)
    print("Done!")

if __name__ == "__main__":
    recreate_scaler()
