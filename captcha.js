const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const captchaLength = 6;

function generateCaptchaText() {
  let captchaText = '';
  for (let i = 0; i < captchaLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    captchaText += characters.charAt(randomIndex);
  }
  return captchaText;
}

function createCaptchaImage(text) {
  const canvas = document.createElement('canvas');
  canvas.width = 200;
  canvas.height = 80;
  const ctx = canvas.getContext('2d');


  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);


  ctx.font = 'bold 40px Impact, Charcoal, sans-serif';
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);


  ctx.strokeStyle = 'black';
  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    ctx.moveTo(0, Math.random() * canvas.height);
    ctx.lineTo(canvas.width, Math.random() * canvas.height);
    ctx.stroke();
  }

  return canvas.toDataURL();
}

function updateCaptcha() {
  const captchaText = generateCaptchaText();
  const captchaImage = createCaptchaImage(captchaText);

  const captchaImageElement = document.getElementById('captcha-image');
  captchaImageElement.innerHTML = `<img src="${captchaImage}" alt="${captchaText}">`;
}

function checkCaptcha() {
    const userInput = document.getElementById('userInput').value;
    const captchaText = document.querySelector('#captcha-image img').alt;
  
    if (userInput.toLowerCase() === captchaText.toLowerCase()) {
      const verificationStatus = document.getElementById('verificationStatus');
      verificationStatus.textContent = 'CAPTCHA doğru!';
      verificationStatus.style.color = 'green';
    } else {
      const verificationStatus = document.getElementById('verificationStatus');
      verificationStatus.textContent = 'CAPTCHA yanlış! Lütfen tekrar deneyin.';
      verificationStatus.style.color = 'red';
    }

  updateCaptcha(); 
}


updateCaptcha();