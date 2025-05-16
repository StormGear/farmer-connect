import  { useEffect, useState } from "react";;
import { IoArrowBackCircle } from "react-icons/io5";
import { GiConfirmed } from "react-icons/gi";
import { MdRemoveShoppingCart } from "react-icons/md";
import { IoFastFoodSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { Button as RadixButton, Spinner } from '@radix-ui/themes' 
import { AlertDialog, Flex } from '@radix-ui/themes';
import Tooltip from '@mui/material/Tooltip';
import { useCart } from "@/context/CartProvider";
import { useUser } from "@/context/UserProvider";
import { Link } from "react-router-dom";
import CartItemCard from "./CartItemCard";
import Navigation from "../Navigation";
import { Transaction } from "@coinbase/onchainkit/transaction";
import '@coinbase/onchainkit/styles.css'; 


const Cart = () => {
  // const {  cartItems, totalCost, setTotalCost, clearCart, setCartItems, placeOrder } = useContext(CartContext);
  const {  totalCost, getCartItems, cart } = useCart();
  const { user } = useUser();
  const [loadingStateForClearCart] = useState({ loading: false, error: '', success: '' });
  const [loadingState] = useState({ loading: false, error: '', success: '' });

  


  useEffect(() => {
    // Fetch data when the component mounts
    const fetchCartItems = async () => {
      try {
        const userId = user?.id ?? "";
        const response = await getCartItems(userId);
        if (response.success) {
          console.log("Fetched cart items successfully!!!");
        } else {
          console.error("Error fetching cart items:", response.message);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

  fetchCartItems();
  }, [])

  // const handleClearCart = async (item: CartItem) => {
  //   try {
  //     setLoadingStateForClearCart({ loading: true, error: '', success: '' });
  //     const response = await clearCart(item);
  //     if (response.success) {
  //       toast.success('Cart cleared successfully')
  //       setCartItems([]);
  //       setTotalCost(0);
        
  //     } else {
  //       // dispatchForClearCart({ type: 'ERROR', payload: response.message });
  //       console.error("Error clearing cart:", response.message);
  //       toast.error("Error clearing cart:", response.message)
  //     }
  //   } catch (error) {
  //     // dispatchForClearCart({ type: 'ERROR', payload: error.message });
  //     console.error("Error clearing cart:", error);
  //     toast.error("Error clearing cart: " + error)
  //   }
  // }

  // const handlePlaceOrder = async (user: User, total_cost: number) => {
  //   try {
  //     console.log(`Placing order for user with id  ${user?.id} and total amout ${total_cost}`)
  //     setLoadingState({ loading: true, error: '', success: '' });

  //     const response = await placeOrder(user?.id, total_cost);
  //     if (response.success) {
  //       setCartItems([]);
  //       setTotalCost(0);
  //       // dispatch({ type: 'SUCCESS' });
  //       toast.success('Order placed successfully')
  //     } else {
  //       // dispatch({ type: 'ERROR', payload: response.message });
  //       console.error("Error placing order response.message:", response.message);
  //       toast.error("Error placing order response.message:", response.message)
  //     }
  //   } catch (error) {
  //     console.error("Error placing order catch block:", error);
  //     toast.error("Error placing order catch block: " + error)
  //   }
  // }




  return (
    <>
    <Navigation />
    <div className="p-4 mt-4">
        <h2 className="text-2xl font-bold !text-[#3b7d4a] mt-5">Your Cart</h2>
         <div className="flex mt-5">
          <Link to={`/products/${user?.id}`} className="text-primary-color text-2xl font-bold">
            <IoArrowBackCircle className='text-primary-color text-2xl' />
          </Link>
          
        </div>
      {cart.length === 0 ? (
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

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {cart.map((item, index) => {
    console.log(`cart item at ${index}`, item)
     return <CartItemCard key={item.id} produceItem={item} />
  })}
</div>
          <div className="mt-4">
            <p className="font-semibold">
              Total: GH₵ {totalCost}
            </p>
            <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
              <div
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
          
              </div>

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
                { loadingState.loading ? <Spinner /> : <PlaceOrderButton />}
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
    </>
  );
};


const PlaceOrderButton = () => {
    const calls: any[] = [];
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
				{/* <RadixButton variant="solid" color="green" onClick={placeOrderHandler}>
					Yes
				</RadixButton> */}
          <Transaction calls={calls} />
			</AlertDialog.Action>
		</Flex>
	</AlertDialog.Content>
</AlertDialog.Root>
  </div>
  )
}

export default Cart;