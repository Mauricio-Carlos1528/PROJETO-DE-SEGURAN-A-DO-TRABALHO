// Script Principal - Check-in Diário de Condições
// ================================================

// Constantes
const STATUS_NIVEL = {
    1: "Muito Ruim",
    2: "Instável",
    3: "Regular",
    4: "Bom",
    5: "Excelente"
};

// Inicialização ao Carregar
function inicializar() {
    // Aguardar o DOM estar completamente carregado
    if (document.readyState === 'loading') {
        document.addEventListener("DOMContentLoaded", inicializar);
        return;
    }

    // Inicializar banco de dados
    try {
        inicializarBancoDados();
    } catch (erro) {
        console.error("Erro ao inicializar banco de dados:", erro);
    }

    // Atualizar relógio imediatamente
    try {
        atualizarRelogio();
    } catch (erro) {
        console.error("Erro ao atualizar relógio:", erro);
    }

    // Atualizar relógio a cada 10 segundos
    setInterval(atualizarRelogio, 30000);
}

// Se o documento já está carregado, executar imediatamente
if (document.readyState !== 'loading') {
    inicializar();
} else {
    document.addEventListener("DOMContentLoaded", inicializar);
}

// ========== GERENCIAMENTO DE RELÓGIO E DATA ==========

function atualizarRelogio() {
    try {
        const dataHoraLabel = document.getElementById("data-hora-atual");
        
        if (!dataHoraLabel) {
            console.warn("Elemento 'data-hora-atual' não encontrado no DOM");
            return;
        }

        const agora = new Date();
        const dataFormatada = agora.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        const horaFormatada = agora.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        dataHoraLabel.textContent = `${dataFormatada} às ${horaFormatada}`;
    } catch (erro) {
        console.error("Erro ao atualizar relógio:", erro);
    }
}

// ========== AUXILIARES DE INTERFACE ==========

function atualizarRangeText(campo) {
    const valor = document.getElementById(campo).value;
    const output = document.getElementById(`valor-${campo}`);
    output.textContent = `${valor} - ${STATUS_NIVEL[valor]}`;
}

function escapeHTML(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}

function exibirAlerta(mensagem, tipo) {
    const alerta = document.getElementById("feedback-alert");
    alerta.classList.remove("hidden", "bg-green-100", "text-green-800", "border-green-200", "bg-red-100", "text-red-800", "border-red-200");
    
    if (tipo === "sucesso") {
        alerta.className = "mb-6 p-4 rounded-lg flex items-center shadow-sm bg-green-50 border border-green-200 text-green-800";
        alerta.innerHTML = `<i class="fa-solid fa-circle-check text-xl mr-3"></i><span>${mensagem}</span>`;
    } else {
        alerta.className = "mb-6 p-4 rounded-lg flex items-center shadow-sm bg-red-50 border border-red-200 text-red-800";
        alerta.innerHTML = `<i class="fa-solid fa-triangle-exclamation text-xl mr-3"></i><span>${mensagem}</span>`;
    }
    
    setTimeout(() => { alerta.classList.add("hidden"); }, 7000);
}

// ========== SISTEMA DE ABAS ==========

function alternarAba(aba) {
    const btnForm = document.getElementById("btn-tab-form");
    const btnHist = document.getElementById("btn-tab-hist");
    const divForm = document.getElementById("conteudo-form");
    const divHist = document.getElementById("conteudo-hist");

    if (aba === 'form') {
        btnForm.className = "flex-1 py-4 text-center font-medium border-b-2 border-blue-600 text-blue-600 transition";
        btnHist.className = "flex-1 py-4 text-center font-medium border-b-2 border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 transition";
        divForm.classList.remove("hidden");
        divHist.classList.add("hidden");
    } else {
        btnHist.className = "flex-1 py-4 text-center font-medium border-b-2 border-blue-600 text-blue-600 transition";
        btnForm.className = "flex-1 py-4 text-center font-medium border-b-2 border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 transition";
        divHist.classList.remove("hidden");
        divForm.classList.add("hidden");
        renderizarHistorico();
    }
}

// ========== FORMULÁRIO ==========

function salvarFormulario(event) {
    event.preventDefault();

    const colaborador = document.getElementById("colaborador").value.trim();
    const disposicao = parseInt(document.getElementById("disposicao").value);
    const mental = parseInt(document.getElementById("mental").value);
    const dor = document.querySelector('input[name="dor"]:checked').value;
    const aptidao = document.querySelector('input[name="aptidao"]:checked').value;
    const observacoes = document.getElementById("observacoes").value.trim();
    
    const agora = new Date();
    const dataHoraEnvio = agora.toLocaleDateString('pt-BR') + ' ' + agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    const novaAvaliacao = {
        colaborador,
        data_hora: dataHoraEnvio,
        disposicao_fisica: disposicao,
        estado_mental: mental,
        dor_desconforto: dor,
        apto_trabalhar: aptidao,
        observacoes
    };

    salvarAvaliacao(novaAvaliacao).then(() => {
        exibirAlerta(`Avaliação salva com sucesso para ${colaborador}! Tenha um excelente dia.`, "sucesso");
        document.getElementById("checkin-form").reset();
        document.getElementById("valor-disposicao").textContent = "3 - Regular";
        document.getElementById("valor-mental").textContent = "3 - Regular";
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }).catch(() => {
        exibirAlerta("Erro ao registrar a sua autoavaliação no navegador.", "erro");
    });
}

// ========== HISTÓRICO E TABELA ==========

async function renderizarHistorico() {
    try {
        const dados = await obterTodasAvaliacoes();
        const busca = document.getElementById("filtro-busca").value.toLowerCase();
        const tabelaCorpo = document.getElementById("tabela-corpo");
        const divVazio = document.getElementById("historico-vazio");

        dados.reverse();

        const dadosFiltrados = dados.filter(item => 
            item.colaborador.toLowerCase().includes(busca)
        );

        tabelaCorpo.innerHTML = "";

        if (dadosFiltrados.length === 0) {
            divVazio.classList.remove("hidden");
            return;
        }
        divVazio.classList.add("hidden");

        dadosFiltrados.forEach(item => {
            const row = document.createElement("tr");
            row.className = "hover:bg-slate-50 transition duration-75";
            
            let aptidaoBadgeClass = "bg-green-100 text-green-800";
            if (item.apto_trabalhar.includes("ressalvas")) aptidaoBadgeClass = "bg-yellow-100 text-yellow-800";
            if (item.apto_trabalhar.includes("Não")) aptidaoBadgeClass = "bg-red-100 text-red-800";

            row.innerHTML = `
                <td class="px-6 py-4 font-semibold text-slate-900">${escapeHTML(item.colaborador)}</td>
                <td class="px-6 py-4 text-slate-500 whitespace-nowrap">${item.data_hora}</td>
                <td class="px-6 py-4 text-center font-bold text-slate-700">${item.disposicao_fisica}/5</td>
                <td class="px-6 py-4 text-center font-bold text-slate-700">${item.estado_mental}/5</td>
                <td class="px-6 py-4 text-slate-500">${item.dor_desconforto}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2.5 py-1 text-xs font-semibold rounded-full ${aptidaoBadgeClass}">
                        ${item.apto_trabalhar}
                    </span>
                </td>
                <td class="px-6 py-4 text-slate-400 italic max-w-xs truncate" title="${escapeHTML(item.observacoes || '')}">
                    ${escapeHTML(item.observacoes) || '-'}
                </td>
            `;
            tabelaCorpo.appendChild(row);
        });
    } catch (erro) {
        console.error("Erro ao renderizar histórico:", erro);
    }
}
