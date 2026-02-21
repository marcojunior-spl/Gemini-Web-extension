// Esse script roda silenciosamente DENTRO da página do Gemini
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "EXECUTE_PROMPT") {
        console.log("Comando recebido do Painel:", message.text);
        
        // Aqui entrará o código para injetar o texto na tela do Gemini depois!
        
        sendResponse({ result: "Mensagem chegou no espião com sucesso!" });
    }
    return true;
});