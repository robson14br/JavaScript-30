const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

// Função para acessar a câmera do usuário e capturar o vídeo
function getVideo() {
  // Solicita acesso ao dispositivo de mídia (câmera) do usuário
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(localMediaStream => {
      // Se o usuário conceder permissão, o stream de vídeo é recebido
      console.log(localMediaStream);

      // Define o stream de vídeo como a fonte de mídia para o elemento de vídeo na página
      video.srcObject = localMediaStream;
      // Começa a reprodução do vídeo
      video.play();
    })
    .catch(err => {
      // Caso ocorra algum erro ao acessar a câmera, ele é registrado no console
      console.error('OH NO!!!', err);
    });
}

// Função para desenhar o vídeo capturado no canvas e aplicar efeitos visuais
function paintToCanvas() {
  // Define a largura e altura do canvas com base nas dimensões do vídeo
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  // Retorna uma função que é executada repetidamente (a cada 16ms) para desenhar o vídeo no canvas
  return setInterval(() => {
    // Desenha o vídeo no canvas
    ctx.drawImage(video, 0, 0, width, height);
    
    // Extrai os pixels desenhados no canvas
    let pixels = ctx.getImageData(0, 0, width, height);

    // Manipula os pixels para aplicar um efeito (no caso, um efeito de divisão RGB)
    pixels = rgbSplit(pixels);
    // ctx.globalAlpha = 0.8; // (opcional) Define a opacidade global

    // Coloca os pixels manipulados de volta no canvas
    ctx.putImageData(pixels, 0, 0);
  }, 16); // Repetir a cada 16 milissegundos (~60 FPS)
}

// Função para capturar uma foto do vídeo exibido no canvas
function takePhoto() {
  // Toca um som (se existir) ao capturar a foto
  snap.currentTime = 0;
  snap.play();

  // Converte o conteúdo atual do canvas para uma imagem em formato de URL de dados (base64)
  const data = canvas.toDataURL('image/jpeg');
  
  // Cria um link para fazer o download da imagem capturada
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'handsome'); // Define o nome do arquivo como 'handsome'
  
  // Insere a imagem capturada no HTML como uma miniatura clicável
  link.innerHTML = `<img src="${data}" alt="Handsome Man" />`;
  strip.insertBefore(link, strip.firstChild); // Adiciona a imagem no início da galeria de fotos
}

// Função para aplicar um efeito vermelho nos pixels da imagem
function redEffect(pixels) {
  // Itera sobre cada pixel (os dados dos pixels são armazenados em um array unidimensional)
  for (let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 200; // Aumenta a intensidade do vermelho
    pixels.data[i + 1] = pixels.data[i + 1] - 50;  // Diminui a intensidade do verde
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // Diminui a intensidade do azul
  }
  return pixels; // Retorna os pixels manipulados
}

// Função para aplicar um efeito de divisão RGB nos pixels da imagem
function rgbSplit(pixels) {
  // Itera sobre cada pixel
  for (let i = 0; i < pixels.data.length; i+=4) {
    // Move os valores de vermelho, verde e azul para criar um efeito de "divisão de canais"
    pixels.data[i - 150] = pixels.data[i + 0]; // Move o valor do vermelho
    pixels.data[i + 500] = pixels.data[i + 1]; // Move o valor do verde
    pixels.data[i - 550] = pixels.data[i + 2]; // Move o valor do azul
  }
  return pixels; // Retorna os pixels manipulados
}

// Função para aplicar um efeito de "chroma key" (tela verde) nos pixels da imagem
function greenScreen(pixels) {
  const levels = {};

  // Coleta os valores mínimos e máximos para cada canal de cor (vermelho, verde, azul)
  document.querySelectorAll('.rgb input').forEach((input) => {
    levels[input.name] = input.value;
  });

  // Itera sobre cada pixel
  for (i = 0; i < pixels.data.length; i = i + 4) {
    red = pixels.data[i + 0]; // Valor do vermelho
    green = pixels.data[i + 1]; // Valor do verde
    blue = pixels.data[i + 2]; // Valor do azul
    alpha = pixels.data[i + 3]; // Valor do alfa (transparência)

    // Verifica se o pixel está dentro do intervalo de cor selecionado
    if (red >= levels.rmin
      && green >= levels.gmin
      && blue >= levels.bmin
      && red <= levels.rmax
      && green <= levels.gmax
      && blue <= levels.bmax) {
      // Se estiver, torna o pixel transparente (alfa = 0)
      pixels.data[i + 3] = 0;
    }
  }

  return pixels; // Retorna os pixels manipulados
}

// Inicia a captura de vídeo ao carregar a página
getVideo();

// Adiciona um evento para iniciar a pintura no canvas assim que o vídeo puder ser reproduzido
video.addEventListener('canplay', paintToCanvas);
