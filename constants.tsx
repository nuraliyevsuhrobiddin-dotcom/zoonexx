
import { Product, Vet, LogisticsProvider, AcademyLesson } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    userId: 'system',
    title: 'Golshtin zotli sigir',
    price: '15,000,000 so\'m',
    location: 'Toshkent vil., Bo\'stonliq',
    image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?q=80&w=1000&auto=format&fit=crop',
    description: 'Sog\'lom, 2-qorin bolasi bilan. Kuniga 25-30 litr sut beradi. Barcha emlashlari qilingan va veterinar ko\'rigidan o\'tgan.',
    category: 'Hayvonlar',
    breed: 'Golshtin',
    weight: '520 kg',
    age: '3 yosh',
    isVaccinated: true,
    isHealthy: true,
    likes: 12
  },
  {
    id: 's1',
    userId: 'system',
    title: 'Shvits zotli sog\'in sigir',
    price: '12,500,000 so\'m',
    location: 'Namangan, Pop',
    image: 'https://images.unsplash.com/photo-1596733430284-f7437764b1a9?q=80&w=1000&auto=format&fit=crop',
    description: 'Sut yo\'nalishidagi juda yuvosh sigir. Kuniga 18-22 litr sut beradi. Ozuqaga talabchan emas, iqlimga moslashgan.',
    category: 'Hayvonlar',
    breed: 'Shvits',
    weight: '480 kg',
    age: '4 yosh',
    isVaccinated: true,
    isHealthy: true,
    likes: 24
  },
  {
    id: 'o1',
    userId: 'system',
    title: 'Toza qonli Axaltaka oti',
    price: '45,000,000 so\'m',
    location: 'Toshkent vil., Qibray',
    image: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?q=80&w=1000&auto=format&fit=crop',
    description: 'Sport va ko\'rgazmalar uchun ideal tanlov. Chiroyli qomati va tezkorligi bilan ajralib turadi. Hujjatlari joyida.',
    category: 'Hayvonlar',
    breed: 'Axaltaka',
    weight: '420 kg',
    age: '4 yosh',
    isVaccinated: true,
    isHealthy: true,
    likes: 156
  },
  {
    id: 'y1',
    userId: 'system',
    title: 'Sifatli beda (Puk)',
    price: '35,000 so\'m',
    location: 'Toshkent, Parkent',
    image: 'https://img.bisyor.uz/web/uploads/items/beda-press-sotiladi-eng-arzon-narx-sifatiga-kafolat-beramiz-234262-3z-1621706526.jpg',
    description: '2024-yilgi birinchi o\'rim. Namligi past, juda toza va sifatli beda. Chorva uchun oqsilga boy.',
    category: 'Yem-xashak',
    weight: '20-22 kg (puk)',
    age: '2024 hosil',
    isVaccinated: false,
    isHealthy: true,
    likes: 88
  },
  {
    id: 'y2',
    userId: 'system',
    title: 'Kombikorm (Sut yo\'nalishi)',
    price: '4,500 so\'m/kg',
    location: 'Samarqand, Jomboy',
    image: 'https://api.cabinet.smart-market.uz/uploads/images/ff808181e66e9070f790998c',
    description: 'Yuqori darajadagi vitaminlar va minerallar bilan boyitilgan maxsus yem. Sutni 20% gacha oshiradi.',
    category: 'Yem-xashak',
    weight: '50 kg (qop)',
    age: 'Yangi mahsulot',
    isVaccinated: false,
    isHealthy: true,
    likes: 34
  },
  {
    id: '2',
    userId: 'system',
    title: 'Hisori zotli qo\'chqor',
    price: '4,200,000 so\'m',
    location: 'Surxondaryo, Boysun',
    image: 'https://images.unsplash.com/photo-1484557985045-edf25e08da73?q=80&w=1000&auto=format&fit=crop',
    description: 'Vazni 85kg. Yosh: 1.5 yosh. Naslchilik uchun juda qulay. Toza zot, barcha hujjatlari joyida.',
    category: 'Hayvonlar',
    breed: 'Hisori',
    weight: '85 kg',
    age: '1.5 yosh',
    isVaccinated: true,
    isHealthy: true,
    likes: 45
  },
  {
    id: 'q1',
    userId: 'system',
    title: 'Edilboy zotli qo\'chqor',
    price: '3,800,000 so\'m',
    location: 'Qashqadaryo, Qarshi',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLOht5WU0NAOFTktpJlDfIQLbgmczP-JNZxg&s',
    description: 'Go\'sht yo\'nalishidagi eng baquvvat zotlardan biri. Tez semiradi va kasalliklarga chidamli.',
    category: 'Hayvonlar',
    breed: 'Edilboy',
    weight: '75 kg',
    age: '1 yosh',
    isVaccinated: true,
    isHealthy: true,
    likes: 32
  },
  {
    id: 'y3',
    userId: 'system',
    title: 'Makkajo\'xori doni',
    price: '3,800 so\'m/kg',
    location: 'Farg\'ona, Quva',
    image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=1000&auto=format&fit=crop',
    description: 'Sariq makkajo\'xori, namligi 14%. Tovuqlar va qoramollar uchun ideal energiya manbai.',
    category: 'Yem-xashak',
    weight: '1 tonnagacha',
    age: '2023 hosil',
    isVaccinated: false,
    isHealthy: true,
    likes: 21
  }
];

export const VETS: Vet[] = [
  {
    id: 'v1',
    name: 'Dr. Azizbek Rahimov',
    specialty: 'Yirik shoxli mollar',
    experience: '12 yil',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200&h=200&auto=format&fit=crop'
  },
  {
    id: 'v2',
    name: 'Dr. Madina Karimova',
    specialty: 'Umumiy terapevt',
    experience: '8 yil',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=200&h=200&auto=format&fit=crop'
  }
];

export const LOGISTICS: LogisticsProvider[] = [
  {
    id: 'l1',
    vehicleType: 'Isuzu NQR 71',
    fromRegion: 'Toshkent',
    toRegion: 'Barcha viloyatlar',
    price: '5,500 so\'m / km',
    phone: '+998 90 123 45 67',
    image: ''
  },
  {
    id: 'l2',
    vehicleType: 'GAZel Next',
    fromRegion: 'Toshkent',
    toRegion: 'Samarqand',
    price: '3,000 so\'m / km',
    phone: '+998 91 222 33 44',
    image: ''
  }
];

export const LESSONS: AcademyLesson[] = [
  {
    id: 'a1',
    title: 'Sigirlarni to\'g\'ri oziqlantirish',
    description: 'Sut mahsuldorligini 30% ga oshirish uchun maxsus ratsion tuzish sirlari.',
    thumbnail: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?q=80&w=600&h=400&auto=format&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/P8vxQGNeweA',
    isPdf: false
  },
  {
    id: 'a2',
    title: 'Qo\'ylarda uchraydigan kasalliklar',
    description: 'Bahorgi emlash tadbirlari va profilaktika choralari haqida batafsil qo\'llanma.',
    thumbnail: 'https://images.unsplash.com/photo-1484557985045-edf25e08da73?q=80&w=600&h=400&auto=format&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/zc3BryDNNAo',
    isPdf: false
  },
  {
    id: 'pdf1',
    title: 'Chorvachilik biznes rejasi',
    description: 'Kichik fermani rivojlantirish uchun tayyor 2024-yilgi biznes reja (PDF).',
    thumbnail: 'https://images.unsplash.com/photo-1454165833222-88005674ab21?q=80&w=600&h=400&auto=format&fit=crop',
    videoUrl: '',
    isPdf: true
  }
];
