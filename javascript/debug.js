// Verificação de Debug - Executar no Console do Navegador (F12)
console.log("=== VERIFICAÇÃO DE SISTEMA ===");
console.log("✓ Script de debug carregado");

// Verificar se o DOM está pronto
console.log(`DOM State: ${document.readyState}`);

// Verificar se elementos importantes existem
const elementos = {
    "data-hora-atual": document.getElementById("data-hora-atual"),
    "colaborador": document.getElementById("colaborador"),
    "disposicao": document.getElementById("disposicao"),
    "mental": document.getElementById("mental"),
    "dor": document.querySelector('input[name="dor"]'),
    "aptidao": document.querySelector('input[name="aptidao"]'),
    "checkin-form": document.getElementById("checkin-form"),
    "feedback-alert": document.getElementById("feedback-alert"),
    "tabela-corpo": document.getElementById("tabela-corpo"),
};

console.log("--- Elementos do DOM ---");
Object.entries(elementos).forEach(([nome, elemento]) => {
    console.log(`${nome}: ${elemento ? '✓ Encontrado' : '✗ NÃO ENCONTRADO'}`);
});

// Verificar se funções existem
const funcoes = {
    "inicializarBancoDados": typeof inicializarBancoDados,
    "atualizarRelogio": typeof atualizarRelogio,
    "salvarFormulario": typeof salvarFormulario,
    "renderizarHistorico": typeof renderizarHistorico,
    "exibirAlerta": typeof exibirAlerta,
    "alternarAba": typeof alternarAba,
};

console.log("--- Funções Disponíveis ---");
Object.entries(funcoes).forEach(([nome, tipo]) => {
    console.log(`${nome}: ${tipo === 'function' ? '✓' : '✗'} (${tipo})`);
});

// Verificar se o banco de dados foi inicializado
console.log("--- Banco de Dados ---");
console.log(`db Object: ${typeof db}`);

// Testar atualizarRelogio
console.log("--- Teste de Relógio ---");
try {
    atualizarRelogio();
    console.log("✓ Relógio atualizado com sucesso");
    console.log(`Hora atual no DOM: ${document.getElementById("data-hora-atual")?.textContent}`);
} catch (erro) {
    console.error("✗ Erro ao atualizar relógio:", erro);
}

console.log("=== FIM DA VERIFICAÇÃO ===");
