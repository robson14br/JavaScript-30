// Seleciona os elementos principais do player
const player = document.querySelector('.player'); // Container principal do player de vídeo
const video = player.querySelector('.viewer'); // Elemento de vídeo
const progress = player.querySelector('.progress'); // Barra de progresso do vídeo
const progressBar = player.querySelector('.progress__filled'); // Parte preenchida da barra de progresso
const toggle = player.querySelector('.toggle'); // Botão de play/pause
const skipButtons = player.querySelectorAll('[data-skip]'); // Botões de pular para frente ou para trás
const ranges = player.querySelectorAll('.player__slider'); // Sliders de controle

// Função para alternar entre play e pause
function togglePlay() {
    if (video.paused) {
        video.play(); 
    } else {
        video.pause(); 
    }
}

// Função para atualizar o ícone do botão de play/pause
function updateButton() {
    const icon = this.paused ? '►' : '||'; 
    console.log(icon); 
    toggle.textContent = icon; 
}

// Função para pular para frente ou para trás no vídeo
function skip() {
    video.currentTime += parseFloat(this.dataset.skip); 
}

// Função para ajustar propriedades do vídeo (como volume ou velocidade)
function handleRangeUpdate() {
    video[this.name] = this.value; 
}

// Função para atualizar a barra de progresso com base no tempo atual do vídeo
function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100; 
    progressBar.style.flexBasis = `${percent}%`;
}

// Função para permitir que o usuário clique e arraste na barra de progresso
function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration; 
    video.currentTime = scrubTime;
}

// Event listeners para controlar o comportamento do player
video.addEventListener('click', togglePlay); 
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton); 
video.addEventListener('timeupdate', handleProgress); 
toggle.addEventListener('click', togglePlay); // Reproduz ou pausa o vídeo ao clicar no botão de play/pause
skipButtons.forEach(button => button.addEventListener('click', skip)); 
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate)); 
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate)); 

// Controle de mouse para arrastar na barra de progresso
let mousedown = false; // Variável para rastrear se o botão do mouse está pressionado
progress.addEventListener('click', scrub); // Permite pular para uma parte do vídeo ao clicar na barra de progresso
progress.addEventListener('mousemove', (e) => mousedown && scrub(e)); // Permite arrastar para pular para uma parte do vídeo
progress.addEventListener('mousedown', () => mousedown = true); // Marca que o botão do mouse está pressionado
progress.addEventListener('mouseup', () => mousedown = false); // Marca que o botão do mouse foi solto
