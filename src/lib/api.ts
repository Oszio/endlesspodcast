const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export interface Topic {
  id: number;
  title: string;
  description: string;
}

export interface ChatMessage {
  text: string;
  sender: string;
  timestamp: string;
}

export async function fetchTopicSuggestions(messages: ChatMessage[]): Promise<Topic[]> {
  try {
    const response = await fetch(`${API_URL}/api/topics/suggestions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch topics: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching topic suggestions:', error);
    return [];
  }
}
