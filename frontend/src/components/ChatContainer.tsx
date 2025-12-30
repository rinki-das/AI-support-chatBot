import { useState, useEffect, useRef } from 'react';
import { sendMessage } from '../api/chatApi';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import type { Message } from '../types/chat';

export default function ChatContainer({
  onClose,
  initialMessage,
}: {
  onClose?: () => void;
  initialMessage?: string;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessionId, setSessionId] = useState<string>();
  const [loading, setLoading] = useState(false);
  const hasSentInitialMessage = useRef(false); // ✅ Track if already sent

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    setMessages(prev => [...prev, { id: crypto.randomUUID(), sender: 'user', text }]);
    setLoading(true);

    try {
      const res = await sendMessage(text, sessionId);
      setSessionId(res.sessionId);
      setMessages(prev => [...prev, { id: crypto.randomUUID(), sender: 'ai', text: res.reply }]);
    } catch {
      setMessages(prev => [
        ...prev,
        { id: crypto.randomUUID(), sender: 'ai', text: 'Sorry, something went wrong.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Send initial message only once
  useEffect(() => {
    if (initialMessage && !hasSentInitialMessage.current) {
      hasSentInitialMessage.current = true;
      handleSend(initialMessage);
    }
  }, [initialMessage]);

  return (
    <div
      style={{
        width: '380px',
        height: '600px',
        display: 'flex',
        flexDirection: 'column',
        background: '#fff',
        borderRadius: '14px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
        overflow: 'hidden',
      }}
    >
      {/* HEADER */}
      <div
        style={{
          padding: '14px 16px',
          borderBottom: '1px solid #eee',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: '#f9fafb',
        }}
      >
        <div>
          <strong>🤖 Spur Support</strong>
          <div style={{ fontSize: '12px', color: '#16a34a' }}>● Online</div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            style={{
              border: 'none',
              background: 'transparent',
              fontSize: '18px',
              cursor: 'pointer',
            }}
          >
            ✕
          </button>
        )}
      </div>

      <ChatMessages messages={messages} loading={loading} />
      <ChatInput onSend={handleSend} disabled={loading} />
    </div>
  );
}
