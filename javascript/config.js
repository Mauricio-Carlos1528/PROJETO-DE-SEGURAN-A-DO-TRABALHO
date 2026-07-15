// Arquivo de Configuração - Check-in Diário de Condições
// =====================================================

const CONFIG = {
    // Banco de Dados
    DATABASE: {
        name: "RegistroCondicoesDB",
        version: 1,
        stores: {
            avaliacoes: "avaliacoes"
        }
    },

    // Aplicação
    APP: {
        name: "Check-in Diário de Condições",
        company: "WKVE Telecom",
        version: "1.0.0"
    },

    // UI
    UI: {
        alertTimeout: 7000,  // Tempo de exibição de alertas (ms)
        clockUpdateInterval: 30000  // Intervalo de atualização do relógio (ms)
    },

    // Escalas de Avaliação
    SCALES: {
        ENERGY: {
            1: "Muito Ruim",
            2: "Instável",
            3: "Regular",
            4: "Bom",
            5: "Excelente"
        },
        MENTAL: {
            1: "Muito Ruim",
            2: "Instável",
            3: "Regular",
            4: "Bom",
            5: "Excelente"
        }
    },

    // Mensagens do Sistema
    MESSAGES: {
        SUCCESS: {
            SAVE: "Avaliação salva com sucesso",
            DB_INIT: "Banco de dados inicializado"
        },
        ERROR: {
            DB_INIT: "Erro ao iniciar o banco de dados interno do navegador.",
            SAVE: "Erro ao registrar a sua autoavaliação no navegador.",
            FETCH: "Erro ao buscar avaliações",
            DELETE: "Erro ao deletar avaliação"
        }
    },

    // Cores para Status
    COLORS: {
        APT_YES: "bg-green-100 text-green-800",
        APT_CONDITIONAL: "bg-yellow-100 text-yellow-800",
        APT_NO: "bg-red-100 text-red-800",
        ALERT_SUCCESS: "bg-green-50 border border-green-200 text-green-800",
        ALERT_ERROR: "bg-red-50 border border-red-200 text-red-800"
    }
};

// Exportar para uso em outros arquivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
