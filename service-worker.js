// VoiceHub Service Worker
// Versão 1.0.0

const CACHE_NAME = 'voicehub-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/manifest.json'
];

// Instalação do Service Worker
self.addEventListener('install', (event) => {
  console.log('🔧 VoiceHub Service Worker instalando...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('📦 Cacheando assets...');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => {
        console.log('✅ Service Worker instalado com sucesso');
        self.skipWaiting();
      })
      .catch((err) => {
        console.error('❌ Erro ao cachear assets:', err);
      })
  );
});

// Ativação do Service Worker
self.addEventListener('activate', (event) => {
  console.log('🚀 VoiceHub Service Worker ativando...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('🧹 Limpando cache antigo:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('✅ Service Worker ativado');
        self.clients.claim();
      })
  );
});

// Interceptação de requisições (Cache First Strategy)
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Apenas GET
  if (request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(request)
      .then((response) => {
        // Cache hit - retorna resposta
        if (response) {
          return response;
        }

        return fetch(request)
          .then((response) => {
            // Verificar se é resposta válida
            if (!response || response.status !== 200 || response.type === 'error') {
              return response;
            }

            // Clonar resposta
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(request, responseToCache);
              });

            return response;
          })
          .catch((err) => {
            console.log('❌ Fetch falhou:', err);
            // Retornar página offline se disponível
            return caches.match('/index.html');
          });
      })
  );
});

// Mensagens do cliente
self.addEventListener('message', (event) => {
  console.log('📨 Mensagem recebida do cliente:', event.data);

  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Sincronização de background
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-history') {
    event.waitUntil(syncHistory());
  }
});

async function syncHistory() {
  try {
    console.log('⏳ Sincronizando histórico...');
    // Implementar sincronização futura se necessário
    return Promise.resolve();
  } catch (error) {
    console.error('❌ Erro na sincronização:', error);
    throw error;
  }
}

// Notificações push
self.addEventListener('push', (event) => {
  if (!event.data) {
    console.log('📬 Push notification recebido sem dados');
    return;
  }

  const data = event.data.json();
  const options = {
    body: data.body || 'VoiceHub - Comunicador Acessível',
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%234F46E5"/><stop offset="100%" style="stop-color:%23764ba2"/></linearGradient></defs><rect width="192" height="192" fill="url(%23g)"/><text x="50%" y="50%" font-size="120" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle" font-family="Arial">🗣️</text></svg>',
    badge: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><circle cx="48" cy="48" r="48" fill="%234F46E5"/></svg>',
    tag: 'voicehub-notification',
    requireInteraction: data.requireInteraction || false
  };

  if (data.actions) {
    options.actions = data.actions;
  }

  event.waitUntil(
    self.registration.showNotification(data.title || 'VoiceHub', options)
  );
});

// Clique em notificação
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action) {
    console.log('📌 Ação de notificação clicada:', event.action);
  } else {
    console.log('📌 Notificação clicada');
  }

  event.waitUntil(
    clients.matchAll({ type: 'window' })
      .then((clientList) => {
        // Verificar se já existe janela aberta
        for (let client of clientList) {
          if (client.url === '/' && 'focus' in client) {
            return client.focus();
          }
        }
        // Abrir nova janela se não existir
        if (clients.openWindow) {
          return clients.openWindow('/');
        }
      })
  );
});

console.log('✅ Service Worker carregado - VoiceHub está offline-ready!');
