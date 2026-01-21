# Merged_predict_script.py
import numpy as np

def get_merged_output(ann_prob, cnn_prob):
    """
    Generic ensemble detection using statistical mean of model probabilities.
    Avoids hardcoded heuristic conditions.
    """
    probabilities = np.array([ann_prob, cnn_prob], dtype=np.float32)
    merged_prob = np.mean(probabilities)
    
    # Generic class assignment based on mathematical rounding
    merged_output = int(np.round(merged_prob))

    return merged_output, float(merged_prob)
