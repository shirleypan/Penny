import { Stock } from './types';

export const INITIAL_STOCKS: Stock[] = [
  { 
    id: '1', symbol: '600519', name: '贵州茅台', price: 1765.32, change: 1.25, volume: '2.4万', marketCap: '2.2万亿',
    open: 1750.00, prevClose: 1743.50, high: 1770.00, low: 1748.00, pe: 28.5, turnover: '0.12%', amplitude: '1.26%'
  },
  { 
    id: '2', symbol: '300750', name: '宁德时代', price: 185.40, change: -0.85, volume: '35.1万', marketCap: '8500亿',
    open: 188.00, prevClose: 187.00, high: 189.50, low: 184.20, pe: 18.2, turnover: '1.5%', amplitude: '2.8%'
  },
  { 
    id: '3', symbol: '000858', name: '五粮液', price: 145.20, change: 0.65, volume: '18.2万', marketCap: '5600亿',
    open: 144.00, prevClose: 144.25, high: 146.00, low: 143.50, pe: 22.1, turnover: '0.8%', amplitude: '1.7%'
  },
  { 
    id: '4', symbol: '601318', name: '中国平安', price: 42.15, change: -1.20, volume: '80.5万', marketCap: '7800亿',
    open: 42.80, prevClose: 42.66, high: 43.00, low: 41.90, pe: 6.5, turnover: '0.5%', amplitude: '2.5%'
  },
  { 
    id: '5', symbol: '600036', name: '招商银行', price: 32.88, change: 0.15, volume: '45.3万', marketCap: '8200亿',
    open: 32.80, prevClose: 32.83, high: 33.10, low: 32.70, pe: 5.8, turnover: '0.3%', amplitude: '1.2%'
  },
  { 
    id: '6', symbol: '002594', name: '比亚迪', price: 212.50, change: 2.10, volume: '22.1万', marketCap: '6200亿',
    open: 209.00, prevClose: 208.12, high: 215.00, low: 208.50, pe: 25.4, turnover: '1.8%', amplitude: '3.1%'
  },
];

export const INDICES = [
  { name: '上证指数', value: 3058.25, change: 0.52 },
  { name: '深证成指', value: 9856.12, change: -0.35 },
  { name: '创业板指', value: 1985.33, change: -0.88 },
];

export const HOT_SECTORS = [
  { name: '人工智能', change: 3.52 },
  { name: '半导体', change: 2.15 },
  { name: '酿酒行业', change: 1.05 },
  { name: '房地产', change: -1.25 },
];