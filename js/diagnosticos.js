const doencas = {
  "COVID-19": [{ sintoma: "febre" }, { sintoma: "tosse" }, { sintoma: "falta de ar" }],
  "Pneumonia": [{ sintoma: "febre" }, { sintoma: "tosse" }, { sintoma: "dor no peito" }],
  "Gripe": [{ sintoma: "febre" }, { sintoma: "tosse" }, { sintoma: "dor de cabeça" }],
  "Dengue": [{ sintoma: "febre alta" }, { sintoma: "dor atrás dos olhos" }, { sintoma: "manchas vermelhas" }],
  "Diabetes": [{ sintoma: "sede" }, { sintoma: "urinar" }, { sintoma: "perda de peso" }, { sintoma: "fadiga" }],
  "Hipertensão": [{ sintoma: "dor de cabeça" }, { sintoma: "tontura" }, { sintoma: "visão embaçada" }],
  "Depressão": [{ sintoma: "tristeza" }, { sintoma: "cansaço" }, { sintoma: "falta de apetite" }],
  "Doença de Chagas": [{ sintoma: "febre" }, { sintoma: "dor no corpo" }, { sintoma: "vômito" }],
  "Lúpus": [{ sintoma: "fadiga" }, { sintoma: "dor nas articulações" }, { sintoma: "manchas" }]
};

const tratamentos = {
  "COVID-19": "Isolamento, hidratação, paracetamol/dipirona.",
  "Pneumonia": "Antibiótico (com prescrição médica), repouso e hidratação.",
  "Gripe": "Repouso, hidratação, analgésico leve.",
  "Dengue": "Hidratação intensa, paracetamol. Evitar ibuprofeno/aspirina.",
  "Diabetes": "Controle dietético, acompanhamento médico, possivelmente insulina ou antidiabéticos.",
  "Hipertensão": "Dieta com menos sal, exercícios, acompanhamento médico para prescrição de remédios.",
  "Depressão": "Procure ajuda psicológica/psiquiátrica. Terapia e/ou medicação prescrita por profissional.",
  "Doença de Chagas": "Avaliação cardiológica/gastrointestinal, tratamento específico conforme fase da doença.",
  "Lúpus": "Tratamento imunossupressor, acompanhamento reumatológico."
};


const graves = ["COVID-19", "Pneumonia", "Dengue", "Doença de Chagas", "Lúpus", "Diabetes", "Hipertensão"];


let ultimaSugestao = [];
let aguardandoAgendamento = false;
let aguardandoNome = false;
let aguardandoIdade = false;
let aguardandoTratamento = false;

let nomePaciente = "";
let idadePaciente = 0;


function diagnosticarSintomas(input) {
  const texto = input.toLowerCase();
  let pontuacao = {};

  for (let doenca in doencas) {
    let score = 0;
    doencas[doenca].forEach(item => {
      if (texto.includes(item.sintoma)) score += 1;
    });
    if (score > 0) pontuacao[doenca] = score;
  }

  const ranking = Object.entries(pontuacao).sort((a, b) => b[1] - a[1]);

  if (ranking.length === 0) {
    ultimaSugestao = [];
    return "⚠️ Não consegui identificar. Tente descrever melhor seus sintomas.";
  }

  ultimaSugestao = ranking.slice(0, 2).map(r => r[0]);

  let resposta = "✅ Diagnósticos mais prováveis:\n";
  ranking.slice(0, 2).forEach(([nome, score], i) => {
    resposta += `${i + 1}. ${nome} (pontuação: ${score})\n`;
  });

  if (graves.includes(ranking[0][0])) {
    aguardandoAgendamento = true;
    resposta += "\n🚨 Esta pode ser uma doença grave.\nDeseja que eu faça um agendamento em um hospital de Pinheiro?";
  } else {
    resposta += "\n❓ Deseja que eu sugira tratamentos iniciais?";
  }

  return resposta;
}


function solicitarNome() {
  aguardandoAgendamento = false;
  aguardandoNome = true;
  return "📝 Por favor, informe seu nome completo para o agendamento.";
}

function solicitarIdade(nome) {
  nomePaciente = nome;
  aguardandoNome = false;
  aguardandoIdade = true;
  return `👤 Olá, ${nomePaciente}. Qual a sua idade?`;
}

function agendarHospital(idade) {
  idadePaciente = parseInt(idade);
  aguardandoIdade = false;
  aguardandoTratamento = true;

  let hospital = idadePaciente <= 12 ? "Hospital Materno Infantil" : "Hospital Antenor Abreu";

  let resposta = `📅 Consulta agendada amanhã às 10h no ${hospital} em Pinheiro (MA).\n`;
  resposta += `Paciente: ${nomePaciente}, ${idadePaciente} anos.\n`;
  resposta += "\nEnquanto espera, deseja que eu sugira um tratamento inicial?";
  return resposta;
}



function sugerirTratamento() {
  aguardandoTratamento = false;
  if (!ultimaSugestao.length) return "⚠️ Primeiro descreva seus sintomas.";

  let resposta = "💡 Tratamentos iniciais sugeridos:\n";
  ultimaSugestao.forEach(nome => {
    resposta += `- ${nome} → ${tratamentos[nome] || "Consulte um médico"}\n`;
  });
  return resposta;
}
