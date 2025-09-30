// =============================
// MAPA DE DOENÇAS E SINTOMAS (resumido)
// =============================
const doencas = {
  "COVID-19": [{sintoma: "febre"}, {sintoma: "tosse"}, {sintoma: "falta de ar"}],
  "Pneumonia": [{sintoma: "febre"}, {sintoma: "tosse"}, {sintoma: "dor no peito"}],
  "Gripe": [{sintoma: "febre"}, {sintoma: "tosse"}, {sintoma: "dor de cabeça"}],
  "Dengue": [{sintoma: "febre alta"}, {sintoma: "dor atrás dos olhos"}, {sintoma: "manchas vermelhas"}]
};

// =============================
// TRATAMENTOS
// =============================
const tratamentos = {
  "COVID-19": "😷 Isolamento, hidratação, paracetamol/dipirona.",
  "Pneumonia": "💊 Antibióticos (com prescrição médica), repouso e hidratação.",
  "Gripe": "💊 Repouso, hidratação, paracetamol ou dipirona.",
  "Dengue": "⚠️ Hidratação intensa, paracetamol. ❌ Não usar ibuprofeno/aspirina."
};

// =============================
// LISTA DE DOENÇAS GRAVES
// =============================
const graves = ["COVID-19", "Pneumonia", "Dengue"];

// =============================
// NOVA FUNÇÃO DE DIAGNÓSTICO
// =============================
let ultimaSugestao = [];

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

  let resposta = `✅ Diagnósticos mais prováveis:\n`;
  ranking.slice(0, 2).forEach(([nome, score], i) => {
    resposta += `${i + 1}. **${nome}** (pontuação: ${score})\n`;
  });

  // alerta se grave
  if (graves.includes(ranking[0][0])) {
    resposta += "\n🚨 Caso grave: procure imediatamente atendimento no Hospital Regional da cidade de **Pinheiro (MA)**.";
  }

  resposta += "\n\n❓ Deseja que eu sugira tratamentos iniciais?";
  return resposta;
}

function sugerirTratamento() {
  if (!ultimaSugestao.length) return "⚠️ Primeiro descreva seus sintomas.";
  let resposta = "💡 Tratamentos iniciais sugeridos:\n";
  ultimaSugestao.forEach(nome => {
    resposta += `- **${nome}** → ${tratamentos[nome] || "Consulte um médico"}\n`;
    if (graves.includes(nome)) {
      resposta += `🚨 Procure atendimento em um hospital de **Pinheiro (MA)** imediatamente.\n`;
    }
  });
  return resposta;
}
