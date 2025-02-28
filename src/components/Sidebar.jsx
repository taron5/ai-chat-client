import { useState, useEffect } from 'react';
import { dispatch } from '../redux/store';
import { fetchChatsRequest } from '../redux/chat/actions';
import { useSelector } from 'react-redux';

const API_URL = import.meta.env.VITE_API_URL;

const Sidebar = ({ onNewChat, activeChat, onSelectChat }) => {
  const {chatHistory, isFetchingChats} = useSelector(state => state.chat);
  const [error, setError] = useState(null);

  useEffect(() => {
    dispatch(fetchChatsRequest({userId: 1}));
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="w-64 bg-[#0B0F19] border-r border-gray-800 flex flex-col h-screen">
      <div className="p-4">
        <button
          onClick={onNewChat}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
          </svg>
          <span>New Chat</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-2">
        {isFetchingChats ? (
          <div className="flex justify-center py-4">
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        ) : error ? (
          <div className="text-red-400 text-sm text-center py-4 px-2">
            {error}
          </div>
        ) : chatHistory.length === 0 ? (
          <div className="text-gray-400 text-sm text-center py-4">
            No chat history
          </div>
        ) : (
          <div className="space-y-1">
            {chatHistory.map((chat) => (
              <button
                key={chat.id}
                onClick={() => onSelectChat(chat)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 ${
                  activeChat?.id === chat.id
                    ? 'bg-[#1C2333] text-white'
                    : 'text-gray-400 hover:bg-[#1C2333] hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path d="M3.505 2.365A41.369 41.369 0 019 2c1.863 0 3.697.124 5.495.365 1.247.167 2.18 1.108 2.435 2.268a4.45 4.45 0 00-.577-.069 43.141 43.141 0 00-4.706 0C9.229 4.696 7.5 6.727 7.5 8.998v2.24c0 1.413.67 2.735 1.76 3.562l-2.98 2.98A.75.75 0 015 17.25v-3.443c-.501-.048-1-.106-1.495-.172C2.033 13.438 1 12.162 1 10.72V5.28c0-1.441 1.033-2.717 2.505-2.914z" />
                  </svg>
                  <span className="truncate text-sm">{chat.name}</span>
                </div>
                <div className="text-xs text-gray-500 ml-6 mt-1">
                  {formatDate(chat.createdAt)}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar; 