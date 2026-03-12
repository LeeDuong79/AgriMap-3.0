
import React from 'react';
import { FarmProduct, ProductStatus } from '../types';
import { 
  ArrowLeft, MapPin, Info, Calendar, 
  ShieldCheck, Sprout, Phone, Award,
  CheckCircle2, XCircle
} from 'lucide-react';

interface FarmProductDetailProps {
  product: FarmProduct;
  onBack: () => void;
}

const FarmProductDetail: React.FC<FarmProductDetailProps> = ({ product, onBack }) => {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4 animate-in fade-in duration-500">
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-green-700 font-black uppercase tracking-widest mb-8 hover:translate-x-[-4px] transition-transform"
      >
        <ArrowLeft size={20} /> Quay lại danh sách
      </button>

      <div className="bg-white rounded-[3rem] border-4 border-black shadow-2xl overflow-hidden">
        {/* Header Image */}
        <div className="relative h-64 md:h-96">
          <img 
            src={product.images.orchard[0]} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8 right-8">
            <div className="flex items-center gap-3 mb-2">
              <span className={`px-4 py-1 rounded-full text-xs font-black uppercase border-2 ${
                product.status === ProductStatus.APPROVED 
                  ? 'bg-green-500 text-white border-green-800' 
                  : 'bg-orange-400 text-black border-orange-600'
              }`}>
                {product.status}
              </span>
              <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/30">
                {product.category}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none drop-shadow-2xl">
              {product.name}
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 md:p-12 space-y-12">
          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard 
              icon={<MapPin className="text-red-600" />} 
              label="Vị trí" 
              value={product.location.address.split(',')[0]} 
            />
            <StatCard 
              icon={<div className="text-green-700 font-mono font-black">HA</div>} 
              label="Diện tích" 
              value={`${product.area || 0} ha`} 
            />
            <StatCard 
              icon={<Info className="text-blue-600" />} 
              label="Mã PUC" 
              value={product.regionCode} 
            />
            <StatCard 
              icon={<Calendar className="text-orange-600" />} 
              label="Thu hoạch" 
              value={`Tháng ${product.harvestMonths.join(', ')}`} 
            />
          </div>

          {/* Detailed Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <section>
                <h3 className="text-xl font-black text-black uppercase tracking-tight mb-4 flex items-center gap-3">
                  <Sprout size={24} className="text-green-700" />
                  Quy trình canh tác
                </h3>
                <div className="bg-slate-50 p-6 rounded-3xl border-2 border-slate-100">
                  <p className="text-slate-700 font-medium leading-relaxed italic">
                    "{product.description || 'Chưa có mô tả chi tiết về quy trình canh tác cho vùng trồng này.'}"
                  </p>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-black text-black uppercase tracking-tight mb-4 flex items-center gap-3">
                  <Phone size={24} className="text-blue-700" />
                  Thông tin liên hệ
                </h3>
                <div className="bg-slate-50 p-6 rounded-3xl border-2 border-slate-100 flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-200">
                    <Phone size={20} className="text-green-700" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Số điện thoại</p>
                    <p className="text-xl font-black text-black">{product.contact}</p>
                  </div>
                </div>
              </section>
            </div>

            <div className="space-y-8">
              <section>
                <h3 className="text-xl font-black text-black uppercase tracking-tight mb-4 flex items-center gap-3">
                  <Award size={24} className="text-orange-600" />
                  Chứng chỉ đã cấp
                </h3>
                <div className="space-y-4">
                  {product.certificates.length > 0 ? product.certificates.map((cert, i) => (
                    <div key={i} className="bg-white p-5 rounded-2xl border-2 border-slate-200 flex items-center justify-between shadow-sm">
                      <div className="flex items-center gap-4">
                        <div className="bg-green-100 p-2.5 rounded-xl text-green-800">
                          <ShieldCheck size={24} />
                        </div>
                        <div>
                          <p className="text-lg font-black text-black leading-tight">{cert.type}</p>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Hết hạn: {cert.expiryDate}</p>
                        </div>
                      </div>
                      <CheckCircle2 className="text-green-600" size={24} />
                    </div>
                  )) : (
                    <div className="bg-slate-50 p-8 rounded-3xl border-2 border-dashed border-slate-200 text-center">
                      <p className="text-slate-400 font-bold italic uppercase text-sm">Chưa có chứng chỉ</p>
                    </div>
                  )}
                </div>
              </section>

              {product.verificationNote && (
                <section>
                  <h3 className="text-xl font-black text-black uppercase tracking-tight mb-4 flex items-center gap-3">
                    <Info size={24} className="text-blue-700" />
                    Phản hồi từ Cán bộ
                  </h3>
                  <div className="bg-blue-50 p-6 rounded-3xl border-2 border-blue-100">
                    <p className="text-blue-900 font-bold italic">
                      "{product.verificationNote}"
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-[10px] font-black text-blue-700 uppercase">
                      <CheckCircle2 size={14} /> Đã xác minh bởi {product.verifiedBy || 'Cán bộ quản lý'}
                    </div>
                  </div>
                </section>
              )}
            </div>
          </div>

          {/* Product Images Gallery */}
          <section>
            <h3 className="text-xl font-black text-black uppercase tracking-tight mb-6 flex items-center gap-3">
              <ShieldCheck size={24} className="text-green-700" />
              Hình ảnh minh chứng
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <GalleryImage src={product.images.product[0]} label="Sản phẩm" />
              <GalleryImage src={product.images.orchard[0]} label="Vùng trồng" />
              <GalleryImage src={product.images.warehouse[0]} label="Kho bãi" />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value }: any) => (
  <div className="bg-slate-50 p-4 rounded-2xl border-2 border-slate-100 flex flex-col items-center text-center gap-1">
    <div className="mb-1">{icon}</div>
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
    <p className="text-sm font-black text-black uppercase truncate w-full">{value}</p>
  </div>
);

const GalleryImage = ({ src, label }: any) => (
  <div className="group relative aspect-square rounded-2xl overflow-hidden border-2 border-slate-200">
    <img src={src} alt={label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
      <span className="text-white text-[10px] font-black uppercase tracking-widest">{label}</span>
    </div>
  </div>
);

export default FarmProductDetail;
