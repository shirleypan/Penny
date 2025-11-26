import React, { useState } from 'react';
import { ChevronLeft, Search, Share2, MoreHorizontal, MessageSquareText, FileText, Bell } from 'lucide-react';
import { Stock, COLOR_UP, COLOR_DOWN, BG_UP, BG_DOWN } from '../types';
import StockChart from '../components/StockChart';
import { generateFinancialAdvice } from '../services/geminiService';

interface StockDetailProps {
  stock: Stock;
  onBack: () => void;
}

const StockDetail: React.FC<StockDetailProps> = ({ stock, onBack }) => {
  const [activeChartTab, setActiveChartTab] = useState('分时');
  const [activeNewsTab, setActiveNewsTab] = useState('资讯');
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const isUp = stock.change > 0;
  const colorClass = isUp ? COLOR_UP : COLOR_DOWN;
  const bgClass = isUp ? BG_UP : BG_DOWN;

  const handleAiAnalysis = async () => {
    setAnalyzing(true);
    const context = JSON.stringify(stock);
    const prompt = `请用简练专业的语言分析股票 ${stock.name} (${stock.symbol}) 当前的盘面情况。包含技术面和可能的影响因素。`;
    const result = await generateFinancialAdvice(prompt, context);
    setAiAnalysis(result);
    setAnalyzing(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 z-50 fixed inset-0 overflow-hidden">
      {/* Navbar */}
      <div className="bg-white flex items-center justify-between px-4 py-3 border-b border-gray-100 sticky top-0 z-20">
        <div className="flex items-center space-x-4">
          <button onClick={onBack} className="p-1 -ml-2 text-gray-800">
            <ChevronLeft size={24} />
          </button>
          <div className="flex flex-col items-center">
             <span className="text-base font-bold text-gray-900 leading-tight">{stock.name}</span>
             <span className="text-[10px] text-gray-500">{stock.symbol}</span>
          </div>
        </div>
        <div className="flex items-center space-x-4 text-gray-600">
          <Search size={20} />
          <Share2 size={20} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-20 no-scrollbar">
        {/* Header Metrics */}
        <div className="bg-white px-4 pt-4 pb-2">
          <div className="flex items-baseline justify-between">
            <div className={`text-4xl font-bold ${colorClass} font-mono tracking-tighter`}>
              {stock.price.toFixed(2)}
            </div>
            <div className="flex flex-col items-end">
               <span className="text-xs text-gray-400">交易中 11:30:00</span>
            </div>
          </div>
          <div className="flex items-center space-x-4 mt-1 mb-4">
             <span className={`text-sm font-medium ${colorClass}`}>
                {stock.change > 0 ? '+' : ''}{stock.change.toFixed(2)}%
             </span>
             <span className={`text-sm font-medium ${colorClass}`}>
                {stock.change > 0 ? '+' : ''}{(stock.price * stock.change / 100).toFixed(2)}
             </span>
          </div>

          {/* Detailed Grid */}
          <div className="grid grid-cols-4 gap-y-2 text-xs text-gray-900">
             <div className="flex flex-col">
               <span className="text-gray-400 mb-0.5">今开</span>
               <span className={stock.open > stock.prevClose ? COLOR_UP : COLOR_DOWN}>{stock.open.toFixed(2)}</span>
             </div>
             <div className="flex flex-col">
               <span className="text-gray-400 mb-0.5">最高</span>
               <span className={COLOR_UP}>{stock.high.toFixed(2)}</span>
             </div>
             <div className="flex flex-col">
               <span className="text-gray-400 mb-0.5">最低</span>
               <span className={COLOR_DOWN}>{stock.low.toFixed(2)}</span>
             </div>
             <div className="flex flex-col">
               <span className="text-gray-400 mb-0.5">换手</span>
               <span>{stock.turnover}</span>
             </div>
             <div className="flex flex-col">
               <span className="text-gray-400 mb-0.5">成交量</span>
               <span>{stock.volume}</span>
             </div>
             <div className="flex flex-col">
               <span className="text-gray-400 mb-0.5">市盈率</span>
               <span>{stock.pe}</span>
             </div>
             <div className="flex flex-col col-span-2">
               <span className="text-gray-400 mb-0.5">总市值</span>
               <span>{stock.marketCap}</span>
             </div>
          </div>
        </div>

        {/* AI Insight Banner */}
        <div className="mt-2 bg-white px-4 py-3">
          <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
             <div className="flex justify-between items-center mb-2">
                <div className="flex items-center space-x-2">
                   <MessageSquareText size={16} className="text-blue-600" />
                   <span className="font-bold text-sm text-blue-800">涨乐AI 智能分析</span>
                </div>
                {!aiAnalysis && !analyzing && (
                  <button onClick={handleAiAnalysis} className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full">
                    立即分析
                  </button>
                )}
             </div>
             {analyzing && <div className="text-xs text-blue-600 animate-pulse">正在分析盘面数据...</div>}
             {aiAnalysis && (
               <div className="text-xs text-gray-700 leading-relaxed animate-in fade-in">
                 {aiAnalysis}
               </div>
             )}
          </div>
        </div>

        {/* Chart Section */}
        <div className="mt-2 bg-white pt-2 pb-4">
           <div className="flex border-b border-gray-100 px-4 mb-4">
             {['分时', '五日', '日K', '周K', '月K'].map(tab => (
               <button 
                 key={tab}
                 onClick={() => setActiveChartTab(tab)}
                 className={`mr-6 pb-2 text-sm font-medium transition-colors relative ${activeChartTab === tab ? 'text-gray-900' : 'text-gray-500'}`}
               >
                 {tab}
                 {activeChartTab === tab && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-blue-600 rounded-full"></div>}
               </button>
             ))}
           </div>
           <div className="px-2 h-64">
              <StockChart isPositive={isUp} dataPoints={activeChartTab === '分时' ? 40 : 20} className="h-64" />
           </div>
           {/* Chart Tools Mock */}
           <div className="flex justify-between px-6 mt-2">
              {['前复权', 'MACD', 'KDJ', 'RSI'].map(tool => (
                 <span key={tool} className="text-[10px] text-gray-400 border border-gray-200 px-2 py-0.5 rounded">{tool}</span>
              ))}
           </div>
        </div>

        {/* News Section */}
        <div className="mt-2 bg-white min-h-[300px]">
           <div className="flex border-b border-gray-100">
              {['资讯', '公告', '研报', '简况'].map(tab => (
                 <button
                   key={tab}
                   onClick={() => setActiveNewsTab(tab)}
                   className={`flex-1 py-3 text-sm font-medium text-center ${activeNewsTab === tab ? 'text-blue-600 bg-blue-50/50' : 'text-gray-600'}`}
                 >
                   {tab}
                 </button>
              ))}
           </div>
           
           <div className="p-4 space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex flex-col space-y-2 border-b border-gray-50 pb-3 last:border-0">
                   <h3 className="text-sm text-gray-800 leading-snug line-clamp-2">
                     {activeNewsTab === '资讯' && `${stock.name} 行业最新动态：主力资金今日净流入超...`}
                     {activeNewsTab === '公告' && `${stock.name} 关于召开2025年第一次临时股东大会的通知`}
                     {activeNewsTab === '研报' && `【深度】${stock.name}：估值回归合理区间，维持“买入”评级`}
                     {activeNewsTab === '简况' && `公司基本面分析：营收稳步增长，现金流健康`}
                   </h3>
                   <div className="flex justify-between items-center text-[10px] text-gray-400">
                      <span>{activeNewsTab === '公告' ? '公司公告' : '财联社'}</span>
                      <span>{10 + i}:3{i}</span>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* Bottom Trading Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 safe-bottom flex items-center space-x-3 shadow-lg">
         <div className="flex items-center space-x-5 px-2">
            <div className="flex flex-col items-center space-y-1 text-gray-500">
               <MoreHorizontal size={20} />
               <span className="text-[10px]">更多</span>
            </div>
            <div className="flex flex-col items-center space-y-1 text-gray-500">
               <Bell size={20} />
               <span className="text-[10px]">提醒</span>
            </div>
         </div>
         <button className={`flex-1 ${BG_DOWN} text-white font-medium text-base py-2.5 rounded-lg active:opacity-90`}>
            卖出
         </button>
         <button className={`flex-1 ${BG_UP} text-white font-medium text-base py-2.5 rounded-lg active:opacity-90`}>
            买入
         </button>
      </div>
    </div>
  );
};

export default StockDetail;