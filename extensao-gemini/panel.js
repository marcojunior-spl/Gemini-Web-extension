document.getElementById('btnSubmit').addEventListener('click', async () => {
    const prompt = document.getElementById('txtInput').value;
    updateUIStatus("Enviando para o Gemini...");
    
    // Envia para o background processar
    chrome.runtime.sendMessage({
        action: "SEND_PROMPT_TO_GEMINI",
        payload: { text: prompt }
    }, (response) => {
        if (chrome.runtime.lastError) {
            updateUIStatus("Erro: " + chrome.runtime.lastError.message);
        } else if (response.status === "error") {
             updateUIStatus("Erro: " + response.message);
        } else {
            updateUIStatus("Mensagem entregue na aba! Aguardando IA...");
        }
    });
});

// Função simples para atualizar aquele texto pequenininho na tela
function updateUIStatus(text) {
    document.getElementById('statusIndicator').innerText = text;
}