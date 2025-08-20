// popup.js - Controlador do Pop-up Libertadores 2025
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se estamos na página index (onde o pop-up deve aparecer)
    if (!document.getElementById('libertadoresPopup')) return;
    
    const popup = document.getElementById('libertadoresPopup');
    const closeBtn = document.getElementById('closePopup');
    
    console.log('Popup script carregado'); // Para debug
    
    // Função para mostrar o popup
    function showPopup() {
        popup.classList.add('active');
        document.body.style.overflow = 'hidden'; // Impede scroll quando popup está aberto
    }
    
    // Função para esconder o popup
    function hidePopup() {
        popup.classList.remove('active');
        document.body.style.overflow = ''; // Restaura scroll
    }
    
    // Verificar se já foi mostrado antes (usando sessionStorage para teste)
    // Mude para localStorage depois que estiver funcionando
    if (!sessionStorage.getItem('popupLibertadoresShown')) {
        // Mostrar pop-up após 3 segundos
        setTimeout(showPopup, 3000);
        sessionStorage.setItem('popupLibertadoresShown', 'true');
    }
    
    // Fechar pop-up ao clicar no botão
    if (closeBtn) {
        closeBtn.addEventListener('click', hidePopup);
    }
    
    // Fechar pop-up ao clicar fora do conteúdo
    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            hidePopup();
        }
    });
    
    // Fechar pop-up com a tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popup.classList.contains('active')) {
            hidePopup();
        }
    });
    
    // Debug: Expor funções globalmente para teste
    window.showPopup = showPopup;
    window.hidePopup = hidePopup;
});

function showPopup() {
    popup.classList.add('active');
    document.body.style.overflow = 'hidden'; // Impede scroll da página
}

function hidePopup() {
    popup.classList.remove('active');
    document.body.style.overflow = ''; // Restaura scroll
}