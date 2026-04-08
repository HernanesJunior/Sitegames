// === DADOS E CONFIGURAÇÕES ===
const APP_NAME = 'VoiceHub';
const STORAGE_KEYS = {
    PHRASES: `${APP_NAME}_phrases`,
    HISTORY: `${APP_NAME}_history`,
    SETTINGS: `${APP_NAME}_settings`
};

// Frases pré-definidas padrão
const DEFAULT_PHRASES = [
    'Olá, como você está?',
    'Tudo bem?',
    'Obrigado',
    'De nada',
    'Sim',
    'Não',
    'Preciso de ajuda',
    'Qual é o seu nome?',
    'Qual é a hora?',
    'Pode repetir?',
    'Desculpe',
    'Estou bem, e você?'
];

// Sugestões baseadas em padrões de digitação
const SUGGESTIONS_DATA = {
    'ola': 'Olá, como você está?',
    'oi': 'Olá, como você está?',
    'obrigado': 'Obrigado',
    'thanks': 'Obrigado',
    'ajuda': 'Preciso de ajuda',
    'help': 'Preciso de ajuda',
    'sim': 'Sim',
    'yes': 'Sim',
    'nao': 'Não',
    'no': 'Não',
    'desculpe': 'Desculpe',
    'sorry': 'Desculpe',
    'hora': 'Qual é a hora?',
    'time': 'Qual é a hora?',
    'nome': 'Qual é o seu nome?',
    'name': 'Qual é o seu nome?'
};

// === APLICAÇÃO PRINCIPAL ===
class VoiceHub {
    constructor() {
        this.isSpeaking = false;
        this.currentUtterance = null;
        this.phrases = this.loadPhrases();
        this.history = this.loadHistory();
        this.settings = this.loadSettings();
        
        this.init();
    }

    init() {
        this.cacheElements();
        this.attachEventListeners();
        this.renderPhrases();
        this.populateVoices();
        this.applySettings();
    }

    // === CACHE DE ELEMENTOS ===
    cacheElements() {
        // Input
        this.textInput = document.getElementById('textInput');
        this.charCount = document.getElementById('charCount');

        // Buttons
        this.speakBtn = document.getElementById('speakBtn');
        this.clearBtn = document.getElementById('clearBtn');
        this.stopBtn = document.getElementById('stopBtn');
        this.addPhraseBtn = document.getElementById('addPhraseBtn');

        // Status
        this.status = document.getElementById('status');

        // Phrases
        this.phrasesGrid = document.getElementById('phrasesGrid');

        // Suggestions
        this.suggestionsSection = document.getElementById('suggestionsSection');
        this.suggestionsList = document.getElementById('suggestionsList');

        // History
        this.toggleHistoryBtn = document.getElementById('toggleHistory');
        this.historyContainer = document.getElementById('historyContainer');
        this.historyList = document.getElementById('historyList');
        this.clearHistoryBtn = document.getElementById('clearHistoryBtn');

        // Share
        this.shareBtn = document.getElementById('shareBtn');
        this.copyLinkBtn = document.getElementById('copyLinkBtn');
        this.qrContainer = document.getElementById('qrContainer');

        // Settings
        this.voiceSelect = document.getElementById('voiceSelect');
        this.speedSlider = document.getElementById('speedSlider');
        this.speedValue = document.getElementById('speedValue');
        this.pitchSlider = document.getElementById('pitchSlider');
        this.pitchValue = document.getElementById('pitchValue');

        // Modal
        this.phraseModal = document.getElementById('phraseModal');
        this.newPhraseInput = document.getElementById('newPhraseInput');
        this.savePhraseBtn = document.getElementById('savePhraseBtn');
        this.cancelPhraseBtn = document.getElementById('cancelPhraseBtn');
        this.modalClose = document.querySelector('.modal-close');
    }

