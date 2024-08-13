var cornify_count = 0; // Inicializa um contador para rastrear quantas vezes a função cornify foi chamada.

var cornify_add = function (options) {
  // Incrementa o contador de quantas vezes a página foi cornificada.
  cornify_count += 1;

  // Define algumas variáveis usadas posteriormente.
  var cornify_url = "https://www.cornify.com/";
  var numType = "px";
  var heightRandom = Math.random() * 0.75; // Gera um valor aleatório para a posição vertical.
  var windowHeight = 768;
  var windowWidth = 1024;
  var height = 0;
  var width = 0;
  var de = document.documentElement; // Obtém o elemento <html>.
  var transform = "translate(-50%, -50%)"; // Inicia uma transformação CSS para centralizar o elemento.
  var showGrandUnicorn = cornify_count == 15; // Verifica se é a 15ª vez que o código foi chamado.

  // Cria um contêiner <div> para a imagem do unicórnio ou arco-íris.
  var div = document.createElement("div");
  div.style.position = "fixed";
  div.className = "__cornify_unicorn";
  div.style.zIndex = 143143; // Define a ordem de empilhamento para garantir que fique acima de outros elementos.
  div.style.outline = 0;
  div.onclick = cornify_add; // Adiciona a função cornify_add como um manipulador de clique para adicionar mais imagens.

  // Obtém a largura e altura da janela para posicionar a imagem corretamente.
  if (typeof window.innerHeight == "number") {
    windowHeight = window.innerHeight;
    windowWidth = window.innerWidth;
  } else if (de && de.clientHeight) {
    windowHeight = de.clientHeight;
    windowWidth = de.clientWidth;
  } else {
    numType = "%";
    height = Math.round(height * 100) + "%";
  }

  // Se for a 15ª cornificação, o unicórnio é centralizado e o z-index é aumentado.
  if (showGrandUnicorn) {
    div.style.top = "50%";
    div.style.left = "50%";
    div.style.zIndex = 143143143;
  } else {
    // Caso contrário, posiciona a imagem aleatoriamente na tela.
    div.style.top = Math.round(Math.random() * 100) + "%";
    div.style.left = Math.round(Math.random() * 100) + "%";

    transform += " rotate(" + Math.round(Math.random() * 10 - 5) + "deg)";
  }

  // Cria o elemento de imagem.
  var img = document.createElement("img");
  img.style.opacity = 0; // Inicialmente invisível.
  img.style.transition = "all .1s linear"; // Adiciona uma transição suave.
  img.alt = "A lovely unicorn or rainbow"; // Define o texto alternativo para a imagem.
  img.onload = function () {
    img.style.opacity = 1; // Torna a imagem visível assim que ela é carregada.
  };

  // Adiciona um parâmetro de tempo atual à URL para evitar cacheamento da imagem.
  var currentTime = new Date();
  var submitTime = currentTime.getTime();

  if (showGrandUnicorn) {
    submitTime = 0; // Não usa o cache para o "Grand Unicorn".
  }

  // Constrói a URL para a imagem do unicórnio ou arco-íris.
  var url = `https://www.cornify.com/corns/${
    Math.random() > 0.5 ? "r" : "u"
  }${Math.ceil(Math.random() * 7)}.gif`;

  // Adiciona a opção de "younicorns" se fornecido nas opções.
  if (options && (options.y || options.younicorns)) {
    url += "&y=" + (options.y ? options.y : options.younicorns);

    // Aleatoriamente, pode inverter a imagem horizontalmente.
    if (Math.random() > 0.5) {
      if (transform.length > 0) {
        transform += " scaleX(-1)";
      }
    }
  }

  // Aplica as transformações CSS ao contêiner.
  div.style.transform = transform;
  div.style.MozTransform = transform;
  div.style.webkitTransform = transform;

  // Define a URL da imagem.
  img.setAttribute("src", url);

  // Adiciona um efeito de rotação e escala ao passar o mouse sobre a imagem.
  div.onmouseover = function () {
    var size = 1 + Math.round(Math.random() * 10) / 100;
    var angle = Math.round(Math.random() * 20 - 10);
    var result = "rotate(" + angle + "deg) scale(" + size + "," + size + ")";
    img.style.transform = result;
    img.style.MozTransform = result;
    img.style.webkitTransform = result;
  };

  // Adiciona um efeito de rotação e escala ao tirar o mouse da imagem.
  div.onmouseout = function () {
    var size = 0.9 + Math.round(Math.random() * 10) / 100;
    var angle = Math.round(Math.random() * 6 - 3);
    var result = "rotate(" + angle + "deg) scale(" + size + "," + size + ")";
    img.style.transform = result;
    img.style.MozTransform = result;
    img.style.webkitTransform = result;
  };

  // Adiciona o contêiner ao corpo do documento.
  var body = document.getElementsByTagName("body")[0];
  body.appendChild(div);
  div.appendChild(img);

  // Após 5 cornificações, adiciona uma folha de estilo personalizada à página.
  if (cornify_count == 5) {
    var cssExisting = document.getElementById("__cornify_css");

    if (!cssExisting) {
      var head = document.getElementsByTagName("head")[0];
      var css = document.createElement("link");
      css.id = "__cornify_css";
      css.type = "text/css";
      css.rel = "stylesheet";
      css.href = "https://www.cornify.com/css/cornify.css";
      css.media = "screen";
      head.appendChild(css);
    }
    cornify_replace(); // Substitui o texto dos cabeçalhos.
  }

  cornify_updatecount(); // Atualiza o contador de cornificações na tela.

  // Dispara um evento personalizado para que outras partes do código possam reagir à cornificação.
  var event = new Event("cornify");
  document.dispatchEvent(event);
};

