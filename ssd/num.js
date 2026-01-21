document.getElementById('pulsarForm').addEventListener('submit', function(event) {
  event.preventDefault();
  document.getElementById('loading').style.display = 'inline-block';

  const data = [
    document.getElementById('meanIntegrated').value,
    document.getElementById('stdIntegrated').value,
    document.getElementById('kurtIntegrated').value,
    document.getElementById('skewIntegrated').value,
    document.getElementById('meanDMSNR').value,
    document.getElementById('stdDMSNR').value,
    document.getElementById('kurtDMSNR').value,
    document.getElementById('skewDMSNR').value
  ];

  const formData = new FormData();
  formData.append('data', JSON.stringify(data));
  formData.append('context', 'numeric-only-analysis');
  formData.append('format', 'numeric');
  
  safeFetch(`${CONFIG.API_BASE_URL}/ann-predict/`, {
    method: 'POST',
    body: formData
  })
  .then(result => {
    const predictionMessage = result.prediction === 1 ? "Pulsar" : "Non-Pulsar";
    const probVal = result.prediction === 1 ? result.probability : (1 - result.probability);
    const confidencePct = (probVal * 100).toFixed(2);
    const highlightClass = probVal > 0.9 ? 'style="color: #00ffcc; text-shadow: 0 0 10px #00ffcc;"' : 'style="color: var(--primary-color)"';

    document.getElementById('output').innerHTML = `
      <div class="prediction-label">Result: <span>${predictionMessage}</span></div>
      <div style="font-size: 1.3rem; margin-top: 1rem;">Confidence: <b ${highlightClass}>${confidencePct}%</b></div>
      
      <div class="card" style="margin-top: 2rem; text-align: left;">
        <h3 style="margin-bottom: 1rem; color: var(--primary-color); font-size: 1rem;">Input Values:</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; font-size: 0.8rem; color: var(--text-gray);">
            <div>Profile Mean: <b style="color: white">${document.getElementById('meanIntegrated').value}</b></div>
            <div>DM-SNR Mean: <b style="color: white">${document.getElementById('meanDMSNR').value}</b></div>
            <div>Profile StdDev: <b style="color: white">${document.getElementById('stdIntegrated').value}</b></div>
            <div>DM-SNR StdDev: <b style="color: white">${document.getElementById('stdDMSNR').value}</b></div>
        </div>
      </div>
    `;

    const resultSection = document.getElementById('section2');
    resultSection.style.display = 'block';
    resultSection.scrollIntoView({ behavior: 'smooth' });
    document.getElementById('loading').style.display = 'none';
  })
  .catch(error => {
    console.error('Error:', error);
    document.getElementById('output').innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    document.getElementById('section2').style.display = 'block';
    document.getElementById('loading').style.display = 'none';
  });
});
