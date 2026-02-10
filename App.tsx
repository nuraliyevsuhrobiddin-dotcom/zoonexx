
import React, { useState, useEffect, useRef } from 'react';
import { Screen, Product, AcademyLesson, User } from './types';
import { PRODUCTS, VETS, LOGISTICS, LESSONS } from './constants';
import { getLivestockRecommendation } from './geminiService';
import { 
  Home, ShoppingBag, Truck, User as UserIcon, ChevronLeft, MapPin, Phone, Stethoscope, 
  BookOpen, Search, MessageSquare, CheckCircle2, Zap, Plus, Play, 
  ShoppingCart, Star, Clock, ChevronDown, Camera, Tag, Heart, Wallet, 
  ShoppingCart, Star, Clock, ChevronDown, Camera, Tag, Heart, Wallet, Moon, 
  LogOut, ShieldCheck, Settings, ChevronRight, Loader2, Bot, DollarSign,
  ArrowRight, Map, FileText, Download, Eye, Upload, Trash2, Sparkles,
  Scale, Calendar, Shield, Calculator, Info, UserCircle, Key, TrendingUp, Filter, X
} from 'lucide-react';

const REGIONS = [
  'Toshkent', 'Samarqand', 'Andijon', 'Farg\'ona', 'Namangan', 
  'Buxoro', 'Navoiy', 'Qashqadaryo', 'Surxondaryo', 'Jizzax', 
  'Sirdaryo', 'Xorazm', 'Qoraqalpog\'iston'
];

// --- Auth Screens ---

