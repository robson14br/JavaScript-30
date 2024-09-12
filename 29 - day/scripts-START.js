let countdown; // Variável para armazenar o ID do intervalo, permitindo que seja limpo quando necessário
const timerDisplay = document.querySelector(".display__time-left"); // Seleciona o elemento que exibirá o tempo restante
const endTime = document.querySelector(".display__end-time"); // Seleciona o elemento que exibirá o horário de término
const buttons = document.querySelectorAll("[data-time]"); // Seleciona todos os botões que possuem o atributo 'data-time' para associar ao temporizador

// Função principal do temporizador
function timer(seconds) {
  // Limpa qualquer temporizador ativo para evitar múltiplos temporizadores rodando simultaneamente
  clearInterval(countdown);

  const now = Date.now(); // Captura o timestamp atual
  const then = now + seconds * 1000; // Calcula o momento futuro em que o temporizador vai terminar
  displayTimeLeft(seconds); // Exibe o tempo restante inicial
  displayEndTime(then); // Exibe a hora exata em que o temporizador terminará

  // Define um intervalo que será executado a cada segundo
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000); // Calcula o número de segundos restantes
    // Verifica se o tempo acabou
    if (secondsLeft < 0) {
      clearInterval(countdown); // Para o temporizador quando o tempo termina
      return;
    }
    // Atualiza a exibição do tempo restante
    displayTimeLeft(secondsLeft);
  }, 1000);
}

// Função que exibe o tempo restante no formato 'minutos:segundos'
function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60); // Converte segundos em minutos
  const remainderSeconds = seconds % 60; // Calcula os segundos restantes após a conversão em minutos
  // Formata a exibição de minutos e segundos, adicionando um zero à esquerda nos segundos, se necessário
  const display = `${minutes}:${
    remainderSeconds < 10 ? "0" : ""
  }${remainderSeconds}`;
  document.title = display; // Atualiza o título da página com o tempo restante
  timerDisplay.textContent = display; // Atualiza o elemento que exibe o tempo restante na página
}

// Função que exibe a hora de término do temporizador
function displayEndTime(timestamp) {
  const end = new Date(timestamp); // Converte o timestamp final em um objeto Date
  const hour = end.getHours(); // Obtém a hora de término
  const adjustedHour = hour > 12 ? hour - 12 : hour; // Ajusta a hora para o formato de 12 horas
  const minutes = end.getMinutes(); // Obtém os minutos de término
  // Exibe a hora de término no formato 'Be Back At HH:MM', adicionando um zero à esquerda nos minutos, se necessário
  endTime.textContent = `Be Back At ${adjustedHour}:${
    minutes < 10 ? "0" : ""
  }${minutes}`;
}

// Função que inicia o temporizador quando um botão é clicado
function startTimer() {
  const seconds = parseInt(this.dataset.time); // Obtém o valor de tempo (em segundos) do atributo 'data-time' do botão
  timer(seconds); // Inicia o temporizador com o valor de segundos
}

// Adiciona o evento de clique para cada botão, chamando a função 'startTimer' quando clicado
buttons.forEach((button) => button.addEventListener("click", startTimer));

// Adiciona um evento de submit ao formulário personalizado
document.customForm.addEventListener("submit", function (e) {
  e.preventDefault(); // Impede o envio padrão do formulário
  const mins = this.minutes.value; // Obtém o valor dos minutos inseridos pelo usuário no formulário
  timer(mins * 60); // Converte os minutos em segundos e inicia o temporizador
  this.reset(); // Reseta o formulário após o envio
});
