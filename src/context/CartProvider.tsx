import  { useState,  createContext, useContext, ReactNode } from "react";
import { CartContextType, CartItem, ProduceItem } from "@/global";
import { getProduceItemsFromFirestore } from "@/api/produce_upload";
import { addToCartInFirebase, getCartItemsFromFirestore } from "@/api/cart_management";
import { useUser } from "@/context/UserProvider";





export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cart, setCart] = useState<ProduceItem[]>([]);
  const [produceItems, setProduceItems] = useState<ProduceItem[]>([]);
  const [totalCost, setTotalCost] = useState(0);
  const { user } = useUser();


  const getCartItems = async (userId: string) => {
    try {
      const response = await getCartItemsFromFirestore(userId);
      if (!response.success) {
        console.error('Error fetching cart items:', response.message);
        return {
          success: false,
          message: `error fetching cart items: ${response.message}`,
        };
      }

      console.log('cart produce items', response.data);
      // pack the produce items into an array
      const cartproduceItemsArray = response.data?.map((item: any) => ({
        id: item.id,
        user_id: item.user_id,
        produce_name: item.produce_name,
        produce_description: item.produce_description,
        price: item.price,
        upload_date: item.upload_date,
        images: item.images,
      }));
      setCart(cartproduceItemsArray ?? []);

      


      console.log('cart items got from firebase and saved in state', cart);
      return {
        success: true,
        message: `cart items fetched successfully`,
      };
    
    } catch (error) {
      console.error('Error fetching cart items:', error);
      return {
        success: false,
        message: `error fetching cart items: ${error}`,
      };
    }
  }

  const getProduceItems = async (userId: string) => {
    try {
      const response = await getProduceItemsFromFirestore(userId);
      console.log('response', response.data)
      if (!response.success) {
        console.error('Error fetching produce items:', response.message);
        return {
          success: false,
          message: `error fetching produce items: ${response.message}`,
        };
      }

      
      console.log('produce items', response.data);
      // pack the produce items into an array
      const produceItemsArray = response.data?.map((item: any) => ({
        id: item.id,
        user_id: item.user_id,
        produce_name: item.produce_name,
        produce_description: item.produce_description,
        price: item.price,
        upload_date: item.upload_date,
        images: item.images,
      }));
      setProduceItems(produceItemsArray ?? []);

      return {
        success: true,
        message: `produce items fetched successfully`,
      };
    
    }
    catch (error) {
      console.error('Error fetching produce items:', error);
      return {
        success: false,
        message: `error fetching produce items: ${error}`,
      };
    }
  };

  // Add to the cart context, after successful db addition
  const addToCart = async (item: CartItem) => {
    console.log('input item', item);
    try {
        const response = await addToCartInFirebase(item, user);
        if (!response.success) {
          console.error('Error adding cart item:', response.message);
          return {
            success: false,
            message: `error adding cart item: ${response.message}`,
          };
        }
        console.log('cart item added successfully');
        // setCartItems
        setCartItems((prevItems) => [...prevItems, item]);
        console.log('cart items', cartItems);
        // TODO: update the total cost
        // setTotalCost((prevCost) => prevCost + item.price);
        console.log('total cost', totalCost);
        return {
          success: true,
          message: `cart item added successfully`,
        }
    } catch (error) {
        console.error('Error adding cart item:', error);
        return {
          success: false,
          message:  `Error adding cart item: ${error}`,
        }

    }
  }




  const placeOrder = async (userId : string) => {
    console.log('user with Id',  userId);
    try {
      // let response;
      // console.log(`placing order for ${userId} at total cost of ${total_cost} from cart`)

      //   response = await axios.put(`/api/orders/add-order`, {
      //     user_id: userId,
      //     total_amount: total_cost
      //   });
        // return {
        //   success: 'success',
        //   quantity: response.data.order_id
        // }
    } catch (error) {
     
        return {
          error: 'error',
          message:  "error.message"
        }

      
    }   
  }


  const removeCartItem = async (item: CartItem) => {
    console.log('input item', item);
    try {
      // let response;
      //   response = await axios.delete(`/api/cartitems/remove-cartitem/${item.cartitem_id}/${item.menuitem_id}`);
      //   return {
      //     success: 'success',
      //     message: response.data.message
      //   }
    } catch (error) {

        return {
          error: 'error',
          message: "error.message"
        }

      
    }
  };

  const clearCart = async () => {

    try {

      // let response;
      //   response = await axios.delete(`/api/cartitems/clear-cart/${item}`);
      //   console.log('cartitem_res', response.data)
      //   return {
      //     success: 'success',
      //   }
    } catch (error) {
     
        return {
          error: 'error',
          message:  "error.message"
        }

      
    } 
  };

  return (
    <CartContext.Provider value={{  cartItems, setCartItems, addToCart, removeCartItem, clearCart, totalCost, setTotalCost, placeOrder, getProduceItems, produceItems, cart, getCartItems, setCart }}>
      {children}
    </CartContext.Provider>
  );
};
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
export default CartProvider;