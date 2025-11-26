export interface Stock {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number; // Percentage change e.g. 1.25 for +1.25%
  volume: string;
  marketCap: string;
  // New detailed fields
  open: number;
  prevClose: number;
  high: number;
  low: number;
  pe: number; // P/E Ratio
  turnover: string; // Turnover rate
  amplitude: string; // Amplitude %
}

export interface ChartPoint {
  time: string;
  value: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isLoading?: boolean;
}

export enum Tab {
  HOME = 'home',
  WATCHLIST = 'watchlist',
  AI = 'ai',
  TRADE = 'trade'
}

// In China markets: Red is Up/Positive, Green is Down/Negative
export const COLOR_UP = 'text-[#eb4e3d]';
export const BG_UP = 'bg-[#eb4e3d]';
export const COLOR_DOWN = 'text-[#249e6b]';
export const BG_DOWN = 'bg-[#249e6b]';