// VoiceHub PWA Configuration e Otimizações

/**
 * Configurações de PWA e Performance
 * Otimizações para app instalado
 */

class VoiceHubPWA {
    constructor() {
        this.isInstalled = this.checkIfInstalled();
        this.isOnline = navigator.onLine;
        this.init();
    }

    init() {
        console.log('🚀 Inicializando PWA Config...');
        
        // Online/Offline listeners
        window.addEventListener('online', () => this.handleOnline());
        window.addEventListener('offline', () => this.handleOffline());
        
        // App lifecycle
        if (this.isInstalled) {
            console.log('📱 Executando como app instalado');
            this.optimizeForStandalone();
        }

        // Performance monitoring
        this.setupPerformanceMonitoring();
        
        // Install prompt handling
        this.handleInstallPrompt();
    }

    /**
     * Detectar se está rodando como app
     */
    checkIfInstalled() {
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches 
            || navigator.standalone === true;
        const isNotchSupport = CSS.supports('padding: max(0px)');
        
        return isStandalone || isNotchSupport;
    }

    /**
     * Otimizações para modo standalone
     */
    optimizeForStandalone() {
        // Status bar customizada (iOS)
        const statusBar = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
        if (statusBar) {
            statusBar.setAttribute('content', 'black-translucent');
        }

        // Desabilitar zoom em touch devices
        document.addEventListener('touchstart', (e) => {
            if (e.touches.length > 1) {
                e.preventDefault();
            }
        }, { passive: false });

        // Evitar comportamentos padrão
        document.addEventListener('gesturestart', (e) => {
            e.preventDefault();
        });

        // Configurar viewport para notch/safe area
        this.setupSafeArea();
    }

    /**
     * Setup safe area para notches
     */
    setupSafeArea() {
        const style = document.createElement('style');
        style.textContent = `
            @supports (padding: max(0px)) {
                body {
                    padding-left: max(12px, env(safe-area-inset-left));
                    padding-right: max(12px, env(safe-area-inset-right));
                    padding-top: max(12px, env(safe-area-inset-top));
                    padding-bottom: max(12px, env(safe-area-inset-bottom));
                }
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Handle online status
     */
    handleOnline() {
        this.isOnline = true;
        console.log('🌐 Online');
        
        const status = document.getElementById('status');
        if (status && status.parentElement.style.display !== 'none') {
            status.textContent = '🌐 Conexão restaurada';
            status.className = 'status active';
            setTimeout(() => (status.textContent = ''), 3000);
        }

        // Sincronizar dados se houver
        this.syncOfflineData();
    }

    /**
     * Handle offline status
     */
    handleOffline() {
        this.isOnline = false;
        console.log('📴 Offline');
        
        const status = document.getElementById('status');
        if (status) {
            status.textContent = '📴 Modo offline - funcionalidades limitadas';
            status.className = 'status active';
        }
    }

    /**
     * Sincronizar dados offline
     */
    syncOfflineData() {
        // Implementar sincronização se necessário
        console.log('🔄 Sincronizando dados offline...');
    }

    /**
     * Setup performance monitoring
     */
    setupPerformanceMonitoring() {
        if ('PerformanceObserver' in window) {
            try {
                // First Contentful Paint
                const paintObserver = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        console.log(`⏱️ ${entry.name}: ${entry.startTime.toFixed(2)}ms`);
                    }
                });

                paintObserver.observe({ entryTypes: ['paint', 'navigation'] });
            } catch (e) {
                console.log('Performance monitoring não disponível');
            }
        }

        // Medir Load time
        window.addEventListener('load', () => {
            if (performance.timing) {
                const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
                console.log(`📊 Tempo de carga: ${loadTime}ms`);
            }
        });
    }

    /**
     * Handle install prompt
     */
    handleInstallPrompt() {
        window.addEventListener('beforeinstallprompt', (e) => {
            // Guardar evento
            window.deferredPrompt = e;
            console.log('💾 App pronto para instalar');
            
            // Mostrar badge/notificação
            this.showInstallBanner();
        });

        window.addEventListener('appinstalled', () => {
            console.log('✅ App instalado com sucesso');
            window.deferredPrompt = null;
            
            // Rastrear instalação
            if ('navigator' in window && 'sendBeacon' in navigator) {
                navigator.sendBeacon('/api/app-installed', JSON.stringify({
                    timestamp: Date.now(),
                    app: 'VoiceHub'
                }));
            }
        });
    }

    /**
     * Mostrar banner de instalação
     */
    showInstallBanner() {
        const banner = document.createElement('div');
        banner.id = 'install-banner';
        banner.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            right: 20px;
            background: linear-gradient(135deg, #4F46E5, #764ba2);
            color: white;
            padding: 16px;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            z-index: 9999;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 12px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        `;

        banner.innerHTML = `
            <div style="flex: 1;">
                <strong>Instale VoiceHub</strong>
                <p style="margin: 4px 0 0 0; font-size: 0.9em; opacity: 0.9;">
                    Use como um app nativo no seu dispositivo
                </p>
            </div>
            <button id="install-app-btn" style="
                background: white;
                color: #4F46E5;
                border: none;
                padding: 8px 16px;
                border-radius: 6px;
                cursor: pointer;
                font-weight: 600;
                white-space: nowrap;
            ">
                Instalar
            </button>
            <button id="dismiss-banner-btn" style="
                background: transparent;
                color: white;
                border: none;
                cursor: pointer;
                font-size: 20px;
                padding: 0;
            ">
                ✕
            </button>
        `;

        document.body.appendChild(banner);

        // Event listeners
        document.getElementById('install-app-btn').addEventListener('click', () => {
            this.triggerInstall();
        });

        document.getElementById('dismiss-banner-btn').addEventListener('click', () => {
            banner.remove();
        });

        // Auto-remover após 8 segundos
        setTimeout(() => {
            if (banner.parentElement) {
                banner.remove();
            }
        }, 8000);
    }