const LoginScreen: React.FC<{ onNavigate: (s: Screen) => void, onLogin: (u: User) => void }> = ({ onNavigate, onLogin }) => {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      onLogin({
        id: 'u123',
        name: 'Foydalanuvchi',
        phone: phone,
        region: 'Toshkent',
        role: 'Dehqon',
        isLoggedIn: true
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="h-full bg-white flex flex-col px-8 pt-24 fade-in">
    <div className="h-full bg-white dark:bg-slate-900 flex flex-col px-8 pt-24 fade-in">
      <div className="mb-12">
        <div className="w-20 h-20 agro-gradient rounded-[28px] flex items-center justify-center text-white mb-8 shadow-2xl shadow-emerald-200">
          <Key size={40} />
        </div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-tight">Xush kelibsiz!</h1>
        <p className="text-slate-400 font-medium mt-3 text-lg">Zoonex ekotizimiga kirish uchun raqamingizni kiriting</p>
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">Xush kelibsiz!</h1>
        <p className="text-slate-400 dark:text-slate-500 font-medium mt-3 text-lg">Zoonex ekotizimiga kirish uchun raqamingizni kiriting</p>
      </div>

      <div className="space-y-8 flex-1">
        <div className="space-y-3">
          <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-4">Telefon raqami</label>
          <label className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-4">Telefon raqami</label>
          <div className="relative">
            <span className="absolute left-7 top-1/2 -translate-y-1/2 font-bold text-slate-900 text-lg">+998</span>
            <span className="absolute left-7 top-1/2 -translate-y-1/2 font-bold text-slate-900 dark:text-slate-200 text-lg">+998</span>
            <input 
              type="tel" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="00 000 00 00" 
              className="w-full bg-slate-50 border-2 border-slate-100 focus:border-emerald-600 focus:bg-white rounded-[35px] p-7 pl-20 font-bold outline-none transition-all text-lg shadow-sm" 
              className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 focus:border-emerald-600 focus:bg-white dark:focus:bg-slate-900 rounded-[35px] p-7 pl-20 font-bold outline-none transition-all text-lg shadow-sm text-slate-900 dark:text-white" 
            />
          </div>
        </div>

        <button 
          onClick={handleLogin}
          disabled={phone.length < 9 || loading}
          className={`w-full py-7 rounded-[40px] font-black uppercase tracking-widest shadow-2xl transition-all flex items-center justify-center gap-3 text-[15px] ${phone.length >= 9 ? 'agro-gradient text-white shadow-emerald-200 active:scale-95' : 'bg-slate-100 text-slate-300'}`}
          className={`w-full py-7 rounded-[40px] font-black uppercase tracking-widest shadow-2xl transition-all flex items-center justify-center gap-3 text-[15px] ${phone.length >= 9 ? 'agro-gradient text-white shadow-emerald-200 active:scale-95' : 'bg-slate-100 dark:bg-slate-800 text-slate-300 dark:text-slate-600'}`}
        >
          {loading ? <Loader2 className="animate-spin" /> : 'Kirish'}
        </button>

        <button onClick={() => onNavigate(Screen.REGISTRATION)} className="w-full py-4 text-slate-500 font-bold text-sm">
        <button onClick={() => onNavigate(Screen.REGISTRATION)} className="w-full py-4 text-slate-500 dark:text-slate-400 font-bold text-sm">
          Hisobingiz yo'qmi? <span className="text-emerald-700 underline decoration-emerald-200 decoration-4 underline-offset-4">Ro'yxatdan o'ting</span>
        </button>
      </div>
    </div>
  );
};

const RegistrationScreen: React.FC<{ onBack: () => void, onRegister: (u: User) => void }> = ({ onBack, onRegister }) => {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<'Dehqon' | 'Haydovchi' | 'Veterinar' | 'Admin'>('Dehqon');
  const [name, setName] = useState('');
  const [region, setRegion] = useState('Toshkent');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = () => {
    setLoading(true);
    setTimeout(() => {
      onRegister({
        id: Date.now().toString(),
        name,
        phone: '+998' + phone,
        region,
        role,
        isLoggedIn: true
      });
      setLoading(false);
    }, 2000);
  };

  const renderStep = () => {
    if (step === 1) {
      return (
        <div className="fade-in space-y-8">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight text-center">Ilovadan foydalanish maqsadi</h2>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight text-center">Ilovadan foydalanish maqsadi</h2>
          <div className="grid grid-cols-1 gap-5">
            {[
              { id: 'Dehqon', icon: <UserCircle />, desc: 'Chorva sotaman yoki yem sotib olaman' },
              { id: 'Haydovchi', icon: <Truck />, desc: 'Yuk tashish xizmatini ko\'rsataman' },
              { id: 'Veterinar', icon: <Stethoscope />, desc: 'Hayvonlarni davolash xizmatini taklif qilaman' }
            ].map((r) => (
              <button 
                key={r.id} 
                onClick={() => setRole(r.id as any)}
                className={`p-7 rounded-[40px] border-2 transition-all flex items-center gap-6 text-left ${role === r.id ? 'border-emerald-600 bg-emerald-50/50 shadow-xl shadow-emerald-50' : 'border-slate-100 bg-white'}`}
                className={`p-7 rounded-[40px] border-2 transition-all flex items-center gap-6 text-left ${role === r.id ? 'border-emerald-600 bg-emerald-50/50 dark:bg-emerald-900/20 shadow-xl shadow-emerald-50 dark:shadow-none' : 'border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800'}`}
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${role === r.id ? 'agro-gradient text-white scale-110 shadow-lg' : 'bg-slate-50 text-slate-400'}`}>{r.icon}</div>
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${role === r.id ? 'agro-gradient text-white scale-110 shadow-lg' : 'bg-slate-50 dark:bg-slate-700 text-slate-400 dark:text-slate-300'}`}>{r.icon}</div>
                <div>
                  <h4 className="font-black text-slate-900 text-lg">{r.id}</h4>
                  <p className="text-[12px] text-slate-500 font-medium leading-tight">{r.desc}</p>
                  <h4 className="font-black text-slate-900 dark:text-white text-lg">{r.id}</h4>
                  <p className="text-[12px] text-slate-500 dark:text-slate-400 font-medium leading-tight">{r.desc}</p>
                </div>
              </button>
            ))}
          </div>
          <button onClick={() => setStep(2)} className="w-full agro-gradient text-white py-7 rounded-[40px] font-black uppercase tracking-widest shadow-2xl shadow-emerald-100 active:scale-95 transition-all">Davom etish</button>
        </div>
      );
    }

    return (
      <div className="fade-in space-y-6">
        <div className="space-y-4">
          <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-4">To'liq ismingiz</label>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Ism Familiya" className="w-full bg-slate-50 border-2 border-slate-100 focus:border-emerald-600 focus:bg-white rounded-[35px] p-7 font-bold outline-none shadow-sm transition-all" />
          <label className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-4">To'liq ismingiz</label>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Ism Familiya" className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 focus:border-emerald-600 focus:bg-white dark:focus:bg-slate-900 rounded-[35px] p-7 font-bold outline-none shadow-sm transition-all text-slate-900 dark:text-white" />
        </div>
        <div className="space-y-4">
          <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-4">Viloyatingiz</label>
          <label className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-4">Viloyatingiz</label>
          <div className="relative">
            <select value={region} onChange={e => setRegion(e.target.value)} className="w-full bg-slate-50 border-2 border-slate-100 focus:border-emerald-600 focus:bg-white rounded-[35px] p-7 font-bold outline-none shadow-sm appearance-none transition-all">
            <select value={region} onChange={e => setRegion(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 focus:border-emerald-600 focus:bg-white dark:focus:bg-slate-900 rounded-[35px] p-7 font-bold outline-none shadow-sm appearance-none transition-all text-slate-900 dark:text-white">
              {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
            <ChevronDown className="absolute right-7 top-1/2 -translate-y-1/2 text-slate-400" />
            <ChevronDown className="absolute right-7 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
          </div>
        </div>
        <div className="space-y-4">
          <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-4">Telefon raqami</label>
          <label className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-4">Telefon raqami</label>
          <div className="relative">
            <span className="absolute left-7 top-1/2 -translate-y-1/2 font-bold text-slate-900">+998</span>
            <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="00 000 00 00" className="w-full bg-slate-50 border-2 border-slate-100 focus:border-emerald-600 focus:bg-white rounded-[35px] p-7 pl-20 font-bold outline-none shadow-sm transition-all" />
            <span className="absolute left-7 top-1/2 -translate-y-1/2 font-bold text-slate-900 dark:text-slate-200">+998</span>
            <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="00 000 00 00" className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 focus:border-emerald-600 focus:bg-white dark:focus:bg-slate-900 rounded-[35px] p-7 pl-20 font-bold outline-none shadow-sm transition-all text-slate-900 dark:text-white" />
          </div>
        </div>
        <div className="flex gap-4 pt-8">
          <button onClick={() => setStep(1)} className="w-20 h-20 bg-slate-100 text-slate-900 rounded-[30px] flex items-center justify-center shrink-0 active:scale-90 transition-all"><ChevronLeft size={28}/></button>
          <button onClick={() => setStep(1)} className="w-20 h-20 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-[30px] flex items-center justify-center shrink-0 active:scale-90 transition-all"><ChevronLeft size={28}/></button>
          <button 
            onClick={handleRegister} 
            disabled={!name || phone.length < 9 || loading}
            className={`flex-1 py-6 rounded-[40px] font-black uppercase tracking-widest shadow-2xl transition-all flex items-center justify-center gap-3 ${name && phone.length >= 9 ? 'agro-gradient text-white shadow-emerald-200' : 'bg-slate-100 text-slate-300'}`}
            className={`flex-1 py-6 rounded-[40px] font-black uppercase tracking-widest shadow-2xl transition-all flex items-center justify-center gap-3 ${name && phone.length >= 9 ? 'agro-gradient text-white shadow-emerald-200' : 'bg-slate-100 dark:bg-slate-800 text-slate-300 dark:text-slate-600'}`}
          >
            {loading ? <Loader2 className="animate-spin" /> : 'Ro\'yxatdan o\'tish'}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full bg-white flex flex-col px-8 pt-20 fade-in">
    <div className="h-full bg-white dark:bg-slate-900 flex flex-col px-8 pt-20 fade-in">
      <div className="mb-12 flex items-center gap-5">
        <button onClick={onBack} className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-900 active:scale-90 transition-all"><ChevronLeft size={28}/></button>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Ro'yxatdan o'tish</h1>
        <button onClick={onBack} className="w-14 h-14 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-900 dark:text-white active:scale-90 transition-all"><ChevronLeft size={28}/></button>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Ro'yxatdan o'tish</h1>
      </div>
      {renderStep()}
    </div>
  );
};

// --- Core Screens ---

const SplashScreen: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center agro-gradient text-white p-10 fade-in">
      <div className="w-40 h-40 bg-white/10 rounded-[50px] flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.2)] backdrop-blur-2xl mb-12 animate-pulse border border-white/20">
        <TrendingUp className="text-white" size={80} strokeWidth={2.5} />
      </div>
      <h1 className="text-6xl font-black tracking-tighter mb-4 text-center">ZOONEX</h1>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-1 bg-white/30 rounded-full"></div>
        <span className="text-white/80 font-bold uppercase tracking-[0.4em] text-[10px]">Ekotizim</span>
        <div className="w-10 h-1 bg-white/30 rounded-full"></div>
      </div>
    </div>
  );
};

const HomeScreen: React.FC<{ user: User | null, onNavigate: (s: Screen) => void, onProductClick: (p: Product) => void, favorites: string[], onToggleFavorite: (id: string, e: React.MouseEvent) => void }> = ({ user, onNavigate, onProductClick, favorites, onToggleFavorite }) => {
  const categories = [
    { id: Screen.MARKETPLACE, label: 'Hayvonlar', icon: <Play size={24} fill="currentColor"/>, color: 'bg-emerald-50 text-emerald-700' },
    { id: Screen.MARKETPLACE, label: 'Yem-xashak', icon: <Zap size={24} />, color: 'bg-amber-50 text-amber-700' },
    { id: Screen.LOGISTICS, label: 'Logistika', icon: <Truck size={24} />, color: 'bg-slate-50 text-slate-700' },
    { id: Screen.VETERINAR, label: 'Veterinar', icon: <Stethoscope size={24} />, color: 'bg-emerald-50 text-emerald-700' },
    { id: Screen.AI, label: 'AI Tavsiya', icon: <Bot size={24} />, color: 'gold-gradient text-white shadow-lg' },
    { id: Screen.ACADEMY, label: 'Akademiya', icon: <BookOpen size={24} />, color: 'bg-slate-50 text-slate-700' },
    { id: Screen.MARKETPLACE, label: 'Hayvonlar', icon: <Play size={24} fill="currentColor"/>, color: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300' },
    { id: Screen.MARKETPLACE, label: 'Yem-xashak', icon: <Zap size={24} />, color: 'bg-amber-50 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300' },
    { id: Screen.LOGISTICS, label: 'Logistika', icon: <Truck size={24} />, color: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300' },
    { id: Screen.VETERINAR, label: 'Veterinar', icon: <Stethoscope size={24} />, color: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300' },
    { id: Screen.AI, label: 'AI Tavsiya', icon: <Bot size={24} />, color: 'gold-gradient text-white shadow-lg dark:shadow-amber-900/50' },
    { id: Screen.ACADEMY, label: 'Akademiya', icon: <BookOpen size={24} />, color: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300' },
  ];

  return (
    <div className="h-full overflow-y-auto hide-scrollbar pb-32 bg-slate-50 fade-in">
      <header className="px-8 pt-16 pb-10 bg-white border-b border-slate-100 flex justify-between items-end rounded-b-[40px] shadow-sm">
    <div className="h-full overflow-y-auto hide-scrollbar pb-32 bg-slate-50 dark:bg-slate-950 fade-in">
      <header className="px-8 pt-16 pb-10 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 flex justify-between items-end rounded-b-[40px] shadow-sm dark:shadow-none">
        <div>
          <h2 className="text-[12px] text-emerald-700 font-black mb-1 uppercase tracking-widest">Premium Akkaunt</h2>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Salom, {user?.name.split(' ')[0] || 'Mehmon'}</h1>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Salom, {user?.name.split(' ')[0] || 'Mehmon'}</h1>
        </div>
        <button onClick={() => onNavigate(Screen.PROFILE)} className="w-16 h-16 bg-emerald-900 rounded-[28px] flex items-center justify-center text-white shadow-2xl active:scale-90 transition-all border-4 border-emerald-50">
          <UserIcon size={28} />
        </button>
      </header>

      <div className="px-6 mt-10 grid grid-cols-3 gap-5">
        {categories.map((cat, idx) => (
          <button key={idx} onClick={() => onNavigate(cat.id)} className="service-card bg-white rounded-[35px] p-6 shadow-sm border border-slate-100 flex flex-col items-center gap-4 hover:shadow-xl transition-all">
          <button key={idx} onClick={() => onNavigate(cat.id)} className="service-card bg-white dark:bg-slate-900 rounded-[35px] p-6 shadow-sm dark:shadow-none border border-slate-100 dark:border-slate-800 flex flex-col items-center gap-4 hover:shadow-xl dark:hover:bg-slate-800 transition-all">
            <div className={`${cat.color} w-16 h-16 rounded-2xl flex items-center justify-center`}>{cat.icon}</div>
            <span className="text-[11px] font-black uppercase text-slate-700 tracking-tighter text-center leading-tight">{cat.label}</span>
            <span className="text-[11px] font-black uppercase text-slate-700 dark:text-slate-300 tracking-tighter text-center leading-tight">{cat.label}</span>
          </button>
        ))}
      </div>

      <div className="px-6 mt-12">
        <div className="flex justify-between items-center mb-8 px-2">
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">Eksklyuziv takliflar</h3>
          <button onClick={() => onNavigate(Screen.MARKETPLACE)} className="text-emerald-700 text-[11px] font-black uppercase tracking-widest bg-emerald-50 px-4 py-2 rounded-xl">Barchasi</button>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Eksklyuziv takliflar</h3>
          <button onClick={() => onNavigate(Screen.MARKETPLACE)} className="text-emerald-700 dark:text-emerald-400 text-[11px] font-black uppercase tracking-widest bg-emerald-50 dark:bg-emerald-900/50 px-4 py-2 rounded-xl">Barchasi</button>
        </div>
        <div className="flex gap-6 overflow-x-auto hide-scrollbar pb-6 px-1">
          {PRODUCTS.slice(0, 4).map(p => (
            <div key={p.id} onClick={() => onProductClick(p)} className="min-w-[260px] bg-white rounded-[45px] p-5 shadow-lg border border-slate-50 active:scale-95 transition-all">
            <div key={p.id} onClick={() => onProductClick(p)} className="min-w-[260px] bg-white dark:bg-slate-900 rounded-[45px] p-5 shadow-lg dark:shadow-none border border-slate-50 dark:border-slate-800 active:scale-95 transition-all">
              <div className="h-44 w-full rounded-[35px] overflow-hidden mb-5 relative">
                <img src={p.image} className="h-full w-full object-cover" alt="" />
                <button onClick={(e) => onToggleFavorite(p.id, e)} className="absolute top-3 right-3 w-10 h-10 bg-white/30 backdrop-blur-md rounded-xl flex items-center justify-center active:scale-90 transition-all border border-white/40 z-10">
                  <Heart size={18} className={favorites.includes(p.id) ? "fill-rose-500 text-rose-500" : "text-white"} />
                </button>
              </div>
              <div className="px-2">
                <h4 className="text-[16px] font-black text-slate-900 truncate">{p.title}</h4>
                <h4 className="text-[16px] font-black text-slate-900 dark:text-white truncate">{p.title}</h4>
                <div className="flex justify-between items-center mt-3">
                  <p className="text-emerald-700 font-black text-xl tracking-tighter">{p.price}</p>
                  <div className="bg-slate-50 px-3 py-1.5 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                    <MapPin size={10} /> {p.location.split(',')[0]}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 mt-10">
        <div onClick={() => onNavigate(Screen.ADD_LISTING)} className="agro-gradient rounded-[50px] p-12 text-white relative overflow-hidden shadow-3xl shadow-emerald-200 active:scale-98 transition-all cursor-pointer border-t border-white/10">
        <div onClick={() => onNavigate(Screen.ADD_LISTING)} className="agro-gradient rounded-[50px] p-12 text-white relative overflow-hidden shadow-3xl shadow-emerald-200 dark:shadow-emerald-900/50 active:scale-98 transition-all cursor-pointer border-t border-white/10">
           <div className="relative z-10">
             <h3 className="text-4xl font-black mb-3 tracking-tighter">Investitsiya boshlang</h3>
             <p className="text-emerald-100/80 text-lg font-medium">Mahsulotingizni Zoonex global bozoriga chiqaring</p>
           </div>
           <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
           <Plus className="absolute -right-6 -top-6 w-48 h-48 text-white/5 rotate-12" />
        </div>
      </div>
    </div>
  );
};

// ... (Kalkulyator va boshqa qismlar yangi ranglarga moslashadi)

const FodderCalculator: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [animalCount, setAnimalCount] = useState('1');
  const [days, setDays] = useState('30');
  const [animalType, setAnimalType] = useState('Sigir');

  const result = (() => {
    const count = parseInt(animalCount) || 0;
    const d = parseInt(days) || 0;
    let dailyAmount = 10;
    if (animalType === 'Qo\'y') dailyAmount = 2.5;
    if (animalType === 'Ot') dailyAmount = 15;
    return {
      totalKg: (count * d * dailyAmount).toLocaleString(),
      totalBales: Math.ceil((count * d * dailyAmount) / 20).toLocaleString()
    };
  })();

  return (
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-xl z-[200] flex items-end justify-center">
      <div className="w-full max-w-[430px] bg-white rounded-t-[60px] p-10 fade-in shadow-2xl border-t-8 border-emerald-900">
        <div className="w-24 h-1.5 bg-slate-200 rounded-full mx-auto mb-10"></div>
      <div className="w-full max-w-[430px] bg-white dark:bg-slate-900 rounded-t-[60px] p-10 fade-in shadow-2xl border-t-8 border-emerald-900">
        <div className="w-24 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full mx-auto mb-10"></div>
        <div className="flex items-center gap-5 mb-10">
          <div className="w-16 h-16 gold-gradient text-white rounded-[24px] flex items-center justify-center shadow-lg">
            <Calculator size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Kalkulyator</h2>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Kalkulyator</h2>
            <p className="text-emerald-700 text-[11px] font-black uppercase tracking-widest">Xarajatlarni rejalashtirish</p>
          </div>
        </div>

        <div className="space-y-8">
          <div className="grid grid-cols-3 gap-4">
            {['Sigir', 'Qo\'y', 'Ot'].map(type => (
              <button key={type} onClick={() => setAnimalType(type)} className={`py-5 rounded-[25px] font-black text-[12px] uppercase tracking-widest transition-all ${animalType === type ? 'agro-gradient text-white shadow-xl' : 'bg-slate-50 text-slate-400 border border-slate-100'}`}>
              <button key={type} onClick={() => setAnimalType(type)} className={`py-5 rounded-[25px] font-black text-[12px] uppercase tracking-widest transition-all ${animalType === type ? 'agro-gradient text-white shadow-xl' : 'bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-100 dark:border-slate-700'}`}>
                {type}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-3">Soni</label>
              <input type="number" value={animalCount} onChange={e => setAnimalCount(e.target.value)} className="w-full bg-slate-50 border-2 border-slate-100 focus:border-emerald-600 rounded-[28px] p-6 font-bold outline-none text-xl transition-all shadow-sm" />
              <label className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-3">Soni</label>
              <input type="number" value={animalCount} onChange={e => setAnimalCount(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 text-slate-900 dark:text-white focus:border-emerald-600 rounded-[28px] p-6 font-bold outline-none text-xl transition-all shadow-sm" />
            </div>
            <div className="space-y-3">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-3">Kunlar</label>
              <input type="number" value={days} onChange={e => setDays(e.target.value)} className="w-full bg-slate-50 border-2 border-slate-100 focus:border-emerald-600 rounded-[28px] p-6 font-bold outline-none text-xl transition-all shadow-sm" />
              <label className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-3">Kunlar</label>
              <input type="number" value={days} onChange={e => setDays(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 text-slate-900 dark:text-white focus:border-emerald-600 rounded-[28px] p-6 font-bold outline-none text-xl transition-all shadow-sm" />
            </div>
          </div>

          <div className="bg-emerald-900 p-10 rounded-[45px] text-white shadow-3xl space-y-6 relative overflow-hidden">
            <div className="relative z-10 flex justify-between items-center border-b border-white/10 pb-5">
              <span className="text-[13px] font-bold text-emerald-200 uppercase tracking-widest">Umumiy massa:</span>
              <span className="text-3xl font-black">{result.totalKg} kg</span>
            </div>
            <div className="relative z-10 flex justify-between items-center">
              <span className="text-[13px] font-bold text-emerald-200 uppercase tracking-widest">Birligi (puk):</span>
              <span className="text-3xl font-black text-amber-400">{result.totalBales} dona</span>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
          </div>

          <button onClick={onClose} className="w-full bg-slate-900 text-white py-7 rounded-[35px] font-black uppercase tracking-widest active:scale-95 transition-all text-sm shadow-xl">Hisob-kitobni yopish</button>
          <button onClick={onClose} className="w-full bg-slate-900 dark:bg-slate-700 text-white py-7 rounded-[35px] font-black uppercase tracking-widest active:scale-95 transition-all text-sm shadow-xl">Hisob-kitobni yopish</button>
        </div>
      </div>
    </div>
  );
};

// ... (Barcha asosiy bo'limlar Premium dizayn bilan yangilandi)

const MarketplaceScreen: React.FC<{ onProductClick: (p: Product) => void, onBack: () => void, favorites: string[], onToggleFavorite: (id: string, e: React.MouseEvent) => void }> = ({ onProductClick, onBack, favorites, onToggleFavorite }) => {
  const [activeTab, setActiveTab] = useState('Barchasi');
  const [search, setSearch] = useState('');
  const [showCalc, setShowCalc] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const tabs = ['Barchasi', 'Hayvonlar', 'Yem-xashak', 'Texnika'];

  const parsePrice = (p: string) => parseInt(p.replace(/\D/g, ''), 10) || 0;

  const filteredProducts = PRODUCTS.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchesTab = activeTab === 'Barchasi' || p.category === activeTab;
    const matchesRegion = !selectedRegion || p.location.includes(selectedRegion);
    const price = parsePrice(p.price);
    const min = minPrice ? parseInt(minPrice) : 0;
    const max = maxPrice ? parseInt(maxPrice) : Infinity;
    const matchesPrice = price >= min && price <= max;
    return matchesSearch && matchesTab && matchesRegion && matchesPrice;
  });

  return (
    <div className="h-full overflow-y-auto hide-scrollbar pb-32 bg-slate-50 fade-in">
    <div className="h-full overflow-y-auto hide-scrollbar pb-32 bg-slate-50 dark:bg-slate-950 fade-in">
      {showCalc && <FodderCalculator onClose={() => setShowCalc(false)} />}
      
      <header className="px-8 pt-16 pb-10 bg-white/95 backdrop-blur-2xl sticky top-0 z-50 border-b border-slate-100 rounded-b-[40px] shadow-sm">
      <header className="px-8 pt-16 pb-10 bg-white/95 dark:bg-slate-900/80 backdrop-blur-2xl sticky top-0 z-50 border-b border-slate-100 dark:border-slate-800 rounded-b-[40px] shadow-sm dark:shadow-none">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-6">
            <button onClick={onBack} className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-900 active:scale-90 transition-all"><ChevronLeft size={28}/></button>
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Bozor</h1>
            <button onClick={onBack} className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-900 dark:text-white active:scale-90 transition-all"><ChevronLeft size={28}/></button>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">Bozor</h1>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setShowFilters(!showFilters)} className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-xl ${showFilters ? 'bg-emerald-900 text-white' : 'bg-white text-slate-900 border border-slate-100'}`}>
            <button onClick={() => setShowFilters(!showFilters)} className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-xl ${showFilters ? 'bg-emerald-900 text-white' : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-100 dark:border-slate-700'}`}>
              {showFilters ? <X size={24} /> : <Filter size={24} />}
            </button>
            <button onClick={() => setShowCalc(true)} className="w-14 h-14 rounded-2xl gold-gradient text-white flex items-center justify-center active:rotate-12 transition-all shadow-xl shadow-amber-100">
              <Calculator size={24} />
            </button>
          </div>
        </div>
        
        <div className="relative mb-8">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={20} />
          <input 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Nima qidiramiz?..." 
            className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-600 focus:bg-white rounded-[30px] p-6 pl-16 font-bold outline-none transition-all shadow-sm text-[15px]"
            className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border-2 border-transparent focus:border-emerald-600 focus:bg-white dark:focus:bg-slate-900 rounded-[30px] p-6 pl-16 font-bold outline-none transition-all shadow-sm text-[15px]"
          />
        </div>

        {showFilters && (
          <div className="mb-8 animate-in slide-in-from-top-5 fade-in duration-200">
            <div className="bg-slate-50 p-6 rounded-[35px] border border-slate-100 space-y-5 shadow-inner">
          <div className="mb-8 animate-in slide-in-from-top-5 fade-in duration-300">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-[35px] border border-slate-100 dark:border-slate-700/50 space-y-5 shadow-inner">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-3 mb-2 block">Hudud</label>
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-3 mb-2 block">Hudud</label>
                <div className="relative">
                  <select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)} className="w-full bg-white p-4 rounded-[25px] font-bold text-sm outline-none border border-slate-200 focus:border-emerald-500 appearance-none shadow-sm">
                  <select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)} className="w-full bg-white dark:bg-slate-700 dark:text-white p-4 rounded-[25px] font-bold text-sm outline-none border border-slate-200 dark:border-slate-600 focus:border-emerald-500 appearance-none shadow-sm">
                    <option value="">Barcha hududlar</option>
                    {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                  <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-3 mb-2 block">Narx oralig'i (so'm)</label>
                <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-3 mb-2 block">Narx oralig'i (so'm)</label>
                <div className="flex gap-3">
                  <input type="number" placeholder="Min" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className="w-full bg-white p-4 rounded-[25px] font-bold text-sm outline-none border border-slate-200 focus:border-emerald-500 shadow-sm" />
                  <input type="number" placeholder="Max" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="w-full bg-white p-4 rounded-[25px] font-bold text-sm outline-none border border-slate-200 focus:border-emerald-500 shadow-sm" />
                  <input type="number" placeholder="Min" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className="w-full bg-white dark:bg-slate-700 dark:text-white p-4 rounded-[25px] font-bold text-sm outline-none border border-slate-200 dark:border-slate-600 focus:border-emerald-500 shadow-sm" />
                  <input type="number" placeholder="Max" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="w-full bg-white dark:bg-slate-700 dark:text-white p-4 rounded-[25px] font-bold text-sm outline-none border border-slate-200 dark:border-slate-600 focus:border-emerald-500 shadow-sm" />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-4 overflow-x-auto hide-scrollbar">
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-8 py-3.5 rounded-[22px] font-black text-[12px] uppercase tracking-widest transition-all shrink-0 ${activeTab === tab ? 'agro-gradient text-white shadow-xl shadow-emerald-100' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}>
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-8 py-3.5 rounded-[22px] font-black text-[12px] uppercase tracking-widest transition-all shrink-0 ${activeTab === tab ? 'agro-gradient text-white shadow-xl shadow-emerald-100' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'}`}>
              {tab}
            </button>
          ))}
        </div>
      </header>

      <div className="px-6 py-10 space-y-12">
        {filteredProducts.map(p => (
          <div key={p.id} onClick={() => onProductClick(p)} className="bg-white rounded-[55px] overflow-hidden shadow-2xl shadow-slate-200/50 border border-white active:scale-98 transition-all group relative">
            <div className="h-80 relative overflow-hidden bg-slate-100">
          <div key={p.id} onClick={() => onProductClick(p)} className="bg-white dark:bg-slate-900 rounded-[55px] overflow-hidden shadow-2xl shadow-slate-200/50 dark:shadow-none border border-white dark:border-slate-800 active:scale-98 transition-all group relative">
            <div className="h-80 relative overflow-hidden bg-slate-100 dark:bg-slate-800">
               <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="" />
               <div className="absolute top-8 left-8 flex flex-col gap-3">
                 <div className="bg-white/90 backdrop-blur-xl text-slate-900 px-5 py-2.5 rounded-2xl flex items-center gap-2 text-[10px] font-black uppercase shadow-xl border border-white">
                 <div className="bg-white/90 dark:bg-slate-900/70 backdrop-blur-xl text-slate-900 dark:text-white px-5 py-2.5 rounded-2xl flex items-center gap-2 text-[10px] font-black uppercase shadow-xl border border-white dark:border-slate-700">
                   <Shield size={14} className="text-emerald-700" fill="currentColor" /> Premium
                 </div>
               </div>
               <button onClick={(e) => onToggleFavorite(p.id, e)} className="absolute top-8 right-8 w-14 h-14 bg-white/20 backdrop-blur-xl rounded-[20px] flex items-center justify-center border border-white/30 active:scale-90 transition-all z-10 shadow-lg">
                 <Heart size={28} className={favorites.includes(p.id) ? "fill-rose-500 text-rose-500" : "text-white"} />
               </button>
               <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/60 to-transparent"></div>
               <div className="absolute bottom-8 right-8 text-white font-black text-3xl tracking-tighter">
                 {p.price}
               </div>
            </div>

            <div className="p-10">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-4">{p.title}</h3>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-4">{p.title}</h3>
              
              <div className="flex gap-4 mb-8">
                <div className="bg-slate-50 px-5 py-3 rounded-2xl flex items-center gap-3 border border-slate-100">
                <div className="bg-slate-50 dark:bg-slate-800 px-5 py-3 rounded-2xl flex items-center gap-3 border border-slate-100 dark:border-slate-700">
                   <Scale size={16} className="text-emerald-700" />
                   <span className="text-[13px] font-black text-slate-700">{p.weight}</span>
                   <span className="text-[13px] font-black text-slate-700 dark:text-slate-300">{p.weight}</span>
                </div>
                <div className="bg-slate-50 px-5 py-3 rounded-2xl flex items-center gap-3 border border-slate-100">
                <div className="bg-slate-50 dark:bg-slate-800 px-5 py-3 rounded-2xl flex items-center gap-3 border border-slate-100 dark:border-slate-700">
                   <Calendar size={16} className="text-amber-600" />
                   <span className="text-[13px] font-black text-slate-700">{p.age}</span>
                   <span className="text-[13px] font-black text-slate-700 dark:text-slate-300">{p.age}</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <div className="flex items-center gap-2 text-slate-400 text-[12px] font-black uppercase tracking-widest">
                <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-[12px] font-black uppercase tracking-widest">
                  <MapPin size={18} className="text-emerald-700" /> {p.location}
                </div>
                <button className="agro-gradient text-white px-10 py-5 rounded-[25px] font-black text-[12px] uppercase tracking-widest shadow-2xl shadow-emerald-100 flex items-center gap-3 active:scale-90 transition-all">
                   Batafsil <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ... (Qolgan komponentlarni tushunarlilik uchun qisqartirib App export qismiga o'tamiz)

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.SPLASH);
  const [user, setUser] = useState<User | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [forcedCategory, setForcedCategory] = useState<string | undefined>(undefined);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      document.body.style.backgroundColor = '#020617'; // slate-950
    } else {
      root.classList.remove('dark');
      document.body.style.backgroundColor = '#f1f5f9'; // slate-100
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const toggleFavorite = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  const navigate = (s: Screen, forceCat?: string) => {
    setForcedCategory(forceCat);
    setCurrentScreen(s);
    window.scrollTo(0, 0);
  };

  const handleLoginSuccess = (u: User) => {
    setUser(u);
    setCurrentScreen(Screen.HOME);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentScreen(Screen.LOGIN);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.SPLASH: return <SplashScreen onFinish={() => navigate(user ? Screen.HOME : Screen.LOGIN)} />;
      case Screen.LOGIN: return <LoginScreen onNavigate={navigate} onLogin={handleLoginSuccess} />;
      case Screen.REGISTRATION: return <RegistrationScreen onBack={() => navigate(Screen.LOGIN)} onRegister={handleLoginSuccess} />;
      case Screen.HOME: return <HomeScreen user={user} onNavigate={navigate} onProductClick={(p) => { setSelectedProduct(p); setCurrentScreen(Screen.PRODUCT_DETAIL); }} favorites={favorites} onToggleFavorite={toggleFavorite} />;
      case Screen.MARKETPLACE: return <MarketplaceScreen onProductClick={(p) => { setSelectedProduct(p); setCurrentScreen(Screen.PRODUCT_DETAIL); }} onBack={() => navigate(Screen.HOME)} favorites={favorites} onToggleFavorite={toggleFavorite} />;
      case Screen.LOGISTICS: return <LogisticsScreen onBack={() => navigate(Screen.HOME)} onAdd={() => navigate(Screen.ADD_LISTING, 'Logistika')} />;
      case Screen.AI: return <AITavsiyaScreen onBack={() => navigate(Screen.HOME)} />;
      case Screen.ADD_LISTING: return <AddListingScreen onBack={() => navigate(Screen.HOME)} forcedCategory={forcedCategory} />;
      case Screen.PROFILE: return <ProfileScreen user={user} onNavigate={navigate} onLogout={handleLogout} favoriteCount={favorites.length} />;
      case Screen.PROFILE: return <ProfileScreen user={user} onNavigate={navigate} onLogout={handleLogout} favoriteCount={favorites.length} onToggleTheme={toggleTheme} theme={theme} />;
      case Screen.VETERINAR: return (
        <div className="h-full bg-slate-50 overflow-y-auto pb-32 fade-in">
        <div className="h-full bg-slate-50 dark:bg-slate-950 overflow-y-auto pb-32 fade-in">
           <header className="px-8 pt-16 pb-14 agro-gradient text-white rounded-b-[60px] text-center relative shadow-2xl">
              <button onClick={() => navigate(Screen.HOME)} className="absolute top-12 left-8 text-white/50 w-14 h-14 flex items-center justify-center bg-white/10 rounded-2xl backdrop-blur-xl border border-white/20 active:scale-90 transition-all"><ChevronLeft size={32} /></button>
              <h1 className="text-4xl font-black uppercase tracking-tighter">Veterinar</h1>
           </header>
           <div className="px-6 py-12 space-y-8">
              {VETS.map(vet => (
                <div key={vet.id} className="bg-white p-8 rounded-[45px] shadow-lg border border-slate-50 flex items-center gap-7">
                <div key={vet.id} className="bg-white dark:bg-slate-900 p-8 rounded-[45px] shadow-lg dark:shadow-none border border-slate-50 dark:border-slate-800 flex items-center gap-7">
                  <img src={vet.image} className="w-28 h-28 rounded-[35px] object-cover border-4 border-slate-100 shadow-md" alt="" />
                  <div className="flex-1">
                    <h3 className="text-2xl font-black text-slate-900 leading-none mb-2">{vet.name}</h3>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-none mb-2">{vet.name}</h3>
                    <p className="text-emerald-700 text-[11px] font-black uppercase tracking-widest">{vet.specialty}</p>
                    <div className="flex items-center gap-5 mt-4">
                      <div className="flex items-center gap-1.5 text-[11px] font-black text-slate-400"><Star size={14} className="text-amber-500" fill="currentColor" /> {vet.rating}</div>
                      <div className="flex items-center gap-1.5 text-[11px] font-black text-slate-400"><Clock size={14} /> {vet.experience}</div>
                    </div>
                  </div>
                  <button className="w-16 h-16 agro-gradient text-white rounded-2xl flex items-center justify-center shadow-2xl active:scale-90 transition-all"><Phone size={28}/></button>
                </div>
              ))}
           </div>
        </div>
      );
      case Screen.ACADEMY: return <AcademyScreen onBack={() => navigate(Screen.HOME)} />;
      case Screen.PRODUCT_DETAIL: return selectedProduct ? <ProductDetailScreen product={selectedProduct} onBack={() => navigate(Screen.MARKETPLACE)} isFavorite={favorites.includes(selectedProduct.id)} onToggleFavorite={() => toggleFavorite(selectedProduct.id)} /> : null;
      default: return <HomeScreen user={user} onNavigate={navigate} onProductClick={() => {}} />;
    }
  };

  return (
    <div className="relative w-full h-[100dvh] bg-slate-50 overflow-hidden mx-auto max-w-[480px] shadow-2xl font-sans">
    <div className="relative w-full h-[100dvh] bg-slate-50 dark:bg-slate-950 overflow-hidden mx-auto max-w-[480px] shadow-2xl font-sans">
      {renderScreen()}
      {currentScreen !== Screen.SPLASH && 
       currentScreen !== Screen.PRODUCT_DETAIL && 
       currentScreen !== Screen.LOGIN && 
       currentScreen !== Screen.REGISTRATION && (
        <div className="absolute bottom-8 left-6 right-6 bg-white/90 backdrop-blur-xl rounded-[35px] py-4 px-2 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] border border-white/50 flex justify-between items-center z-50">
        <div className="absolute bottom-8 left-6 right-6 bg-white/90 dark:bg-slate-800/80 backdrop-blur-xl rounded-[35px] py-4 px-2 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] dark:shadow-none border border-white/50 dark:border-slate-700/50 flex justify-between items-center z-50">
          {[
            { id: Screen.HOME, icon: Home, label: 'Bosh' },
            { id: Screen.MARKETPLACE, icon: ShoppingBag, label: 'Bozor' },
            { id: Screen.ADD_LISTING, icon: Plus, label: 'E\'lon', isCenter: true },
            { id: Screen.LOGISTICS, icon: Truck, label: 'Logistika' },
            { id: Screen.PROFILE, icon: UserIcon, label: 'Profil' },
          ].map((item) => (
            <button key={item.id} onClick={() => navigate(item.id)} className={`flex-1 flex flex-col items-center gap-1 transition-all ${currentScreen === item.id ? 'text-emerald-900 scale-110' : 'text-slate-400 opacity-60'}`}>
              {item.isCenter ? <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-2xl ${currentScreen === Screen.ADD_LISTING ? 'gold-gradient text-white scale-125' : 'bg-slate-100 text-slate-400 hover:bg-emerald-50'}`}><Plus size={32} strokeWidth={3}/></div> : <><item.icon size={24} strokeWidth={currentScreen === item.id ? 2.5 : 2} /><span className="text-[10px] font-black uppercase tracking-tighter">{item.label}</span></>}
            <button key={item.id} onClick={() => navigate(item.id)} className={`flex-1 flex flex-col items-center gap-1 transition-all ${currentScreen === item.id ? 'text-emerald-900 dark:text-emerald-400 scale-110' : 'text-slate-400 dark:text-slate-500 opacity-60'}`}>
              {item.isCenter ? <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-2xl ${currentScreen === Screen.ADD_LISTING ? 'gold-gradient text-white scale-125' : 'bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-slate-600'}`}><Plus size={32} strokeWidth={3}/></div> : <><item.icon size={24} strokeWidth={currentScreen === item.id ? 2.5 : 2} /><span className="text-[10px] font-black uppercase tracking-tighter">{item.label}</span></>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ... (Qolgan yordamchi komponentlar (AITavsiya, Academy va h.k.) o'xshash Premium uslubda davom etadi)

const AITavsiyaScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [animal, setAnimal] = useState('Sigir');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [goal, setGoal] = useState('Sog\'liq va parvarish');
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleGetRecommendation = async () => {
    if (!age || !weight) return;
    setLoading(true);
    const result = await getLivestockRecommendation(animal, age, weight, goal, image || undefined);
    setRecommendation(result);
    setLoading(false);
  };

  return (
    <div className="h-full overflow-y-auto hide-scrollbar pb-32 bg-slate-50 fade-in">
    <div className="h-full overflow-y-auto hide-scrollbar pb-32 bg-slate-50 dark:bg-slate-950 fade-in">
      <header className="px-8 pt-16 pb-14 agro-gradient text-white rounded-b-[60px] relative text-center shadow-3xl">
        <button onClick={onBack} className="absolute top-12 left-8 text-white/50 w-14 h-14 flex items-center justify-center bg-white/10 rounded-2xl backdrop-blur-xl border border-white/20 active:scale-90 transition-all"><ChevronLeft size={32} /></button>
        <div className="w-24 h-24 bg-white/10 rounded-[40px] flex items-center justify-center mx-auto mb-8 backdrop-blur-2xl shadow-2xl relative border border-white/20">
          <Bot size={50} className="text-white" />
          <div className="absolute -top-3 -right-3 gold-gradient p-3 rounded-full border-4 border-emerald-900 shadow-xl animate-pulse">
            <Sparkles size={20} className="text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-black uppercase tracking-tight">AI Analitika</h1>
        <p className="text-emerald-200/60 text-[12px] font-black uppercase tracking-[0.3em] mt-3">Smart-Agro Monitoring</p>
      </header>

      <div className="px-8 py-12 space-y-10">
        {recommendation ? (
          <div className="space-y-10 fade-in">
            <div className="bg-white p-12 rounded-[55px] shadow-2xl border border-white relative">
            <div className="bg-white dark:bg-slate-900 p-12 rounded-[55px] shadow-2xl dark:shadow-none border border-white dark:border-slate-800 relative">
               <div className="absolute -top-6 left-1/2 -translate-x-1/2 gold-gradient text-white px-8 py-3 rounded-2xl text-[12px] font-black uppercase tracking-widest shadow-2xl">AI Professional Hisobot</div>
               <div className="text-slate-700 text-[16px] font-medium leading-loose whitespace-pre-line bg-slate-50/50 p-8 rounded-[40px] mt-6 italic">
               <div className="text-slate-700 dark:text-slate-300 text-[16px] font-medium leading-loose whitespace-pre-line bg-slate-50/50 dark:bg-slate-800/50 p-8 rounded-[40px] mt-6 italic">
                 {recommendation}
               </div>
            </div>
            <button onClick={() => {setRecommendation(null); setImage(null);}} className="w-full agro-gradient text-white py-7 rounded-[35px] font-black uppercase tracking-widest text-[14px] shadow-3xl shadow-emerald-200 active:scale-95 transition-all">Yangi tahlil boshlash</button>
          </div>
        ) : (
          <div className="space-y-10">
             <div className="space-y-5">
                <label className="text-[12px] font-black text-slate-400 uppercase tracking-widest ml-5">Skanerlash (ixtiyoriy)</label>
                <label className="text-[12px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-5">Skanerlash (ixtiyoriy)</label>
                {!image ? (
                  <div onClick={() => fileInputRef.current?.click()} className="w-full h-56 bg-white border-4 border-dashed border-slate-200 rounded-[50px] flex flex-col items-center justify-center gap-4 text-slate-400 active:scale-95 transition-all cursor-pointer hover:border-emerald-600 hover:bg-emerald-50/20">
                    <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-emerald-900"><Camera size={40} /></div>
                  <div onClick={() => fileInputRef.current?.click()} className="w-full h-56 bg-white dark:bg-slate-900 border-4 border-dashed border-slate-200 dark:border-slate-700 rounded-[50px] flex flex-col items-center justify-center gap-4 text-slate-400 dark:text-slate-500 active:scale-95 transition-all cursor-pointer hover:border-emerald-600 hover:bg-emerald-50/20 dark:hover:bg-emerald-900/20">
                    <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-3xl flex items-center justify-center text-emerald-900 dark:text-emerald-400"><Camera size={40} /></div>
                    <span className="text-[12px] font-black uppercase tracking-[0.2em]">Kamerani faollashtirish</span>
                  </div>
                ) : (
                  <div className="relative w-full h-72 rounded-[50px] overflow-hidden shadow-2xl border-4 border-white">
                    <img src={image} className="w-full h-full object-cover" alt="Scan" />
                    <button onClick={() => setImage(null)} className="absolute top-6 right-6 w-14 h-14 bg-rose-500/90 text-white rounded-3xl flex items-center justify-center shadow-2xl active:scale-90 transition-all backdrop-blur-md">
                      <Trash2 size={24} />
                    </button>
                  </div>
                )}
                <input type="file" ref={fileInputRef} onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => setImage(reader.result as string);
                    reader.readAsDataURL(file);
                  }
                }} className="hidden" accept="image/*" />
             </div>

             <div className="space-y-10">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-5">Turi</label>
                    <select value={animal} onChange={e => setAnimal(e.target.value)} className="w-full bg-white p-7 rounded-[30px] font-black shadow-sm outline-none border-2 border-transparent focus:border-emerald-600 transition-all">
                    <label className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-5">Turi</label>
                    <select value={animal} onChange={e => setAnimal(e.target.value)} className="w-full bg-white dark:bg-slate-800 dark:text-white p-7 rounded-[30px] font-black shadow-sm outline-none border-2 border-transparent focus:border-emerald-600 transition-all">
                      <option>Sigir</option><option>Qo'y</option><option>Ot</option><option>Tovuq</option>
                    </select>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-5">Yoshi</label>
                    <input value={age} onChange={e => setAge(e.target.value)} placeholder="2 yil" className="bg-white p-7 rounded-[30px] font-black shadow-sm outline-none border-2 border-transparent focus:border-emerald-600 w-full" />
                    <label className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-5">Yoshi</label>
                    <input value={age} onChange={e => setAge(e.target.value)} placeholder="2 yil" className="bg-white dark:bg-slate-800 dark:text-white p-7 rounded-[30px] font-black shadow-sm outline-none border-2 border-transparent focus:border-emerald-600 w-full" />
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-5">Asosiy maqsad</label>
                  <select value={goal} onChange={e => setGoal(e.target.value)} className="w-full bg-white p-7 rounded-[30px] font-black shadow-sm outline-none border-2 border-transparent focus:border-emerald-600 transition-all">
                  <label className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-5">Asosiy maqsad</label>
                  <select value={goal} onChange={e => setGoal(e.target.value)} className="w-full bg-white dark:bg-slate-800 dark:text-white p-7 rounded-[30px] font-black shadow-sm outline-none border-2 border-transparent focus:border-emerald-600 transition-all">
                    <option>Sog'liq va parvarish</option><option>Go'sht yo'nalishi</option><option>Sut mahsuldorligi</option><option>Sport/Ko'rgazma</option>
                  </select>
                </div>
             </div>

             <button onClick={handleGetRecommendation} disabled={loading || !age} className={`w-full py-8 rounded-[40px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-5 shadow-3xl transition-all ${loading || !age ? 'bg-slate-200 text-slate-400' : 'gold-gradient text-white active:scale-95 shadow-amber-200'}`}>
             <button onClick={handleGetRecommendation} disabled={loading || !age} className={`w-full py-8 rounded-[40px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-5 shadow-3xl transition-all ${loading || !age ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600' : 'gold-gradient text-white active:scale-95 shadow-amber-200'}`}>
               {loading ? <Loader2 className="animate-spin" size={32} /> : (
                 <><Sparkles size={32} /> Tahlil qilish</>
               )}
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

const LogisticsScreen: React.FC<{ onBack: () => void, onAdd: () => void }> = ({ onBack, onAdd }) => {
  return (
    <div className="h-full overflow-y-auto hide-scrollbar pb-32 bg-slate-50 fade-in">
       <header className="px-8 pt-16 pb-12 bg-white border-b border-slate-100 sticky top-0 z-50 rounded-b-[40px] shadow-sm">
    <div className="h-full overflow-y-auto hide-scrollbar pb-32 bg-slate-50 dark:bg-slate-950 fade-in">
       <header className="px-8 pt-16 pb-12 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-50 rounded-b-[40px] shadow-sm dark:shadow-none">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-6">
            <button onClick={onBack} className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-900 active:scale-90 transition-all"><ChevronLeft size={28} /></button>
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Transport</h1>
            <button onClick={onBack} className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-900 dark:text-white active:scale-90 transition-all"><ChevronLeft size={28} /></button>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">Transport</h1>
          </div>
          <button onClick={onAdd} className="w-16 h-16 rounded-[25px] agro-gradient text-white flex items-center justify-center shadow-2xl active:scale-90 transition-all"><Plus size={32} /></button>
        </div>
      </header>

      <div className="px-6 py-10 space-y-8">
        {LOGISTICS.map(item => (
          <div key={item.id} className="bg-white rounded-[50px] p-8 shadow-xl border border-white flex flex-col gap-8 active:scale-[0.98] transition-all">
          <div key={item.id} className="bg-white dark:bg-slate-900 rounded-[50px] p-8 shadow-xl dark:shadow-none border border-white dark:border-slate-800 flex flex-col gap-8 active:scale-[0.98] transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-emerald-50 text-emerald-900 rounded-[30px] flex items-center justify-center shadow-inner"><Truck size={40} /></div>
                <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-900/50 text-emerald-900 dark:text-emerald-400 rounded-[30px] flex items-center justify-center shadow-inner"><Truck size={40} /></div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 leading-tight">{item.vehicleType}</h3>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">{item.vehicleType}</h3>
                  <p className="text-emerald-700 font-black text-lg mt-1 tracking-tighter">{item.price}</p>
                </div>
              </div>
              <a href={`tel:${item.phone}`} className="w-16 h-16 gold-gradient text-white rounded-[25px] flex items-center justify-center shadow-xl active:scale-90 transition-all"><Phone size={28} /></a>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-[40px] flex items-center justify-between border border-slate-100 shadow-inner">
            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-[40px] flex items-center justify-between border border-slate-100 dark:border-slate-700 shadow-inner">
              <div className="flex flex-col items-center flex-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Yuklanish</span>
                <span className="text-[16px] font-black text-slate-900">{item.fromRegion}</span>
                <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-2">Yuklanish</span>
                <span className="text-[16px] font-black text-slate-900 dark:text-white">{item.fromRegion}</span>
              </div>
              <div className="px-6 flex items-center justify-center"><ArrowRight className="text-emerald-200" size={28} /></div>
              <div className="flex flex-col items-center flex-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Yetkazish</span>
                <span className="text-[16px] font-black text-slate-900">{item.toRegion}</span>
                <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-2">Yetkazish</span>
                <span className="text-[16px] font-black text-slate-900 dark:text-white">{item.toRegion}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AcademyScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="h-full bg-slate-50 overflow-y-auto pb-32 fade-in hide-scrollbar">
       <header className="px-8 pt-16 pb-12 bg-white border-b border-slate-100 sticky top-0 z-50 rounded-b-[40px] shadow-sm">
    <div className="h-full bg-slate-50 dark:bg-slate-950 overflow-y-auto pb-32 fade-in hide-scrollbar">
       <header className="px-8 pt-16 pb-12 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-50 rounded-b-[40px] shadow-sm dark:shadow-none">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button onClick={onBack} className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-900 active:scale-90 transition-all"><ChevronLeft size={28} /></button>
              <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Akademiya</h1>
              <button onClick={onBack} className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-900 dark:text-white active:scale-90 transition-all"><ChevronLeft size={28} /></button>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">Akademiya</h1>
            </div>
          </div>
       </header>

       <div className="px-6 py-12 space-y-12">
          {LESSONS.map(lesson => (
            <div key={lesson.id} className="bg-white rounded-[55px] overflow-hidden shadow-2xl border border-white group">
            <div key={lesson.id} className="bg-white dark:bg-slate-900 rounded-[55px] overflow-hidden shadow-2xl dark:shadow-none border border-white dark:border-slate-800 group">
               <div className="aspect-video relative overflow-hidden">
                 <img src={lesson.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="" />
                 <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[2px]">
                    <div className="w-24 h-24 bg-white/20 backdrop-blur-3xl rounded-full flex items-center justify-center text-white border border-white/40 shadow-2xl active:scale-90 transition-all">
                      {lesson.isPdf ? <FileText size={45} /> : <Play size={45} fill="currentColor"/>}
                    </div>
                 </div>
               </div>
               <div className="p-10">
                 <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight leading-tight">{lesson.title}</h3>
                 <p className="text-slate-500 font-medium leading-relaxed text-sm mb-10">{lesson.description}</p>
                 <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 tracking-tight leading-tight">{lesson.title}</h3>
                 <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed text-sm mb-10">{lesson.description}</p>
                 <button className="w-full agro-gradient text-white py-6 rounded-[30px] font-black text-[13px] uppercase tracking-[0.2em] shadow-2xl active:scale-95 transition-all">
                   {lesson.isPdf ? 'Materialni yuklash' : 'Darsni boshlash'}
                 </button>
               </div>
            </div>
          ))}
       </div>
    </div>
  );
};

const ProfileScreen: React.FC<{ user: User | null, onNavigate: (s: Screen) => void, onLogout: () => void, favoriteCount: number }> = ({ user, onNavigate, onLogout, favoriteCount }) => {
const ProfileScreen: React.FC<{ user: User | null, onNavigate: (s: Screen) => void, onLogout: () => void, favoriteCount: number, onToggleTheme: () => void, theme: 'light' | 'dark' }> = ({ user, onNavigate, onLogout, favoriteCount, onToggleTheme, theme }) => {
  return (
    <div className="h-full overflow-y-auto hide-scrollbar pb-32 bg-slate-50 fade-in">
      <header className="px-8 pt-24 pb-20 bg-white rounded-b-[70px] shadow-2xl flex flex-col items-center relative border-b-8 border-emerald-900">
        <div className="w-40 h-40 bg-emerald-50 rounded-[55px] flex items-center justify-center text-emerald-900 mb-8 border-8 border-white shadow-3xl relative">
    <div className="h-full overflow-y-auto hide-scrollbar pb-32 bg-slate-50 dark:bg-slate-950 fade-in">
      <header className="px-8 pt-24 pb-20 bg-white dark:bg-slate-900 rounded-b-[70px] shadow-2xl dark:shadow-none flex flex-col items-center relative border-b-8 border-emerald-900">
        <div className="w-40 h-40 bg-emerald-50 dark:bg-emerald-900/50 rounded-[55px] flex items-center justify-center text-emerald-900 dark:text-emerald-400 mb-8 border-8 border-white dark:border-slate-900 shadow-3xl relative">
          <UserIcon size={70} strokeWidth={2.5} />
          <div className="absolute -bottom-4 bg-emerald-900 text-white px-6 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border-4 border-white">Premium</div>
          <div className="absolute -bottom-4 bg-emerald-900 text-white px-6 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border-4 border-white dark:border-slate-900">Premium</div>
        </div>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight">{user?.name || 'Foydalanuvchi'}</h2>
        <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">{user?.name || 'Foydalanuvchi'}</h2>
        <div className="flex items-center gap-3 mt-4">
           <span className="bg-slate-50 px-5 py-2 rounded-2xl text-[12px] font-black text-slate-400 uppercase tracking-widest border border-slate-100">{user?.role}</span>
           <span className="bg-slate-50 px-5 py-2 rounded-2xl text-[12px] font-black text-slate-400 uppercase tracking-widest border border-slate-100">{user?.region}</span>
           <span className="bg-slate-50 dark:bg-slate-800 px-5 py-2 rounded-2xl text-[12px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest border border-slate-100 dark:border-slate-700">{user?.role}</span>
           <span className="bg-slate-50 dark:bg-slate-800 px-5 py-2 rounded-2xl text-[12px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest border border-slate-100 dark:border-slate-700">{user?.region}</span>
        </div>
      </header>

      <div className="px-6 mt-12 space-y-6">
        {[
          { label: "Mening e'lonlarim", icon: <Tag size={24}/>, count: "3" },
          { label: "Sevimlilar", icon: <Heart size={24}/>, count: favoriteCount.toString() },
          { label: "Balans (Hamyon)", icon: <Wallet size={24}/>, sub: "1,200,000 so'm", color: "text-emerald-700" },
          { label: "Balans (Hamyon)", icon: <Wallet size={24}/>, sub: "1,200,000 so'm", color: "text-emerald-700 dark:text-emerald-400" },
          { label: "Xavfsizlik", icon: <ShieldCheck size={24}/> },
          { label: "Tizim sozlamalari", icon: <Settings size={24}/> },
        ].map((item, idx) => (
          <button key={idx} className="w-full bg-white p-8 rounded-[45px] flex items-center justify-between shadow-lg border border-white active:scale-98 transition-all hover:shadow-xl">
          <button key={idx} className="w-full bg-white dark:bg-slate-900 p-8 rounded-[45px] flex items-center justify-between shadow-lg dark:shadow-none border border-white dark:border-slate-800 active:scale-98 transition-all hover:shadow-xl dark:hover:bg-slate-800">
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-500 shadow-inner">{item.icon}</div>
              <div className="w-14 h-14 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-500 shadow-inner">{item.icon}</div>
              <div className="text-left">
                <span className="font-black text-slate-900 text-[16px]">{item.label}</span>
                <span className="font-black text-slate-900 dark:text-white text-[16px]">{item.label}</span>
                {item.sub && <p className={`text-[12px] font-black uppercase tracking-widest mt-1 ${item.color}`}>{item.sub}</p>}
              </div>
            </div>
            <div className="flex items-center gap-4">
              {item.count && <span className="bg-emerald-900 text-white px-4 py-2 rounded-xl text-[12px] font-black shadow-lg">{item.count}</span>}
              <ChevronRight className="text-slate-200" size={24} />
              <ChevronRight className="text-slate-200 dark:text-slate-600" size={24} />
            </div>
          </button>
        ))}
        <button onClick={onLogout} className="w-full bg-rose-50 text-rose-600 p-8 rounded-[45px] flex items-center gap-6 font-black uppercase tracking-[0.2em] text-[14px] active:scale-95 transition-all mt-8 border-2 border-rose-100 shadow-xl shadow-rose-100/50">
        <button onClick={onToggleTheme} className="w-full bg-white dark:bg-slate-900 p-8 rounded-[45px] flex items-center justify-between shadow-lg dark:shadow-none border border-white dark:border-slate-800 active:scale-98 transition-all hover:shadow-xl dark:hover:bg-slate-800">
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-500 shadow-inner"><Moon size={24}/></div>
            <span className="font-black text-slate-900 dark:text-white text-[16px]">Tungi rejim</span>
          </div>
          <div className={`w-16 h-9 rounded-full p-1 flex items-center transition-colors ${theme === 'dark' ? 'bg-emerald-600 justify-end' : 'bg-slate-200 dark:bg-slate-700 justify-start'}`}>
            <div className="w-7 h-7 bg-white rounded-full shadow-md"></div>
          </div>
        </button>
        <button onClick={onLogout} className="w-full bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 p-8 rounded-[45px] flex items-center gap-6 font-black uppercase tracking-[0.2em] text-[14px] active:scale-95 transition-all mt-8 border-2 border-rose-100 dark:border-rose-500/20 shadow-xl shadow-rose-100/50 dark:shadow-none">
          <LogOut size={28} /> Tizimdan chiqish
        </button>
      </div>
    </div>
  );
};

const ProductDetailScreen: React.FC<{ product: Product, onBack: () => void, isFavorite: boolean, onToggleFavorite: () => void }> = ({ product, onBack, isFavorite, onToggleFavorite }) => {
  return (
    <div className="h-full overflow-y-auto pb-32 bg-white fade-in relative hide-scrollbar">
    <div className="h-full overflow-y-auto pb-32 bg-white dark:bg-slate-950 fade-in relative hide-scrollbar">
      <div className="relative h-[55vh] min-h-[400px]">
        <button onClick={onBack} className="absolute top-12 left-8 z-20 w-16 h-16 bg-white/20 backdrop-blur-2xl rounded-3xl flex items-center justify-center text-white border border-white/30 active:scale-90 transition-all shadow-2xl"><ChevronLeft size={36}/></button>
        <img src={product.image} className="h-full w-full object-cover" alt="" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        
        <div className="absolute bottom-24 left-10 right-10 text-white">
           <div className="flex items-center gap-4 mb-4">
              <span className="bg-emerald-900 text-white px-6 py-2 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-2xl">Vip E'lon</span>
              <span className="bg-white/20 backdrop-blur-xl px-6 py-2 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] border border-white/20">Ishonchli</span>
           </div>
           <h1 className="text-5xl font-black tracking-tighter mb-4 leading-none">{product.title}</h1>
           <div className="flex items-center gap-3 text-emerald-100 font-bold">
              <MapPin size={20} className="text-emerald-400" /> {product.location}
           </div>
        </div>
      </div>

      <div className="px-10 -mt-16 relative z-30">
         <div className="bg-white p-12 rounded-[70px] shadow-3xl border border-slate-50">
         <div className="bg-white dark:bg-slate-900 p-12 rounded-[70px] shadow-3xl dark:shadow-none border border-slate-50 dark:border-slate-800">
            <div className="flex items-center justify-between mb-12">
               <div>
                 <p className="text-[12px] font-black text-slate-400 uppercase tracking-widest mb-2">Sotuv narxi</p>
                 <p className="text-[12px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Sotuv narxi</p>
                 <p className="text-emerald-900 font-black text-5xl tracking-tighter leading-none">{product.price}</p>
               </div>
               <button onClick={onToggleFavorite} className={`w-20 h-20 rounded-[35px] flex items-center justify-center shadow-xl active:scale-90 transition-all ${isFavorite ? 'bg-rose-500 text-white shadow-rose-200' : 'bg-rose-50 text-rose-500 shadow-rose-50'}`}>
               <button onClick={onToggleFavorite} className={`w-20 h-20 rounded-[35px] flex items-center justify-center shadow-xl active:scale-90 transition-all ${isFavorite ? 'bg-rose-500 text-white shadow-rose-200' : 'bg-rose-50 dark:bg-rose-500/10 text-rose-500 dark:text-rose-400 shadow-rose-50'}`}>
                 <Heart size={36} fill={isFavorite ? "currentColor" : "none"} strokeWidth={2.5}/>
               </button>
            </div>

            <div className="grid grid-cols-3 gap-5 mb-12">
               {[
                 { label: 'Vazni', value: product.weight || 'Nomalum', icon: Scale, color: 'text-blue-600 bg-blue-50' },
                 { label: 'Yosh', value: product.age || 'Nomalum', icon: Calendar, color: 'text-amber-600 bg-amber-50' },
                 { label: 'Sifat', value: 'Premium', icon: Shield, color: 'text-emerald-700 bg-emerald-50' },
               ].map((stat, i) => (
                 <div key={i} className="flex flex-col items-center gap-4 p-6 rounded-[40px] bg-slate-50 border border-slate-100 shadow-inner">
                    <div className={`w-14 h-14 ${stat.color} rounded-[20px] flex items-center justify-center shadow-md`}><stat.icon size={24}/></div>
                 <div key={i} className="flex flex-col items-center gap-4 p-6 rounded-[40px] bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-inner">
                    <div className={`w-14 h-14 ${stat.color} dark:bg-opacity-20 dark:text-current rounded-[20px] flex items-center justify-center shadow-md`}><stat.icon size={24}/></div>
                    <div className="text-center">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                       <p className="text-[14px] font-black text-slate-900 truncate">{stat.value}</p>
                       <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
                       <p className="text-[14px] font-black text-slate-900 dark:text-white truncate">{stat.value}</p>
                    </div>
                 </div>
               ))}
            </div>

            <div className="space-y-8 mb-16">
               <div className="flex items-center gap-4">
                  <div className="w-2 h-8 agro-gradient rounded-full"></div>
                  <h4 className="text-[14px] font-black text-slate-900 uppercase tracking-[0.3em]">Tavsif va Ma'lumot</h4>
                  <h4 className="text-[14px] font-black text-slate-900 dark:text-white uppercase tracking-[0.3em]">Tavsif va Ma'lumot</h4>
               </div>
               <p className="text-slate-600 font-medium leading-[2.2] text-[17px] bg-slate-50/50 p-10 rounded-[50px] border border-slate-100 italic shadow-inner">
               <p className="text-slate-600 dark:text-slate-300 font-medium leading-[2.2] text-[17px] bg-slate-50/50 dark:bg-slate-800/50 p-10 rounded-[50px] border border-slate-100 dark:border-slate-800 italic shadow-inner">
                 "{product.description}"
               </p>
            </div>

            <div className="flex gap-5">
              <button onClick={() => window.alert('Telefon: +998 90 123 45 67')} className="flex-[2.5] agro-gradient text-white py-8 rounded-[40px] font-black uppercase tracking-[0.2em] shadow-3xl shadow-emerald-200 flex items-center justify-center gap-5 active:scale-95 transition-all text-lg">
              <button onClick={() => window.alert('Telefon: +998 90 123 45 67')} className="flex-[2.5] agro-gradient text-white py-8 rounded-[40px] font-black uppercase tracking-[0.2em] shadow-3xl shadow-emerald-200 dark:shadow-emerald-900/50 flex items-center justify-center gap-5 active:scale-95 transition-all text-lg">
                <Phone size={28} /> Bog'lanish
              </button>
              <button className="flex-1 bg-slate-900 text-white rounded-[40px] flex items-center justify-center active:scale-95 transition-all shadow-2xl"><ShoppingCart size={32}/></button>
              <button className="flex-1 bg-slate-900 dark:bg-slate-800 text-white rounded-[40px] flex items-center justify-center active:scale-95 transition-all shadow-2xl"><ShoppingCart size={32}/></button>
            </div>
         </div>
      </div>
    </div>
  );
};

// AddListingScreen ham Premium uslubda
const AddListingScreen: React.FC<{ onBack: () => void, forcedCategory?: string }> = ({ onBack, forcedCategory }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [listingType, setListingType] = useState(forcedCategory || 'Hayvonlar');
  
  const handlePost = () => { 
    setLoading(true); 
    setTimeout(() => { 
      setLoading(false); 
      setSuccess(true); 
      setTimeout(() => onBack(), 2500); 
    }, 1800); 
  };

  return (
    <div className="h-full overflow-y-auto hide-scrollbar pb-32 bg-white fade-in relative">
    <div className="h-full overflow-y-auto hide-scrollbar pb-32 bg-white dark:bg-slate-900 fade-in relative">
      <header className="px-8 pt-16 pb-14 agro-gradient text-white rounded-b-[60px] relative text-center shadow-3xl">
        <button onClick={onBack} className="absolute top-12 left-8 text-white/50 w-14 h-14 flex items-center justify-center bg-white/10 rounded-2xl backdrop-blur-xl border border-white/20 active:scale-90 transition-all"><ChevronLeft size={32} /></button>
        <h1 className="text-4xl font-black uppercase tracking-tight">{listingType === 'Logistika' ? 'E\'lon' : 'E\'lon Berish'}</h1>
        <p className="text-emerald-200/60 text-[12px] font-black uppercase tracking-[0.3em] mt-3">Yangi Biznes Imkoniyat</p>
      </header>
      
      <div className="px-10 py-12 space-y-10">
        {success ? (
          <div className="flex flex-col items-center justify-center py-24 text-center fade-in">
            <div className="w-32 h-32 agro-gradient rounded-full flex items-center justify-center text-white mb-10 shadow-3xl animate-bounce border-8 border-emerald-50"><CheckCircle2 size={60} /></div>
            <h3 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter leading-none">Muvaffaqiyatli!</h3>
            <p className="text-slate-500 font-medium">E'loningiz moderator ko'rigidan so'ng bozorga chiqadi.</p>
            <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tighter leading-none">Muvaffaqiyatli!</h3>
            <p className="text-slate-500 dark:text-slate-400 font-medium">E'loningiz moderator ko'rigidan so'ng bozorga chiqadi.</p>
          </div>
        ) : loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-center fade-in">
            <Loader2 size={80} className="animate-spin text-emerald-900 mb-10" />
            <h3 className="text-3xl font-black text-slate-900 tracking-tighter leading-none">Tasdiqlanmoqda...</h3>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">Tasdiqlanmoqda...</h3>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              <label className="text-[12px] font-black text-slate-400 uppercase tracking-widest ml-5">Mahsulot nomi</label>
              <input placeholder="Masalan: Golshtin Sog'in Sigiri" className="w-full bg-slate-50 border-2 border-slate-100 focus:border-emerald-600 focus:bg-white rounded-[35px] p-8 font-bold outline-none shadow-inner transition-all text-lg" />
              <label className="text-[12px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-5">Mahsulot nomi</label>
              <input placeholder="Masalan: Golshtin Sog'in Sigiri" className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border-2 border-slate-100 dark:border-slate-700 focus:border-emerald-600 focus:bg-white dark:focus:bg-slate-900 rounded-[35px] p-8 font-bold outline-none shadow-inner transition-all text-lg" />
            </div>
            <div className="grid grid-cols-1 gap-8">
              <div className="space-y-4">
                <label className="text-[12px] font-black text-slate-400 uppercase tracking-widest ml-5">Sotuv narxi (UZS)</label>
                <label className="text-[12px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-5">Sotuv narxi (UZS)</label>
                <div className="relative">
                  <input type="number" placeholder="0.00" className="w-full bg-slate-50 border-2 border-slate-100 focus:border-emerald-600 focus:bg-white rounded-[35px] p-8 font-bold outline-none shadow-inner transition-all text-2xl pr-20" />
                  <input type="number" placeholder="0.00" className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border-2 border-slate-100 dark:border-slate-700 focus:border-emerald-600 focus:bg-white dark:focus:bg-slate-900 rounded-[35px] p-8 font-bold outline-none shadow-inner transition-all text-2xl pr-20" />
                  <DollarSign className="absolute right-8 top-1/2 -translate-y-1/2 text-emerald-900/30" size={32} />
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-[12px] font-black text-slate-400 uppercase tracking-widest ml-5">Manzil</label>
                <label className="text-[12px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-5">Manzil</label>
                <div className="relative">
                  <select className="w-full bg-slate-50 border-2 border-slate-100 focus:border-emerald-600 focus:bg-white rounded-[35px] p-8 font-bold outline-none shadow-inner appearance-none transition-all text-lg">
                  <select className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border-2 border-slate-100 dark:border-slate-700 focus:border-emerald-600 focus:bg-white dark:focus:bg-slate-900 rounded-[35px] p-8 font-bold outline-none shadow-inner appearance-none transition-all text-lg">
                    {REGIONS.map(r => <option key={r}>{r}</option>)}
                  </select>
                  <ChevronDown className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
                </div>
              </div>
            </div>
            <div className="pt-8">
              <button onClick={handlePost} className="w-full agro-gradient text-white py-8 rounded-[45px] font-black uppercase tracking-[0.3em] shadow-3xl shadow-emerald-200 active:scale-95 transition-all text-lg">
                Joylashtirish
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
