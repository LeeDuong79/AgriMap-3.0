
import React, { useState } from 'react';
import { FarmProduct, ProductStatus } from '../types';
import { 
  Sprout, CheckCircle2, Clock, MapPin, 
  ClipboardCheck, Search, ChevronDown, 
  UserCheck, Building2, HelpCircle, 
  ArrowRight, FileText, Calendar, AlertCircle,
  LayoutDashboard, BookOpen, ShoppingBag, Zap,
  ShoppingCart, Package, GraduationCap, AlertTriangle,
  Landmark, Bell, User, Sun, Cloud, Thermometer,
  ArrowLeft, Leaf, History, Globe, Maximize2, QrCode,
  Layers, Map as MapIconLucide
} from 'lucide-react';

interface FarmerDashboardProps {
  products: FarmProduct[];
  onViewPortal: () => void;
}

const FarmerDashboard: React.FC<FarmerDashboardProps> = ({ products, onViewPortal }) => {
  const [activeView, setActiveView] = useState<'dashboard' | 'records' | 'timeline'>('dashboard');
  const [selectedProduct, setSelectedProduct] = useState<FarmProduct | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(products[0]?.id || null);

  const farmerName = "Nguyễn Văn An";
  const totalArea = "2.5 ha";
  const currentDate = "Thứ Hai, 14/07/2025";
  const weatherInfo = "28°C, có mây";

  const stats = [
    { label: 'Sản lượng tháng', value: '1.2 tấn', icon: <Sprout className="text-green-600" />, sub: 'Sản lượng tháng' },
    { label: 'Đơn hàng mới', value: '0', icon: <ShoppingCart className="text-blue-600" />, sub: 'Đơn hàng mới' },
    { label: 'Doanh thu tháng', value: '18.4 tr', icon: <Landmark className="text-yellow-600" />, sub: 'Doanh thu tháng' },
    { label: 'Cảnh báo mới', value: '2', icon: <AlertTriangle className="text-red-600" />, sub: 'Cảnh báo mới' },
  ];

  const menuItems = [
    { id: 'records', label: 'Hồ sơ', icon: <Layers />, color: 'bg-[#10B981]', onClick: () => setActiveView('records') },
    { id: 'diary', label: 'Nhật ký canh tác', icon: <BookOpen />, color: 'bg-[#10B981]' },
    { id: 'market', label: 'Sàn nông sản', icon: <ShoppingBag />, color: 'bg-[#06B6D4]' },
    { id: 'ai', label: 'AI Chẩn đoán', icon: <Zap />, color: 'bg-[#84CC16]' },
    { id: 'orders', label: 'Đơn hàng', icon: <ShoppingCart />, color: 'bg-[#15803D]' },
    { id: 'warehouse', label: 'Kho hàng', icon: <Package />, color: 'bg-[#15803D]' },
    { id: 'learning', label: 'Học tập', icon: <GraduationCap />, color: 'bg-[#0D9488]' },
    { id: 'disaster', label: 'Cảnh báo thiên tai', icon: <AlertTriangle />, color: 'bg-[#F97316]', badge: '2' },
    { id: 'policy', label: 'Chính sách hỗ trợ', icon: <Landmark />, color: 'bg-[#3B82F6]', badge: '2' },
  ];

  // Logic for the old view (Records Tracking)
  const getStepData = (product: FarmProduct) => {
    const isApproved = product.status === ProductStatus.APPROVED;
    const isPending = product.status === ProductStatus.PENDING;
    const hasNote = !!product.verificationNote;

    return [
      {
        id: 1,
        title: 'Bước 1: Chờ xác minh',
        description: 'Hồ sơ đã được gửi thành công. Hệ thống đang đợi Cán bộ Huyện tiếp nhận và đối soát chứng từ sơ bộ.',
        status: (isPending || isApproved || hasNote) ? 'COMPLETED' : 'CURRENT',
        officer: 'Bộ phận Tiếp nhận - Phòng Nông nghiệp',
        date: new Date(product.updatedAt).toLocaleDateString('vi-VN')
      },
      {
        id: 2,
        title: 'Bước 2: Đang xử lý',
        description: 'Cán bộ đang tiến hành xác minh thực địa hoặc kiểm tra tính pháp lý của các chứng chỉ (VietGAP/OCOP).',
        status: isApproved ? 'COMPLETED' : (isPending && hasNote ? 'CURRENT' : (isPending ? 'WAITING' : 'WAITING')),
        officer: 'Đoàn kiểm tra liên ngành / Cán bộ kỹ thuật',
        date: hasNote ? 'Đang thực hiện' : 'Chờ xử lý'
      },
      {
        id: 3,
        title: 'Bước 3: Hoàn tất',
        description: 'Chúc mừng! Hồ sơ đã được duyệt. Vùng trồng của bạn đã chính thức hiển thị công khai trên bản đồ nông sản toàn quốc.',
        status: isApproved ? 'COMPLETED' : 'WAITING',
        officer: 'Sở NN&PTNT / Cục Trồng trọt',
        date: isApproved ? (product.verifiedAt ? new Date(product.verifiedAt).toLocaleDateString('vi-VN') : 'Vừa xong') : '---'
      }
    ];
  };

  if (activeView === 'timeline' && selectedProduct) {
    return (
      <div className="min-h-screen bg-[#FDF8F5] animate-in slide-in-from-right duration-500">
        <div className="p-6 border-b border-slate-100 flex items-center gap-4 bg-white">
          <button onClick={() => setActiveView('records')} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-black text-slate-800">Quá trình xử lý hồ sơ</h1>
        </div>

        <div className="p-8 max-w-4xl mx-auto space-y-10">
          {/* Farm Profile Card */}
          <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-slate-100">
            <div className="flex flex-col md:flex-row md:items-center gap-6 mb-10">
              <div className="w-20 h-20 bg-[#DCFCE7] rounded-3xl flex items-center justify-center text-[#166534] shrink-0">
                <Sprout size={40} />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-black text-slate-900 mb-1">Nông trại {selectedProduct.name}</h2>
                <p className="text-slate-500 font-bold mb-3">{selectedProduct.farmerName}</p>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.certificates.map((cert, idx) => (
                    <span key={idx} className="bg-[#DCFCE7] text-[#166534] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                      {cert.type}
                    </span>
                  ))}
                  {selectedProduct.certificates.length === 0 && (
                    <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                      Chưa có chứng chỉ
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoItem 
                icon={<User size={18} />} 
                label="Người đại diện" 
                value={selectedProduct.farmerName} 
              />
              <InfoItem 
                icon={<MapPin size={18} />} 
                label="Vị trí" 
                value={selectedProduct.location.address} 
              />
              <InfoItem 
                icon={<Maximize2 size={18} />} 
                label="Diện tích" 
                value={`${selectedProduct.area} ha`} 
              />
              <InfoItem 
                icon={<Layers size={18} />} 
                label="Loại đất" 
                value="Đất phù sa" 
              />
              <InfoItem 
                icon={<QrCode size={18} />} 
                label="Mã vùng trồng" 
                value={selectedProduct.regionCode} 
              />
              <InfoItem 
                icon={<History size={18} />} 
                label="Năm thành lập" 
                value="2015" 
              />
              <InfoItem 
                icon={<Leaf size={18} />} 
                label="Cây trồng chính" 
                value={`${selectedProduct.name}, ${selectedProduct.variety}`} 
              />
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] p-10 border-2 border-slate-100">
            <div className="mb-10">
              <p className="text-lg font-black text-slate-900">Mã hồ sơ: <span className="font-mono text-slate-600 italic">{selectedProduct.id}</span></p>
            </div>
            
            <div className="relative space-y-12">
              {/* Vertical Line */}
              <div className="absolute left-[87px] top-2 bottom-2 w-0.5 bg-slate-200"></div>

              {/* Timeline Items - Ordered by progress (newest at top) */}
              {[
                { status: ProductStatus.REJECTED, label: 'Từ chối', icon: <AlertCircle size={20} /> },
                { status: ProductStatus.APPROVED, label: 'Đã cấp mã PUC', icon: <CheckCircle2 size={20} /> },
                { status: ProductStatus.COMPLETED, label: 'Xét duyệt xong', icon: null },
                { status: ProductStatus.REVIEWING, label: 'Đang duyệt', icon: null },
                { status: ProductStatus.PENDING, label: 'Chờ xét duyệt', icon: null },
                { status: ProductStatus.NEW, label: 'Mới đăng ký', icon: null },
              ].filter(step => {
                // Only show rejected if it is rejected
                if (step.status === ProductStatus.REJECTED) return selectedProduct.status === ProductStatus.REJECTED;
                // Only show approved if it is approved
                if (step.status === ProductStatus.APPROVED) return selectedProduct.status === ProductStatus.APPROVED;
                // Only show completed if it has been reached
                if (step.status === ProductStatus.COMPLETED) return selectedProduct.statusHistory?.some(h => h.status === ProductStatus.COMPLETED);
                return true;
              }).map((step, index) => {
                const historyItem = selectedProduct.statusHistory?.find(h => h.status === step.status);
                const isCurrent = selectedProduct.status === step.status;
                const isPast = selectedProduct.statusHistory?.some(h => h.status === step.status);
                
                const date = historyItem ? new Date(historyItem.timestamp) : null;
                const displayDate = date ? `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}` : '';
                const displayTime = date ? date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) : '';

                return (
                  <div key={index} className="flex items-start gap-8 relative z-10">
                    {/* Time Column */}
                    <div className="w-16 text-right shrink-0 pt-1">
                      <p className="text-sm font-bold text-slate-400 leading-none">{displayDate}</p>
                      <p className="text-sm font-bold text-slate-400 mt-1">{displayTime}</p>
                    </div>

                    {/* Circle Column */}
                    <div className="relative flex items-center justify-center w-10 h-10 shrink-0">
                      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                        isCurrent ? (step.status === ProductStatus.REJECTED ? 'bg-red-600 border-red-600 animate-pulse' : 'bg-orange-500 border-orange-500 animate-pulse') : 
                        isPast ? 'bg-green-600 border-green-600' : 'bg-slate-400 border-slate-400'
                      }`}>
                        {step.icon && <div className="text-white">{step.icon}</div>}
                      </div>
                    </div>

                    {/* Label Column */}
                    <div className="pt-1">
                      <p className={`text-lg font-black ${
                        isCurrent ? (step.status === ProductStatus.REJECTED ? 'text-red-600' : 'text-orange-600') : 
                        isPast ? 'text-slate-900' : 'text-slate-400'
                      }`}>
                        {step.label}
                        {step.status === ProductStatus.REJECTED && selectedProduct.rejectionReason && (
                          <span className="block text-sm font-bold text-red-500 mt-1 italic">Lý do: {selectedProduct.rejectionReason}</span>
                        )}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeView === 'records') {
    return (
      <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-8 animate-in slide-in-from-right duration-500">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <button onClick={() => setActiveView('dashboard')} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
              <ArrowLeft size={24} />
            </button>
            <div className="bg-black p-2 rounded-xl text-white">
              <ClipboardCheck size={24} />
            </div>
            <h1 className="text-4xl font-black text-black uppercase tracking-tighter">HỒ SƠ CỦA TÔI</h1>
          </div>
          <button 
            onClick={onViewPortal}
            className="bg-green-700 text-white px-6 py-3 rounded-xl font-black text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center gap-2 border-2 border-black uppercase"
          >
            <Sprout size={20} /> Đăng ký mới
          </button>
        </div>
        
        <div className="h-1 bg-black w-full mb-10"></div>

        <div className="space-y-6">
          {products.length === 0 ? (
            <div className="bg-white border-4 border-dashed border-slate-200 rounded-[3rem] p-16 text-center">
              <FileText size={64} className="mx-auto text-slate-200 mb-6" />
              <p className="text-2xl font-black text-slate-400 uppercase tracking-widest">Hiện chưa có hồ sơ nào</p>
              <button onClick={onViewPortal} className="mt-6 text-black font-black underline hover:text-green-800 uppercase decoration-2 underline-offset-4">Bắt đầu đăng ký ngay</button>
            </div>
          ) : (
            products.map((product) => (
              <div key={product.id} className="bg-white rounded-[2.5rem] p-6 border-2 border-black shadow-[0px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-6 w-full md:w-auto">
                  <div className="w-24 h-24 rounded-3xl border-2 border-black overflow-hidden shrink-0 shadow-md">
                    <img src={product.images.product[0]} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-2xl font-black text-black uppercase tracking-tighter">{product.name}</h3>
                      <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        product.status === ProductStatus.APPROVED ? 'bg-green-100 text-green-700 border border-green-200' : 
                        product.status === ProductStatus.REJECTED ? 'bg-red-100 text-red-700 border border-red-200' : 
                        product.status === ProductStatus.REVIEWING ? 'bg-blue-100 text-blue-700 border border-blue-200' :
                        product.status === ProductStatus.PENDING ? 'bg-orange-100 text-orange-700 border border-orange-200' : 
                        product.status === ProductStatus.COMPLETED ? 'bg-purple-100 text-purple-700 border border-purple-200' :
                        'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}>
                        {product.status === ProductStatus.NEW ? 'MỚI ĐĂNG KÝ' :
                         product.status === ProductStatus.PENDING ? 'CHỜ XÉT DUYỆT' : 
                         product.status === ProductStatus.REVIEWING ? 'ĐANG DUYỆT' : 
                         product.status === ProductStatus.COMPLETED ? 'XÉT DUYỆT XONG' :
                         product.status === ProductStatus.APPROVED ? 'ĐÃ CẤP MÃ PUC' : 
                         product.status === ProductStatus.REJECTED ? 'TỪ CHỐI' : product.status}
                      </div>
                    </div>
                    <p className="text-slate-500 font-bold flex items-center gap-2 uppercase text-xs tracking-widest">
                      <MapPin size={14} /> {product.location.address} • {product.area} HA
                    </p>
                    {product.regionCode && (
                      <div className="mt-2 inline-block bg-slate-50 px-3 py-1 rounded-lg border border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Mã PUC: {product.regionCode}
                      </div>
                    )}
                  </div>
                </div>
                
                <button 
                  onClick={() => {
                    setSelectedProduct(product);
                    setActiveView('timeline');
                  }}
                  className="w-full md:w-auto bg-black text-white px-8 py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-3 hover:bg-slate-800 transition-all shadow-[4px_4px_0px_0px_rgba(16,185,129,1)] active:translate-y-1 active:shadow-none"
                >
                  XEM CHI TIẾT <ChevronDown size={20} className="-rotate-90" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FBF9] font-sans">
      {/* Top Navbar */}
      <div className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-green-600 p-1.5 rounded-lg">
            <Sprout className="text-white" size={20} />
          </div>
          <span className="text-xl font-black text-slate-800 tracking-tighter">AgriLink</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 text-slate-400 hover:text-black transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <div className="flex items-center gap-3 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-black text-xs border border-green-200">
              <User size={16} />
            </div>
            <span className="text-sm font-bold text-slate-700">{farmerName}</span>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
        {/* Welcome Banner */}
        <div className="bg-green-600 rounded-[2rem] p-8 md:p-10 text-white relative overflow-hidden shadow-xl">
          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-black tracking-tighter mb-2 uppercase">Xin chào, {farmerName} 👋</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-green-50 opacity-90">
              <div className="flex items-center gap-1.5">
                <Calendar size={16} />
                Hôm nay là {currentDate}
              </div>
              <div className="hidden md:block text-green-300">•</div>
              <div className="flex items-center gap-1.5">
                <Cloud size={16} />
                Thời tiết: {weatherInfo}
              </div>
            </div>
          </div>
          
          <div className="absolute right-10 top-1/2 -translate-y-1/2 text-right hidden lg:block">
            <p className="text-5xl font-black tracking-tighter">{totalArea}</p>
            <p className="text-xs font-black uppercase tracking-widest opacity-70">Diện tích canh tác</p>
          </div>

          {/* Abstract background shapes */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -left-20 -top-20 w-60 h-60 bg-green-400/20 rounded-full blur-2xl"></div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100">
                {stat.icon}
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900 tracking-tight">{stat.value}</p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Functions Grid */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-100 shadow-sm">
          <h3 className="text-lg font-black text-slate-800 uppercase tracking-widest mb-8 flex items-center gap-3">
            <LayoutDashboard size={20} className="text-green-600" />
            Chức năng
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 md:gap-12">
            {menuItems.map((item) => (
              <button 
                key={item.id}
                onClick={item.onClick}
                className="flex flex-col items-center gap-4 group"
              >
                <div className={`w-16 h-16 md:w-20 md:h-20 ${item.color} text-white ${item.id === 'records' ? 'rounded-full' : 'rounded-[1.5rem] md:rounded-[2rem]'} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 relative`}>
                  {React.cloneElement(item.icon as React.ReactElement, { size: 32 })}
                  {item.badge && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-black w-6 h-6 rounded-full border-2 border-white flex items-center justify-center shadow-md">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-xs md:text-sm font-black text-slate-700 uppercase tracking-tight text-center leading-tight group-hover:text-green-700 transition-colors">
                  {item.label}
                </span>
              </button>
            ))}
            
            {/* Registration Button (AgriLink Style from Image 2) */}
            <button 
              onClick={onViewPortal}
              className="flex flex-col items-center gap-4 group"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 bg-[#DCFCE7] text-[#166534] rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-all duration-300">
                <div className="w-8 h-8 md:w-10 md:h-10 border-2 border-[#166534] rounded-lg flex items-center justify-center">
                  <span className="text-2xl md:text-3xl font-bold">+</span>
                </div>
              </div>
              <span className="text-xs md:text-sm font-black text-slate-700 uppercase tracking-tight text-center leading-tight group-hover:text-green-700 transition-colors">
                Đăng ký
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
  <div className="bg-[#F8FBF9] p-4 rounded-2xl flex items-center gap-4 border border-slate-50">
    <div className="text-green-600 shrink-0">
      {icon}
    </div>
    <div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">{label}</p>
      <p className="text-sm font-black text-slate-800">{value}</p>
    </div>
  </div>
);

export default FarmerDashboard;
