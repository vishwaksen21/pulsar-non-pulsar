const uploadContainer = document.getElementById('uploadContainer');
const fileInput = document.getElementById('fileUpload');
const uploadForm = document.getElementById('uploadForm');
const resultsCard = document.getElementById('resultsCard');
const statusText = document.getElementById('statusText');
const outputDiv = document.getElementById('output');
const output1Div = document.getElementById('output1');
const errorMessage = document.getElementById('errorMessage');
const loadingGif = document.getElementById('loading');

let uploadedFile = null;

function handleFiles(files) {
    const file = files[0];
    if (file && file.name.endsWith('.phcx')) {
        uploadedFile = file;
        uploadContainer.innerHTML = `<i class="ri-checkbox-circle-line"></i><p>${file.name} ready!</p>`;
        errorMessage.style.display = 'none';
        resultsCard.style.display = 'block';
        statusText.innerText = "File uploaded and ready for analysis.";
    } else {
        errorMessage.innerText = "Please upload a valid .phcx file.";
        errorMessage.style.display = 'block';
    }
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
    statusText.innerText = "Extracting data from PHCX file...";

    const formData = new FormData();
    formData.append('file', uploadedFile);

    safeFetch(`${CONFIG.API_BASE_URL}/phcx-predict/`, {
        method: 'POST',
        body: formData
    })
    .then(result => {
        loadingGif.style.display = 'none';
        statusText.innerText = "Analysis complete!";

        const data = result.generated_data[0];
        const prediction = result.merged_prediction === 1 ? "Pulsar" : "Non-Pulsar";
        const prob = result.merged_prediction === 1 ? result.merged_probability : (1 - result.merged_probability);
        const confidencePct = (prob * 100).toFixed(2);
        const highlightClass = prob > 0.9 ? 'style="color: #00ffcc; text-shadow: 0 0 10px #00ffcc;"' : 'style="color: var(--primary-color)"';

        outputDiv.innerHTML = `
            <div class="card">
                <h3 style="color: var(--primary-color);">Extracted Values</h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; font-size: 0.8rem; color: var(--text-gray);">
                    <div>Profile Mean: <b style="color: white">${data[0].toFixed(2)}</b></div>
                    <div>DM-SNR Mean: <b style="color: white">${data[4].toFixed(2)}</b></div>
                    <div>Profile StdDev: <b style="color: white">${data[1].toFixed(2)}</b></div>
                    <div>DM-SNR StdDev: <b style="color: white">${data[5].toFixed(2)}</b></div>
                </div>
            </div>
            <div class="card">
                <h3 style="color: var(--primary-color);">Neural Consensus</h3>
                <div style="font-size: 0.9rem; color: var(--text-gray);">
                    <div style="margin-bottom: 0.5rem;">ANN Probability: <b style="color: white">${(result.ann_probability * 100).toFixed(1)}%</b></div>
                    <div>CNN Probability: <b style="color: white">${(result.cnn_probability * 100).toFixed(1)}%</b></div>
                </div>
            </div>
        `;

        output1Div.innerHTML = `
            <div class="prediction-label">Final Verdict: <span>${prediction}</span></div>
            <div style="font-size: 1.3rem; margin-top: 1rem;">Merged Confidence: <b ${highlightClass}>${confidencePct}%</b></div>
        `;

        document.getElementById('section2').style.display = 'block';
        window.scrollTo({ top: document.getElementById('section2').offsetTop, behavior: 'smooth' });
    })
    .catch(error => {
        console.error('Error:', error);
        loadingGif.style.display = 'none';
        statusText.innerText = "Error occurred during analysis.";
        errorMessage.innerText = error.message;
        errorMessage.style.display = 'block';
    });
};
