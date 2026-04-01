document.addEventListener("DOMContentLoaded", function() {
    const sidebarContainer = document.getElementById('sidebar-container');
    if (!sidebarContainer) return; 

    const token = localStorage.getItem('token');
    const userNome = localStorage.getItem('usuario_logado');
    const userTipo = localStorage.getItem('tipo_usuario');

    if (!token) return;

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

    const htmlSidebar = `
        <button class="mobile-toggle" id="btn-mobile-toggle">
            <i class="fas fa-bars"></i>
        </button>

        <aside class="app-sidebar" id="app-sidebar">
            <div class="sidebar-header">
                <img src="assets/logo.png" alt="Logo Apólice System" class="sidebar-logo">
                <div class="sidebar-title">APÓLICE SYSTEM</div>
            </div>
            
            <nav class="sidebar-nav">
                ${htmlNavLinks}
            </nav>
            
            <div class="sidebar-footer">
                <div class="sidebar-user-info">
                    <div class="user-avatar"><i class="fas fa-user-circle"></i></div>
                    <div class="user-details">
                        <span class="user-name">${primeiroNome}</span>
                        <span class="user-role">${perfil}</span>
                    </div>
                </div>
                <button id="btn-sidebar-logout" class="sidebar-logout">
                    <i class="fas fa-sign-out-alt"></i> Sair
                </button>
            </div>
        </aside>
        
        <div class="sidebar-overlay" id="sidebar-overlay"></div>
    `;

    sidebarContainer.innerHTML = htmlSidebar;

    const btnLogout = document.getElementById('btn-sidebar-logout');
    if (btnLogout) {
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