
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { ShoppingCart, Heart, Search, MessageCircle, X, Plus, Minus, Trash2, Truck, Store, CreditCard, ChevronRight, Settings, PlusCircle, Save, LogOut, User, Lock, Globe, Moon, Star, Calendar, Instagram, Phone, MapPin, Clock, Edit3, Image as ImageIcon, Package, Eye, EyeOff } from 'lucide-react';
import { Product, CartItem } from './types';
import { PRODUCTS, WHATSAPP_NUMBER } from './constants';
import { getProductRecommendations } from './services/geminiService';

// --- RAMADAN 2026 DATES ---
const RAMADAN_START = new Date('2026-02-19T00:00:00');
const RAMADAN_END = new Date('2026-03-20T23:59:59');

// --- TRANSLATIONS ---
const translations = {
  ky: {
    shopName: "Нур-Базар",
    searchPlaceholder: "Товар издөө...",
    heroTitle: "Баткендин эң мыкты табигый жемиштери",
    heroSub: "Ден соолукка пайдалуу, химиясыз кургатылган жана таза азыктар.",
    catalog: "Каталог",
    ramadanTitle: "Ыйык Рамазан айы кут болсун!",
    ramadanSub: "Рамазандын урматына бардык товарларга -10% арзандатуу!",
    aiTitle: "AI Жардамчы",
    aiSub: "Суроо бериңиз, мисалы: 'Кандай жемиш иммунитетти көтөрөт?'",
    aiPlaceholder: "Бул жерге жазыңыз...",
    aiAsk: "Суроо",
    aiLoading: "Ойлонууда...",
    all: "Баары",
    orderTotal: "Жалпы сумма:",
    checkout: "Заказды тариздөө",
    back: "Артка",
    customerName: "Сиздин атыңыз",
    phone: "Телефон",
    address: "Жеткирүү дареги",
    waButton: "WhatsApp аркылуу жөнөтүү",
    adminLogin: "Админ кирүү",
    adminPassSub: "Башкаруу панелине кирүү үчүн пароль жазыңыз",
    password: "Пароль",
    login: "Кирүү",
    loginError: "Пароль туура эмес!",
    adminPanel: "Товарларды башкаруу",
    logout: "Чыгуу",
    favorites: "Тандалган товарлар",
    manageProducts: "Товарлар тизмеси",
    add: "Жаңы товар кошуу",
    edit: "Өзгөртүү",
    save: "Сактоо",
    cancel: "Жокко чыгаруу",
    cart: "Себет",
    cartEmpty: "Азырынча эч нерсе жок",
    chooseItems: "Товарларды тандаңыз",
    total: "Жалпы:",
    itemAdded: "Товар кошулду!",
    deleteConfirm: "Бул товарды өчүрүүнү каалайсызбы?",
    som: "сом",
    kg: "кг",
    sale: "Рамазан -10%",
    daysLeft: "Аякташына калды:",
    days: "күн",
    footerText: "Биз табигый азыктарды гана сунуштайбыз. Баткендин даамы эми сиздин үйүңүздө.",
    contacts: "Байланыш",
    deliveryInfo: "Жеткирүү",
    workingHours: "Иштөө убактысы",
    rights: "Бардык укуктар корголгон",
    addressVal: "Кара-Балта ш., Борбордук базар",
    hoursVal: "Күн сайын: 09:00 - 18:00",
    prodName: "Товардын аталышы",
    prodPrice: "Баасы (сом)",
    prodCat: "Категория",
    prodUnit: "Бирдиги",
    prodImg: "Сүрөттүн URL шилтемеси",
    prodDesc: "Түшүндүрмөсү",
    preview: "Алдын ала көрүү"
  },
  ru: {
    shopName: "Нур-Базар",
    searchPlaceholder: "Поиск товаров...",
    heroTitle: "Лучшие натуральные фрукты Баткена",
    heroSub: "Полезно для здоровья, сушка без химии, экологически чистые продукты.",
    catalog: "Каталог",
    ramadanTitle: "Поздравляем со Священным Рамаданом!",
    ramadanSub: "В честь Рамадана скидка -10% на все товары!",
    aiTitle: "AI Помощник",
    aiSub: "Задайте вопрос, например: 'Какие фрукты повышают иммунитет?'",
    aiPlaceholder: "Пишите здесь...",
    aiAsk: "Спросить",
    aiLoading: "Думает...",
    all: "Все",
    orderTotal: "Общая сумма:",
    checkout: "Оформить заказ",
    back: "Назад",
    customerName: "Ваше имя",
    phone: "Телефон",
    address: "Адрес доставки",
    waButton: "Отправить через WhatsApp",
    adminLogin: "Вход для админа",
    adminPassSub: "Введите пароль для доступа к панели управления",
    password: "Пароль",
    login: "Войти",
    loginError: "Неверный пароль!",
    adminPanel: "Управление товарами",
    logout: "Выйти",
    favorites: "Избранное",
    manageProducts: "Список товаров",
    add: "Добавить товар",
    edit: "Изменить",
    save: "Сохранить",
    cancel: "Отмена",
    cart: "Корзина",
    cartEmpty: "Пока ничего нет",
    chooseItems: "Выберите товары",
    total: "Итого:",
    itemAdded: "Товар добавлен!",
    deleteConfirm: "Вы уверены, что хотите удалить этот товар?",
    som: "сом",
    kg: "кг",
    sale: "Рамадан -10%",
    daysLeft: "До завершения:",
    days: "дн.",
    footerText: "Мы предлагаем только натуральные продукты. Вкус Баткена теперь в вашем доме.",
    contacts: "Контакты",
    deliveryInfo: "Доставка",
    workingHours: "Время работы",
    rights: "Все права защищены",
    addressVal: "г. Кара-Балта, Центральный рынок",
    hoursVal: "Ежедневно: 09:00 - 18:00",
    prodName: "Название товара",
    prodPrice: "Цена (сом)",
    prodCat: "Категория",
    prodUnit: "Единица",
    prodImg: "URL изображения",
    prodDesc: "Описание",
    preview: "Предпросмотр"
  }
};

