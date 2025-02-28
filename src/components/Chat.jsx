import { useState, useEffect, useRef } from 'react';
import Sidebar from './Sidebar';
import { useSelector } from 'react-redux';
import { dispatch } from '../redux/store';
import { 
  sendMessageRequest,
  fetchChatsRequest,
  getMessagesByChatRequest,
  createChatRequest,
} from '../redux/chat/actions';
import usePrevious from '../utils/usePrevious';

const Chat = () => {
  const {
    isSendingMessage,
    messages,
    chatHistory,
    isSendingMessageSuccess,
    isFetchingChatsSuccess,
    isCreatingNewChatSuccess
  } = useSelector(state => state.chat);
  const [inputMessage, setInputMessage] = useState('');
  const [activeChat, setActiveChat] = useState(null);
  const [showNewChatDialog, setShowNewChatDialog] = useState(false);
  const [newChatName, setNewChatName] = useState('');
  const textareaRef = useRef(null);

  const prevIsSendingMessageSuccess = usePrevious(isSendingMessageSuccess);
  const prevIsFetchingChatsSuccess = usePrevious(isFetchingChatsSuccess);
  const prevIsCreatingNewChatSuccess = usePrevious(isCreatingNewChatSuccess);

  const messageEndRef = useRef(null);

  useEffect(() => {
    if (isFetchingChatsSuccess && prevIsFetchingChatsSuccess === false && !activeChat) {
      const mostRecentChat = chatHistory[0];
      setActiveChat(mostRecentChat);
    }
  }, [isFetchingChatsSuccess, activeChat]);

  useEffect(() => {
    if (activeChat?.id) {
      dispatch(getMessagesByChatRequest({chatId: activeChat.id}));
    }
  }, [activeChat])

  useEffect(() => {
    if (isSendingMessageSuccess && prevIsSendingMessageSuccess === false && !activeChat) {
      dispatch(fetchChatsRequest({ userId: 1 }));
    }
  }, [isSendingMessageSuccess, activeChat]);

  useEffect(() => {
    if (isCreatingNewChatSuccess && prevIsCreatingNewChatSuccess === false) {
      const mostRecentChat = chatHistory[0];
      setActiveChat(mostRecentChat);
    }
  }, [isCreatingNewChatSuccess]);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleNewChat = () => {
    setShowNewChatDialog(true);
    setActiveChat(null);
  };

  const handleCreateNewChat = (e) => {
    e.preventDefault();
    
    if (!newChatName.trim()) return;

    dispatch(createChatRequest({
      userId: 1,
      name: newChatName.trim(),
    }));

    setNewChatName('');
    setShowNewChatDialog(false);
  };

  const handleSelectChat = async (chat) => {
    setActiveChat(chat);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    setInputMessage('');

    dispatch(sendMessageRequest({
      message: inputMessage,
      chatId: activeChat?.id,
    }));
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputMessage]);

  return (
    <div className="flex h-screen">
      <Sidebar
        activeChat={activeChat}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
      />
      
      <div className="flex-1 flex flex-col bg-[#0B0F19]">
        <div className="px-6 py-4 border-b border-gray-800">
          <h1 className="text-xl font-semibold text-white">
            {activeChat ? activeChat.name : 'New Chat'}
          </h1>
        </div>

        <div className="px-80 flex-1 flex flex-col">
          {showNewChatDialog && (
            <div className="p-6">
              <form onSubmit={handleCreateNewChat} className="space-y-4">
                <input
                  type="text"
                  value={newChatName}
                  onChange={(e) => setNewChatName(e.target.value)}
                  placeholder="Enter chat name..."
                  className="w-full bg-[#1C2333] text-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-500"
                  autoFocus
                />
                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="cursor-pointer px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    Create Chat
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowNewChatDialog(false)}
                    className="cursor-pointer px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages
              .map((message, index) => (
                <div
                  key={index}
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

            {isSendingMessage && (
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

            <div ref={messageEndRef} />
          </div>

          <div className="p-6 bg-[#0B0F19]">
            <form onSubmit={handleSendMessage} className="relative">
              <textarea
                ref={textareaRef}
                rows={1}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={showNewChatDialog ? "Enter chat name first..." : "Type a message... (Shift+Enter for new line)"}
                className="w-full bg-[#1C2333] text-gray-300 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-500 resize-none overflow-hidden max-h-48"
                disabled={showNewChatDialog}
                style={{ minHeight: '46px' }}
              />
              <button
                type="submit"
                disabled={isSendingMessage || showNewChatDialog}
                className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
