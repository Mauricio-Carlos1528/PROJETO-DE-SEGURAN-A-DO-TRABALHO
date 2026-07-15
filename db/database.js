// Gerenciamento do Banco de Dados IndexedDB
// =========================================

let db;

// Inicializar o Banco de Dados
function inicializarBancoDados() {
    try {
        const request = indexedDB.open("RegistroCondicoesDB", 1);

        request.onupgradeneeded = function(event) {
            db = event.target.result;
            if (!db.objectStoreNames.contains("avaliacoes")) {
                db.createObjectStore("avaliacoes", { keyPath: "id", autoIncrement: true });
                console.log("Object Store 'avaliacoes' criado");
            }
        };

        request.onsuccess = function(event) {
            db = event.target.result;
            console.log("Banco de dados inicializado com sucesso");
            // Chamar renderizarHistorico apenas se existir
            if (typeof renderizarHistorico === 'function') {
                try {
                    renderizarHistorico();
                } catch (erro) {
                    console.warn("Erro ao renderizar histórico inicial:", erro);
                }
            }
        };

        request.onerror = function() {
            console.error("Erro ao abrir banco de dados:", request.error);
            if (typeof exibirAlerta === 'function') {
                exibirAlerta("Erro ao iniciar o banco de dados interno do navegador.", "erro");
            }
        };
    } catch (erro) {
        console.error("Erro ao tentar inicializar banco de dados:", erro);
    }
}

// Salvar Avaliação no Banco de Dados
function salvarAvaliacao(novaAvaliacao) {
    return new Promise((resolve, reject) => {
        const transacao = db.transaction(["avaliacoes"], "readwrite");
        const store = transacao.objectStore("avaliacoes");
        const requestAdd = store.add(novaAvaliacao);

        requestAdd.onsuccess = function() {
            resolve(requestAdd.result);
        };

        requestAdd.onerror = function() {
            reject(new Error("Erro ao registrar a avaliação"));
        };
    });
}

// Obter Todas as Avaliações
function obterTodasAvaliacoes() {
    return new Promise((resolve, reject) => {
        if (!db) {
            reject(new Error("Banco de dados não inicializado"));
            return;
        }

        const transacao = db.transaction(["avaliacoes"], "readonly");
        const store = transacao.objectStore("avaliacoes");
        const requestGetAll = store.getAll();

        requestGetAll.onsuccess = function(event) {
            resolve(event.target.result || []);
        };

        requestGetAll.onerror = function() {
            reject(new Error("Erro ao buscar avaliações"));
        };
    });
}

// Deletar Avaliação por ID
function deletarAvaliacao(id) {
    return new Promise((resolve, reject) => {
        const transacao = db.transaction(["avaliacoes"], "readwrite");
        const store = transacao.objectStore("avaliacoes");
        const requestDelete = store.delete(id);

        requestDelete.onsuccess = function() {
            resolve();
        };

        requestDelete.onerror = function() {
            reject(new Error("Erro ao deletar avaliação"));
        };
    });
}

// Limpar Todos os Dados
function limparBancoDados() {
    return new Promise((resolve, reject) => {
        const transacao = db.transaction(["avaliacoes"], "readwrite");
        const store = transacao.objectStore("avaliacoes");
        const requestClear = store.clear();

        requestClear.onsuccess = function() {
            resolve();
        };

        requestClear.onerror = function() {
            reject(new Error("Erro ao limpar dados"));
        };
    });
}