const RAMADAN_DISCOUNT_VAL = 0.10;

const App: React.FC = () => {
  const catalogRef = useRef<HTMLDivElement>(null);
  const [lang, setLang] = useState<'ky' | 'ru'>(() => (localStorage.getItem('kg_market_lang') as 'ky' | 'ru') || 'ky');
  const [now, setNow] = useState(new Date());
  const t = translations[lang];

  const isRamadan = useMemo(() => now >= RAMADAN_START && now <= RAMADAN_END, [now]);
  const daysRemaining = useMemo(() => {
    if (!isRamadan) return 0;
    return Math.ceil((RAMADAN_END.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  }, [now, isRamadan]);

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('kg_market_products');
    return saved ? JSON.parse(saved) : PRODUCTS;
  });
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState<'home' | 'checkout' | 'profile' | 'admin'>('home');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiQuery, setAiQuery] = useState('');
  
  // Admin Editing State
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '', address: '' });

  useEffect(() => { localStorage.setItem('kg_market_products', JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem('kg_market_lang', lang); }, [lang]);
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const scrollToCatalog = () => catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
  const getPrice = (originalPrice: number) => isRamadan ? Math.floor(originalPrice * (1 - RAMADAN_DISCOUNT_VAL)) : originalPrice;

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, products]);

  const addToCart = (product: Product) => {
    const currentPrice = getPrice(product.price);
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { ...product, price: currentPrice, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) return { ...item, quantity: Math.max(0, item.quantity + delta) };
      return item;
    }).filter(item => item.quantity > 0));
  };

  const toggleFavorite = (id: string) => setFavorites(prev => prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]);
  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleAiAsk = async () => {
    if (!aiQuery) return;
    setAiLoading(true);
    const context = isRamadan ? "Учурда Ыйык Рамазан айы жана бизде 10% арзандатуу бар." : "";
    const response = await getProductRecommendations(`${context} ${aiQuery} (Жооп ${lang === 'ky' ? 'кыргызча' : 'орусча'} болсун)`);
    setAiResponse(response);
    setAiLoading(false);
    setAiQuery('');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'kg2025') { 
      setIsAdminLoggedIn(true); 
      setLoginError(false); 
      setView('admin'); 
      setPasswordInput('');
    } else { 
      setLoginError(true); 
    }
  };

  const sendWhatsAppOrder = () => {
    if (cart.length === 0) return alert(t.cartEmpty);
    const itemsText = cart.map(i => `✅ ${i.name} (${i.quantity} ${i.unit}) - ${i.price * i.quantity} ${t.som}`).join('\n');
    const text = `📦 ЖАҢЫ ЗАКАЗ (Нур-Базар)!\n\n👤 Кардар: ${customerInfo.name}\n📞 Тел: ${customerInfo.phone}\n📍 Дарек: ${customerInfo.address}\n\n🛒 Товарлар:\n${itemsText}\n\n💰 Жалпы: ${totalAmount} ${t.som}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=${encodeURIComponent(text)}`);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    
    if (editingProduct.id) {
      // Update existing
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? (editingProduct as Product) : p));
    } else {
      // Add new
      const newProduct: Product = {
        id: Date.now().toString(),
        name: editingProduct.name || '',
        category: editingProduct.category || 'Кургатылган жемиштер',
        price: editingProduct.price || 0,
        unit: editingProduct.unit || 'кг',
        image: editingProduct.image || '',
        description: editingProduct.description || '',
        packaging: ['1кг'],
        stock: 100
      };
      setProducts(prev => [newProduct, ...prev]);
    }
    setEditingProduct(null);
  };

  const deleteProduct = (id: string) => { 
    if (window.confirm(t.deleteConfirm)) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 text-gray-900 selection:bg-orange-100 selection:text-orange-900 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 cursor-pointer shrink-0" onClick={() => setView('home')}>
            <div className="bg-orange-600 p-2 rounded-xl shadow-lg">
              <Store className="text-white w-5 h-5" />
            </div>
            <h1 className="text-xl font-black text-gray-900 hidden sm:block tracking-tight">{t.shopName}</h1>
          </div>

          <div className="flex-1 max-w-md">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-orange-600" />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                className="w-full pl-10 pr-4 py-2 bg-gray-100/80 rounded-full text-sm focus:bg-white focus:ring-2 focus:ring-orange-300 outline-none transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <div className="flex bg-gray-100 p-1 rounded-xl text-[10px] font-bold border border-gray-200">
              <button onClick={() => setLang('ky')} className={`px-2.5 py-1.5 rounded-lg transition-all ${lang === 'ky' ? 'bg-orange-600 text-white shadow-md' : 'text-gray-500'}`}>KY</button>
              <button onClick={() => setLang('ru')} className={`px-2.5 py-1.5 rounded-lg transition-all ${lang === 'ru' ? 'bg-orange-600 text-white shadow-md' : 'text-gray-500'}`}>RU</button>
            </div>
            <button onClick={() => setView('profile')} className="p-2 text-gray-600 hover:bg-orange-50 rounded-full transition-colors"><User className="w-6 h-6" /></button>
            <button onClick={() => setIsCartOpen(true)} className="relative p-2.5 bg-orange-600 text-white rounded-full hover:bg-orange-700 shadow-lg active:scale-95 transition-all">
              <ShoppingCart className="w-5 h-5" />
              {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full ring-2 ring-white animate-bounce">{cart.length}</span>}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
        {/* --- HOME VIEW --- */}
        {view === 'home' && (
          <div className="space-y-8 animate-fade-in">
            {isRamadan && (
              <div className="bg-gradient-to-r from-emerald-900 via-green-800 to-emerald-900 rounded-[2.5rem] p-6 sm:p-12 text-white relative overflow-hidden shadow-2xl border-4 border-emerald-700/30">
                 <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-8">
                   <div className="flex flex-col sm:flex-row items-center gap-6">
                     <div className="bg-yellow-400/20 p-5 rounded-full backdrop-blur-sm border border-yellow-400/30"><Moon className="w-16 h-16 text-yellow-300 fill-yellow-300" /></div>
                     <div className="text-center sm:text-left">
                        <h2 className="text-3xl sm:text-5xl font-black mb-3">{t.ramadanTitle}</h2>
                        <p className="text-green-50 text-base sm:text-xl opacity-90 max-w-lg">{t.ramadanSub}</p>
                     </div>
                   </div>
                   <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-3xl border border-white/20 text-center min-w-[160px]">
                      <Calendar className="w-5 h-5 mx-auto mb-2 text-yellow-300" />
                      <p className="text-[10px] uppercase font-bold text-green-200">{t.daysLeft}</p>
                      <p className="text-3xl font-black">{daysRemaining} <span className="text-sm">{t.days}</span></p>
                   </div>
                 </div>
              </div>
            )}

            {/* Hero Section */}
            <div className="bg-gradient-to-br from-orange-600 via-orange-500 to-amber-500 rounded-[2.5rem] p-10 text-white overflow-hidden relative shadow-2xl flex flex-col md:flex-row items-center gap-10">
              <div className="relative z-10 max-w-xl flex-1 text-center md:text-left">
                <span className="inline-block bg-white/20 px-4 py-1.5 rounded-full text-xs font-bold mb-6 uppercase tracking-widest border border-white/20">Нур-Базар • 2026</span>
                <h2 className="text-4xl sm:text-6xl font-black mb-6 leading-tight">{t.heroTitle}</h2>
                <p className="text-orange-50 text-lg opacity-95 mb-10">{t.heroSub}</p>
                <button onClick={scrollToCatalog} className="bg-white text-orange-600 px-10 py-4 rounded-2xl font-black shadow-xl hover:bg-orange-50 transition-all flex items-center gap-2 mx-auto md:mx-0">
                  {t.catalog} <ChevronRight className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 relative z-10 animate-float">
                <img src='./assets/Img/Hero.png' alt="Dry fruits" className="w-full max-w-[400px] drop-shadow-2xl rounded-3xl" />
              </div>
            </div>

            {/* AI Assistant */}
            <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-orange-100 flex flex-col md:flex-row items-center gap-8">
              <div className="bg-indigo-600 p-6 rounded-3xl shadow-lg"><MessageCircle className="w-10 h-10 text-white" /></div>
              <div className="flex-1 w-full">
                <h3 className="text-xl font-black">{t.aiTitle}</h3>
                <p className="text-sm text-gray-500 mb-5">{t.aiSub}</p>
                <div className="flex gap-3">
                  <input className="flex-1 px-6 py-4 rounded-2xl border bg-gray-50 outline-none focus:bg-white focus:ring-2 focus:ring-indigo-300" value={aiQuery} onChange={e => setAiQuery(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleAiAsk()} placeholder={t.aiPlaceholder} />
                  <button onClick={handleAiAsk} className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-indigo-700 shadow-lg active:scale-95 transition-all">
                    {aiLoading ? "..." : t.aiAsk}
                  </button>
                </div>
                {aiResponse && <div className="mt-5 p-5 bg-indigo-50 border border-indigo-100 rounded-3xl text-sm text-indigo-900 animate-fade-in">{aiResponse}</div>}
              </div>
            </div>

            {/* Catalog */}
            <div ref={catalogRef} className="space-y-8 py-4">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <h3 className="text-3xl font-black">{t.catalog}</h3>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {['All', 'Кургатылган жемиштер', 'Жаңгактар', 'Таттуулар', 'Mix'].map(cat => (
                    <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-6 py-2.5 rounded-2xl whitespace-nowrap text-sm font-black border transition-all ${activeCategory === cat ? 'bg-orange-600 text-white border-orange-600 shadow-xl' : 'bg-white text-gray-500 border-gray-100 hover:bg-orange-50'}`}>
                      {cat === 'All' ? t.all : cat}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <div key={product.id} className="bg-white rounded-[2rem] p-4 shadow-sm border border-orange-50 hover:shadow-2xl hover:-translate-y-1 transition-all group">
                    <div className="relative aspect-square mb-4 overflow-hidden rounded-2xl bg-gray-50">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                      <button onClick={() => toggleFavorite(product.id)} className={`absolute top-2 right-2 p-2 rounded-full backdrop-blur-md ${favorites.includes(product.id) ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-400'}`}>
                        <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                    <div className="px-1">
                      <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">{product.category}</p>
                      <h4 className="font-bold text-gray-900 mb-2 truncate">{product.name}</h4>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-xl font-black text-orange-600">{getPrice(product.price)} {t.som}</span>
                          <span className="text-[10px] text-gray-400">/ 1 {product.unit}</span>
                        </div>
                        <button onClick={() => addToCart(product)} className="bg-orange-600 text-white p-3 rounded-2xl hover:bg-orange-700 transition-all shadow-md"><Plus className="w-5 h-5" /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- CHECKOUT VIEW --- */}
        {view === 'checkout' && (
          <div className="max-w-2xl mx-auto bg-white rounded-[2.5rem] p-10 shadow-2xl border border-orange-50 animate-fade-in">
            <h2 className="text-3xl font-black mb-8">{t.checkout}</h2>
            <div className="space-y-6">
               <div className="space-y-1">
                 <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">{t.customerName}</label>
                 <input className="w-full px-5 py-4 rounded-2xl border bg-gray-50 outline-none focus:ring-2 focus:ring-orange-300 transition-all" value={customerInfo.name} onChange={e => setCustomerInfo({...customerInfo, name: e.target.value})} />
               </div>
               <div className="space-y-1">
                 <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">{t.phone}</label>
                 <input className="w-full px-5 py-4 rounded-2xl border bg-gray-50 outline-none focus:ring-2 focus:ring-orange-300 transition-all" value={customerInfo.phone} onChange={e => setCustomerInfo({...customerInfo, phone: e.target.value})} />
               </div>
               <div className="space-y-1">
                 <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">{t.address}</label>
                 <textarea className="w-full px-5 py-4 rounded-2xl border bg-gray-50 outline-none h-28 resize-none focus:ring-2 focus:ring-orange-300 transition-all" value={customerInfo.address} onChange={e => setCustomerInfo({...customerInfo, address: e.target.value})} />
               </div>
               <div className="p-6 bg-orange-50 rounded-[2rem] border border-orange-100 flex justify-between items-center">
                 <span className="font-black text-lg uppercase">{t.orderTotal}</span>
                 <span className="font-black text-2xl text-orange-600">{totalAmount} {t.som}</span>
               </div>
               <button onClick={sendWhatsAppOrder} className="w-full bg-green-500 text-white py-5 rounded-2xl font-black shadow-xl hover:bg-green-600 transition-all flex items-center justify-center gap-3 active:scale-95">
                 <MessageCircle className="w-6 h-6" /> {t.waButton}
               </button>
               <button onClick={() => setView('home')} className="w-full text-gray-400 font-bold py-2 uppercase text-xs tracking-widest">{t.back}</button>
            </div>
          </div>
        )}

        {/* --- PROFILE & ADMIN VIEW --- */}
        {(view === 'profile' || view === 'admin') && (
          <div className="max-w-5xl mx-auto animate-fade-in">
            {!isAdminLoggedIn ? (
              <div className="max-w-md mx-auto bg-white rounded-[2rem] p-10 shadow-xl text-center border border-orange-100 mt-10">
                <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
                  <Lock className="w-10 h-10 text-orange-600" />
                </div>
                <h3 className="text-2xl font-black mb-2 text-gray-900">{t.adminLogin}</h3>
                <p className="text-sm text-gray-400 mb-8">{t.adminPassSub}</p>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="relative group">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      placeholder={t.password} 
                      className="w-full px-6 py-4 rounded-2xl border bg-gray-50 text-center tracking-[0.2em] text-lg outline-none focus:ring-2 focus:ring-orange-300 transition-all" 
                      value={passwordInput} 
                      onChange={e => setPasswordInput(e.target.value)} 
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-600 p-2 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {loginError && <p className="text-red-500 font-bold text-sm uppercase">{t.loginError}</p>}
                  <button className="w-full bg-orange-600 text-white py-4 rounded-2xl font-black shadow-lg hover:bg-orange-700 transition-all">
                    {t.login}
                  </button>
                </form>
                <button onClick={() => setView('home')} className="mt-6 text-gray-400 font-bold uppercase text-[10px] tracking-widest">{t.back}</button>
              </div>
            ) : (
              <div className="space-y-8 pb-12">
                <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-orange-100 flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-orange-600 p-3 rounded-2xl shadow-lg"><Settings className="text-white w-6 h-6" /></div>
                    <div>
                      <h2 className="text-3xl font-black text-gray-900 tracking-tight">{t.adminPanel}</h2>
                      <p className="text-gray-400 text-sm">{products.length} товар тизмеде бар</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={() => setEditingProduct({ name: '', price: 0, category: 'Кургатылган жемиштер', unit: 'кг', image: '', description: '' })} className="bg-green-600 text-white px-6 py-3 rounded-xl font-black shadow-lg hover:bg-green-700 transition-all flex items-center gap-2 active:scale-95">
                      <PlusCircle className="w-5 h-5" /> {t.add}
                    </button>
                    <button onClick={() => { setIsAdminLoggedIn(false); setView('home'); }} className="bg-gray-100 text-red-500 px-6 py-3 rounded-xl font-black hover:bg-red-50 transition-all flex items-center gap-2">
                      <LogOut className="w-5 h-5" /> {t.logout}
                    </button>
                  </div>
                </div>

                {/* Edit/Add Form */}
                {editingProduct && (
                  <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl border-4 border-orange-100 animate-fade-in relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-2 h-full bg-orange-600"></div>
                    <div className="flex items-center justify-between mb-8">
                       <h3 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                         {editingProduct.id ? <Edit3 className="text-orange-600" /> : <PlusCircle className="text-green-600" />}
                         {editingProduct.id ? t.edit : t.add}
                       </h3>
                       <button onClick={() => setEditingProduct(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X /></button>
                    </div>
                    
                    <form onSubmit={handleSaveProduct} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-5">
                        <div className="space-y-1">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{t.prodName}</label>
                          <input className="w-full p-4 rounded-xl border bg-gray-50 text-gray-900 focus:bg-white focus:ring-2 focus:ring-orange-300 outline-none transition-all" value={editingProduct.name} onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{t.prodPrice}</label>
                            <input type="number" className="w-full p-4 rounded-xl border bg-gray-50 text-gray-900 focus:bg-white focus:ring-2 focus:ring-orange-300 outline-none transition-all" value={editingProduct.price} onChange={e => setEditingProduct({...editingProduct, price: Number(e.target.value)})} required />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{t.prodUnit}</label>
                            <select className="w-full p-4 rounded-xl border bg-gray-50 text-gray-900 focus:bg-white focus:ring-2 focus:ring-orange-300 outline-none transition-all" value={editingProduct.unit} onChange={e => setEditingProduct({...editingProduct, unit: e.target.value})}>
                              <option value="кг">кг</option>
                              <option value="шт">шт</option>
                              <option value="пачка">пачка</option>
                            </select>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{t.prodCat}</label>
                          <select className="w-full p-4 rounded-xl border bg-gray-50 text-gray-900 focus:bg-white focus:ring-2 focus:ring-orange-300 outline-none transition-all" value={editingProduct.category} onChange={e => setEditingProduct({...editingProduct, category: e.target.value})}>
                            <option value="Кургатылган жемиштер">Кургатылган жемиштер</option>
                            <option value="Жаңгактар">Жаңгактар</option>
                            <option value="Таттуулар">Таттуулар</option>
                            <option value="Mix">Mix</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="space-y-5">
                        <div className="space-y-1">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{t.prodImg}</label>
                          <div className="relative">
                            <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input className="w-full p-4 pl-12 rounded-xl border bg-gray-50 text-gray-900 focus:bg-white focus:ring-2 focus:ring-orange-300 outline-none transition-all" placeholder="https://..." value={editingProduct.image} onChange={e => setEditingProduct({...editingProduct, image: e.target.value})} required />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{t.prodDesc}</label>
                          <textarea className="w-full p-4 rounded-xl border bg-gray-50 text-gray-900 focus:bg-white focus:ring-2 focus:ring-orange-300 outline-none h-32 resize-none transition-all" value={editingProduct.description} onChange={e => setEditingProduct({...editingProduct, description: e.target.value})}></textarea>
                        </div>
                        
                        {editingProduct.image && (
                          <div className="p-4 bg-gray-100 rounded-2xl flex items-center gap-4">
                             <img src={editingProduct.image} className="w-16 h-16 rounded-lg object-cover shadow-sm" alt="Preview" onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=No+Image'; }} />
                             <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t.preview}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="md:col-span-2 flex gap-4 pt-4">
                        <button type="submit" className="flex-1 bg-orange-600 text-white py-4 rounded-xl font-black shadow-xl hover:bg-orange-700 transition-all flex items-center justify-center gap-2">
                          <Save className="w-5 h-5" /> {t.save}
                        </button>
                        <button type="button" onClick={() => setEditingProduct(null)} className="flex-1 bg-gray-100 text-gray-500 py-4 rounded-xl font-black hover:bg-gray-200 transition-all">
                          {t.cancel}
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Manage Products List */}
                <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-orange-100">
                  <div className="p-6 border-b border-gray-100 flex items-center gap-3">
                    <Package className="text-orange-600" />
                    <h3 className="text-xl font-black text-gray-900">{t.manageProducts}</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[600px]">
                      <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                          <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Товар</th>
                          <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Категория</th>
                          <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Баасы</th>
                          <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Аракеттер</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {products.map(p => (
                          <tr key={p.id} className="hover:bg-orange-50/30 transition-colors group">
                            <td className="px-8 py-5">
                              <div className="flex items-center gap-4">
                                <img src={p.image} className="w-12 h-12 rounded-xl object-cover ring-2 ring-gray-100 shadow-sm" alt={p.name} />
                                <span className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors">{p.name}</span>
                              </div>
                            </td>
                            <td className="px-8 py-5">
                              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest bg-gray-100 px-3 py-1 rounded-full">{p.category}</span>
                            </td>
                            <td className="px-8 py-5">
                              <span className="font-black text-gray-900">{p.price} {t.som}</span>
                              <span className="text-[10px] text-gray-400 block">/ 1 {p.unit}</span>
                            </td>
                            <td className="px-8 py-5">
                              <div className="flex justify-center gap-3">
                                <button onClick={() => setEditingProduct({ ...p })} className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                                  <Edit3 className="w-4 h-4" />
                                </button>
                                <button onClick={() => deleteProduct(p.id)} className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* FOOTER SECTION */}
      <footer className="bg-white border-t border-orange-100 pt-16 pb-24 sm:pb-16 mt-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-orange-600 p-2 rounded-xl"><Store className="text-white w-5 h-5" /></div>
              <h4 className="text-xl font-black">{t.shopName}</h4>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">{t.footerText}</p>
            <div className="flex gap-4">
              <a href="https://instagram.com/nabiev4989" target="_blank" rel="noopener noreferrer" className="p-3 bg-orange-50 text-orange-600 rounded-full hover:bg-orange-600 hover:text-white transition-all"><Instagram className="w-5 h-5" /></a>
              <a href={`https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}`} target="_blank" rel="noopener noreferrer" className="p-3 bg-orange-50 text-orange-600 rounded-full hover:bg-orange-600 hover:text-white transition-all"><MessageCircle className="w-5 h-5" /></a>
              <a href={`tel:${WHATSAPP_NUMBER}`} className="p-3 bg-orange-50 text-orange-600 rounded-full hover:bg-orange-600 hover:text-white transition-all"><Phone className="w-5 h-5" /></a>
            </div>
          </div>
          
          <div className="space-y-6">
            <h5 className="font-black uppercase tracking-widest text-xs text-orange-600">{t.contacts}</h5>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="text-gray-400 w-5 h-5 mt-1" />
                <p className="text-gray-600 text-sm">{t.addressVal}</p>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="text-gray-400 w-5 h-5 mt-1" />
                <p className="text-gray-600 text-sm">{WHATSAPP_NUMBER}</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h5 className="font-black uppercase tracking-widest text-xs text-orange-600">{t.workingHours}</h5>
            <div className="flex items-start gap-3">
              <Clock className="text-gray-400 w-5 h-5 mt-1" />
              <p className="text-gray-600 text-sm">{t.hoursVal}</p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-xs font-bold uppercase tracking-widest">
          <p>© 2026 {t.shopName}. {t.rights}.</p>
          <div className="flex gap-8">
            <button onClick={() => setView('home')} className="hover:text-orange-600 transition-colors uppercase">{t.catalog}</button>
            <button onClick={() => setView('profile')} className="hover:text-orange-600 transition-colors uppercase">{t.adminLogin}</button>
          </div>
        </div>
      </footer>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setIsCartOpen(false)}></div>
          <div className="w-full max-w-md bg-white h-full shadow-2xl relative flex flex-col animate-slide-in">
            <div className="p-8 border-b flex items-center justify-between sticky top-0 bg-white z-10">
              <div className="flex items-center gap-3">
                 <div className="bg-orange-100 p-2.5 rounded-2xl"><ShoppingCart className="text-orange-600 w-6 h-6" /></div>
                 <h3 className="text-2xl font-black text-gray-900 tracking-tight">{t.cart}</h3>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="p-3 hover:bg-orange-50 rounded-full transition-colors text-gray-400 hover:text-gray-900"><X /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-4">
                  <div className="w-32 h-32 bg-orange-50 rounded-full flex items-center justify-center mb-6">
                    <ShoppingCart className="w-16 h-16 text-orange-200" />
                  </div>
                  <p className="font-black text-xl text-gray-900 mb-2">{t.cartEmpty}</p>
                  <button onClick={() => setIsCartOpen(false)} className="bg-orange-600 text-white px-8 py-4 rounded-xl font-black shadow-lg mt-4">{t.chooseItems}</button>
                </div>
              ) : cart.map(item => (
                <div key={item.id} className="flex gap-4 group animate-fade-in">
                  <img src={item.image} className="w-20 h-20 rounded-xl object-cover shadow-sm ring-1 ring-gray-100" alt={item.name} />
                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-gray-900 truncate mb-1">{item.name}</h5>
                    <p className="text-orange-600 font-black mb-2">{item.price} {t.som}</p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
                        <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-orange-50"><Minus className="w-3 h-3"/></button>
                        <span className="w-8 text-center font-black text-sm">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-orange-50"><Plus className="w-3 h-3"/></button>
                      </div>
                      <span className="font-black text-gray-900 text-sm">{item.price * item.quantity} {t.som}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {cart.length > 0 && (
              <div className="p-8 border-t bg-gray-50 space-y-4 rounded-t-3xl">
                <div className="flex justify-between items-center">
                  <span className="font-black text-gray-400 uppercase tracking-widest text-[10px]">{t.total}</span>
                  <span className="text-3xl font-black text-orange-600">{totalAmount} {t.som}</span>
                </div>
                <button onClick={() => { setView('checkout'); setIsCartOpen(false); }} className="w-full bg-orange-600 text-white py-5 rounded-2xl font-black shadow-2xl hover:bg-orange-700 transition-all text-lg">
                  {t.checkout}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-orange-100 px-8 py-4 flex justify-around items-center z-40 sm:hidden">
        <button onClick={() => setView('home')} className={`p-3 rounded-2xl transition-all ${view === 'home' ? 'text-orange-600 bg-orange-50 scale-110' : 'text-gray-400'}`}>
          <Store className="w-6 h-6" />
        </button>
        <button onClick={() => setIsCartOpen(true)} className="relative bg-orange-600 text-white p-5 rounded-full -mt-10 shadow-2xl border-4 border-white active:scale-90 transition-all">
          <ShoppingCart className="w-7 h-7" />
          {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-full">{cart.length}</span>}
        </button>
        <button onClick={() => setView('profile')} className={`p-3 rounded-2xl transition-all ${view === 'profile' || view === 'admin' ? 'text-orange-600 bg-orange-50 scale-110' : 'text-gray-400'}`}>
          <User className="w-6 h-6" />
        </button>
      </nav>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
        .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
        .animate-slide-in { animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-float { animation: float 5s ease-in-out infinite; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default App;
