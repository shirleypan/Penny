import React from 'react';
import { Home, List, MessageSquareText, TrendingUp, User } from 'lucide-react';
import { Tab } from '../types';

interface BottomNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const navItems = [
    { id: Tab.HOME, label: '首页', icon: Home },
    { id: Tab.WATCHLIST, label: '自选', icon: List },
    { id: Tab.TRADE, label: '交易', icon: TrendingUp },
    { id: Tab.AI, label: 'AI助理', icon: MessageSquareText },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe pt-2 px-6 h-[80px] z-50 shadow-lg">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center justify-center space-y-1 w-16 transition-all duration-200 ${
                isActive ? 'text-blue-600 transform scale-105' : 'text-gray-400'
              }`}
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;