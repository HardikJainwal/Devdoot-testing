'use client';

import { useState, useRef, useEffect } from 'react';
import { sendMessage } from '@/lib/gemini';

const ChatFidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasAutoOpened, setHasAutoOpened] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'Hello! I\'m your medical health assistant. How can I help you with your health concerns today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-open modal after 5 seconds on first visit
  useEffect(() => {
    if (!hasAutoOpened) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        setHasAutoOpened(true);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [hasAutoOpened]);

  const handleCloseModal = () => {
    setIsOpen(false);
    setHasAutoOpened(true);
  };

  const handleSendMessage = async (e) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim() && !selectedFile) return;
    if (isLoading) return;

    const newMessages = [];

    // Add user text message if present
    if (inputMessage.trim()) {
      const userMessage = {
        type: 'user',
        text: inputMessage.trim(),
        timestamp: new Date()
      };
      newMessages.push(userMessage);
    }

    // Add file message if a file is selected
    if (selectedFile) {
      const fileMessage = {
        type: 'user',
        file: selectedFile,
        fileName: selectedFile.name,
        fileType: selectedFile.type,
        timestamp: new Date()
      };
      newMessages.push(fileMessage);
    }

    setMessages(prev => [...prev, ...newMessages]);
    setInputMessage('');
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setIsLoading(true);

    try {
      // Handle text message
      let response = '';
      if (inputMessage.trim()) {
        response = await sendMessage(inputMessage.trim());
      } else if (selectedFile) {
        // Placeholder for file upload handling
        response = 'File received. Please provide additional details about your medical query.';
      }
      const botMessage = {
        type: 'bot',
        text: response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        type: 'bot',
        text: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type.startsWith('image/') || file.type === 'application/pdf')) {
      setSelectedFile(file);
    } else {
      alert('Please upload an image or PDF file.');
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-96 h-[500px] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col animate-in slide-in-from-bottom-2 duration-300">
          {/* Header */}
          <div className="bg-white text-white p-3 rounded-t-lg flex items-center justify-between relative overflow-hidden">
  <div className="flex items-center space-x-3 z-10">
    <img
      src="/images/Logo.png"
      alt="Medical Assistant"
      className="w-24 h-8 rounded-full" // Reduced width from w-28 to w-24
    />
    <div className="flex flex-col">
      <span className="font-semibold text-lg ml-4 text-white">Medical Assistant</span>
    </div>
  </div>
  <button
    onClick={() => setIsOpen(false)}
    className="text-white hover:text-gray-200 transition-colors p-1 hover:bg-white/10 rounded-full z-10"
  >
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>
  <div
    className="absolute inset-0 bg-[#2C8C91]"
    style={{
      left: '100px', // Increased from 140px to give more space for the logo
      clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)', // Adjusted clipPath to start slightly further right
    }}
  ></div>
</div>

          {/* Messages */}
          <div className="flex-1 bg-gray-100 overflow-y-auto p-3 space-y-3">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                    message.type === 'user'
                      ? 'bg-[#2C8C91] text-white rounded-br-none'
                      : 'bg-gray-300 text-gray-800 rounded-bl-none'
                  }`}
                >
                  {message.text && <p className="whitespace-pre-wrap">{message.text}</p>}
                  {message.file && (
                    <div className="mt-1">
                      {message.fileType.startsWith('image/') ? (
                        <img
                          src={URL.createObjectURL(message.file)}
                          alt={message.fileName}
                          className="max-w-full h-auto rounded"
                        />
                      ) : (
                        <a
                          href={URL.createObjectURL(message.file)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-100 underline"
                        >
                          {message.fileName}
                        </a>
                      )}
                    </div>
                  )}
                  <p className={`text-xs mt-1 ${message.type === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 rounded-lg rounded-bl-none px-3 py-2 text-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
  type="text"
  value={inputMessage}
  onChange={(e) => setInputMessage(e.target.value)}
  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(e)}
  placeholder="Ask a medical question..."
  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  disabled={isLoading}
/>
              <label
                className={`px-4 py-2 bg-[#2C8C91] text-white rounded-full hover:bg-[#37B1B8] transition-colors ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                }`}
              >
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  ref={fileInputRef}
                  disabled={isLoading}
                />
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </label>
              <button
                onClick={handleSendMessage}
                disabled={(!inputMessage.trim() && !selectedFile) || isLoading}
                className="px-4 py-2 bg-[#2C8C91] text-white rounded-full hover:bg-[#37B1B8] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            {selectedFile && (
              <div className="mt-2 text-sm text-gray-600">
                Selected: {selectedFile.name}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Fidget Button - Centered */}
      <div className="flex justify-end">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 ${
            isOpen ? 'bg-red-500 hover:bg-red-500' : 'bg-[#C42323] hover:bg-red-500'
          } text-white`}
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatFidget;