import React, { useState, useRef, useEffect } from 'react';
import { XCircle, Send, MessageCircle, User, Building } from 'lucide-react';

const ChatModal = ({ 
  showModal, 
  application, 
  onClose 
}) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'landlord',
      senderName: 'Property Manager',
      message: 'Hello! Thank you for your interest in our property. We are currently reviewing your application and would like to discuss some details.',
      timestamp: '2025-01-20 10:30 AM',
      avatar: 'https://i.pravatar.cc/40?u=landlord'
    },
    {
      id: 2,
      sender: 'tenant',
      senderName: 'You',
      message: 'Thank you for reaching out. I\'m very interested in the property and happy to discuss any details you need.',
      timestamp: '2025-01-20 11:15 AM',
      avatar: 'https://i.pravatar.cc/40?u=tenant'
    },
    {
      id: 3,
      sender: 'landlord',
      senderName: 'Property Manager',
      message: 'Great! We noticed you\'re flexible on the move-in date. Would you be available for a virtual tour this week?',
      timestamp: '2025-01-20 02:45 PM',
      avatar: 'https://i.pravatar.cc/40?u=landlord'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!showModal || !application) return null;

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'tenant',
        senderName: 'You',
        message: message.trim(),
        timestamp: new Date().toLocaleString(),
        avatar: 'https://i.pravatar.cc/40?u=tenant'
      };
      
      setMessages(prev => [...prev, newMessage]);
      setMessage('');
      
      // Simulate landlord typing and response
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const landlordResponse = {
          id: messages.length + 2,
          sender: 'landlord',
          senderName: 'Property Manager',
          message: 'Thank you for your message. I\'ll review this and get back to you shortly.',
          timestamp: new Date().toLocaleString(),
          avatar: 'https://i.pravatar.cc/40?u=landlord'
        };
        setMessages(prev => [...prev, landlordResponse]);
      }, 2000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-black/30">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 h-[600px] border-0 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <MessageCircle className="w-6 h-6 text-blue-500" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Chat - {application.name}
              </h3>
              <p className="text-sm text-gray-600">{application.address}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 transition-colors hover:text-gray-600"
          >
            <XCircle className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 ${msg.sender === 'tenant' ? 'flex-row-reverse' : ''}`}>
              <div className="flex-shrink-0">
                {msg.sender === 'landlord' ? (
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full">
                    <Building className="w-4 h-4 text-white" />
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-8 h-8 bg-gray-500 rounded-full">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
              <div className={`flex-1 max-w-xs ${msg.sender === 'tenant' ? 'text-right' : ''}`}>
                <div className={`p-3 rounded-lg ${
                  msg.sender === 'tenant' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <p className="text-sm">{msg.message}</p>
                </div>
                <p className="mt-1 text-xs text-gray-500">{msg.timestamp}</p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-3">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full">
                <Building className="w-4 h-4 text-white" />
              </div>
              <div className="p-3 bg-gray-100 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex gap-3">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows="2"
            />
            <button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="flex items-center gap-2 px-4 py-2 text-white transition-colors bg-blue-500 rounded-lg myButton hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
