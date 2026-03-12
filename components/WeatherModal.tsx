
import React, { useState, useEffect, useRef } from 'react';
import { X, Droplets, Wind, Cloud, Sun, CloudRain, CloudLightning, CloudDrizzle, Thermometer, MapPin, Loader2, Search, ChevronDown } from 'lucide-react';
import { WeatherData } from '../types';
import { VIETNAM_PROVINCES } from '../constants';

interface WeatherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WeatherModal: React.FC<WeatherModalProps> = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [isSelectingProvince, setIsSelectingProvince] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const scrollRef = useRef<HTMLDivElement>(null);

  const fetchWeather = async (provinceName?: string) => {
    setLoading(true);
    setError(null);
    
    try {
      let locationLabel = provinceName || 'Vị trí của bạn';
      
      if (!provinceName) {
        // Try to get current location if no province is selected
        try {
          const position = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 });
          });
          // In a real app, you'd use reverse geocoding here to get the city name
          locationLabel = 'Vị trí hiện tại';
        } catch (err) {
          // Fallback to TP. Hồ Chí Minh if GPS fails
          locationLabel = 'TP. Hồ Chí Minh';
          setSelectedProvince('TP. Hồ Chí Minh');
        }
      }

      // Simulate API call with realistic data
      await new Promise(resolve => setTimeout(resolve, 1000)); 

      const isRainy = Math.random() > 0.7;
      const isCloudy = Math.random() > 0.4;

      const mockData: WeatherData = {
        temp: 24 + Math.floor(Math.random() * 10),
        condition: isRainy ? 'Rainy' : (isCloudy ? 'Cloudy' : 'Sunny'),
        description: isRainy ? 'Có mưa rào rải rác' : (isCloudy ? 'Nhiều mây, trời mát' : 'Trời nắng ráo, quang mây'),
        humidity: 60 + Math.floor(Math.random() * 30),
        windSpeed: 5 + Math.floor(Math.random() * 15),
        icon: isRainy ? 'cloud-rain' : (isCloudy ? 'cloud' : 'sun'),
        locationName: locationLabel,
        forecast: [
          { time: '12:00', temp: 31, icon: 'sun' },
          { time: '15:00', temp: 29, icon: 'cloud' },
          { time: '18:00', temp: 26, icon: 'cloud-rain' },
          { time: '21:00', temp: 24, icon: 'cloud' },
        ]
      };

      setWeather(mockData);
    } catch (err) {
      setError('Không thể lấy thông tin thời tiết. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchWeather(selectedProvince || undefined);
    }
  }, [isOpen, selectedProvince]);

  if (!isOpen) return null;

  const filteredProvinces = VIETNAM_PROVINCES.filter(p => 
    p.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getThemeColor = () => {
    if (!weather || loading) return 'from-slate-600 to-slate-500';
    if (weather.condition === 'Sunny') return 'from-orange-400 to-yellow-500';
    if (weather.condition === 'Rainy') return 'from-blue-600 to-indigo-600';
    return 'from-blue-500 to-cyan-500';
  };

  const getWeatherIcon = (icon: string, size = 48) => {
    switch (icon) {
      case 'sun': return <Sun size={size} className="text-yellow-100" />;
      case 'cloud': return <Cloud size={size} className="text-blue-50" />;
      case 'cloud-rain': return <CloudRain size={size} className="text-blue-100" />;
      case 'cloud-lightning': return <CloudLightning size={size} className="text-purple-100" />;
      case 'cloud-drizzle': return <CloudDrizzle size={size} className="text-cyan-50" />;
      default: return <Sun size={size} className="text-yellow-100" />;
    }
  };

  return (
    <div className="fixed inset-0 z-[3000] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-md">
      <div className="w-full max-w-md bg-white rounded-t-[2.5rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-300 flex flex-col max-h-[90vh]">
        
        {/* Header/Hero Section */}
        <div className={`bg-gradient-to-br ${getThemeColor()} p-8 text-white relative transition-colors duration-500`}>
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors z-10"
          >
            <X size={20} />
          </button>

          {/* Province Selector Trigger */}
          <button 
            onClick={() => setIsSelectingProvince(!isSelectingProvince)}
            className="flex items-center gap-2 mb-6 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full transition-all active:scale-95"
          >
            <MapPin size={16} />
            <span className="text-sm font-black uppercase tracking-widest">{weather?.locationName || 'Đang xác định...'}</span>
            <ChevronDown size={16} className={`transition-transform duration-300 ${isSelectingProvince ? 'rotate-180' : ''}`} />
          </button>

          {loading ? (
            <div className="py-12 flex flex-col items-center justify-center gap-4">
              <Loader2 size={48} className="animate-spin opacity-50" />
              <p className="font-medium opacity-70">Đang cập nhật thời tiết...</p>
            </div>
          ) : error ? (
            <div className="py-12 text-center">
              <p className="font-bold mb-4">{error}</p>
              <button onClick={() => fetchWeather(selectedProvince || undefined)} className="bg-white/20 px-6 py-2 rounded-full font-bold">Thử lại</button>
            </div>
          ) : (
            <div className="flex justify-between items-center animate-in fade-in zoom-in duration-500">
              <div>
                <div className="flex items-start">
                  <span className="text-7xl font-black tracking-tighter">{weather?.temp}</span>
                  <span className="text-3xl font-bold mt-2">°C</span>
                </div>
                <p className="text-xl font-bold mt-2">{weather?.description}</p>
              </div>
              <div className="bg-white/10 p-6 rounded-full backdrop-blur-md">
                {getWeatherIcon(weather?.icon || 'sun', 64)}
              </div>
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto relative bg-white">
          {/* Province Selection Overlay */}
          {isSelectingProvince && (
            <div className="absolute inset-0 z-20 bg-white flex flex-col animate-in slide-in-from-top duration-300">
              <div className="p-4 border-b border-slate-100">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text"
                    placeholder="Tìm kiếm tỉnh thành..."
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-2">
                <button 
                  onClick={() => {
                    setSelectedProvince(null);
                    setIsSelectingProvince(false);
                    setSearchQuery('');
                  }}
                  className="w-full text-left px-4 py-4 hover:bg-slate-50 rounded-xl flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                      <MapPin size={16} />
                    </div>
                    <span className="font-bold text-slate-700">Vị trí hiện tại (GPS)</span>
                  </div>
                  {!selectedProvince && <div className="w-2 h-2 bg-green-500 rounded-full" />}
                </button>
                <div className="h-px bg-slate-100 my-2 mx-4" />
                {filteredProvinces.map(province => (
                  <button 
                    key={province}
                    onClick={() => {
                      setSelectedProvince(province);
                      setIsSelectingProvince(false);
                      setSearchQuery('');
                    }}
                    className={`w-full text-left px-4 py-3 hover:bg-slate-50 rounded-xl transition-colors ${selectedProvince === province ? 'bg-green-50 text-green-700' : 'text-slate-600'}`}
                  >
                    <span className="font-medium">{province}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Weather Details */}
          <div className="p-8">
            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                  <Droplets size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Độ ẩm</p>
                  <p className="text-lg font-black text-slate-800">{weather?.humidity}%</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                  <Wind size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tốc độ gió</p>
                  <p className="text-lg font-black text-slate-800">{weather?.windSpeed} km/h</p>
                </div>
              </div>
            </div>

            {/* Forecast Section */}
            <div>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                <Thermometer size={16} className="text-orange-500" />
                Dự báo 3 giờ tới
              </h3>
              <div className="flex justify-between">
                {weather?.forecast.map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-3">
                    <span className="text-xs font-bold text-slate-400">{item.time}</span>
                    <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center">
                      {getWeatherIcon(item.icon, 20)}
                    </div>
                    <span className="text-sm font-black text-slate-800">{item.temp}°</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Action */}
            <button 
              onClick={onClose}
              className="w-full mt-10 py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm uppercase tracking-widest active:scale-[0.98] transition-transform"
            >
              Đóng bảng tin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherModal;
