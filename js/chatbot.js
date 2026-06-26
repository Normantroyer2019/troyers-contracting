(function () {
  // ── Inject Styles ──
  const style = document.createElement('style');
  style.textContent = `
    #tc-chat-btn {
      position: fixed;
      bottom: 90px;
      right: 20px;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: #D4652E;
      color: #fff;
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0,0,0,0.25);
      z-index: 9998;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s, background 0.2s;
    }
    #tc-chat-btn:hover {
      transform: scale(1.08);
      background: #c45a27;
    }
    #tc-chat-btn svg {
      width: 28px;
      height: 28px;
      fill: #fff;
    }

    #tc-chat-panel {
      position: fixed;
      bottom: 160px;
      right: 20px;
      width: 370px;
      max-width: calc(100vw - 32px);
      height: 480px;
      max-height: calc(100vh - 200px);
      background: #fff;
      border-radius: 16px;
      box-shadow: 0 8px 30px rgba(0,0,0,0.2);
      z-index: 9999;
      display: none;
      flex-direction: column;
      overflow: hidden;
      font-family: 'Roboto', Arial, sans-serif;
    }
    #tc-chat-panel.tc-open {
      display: flex;
    }

    /* Header */
    #tc-chat-header {
      background: #1a1a2e;
      color: #fff;
      padding: 14px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-shrink: 0;
    }
    #tc-chat-header .tc-header-left {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    #tc-chat-header .tc-header-left .tc-avatar {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background: #D4652E;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 14px;
    }
    #tc-chat-header .tc-title {
      font-size: 15px;
      font-weight: 600;
      line-height: 1.2;
    }
    #tc-chat-header .tc-subtitle {
      font-size: 11px;
      opacity: 0.7;
      line-height: 1.2;
    }
    #tc-chat-close {
      background: none;
      border: none;
      color: #fff;
      font-size: 22px;
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 6px;
      line-height: 1;
      transition: background 0.15s;
    }
    #tc-chat-close:hover {
      background: rgba(255,255,255,0.15);
    }

    /* Messages */
    #tc-chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      background: #f5f5f7;
    }
    .tc-msg {
      max-width: 82%;
      padding: 10px 14px;
      border-radius: 14px;
      font-size: 14px;
      line-height: 1.45;
      word-wrap: break-word;
    }
    .tc-msg-assistant {
      background: #fff;
      color: #1a1a2e;
      align-self: flex-start;
      border-bottom-left-radius: 4px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.08);
    }
    .tc-msg-user {
      background: #D4652E;
      color: #fff;
      align-self: flex-end;
      border-bottom-right-radius: 4px;
    }

    /* Typing indicator */
    .tc-typing {
      display: flex;
      align-items: center;
      gap: 5px;
      padding: 10px 14px;
      background: #fff;
      border-radius: 14px;
      border-bottom-left-radius: 4px;
      align-self: flex-start;
      box-shadow: 0 1px 3px rgba(0,0,0,0.08);
    }
    .tc-typing span {
      width: 7px;
      height: 7px;
      background: #999;
      border-radius: 50%;
      animation: tc-bounce 1.2s infinite;
    }
    .tc-typing span:nth-child(2) { animation-delay: 0.2s; }
    .tc-typing span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes tc-bounce {
      0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
      30% { transform: translateY(-6px); opacity: 1; }
    }

    /* Input area */
    #tc-chat-input-area {
      display: flex;
      align-items: center;
      padding: 10px 12px;
      border-top: 1px solid #e5e5e5;
      background: #fff;
      gap: 8px;
      flex-shrink: 0;
    }
    #tc-chat-input {
      flex: 1;
      border: 1px solid #ddd;
      border-radius: 22px;
      padding: 9px 16px;
      font-size: 14px;
      font-family: inherit;
      outline: none;
      transition: border-color 0.15s;
      resize: none;
    }
    #tc-chat-input:focus {
      border-color: #D4652E;
    }
    #tc-chat-send {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: #D4652E;
      color: #fff;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: background 0.15s;
    }
    #tc-chat-send:hover {
      background: #c45a27;
    }
    #tc-chat-send:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
    #tc-chat-send svg {
      width: 18px;
      height: 18px;
      fill: #fff;
    }

    /* Mobile */
    @media (max-width: 480px) {
      #tc-chat-panel {
        bottom: 0;
        right: 0;
        width: 100vw;
        max-width: 100vw;
        height: 100vh;
        max-height: 100vh;
        border-radius: 0;
      }
    }
  `;
  document.head.appendChild(style);

  // ── Chat Button ──
  const btn = document.createElement('button');
  btn.id = 'tc-chat-btn';
  btn.setAttribute('aria-label', 'Open chat');
  btn.innerHTML = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z"/><path d="M7 9h10v2H7zM7 5h10v2H7z"/></svg>`;
  document.body.appendChild(btn);

  // ── Chat Panel ──
  const panel = document.createElement('div');
  panel.id = 'tc-chat-panel';
  panel.innerHTML = `
    <div id="tc-chat-header">
      <div class="tc-header-left">
        <div class="tc-avatar">TC</div>
        <div>
          <div class="tc-title">Chat with Us</div>
          <div class="tc-subtitle">Troyer's Contracting</div>
        </div>
      </div>
      <button id="tc-chat-close" aria-label="Close chat">&times;</button>
    </div>
    <div id="tc-chat-messages"></div>
    <div id="tc-chat-input-area">
      <input type="text" id="tc-chat-input" placeholder="Type a message..." autocomplete="off">
      <button id="tc-chat-send" aria-label="Send message">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
      </button>
    </div>
  `;
  document.body.appendChild(panel);

  // ── State ──
  const messagesEl = document.getElementById('tc-chat-messages');
  const inputEl = document.getElementById('tc-chat-input');
  const sendBtn = document.getElementById('tc-chat-send');
  let conversationHistory = [];
  let isOpen = false;
  let hasGreeted = false;

  // ── Helpers ──
  function addMessage(role, text) {
    const div = document.createElement('div');
    div.className = 'tc-msg tc-msg-' + role;
    div.textContent = text;
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function showTyping() {
    const div = document.createElement('div');
    div.className = 'tc-typing';
    div.id = 'tc-typing-indicator';
    div.innerHTML = '<span></span><span></span><span></span>';
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function hideTyping() {
    const el = document.getElementById('tc-typing-indicator');
    if (el) el.remove();
  }

  // ── Open / Close ──
  function openChat() {
    panel.classList.add('tc-open');
    isOpen = true;
    if (!hasGreeted) {
      addMessage('assistant', "Hi! I'm Troyer's Contracting virtual assistant. How can I help you today?");
      hasGreeted = true;
    }
    inputEl.focus();
  }

  function closeChat() {
    panel.classList.remove('tc-open');
    isOpen = false;
  }

  btn.addEventListener('click', function () {
    if (isOpen) {
      closeChat();
    } else {
      openChat();
    }
  });

  document.getElementById('tc-chat-close').addEventListener('click', closeChat);

  // ── Send Message ──
  async function sendMessage() {
    const text = inputEl.value.trim();
    if (!text) return;

    inputEl.value = '';
    addMessage('user', text);
    conversationHistory.push({ role: 'user', content: text });

    sendBtn.disabled = true;
    inputEl.disabled = true;
    showTyping();

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: conversationHistory })
      });

      const data = await res.json();

      hideTyping();

      if (data.reply) {
        addMessage('assistant', data.reply);
        conversationHistory.push({ role: 'assistant', content: data.reply });
      } else {
        addMessage('assistant', 'Sorry, something went wrong. Please try calling us at (716) 640-3216.');
      }
    } catch (err) {
      hideTyping();
      addMessage('assistant', 'Sorry, I\'m having trouble connecting. Please call us at (716) 640-3216 or email troyercontractingllc@gmail.com.');
    }

    sendBtn.disabled = false;
    inputEl.disabled = false;
    inputEl.focus();
  }

  sendBtn.addEventListener('click', sendMessage);
  inputEl.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  });
})();
