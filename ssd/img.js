const uploadContainer = document.getElementById('uploadContainer');
const fileInput = document.getElementById('imageUpload');
const uploadForm = document.getElementById('uploadForm');
const outputDiv = document.getElementById('output');
const errorMessage = document.getElementById('errorMessage');
const loadingGif = document.getElementById('loading');
let uploadedFile = null;

function handleFiles(files) {
  const file = files[0];
  const img = new Image();
  img.src = URL.createObjectURL(file);
  img.onload = () => {
    uploadContainer.innerHTML = '<p class="message">Image uploaded!</p>';
    uploadedFile = file;
    errorMessage.style.display = 'none';
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

uploadForm.onsubmit = (event) => {
  event.preventDefault();
  if (!uploadedFile) {
    errorMessage.style.display = 'block';
    return;
  }
  
  loadingGif.style.display = 'inline-block';
  const formData = new FormData();
  formData.append('image', uploadedFile);
  formData.append('context', 'image-only-analysis');
  formData.append('format', 'image');

  safeFetch(`${CONFIG.API_BASE_URL}/cnn-predict/`, {
    method: 'POST',
    body: formData
  })
  .then(result => {
    loadingGif.style.display = 'none';
    const predictionMessage = result.prediction === 1 ? "Pulsar" : "Non-Pulsar";
    const probVal = result.prediction === 1 ? result.probability : (1 - result.probability);
    const confidencePct = (probVal * 100).toFixed(2);
    const highlightClass = probVal > 0.9 ? 'style="color: #00ffcc; text-shadow: 0 0 10px #00ffcc;"' : 'style="color: var(--primary-color)"';

    outputDiv.innerHTML = `
      <div class="card" style="text-align: center;">
        <h2 style="font-size: 1.4rem; margin-bottom: 1rem; color: var(--primary-color);">Result Image:</h2>
        <img src="${URL.createObjectURL(uploadedFile)}" alt="Result" style="width: 100%; max-width: 300px; border-radius: 10px; border: 1px solid var(--primary-color);"/>
      </div>
      <div class="prediction-box">
        <div class="prediction-label">Result: <span>${predictionMessage}</span></div>
        <div style="font-size: 1.3rem; margin-top: 1rem;">Confidence: <b ${highlightClass}>${confidencePct}%</b></div>
        <p style="margin-top: 2rem; color: var(--text-gray); font-size: 0.9rem;">AI identified patterns matching a ${predictionMessage.toLowerCase()}.</p>
      </div>
    `;

    document.getElementById('section2').style.display = 'block';
    window.scrollTo({ top: outputDiv.offsetTop, behavior: 'smooth' });
  })
  .catch(error => {
    console.error('Error:', error);
    loadingGif.style.display = 'none';
    outputDiv.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    document.getElementById('section2').style.display = 'block';
  });
};
