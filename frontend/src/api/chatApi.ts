const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export interface ChatResponse {
  reply: string;
  sessionId: string;
}

export async function sendMessage(
  message: string,
  sessionId?: string
): Promise<ChatResponse> {
  const res = await fetch(`${API_URL}/chat/message`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message, sessionId }),
  });

  if (!res.ok) {
    throw new Error('Failed to send message');
  }

  return res.json();
}
