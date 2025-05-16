<<<<<<< HEAD
=======

>>>>>>> refs/remotes/origin/main
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
<<<<<<< HEAD
  }
=======
  }

  export type CartContextType = {
    cartItems: CartItem[];
    setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
    addToCart: (item: CartItem) => Promise<{
            success: boolean;
            message: string,
          }>;
    removeCartItem: (item: any) => Promise<any>;
    clearCart: (item: any) => Promise<any>;
    totalCost: number;
    setTotalCost: React.Dispatch<React.SetStateAction<number>>;
    placeOrder: (userId: string, total_cost: number) => Promise<any>;
    getProduceItems: (userId: string) => Promise<any>;
    produceItems: ProduceItem[];
    cart: ProduceItem[];
    setCart: React.Dispatch<React.SetStateAction<ProduceItem[]>>;
    getCartItems: (userId: string) => Promise<any>;
  };


export type CartItem = {
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
>>>>>>> refs/remotes/origin/main
