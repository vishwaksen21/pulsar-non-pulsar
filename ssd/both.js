const uploadContainer = document.getElementById('uploadContainer');
const fileInput = document.getElementById('imageUpload');
const numericalForm = document.getElementById('numericalForm');
const submitButton = document.getElementById('submitButton');
const outputDiv = document.getElementById('output');
const loadingGif = document.getElementById('loadingGif');

let uploadedFile = null;

function handleFiles(files) {
  const file = files[0];
  const img = new Image();
  img.src = URL.createObjectURL(file);
  img.onload = () => {
    uploadContainer.innerHTML = '<p class="message">Image uploaded!</p>';
    uploadedFile = file;
  };
}

uploadContainer.onclick = () => fileInput.click();
uploadContainer.ondragover = (e) => { e.preventDefault(); uploadContainer.classList.add('dragover'); };
uploadContainer.ondragleave = () => uploadContainer.classList.remove('dragover');
uploadContainer.ondrop = (e) => {
  e.preventDefault();
  uploadContainer.classList.remove('dragover');
  handleFiles(e.dataTransfer.files);
};
fileInput.onchange = () => handleFiles(fileInput.files);

submitButton.onclick = () => {
  const inputs = numericalForm.querySelectorAll('input[type="number"]');
  const values = Array.from(inputs).map(i => i.value);

  if (!uploadedFile || values.some(v => v === '')) {
    alert('Please upload an image and fill all fields.');
    return;
  }

  loadingGif.style.display = 'inline-block';
  const formData = new FormData();
  formData.append('image', uploadedFile);
  formData.append('data', JSON.stringify(values));
  formData.append('context', 'combined-analysis');
  formData.append('format', 'image+numeric');

  safeFetch(`${CONFIG.API_BASE_URL}/merged-predict/`, {
    method: 'POST',
    body: formData
  })
  .then(result => {
    loadingGif.style.display = 'none';
    const prediction = result.merged_prediction === 1 ? "Pulsar" : "Non-Pulsar";
    const prob = result.merged_prediction === 1 ? result.merged_probability : (1 - result.merged_probability);
    const confidencePct = (prob * 100).toFixed(2);
    const highlightClass = prob > 0.9 ? 'style="color: #00ffcc; text-shadow: 0 0 10px #00ffcc;"' : 'style="color: var(--primary-color)"';

    outputDiv.innerHTML = `
      <div class="result-grid">
        <div class="card" style="text-align: center;">
          <h2 style="font-size: 1.4rem; margin-bottom: 1rem; color: var(--primary-color);">Signal Analysis:</h2>
          <img src="${URL.createObjectURL(uploadedFile)}" style="width: 100%; max-width: 250px; border-radius: 10px; border: 1px solid var(--primary-color);"/>
        </div>
        <div class="prediction-box">
          <div class="prediction-label">Result: <span>${prediction}</span></div>
          <div style="font-size: 1.3rem; margin-top: 1rem;">Confidence: <b ${highlightClass}>${confidencePct}%</b></div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 2rem; font-size: 0.8rem; color: var(--text-gray);">
            <div class="card" style="padding: 0.8rem; margin: 0;">ANN: <b style="color: white">${(result.ann_probability * 100).toFixed(1)}%</b></div>
            <div class="card" style="padding: 0.8rem; margin: 0;">CNN: <b style="color: white">${(result.cnn_probability * 100).toFixed(1)}%</b></div>
          </div>
        </div>
      </div>
    `;
    document.getElementById('section2').style.display = 'block';
    window.scrollTo({ top: outputDiv.offsetTop, behavior: 'smooth' });
  })
  .catch(error => {
    loadingGif.style.display = 'none';
    outputDiv.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    document.getElementById('section2').style.display = 'block';
  });
};
