
import { FarmProduct, ProductStatus, CertType, Crop, PestDisease } from './types';

export const CATEGORIES = [
  'Trái cây',
  'Lúa gạo',
  'Rau củ',
  'Thủy sản',
  'Gia súc',
  'Gia cầm',
  'Cà phê/Hồ tiêu'
];

export const MOCK_PESTS_BAP_CAI: PestDisease[] = [
  {
    id: 'p1',
    name: 'Sâu tơ',
    scientificName: 'Plutella xylostella',
    category: 'Sâu bọ',
    type: 'pest',
    imageUrl: 'https://picsum.photos/seed/pest1/200',
    isDangerous: true,
    stages: ['Cây con', 'Phát triển'],
    seasons: ['Đông Xuân']
  },
  {
    id: 'p2',
    name: 'Sâu xanh bướm trắng',
    scientificName: 'Pieris brassicae',
    category: 'Sâu bọ',
    type: 'pest',
    imageUrl: 'https://picsum.photos/seed/pest2/200',
    isDangerous: true,
    stages: ['Phát triển'],
    seasons: ['Đông Xuân']
  },
  {
    id: 'p3',
    name: 'Bọ nhảy',
    scientificName: 'Chrysomelidae',
    category: 'Sâu bọ',
    type: 'pest',
    imageUrl: 'https://picsum.photos/seed/pest3/200',
    isDangerous: true,
    stages: ['Cây con'],
    seasons: ['Quanh năm']
  },
  {
    id: 'd1',
    name: 'Bệnh cháy lá',
    scientificName: 'Xanthomonas campestris pv. campestris',
    category: 'Vi khuẩn',
    type: 'disease',
    imageUrl: 'https://picsum.photos/seed/disease1/200',
    isDangerous: true,
    stages: ['Phát triển', 'Thu hoạch'],
    seasons: ['Mùa mưa']
  },
  {
    id: 'd2',
    name: 'Bệnh thối nhũn',
    scientificName: 'Pectobacterium carotovorum',
    category: 'Vi khuẩn',
    type: 'disease',
    imageUrl: 'https://picsum.photos/seed/disease2/200',
    isDangerous: true,
    stages: ['Thu hoạch'],
    seasons: ['Mùa mưa']
  }
];

export const MOCK_CROPS: Crop[] = [
  {
    id: 'c1',
    name: 'Bắp cải',
    icon: '🥬',
    category: 'Rau quả',
    pestsAndDiseases: MOCK_PESTS_BAP_CAI
  },
  {
    id: 'c2',
    name: 'Cà chua',
    icon: '🍅',
    category: 'Rau quả',
    pestsAndDiseases: []
  },
  {
    id: 'c3',
    name: 'Cà rốt',
    icon: '🥕',
    category: 'Rau quả',
    pestsAndDiseases: []
  },
  {
    id: 'c4',
    name: 'Cải xanh',
    icon: '🥬',
    category: 'Rau quả',
    pestsAndDiseases: []
  },
  {
    id: 'c5',
    name: 'Cam',
    icon: '🍊',
    category: 'Rau quả',
    pestsAndDiseases: []
  },
  {
    id: 'c6',
    name: 'Cát tường',
    icon: '🌸',
    category: 'Hoa',
    pestsAndDiseases: []
  },
  {
    id: 'c7',
    name: 'Dạ yến thảo',
    icon: '🌺',
    category: 'Hoa',
    pestsAndDiseases: []
  },
  {
    id: 'c8',
    name: 'Dưa chuột',
    icon: '🥒',
    category: 'Rau quả',
    pestsAndDiseases: []
  },
  {
    id: 'c9',
    name: 'Dưa lưới',
    icon: '🍈',
    category: 'Rau quả',
    pestsAndDiseases: []
  }
];

export const MOCK_PRODUCTS: FarmProduct[] = [
  {
    id: '1',
    farmerId: 'f1',
    farmerName: 'HTX Bến Tre Công Nghệ Cao',
    name: 'Bưởi Da Xanh Bến Tre',
    variety: 'Da Xanh Ruột Hồng',
    category: 'Trái cây',
    area: 12.5,
    expectedYield: 50,
    description: 'Sản xuất theo tiêu chuẩn hữu cơ, không sử dụng thuốc trừ sâu hóa học.',
    harvestMonths: [8, 9, 10, 11, 12],
    images: {
      orchard: ['https://picsum.photos/seed/garden1/600/400'],
      product: ['https://picsum.photos/seed/buoi/600/400'],
      warehouse: ['https://picsum.photos/seed/pack/600/400'],
    },
    certificates: [{ type: CertType.VIETGAP, proofUrl: 'pdf1', issueDate: '2023-05-10', expiryDate: '2025-05-10' }],
    regionCode: 'VN-BTE-PUC-001',
    location: { lat: 10.2435, lng: 106.3756, address: 'Châu Thành, Bến Tre' },
    status: ProductStatus.APPROVED,
    statusHistory: [
      { status: ProductStatus.NEW, timestamp: '2023-10-01T08:00:00Z' },
      { status: ProductStatus.PENDING, timestamp: '2023-10-02T09:00:00Z' },
      { status: ProductStatus.REVIEWING, timestamp: '2023-10-05T10:00:00Z' },
      { status: ProductStatus.COMPLETED, timestamp: '2023-10-10T14:00:00Z' },
      { status: ProductStatus.APPROVED, timestamp: '2023-10-15T16:00:00Z' }
    ],
    contact: '0901234567',
    rating: 4.8,
    timeline: [
      { id: 't1', date: '2023-10-01', stage: 'Đang đậu quả', description: 'Cây phát triển tốt, đã bọc quả tránh ruồi vàng.', imageUrl: 'https://picsum.photos/seed/t1/200' }
    ],
    updatedAt: '2023-10-25'
  },
  {
    id: '2',
    farmerId: 'f2',
    farmerName: 'Nguyễn Văn A',
    name: 'Xoài Cát Hòa Lộc',
    variety: 'Hòa Lộc',
    category: 'Trái cây',
    area: 2.5,
    expectedYield: 15,
    description: 'Xoài Cát Hòa Lộc đặc sản Tiền Giang, đạt chuẩn VietGAP.',
    harvestMonths: [4, 5, 6],
    images: {
      orchard: ['https://picsum.photos/seed/mango1/600/400'],
      product: ['https://picsum.photos/seed/mango2/600/400'],
      warehouse: ['https://picsum.photos/seed/mango3/600/400']
    },
    certificates: [
      { type: CertType.VIETGAP, proofUrl: 'https://picsum.photos/seed/cert1/600/800', issueDate: '2023-01-01', expiryDate: '2025-01-01' }
    ],
    regionCode: 'VN-TG-01',
    location: { lat: 10.35, lng: 106.36, address: 'Cái Bè, Tiền Giang' },
    status: ProductStatus.APPROVED,
    statusHistory: [
      { status: ProductStatus.NEW, timestamp: '2024-05-10T08:00:00Z' },
      { status: ProductStatus.PENDING, timestamp: '2024-05-11T09:00:00Z' },
      { status: ProductStatus.REVIEWING, timestamp: '2024-05-15T10:00:00Z' },
      { status: ProductStatus.COMPLETED, timestamp: '2024-05-18T14:00:00Z' },
      { status: ProductStatus.APPROVED, timestamp: '2024-05-20T16:00:00Z' }
    ],
    contact: '0901234567',
    rating: 4.5,
    timeline: [],
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    farmerId: 'f3',
    farmerName: 'Trần Thị B',
    name: 'Thanh Long Ruột Đỏ',
    variety: 'LĐ1',
    category: 'Trái cây',
    area: 1.8,
    expectedYield: 20,
    description: 'Thanh long ruột đỏ Bình Thuận, xuất khẩu chính ngạch.',
    harvestMonths: [5, 6, 7, 8, 9],
    images: {
      orchard: ['https://picsum.photos/seed/dragon1/600/400'],
      product: ['https://picsum.photos/seed/dragon2/600/400'],
      warehouse: ['https://picsum.photos/seed/dragon3/600/400']
    },
    certificates: [
      { type: CertType.GLOBALGAP, proofUrl: 'https://picsum.photos/seed/cert2/600/800', issueDate: '2023-06-01', expiryDate: '2025-06-01' }
    ],
    regionCode: 'VN-BT-02',
    location: { lat: 10.93, lng: 108.10, address: 'Hàm Thuận Nam, Bình Thuận' },
    status: ProductStatus.APPROVED,
    statusHistory: [
      { status: ProductStatus.NEW, timestamp: '2024-05-12T08:00:00Z' },
      { status: ProductStatus.PENDING, timestamp: '2024-05-13T09:00:00Z' },
      { status: ProductStatus.REVIEWING, timestamp: '2024-05-16T10:00:00Z' },
      { status: ProductStatus.COMPLETED, timestamp: '2024-05-20T14:00:00Z' },
      { status: ProductStatus.APPROVED, timestamp: '2024-05-22T16:00:00Z' }
    ],
    contact: '0912345678',
    rating: 4.7,
    timeline: [],
    updatedAt: new Date().toISOString()
  },
  {
    id: '4',
    farmerId: 'f4',
    farmerName: 'Lê Văn C',
    name: 'Cam Sành Vĩnh Long',
    variety: 'Cam Sành',
    category: 'Trái cây',
    area: 3.0,
    expectedYield: 40,
    description: 'Cam sành Vĩnh Long mọng nước, vị ngọt thanh.',
    harvestMonths: [10, 11, 12, 1],
    images: {
      orchard: ['https://picsum.photos/seed/orange1/600/400'],
      product: ['https://picsum.photos/seed/orange2/600/400'],
      warehouse: ['https://picsum.photos/seed/orange3/600/400']
    },
    certificates: [
      { type: CertType.OCOP, proofUrl: 'https://picsum.photos/seed/cert3/600/800', issueDate: '2023-03-01', expiryDate: '2026-03-01' }
    ],
    regionCode: 'VN-VL-03',
    location: { lat: 10.25, lng: 105.97, address: 'Tam Bình, Vĩnh Long' },
    status: ProductStatus.APPROVED,
    statusHistory: [
      { status: ProductStatus.NEW, timestamp: '2024-05-15T08:00:00Z' },
      { status: ProductStatus.PENDING, timestamp: '2024-05-16T09:00:00Z' },
      { status: ProductStatus.REVIEWING, timestamp: '2024-05-18T10:00:00Z' },
      { status: ProductStatus.COMPLETED, timestamp: '2024-05-22T14:00:00Z' },
      { status: ProductStatus.APPROVED, timestamp: '2024-05-24T16:00:00Z' }
    ],
    contact: '0923456789',
    rating: 4.6,
    timeline: [],
    updatedAt: new Date().toISOString()
  },
  {
    id: '5',
    farmerId: 'f2',
    farmerName: 'Nguyễn Văn A',
    name: 'Sầu Riêng Ri6',
    variety: 'Ri6',
    category: 'Trái cây',
    area: 1.5,
    expectedYield: 10,
    description: 'Sầu riêng Ri6 cơm vàng hạt lép, thơm ngon.',
    harvestMonths: [5, 6, 7],
    images: {
      orchard: ['https://picsum.photos/seed/durian1/600/400'],
      product: ['https://picsum.photos/seed/durian2/600/400'],
      warehouse: ['https://picsum.photos/seed/durian3/600/400']
    },
    certificates: [
      { type: CertType.VIETGAP, proofUrl: 'https://picsum.photos/seed/cert4/600/800', issueDate: '2023-01-01', expiryDate: '2025-01-01' }
    ],
    regionCode: 'VN-TG-04',
    location: { lat: 10.35, lng: 106.36, address: 'Cái Bè, Tiền Giang' }, // Same location as id: '2'
    status: ProductStatus.APPROVED,
    statusHistory: [
      { status: ProductStatus.NEW, timestamp: '2024-05-18T08:00:00Z' },
      { status: ProductStatus.PENDING, timestamp: '2024-05-19T09:00:00Z' },
      { status: ProductStatus.REVIEWING, timestamp: '2024-05-22T10:00:00Z' },
      { status: ProductStatus.COMPLETED, timestamp: '2024-05-24T14:00:00Z' },
      { status: ProductStatus.APPROVED, timestamp: '2024-05-26T16:00:00Z' }
    ],
    contact: '0901234567',
    rating: 4.9,
    timeline: [],
    updatedAt: new Date().toISOString()
  }
];

