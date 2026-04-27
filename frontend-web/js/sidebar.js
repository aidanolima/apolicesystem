document.addEventListener("DOMContentLoaded", function() {
    const sidebarContainer = document.getElementById('sidebar-container');
    if (!sidebarContainer) return; 

    const token = localStorage.getItem('token');
    const userNome = localStorage.getItem('usuario_logado');
    const userTipo = localStorage.getItem('tipo_usuario');
    const userFoto = localStorage.getItem('foto_perfil');

    if (!token) return;

    const BASE_API = (typeof API_BASE_URL !== 'undefined') ? API_BASE_URL : '';

    const currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';

    const links = [
        { nome: '<i class="fas fa-chart-line"></i> Dashboard', url: 'dashboard.html' },
        { nome: '<i class="fas fa-file-contract"></i> Apólices', url: 'apolice.html' },
        { nome: '<i class="fas fa-users"></i> Clientes', url: 'cadastro.html' },
        { nome: '<i class="fas fa-chart-pie"></i> Relatórios', url: 'relatorios.html' }
    ];

    if (userTipo === 'admin' || userTipo === 'ti') {
        links.push({ nome: '<i class="fas fa-user-shield"></i> Usuários', url: 'registro.html?origin=dashboard' });
    }

    let htmlNavLinks = '';
    links.forEach(link => {
        const linkBaseUrl = link.url.split('?')[0];
        const isActive = currentPage === linkBaseUrl ? 'active' : '';
        htmlNavLinks += `<a href="${link.url}" class="sidebar-link ${isActive}">${link.nome}</a>`;
    });

    const perfil = userTipo ? userTipo.toUpperCase() : 'USER';
    const primeiroNome = userNome ? userNome.split(' ')[0] : 'Usuário';

    // Resolver a URL da foto
    let userAvatarHtml = '<i class="fas fa-user-circle"></i>';
    if (userFoto && userFoto !== 'null' && userFoto.trim() !== '') {
        const fullFotoUrl = userFoto.startsWith('/') ? BASE_API + userFoto : userFoto;
        userAvatarHtml = `<img src="${fullFotoUrl}" style="width: 35px; height: 35px; border-radius: 50%; object-fit: cover; border: 2px solid #4CB191;">`;
    }

    const htmlSidebar = `
        <button class="mobile-toggle" id="btn-mobile-toggle">
            <i class="fas fa-bars"></i>
        </button>

        <aside class="app-sidebar" id="app-sidebar">
            <div class="sidebar-header">
                <img src="assets/logo.png" onerror="this.src='assets/logo_apolicesystem.png'" alt="Logo Apólice System" class="sidebar-logo">
                <div class="sidebar-title">APÓLICE SYSTEM</div>
            </div>
            
            <nav class="sidebar-nav">
                ${htmlNavLinks}
            </nav>
            
            <div class="sidebar-footer" style="padding: 15px 20px; border-top: 1px solid rgba(255,255,255,0.05); background-color: rgba(0,0,0,0.15);">
                <div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
                    
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <div class="user-avatar" style="font-size: 32px; color: #4CB191; display: flex; align-items: center; justify-content: center;">
                            ${userAvatarHtml}
                        </div>
                        <div class="user-details" style="display: flex; flex-direction: column;">
                            <span class="user-name" style="font-weight: bold; font-size: 14px; color: white;">${primeiroNome}</span>
                            <span class="user-role" style="font-size: 11px; color: #aaa;">${perfil}</span>
                        </div>
                    </div>

                    <button id="btn-sidebar-logout" title="Sair do Sistema" style="background: transparent; border: none; color: #d32f2f; font-size: 18px; cursor: pointer; padding: 5px; transition: all 0.2s ease;">
                        <i class="fas fa-sign-out-alt"></i>
                    </button>
                    
                </div>
            </div>
        </aside>
        
        <div class="sidebar-overlay" id="sidebar-overlay"></div>
    `;

    sidebarContainer.innerHTML = htmlSidebar;

    const btnLogout = document.getElementById('btn-sidebar-logout');
    if (btnLogout) {
        // Efeitos de Hover para o botão de sair (para não precisar mexer no CSS)
        btnLogout.addEventListener('mouseover', () => {
            btnLogout.style.color = '#ff5252';
            btnLogout.style.transform = 'scale(1.15)';
        });
        btnLogout.addEventListener('mouseout', () => {
            btnLogout.style.color = '#d32f2f';
            btnLogout.style.transform = 'scale(1)';
        });
        
        // Ação de Logout
        btnLogout.addEventListener('click', function() {
            localStorage.clear();
            sessionStorage.clear();
            window.location.replace('index.html');
        });
    }

    const btnToggle = document.getElementById('btn-mobile-toggle');
    const sidebar = document.getElementById('app-sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    if (btnToggle && sidebar && overlay) {
        btnToggle.addEventListener('click', () => {
            sidebar.classList.add('open');
            overlay.classList.add('open');
        });

        overlay.addEventListener('click', () => {
            sidebar.classList.remove('open');
            overlay.classList.remove('open');
        });
    }
});