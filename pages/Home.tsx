import React from 'react';
import { Search, Bell, Menu } from 'lucide-react';
import { INDICES, HOT_SECTORS } from '../constants';
import { Stock, COLOR_UP, COLOR_DOWN } from '../types';

interface HomeProps {
  stocks: Stock[];
  onStockClick: (stock: Stock) => void;
}

const Home: React.FC<HomeProps> = ({ stocks, onStockClick }) => {
  return (
    <div className="pb-24 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4 pt-8 pb-12 rounded-b-[2rem] shadow-sm text-white">
        <div className="flex items-center justify-between mb-6">
          <Menu size={24} className="opacity-90" />
          <div className="flex-1 mx-4 relative">
            <input 
              type="text" 
              placeholder="代码 / 拼音 / 首字母" 
              className="w-full bg-white/20 backdrop-blur-md rounded-full py-2 pl-9 pr-4 text-sm placeholder-white/70 text-white outline-none border border-white/10"
            />
            <Search size={16} className="absolute left-3 top-2.5 text-white/70" />
          </div>
          <Bell size={24} className="opacity-90" />
        </div>

        {/* Indices Grid */}
        <div className="grid grid-cols-3 gap-3">
          {INDICES.map((idx, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className="text-xs text-blue-100 opacity-90 mb-1">{idx.name}</span>
              <span className={`text-xl font-bold ${idx.change > 0 ? 'text-[#ff6b6b]' : 'text-[#4cd137]'}`}>
                {idx.value}
              </span>
              <div className="flex items-center space-x-1 text-xs">
                 <span className={`${idx.change > 0 ? 'text-[#ff6b6b]' : 'text-[#4cd137]'}`}>
                   {idx.change > 0 ? '+' : ''}{idx.change}%
                 </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions (Mock) */}
      <div className="grid grid-cols-4 gap-4 px-4 py-6 bg-white mx-4 -mt-8 rounded-xl shadow-sm mb-4">
        {['打新神器', '条件单', '龙虎榜', 'ETF专区'].map((item, i) => (
          <div key={i} className="flex flex-col items-center space-y-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${i % 2 === 0 ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'}`}>
              <span className="text-lg font-bold">⚡</span>
            </div>
            <span className="text-xs text-gray-600">{item}</span>
          </div>
        ))}
      </div>

      {/* Hot Sectors */}
      <div className="px-4 mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-bold text-lg text-gray-800">热门板块</h2>
          <span className="text-xs text-gray-400">更多 &gt;</span>
        </div>
        <div className="flex space-x-3 overflow-x-auto no-scrollbar pb-2">
          {HOT_SECTORS.map((sector, i) => (
            <div key={i} className="flex-shrink-0 w-32 bg-white p-3 rounded-lg shadow-sm border border-gray-100">
              <div className="text-sm font-medium text-gray-700 mb-1">{sector.name}</div>
              <div className={`text-lg font-bold ${sector.change > 0 ? COLOR_UP : COLOR_DOWN}`}>
                {sector.change > 0 ? '+' : ''}{sector.change}%
              </div>
              <div className="text-[10px] text-gray-400 mt-1">领涨股: {stocks[i % stocks.length]?.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Stock List */}
      <div className="px-4">
        <h2 className="font-bold text-lg text-gray-800 mb-3">市场风向</h2>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {stocks.map((stock) => (
            <div 
              key={stock.id} 
              onClick={() => onStockClick(stock)}
              className="flex items-center justify-between p-4 border-b border-gray-50 last:border-none active:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="flex flex-col">
                <span className="font-medium text-gray-800 text-base">{stock.name}</span>
                <div className="flex items-center space-x-2 mt-1">
                   <span className="text-xs bg-gray-100 text-gray-500 px-1 rounded">{stock.symbol.startsWith('6') ? 'SH' : 'SZ'}</span>
                   <span className="text-xs text-gray-400">{stock.symbol}</span>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                 <span className={`text-base font-semibold ${stock.change > 0 ? COLOR_UP : COLOR_DOWN}`}>
                   {stock.price.toFixed(2)}
                 </span>
                 <div className={`w-20 py-1.5 rounded-md text-center text-sm font-medium text-white ${stock.change > 0 ? 'bg-[#eb4e3d]' : 'bg-[#249e6b]'}`}>
                   {stock.change > 0 ? '+' : ''}{stock.change}%
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;