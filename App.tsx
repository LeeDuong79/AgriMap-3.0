
import React, { useState, useMemo } from 'react';
import { UserRole, FarmProduct, ProductStatus, User, AdminUser, AdminLevel, BuyerUser, FarmerUser } from './types';
import { MOCK_PRODUCTS } from './constants';
import FarmerDashboard from './components/FarmerDashboard';
import Navbar from './components/Navbar';
import MapInterface from './components/MapInterface';
import FarmerPortal from './components/FarmerPortal';
import AdminDashboard from './components/AdminDashboard';
import CustomerDashboard from './components/CustomerDashboard';
import AuthScreen from './components/AuthScreen';
import FarmerProfile from './components/FarmerProfile';
import FarmerHome from './components/FarmerHome';
import KnowledgeHandbook from './components/KnowledgeHandbook';
import WeatherModal from './components/WeatherModal';
import AgricultureHeatmap from './components/AgricultureHeatmap';
import { Home, Map as MapIcon, User as UserIcon, LayoutGrid, NotebookPen, Thermometer } from 'lucide-react';

const App: React.FC = () => {
  const [user, setUser] = useState<User>(null);
  const [currentRole, setCurrentRole] = useState<UserRole | null>(null);
  const [products, setProducts] = useState<FarmProduct[]>(MOCK_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [isWeatherOpen, setIsWeatherOpen] = useState(false);
  
  // Tabs: home, register, list, map, profile, knowledge, heatmap
  const [farmerTab, setFarmerTab] = useState<'home' | 'register' | 'list' | 'map' | 'profile' | 'knowledge' | 'heatmap'>('home');

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      if (user?.role === UserRole.ADMIN) {
        const matchesArea = p.location.address.toLowerCase().includes(user.assignedArea.split(' ').pop()?.toLowerCase() || '');
        if (!matchesArea && user.level !== AdminLevel.CENTRAL) return false;
      }
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.farmerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.regionCode.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter;
      const isAdminView = user?.role === UserRole.ADMIN;
      const isApproved = p.status === ProductStatus.COMPLETED;
      return matchesSearch && matchesCategory && (isAdminView || isApproved);
    });
  }, [products, searchQuery, categoryFilter, user]);

  const handleAddProduct = (newProduct: FarmProduct) => {
    setProducts(prev => [newProduct, ...prev]);
    setFarmerTab('list');
  };

  const handleUpdateStatus = (id: string, status: ProductStatus, note?: string) => {
    setProducts(prev => prev.map(p => {
      if (p.id !== id) return p;

      const now = new Date().toISOString();
      const newHistory = [...(p.statusHistory || [])];

      // Add to history if not already there for this status
      if (!newHistory.some(h => h.status === status)) {
        newHistory.push({ status, timestamp: now, note });
      }

      return { 
        ...p, 
        status, 
        statusHistory: newHistory,
        verificationNote: note || p.verificationNote,
        verifiedAt: now,
        verifiedBy: user?.role === UserRole.ADMIN ? user.fullName : p.verifiedBy
      };
    }));
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  const handleAuthSuccess = (loggedUser: User) => {
    setUser(loggedUser);
    setCurrentRole(loggedUser?.role || UserRole.BUYER);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentRole(null);
  };

  if (!user) {
    return <AuthScreen onLogin={handleAuthSuccess} />;
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-white font-sans">
      {/* Chỉ hiện Navbar truyền thống cho Admin, Nông dân dùng giao diện App */}
      {user.role === UserRole.ADMIN ? (
        <Navbar 
          currentRole={user.role} 
          onRoleChange={() => {}} 
          onSearch={setSearchQuery}
          user={user}
          onLogout={handleLogout}
        />
      ) : null}
      
      <main className="flex-1 relative flex overflow-hidden">
        {user.role === UserRole.FARMER && (
          <div className="flex-1 flex flex-col h-full bg-slate-50">
            {/* Main Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
              {farmerTab === 'home' && (
                <FarmerDashboard 
                  key="home"
                  user={user as FarmerUser}
                  products={products.filter(p => p.farmerId === user.id || p.farmerId === 'f_current')} 
                  onViewPortal={() => setFarmerTab('register')} 
                  onNavigate={(tab) => setFarmerTab(tab)}
                  initialView="dashboard"
                />
              )}
              {farmerTab === 'register' && (
                <FarmerPortal 
                  onAdd={handleAddProduct} 
                  existingProducts={products.filter(p => p.farmerId === 'f_current' || p.farmerId === user.id)}
                  activeView="register"
                />
              )}
              {farmerTab === 'list' && (
                <FarmerDashboard 
                  key="list"
                  user={user as FarmerUser}
                  products={products.filter(p => p.farmerId === user.id || p.farmerId === 'f_current')} 
                  onViewPortal={() => setFarmerTab('register')} 
                  onNavigate={(tab) => setFarmerTab(tab)}
                  initialView="records"
                />
              )}
              {farmerTab === 'map' && (
                <div className="h-full relative">
                  <MapInterface 
                    products={filteredProducts} 
                    isFarmerView={true} 
                    onSearch={setSearchQuery} 
                    initialSearchQuery={searchQuery}
                  />
                </div>
              )}
              {farmerTab === 'profile' && (
                <FarmerProfile 
                  user={user as any} 
                  onLogout={handleLogout} 
                  onUpdateUser={handleUpdateUser}
                />
              )}
              {farmerTab === 'knowledge' && (
                <KnowledgeHandbook onBack={() => setFarmerTab('home')} />
              )}
              {farmerTab === 'heatmap' && (
                <AgricultureHeatmap onBack={() => setFarmerTab('home')} />
              )}
            </div>

            {/* Bottom Navigation Bar - AgriMap Style */}
            <nav className="bg-white border-t border-slate-100 flex justify-around items-center py-3 px-2 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-[2000]">
              <BottomNavItem 
                active={farmerTab === 'home'} 
                onClick={() => setFarmerTab('home')} 
                icon={<Home size={24} />} 
                label="TRANG CHỦ" 
              />
              <BottomNavItem 
                active={farmerTab === 'list'} 
                onClick={() => setFarmerTab('list')} 
                icon={<LayoutGrid size={24} />} 
                label="HỒ SƠ CỦA TÔI" 
              />
              <BottomNavItem 
                active={farmerTab === 'map'} 
                onClick={() => setFarmerTab('map')} 
                icon={<div className="bg-[#10B981] p-3 rounded-full text-white shadow-lg -mt-10 border-4 border-slate-50"><MapIcon size={24} /></div>} 
                label="BẢN ĐỒ" 
                isSpecial
              />
              <BottomNavItem 
                active={farmerTab === 'knowledge'} 
                onClick={() => setFarmerTab('knowledge')} 
                icon={<NotebookPen size={24} />} 
                label="SỔ TAY KIẾN THỨC" 
              />
              <BottomNavItem 
                active={farmerTab === 'profile'} 
                onClick={() => setFarmerTab('profile')} 
                icon={<UserIcon size={24} />} 
                label="CÁ NHÂN" 
              />
            </nav>
          </div>
        )}

        {user.role === UserRole.ADMIN && (
          <div className="h-full overflow-y-auto w-full bg-slate-50">
            <AdminDashboard 
              products={products} 
              onUpdateStatus={handleUpdateStatus} 
              admin={user as AdminUser}
            />
          </div>
        )}

        {user.role === UserRole.BUYER && (
          <div className="h-full overflow-y-auto w-full bg-slate-50">
            <CustomerDashboard 
              user={user as BuyerUser}
              products={products}
              onLogout={handleLogout}
            />
          </div>
        )}
      </main>

      <WeatherModal 
        isOpen={isWeatherOpen} 
        onClose={() => setIsWeatherOpen(false)} 
      />
    </div>
  );
};

const BottomNavItem = ({ active, onClick, icon, label, isSpecial = false }: any) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 transition-all ${isSpecial ? '' : (active ? 'text-green-600' : 'text-slate-400')}`}
  >
    <div className={`${active && !isSpecial ? 'scale-110' : ''} transition-transform`}>
      {icon}
    </div>
    <span className={`text-[10px] font-bold uppercase tracking-tighter ${isSpecial ? 'mt-1' : ''}`}>
      {label}
    </span>
  </button>
);

export default App;
