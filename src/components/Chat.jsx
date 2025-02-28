import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';

const API_URL = import.meta.env.VITE_API_URL;

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeChat, setActiveChat] = useState(null);

  // Show welcome message only for new chats
  useEffect(() => {
    if (!activeChat) {
      setMessages([{
        id: Date.now(),
        message: 'Hello! How can I help you today?',
        sender: 'ai',
        timestamp: new Date().toISOString(),
      }]);
    }
  }, [activeChat]);

  const handleNewChat = () => {
    setActiveChat(null);
  };

  const handleSelectChat = async (chat) => {
    setActiveChat(chat);
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/chat/${chat.id}/messages`);
      if (!response.ok) {
        throw new Error('Failed to fetch chat messages');
      }
      const data = await response.json();
      if (data.success) {
        setMessages(data.messages || []);
      } else {
        throw new Error(data.message || 'Failed to fetch chat messages');
      }
    } catch (error) {
      console.error('Error fetching chat messages:', error);
      setMessages([{
        id: Date.now(),
        message: 'Failed to load chat messages. Please try again.',
        sender: 'ai',
        timestamp: new Date().toISOString(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      message: inputMessage,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/chat/message/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          chatId: activeChat?.id,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const { message } = await response.json();
      const data = message.assistant;
      const aiMessage = {
        id: data.id,
        message: data.message,
        sender: message.sender,
        timestamp: data.timestamp,
        chatId: message.chatId,
      };

      setMessages((prev) => [...prev, aiMessage]);

      if (!activeChat?.id) {
        
      }
    } catch (error) {
      console.error('Failed to get AI response:', error);
      // Add error message to chat
      const errorMessage = {
        id: Date.now(),
        message: 'Sorry, I encountered an error. Please try again.',
        sender: 'ai',
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        activeChat={activeChat}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
      />
      
      <div className="flex-1 flex flex-col bg-[#0B0F19]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-800">
          <h1 className="text-xl font-semibold text-white">
            {activeChat ? activeChat.name : 'New Chat'}
          </h1>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div className="flex items-start space-x-3">
                {message.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                    <span className="text-indigo-400 text-sm">AI</span>
                  </div>
                )}
                <div
                  className={`px-4 py-3 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-indigo-500 text-white'
                      : 'bg-[#1C2333] text-gray-300'
                  }`}
                >
                  {message.message}
                </div>
                {message.sender === 'user' && (
                  <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
                    <span className="text-white text-sm">U</span>
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                  <span className="text-indigo-400 text-sm">AI</span>
                </div>
                <div className="bg-[#1C2333] rounded-2xl px-4 py-3">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="p-6 bg-[#0B0F19]">
          <form onSubmit={handleSendMessage} className="relative">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type a message..."
              className="w-full bg-[#1C2333] text-gray-300 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-500"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat; 