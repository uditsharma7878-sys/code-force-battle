import React, { useState, useEffect, useRef } from 'react';
import socket from '../socket';
import '../styles/Chat.css';

const MAX_MESSAGES = 100; 
const MAX_MESSAGE_AGE = 24 * 60 * 60 * 1000; 

function Chat({ roomId, handle, team }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const [activeChannel, setActiveChannel] = useState('general'); // 'general', 'teamA', 'teamB'
  const messagesEndRef = useRef(null);
  const sentMessagesRef = useRef(new Set()); // Track sent message IDs

  // Load messages from localStorage on component mount
  useEffect(() => {
    try {
      const savedMessages = localStorage.getItem(`chat_${roomId}_${activeChannel}`);
      if (savedMessages) {
        const parsedMessages = JSON.parse(savedMessages);
        // Filter out old messages
        const now = Date.now();
        const recentMessages = parsedMessages.filter(msg => {
          const msgTime = new Date(msg.timestamp).getTime();
          return now - msgTime < MAX_MESSAGE_AGE;
        });
        setMessages(recentMessages);
      }
    } catch (error) {
      console.error('Error loading messages:', error);
      setMessages([]); 
    }
  }, [roomId, activeChannel]);


  useEffect(() => {
    try {

      const recentMessages = messages.slice(-MAX_MESSAGES);
      localStorage.setItem(`chat_${roomId}_${activeChannel}`, JSON.stringify(recentMessages));
    } catch (error) {
      console.error('Error saving messages:', error);
   
      try {
        const oldMessages = messages.slice(-Math.floor(MAX_MESSAGES / 2));
        localStorage.setItem(`chat_${roomId}_${activeChannel}`, JSON.stringify(oldMessages));
      } catch (storageError) {
        console.error('Failed to save even with cleanup:', storageError);
      }
    }
  }, [messages, roomId, activeChannel]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

 
  useEffect(() => {
    socket.on('chatMessage', (message) => {
     
      if (!sentMessagesRef.current.has(message.id) &&
          (message.channel === activeChannel || 
           (message.channel === 'teamA' && team === 'teamA') ||
           (message.channel === 'teamB' && team === 'teamB'))) {
        setMessages(prev => [...prev, message]);
      }
    });

    return () => {
      socket.off('chatMessage');
    };
  }, [activeChannel, team]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const messageId = Date.now();
    const message = {
      id: messageId,
      handle,
      team,
      channel: activeChannel,
      timestamp: new Date().toISOString(),
      content: newMessage.trim()
    };

    
    sentMessagesRef.current.add(messageId);

    setMessages(prev => {
      const updatedMessages = [...prev, message];
      return updatedMessages.slice(-MAX_MESSAGES); 
    });
    
    socket.emit('chatMessage', message);

    setNewMessage('');
    setTimeout(() => {
      sentMessagesRef.current.delete(messageId);
    }, 5000); 
  };




  return (
    <div className="chat-container">
      {}
      <div className="chat-tabs">
        <button
          onClick={() => setActiveChannel('general')}
          className={`chat-tab ${activeChannel === 'general' ? 'active' : ''}`}
        >
          General
        </button>
        {team === 'teamA' && (
          <button
            onClick={() => setActiveChannel('teamA')}
            className={`chat-tab team-a ${activeChannel === 'teamA' ? 'active' : ''}`}
          >
            Same Team
          </button>
        )}
        {team === 'teamB' && (
          <button
            onClick={() => setActiveChannel('teamB')}
            className={`chat-tab team-b ${activeChannel === 'teamB' ? 'active' : ''}`}
          >
            Same Team
          </button>
        )}
      </div>

      {/* Messages Area */}
      <div className="messages-area">
        {messages
          .filter(msg => msg.channel === activeChannel)
          .map(message => (
            <div
              key={message.id}
              className={`message ${message.handle === handle ? 'own-message' : ''}`}
            >
              <div className={`message-sender ${message.team === 'teamA' ? 'team-a' : 'team-b'}`}>
                {message.handle}
              </div>
              {message.content && (
                <div className="message-content">{message.content}</div>
              )}

              <div className="message-timestamp">
                {new Date(message.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="input-area">

        <div className="input-container">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type a message..."
            className="message-input"
          />


          <button
            onClick={handleSendMessage}
            className="send-btn"
          >
            <span>Send</span>
          </button>
        </div>

      </div>
    </div>
  );
}

export default Chat; 