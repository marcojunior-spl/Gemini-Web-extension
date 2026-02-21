// Permite que o painel lateral abra ao clicar no ícone da extensão
chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });

// Fica escutando as mensagens que vêm do nosso panel.html
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "SEND_PROMPT_TO_GEMINI") {
        forwardMessageToGeminiTab(request.payload)
            .then(response => sendResponse({ status: "success", data: response }))
            .catch(error => sendResponse({ status: "error", message: error.message }));
        
        // Retorna true para avisar o navegador que a resposta será assíncrona (vai demorar um pouquinho)
        return true; 
    }
});

// Função para caçar a aba do Gemini
async function forwardMessageToGeminiTab(payload) {
    const tabs = await chrome.tabs.query({ url: "https://gemini.google.com/*" });
    
    if (tabs.length === 0) {
        throw new Error("Por favor, abra o Google Gemini em uma nova aba.");
    }
    
    // Pega a aba que o usuário está usando no momento ou a primeira que encontrar
    const targetTab = tabs.find(tab => tab.active) || tabs[0];
    
    // Manda a mensagem para o espião (content.js) que está dentro dessa aba
    return chrome.tabs.sendMessage(targetTab.id, {
        action: "EXECUTE_PROMPT",
        text: payload.text
    });
}