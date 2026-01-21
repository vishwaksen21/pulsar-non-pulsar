// Centralized configuration for the Pulsar Detection System
const CONFIG = {
    // Pointing to local frontend URL as requested to remove dependency on Django server
    API_BASE_URL: window.location.origin + '/ssd',
    // Toggle for simulation mode when backend is not available
    SIMULATION_MODE: true 
};

// Simulated backend logic to handle requests locally
async function simulatePrediction(url, options) {
    console.log(`%c[Simulated Backend] Request to: ${url}`, 'color: #00ffcc; font-weight: bold;');
    
    // Artificial delay to mimic server response
    await new Promise(resolve => setTimeout(resolve, 800));

    if (url.includes('ann-predict')) {
        const prob = Math.random();
        return { prediction: Math.round(prob), probability: prob };
    } 
    else if (url.includes('cnn-predict')) {
        const prob = Math.random();
        return { prediction: Math.round(prob), probability: prob };
    } 
    else if (url.includes('merged-predict')) {
        const annProb = Math.random();
        const cnnProb = Math.random();
        const mergedProb = (annProb + cnnProb) / 2;
        return {
            cnn_prediction: Math.round(cnnProb), cnn_probability: cnnProb,
            ann_prediction: Math.round(annProb), ann_probability: annProb,
            merged_prediction: Math.round(mergedProb), merged_probability: mergedProb
        };
    } 
    else if (url.includes('phcx-predict')) {
        return {
            cnn_prediction: 0, cnn_probability: 0.12,
            ann_prediction: 0, ann_probability: 0.05,
            merged_prediction: 0, merged_probability: 0.08,
            generated_data: [[125.7, 60.8, 0.08, -0.68, 101.5, 65.6, 0.69, -0.80]],
            image_base64: "" // In real use this would be a base64 string
        };
    }
    throw new Error("Endpoint not found in simulation mode");
}

// Global error handler and router for fetch
async function safeFetch(url, options) {
    if (CONFIG.SIMULATION_MODE) {
        return await simulatePrediction(url, options);
    }

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || errorData.detail || `Server returned ${response.status}: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        throw new Error('Local simulation failed or server unreachable: ' + error.message);
    }
}
