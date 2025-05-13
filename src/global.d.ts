
export interface User {
    id: string;
    email: string;
    role: 'farmer' | 'buyer';
    name?: string;
  }

 export interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    logout: () => void;
    isLoading: boolean;
  }

  interface InputUser extends User {
    password: string;
  }

  export type CartContextType = {
    cartItems: CartItem[];
    setCartItems: React.Dispatch<React.SetStateAction<any[]>>;
    addToCart: (item: any, newOptions: any) => Promise<any>;
    removeCartItem: (item: any) => Promise<any>;
    clearCart: (item: any) => Promise<any>;
    updateQuantity: (item: any, quantity: number) => Promise<any>;
    totalCost: number;
    setTotalCost: React.Dispatch<React.SetStateAction<number>>;
    placeOrder: (userId: string, total_cost: number) => Promise<any>;
    getProduceItems: (userId: string) => Promise<any>;
    produceItems: ProduceItem[];
  };


  export type CartItem = {
    cartitem_id: string;
    menuitem_id: string;
}

export type ProduceItem = {
    id: string;
    user_id: string;
    produce_name: string;
    produce_description: string;
    price: number;
    upload_date: Date;
    images: string[];
}

interface Produce {
    user_id: string;
    produce_name: string;
    produce_description: string;
    price: number;
}