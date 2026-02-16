import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Баткен өрүгү (Курага)',
    category: 'Кургатылган жемиштер',
    price: 450,
    unit: 'кг',
    image: 'https://www.super.kg/upload/janylyk/2024/06/soc_710455884.jpg', // Дried fruits & nuts assortment
    description: 'Баткендин бал ширин өрүгү. Табигый жол менен кургатылган.',
    packaging: ['500г', '1кг'],
    stock: 50
  },
  {
    id: '2',
    name: 'Медина курмасы (Хурма)',
    category: 'Таттуулар',
    price: 950,
    unit: 'кг',
    image: 'https://images.pexels.com/photos/31896555/pexels-photo-31896555.jpeg?auto=compress&cs=tinysrgb&w=600', // Variety dried fruits
    description: 'Ооз ачууга эң сонун жумшак жана таттуу курмалар.',
    packaging: ['1кг'],
    stock: 100
  },
  {
    id: '3',
    name: 'Греция жаңгагы (Ак)',
    category: 'Жаңгактар',
    price: 850,
    unit: 'кг',
    image: 'https://pixabay.com/get/gp4699f81f7aa92599c7f6bde0b2125db4f0cda13b2aee07809583c71d5a3e62a639cea899cb4f6f985b8d9356f29806a9_640.jpg', // Assorted nuts close-up
    description: 'Арстанбаптын атактуу жаңгагы. Жогорку сорт.',
    packaging: ['500г', '1кг'],
    stock: 30
  },
  {
    id: '4',
    name: 'Кара мейиз (Тенеке)',
    category: 'Кургатылган жемиштер',
    price: 550,
    unit: 'кг',
    image: 'https://pixabay.com/get/gf3512a9df16b1c6c139f11693e7fae6cb0daced7f4b5eeafce6c28bccdeac61c4f0ccb9cf04c4d826pbx.jpg', // Dried fruit close-up
    description: 'Витаминдерге бай, канды көбөйтүүчү таза мейиз.',
    packaging: ['500г', '1кг'],
    stock: 60
  },
  {
    id: '5',
    name: 'Инжир (Сушеный финик)',
    category: 'Таттуулар',
    price: 720,
    unit: 'кг',
    image: 'https://images.pexels.com/photos/11135641/pexels-photo-11135641.jpeg?auto=compress&cs=tinysrgb&w=600', // Reuse variety
    description: 'Пайдалуу жана жумшак кургатылган инжир.',
    packaging: ['500г', '1кг'],
    stock: 40
  },
  {
    id: '6',
    name: 'Мисте (Фисташки)',
    category: 'Жаңгактар',
    price: 1200,
    unit: 'кг',
    image: 'https://pixabay.com/get/gp4699f81f7aa92599c7f6bde0b2125db4f0cda13b2aee07809583c71d5a3e62a639cea899cb4f6f985b8d9356f29806a9_640.jpg', // Assorted nuts
    description: 'Туздалган жана куурулган даамдуу мистелер.',
    packaging: ['250г', '500г'],
    stock: 25
  },
  {
    id: '7',
    name: 'Бадам (Миндаль)',
    category: 'Жаңгактар',
    price: 1100,
    unit: 'кг',
    image: 'https://pixabay.com/get/gp4699f81f7aa92599c7f6bde0b2125db4f0cda13b2aee07809583c71d5a3e62a639cea899cb4f6f985b8d9356f29806a9_640.jpg', // Same nuts image
    description: 'Мээнин иштешине пайдалуу таза бадам.',
    packaging: ['500г', '1кг'],
    stock: 35
  },
  {
    id: '8',
    name: 'Кургатылган коон',
    category: 'Mix',
    price: 650,
    unit: 'кг',
    image: 'https://images.pexels.com/photos/31896555/pexels-photo-31896555.jpeg?auto=compress&cs=tinysrgb&w=600', // Assortment
    description: 'Жайдын даамын сактаган таттуу коон кесимдери.',
    packaging: ['300г', '1кг'],
    stock: 20
  }
];

export const WHATSAPP_NUMBER = '+996702952200';
