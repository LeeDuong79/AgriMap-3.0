
export enum UserRole {
  FARMER = 'FARMER',
  BUYER = 'BUYER',
  ADMIN = 'ADMIN'
}

export enum ProductStatus {
  NEW = 'Mới đăng ký',
  PENDING = 'Chờ xét duyệt',
  REVIEWING = 'Đang duyệt',
  COMPLETED = 'Xét duyệt xong',
  REJECTED = 'Từ chối'
}

export enum AdminLevel {
  COMMUNE = 'Cấp Xã/Phường',
  DISTRICT = 'Cấp Quận/Huyện',
  PROVINCE = 'Cấp Tỉnh/Thành phố',
  CENTRAL = 'Cấp Trung ương'
}

export interface FarmerUser {
  id: string;
  role: UserRole.FARMER;
  farmName: string;
  representative: string;
  cccd: string;
  phone: string;
  address: {
    province: string;
    district: string;
    commune: string;
    detail: string;
  };
  location: {
    lat: number;
    lng: number;
  } | null;
}

export interface AdminUser {
  id: string;
  role: UserRole.ADMIN;
  fullName: string;
  adminId: string;
  position: string;
  unit: string; // Đơn vị công tác (Sở/Bộ/Phòng)
  level: AdminLevel;
  assignedArea: string; // Địa bàn phụ trách
  username: string;
  email: string; // Đuôi .gov.vn
  phone: string;
  status: 'ACTIVE' | 'LOCKED' | 'DISABLED';
}

export interface BuyerUser {
  id: string;
  role: UserRole.BUYER;
  fullName: string;
  companyName: string;
  phone: string;
  email: string;
  address: string;
  status: 'ACTIVE' | 'LOCKED';
}

export type User = FarmerUser | AdminUser | BuyerUser | null;

export enum CertType {
  VIETGAP = 'VietGAP',
  GLOBALGAP = 'GlobalGAP',
  OCOP = 'OCOP',
  ORGANIC = 'Hữu cơ'
}

export interface FarmLocation {
  lat: number;
  lng: number;
  address: string;
}

export interface FarmingTimelineUpdate {
  id: string;
  date: string;
  stage: string;
  description: string;
  imageUrl?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  adminName: string;
  adminId: string;
  action: string;
  targetId: string;
  targetName: string;
  details?: string;
}

export interface StatusHistory {
  status: ProductStatus;
  timestamp: string;
  note?: string;
}

export interface FarmProduct {
  id: string;
  farmerId: string;
  farmerName: string;
  name: string;
  variety: string;
  category: string;
  area: number;
  expectedYield: number;
  description: string;
  harvestMonths: number[];
  images: {
    orchard: string[];
    product: string[];
    warehouse: string[];
  };
  certificates: {
    type: CertType;
    proofUrl: string;
    issueDate: string;
    expiryDate: string;
  }[];
  regionCode: string;
  location: FarmLocation;
  status: ProductStatus;
  statusHistory: StatusHistory[];
  contact: string;
  rating: number;
  timeline: FarmingTimelineUpdate[];
  updatedAt: string;
  verifiedAt?: string;
  verifiedBy?: string;
  rejectionReason?: string;
  verificationNote?: string;
}

export interface PestDisease {
  id: string;
  name: string;
  scientificName: string;
  category: string; // e.g., "Sâu bọ", "Vi khuẩn"
  type: 'pest' | 'disease';
  imageUrl: string;
  isDangerous: boolean;
  stages?: string[];
  seasons?: string[];
}

export interface Crop {
  id: string;
  name: string;
  icon: string;
  category: string; // e.g., "Rau quả", "Cây công nghiệp"
  pestsAndDiseases: PestDisease[];
}

export interface WeatherData {
  temp: number;
  condition: string;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: string;
  locationName: string;
  forecast: {
    time: string;
    temp: number;
    icon: string;
  }[];
}
