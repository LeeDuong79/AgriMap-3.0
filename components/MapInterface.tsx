
import React, { useEffect, useRef, useState, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet.heat';
import 'leaflet.markercluster';
import { FarmProduct, ProductStatus } from '../types';
import { 
  MapPin, Phone, Award, Navigation, Search, X, 
  Map as MapIcon, SlidersHorizontal, AlertCircle, 
  TrendingUp, Star, Share2, Bookmark, CheckCircle, 
  Info, ExternalLink, Calendar, ChevronRight, MessageSquare,
  Activity, Thermometer, Droplets, Wind, CloudRain, Sun
} from 'lucide-react';

const MONITORING_LOCATIONS = [
    { lat: 10.005, lng: 105.655, name: "Phong Điền - Cần Thơ", sub: "Vườn Vú Sữa Lò Rèn", val: "85%", type: "rain", range: "28°/24°", feels: "25°" },
    { lat: 9.985, lng: 105.755, name: "Cái Răng - Cần Thơ", sub: "Vườn Dâu Hạ Châu", val: "26.5°C", type: "cool", range: "28°/23°", feels: "26°" },
    { lat: 10.125, lng: 105.505, name: "Thới Lai - Cần Thơ", sub: "Cây Ăn Quả Hỗn Hợp", val: "78%", type: "rain", range: "27°/23°", feels: "26°" },
    { lat: 10.055, lng: 105.805, name: "Bình Thủy - Cần Thơ", sub: "Vườn Nhãn Idor", val: "25.2°C", type: "cool", range: "27°/24°", feels: "25°" },
    { lat: 10.185, lng: 106.005, name: "Cái Mơn - Bến Tre", sub: "Sầu Riêng Ri6", val: "82%", type: "rain", range: "27°/23°", feels: "26°" },
    { lat: 10.355, lng: 106.305, name: "Châu Thành - Tiền Giang", sub: "Thanh Long Ruột Đỏ", val: "24.5°C", type: "cool", range: "26°/22°", feels: "24°" },
    { lat: 10.455, lng: 105.625, name: "Cao Lãnh - Đồng Tháp", sub: "Xoài Cát Hòa Lộc", val: "26.0°C", type: "cool", range: "28°/24°", feels: "26°" },
    { lat: 9.955, lng: 105.655, name: "Phụng Hiệp - Hậu Giang", sub: "Vườn Chanh Không Hạt", val: "90%", type: "rain", range: "26°/23°", feels: "25°" },
    { lat: 10.255, lng: 105.905, name: "Vĩnh Long", sub: "Bưởi Năm Roi", val: "25.8°C", type: "cool", range: "27°/24°", feels: "25°" },
    { lat: 10.155, lng: 105.455, name: "Ô Môn - Cần Thơ", sub: "Vườn Cam Sành", val: "80%", type: "rain", range: "27°/24°", feels: "26°" },
    { lat: 10.385, lng: 105.955, name: "Cai Lậy - Tiền Giang", sub: "Vườn Sầu Riêng Xuất Khẩu", val: "36.5°C", type: "hot", range: "37°/28°", feels: "39°" },
    { lat: 10.225, lng: 106.155, name: "Chợ Lách - Bến Tre", sub: "Vườn Cây Giống - Hoa Kiểng", val: "35.8°C", type: "hot", range: "36°/27°", feels: "38°" },
    { lat: 9.925, lng: 105.905, name: "Măng Thít - Vĩnh Long", sub: "Vườn Cam Sành Đang Ra Hoa", val: "36.2°C", type: "hot", range: "37°/27°", feels: "39°" },
    { lat: 9.755, lng: 105.985, name: "Kế Sách - Sóc Trăng", sub: "Vườn Vú Sữa Tím", val: "37.0°C", type: "hot", range: "38°/29°", feels: "40°" },
    { lat: 10.455, lng: 106.405, name: "Gò Công - Tiền Giang", sub: "Vườn Sơ Ri Đặc Sản", val: "18%", type: "water", range: "34°/26°", feels: "35°" },
    { lat: 10.105, lng: 106.455, name: "Ba Tri - Bến Tre", sub: "Vườn Mãng Cầu Xiêm", val: "15%", type: "water", range: "33°/25°", feels: "34°" },
    { lat: 9.655, lng: 105.655, name: "Long Mỹ - Hậu Giang", sub: "Vườn Mãng Cầu Ta", val: "20%", type: "water", range: "35°/27°", feels: "36°" },
    { lat: 10.555, lng: 105.455, name: "Hồng Ngự - Đồng Tháp", sub: "Cụm Cây Ăn Quả Ven Biên", val: "12%", type: "water", range: "36°/28°", feels: "37°" }
];

const SENSOR_STATIONS = [
  { id: "ST01", area: "TP.HCM", lat: 10.7626, lng: 106.6601, data: { temp: 34, humidity: 65, soilMoisture: 60, rain: 5, light: 45000, wind: 8 }, updatedAt: "10:30" },
  { id: "ST02", area: "TP.HCM (Hóc Môn)", lat: 10.8833, lng: 106.5833, data: { temp: 33, humidity: 62, soilMoisture: 55, rain: 0, light: 42000, wind: 6 }, updatedAt: "10:45" },
  { id: "ST03", area: "Cần Thơ", lat: 10.0371, lng: 105.7828, data: { temp: 31, humidity: 72, soilMoisture: 60, rain: 5, light: 38000, wind: 8 }, updatedAt: "10:25" },
  { id: "ST04", area: "Cần Thơ (Thốt Nốt)", lat: 10.2833, lng: 105.5333, data: { temp: 30, humidity: 75, soilMoisture: 65, rain: 2, light: 35000, wind: 7 }, updatedAt: "10:50" },
  { id: "ST05", area: "Đồng Nai", lat: 10.9574, lng: 106.8427, data: { temp: 35, humidity: 58, soilMoisture: 60, rain: 5, light: 50000, wind: 8 }, updatedAt: "10:40" },
  { id: "ST06", area: "Đồng Nai (Long Khánh)", lat: 10.9333, lng: 107.2333, data: { temp: 34, humidity: 60, soilMoisture: 58, rain: 0, light: 48000, wind: 9 }, updatedAt: "10:55" },
  { id: "ST07", area: "An Giang", lat: 10.5216, lng: 105.1259, data: { temp: 30, humidity: 75, soilMoisture: 60, rain: 5, light: 32000, wind: 8 }, updatedAt: "10:15" },
  { id: "ST08", area: "An Giang (Châu Đốc)", lat: 10.7, lng: 105.1167, data: { temp: 31, humidity: 70, soilMoisture: 62, rain: 0, light: 34000, wind: 10 }, updatedAt: "11:00" },
  { id: "ST09", area: "Lâm Đồng (Đà Lạt)", lat: 11.9404, lng: 108.4583, data: { temp: 22, humidity: 85, soilMoisture: 60, rain: 5, light: 25000, wind: 8 }, updatedAt: "09:50" },
  { id: "ST10", area: "Lâm Đồng (Bảo Lộc)", lat: 11.5461, lng: 107.8025, data: { temp: 25, humidity: 80, soilMoisture: 68, rain: 10, light: 28000, wind: 5 }, updatedAt: "11:05" },
  { id: "ST11", area: "Bến Tre", lat: 10.2435, lng: 106.3761, data: { temp: 32, humidity: 68, soilMoisture: 60, rain: 5, light: 40000, wind: 8 }, updatedAt: "10:35" },
  { id: "ST12", area: "Bến Tre (Ba Tri)", lat: 10.05, lng: 106.6, data: { temp: 31, humidity: 70, soilMoisture: 58, rain: 0, light: 42000, wind: 12 }, updatedAt: "11:10" },
  { id: "ST13", area: "Cà Mau", lat: 9.1769, lng: 105.1524, data: { temp: 29, humidity: 80, soilMoisture: 60, rain: 5, light: 30000, wind: 8 }, updatedAt: "10:05" },
  { id: "ST14", area: "Cà Mau (Năm Căn)", lat: 8.75, lng: 104.9833, data: { temp: 28, humidity: 82, soilMoisture: 65, rain: 8, light: 28000, wind: 15 }, updatedAt: "11:15" },
];

interface MapInterfaceProps {
  products: FarmProduct[];
  isFarmerView?: boolean;
  isBuyerView?: boolean;
  onSearch?: (query: string) => void;
  initialSearchQuery?: string;
}

const POPULAR_SUGGESTIONS = ['Bưởi Da Xanh', 'Sầu riêng Ri6', 'Xoài Cát Hòa Lộc', 'Lúa ST25', 'Vú sữa Lò Rèn'];

const MapInterface: React.FC<MapInterfaceProps> = ({ products, isFarmerView = false, isBuyerView = false, onSearch, initialSearchQuery = '' }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const clusterGroupRef = useRef<L.MarkerClusterGroup | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const heatLayerRef = useRef<any>(null);
  const [selectedProduct, setSelectedProduct] = useState<FarmProduct | null>(null);
  const [localQuery, setLocalQuery] = useState(initialSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProvince, setSelectedProvince] = useState('All');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isMonitoringMode, setIsMonitoringMode] = useState(false);
  const [selectedMonitoringLoc, setSelectedMonitoringLoc] = useState<any>(MONITORING_LOCATIONS[0]);
  const [monitoringFilter, setMonitoringFilter] = useState('all');
  const [heatmapType, setHeatmapType] = useState<'temp' | 'moisture'>('temp');
  const labelMarkerRef = useRef<L.Marker | null>(null);

  const filteredDisplayProducts = useMemo(() => {
    let filtered = products;
    
    if (localQuery.trim()) {
      const q = localQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.category.toLowerCase().includes(q) ||
        p.farmerName.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (selectedProvince !== 'All') {
      filtered = filtered.filter(p => p.location.address.includes(selectedProvince));
    }

    return filtered;
  }, [products, localQuery, selectedCategory, selectedProvince]);

  const provinces = useMemo(() => {
    const set = new Set(products.map(p => {
      const parts = p.location.address.split(',');
      return parts[parts.length - 1].trim();
    }));
    return Array.from(set).sort();
  }, [products]);

  const categories = useMemo(() => {
    const set = new Set(products.map(p => p.category));
    return Array.from(set).sort();
  }, [products]);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (!mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current, {
        center: [10.2435, 106.3756],
        zoom: 10,
        zoomControl: false
      });
      tileLayerRef.current = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapRef.current);
      L.control.zoom({ position: 'bottomright' }).addTo(mapRef.current);
    }
  }, []);

  // Handle Tile Layer Theme
  useEffect(() => {
    if (!mapRef.current || !tileLayerRef.current) return;
    
    const darkUrl = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
    const lightUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    
    tileLayerRef.current.setUrl(isMonitoringMode ? darkUrl : lightUrl);
  }, [isMonitoringMode]);

  // Handle Markers
  useEffect(() => {
    if (!mapRef.current) return;

    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];
    
    // Heatmap Logic
    if (isMonitoringMode && mapRef.current) {
      const map = mapRef.current;
      
      const initHeatLayer = () => {
        if (!map) return;
        const size = map.getSize();
        if (size.x === 0 || size.y === 0) {
          map.once('resize', initHeatLayer);
          return;
        }

        // Intensity normalized: 15°C (0.1) -> 40°C (1.0)
        const heatData = SENSOR_STATIONS.map(s => [
          s.lat, 
          s.lng, 
          Math.max(0.1, (s.data.temp - 15) / 25)
        ]);

        if (heatLayerRef.current) {
          map.removeLayer(heatLayerRef.current);
        }

        // @ts-ignore
        heatLayerRef.current = L.heatLayer(heatData, {
          radius: 120,
          blur: 60,
          maxZoom: 10,
          gradient: {
            0.2: '#3b82f6', // Blue (< 24)
            0.4: '#22c55e', // Green (25-28)
            0.6: '#eab308', // Yellow (29-32)
            0.8: '#ef4444'  // Red (> 33)
          }
        }).addTo(map);
      };

      map.whenReady(() => {
        setTimeout(initHeatLayer, 100);
      });
    } else {
      if (heatLayerRef.current && mapRef.current) {
        mapRef.current.removeLayer(heatLayerRef.current);
        heatLayerRef.current = null;
      }
    }

    if (labelMarkerRef.current) {
      labelMarkerRef.current.remove();
      labelMarkerRef.current = null;
    }

    if (clusterGroupRef.current && mapRef.current) {
      mapRef.current.removeLayer(clusterGroupRef.current);
      clusterGroupRef.current = null;
    }

    if (!isMonitoringMode) {
      const createIcon = (color = '#15803d') => L.divIcon({
        className: 'custom-icon',
        html: `<div style="background-color: ${color};" class="p-2 rounded-full border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform hover:scale-125 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 2 9.5a7 7 0 0 1-7 7c-2 0-3-1-3-1"/><path d="M11 20s-1 1.5-3.5 1.5-4.5-1.5-4.5-5 4-5 4-5"/></svg>
              </div>`,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
      });

      if (clusterGroupRef.current) {
        mapRef.current.removeLayer(clusterGroupRef.current);
      }
      
      const clusterGroup = L.markerClusterGroup({
        showCoverageOnHover: false,
        zoomToBoundsOnClick: true,
        spiderfyOnMaxZoom: true,
        removeOutsideVisibleBounds: true,
        animate: true,
      });

      const newMarkers: L.Marker[] = [];
      filteredDisplayProducts.forEach(p => {
        const marker = L.marker([p.location.lat, p.location.lng], { icon: createIcon() })
          .on('click', () => {
            setSelectedProduct(p);
            setIsSaved(false);
            mapRef.current?.flyTo([p.location.lat, p.location.lng], 14, { duration: 1.5 });
          });
        clusterGroup.addLayer(marker);
        newMarkers.push(marker);
      });

      mapRef.current.addLayer(clusterGroup);
      clusterGroupRef.current = clusterGroup;
      markersRef.current = newMarkers;

      if (newMarkers.length > 0 && localQuery.trim().length > 0) {
        mapRef.current.fitBounds(clusterGroup.getBounds().pad(0.3), { animate: true });
      }
    } else {
      // Monitoring Mode Markers
      const getMonitoringIcon = (type: string) => {
        let content = '';
        let effectsHtml = '';
        let typeClass = `type-${type}`;
        
        if (type === 'hot' || type === 'water' || type === 'rain') {
            effectsHtml = `<div class="warning-rect ${typeClass}"></div><div class="ripple ${typeClass}"></div><div class="ripple ripple-2 ${typeClass}"></div>`;
        }

        if (type === 'hot') content = `<div class="sun-icon"></div>`;
        else if (type === 'water') content = `<div class="water-warning-bang"></div>`;
        else if (type === 'rain') {
            content = `<div class="rain-storm-container">
                <svg class="cloud-storm" viewBox="0 0 24 24"><path d="M17.5,19c2.5,0,4.5-2,4.5-4.5c0-1.9-1.2-3.6-3-4.2-0.1-3.1-2.6-5.5-5.7-5.5-2.3,0-4.3,1.4-5.2,3.4C7.5,8.1,7,8,6.5,8 C4,8,2,10,2,12.5S4,17,6.5,17h11"/></svg>
                <div class="rain-drops-heavy">
                    <div class="drop-heavy" style="left:5px;"></div>
                    <div class="drop-heavy" style="left:15px;animation-delay:0.1s"></div>
                    <div class="drop-heavy" style="left:25px;animation-delay:0.2s"></div>
                </div>
            </div>`;
        } else {
            content = `<div class="sun-cloud-container"><div class="sun-mini"></div><svg class="cloud-mini" viewBox="0 0 24 24"><path d="M17.5,19c2.5,0,4.5-2,4.5-4.5c0-1.9-1.2-3.6-3-4.2-0.1-3.1-2.6-5.5-5.7-5.5-2.3,0-4.3,1.4-5.2,3.4C7.5,8.1,7,8,6.5,8 C4,8,2,10,2,12.5S4,17,6.5,17h11"/></svg></div>`;
        }
        return L.divIcon({ className: '', html: `<div class="marker-container">${effectsHtml}${content}</div>`, iconSize: [60, 60], iconAnchor: [30, 30] });
      };

      const filtered = monitoringFilter === 'all' ? MONITORING_LOCATIONS : MONITORING_LOCATIONS.filter(l => l.type === monitoringFilter);
      const newMarkers: L.Marker[] = [];
      
      filtered.forEach(loc => {
        const marker = L.marker([loc.lat, loc.lng], { icon: getMonitoringIcon(loc.type) })
          .addTo(mapRef.current!)
          .on('click', () => handleMonitoringLocClick(loc));
        newMarkers.push(marker);
      });

      // Add Sensor Stations
      SENSOR_STATIONS.forEach(station => {
        const sensorIcon = L.divIcon({
          className: 'custom-sensor-icon',
          html: `
            <div class="relative flex flex-col items-center justify-center">
              <div class="absolute w-8 h-8 bg-blue-500/30 rounded-full animate-ping"></div>
              <div class="relative bg-white border-2 border-blue-600 p-1 rounded-lg shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
              </div>
              <div class="mt-1 bg-black/80 text-white text-[8px] px-1.5 py-0.5 rounded-full font-black uppercase whitespace-nowrap border border-white/20 shadow-sm">
                Trạm ${station.area}
              </div>
            </div>
          `,
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        });

        const popupContent = `
          <div class="p-5">
            <div class="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
              <div>
                <h3 class="text-blue-400 font-black text-sm leading-none uppercase tracking-tighter">ID: ${station.id} - Khu vực: ${station.area}</h3>
              </div>
              <div class="bg-blue-500/20 p-2 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20v-6M6 20V10M18 20V4"/></svg>
              </div>
            </div>
            
            <div class="grid grid-cols-2 gap-3 mb-4">
              <div class="bg-white/5 p-2.5 rounded-xl border border-white/5">
                <div class="flex items-center gap-1.5 mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/></svg>
                  <span class="text-[9px] font-black text-slate-400 uppercase">Nhiệt độ</span>
                </div>
                <p class="text-sm font-black text-white">${station.data.temp}°C</p>
              </div>
              <div class="bg-white/5 p-2.5 rounded-xl border border-white/5">
                <div class="flex items-center gap-1.5 mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
                  <span class="text-[9px] font-black text-slate-400 uppercase">Độ ẩm khí</span>
                </div>
                <p class="text-sm font-black text-white">${station.data.humidity}%</p>
              </div>
              <div class="bg-white/5 p-2.5 rounded-xl border border-white/5">
                <div class="flex items-center gap-1.5 mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
                  <span class="text-[9px] font-black text-slate-400 uppercase">Độ ẩm đất</span>
                </div>
                <p class="text-sm font-black text-white">${station.data.soilMoisture}%</p>
              </div>
              <div class="bg-white/5 p-2.5 rounded-xl border border-white/5">
                <div class="flex items-center gap-1.5 mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.89c0-4 5-9 5-9s5 5 5 9a5 5 0 1 1-10 0Z"/><path d="M17.76 15.57c0-2 3.24-4.5 3.24-4.5s3.24 2.5 3.24 4.5a3.24 3.24 0 0 1-6.48 0Z"/></svg>
                  <span class="text-[9px] font-black text-slate-400 uppercase">Lượng mưa</span>
                </div>
                <p class="text-sm font-black text-white">${station.data.rain}mm</p>
              </div>
              <div class="bg-white/5 p-2.5 rounded-xl border border-white/5">
                <div class="flex items-center gap-1.5 mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fcd34d" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
                  <span class="text-[9px] font-black text-slate-400 uppercase">Ánh sáng</span>
                </div>
                <p class="text-sm font-black text-white">${station.data.light} lux</p>
              </div>
              <div class="bg-white/5 p-2.5 rounded-xl border border-white/5">
                <div class="flex items-center gap-1.5 mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/></svg>
                  <span class="text-[9px] font-black text-slate-400 uppercase">Gió</span>
                </div>
                <p class="text-sm font-black text-white">${station.data.wind}km/h</p>
              </div>
            </div>

            <div class="flex items-center justify-between border-t border-white/5 pt-3">
              <span class="text-[8px] font-black text-slate-500 uppercase">Thời gian: Cập nhật lúc ${station.updatedAt}</span>
              <span class="flex items-center gap-1">
                <span class="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                <span class="text-[8px] font-black text-green-500 uppercase">Trực tuyến</span>
              </span>
            </div>
          </div>
        `;

        const marker = L.marker([station.lat, station.lng], { icon: sensorIcon })
          .addTo(mapRef.current!)
          .bindPopup(popupContent, { 
            className: 'sensor-popup',
            maxWidth: 300,
            closeButton: true
          });
        newMarkers.push(marker);
      });

      markersRef.current = newMarkers;
    }
  }, [products, localQuery, isMonitoringMode, monitoringFilter]);

  const handleMonitoringLocClick = (loc: any) => {
    setSelectedMonitoringLoc(loc);
    mapRef.current?.flyTo([loc.lat, loc.lng], 12, { duration: 1.2 });
    
    if (labelMarkerRef.current) {
      labelMarkerRef.current.remove();
    }

    setTimeout(() => {
      labelMarkerRef.current = L.marker([loc.lat, loc.lng], { 
          icon: L.divIcon({ 
              className: '', 
              html: `<div class="loc-label">${loc.name}</div>`, 
              iconAnchor: [60, 65] 
          }), 
          interactive: false 
      }).addTo(mapRef.current!);
    }, 600);
  };

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    onSearch?.(localQuery);
    setShowSuggestions(false);
    (document.activeElement as HTMLElement)?.blur();
  };

  const handleSuggestionClick = (q: string) => {
    setLocalQuery(q);
    onSearch?.(q);
    setShowSuggestions(false);
  };

  const openInGoogleMaps = (lat: number, lng: number) => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
  };

  return (
    <div className="relative w-full h-full font-sans overflow-hidden">
      <div ref={mapContainerRef} className="w-full h-full z-0" />
      
      {/* No Results Message */}
      {!isMonitoringMode && localQuery.trim() !== '' && filteredDisplayProducts.length === 0 && (
        <div className="absolute top-48 left-1/2 -translate-x-1/2 z-[3000] bg-white border-4 border-black p-6 rounded-[2rem] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center gap-4 animate-in zoom-in duration-300 max-w-md w-full mx-4">
          <div className="bg-red-100 text-red-600 p-4 rounded-2xl shrink-0">
            <AlertCircle size={32} strokeWidth={3} />
          </div>
          <div>
            <p className="text-xl font-black text-black uppercase tracking-tighter leading-none mb-1">Không tìm thấy nông sản</p>
            <p className="text-xs font-bold text-slate-500 uppercase leading-tight">Vui lòng thử từ khóa khác hoặc kiểm tra lại khu vực tìm kiếm.</p>
          </div>
          <button onClick={() => { setLocalQuery(''); setSelectedCategory('All'); setSelectedProvince('All'); }} className="ml-auto p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X size={20} strokeWidth={4} className="text-slate-400" />
          </button>
        </div>
      )}

      {/* Advanced Search Bar for Buyer View */}
      {isBuyerView && !isMonitoringMode && (
        <div className="absolute top-6 left-6 right-6 z-[2000] flex justify-center">
          <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl border border-slate-200 p-4 flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1 w-full space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Tìm kiếm</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  value={localQuery}
                  onChange={(e) => setLocalQuery(e.target.value)}
                  placeholder="Tên nông dân, sản phẩm..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm font-bold text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                />
              </div>
            </div>

            <div className="w-full md:w-64 space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Loại nông sản</label>
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm font-bold text-black focus:border-blue-500 outline-none cursor-pointer"
              >
                <option value="All">Tất cả</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="w-full md:w-64 space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Tỉnh / Thành phố</label>
              <select 
                value={selectedProvince}
                onChange={(e) => {
                  const prov = e.target.value;
                  setSelectedProvince(prov);
                  
                  if (prov !== 'All' && mapRef.current) {
                    // Find products in this province to center the map
                    const productsInProv = products.filter(p => p.location.address.includes(prov));
                    if (productsInProv.length > 0) {
                      const bounds = L.latLngBounds(productsInProv.map(p => [p.location.lat, p.location.lng]));
                      mapRef.current.fitBounds(bounds.pad(0.5), { animate: true, duration: 1.5 });
                    }
                  }
                }}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm font-bold text-black focus:border-blue-500 outline-none cursor-pointer"
              >
                <option value="All">Tất cả tỉnh</option>
                {provinces.map(prov => (
                  <option key={prov} value={prov}>{prov}</option>
                ))}
              </select>
            </div>

            <button 
              onClick={() => { setLocalQuery(''); setSelectedCategory('All'); setSelectedProvince('All'); }}
              className="p-2.5 bg-slate-100 text-slate-500 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all"
              title="Xóa bộ lọc"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}

      {/* 1. Header Search Bar (Standard view) */}
      {!isMonitoringMode && !isBuyerView && (
        <div className="absolute top-6 left-6 right-6 z-[2000] flex justify-center">
          <div className="w-full max-w-xl relative">
            <form 
              onSubmit={handleSearchSubmit}
              className="bg-white border-[4px] border-black rounded-[2rem] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center p-1.5 transition-all focus-within:translate-x-1 focus-within:translate-y-1 focus-within:shadow-none"
            >
              <button type="submit" className="pl-4 pr-3 text-black hover:scale-110 active:scale-95 transition-transform">
                <Search size={28} strokeWidth={4} />
              </button>
              <div className="flex-1 px-2">
                <input 
                  type="text" 
                  value={localQuery}
                  placeholder="Tìm nông sản, mã số PUC..."
                  className="w-full py-3 bg-transparent text-xl font-black text-black outline-none placeholder:text-slate-400 uppercase tracking-tighter"
                  onChange={(e) => setLocalQuery(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                />
              </div>
              {localQuery && (
                <button type="button" onClick={() => { setLocalQuery(''); onSearch?.(''); }} className="p-2 mr-1">
                  <X size={20} strokeWidth={4} className="text-red-600" />
                </button>
              )}
              <button type="button" className="bg-black text-white p-3.5 rounded-2xl hover:bg-slate-800 transition-colors">
                <SlidersHorizontal size={22} strokeWidth={3} />
              </button>
            </form>

            {showSuggestions && !localQuery && (
              <div className="absolute top-full mt-4 left-0 right-0 bg-white border-4 border-black rounded-[2rem] shadow-2xl p-6 animate-in slide-in-from-top-4 duration-300">
                <div className="flex items-center gap-2 mb-4 text-green-700">
                  <TrendingUp size={18} strokeWidth={3} />
                  <h4 className="text-xs font-black uppercase tracking-widest">Gợi ý hôm nay</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SUGGESTIONS.map((s) => (
                    <button key={s} onClick={() => handleSuggestionClick(s)} className="px-4 py-2 bg-slate-50 border-2 border-slate-200 rounded-xl text-sm font-black text-black hover:border-black transition-all">
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Monitoring Panel */}
      {isMonitoringMode && (
        <div className="absolute top-6 left-6 z-[3000] w-[360px] bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 shadow-2xl flex flex-col max-h-[calc(100vh-120px)] animate-in slide-in-from-left duration-500">
          <div className="mb-6">
            <h1 className="text-2xl font-black text-white tracking-tighter uppercase italic leading-none">TRẠM GIÁM SÁT</h1>
            <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mt-1">DỮ LIỆU CÂY ĂN QUẢ MIỀN TÂY • 2026</p>
          </div>

          {/* Weather Detail Widget */}
          <div className="bg-white/5 rounded-2xl p-4 border border-white/5 mb-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-1.5 text-white font-black text-sm uppercase">
                  <MapPin size={14} className="text-blue-400" />
                  {selectedMonitoringLoc?.name || 'Vùng Giám Sát'}
                </div>
                <p className="text-[9px] text-slate-400 font-bold mt-0.5">Thứ Tư, 4 tháng 3 08:10</p>
              </div>
              <div className="text-right">
                <p className="text-[9px] font-black text-slate-400 uppercase">
                  {selectedMonitoringLoc?.type === 'rain' ? 'Mưa rải rác' : 
                   selectedMonitoringLoc?.type === 'hot' ? 'Nguy cơ sốc nhiệt' : 
                   selectedMonitoringLoc?.type === 'water' ? 'Độ ẩm đất thấp' : 'Thời tiết ổn định'}
                </p>
                <p className="text-[8px] font-bold text-slate-500 uppercase">Cảm giác như {selectedMonitoringLoc?.feels || '--'}</p>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                {selectedMonitoringLoc?.type === 'rain' ? <CloudRain size={40} className="text-blue-400" /> : 
                 selectedMonitoringLoc?.type === 'hot' ? <Sun size={40} className="text-yellow-400" /> : 
                 <Activity size={40} className="text-green-400" />}
                <span className="text-4xl font-light text-white">{selectedMonitoringLoc?.val.replace('°C', '°') || '--'}</span>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black text-slate-400">{selectedMonitoringLoc?.range || '--'}</p>
              </div>
            </div>

            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
              {[
                { time: '08:00', icon: '🌧️', temp: '25°', hum: '85%' },
                { time: '09:00', icon: '🌦️', temp: '26°', hum: '60%' },
                { time: '10:00', icon: '☁️', temp: '27°', hum: '40%' },
                { time: '11:00', icon: '⛅', temp: '29°', hum: '20%' },
                { time: '12:00', icon: '☀️', temp: '31°', hum: '10%' },
              ].map((h, i) => (
                <div key={i} className="flex flex-col items-center min-w-[42px]">
                  <span className="text-[9px] text-slate-500 font-bold">{h.time}</span>
                  <span className="my-1 text-sm">{h.icon}</span>
                  <span className="text-[11px] text-white font-black">{h.temp}</span>
                  <span className="text-[8px] text-blue-400 font-bold">💧{h.hum}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-5 gap-1.5 mb-4">
            {[
              { id: 'all', label: 'TẤT CẢ', color: 'bg-blue-600' },
              { id: 'hot', label: 'NGUY CƠ', color: 'bg-red-600' },
              { id: 'cool', label: 'ỔN ĐỊNH', color: 'bg-green-600' },
              { id: 'water', label: 'CẦN TƯỚI', color: 'bg-yellow-600' },
              { id: 'rain', label: 'MƯA', color: 'bg-blue-400' },
            ].map(f => (
              <button 
                key={f.id}
                onClick={() => setMonitoringFilter(f.id)}
                className={`text-[8px] font-black py-2 px-1 rounded-lg border border-white/5 transition-all ${monitoringFilter === f.id ? `${f.color} text-white shadow-lg` : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto no-scrollbar space-y-2">
            {(monitoringFilter === 'all' ? MONITORING_LOCATIONS : MONITORING_LOCATIONS.filter(l => l.type === monitoringFilter)).map((loc, i) => (
              <div 
                key={i}
                onClick={() => handleMonitoringLocClick(loc)}
                className={`p-3 rounded-xl border border-white/5 flex justify-between items-center cursor-pointer transition-all hover:bg-white/5 ${selectedMonitoringLoc?.name === loc.name ? 'bg-white/10 border-blue-500/50' : 'bg-white/5'}`}
              >
                <div>
                  <h4 className="text-white font-black text-[11px] uppercase truncate w-40">{loc.name}</h4>
                  <p className="text-slate-500 text-[9px] font-bold mt-0.5">{loc.sub}</p>
                </div>
                <div className={`font-black text-sm italic tracking-tighter ${
                  loc.type === 'hot' ? 'text-red-500' : 
                  loc.type === 'cool' ? 'text-green-500' : 
                  loc.type === 'water' ? 'text-yellow-400' : 'text-blue-400'
                }`}>
                  {loc.val}
                </div>
              </div>
            ))}
          </div>

          {/* Heatmap Legend Section */}
          <div className="mt-6 border-t border-white/10 pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2">
                <SlidersHorizontal size={14} className="text-blue-400" />
                Loại Bản Đồ Nhiệt
              </h3>
              <div className="flex bg-white/5 p-1 rounded-lg">
                <button 
                  onClick={() => setHeatmapType('temp')}
                  className={`px-3 py-1 text-[9px] font-black rounded-md transition-all ${heatmapType === 'temp' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
                >
                  NHIỆT ĐỘ
                </button>
                <button 
                  onClick={() => setHeatmapType('moisture')}
                  className={`px-3 py-1 text-[9px] font-black rounded-md transition-all ${heatmapType === 'moisture' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
                >
                  ĐỘ ẨM ĐẤT
                </button>
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-5 h-5 bg-blue-500 rounded-md flex items-center justify-center text-[10px] font-black text-white">
                  {heatmapType === 'temp' ? '1' : '2'}
                </div>
                <span className="text-[11px] font-black text-white uppercase">
                  Heatmap {heatmapType === 'temp' ? 'nhiệt độ' : 'độ ẩm đất'}
                </span>
              </div>

              <div className="space-y-2.5">
                {heatmapType === 'temp' ? (
                  <>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                        <span className="text-[10px] font-bold text-slate-300">xanh</span>
                      </div>
                      <span className="text-[10px] font-black text-slate-500 uppercase italic">nhiệt độ thấp</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                        <span className="text-[10px] font-bold text-slate-300">xanh lá</span>
                      </div>
                      <span className="text-[10px] font-black text-slate-500 uppercase italic">bình thường</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.5)]"></div>
                        <span className="text-[10px] font-bold text-slate-300">vàng</span>
                      </div>
                      <span className="text-[10px] font-black text-slate-500 uppercase italic">hơi nóng</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"></div>
                        <span className="text-[10px] font-bold text-slate-300">đỏ</span>
                      </div>
                      <span className="text-[10px] font-black text-slate-500 uppercase italic">quá nóng</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"></div>
                        <span className="text-[10px] font-bold text-slate-300">đỏ</span>
                      </div>
                      <span className="text-[10px] font-black text-slate-500 uppercase italic">đất khô</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.5)]"></div>
                        <span className="text-[10px] font-bold text-slate-300">vàng</span>
                      </div>
                      <span className="text-[10px] font-black text-slate-500 uppercase italic">thiếu nước</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                        <span className="text-[10px] font-bold text-slate-300">xanh</span>
                      </div>
                      <span className="text-[10px] font-black text-slate-500 uppercase italic">đủ nước</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-700 shadow-[0_0_8px_rgba(29,78,216,0.5)]"></div>
                        <span className="text-[10px] font-bold text-slate-300">xanh đậm</span>
                      </div>
                      <span className="text-[10px] font-black text-slate-500 uppercase italic">quá ẩm</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Side Panel / Place Details (Left side for desktop, full for mobile) */}
      {selectedProduct && (
        <div className="absolute top-0 bottom-0 left-0 w-full md:w-[450px] bg-white border-r-4 border-black z-[3000] shadow-2xl animate-in slide-in-from-left duration-500 overflow-y-auto no-scrollbar">
          {/* Header Image */}
          <div className="relative h-72">
            <img src={selectedProduct.images.product[0]} className="w-full h-full object-cover" alt={selectedProduct.name} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-6 left-6 bg-white border-3 border-black p-3 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all"
            >
              <X size={24} strokeWidth={4} />
            </button>
            
            <div className="absolute bottom-6 left-6 right-6">
               <div className="flex items-center gap-2 mb-1">
                 <span className="bg-green-600 text-white px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest flex items-center gap-1 border border-white/20">
                    <CheckCircle size={10} /> Đã xác thực
                 </span>
               </div>
               <h2 className="text-3xl font-black text-white uppercase tracking-tighter leading-none drop-shadow-lg">{selectedProduct.name}</h2>
            </div>
          </div>

          {/* Place Body */}
          <div className="p-8">
            {/* Rating & Certificates */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black text-black">{selectedProduct.rating || '4.8'}</span>
                <div className="flex text-orange-500">
                  <Star size={18} fill="currentColor" />
                  <Star size={18} fill="currentColor" />
                  <Star size={18} fill="currentColor" />
                  <Star size={18} fill="currentColor" />
                  <Star size={18} fill="currentColor" className="opacity-30" />
                </div>
                <span className="text-slate-400 font-bold ml-1">(120 đánh giá)</span>
              </div>
              <div className="flex gap-2">
                {selectedProduct.certificates.map(c => (
                  <span key={c.type} className="bg-orange-100 text-orange-700 p-2 rounded-lg border-2 border-orange-200 shadow-sm" title={c.type}>
                    <Award size={20} strokeWidth={3} />
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-4 gap-4 mb-10">
              <button 
                onClick={() => openInGoogleMaps(selectedProduct.location.lat, selectedProduct.location.lng)}
                className="flex flex-col items-center gap-2 group"
              >
                <div className="w-14 h-14 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center border-2 border-blue-200 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-md group-active:scale-90">
                  <Navigation size={28} strokeWidth={3} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest">Đường đi</span>
              </button>
              
              <button onClick={() => window.open(`tel:${selectedProduct.contact}`)} className="flex flex-col items-center gap-2 group">
                <div className="w-14 h-14 bg-green-100 text-green-700 rounded-2xl flex items-center justify-center border-2 border-green-200 group-hover:bg-green-600 group-hover:text-white transition-all shadow-md group-active:scale-90">
                  <Phone size={28} strokeWidth={3} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest">Gọi</span>
              </button>

              <button onClick={() => setIsSaved(!isSaved)} className="flex flex-col items-center gap-2 group">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all shadow-md group-active:scale-90 ${isSaved ? 'bg-red-600 text-white border-red-700' : 'bg-slate-50 text-slate-700 border-slate-200 group-hover:bg-slate-200'}`}>
                  <Bookmark size={28} strokeWidth={3} fill={isSaved ? "currentColor" : "none"} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest">{isSaved ? 'Đã lưu' : 'Lưu lại'}</span>
              </button>

              <button className="flex flex-col items-center gap-2 group">
                <div className="w-14 h-14 bg-slate-50 text-slate-700 rounded-2xl flex items-center justify-center border-2 border-slate-200 group-hover:bg-slate-200 transition-all shadow-md group-active:scale-90">
                  <Share2 size={28} strokeWidth={3} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest">Chia sẻ</span>
              </button>
            </div>

            {/* Detailed Info List */}
            <div className="space-y-6 border-t-2 border-slate-100 pt-8">
              <div className="flex gap-5">
                <MapPin className="text-red-600 shrink-0" size={24} />
                <div>
                  <p className="text-base font-bold text-black leading-tight">{selectedProduct.location.address}</p>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-1">Vị trí thực tế</p>
                </div>
              </div>

              <div className="flex gap-5">
                <Info className="text-blue-600 shrink-0" size={24} />
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-black text-green-700 font-mono tracking-tight">{selectedProduct.regionCode}</p>
                    <CheckCircle size={14} className="text-green-600" />
                  </div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-1">Mã số vùng trồng (PUC)</p>
                </div>
              </div>

              <div className="flex gap-5">
                <Calendar className="text-orange-600 shrink-0" size={24} />
                <div>
                  <p className="text-base font-bold text-black">Tháng {selectedProduct.harvestMonths.join(', ')}</p>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-1">Mùa vụ thu hoạch chính</p>
                </div>
              </div>

              <div className="flex gap-5">
                <Phone className="text-green-600 shrink-0" size={24} />
                <div>
                  <p className="text-base font-bold text-black">{selectedProduct.contact}</p>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-1">Số điện thoại liên hệ</p>
                </div>
              </div>
            </div>

            {/* Farm Description */}
            <div className="mt-10 bg-slate-50 p-6 rounded-3xl border-2 border-slate-100">
               <h4 className="text-xs font-black text-black uppercase tracking-widest mb-3 flex items-center gap-2">
                 <Sprout size={16} /> Thông tin canh tác
               </h4>
               <p className="text-slate-600 font-medium italic leading-relaxed">
                 "{selectedProduct.description}"
               </p>
               <div className="mt-4 flex items-center justify-between text-xs font-black text-green-700 uppercase">
                 <span>Chủ vườn: {selectedProduct.farmerName}</span>
                 <ExternalLink size={14} />
               </div>
            </div>

            {/* Review Section Teaser */}
            <div className="mt-8 pt-8 border-t-2 border-slate-100">
               <div className="flex items-center justify-between mb-4">
                 <h4 className="text-xs font-black text-black uppercase tracking-widest">Đánh giá cộng đồng</h4>
                 <button className="text-blue-700 text-xs font-black uppercase underline">Xem tất cả</button>
               </div>
               <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white shrink-0">
                      <Star size={18} fill="white" />
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl flex-1 border border-slate-100">
                       <p className="text-xs font-bold text-slate-600 leading-tight">"Nông sản rất tươi, HTX hỗ trợ nhiệt tình. Có mã PUC nên cực kỳ yên tâm khi mua sỉ."</p>
                       <p className="text-[10px] font-black text-black mt-2 uppercase tracking-widest">- Thương lái Miền Tây</p>
                    </div>
                  </div>
               </div>
            </div>

            {/* Final CTA */}
            <button className="w-full mt-10 bg-black text-white py-5 rounded-2xl font-black text-xl uppercase tracking-tighter flex items-center justify-center gap-3 shadow-2xl hover:scale-[1.02] transition-all active:scale-95">
               Gửi yêu cầu thu mua <ChevronRight />
            </button>
          </div>
        </div>
      )}

      {/* 3. Floating Quick Buttons (Right side) */}
      <div className="absolute bottom-32 right-6 z-[1000] flex flex-col gap-3">
        {/* Toggle Monitoring Mode Button */}
        <button 
          onClick={() => setIsMonitoringMode(!isMonitoringMode)}
          className={`border-4 border-black p-4 rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-x-1 active:translate-y-1 active:shadow-none flex items-center justify-center ${isMonitoringMode ? 'bg-blue-600 text-white' : 'bg-white text-black hover:bg-slate-50'}`}
          title={isMonitoringMode ? "Bản đồ thường" : "Bản đồ giám sát"}
        >
          {isMonitoringMode ? <MapIcon size={28} strokeWidth={4} /> : <Activity size={28} strokeWidth={4} className="text-blue-700" />}
        </button>

        <button 
          onClick={() => {
            if (navigator.geolocation && mapRef.current) {
              navigator.geolocation.getCurrentPosition((pos) => {
                mapRef.current!.flyTo([pos.coords.latitude, pos.coords.longitude], 13);
              });
            }
          }}
          className="bg-white border-4 border-black p-4 rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-slate-50 transition-all text-black active:translate-x-1 active:translate-y-1 active:shadow-none"
        >
          <Navigation size={28} strokeWidth={4} className="text-blue-700" />
        </button>
      </div>

      {/* Backdrop when side panel is open on mobile */}
      {selectedProduct && (
        <div 
          className="md:hidden absolute inset-0 bg-black/40 z-[2500] backdrop-blur-[2px]" 
          onClick={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

// Internal Sprout Icon for description
const Sprout = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m7 20 3-3 3 3M10 17v-5M12 9s2.5-4 5-4 5 4 5 4-2.5 4-5 4-5-4-5-4ZM10 9s-2.5-4-5-4-5 4-5 4 2.5 4 5 4 5-4 5-4Z"/></svg>
);

export default MapInterface;