// Atualiza o contador de cornificações na tela.
var cornify_updatecount = function () {
  var id = "__cornify_count";
  var p = document.getElementById(id);

  if (p == null) {
    p = document.createElement("p");
    p.id = id;
    p.style.position = "fixed";
    p.style.bottom = "5px";
    p.style.left = "0px";
    p.style.right = "0px";
    p.style.zIndex = "1000000000";
    p.style.color = "#ff00ff";
    p.style.textAlign = "center";
    p.style.fontSize = "24px";
    p.style.fontFamily = "'Comic Sans MS', 'Comic Sans', 'Marker Felt', serif"; // Fonte divertida!
    p.style.textTransform = "uppercase";
    var body = document.getElementsByTagName("body")[0];
    body.appendChild(p);
  }

  // Atualiza o texto do contador na tela.
  if (cornify_count == 1) {
    p.innerHTML = "You cornified!";
  } else {
    p.innerHTML = "You cornified " + cornify_count + " times!";
  }

  // Armazena o contador em um cookie para a próxima sessão.
  cornify_setcookie("cornify", cornify_count + "", 1000);
};

// Define um cookie com um nome, valor e número de dias até expirar.
var cornify_setcookie = function (name, value, days) {
  var d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toGMTString();
  document.cookie = name + "=" + value + "; " + expires;
};

// Recupera o valor de um cookie pelo nome.
var cornify_getcookie = function (cname) {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i].trim();
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

// Recupera o contador de cornificações do cookie ao carregar a página.
cornify_count = parseInt(cornify_getcookie("cornify"));
if (isNaN(cornify_count)) {
  cornify_count = 0;
}

// Adiciona palavras "mágicas" aos títulos na página.
var cornify_replace = function () {
  var hc = 6;
  var hs;
  var h;
  var k;
  var words = [
    "Happy",
    "Sparkly",
    "Glittery",
    "Fun",
    "Magical",
    "Lovely",
    "Cute",
    "Charming",
    "Amazing",
    "Wonderful",
  ];

  while (hc >= 1) {
    hs = document.getElementsByTagName("h" + hc);
    for (k = 0; k < hs.length; k++) {
      h = hs[k];
      h.innerHTML = words[Math.floor(Math.random() * words.length)] + " " + h.innerHTML;
    }
    hc -= 1;
  }
};

// Adiciona um botão de cupcake que, ao ser clicado, remove todas as imagens de unicórnios.
var cornify_click_cupcake_button = function () {
  var doc = document;
  var body = doc.getElementsByTagName("body")[0];
  var button = doc.getElementById("__cornify_cupcake_button");

  if (button) {
    body.removeChild(button);
  }

  // Remove todos os elementos de unicórnios adicionados à página.
  var unicorns = doc.getElementsByClassName("__cornify_unicorn");
  for (var i = unicorns.length - 1; i >= 0; i--) {
    unicorns[i].parentNode.removeChild(unicorns[i]);
  }

  // Remove o contador de cornificações.
  var count = doc.getElementById("__cornify_count");
  if (count) {
    count.parentNode.removeChild(count);
  }
};

// Adiciona um botão de cupcake no canto superior direito da página.
var cornify_add_cupcake_button = function () {
  var button = document.createElement("div");
  button.id = "__cornify_cupcake_button";
  button.onclick = cornify_click_cupcake_button; // Adiciona o evento de clique para remover os unicórnios.
  button.style.position = "fixed";
  button.style.top = "10px";
  button.style.right = "10px";
  button.style.zIndex = 2147483640;
  button.innerHTML = '<img src="https://www.cornify.com/assets/cornify-cupcake-button.png" alt="Cupcake button!" />';
  document.getElementsByTagName("body")[0].appendChild(button);
};

// Implementa o famoso código Konami para adicionar unicórnios ao ser ativado.
cornami = {
  input: "",
  pattern: "38384040373937396665",
  clear: setTimeout("cornami.clear_input()", 5000),
  load: function () {
    window.document.onkeydown = function (e) {
      if (cornami.input == cornami.pattern) {
        cornify_add(); // Adiciona um unicórnio quando o código Konami é inserido.
        clearTimeout(cornami.clear);
        return;
      } else {
        cornami.input += e ? e.keyCode : event.keyCode;
        if (cornami.input == cornami.pattern) {
          cornify_add(); // Adiciona um unicórnio se o padrão estiver correto.
        }
        clearTimeout(cornami.clear);
        cornami.clear = setTimeout("cornami.clear_input()", 5000);
      }
    };
  },
  clear_input: function () {
    cornami.input = ""; // Limpa a entrada do código Konami após 5 segundos.
  },
};

cornami.load(); // Ativa a escuta do código Konami.
