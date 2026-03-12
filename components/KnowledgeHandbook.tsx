
import React, { useState } from 'react';
import { ArrowLeft, Search, ChevronRight, Info, AlertTriangle, Calendar, Thermometer } from 'lucide-react';
import { Crop, PestDisease } from '../types';
import { MOCK_CROPS } from '../constants';

interface KnowledgeHandbookProps {
  onBack?: () => void;
}

const KnowledgeHandbook: React.FC<KnowledgeHandbookProps> = ({ onBack }) => {
  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);
  const [view, setView] = useState<'selection' | 'details'>('selection');
  const [activeTab, setActiveTab] = useState<'techniques' | 'pests'>('pests');
  const [pestFilter, setPestFilter] = useState<'dangerous' | 'stage' | 'season'>('dangerous');

  const handleSelectCrop = (crop: Crop) => {
    setSelectedCrop(crop);
    setView('details');
  };

  const handleBack = () => {
    if (view === 'details') {
      setView('selection');
    } else if (onBack) {
      onBack();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center px-4 py-4 border-b border-slate-100">
        <button onClick={handleBack} className="p-1 -ml-1 text-slate-600">
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1" /> {/* Spacer */}
        <div className="w-8" /> {/* Spacer */}
      </div>

      {view === 'selection' ? (
        <CropSelection onSelect={handleSelectCrop} />
      ) : (
        <PestDiseaseView 
          crop={selectedCrop!} 
          pestFilter={pestFilter}
          setPestFilter={setPestFilter}
          onChangeCrop={() => setView('selection')}
        />
      )}
    </div>
  );
};

const CropSelection: React.FC<{ onSelect: (crop: Crop) => void }> = ({ onSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Tất cả');

  const categories = ['Tất cả', 'Rau quả', 'Cây công nghiệp', 'Hoa'];

  const filteredCrops = MOCK_CROPS.filter(crop => {
    const matchesSearch = crop.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'Tất cả' || crop.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Category Tabs */}
      <div className="flex gap-2 p-4 overflow-x-auto no-scrollbar">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition-colors ${
              activeCategory === cat 
                ? 'bg-green-50 text-green-700 border border-green-200' 
                : 'bg-slate-50 text-slate-600 border border-transparent'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="px-4 mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Tìm kiếm cây trồng"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20"
          />
        </div>
      </div>

      <div className="px-4 mb-2">
        <p className="text-sm text-slate-500">Chọn tối đa <span className="font-bold">8</span> cây trồng mà bạn quan tâm</p>
      </div>

      {/* Crop Grid */}
      <div className="flex-1 overflow-y-auto px-4 pb-20">
        <div className="grid grid-cols-3 gap-4">
          {filteredCrops.map(crop => (
            <button
              key={crop.id}
              onClick={() => onSelect(crop)}
              className="flex flex-col items-center gap-2 p-2 group"
            >
              <div className="w-20 h-20 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-4xl shadow-sm group-active:scale-95 transition-transform relative">
                {crop.icon}
                {crop.id === 'c1' && (
                  <div className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">1</div>
                )}
              </div>
              <span className="text-sm font-medium text-slate-700">{crop.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Action */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-100">
        <button className="w-full py-4 bg-green-600 text-white rounded-xl font-bold shadow-lg shadow-green-600/20 active:scale-[0.98] transition-transform">
          Lưu lựa chọn 2/8
        </button>
      </div>
    </div>
  );
};

const PestDiseaseView: React.FC<{ 
  crop: Crop; 
  pestFilter: 'dangerous' | 'stage' | 'season';
  setPestFilter: (filter: 'dangerous' | 'stage' | 'season') => void;
  onChangeCrop: () => void;
}> = ({ crop, pestFilter, setPestFilter, onChangeCrop }) => {
  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Crop Info Header */}
      <div className="flex flex-col items-center py-6 bg-gradient-to-b from-green-50/30 to-white">
        <div className="w-24 h-24 rounded-full border-2 border-orange-400 p-1 mb-3">
          <div className="w-full h-full rounded-full bg-green-50 flex items-center justify-center text-5xl">
            {crop.icon}
          </div>
        </div>
        <h2 className="text-2xl font-bold text-slate-800">{crop.name}</h2>
        <button 
          onClick={onChangeCrop}
          className="text-green-600 text-sm font-medium mt-1 hover:underline"
        >
          Thay đổi cây trồng
        </button>
      </div>

      {/* Section Title */}
      <div className="flex justify-center border-b border-slate-100">
        <div className="py-3 text-sm font-bold text-slate-800 relative">
          Sâu & Bệnh hại
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-orange-500 rounded-t-full" />
        </div>
      </div>

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Classification Header */}
        <div className="px-4 py-4">
          <h3 className="font-bold text-slate-800 mb-4">Phân loại sâu bệnh hại</h3>
          <div className="flex gap-3">
            <button
              onClick={() => setPestFilter('dangerous')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-2 rounded-xl border transition-all ${
                pestFilter === 'dangerous' 
                  ? 'border-orange-500 bg-orange-50 text-orange-600' 
                  : 'border-slate-200 bg-white text-slate-500'
              }`}
            >
              <span className="text-sm font-bold">Nguy hiểm</span>
            </button>
            <button
              onClick={() => setPestFilter('stage')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-2 rounded-xl border transition-all ${
                pestFilter === 'stage' 
                  ? 'border-orange-500 bg-orange-50 text-orange-600' 
                  : 'border-slate-200 bg-white text-slate-500'
              }`}
            >
              <Calendar size={16} />
              <span className="text-sm font-bold">Theo giai đoạn</span>
            </button>
            <button
              onClick={() => setPestFilter('season')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-2 rounded-xl border transition-all ${
                pestFilter === 'season' 
                  ? 'border-orange-500 bg-orange-50 text-orange-600' 
                  : 'border-slate-200 bg-white text-slate-500'
              }`}
            >
              <Thermometer size={16} />
              <span className="text-sm font-bold">Theo mùa</span>
            </button>
          </div>
        </div>

        {/* Pest List */}
        <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-4">
          {crop.pestsAndDiseases.length > 0 ? (
            crop.pestsAndDiseases.map(item => (
              <PestCard key={item.id} item={item} />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <Info size={48} strokeWidth={1} className="mb-2" />
              <p>Chưa có dữ liệu cho cây trồng này</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const PestCard: React.FC<{ item: PestDisease }> = ({ item }) => (
  <div className="flex gap-4 p-3 bg-white border border-slate-100 rounded-2xl shadow-sm active:bg-slate-50 transition-colors cursor-pointer">
    <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
      <img 
        src={item.imageUrl} 
        alt={item.name} 
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
    </div>
    <div className="flex flex-col justify-center flex-1">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-orange-500 text-xs font-bold uppercase tracking-wider">{item.category}</span>
        <h4 className="text-lg font-bold text-slate-800">{item.name}</h4>
      </div>
      <p className="text-sm text-slate-400 italic font-medium">{item.scientificName}</p>
    </div>
    <div className="flex items-center text-slate-300">
      <ChevronRight size={20} />
    </div>
  </div>
);

export default KnowledgeHandbook;
