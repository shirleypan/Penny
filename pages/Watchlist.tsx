import React, { useState } from 'react';
import { Search, Plus, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { Stock, COLOR_UP, COLOR_DOWN } from '../types';

interface WatchlistProps {
  stocks: Stock[];
  onStockClick: (stock: Stock) => void;
}

const Watchlist: React.FC<WatchlistProps> = ({ stocks, onStockClick }) => {
  const [editing, setEditing] = useState(false);

  return (
    <div className="pb-24 bg-white min-h-screen">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 px-4 py-3 border-b border-gray-100 flex justify-between items-center">
        <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold text-gray-900">自选</h1>
            <ChevronDown size={16} className="text-gray-400" />
        </div>
        <div className="flex space-x-4 text-gray-600">
            <Search size={22} />
            <SlidersHorizontal size={22} onClick={() => setEditing(!editing)} className={editing ? 'text-blue-600' : ''}/>
        </div>
      </div>

      {/* Group Headers */}
      <div className="flex px-4 py-3 space-x-6 border-b border-gray-100 text-sm overflow-x-auto no-scrollbar">
        <span className="font-bold text-gray-900 border-b-2 border-blue-600 pb-2">全部</span>
        <span className="text-gray-500 whitespace-nowrap">港股</span>
        <span className="text-gray-500 whitespace-nowrap">美股</span>
        <span className="text-gray-500 whitespace-nowrap">基金</span>
        <span className="text-gray-500 whitespace-nowrap">债券</span>
      </div>

      {/* List */}
      <div className="divide-y divide-gray-100">
        {stocks.map((stock) => {
           return (
            <div key={stock.id} className="bg-white">
                <div 
                  className="flex items-center justify-between p-4 active:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => onStockClick(stock)}
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-medium text-gray-900">{stock.name}</h3>
                        {stock.change > 5 && <span className="text-[10px] bg-red-50 text-red-500 px-1 rounded">R</span>}
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-amber-500 bg-amber-50 px-1 rounded">融资</span>
                        <span className="text-xs text-gray-400">{stock.symbol}</span>
                    </div>
                  </div>
                  
                  <div className={`text-right w-24 ${stock.change > 0 ? COLOR_UP : COLOR_DOWN}`}>
                    <div className="text-lg font-semibold">{stock.price.toFixed(2)}</div>
                  </div>
                  
                  <div className={`w-24 text-right ${stock.change > 0 ? COLOR_UP : COLOR_DOWN}`}>
                     <div className="text-lg font-medium">{stock.change > 0 ? '+' : ''}{stock.change}%</div>
                  </div>
                </div>
            </div>
           );
        })}
      </div>

      {/* Add Button */}
      <div className="fixed bottom-24 right-4">
        <button className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors">
            <Plus size={24} />
        </button>
      </div>
    </div>
  );
};

export default Watchlist;