export const VIETNAM_PROVINCES = [
  "An Giang", "Bà Rịa - Vũng Tàu", "Bắc Giang", "Bắc Kạn", "Bạc Liêu", "Bắc Ninh", "Bến Tre", "Bình Định", "Bình Dương", "Bình Phước", "Bình Thuận", "Cà Mau", "Cần Thơ", "Cao Bằng", "Đà Nẵng", "Đắk Lắk", "Đắk Nông", "Điện Biên", "Đồng Nai", "Đồng Tháp", "Gia Lai", "Hà Giang", "Hà Nam", "Hà Nội", "Hà Tĩnh", "Hải Dương", "Hải Phòng", "Hậu Giang", "Hòa Bình", "Hưng Yên", "Khánh Hòa", "Kiên Giang", "Kon Tum", "Lai Châu", "Lâm Đồng", "Lạng Sơn", "Lào Cai", "Long An", "Nam Định", "Nghệ An", "Ninh Bình", "Ninh Thuận", "Phú Thọ", "Phú Yên", "Quảng Bình", "Quảng Nam", "Quảng Ngãi", "Quảng Ninh", "Quảng Trị", "Sóc Trăng", "Sơn La", "Tây Ninh", "Thái Bình", "Thái Nguyên", "Thanh Hóa", "Thừa Thiên Huế", "Tiền Giang", "TP. Hồ Chí Minh", "Trà Vinh", "Tuyên Quang", "Vĩnh Long", "Vĩnh Phúc", "Yên Bái"
];
