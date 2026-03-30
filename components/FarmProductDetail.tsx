
import React from 'react';
import { FarmProduct, ProductStatus } from '../types';
import { 
  ArrowLeft, MapPin, Info, Calendar, 
  ShieldCheck, Sprout, Phone, Award,
  CheckCircle2, XCircle, Clock,
  User as UserIcon, Maximize2, Layers,
  QrCode, History, Leaf, BookOpen,
  UserCheck, Bell
} from 'lucide-react';

interface FarmProductDetailProps {
  product: FarmProduct;
  onBack: () => void;
}

const FarmProductDetail: React.FC<FarmProductDetailProps> = ({ product, onBack }) => {
  return (
    <div className="min-h-screen bg-[#FDF8F5] animate-in slide-in-from-right duration-500">
      <div className="p-6 border-b border-slate-100 flex items-center gap-4 bg-white">
        <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-black text-slate-800 font-display">Chi tiết hồ sơ nông sản</h1>
      </div>

      <div className="p-8 max-w-4xl mx-auto space-y-10 pb-24">
        {/* Farm Profile Card */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-slate-100">
          <div className="flex flex-col md:flex-row md:items-center gap-6 mb-10">
            <div className="w-20 h-20 bg-[#DCFCE7] rounded-3xl flex items-center justify-center text-[#166534] shrink-0">
              <Sprout size={40} />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-black text-slate-900 mb-1 font-display">Nông trại {product.name}</h2>
              <p className="text-slate-500 font-bold mb-3">{product.farmerName}</p>
              <div className="flex flex-wrap gap-2">
                {product.certificates.map((cert, idx) => (
                  <span key={idx} className="bg-[#DCFCE7] text-[#166534] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                    {cert.type}
                  </span>
                ))}
                {product.certificates.length === 0 && (
                  <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                    Chưa có chứng chỉ
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoItem 
              icon={<UserIcon size={18} />} 
              label="Người đại diện" 
              value={product.farmerName} 
            />
            <InfoItem 
              icon={<MapPin size={18} />} 
              label="Vị trí" 
              value={product.location.address} 
            />
            <InfoItem 
              icon={<Maximize2 size={18} />} 
              label="Diện tích" 
              value={`${product.area} ha`} 
            />
            <InfoItem 
              icon={<Layers size={18} />} 
              label="Loại đất" 
              value="Đất phù sa" 
            />
            <InfoItem 
              icon={<History size={18} />} 
              label="Năm thành lập" 
              value="2015" 
            />
            <InfoItem 
              icon={<Leaf size={18} />} 
              label="Cây trồng chính" 
              value={`${product.name}, ${product.variety}`} 
            />
            <InfoItem 
              icon={<Phone size={18} />} 
              label="Liên hệ" 
              value={product.contact} 
            />
          </div>
        </div>

        {/* Additional Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <section className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
              <h3 className="text-lg font-black text-slate-800 uppercase tracking-widest mb-6 flex items-center gap-3 font-display">
                <BookOpen size={20} className="text-green-600" />
                Quy trình canh tác
              </h3>
              <p className="text-slate-600 font-medium leading-relaxed italic bg-slate-50 p-6 rounded-2xl border border-slate-100">
                "{product.description || 'Chưa có mô tả chi tiết về quy trình canh tác cho vùng trồng này.'}"
              </p>
            </section>

            <section className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
              <h3 className="text-lg font-black text-slate-800 uppercase tracking-widest mb-6 flex items-center gap-3 font-display">
                <ShieldCheck size={20} className="text-blue-600" />
                Chứng chỉ đã cấp
              </h3>
              <div className="space-y-3">
                {product.certificates.length > 0 ? product.certificates.map((cert, i) => (
                  <div key={i} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-green-100 p-2 rounded-xl text-green-700">
                        <ShieldCheck size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-800">{cert.type}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Hết hạn: {cert.expiryDate}</p>
                      </div>
                    </div>
                    <CheckCircle2 className="text-green-600" size={20} />
                  </div>
                )) : (
                  <p className="text-slate-400 font-bold italic text-center py-4">Chưa có chứng chỉ</p>
                )}
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <section className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
              <h3 className="text-lg font-black text-slate-800 uppercase tracking-widest mb-6 flex items-center gap-3 font-display">
                <Bell size={20} className="text-orange-600" />
                Phản hồi từ Cán bộ
              </h3>
              <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                <p className="text-blue-900 font-bold italic text-sm">
                  "{product.verificationNote || 'Hồ sơ đang trong quá trình xử lý. Vui lòng đợi phản hồi từ cán bộ chuyên trách.'}"
                </p>
                {product.verifiedBy && (
                  <div className="mt-4 flex items-center gap-2 text-[10px] font-black text-blue-700 uppercase">
                    <ShieldCheck size={14} /> Xác minh bởi {product.verifiedBy}
                  </div>
                )}
              </div>
            </section>

            <section className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
              <h3 className="text-lg font-black text-slate-800 uppercase tracking-widest mb-6 flex items-center gap-3 font-display">
                <Maximize2 size={20} className="text-purple-600" />
                Hình ảnh minh chứng
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { src: product.images.product[0], label: 'Sản phẩm' },
                  { src: product.images.orchard[0], label: 'Vùng trồng' },
                  { src: product.images.warehouse[0], label: 'Kho bãi' }
                ].map((img, i) => (
                  <div key={i} className="aspect-square rounded-xl overflow-hidden border border-slate-200 relative group">
                    <img src={img.src} alt={img.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white text-[8px] font-black uppercase tracking-widest">{img.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="bg-white rounded-[2.5rem] p-10 border-2 border-slate-100 shadow-sm">
          <div className="mb-10">
            <p className="text-lg font-black text-slate-900">Mã hồ sơ: <span className="font-mono text-slate-600 italic">{product.id}</span></p>
          </div>
          
          <div className="relative space-y-12">
            {/* Vertical Line */}
            <div className="absolute left-[87px] top-2 bottom-2 w-0.5 bg-slate-200"></div>

            {[
              { status: ProductStatus.REJECTED, label: 'Từ chối', icon: <XCircle size={20} /> },
              { status: ProductStatus.COMPLETED, label: 'Xét duyệt xong', icon: <CheckCircle2 size={20} /> },
              { status: ProductStatus.REVIEWING, label: 'Đang duyệt', icon: null },
              { status: ProductStatus.PENDING, label: 'Chờ xét duyệt', icon: null },
              { status: ProductStatus.NEW, label: 'Mới đăng ký', icon: null },
            ].filter(step => {
              if (step.status === ProductStatus.REJECTED) return product.status === ProductStatus.REJECTED;
              if (step.status === ProductStatus.COMPLETED) return product.statusHistory?.some(h => h.status === ProductStatus.COMPLETED) || product.status === ProductStatus.COMPLETED;
              return true;
            }).map((step, index) => {
              const historyItem = product.statusHistory?.find(h => h.status === step.status);
              const isCurrent = product.status === step.status;
              const isPast = product.statusHistory?.some(h => h.status === step.status);
              
              const date = historyItem ? new Date(historyItem.timestamp) : null;
              const displayDate = date ? `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}` : '';
              const displayTime = date ? date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) : '';

              return (
                <div key={index} className="flex items-start gap-8 relative z-10">
                  <div className="w-16 text-right shrink-0 pt-1">
                    <p className="text-sm font-bold text-slate-400 leading-none">{displayDate}</p>
                    <p className="text-sm font-bold text-slate-400 mt-1">{displayTime}</p>
                  </div>

                  <div className="relative flex items-center justify-center w-10 h-10 shrink-0">
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                      isCurrent ? (
                        step.status === ProductStatus.REJECTED ? 'bg-red-600 border-red-600 animate-pulse' : 
                        step.status === ProductStatus.COMPLETED ? 'bg-green-600 border-green-600' :
                        'bg-orange-500 border-orange-500 animate-pulse'
                      ) : 
                      isPast ? 'bg-green-600 border-green-600' : 'bg-slate-400 border-slate-400'
                    }`}>
                      {(step.icon || (isCurrent && step.status === ProductStatus.COMPLETED) || isPast) && (
                        <div className="text-white">
                          {step.icon || <CheckCircle2 size={20} />}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-1">
                    <p className={`text-lg font-black ${
                      isCurrent ? (
                        step.status === ProductStatus.REJECTED ? 'text-red-600' : 
                        step.status === ProductStatus.COMPLETED ? 'text-green-600' :
                        'text-orange-600'
                      ) : 
                      isPast ? 'text-slate-900' : 'text-slate-400'
                    }`}>
                      {step.label}
                      {step.status === ProductStatus.REJECTED && product.rejectionReason && (
                        <span className="block text-sm font-bold text-red-500 mt-1 italic">Lý do: {product.rejectionReason}</span>
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

const TimelineStep = ({ label, description, status, currentStatus, history, isFirst, isLast, isFinal }: any) => {
  const statusOrder = [
    ProductStatus.NEW,
    ProductStatus.PENDING,
    ProductStatus.REVIEWING,
    ProductStatus.COMPLETED,
    ProductStatus.REJECTED
  ];

  const currentIndex = statusOrder.indexOf(currentStatus);
  const stepIndex = statusOrder.indexOf(status);
  
  // Special handling for final step
  const isCompleted = stepIndex < currentIndex || (isFinal && (currentStatus === ProductStatus.COMPLETED || currentStatus === ProductStatus.REJECTED));
  const isCurrent = currentStatus === status || (isFinal && (currentStatus === ProductStatus.COMPLETED || currentStatus === ProductStatus.REJECTED) && statusOrder.indexOf(status) >= 3);
  
  // Find timestamp in history
  const historyItem = history?.find((h: any) => h.status === status);
  const timestamp = historyItem ? new Date(historyItem.timestamp).toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }) : null;

  let dotColor = 'bg-slate-200';
  let textColor = 'text-slate-400';
  let dotRing = '';

  if (isCompleted && status !== ProductStatus.REJECTED) {
    dotColor = 'bg-green-500';
    textColor = 'text-black';
  } else if (isCurrent) {
    dotColor = status === ProductStatus.REJECTED ? 'bg-red-500' : 'bg-orange-500';
    textColor = 'text-black';
    dotRing = status === ProductStatus.REJECTED ? 'ring-4 ring-red-100 animate-pulse' : 'ring-4 ring-orange-100 animate-pulse';
  }

  return (
    <div className={`relative pl-12 pb-8 ${isLast ? 'pb-0' : ''}`}>
      {/* Dot */}
      <div className={`absolute left-0 top-1 w-8 h-8 rounded-full z-10 flex items-center justify-center transition-all ${dotColor} ${dotRing}`}>
        {isCompleted ? (
          <CheckCircle2 size={16} className="text-white" />
        ) : isCurrent ? (
          <div className="w-2 h-2 bg-white rounded-full" />
        ) : (
          <div className="w-2 h-2 bg-slate-400 rounded-full" />
        )}
      </div>
      
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <h4 className={`text-sm font-black uppercase tracking-tight ${textColor}`}>{label}</h4>
          {timestamp && <span className="text-[10px] font-bold text-slate-400">{timestamp}</span>}
        </div>
        <p className={`text-xs font-medium mt-1 ${isCurrent || isCompleted ? 'text-slate-600' : 'text-slate-400'}`}>
          {description}
        </p>
      </div>
    </div>
  );
};

export default FarmProductDetail;