    /**
     * Disparar instalação
     */
    triggerInstall() {
        if (!window.deferredPrompt) {
            console.log('Install prompt não disponível');
            return;
        }

        window.deferredPrompt.prompt();
        window.deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('✅ Usuário aceitou instalação');
            } else {
                console.log('❌ Usuário descartou instalação');
            }
            window.deferredPrompt = null;
        });
    }

    /**
     * Request notification permission
     */
    requestNotificationPermission() {
        if (!('Notification' in window)) {
            console.log('Notificações não suportadas');
            return;
        }

        if (Notification.permission === 'granted') {
            this.showNotification('Notificações ativadas!');
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then((permission) => {
                if (permission === 'granted') {
                    this.showNotification('Notificações ativadas para VoiceHub!');
                }
            });
        }
    }

    /**
     * Show notification
     */
    showNotification(title, options = {}) {
        if ('serviceWorker' in navigator && 'ready' in navigator.serviceWorker) {
            navigator.serviceWorker.ready.then((registration) => {
                registration.showNotification(title, {
                    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%234F46E5"/><stop offset="100%" style="stop-color:%23764ba2"/></linearGradient></defs><rect width="192" height="192" fill="url(%23g)"/><text x="50%" y="50%" font-size="120" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle" font-family="Arial">🗣️</text></svg>',
                    badge: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><circle cx="48" cy="48" r="48" fill="%234F46E5"/></svg>',
                    ...options
                });
            });
        }
    }

    /**
     * Get app version
     */
    getVersion() {
        return '1.0.0';
    }

    /**
     * Get storage info
     */
    async getStorageInfo() {
        if (!('storage' in navigator) || !('estimate' in navigator.storage)) {
            return null;
        }

        return navigator.storage.estimate();
    }

    /**
     * Clear all app data
     */
    async clearAllData() {
        if (confirm('Tem certeza que deseja limpar todos os dados do app?')) {
            // LocalStorage
            localStorage.clear();
            
            // IndexedDB
            if ('indexedDB' in window) {
                const dbs = await window.indexedDB.databases();
                for (const db of dbs) {
                    window.indexedDB.deleteDatabase(db.name);
                }
            }

            // Service Worker cache
            if ('caches' in window) {
                const cacheNames = await caches.keys();
                for (const cacheName of cacheNames) {
                    await caches.delete(cacheName);
                }
            }

            console.log('✅ Todos os dados foram limpos');
            location.reload();
        }
    }
}

// Inicializar PWA config quando DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.pwaConfig = new VoiceHubPWA();
    });
} else {
    window.pwaConfig = new VoiceHubPWA();
}
