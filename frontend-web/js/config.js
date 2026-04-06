// js/config.js

// 1. DETECÇÃO AUTOMÁTICA DE AMBIENTE
const isLocal = window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost';

const CONFIG = {
    development: {
        // Mantém o seu DEV local rodando perfeitamente como sempre foi!
        API_BASE_URL: 'http://localhost:3000', 
    },
    production: {
        // 👇 A MUDANÇA É AQUI: O Apólice System de produção agora fala com o motor do próprio Apólice System!
        API_BASE_URL: 'https://apolicesystem.onrender.com', 
    }
};

// 2. DEFINIÇÃO GLOBAL DA API (A Mágica acontece aqui)
// Ajustado para API_BASE_URL para manter o padrão em todo o sistema!
const API_BASE_URL = isLocal ? CONFIG.development.API_BASE_URL : CONFIG.production.API_BASE_URL;

// 3. LOG PARA DEBUG (Para você saber onde está rodando)
console.log(`[Ambiente] Rodando em: ${isLocal ? 'DESENVOLVIMENTO (Local)' : 'PRODUÇÃO (Nuvem)'}`);
console.log(`[API] Conectando em: ${API_BASE_URL}`);