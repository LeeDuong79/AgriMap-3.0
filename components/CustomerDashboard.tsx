
import React, { useState } from 'react';
import { 
  Search, ShoppingCart, FileText, QrCode, Gavel, 
  TrendingUp, Network, BarChart3, Bell, LogOut,
  ChevronRight, ArrowUpRight, ArrowDownRight, MapPin,
  Filter, Calendar, Package, Users, LayoutGrid
} from 'lucide-react';
import { FarmProduct, ProductStatus, BuyerUser } from '../types';
import MapInterface from './MapInterface';

interface CustomerDashboardProps {
  user: BuyerUser;
  products: FarmProduct[];
  onLogout: () => void;
}

const CustomerDashboard: React.FC<CustomerDashboardProps> = ({ user, products, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'find-supply' | 'orders' | 'traceability' | 'auction' | 'analysis'>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  const approvedProducts = products.filter(p => p.status === ProductStatus.APPROVED);

  const stats = [
    { label: 'Nhà cung cấp', value: '128', icon: <Users className="text-blue-600" />, sub: 'Đang kết nối' },
    { label: 'Đơn hàng', value: '3', icon: <ShoppingCart className="text-green-600" />, sub: 'Trong tháng này', alert: true },
    { label: 'Tổng sản lượng', value: '85 tấn', icon: <Package className="text-orange-600" />, sub: 'Đã thu mua' },
    { label: 'Doanh thu tháng', value: '2.4 tỷ', icon: <BarChart3 className="text-purple-600" />, sub: 'VNĐ' },
  ];

  const menuItems = [
    { id: 'find-supply', label: 'Tìm nguồn cung', icon: <Search size={32} />, color: 'bg-green-600' },
    { id: 'orders', label: 'Đơn hàng', icon: <ShoppingCart size={32} />, color: 'bg-emerald-600', badge: 1 },
    { id: 'contracts', label: 'Hợp đồng điện tử', icon: <FileText size={32} />, color: 'bg-teal-600' },
    { id: 'traceability', label: 'Truy xuất nguồn gốc', icon: <QrCode size={32} />, color: 'bg-sky-600' },
    { id: 'auction', label: 'Đấu giá nông sản', icon: <Gavel size={32} />, color: 'bg-lime-600' },
    { id: 'forecast', label: 'AI Dự báo thị trường', icon: <TrendingUp size={32} />, color: 'bg-amber-600' },
    { id: 'supply-chain', label: 'Chuỗi cung ứng', icon: <Network size={32} />, color: 'bg-orange-600' },
    { id: 'analysis', label: 'Phân tích kinh doanh', icon: <BarChart3 size={32} />, color: 'bg-rose-600' },
  ];

  const marketForecast = [
    { name: 'Xoài', status: 'Nhu cầu tăng do xuất khẩu', trend: '+12%', isUp: true },
    { name: 'Lúa ST25', status: 'Nguồn cung dồi dào', trend: '-3%', isUp: false },
    { name: 'Thanh long', status: 'Thị trường Trung Quốc mở cửa', trend: '+8%', isUp: true },
    { name: 'Dưa hấu', status: 'Dư thừa vụ hè', trend: '-5%', isUp: false },
  ];

  if (activeTab === 'find-supply') {
    return (
      <div className="h-screen flex flex-col bg-slate-50">
        <div className="bg-white p-4 border-b border-slate-200 flex items-center justify-between">
          <button onClick={() => setActiveTab('dashboard')} className="flex items-center gap-2 font-black text-black uppercase">
            <ChevronRight className="rotate-180" /> Quay lại Dashboard
          </button>
          <h1 className="text-xl font-black uppercase tracking-tighter">Tìm kiếm nguồn cung sạch</h1>
          <div className="w-24"></div>
        </div>
        <div className="flex-1 relative">
          <MapInterface 
            products={approvedProducts} 
            isFarmerView={false} 
            isBuyerView={true}
            onSearch={setSearchQuery}
            initialSearchQuery={searchQuery}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="bg-green-700 text-white p-2 rounded-xl">
            <Network size={24} />
          </div>
          <h1 className="text-2xl font-black tracking-tighter uppercase">AgriLink</h1>
        </div>
        <div className="flex items-center gap-6">
          <button className="relative p-2 text-slate-400 hover:text-black transition-colors">
            <Bell size={24} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
            <div className="text-right">
              <p className="text-sm font-black text-black uppercase leading-none mb-1">{user.fullName}</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{user.companyName}</p>
            </div>
            <button onClick={onLogout} className="p-2 bg-slate-100 text-slate-600 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all">
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 p-8 max-w-7xl mx-auto w-full space-y-8">
        {/* Welcome Card */}
        <div className="bg-green-800 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-green-900/20">
          <div className="relative z-10">
            <h2 className="text-4xl font-black mb-2 tracking-tight">Chào mừng trở lại! 👋</h2>
            <p className="text-green-100 font-bold text-lg opacity-80">{user.companyName}</p>
            <p className="text-green-200/60 text-sm font-bold uppercase tracking-widest mt-4">Thứ Hai, 14/07/2025</p>
          </div>
          <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-10">
            <Network size={200} />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-[2rem] border-2 border-slate-100 shadow-sm hover:shadow-md transition-all group">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-slate-50 rounded-2xl group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                {stat.alert && <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>}
              </div>
              <p className="text-3xl font-black text-black mb-1 tracking-tight">{stat.value}</p>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase">{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* Main Functions */}
        <section>
          <h3 className="text-xl font-black text-black uppercase tracking-tight mb-6 flex items-center gap-2">
            <LayoutGrid size={24} className="text-green-700" /> Chức năng
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {menuItems.map((item) => (
              <button 
                key={item.id}
                onClick={() => item.id === 'find-supply' && setActiveTab('find-supply')}
                className="bg-white p-8 rounded-[2.5rem] border-2 border-slate-100 shadow-sm hover:border-green-600 hover:shadow-xl transition-all group text-center flex flex-col items-center relative"
              >
                <div className={`${item.color} text-white p-5 rounded-3xl mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  {item.icon}
                </div>
                <span className="text-sm font-black text-black uppercase tracking-tighter leading-tight">{item.label}</span>
                {item.badge && (
                  <span className="absolute top-6 right-1/3 translate-x-8 bg-red-500 text-white text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Market Forecast */}
        <section className="bg-white rounded-[3rem] border-2 border-slate-100 overflow-hidden shadow-sm">
          <div className="p-8 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-xl font-black text-black uppercase tracking-tight flex items-center gap-2">
              <TrendingUp size={24} className="text-amber-600" /> AI Dự báo thị trường
            </h3>
            <button className="text-xs font-black text-slate-400 hover:text-black uppercase tracking-widest flex items-center gap-1">
              Xem báo cáo chi tiết <ChevronRight size={14} />
            </button>
          </div>
          <div className="divide-y divide-slate-50">
            {marketForecast.map((item, i) => (
              <div key={i} className="p-6 hover:bg-slate-50 transition-colors flex items-center justify-between">
                <div>
                  <p className="text-lg font-black text-black">{item.name}</p>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">{item.status}</p>
                </div>
                <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-black ${item.isUp ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                  {item.isUp ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
                  {item.trend}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="p-8 text-center">
        <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">AgriMap VN Ecosystem • 2024</p>
      </footer>
    </div>
  );
};

export default CustomerDashboard;
