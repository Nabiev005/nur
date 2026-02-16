
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  image: string;
  description: string;
  packaging: string[];
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  deliveryType: 'delivery' | 'pickup';
  paymentMethod: 'cash' | 'mbank' | 'omoney';
  customer: {
    name: string;
    phone: string;
    address?: string;
  };
  status: 'pending' | 'processing' | 'delivered';
  createdAt: string;
}

export type Category = 'Кургатылган жемиштер' | 'Жаңгактар' | 'Таттуулар' | 'Mix';
