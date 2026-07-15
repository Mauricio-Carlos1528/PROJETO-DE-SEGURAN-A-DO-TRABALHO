// Utilitários - Check-in Diário de Condições
// ==========================================

/**
 * Escapa caracteres especiais HTML para prevenir XSS
 * @param {string} str - String a ser escapada
 * @returns {string} String escapada
 */
function escapeHTML(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}

/**
 * Formata data para o padrão brasileiro
 * @param {Date} data - Data a ser formatada
 * @returns {string} Data formatada (DD/MM/YYYY HH:mm)
 */
function formatarData(data) {
    return data.toLocaleDateString('pt-BR') + ' ' + 
           data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

/**
 * Obtém o status de um valor na escala
 * @param {number} valor - Valor entre 1-5
 * @param {string} tipo - 'energy' ou 'mental'
 * @returns {string} Descrição do status
 */
function obterStatusEscala(valor, tipo = 'energy') {
    const escala = tipo === 'mental' ? CONFIG.SCALES.MENTAL : CONFIG.SCALES.ENERGY;
    return escala[valor] || 'Desconhecido';
}

/**
 * Determina a classe de cor para status de aptidão
 * @param {string} status - Status de aptidão
 * @returns {string} Classe Tailwind CSS
 */
function obterCorAptidao(status) {
    if (status === "Sim") return CONFIG.COLORS.APT_YES;
    if (status.includes("ressalvas")) return CONFIG.COLORS.APT_CONDITIONAL;
    if (status.includes("Não")) return CONFIG.COLORS.APT_NO;
    return CONFIG.COLORS.APT_CONDITIONAL;
}

/**
 * Valida dados do formulário
 * @param {Object} dados - Objeto com dados do formulário
 * @returns {Object} {isValid: boolean, errors: array}
 */
function validarFormulario(dados) {
    const errors = [];

    if (!dados.colaborador || dados.colaborador.trim().length < 3) {
        errors.push("Nome do colaborador deve ter pelo menos 3 caracteres");
    }

    if (!dados.disposicao || dados.disposicao < 1 || dados.disposicao > 5) {
        errors.push("Disposição física inválida");
    }

    if (!dados.mental || dados.mental < 1 || dados.mental > 5) {
        errors.push("Estado mental inválido");
    }

    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

/**
 * Formata um objeto de avaliação para exibição
 * @param {Object} avaliacao - Objeto com dados da avaliação
 * @returns {Object} Objeto formatado
 */
function formatarAvaliacao(avaliacao) {
    return {
        colaborador: escapeHTML(avaliacao.colaborador),
        dataHora: avaliacao.data_hora,
        disposicao: `${avaliacao.disposicao_fisica}/5`,
        mental: `${avaliacao.estado_mental}/5`,
        dor: escapeHTML(avaliacao.dor_desconforto),
        aptidao: escapeHTML(avaliacao.apto_trabalhar),
        observacoes: escapeHTML(avaliacao.observacoes || '-')
    };
}

/**
 * Converte um array de avaliações para CSV
 * @param {Array} avaliacoes - Array de avaliações
 * @returns {string} Dados em formato CSV
 */
function converterParaCSV(avaliacoes) {
    if (avaliacoes.length === 0) return '';

    const headers = ['Colaborador', 'Data/Hora', 'Físico', 'Mental', 'Dor', 'Apto', 'Observações'];
    const rows = avaliacoes.map(a => [
        a.colaborador,
        a.data_hora,
        a.disposicao_fisica,
        a.estado_mental,
        a.dor_desconforto,
        a.apto_trabalhar,
        a.observacoes
    ]);

    return [headers, ...rows]
        .map(row => row.map(cell => `"${cell}"`).join(','))
        .join('\n');
}

/**
 * Download de dados como arquivo
 * @param {string} conteudo - Conteúdo do arquivo
 * @param {string} nomeArquivo - Nome do arquivo
 * @param {string} tipo - Tipo MIME
 */
function fazerDownload(conteudo, nomeArquivo, tipo = 'text/plain') {
    const blob = new Blob([conteudo], { type: tipo });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = nomeArquivo;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

/**
 * Debounce para funções
 * @param {Function} func - Função a ser executada
 * @param {number} delay - Delay em ms
 * @returns {Function} Função debounced
 */
function debounce(func, delay = 300) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}
