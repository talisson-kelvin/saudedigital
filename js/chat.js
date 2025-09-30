const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

function addMessage(message, sender) {
  const msgElement = document.createElement("div");
  msgElement.classList.add("message", sender);
  msgElement.innerHTML = `<p>${message.replace(/\n/g, "<br>")}</p>`;
  chatBox.appendChild(msgElement);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function addTypingIndicator() {
  const typing = document.createElement("div");
  typing.id = "typing-indicator";
  typing.classList.add("message", "bot");
  typing.innerHTML = `<p><span class="dot"></span><span class="dot"></span><span class="dot"></span></p>`;
  chatBox.appendChild(typing);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function removeTypingIndicator() {
  const typing = document.getElementById("typing-indicator");
  if (typing) typing.remove();
}

function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  addMessage(message, "user");
  userInput.value = "";

  addTypingIndicator();

  setTimeout(() => {
    removeTypingIndicator();
    let resposta;

    if (message.toLowerCase().includes("sim") && ultimaSugestao.length) {
      resposta = sugerirTratamento();
    } else {
      resposta = diagnosticarSintomas(message);
    }

    addMessage(resposta, "bot");
  }, 1000);
}

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});
function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  addMessage(message, "user");
  userInput.value = "";

  addTypingIndicator();

  setTimeout(() => {
    removeTypingIndicator();
    let resposta;

    if (aguardandoAgendamento) {
      if (message.toLowerCase().includes("sim")) {
        resposta = solicitarNome();
      } else {
        aguardandoAgendamento = false;
        resposta = "Ok, não farei o agendamento. ❓ Deseja que eu sugira tratamentos iniciais?";
      }
    } 
    else if (aguardandoNome) {
      resposta = solicitarIdade(message);
    } 
    else if (aguardandoIdade) {
      resposta = agendarHospital(message);
    } 
    else if (aguardandoTratamento) {
      if (message.toLowerCase().includes("sim")) {
        resposta = sugerirTratamento();
      } else {
        aguardandoTratamento = false;
        resposta = "👍 Entendido. Desejo melhoras!";
      }
    } 
    else {
      resposta = diagnosticarSintomas(message);
    }

    addMessage(resposta, "bot");
  }, 1000);
}
