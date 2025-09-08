

export async function sendMessage(message) {
  try {
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      throw new Error('Message is required');
    }

   
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: message.trim() }),
    });

   
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }


    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Unknown error occurred');
    }

    return data.response;

  } catch (error) {
    console.error('Error sending message:', error);

   
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      return 'Sorry, there was a network error. Please check your connection and try again.';
    }
    
    if (error.message.includes('quota') || error.message.includes('limit')) {
      return 'Sorry, the service is temporarily unavailable due to high demand. Please try again later.';
    }
    
    return error.message || 'Sorry, I encountered an error. Please try again in a moment.';
  }
}