    // === EVENT LISTENERS ===
    attachEventListeners() {
        // Input
        this.textInput.addEventListener('input', () => this.updateCharCount());
        this.textInput.addEventListener('input', () => this.updateSuggestions());

        // Buttons
        this.speakBtn.addEventListener('click', () => this.speak());
        this.clearBtn.addEventListener('click', () => this.clearInput());
        this.stopBtn.addEventListener('click', () => this.stop());
        this.addPhraseBtn.addEventListener('click', () => this.openPhraseModal());

        // History
        this.toggleHistoryBtn.addEventListener('click', () => this.toggleHistory());
        this.clearHistoryBtn.addEventListener('click', () => this.clearHistory());

        // Share
        this.shareBtn.addEventListener('click', () => this.generateQR());
        this.copyLinkBtn.addEventListener('click', () => this.copyLink());

        // Settings
        this.voiceSelect.addEventListener('change', () => this.saveSettings());
        this.speedSlider.addEventListener('input', (e) => {
            this.speedValue.textContent = parseFloat(e.target.value).toFixed(1);
            this.saveSettings();
        });
        this.pitchSlider.addEventListener('input', (e) => {
            this.pitchValue.textContent = parseFloat(e.target.value).toFixed(1);
            this.saveSettings();
        });

        // Modal
        this.savePhraseBtn.addEventListener('click', () => this.saveNewPhrase());
        this.cancelPhraseBtn.addEventListener('click', () => this.closeModal());
        this.modalClose.addEventListener('click', () => this.closeModal());
        this.newPhraseInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.saveNewPhrase();
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
                this.speak();
            }
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }

    // === FUNCIONALIDADE DE FALA ===
    speak() {
        const text = this.textInput.value.trim();

        if (!text) {
            this.showStatus('Por favor, digite algo para falar', 'error');
            return;
        }

        if (this.isSpeaking) {
            this.stop();
            return;
        }

        try {
            this.isSpeaking = true;
            this.speakBtn.style.display = 'none';
            this.stopBtn.style.display = 'inline-flex';
            this.showStatus(`🗣️ Falando: "${text}"`, 'active');

            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'pt-BR';
            utterance.rate = parseFloat(this.speedSlider.value);
            utterance.pitch = parseFloat(this.pitchSlider.value);
            
            if (this.voiceSelect.value) {
                const voices = window.speechSynthesis.getVoices();
                utterance.voice = voices[this.voiceSelect.value];
            }

            utterance.onend = () => {
                this.onSpeakEnd();
                this.addToHistory(text);
            };

            utterance.onerror = (event) => {
                this.showStatus(`❌ Erro: ${event.error}`, 'error');
                this.onSpeakEnd();
            };

            this.currentUtterance = utterance;
            window.speechSynthesis.speak(utterance);
        } catch (error) {
            this.showStatus(`❌ Erro ao falar: ${error.message}`, 'error');
            this.onSpeakEnd();
        }
    }

    stop() {
        window.speechSynthesis.cancel();
        this.onSpeakEnd();
        this.showStatus('⏹️ Fala parada', 'active');
    }

    onSpeakEnd() {
        this.isSpeaking = false;
        this.speakBtn.style.display = 'inline-flex';
        this.stopBtn.style.display = 'none';
        this.showStatus('');
    }

    // === GERENCIAMENTO DE ENTRADA ===
    updateCharCount() {
        this.charCount.textContent = this.textInput.value.length;
    }

    clearInput() {
        this.textInput.value = '';
        this.updateCharCount();
        this.updateSuggestions();
        this.textInput.focus();
        this.showStatus('✓ Texto limpo', 'active');
    }

    // === SUGESTÕES ===
    updateSuggestions() {
        const text = this.textInput.value.toLowerCase().trim();

        if (!text || text.length < 2) {
            this.suggestionsSection.style.display = 'none';
            return;
        }

        const suggestions = this.getSuggestions(text);

        if (suggestions.length === 0) {
            this.suggestionsSection.style.display = 'none';
            return;
        }

        this.suggestionsSection.style.display = 'block';
        this.suggestionsList.innerHTML = suggestions
            .map(suggestion => `
                <div class="suggestion-item" onclick="app.insertSuggestion('${suggestion.replace(/'/g, "\\'")}')">
                    ${this.escapeHtml(suggestion)}
                </div>
            `)
            .join('');
    }

    getSuggestions(text) {
        const suggestions = new Set();

        // Sugestões por palavra-chave
        for (const [key, value] of Object.entries(SUGGESTIONS_DATA)) {
            if (key.includes(text) || text.includes(key)) {
                suggestions.add(value);
            }
        }

        // Sugestões de frases salvas
        this.phrases.forEach(phrase => {
            if (phrase.toLowerCase().includes(text)) {
                suggestions.add(phrase);
            }
        });

        return Array.from(suggestions).slice(0, 5);
    }

    insertSuggestion(suggestion) {
        this.textInput.value = suggestion;
        this.updateCharCount();
        this.updateSuggestions();
        this.speak();
    }

    // === FRASES PRÉ-DEFINIDAS ===
    renderPhrases() {
        this.phrasesGrid.innerHTML = this.phrases
            .map((phrase, index) => `
                <button class="phrase-btn" onclick="app.insertPhrase('${phrase.replace(/'/g, "\\'")}')">
                    ${this.escapeHtml(phrase)}
                    <button class="delete-phrase" onclick="event.stopPropagation(); app.deletePhrase(${index})">×</button>
                </button>
            `)
            .join('');
    }

    insertPhrase(phrase) {
        this.textInput.value = phrase;
        this.updateCharCount();
        this.updateSuggestions();
        this.speak();
    }

    deletePhrase(index) {
        this.phrases.splice(index, 1);
        this.savePhrases();
        this.renderPhrases();
        this.showStatus('✓ Frase removida', 'active');
    }

    openPhraseModal() {
        this.phraseModal.style.display = 'flex';
        this.newPhraseInput.focus();
    }

    closeModal() {
        this.phraseModal.style.display = 'none';
        this.newPhraseInput.value = '';
    }

    saveNewPhrase() {
        const phrase = this.newPhraseInput.value.trim();

        if (!phrase) {
            this.showStatus('❌ Por favor, digite uma frase', 'error');
            return;
        }

        if (this.phrases.includes(phrase)) {
            this.showStatus('❌ Esta frase já existe', 'error');
            return;
        }

        this.phrases.push(phrase);
        this.savePhrases();
        this.renderPhrases();
        this.closeModal();
        this.showStatus('✓ Frase adicionada', 'active');
    }

    // === ARMAZENAMENTO LOCAL ===
    loadPhrases() {
        const stored = localStorage.getItem(STORAGE_KEYS.PHRASES);
        return stored ? JSON.parse(stored) : DEFAULT_PHRASES;
    }

    savePhrases() {
        localStorage.setItem(STORAGE_KEYS.PHRASES, JSON.stringify(this.phrases));
    }

    loadHistory() {
        const stored = localStorage.getItem(STORAGE_KEYS.HISTORY);
        return stored ? JSON.parse(stored) : [];
    }

    saveHistory() {
        localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(this.history));
    }

    loadSettings() {
        const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
        return stored ? JSON.parse(stored) : {
            voice: '',
            speed: 1,
            pitch: 1
        };
    }

    saveSettings() {
        this.settings = {
            voice: this.voiceSelect.value,
            speed: parseFloat(this.speedSlider.value),
            pitch: parseFloat(this.pitchSlider.value)
        };
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(this.settings));
    }

    // === HISTÓRICO ===
    addToHistory(text) {
        const timestamp = new Date().toLocaleString('pt-BR');
        this.history.unshift({ text, timestamp });

        // Manter apenas últimas 50 mensagens
        if (this.history.length > 50) {
            this.history.pop();
        }

        this.saveHistory();
        this.renderHistory();
    }

    renderHistory() {
        if (this.history.length === 0) {
            this.historyList.innerHTML = '<p style="padding: 15px; text-align: center; color: var(--text-secondary);">Nenhum histórico ainda</p>';
            return;
        }

        this.historyList.innerHTML = this.history
            .map((item, index) => `
                <div class="history-item">
                    <div class="history-item-text">${this.escapeHtml(item.text)}</div>
                    <div style="display: flex; gap: 10px; flex-direction: column; align-items: flex-end;">
                        <div class="history-item-time">${item.timestamp}</div>
                        <div class="history-item-actions">
                            <button class="btn btn-secondary" onclick="app.speakFromHistory('${item.text.replace(/'/g, "\\'")}')" title="Falar">🔊</button>
                            <button class="btn btn-secondary" onclick="app.copyToClipboard('${item.text.replace(/'/g, "\\'")}')" title="Copiar">📋</button>
                            <button class="btn btn-secondary" onclick="app.deleteFromHistory(${index})" title="Deletar">🗑️</button>
                        </div>
                    </div>
                </div>
            `)
            .join('');
    }

    toggleHistory() {
        const isVisible = this.historyContainer.style.display !== 'none';
        this.historyContainer.style.display = isVisible ? 'none' : 'block';
        this.toggleHistoryBtn.setAttribute('aria-expanded', !isVisible);
        if (!isVisible) {
            this.renderHistory();
        }
    }

    speakFromHistory(text) {
        this.textInput.value = text;
        this.updateCharCount();
        this.speak();
    }

    copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            this.showStatus('✓ Copiado para área de transferência', 'active');
        });
    }

    deleteFromHistory(index) {
        if (confirm('Tem certeza que deseja deletar este item do histórico?')) {
            this.history.splice(index, 1);
            this.saveHistory();
            this.renderHistory();
            this.showStatus('✓ Item removido', 'active');
        }
    }

    clearHistory() {
        if (confirm('Tem certeza que deseja limpar todo o histórico?')) {
            this.history = [];
            this.saveHistory();
            this.renderHistory();
            this.showStatus('✓ Histórico limpo', 'active');
        }
    }

    // === COMPARTILHAMENTO ===
    generateQR() {
        const url = window.location.href;
        this.qrContainer.style.display = 'block';
        document.getElementById('qr').innerHTML = '';

        new QRCode(document.getElementById('qr'), {
            text: url,
            width: 256,
            height: 256,
            colorDark: '#4F46E5',
            colorLight: '#FFFFFF',
            correctLevel: QRCode.CorrectLevel.H
        });

        this.showStatus('✓ QR Code gerado', 'active');
    }

    copyLink() {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            this.showStatus('✓ Link copiado: ' + url, 'active');
        });
    }

    // === CONFIGURAÇÕES DE VOZ ===
    populateVoices() {
        const voices = window.speechSynthesis.getVoices();
        const portugueseVoices = voices.filter(voice => 
            voice.lang.startsWith('pt') || 
            voice.lang.startsWith('pt-BR')
        );

        this.voiceSelect.innerHTML = '<option value="">Padrão do Sistema</option>';

        portugueseVoices.forEach((voice, index) => {
            const option = document.createElement('option');
            option.value = voices.indexOf(voice);
            option.textContent = `${voice.name} (${voice.lang})`;
            this.voiceSelect.appendChild(option);
        });

        if (this.settings.voice) {
            this.voiceSelect.value = this.settings.voice;
        }
    }

    applySettings() {
        this.speedSlider.value = this.settings.speed;
        this.speedValue.textContent = this.settings.speed.toFixed(1);
        this.pitchSlider.value = this.settings.pitch;
        this.pitchValue.textContent = this.settings.pitch.toFixed(1);
    }

    // === UTILITÁRIOS ===
    showStatus(message, type) {
        if (!message) {
            this.status.textContent = '';
            this.status.className = 'status';
            return;
        }

        this.status.textContent = message;
        this.status.className = `status ${type}`;

        if (type === 'active') {
            setTimeout(() => {
                if (this.status.textContent === message) {
                    this.showStatus('');
                }
            }, 5000);
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// === INICIALIZAR APLICAÇÃO ===
let app;

document.addEventListener('DOMContentLoaded', () => {
    app = new VoiceHub();
    
    // Atualizar vozes quando carregadas
    window.speechSynthesis.onvoiceschanged = () => {
        app.populateVoices();
    };

    // Mensagem de boas-vindas
    setTimeout(() => {
        app.showStatus('👋 Bem-vindo ao VoiceHub! Comece digitando ou selecionando uma frase.', 'active');
    }, 500);

    // Registrar Service Worker (PWA)
    registerServiceWorker();

    // Verificar se foi instalado como app
    if (window.matchMedia('(display-mode: standalone)').matches) {
        console.log('✅ Executando como app instalado');
    } else if (navigator.standalone === true) {
        console.log('✅ Executando como app no iOS');
    }

    // Event listener para "beforeinstallprompt"
    window.addEventListener('beforeinstallprompt', (e) => {
        console.log('🔔 App pronto para instalar');
        // Pode-se adicionar um banner customizado aqui
    });
});

// === REGISTRO DE SERVICE WORKER ===
async function registerServiceWorker() {
    if (!('serviceWorker' in navigator)) {
        console.log('⚠️ Service Worker não suportado');
        return;
    }

    try {
        console.log('📝 Registrando Service Worker...');
        const registration = await navigator.serviceWorker.register('/service-worker.js', {
            scope: '/',
            updateViaCache: 'none'
        });

        console.log('✅ Service Worker registrado:', registration);

        // Verificar se há atualização disponível
        registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            
            newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'activated') {
                    console.log('🔄 Nova versão do app disponível!');
                    // Pode notificar o usuário aqui
                    showUpdateNotification(registration);
                }
            });
        });

        // Verificar atualizações a cada 24 horas
        setInterval(() => {
            registration.update();
        }, 1000 * 60 * 60 * 24);

    } catch (error) {
        console.error('❌ Erro ao registrar Service Worker:', error);
    }
}

// Notificar usuário sobre atualização
function showUpdateNotification(registration) {
    const status = document.getElementById('status');
    if (status) {
        status.innerHTML = '🔄 <strong>Atualização disponível!</strong> Atualize a página para usar a versão mais recente.';
        status.className = 'status active';
    }
}

// Suporte para instalação em iOS (prompts customizados)
function installAppIOS() {
    const status = document.getElementById('status');
    if (status) {
        status.innerHTML = '📱 Para instalar no iOS: <br>1. Clique em <strong>Compartilhar</strong><br>2. Selecione <strong>"Adicionar à tela inicial"</strong>';
        status.className = 'status active';
        setTimeout(() => status.innerHTML = '', 8000);
    }
}