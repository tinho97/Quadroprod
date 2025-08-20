// popup.js - Versão Simplificada e Robustá
function initPopup() {
    const popup = document.getElementById('libertadoresPopup');
    if (!popup) return;
    
    const closeBtn = document.getElementById('closePopup');
    
    function showPopup() {
        popup.classList.add('active');
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
    }
    
    function hidePopup() {
        popup.classList.remove('active');
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
    }
    
    // Verificar e mostrar popup
    if (!sessionStorage.getItem('popupShown')) {
        setTimeout(showPopup, 3000);
        sessionStorage.setItem('popupShown', 'true');
    }
    
    // Event listeners
    if (closeBtn) closeBtn.addEventListener('click', hidePopup);
    
    popup.addEventListener('click', function(e) {
        if (e.target === popup) hidePopup();
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') hidePopup();
    });
    
    // Para testes
    window.showPopup = showPopup;
    window.hidePopup = hidePopup;
}

// Inicializar quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPopup);
} else {
    initPopup();
}

