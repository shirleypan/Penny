import React, { useState, useEffect } from 'react';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import Watchlist from './pages/Watchlist';
import SmartAssistant from './pages/SmartAssistant';
import StockDetail from './pages/StockDetail';
import { Tab, Stock } from './types';
import { INITIAL_STOCKS } from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.HOME);
  const [stocks, setStocks] = useState<Stock[]>(INITIAL_STOCKS);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);

  // Simulating live stock updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStocks((currentStocks) =>
        currentStocks.map((stock) => {
          // Random tiny fluctuation
          const fluctuation = (Math.random() - 0.5) * 0.15;
          const newPrice = Math.max(0.01, stock.price + fluctuation);
          
          // Recalculate change percent roughly based on a fixed opening (mock logic)
          // In a real app, we'd have openPrice. Here we just drift the change percent slightly.
          const changeDelta = (Math.random() - 0.5) * 0.05;
          
          return {
            ...stock,
            price: newPrice,
            change: parseFloat((stock.change + changeDelta).toFixed(2))
          };
        })
      );
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const handleStockClick = (stock: Stock) => {
    setSelectedStock(stock);
  };

  const renderContent = () => {
    switch (activeTab) {
      case Tab.HOME:
        return <Home stocks={stocks} onStockClick={handleStockClick} />;
      case Tab.WATCHLIST:
        return <Watchlist stocks={stocks} onStockClick={handleStockClick} />;
      case Tab.AI:
        return <SmartAssistant stocks={stocks} />;
      case Tab.TRADE:
        return (
          <div className="flex flex-col items-center justify-center h-screen bg-gray-50 pb-20">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                <span className="text-4xl">🔒</span>
            </div>
            <h2 className="text-xl font-bold text-gray-800">交易功能需登录</h2>
            <p className="text-gray-500 mt-2 text-sm px-10 text-center">为保障资金安全，请先在手机端完成实名认证与登录。</p>
            <button className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-full font-medium shadow-lg hover:bg-blue-700 active:scale-95 transition-all">
                立即登录
            </button>
          </div>
        );
      default:
        return <Home stocks={stocks} onStockClick={handleStockClick} />;
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-100 min-h-screen shadow-2xl overflow-hidden relative">
      {renderContent()}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      
      {selectedStock && (
        <StockDetail 
          stock={stocks.find(s => s.id === selectedStock.id) || selectedStock} 
          onBack={() => setSelectedStock(null)} 
        />
      )}
    </div>
  );
};

export default App;