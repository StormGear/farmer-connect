import  { useEffect, useState } from "react";;
import { IoArrowBackCircle } from "react-icons/io5";
import { GiConfirmed } from "react-icons/gi";
import { MdRemoveShoppingCart } from "react-icons/md";
import toast from 'react-hot-toast';
import { IoFastFoodSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { Button as RadixButton, Spinner } from '@radix-ui/themes' 
import { AlertDialog, Flex } from '@radix-ui/themes';
import Tooltip from '@mui/material/Tooltip';
import { useCart } from "@/context/CartProvider";
import { useUser } from "@/context/UserProvider";
import { Link } from "react-router-dom";
import CartItemCard from "./CartItemCard";
import { CartItem, User } from "@/global";


const Cart = () => {
  // const {  cartItems, totalCost, setTotalCost, clearCart, setCartItems, placeOrder } = useContext(CartContext);
  const { cartItems, setCartItems, totalCost, setTotalCost, clearCart, placeOrder, getCartItems } = useCart();
  const { user } = useUser();
  const [loadingStateForClearCart, setLoadingStateForClearCart] = useState({ loading: false, error: '', success: '' });
  const [loadingState, setLoadingState] = useState({ loading: false, error: '', success: '' });


  useEffect(() => {
    // Fetch data when the component mounts
    const fetchCartItems = async () => {
      try {
        const userId = user?.id ?? "";
        const response = await getCartItems(userId);
        if (response.success) {
          console.log('cart items', response.cart);
          // setTotalCost(response.total_cost);
        } else {
          console.error("Error fetching cart items:", response.message);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

  fetchCartItems();
    return () => console.log("Cart unmounted");
  }, [])

  const handleClearCart = async (item: CartItem) => {
    try {
      // dispatchForClearCart({ type: 'LOADING' });
      const response = await clearCart(item);
      if (response.success) {
        toast.success('Cart cleared successfully')
        setCartItems([]);
        setTotalCost(0);
        
      } else {
        // dispatchForClearCart({ type: 'ERROR', payload: response.message });
        console.error("Error clearing cart:", response.message);
        toast.error("Error clearing cart:", response.message)
      }
    } catch (error) {
      // dispatchForClearCart({ type: 'ERROR', payload: error.message });
      console.error("Error clearing cart:", error);
      toast.error("Error clearing cart: " + error)
    }
  }

  const handlePlaceOrder = async (user: User, total_cost: number) => {
    try {
      console.log(`Placing order for user with id  ${user?.id} and total amout ${total_cost}`)
      // dispatch({ type: 'LOADING' });

      const response = await placeOrder(user?.id, total_cost);
      if (response.success) {
        setCartItems([]);
        setTotalCost(0);
        // dispatch({ type: 'SUCCESS' });
        toast.success('Order placed successfully')
      } else {
        // dispatch({ type: 'ERROR', payload: response.message });
        console.error("Error placing order response.message:", response.message);
        toast.error("Error placing order response.message:", response.message)
      }
    } catch (error) {
      console.error("Error placing order catch block:", error);
      toast.error("Error placing order catch block: " + error)
    }
  }




  return (
    <div className="p-4 mt-4">
      <div className='flex flex-col'> 
        <div className="flex items-center">
          <Link to={`/products/${user?.id}`} className="text-primary-color text-2xl font-bold">
            <IoArrowBackCircle className='text-primary-color text-2xl' />
          </Link>
           <div className="flex items-center text-2xl font-bold !text-[#3b7d4a] ml-5">
            <i className="fas fa-leaf !text-[#72b01d] !mr-2"></i> FarmConnect
          </div>
        </div>
        <h2 className="text-2xl my-5 font-bold !text-[#3b7d4a]">Your Cart</h2>
      </div>
      
      {cartItems.length === 0 ? (
        <div className="flex flex-col justify-center items-center min-h-full">
        <div> <MdRemoveShoppingCart className="text-primary-color text-8xl my-10" /> </div>
        <p className="mb-4 text-secondary-color font-extrabold">Your cart is empty.</p>
        <Link
                to={`/products/${user?.id}`}
                className="text-white px-4 py-2 my-2 rounded max-w-max"
              >
                <span className="inline-flex items-center">
                  <IoArrowBackCircle className='text-primary-color text-2xl' /> 
                  <p className="text-primary-color mx-4">Back to Menu</p>
                </span>
        </Link>
        <Link
                to={`/products/${user?.id}/orders`}
                className="text-white px-4 py-2 my-2 rounded max-w-max"
              >
                <span className="inline-flex items-center">
                  <IoFastFoodSharp className='text-primary-color text-2xl' />
                  <p className="text-primary-color mx-4">View Your Orders</p>
                </span>
        </Link>
      </div>
      ) : (
        <>
          <ul className="divide-y">
            {cartItems.map((item, index) => {
              console.log(`cart item at ${index}`, item)
               return <CartItemCard key={item.menuitem_id} cartItem={item} />
            }
              
            
            )}
          </ul>
          <div className="mt-4">
            <p className="font-semibold">
              Total: GH₵ {totalCost}
            </p>
            <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
              <button
                // onClick={() => handleClearCart(user?.id)}
                className="flex items-center" 
              >
                {
                  <>
                  <div className="flex items-center">
                    <RadixButton color="red"> 
                   { loadingStateForClearCart.loading ? <Spinner /> : <p className="flex items-center font-bold"> <MdDelete className="text-white text-xl" /> Clear Cart</p> }
                      </RadixButton>
                  </div>
                 </>
                }
          
              </button>

              <Link
                to={`/products/${user?.id}`}
                className="text-white px-4 py-2 my-2 rounded max-w-max"
              >
                <span className="inline-flex items-center">
                  <IoArrowBackCircle className='text-primary-color text-xl' /> 
                  <p className="text-primary-color mx-4 font-bold">Back to Menu</p>
                </span>
              </Link>
              
              {/* <button
                className="bg-secondary-color text-white px-4 py-2 my-2 rounded max-w-max"
              > */}
                { loadingState.loading ? <Spinner /> : <PlaceOrderButton placeOrderHandler={() => console.log("Place Order")} />}
              {/* </button> */}
            </div>
            <div className="flex justify-end">
              {loadingState.loading && <p className="text-blue-500 font-bold">Placing order...</p>}
              {loadingState.error && <p className="text-red-500 font-bold">{loadingState.error}</p>}
              {loadingState.success && <p className="text-green-500 font-bold">{loadingState.success}</p>}
            </div>
          </div>
        </>
      )}
    </div>
  );
};


const PlaceOrderButton = ({ placeOrderHandler }: { placeOrderHandler: () => void }) => {
  return (
    <div>
  <AlertDialog.Root>
	<AlertDialog.Trigger>
  <Tooltip title="Place Your Order" arrow>
           <p className="flex items-center">    
      <RadixButton color="green">
        <p className="font-bold">Place Order</p>
      <GiConfirmed className="text-white text-lg ml-2" />
      </RadixButton> </p>
  </Tooltip>
	</AlertDialog.Trigger>
	<AlertDialog.Content maxWidth="450px">
		<AlertDialog.Title >Place An Order</AlertDialog.Title>
		<AlertDialog.Description size="2">
			Are you ready to place this order?
		</AlertDialog.Description>

		<Flex gap="3" mt="4" justify="end">
			<AlertDialog.Cancel>
				<RadixButton variant="soft" color="gray">
					Cancel
				</RadixButton>
			</AlertDialog.Cancel>
			<AlertDialog.Action>
				<RadixButton variant="solid" color="green" onClick={placeOrderHandler}>
					Yes
				</RadixButton>
			</AlertDialog.Action>
		</Flex>
	</AlertDialog.Content>
</AlertDialog.Root>

    </div>
  )
}

export default Cart;