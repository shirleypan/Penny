import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Sparkles, AlertCircle, X, ChevronLeft } from 'lucide-react';
import { ChatMessage, Stock } from '../types';
import { generateFinancialAdvice } from '../services/geminiService';

interface SmartAssistantProps {
  stocks: Stock[];
}

const SmartAssistant: React.FC<SmartAssistantProps> = ({ stocks }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '0', role: 'model', text: '你好！我是涨乐AI助理。我可以帮你分析市场行情、解读个股走势或回答金融知识。' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Prepare context
    const context = JSON.stringify(stocks.map(s => ({
        name: s.name,
        symbol: s.symbol,
        current_price: s.price,
        change_percent: s.change
    })));

    // API Call
    const aiResponseText = await generateFinancialAdvice(userMsg.text, context);

    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: aiResponseText
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  const suggestions = ["贵州茅台走势如何？", "今天半导体板块怎么样？", "什么是市盈率？", "宁德时代值得买吗？"];

  return (
    <div className="flex flex-col h-screen bg-gray-50 pb-[85px]">
      {/* Header */}
      <div className="bg-white px-4 py-3 border-b border-gray-200 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 p-2 rounded-full">
            <Sparkles size={20} className="text-blue-600" />
          </div>
          <div>
            <h1 className="font-bold text-gray-900">涨乐 AI</h1>
            <p className="text-[10px] text-green-600 flex items-center">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1 animate-pulse"></span>
              在线中
            </p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
        <div className="flex justify-center my-4">
             <span className="text-xs bg-gray-200 text-gray-500 px-2 py-1 rounded-full">今天 {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
        </div>

        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'model' && (
               <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2 flex-shrink-0 border border-blue-200">
                  <Sparkles size={14} className="text-blue-600" />
               </div>
            )}
            <div 
              className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-br-none' 
                  : 'bg-white text-gray-800 rounded-bl-none border border-gray-100'
              }`}
            >
              {msg.isLoading ? (
                <div className="flex space-x-1 items-center h-5">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                </div>
              ) : (
                <div className="whitespace-pre-wrap">{msg.text}</div>
              )}
            </div>
            {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center ml-2 flex-shrink-0">
                    <User size={16} className="text-gray-500" />
                </div>
            )}
          </div>
        ))}
      </div>

      {/* Suggestions (Only if few messages) */}
      {messages.length < 3 && (
        <div className="px-4 pb-2">
            <div className="flex space-x-2 overflow-x-auto no-scrollbar">
                {suggestions.map((s, i) => (
                    <button 
                        key={i} 
                        onClick={() => { setInput(s); }}
                        className="bg-white border border-blue-100 text-blue-600 px-3 py-1.5 rounded-full text-xs whitespace-nowrap active:bg-blue-50"
                    >
                        {s}
                    </button>
                ))}
            </div>
        </div>
      )}

      {/* Input Area */}
      <div className="bg-white px-4 py-3 border-t border-gray-200">
        <div className="flex items-center space-x-2 bg-gray-100 rounded-full px-4 py-2">
            <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="问问 AI 关于股市的问题..."
                className="flex-1 bg-transparent text-sm outline-none text-gray-800"
                disabled={isLoading}
            />
            <button 
                onClick={handleSend} 
                disabled={isLoading || !input.trim()}
                className={`p-1.5 rounded-full transition-colors ${input.trim() ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-300 text-white'}`}
            >
                <Send size={16} />
            </button>
        </div>
        <div className="text-[10px] text-center text-gray-400 mt-2 flex items-center justify-center">
            <AlertCircle size={10} className="mr-1" />
            AI生成内容仅供参考，不构成投资建议
        </div>
      </div>
    </div>
  );
};

export default SmartAssistant;