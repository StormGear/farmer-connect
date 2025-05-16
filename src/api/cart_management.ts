import { CartItem, User } from "@/global";
import { addDoc, collection, deleteDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "./user_auth";

export const addToCartInFirebase =  async (item: CartItem, user: User | null) => {
    console.log('input item', item);
    const cart_id = user?.id; // cart_id is the user id
    try {
        const cartRef = collection(db, "cart");
        const docRef = await addDoc(cartRef, {
            cart_id: cart_id,
            menuitem_id: item.menuitem_id,          
         });
        console.log('cart item written with ID: ', docRef.id);
        return {
          success: true,
          message: `Cart item added successfully`,
        }
    } catch (error) {
        return {
          success: false,
          message: `Error adding cart item: ${error}`,
        }
    }
};

export const getCartItemsFromFirestore = async (userId: string) => {
 
    try {
        const cartRef = collection(db, "cart");
        const q = query(cartRef, where("cart_id", "==", userId));
        const querySnapshot = await getDocs(q);
        const cartItems: CartItem[] = [];
        // let total_cost = 0;
        querySnapshot.forEach((doc) => {
            console.log("cart item: ", doc.id, " => ", doc.data());
            const data = doc.data();
            const item: CartItem = {
                menuitem_id: data.menuitem_id,
            };
            cartItems.push(item);
            // total_cost += 10; // Assuming each item costs 10
        });
        // pack the produce items into an array
        const collectionRef = collection(db, "produce");
        // find the document ids that match the menuitem_ids in the cart
        const menuitem_ids = cartItems.map((item) => item.menuitem_id);
        const querySnapshot2 = await getDocs(collectionRef);
      

        return {
          success: true,
          message: `Cart items fetched successfully`,
          data: querySnapshot2.docs.map((doc) => {
                 const itemId = doc.id;
                    if (menuitem_ids.includes(itemId)) {
                    return {
                        id: doc.id,
                        ...doc.data(),
                    };
                  }
                }),
        }
    }
    catch (error) {
        console.error("Error fetching cart items:", error);
        return {
          success: false,
          message: `Error fetching cart items: ${error}`,
        }
    }
};

export const placeOrder = async (total_cost: number, user: User) => {
    const userId = user?.id;
    try {
        const orderRef = collection(db, "orders");
        const docRef = await addDoc(orderRef, {
            user_id: userId,
            total_amount: total_cost,
            order_status: "pending",
            order_date: new Date(),
        });
        console.log('order written with ID: ', docRef.id);
        return {
          success: true,
          message: `Order placed successfully`,
        }
    } catch (error) {
       return {
          success: false,
          message: `Error placing order: ${error}`,
        };
    }
  }

export const removeCartItem = async (item: CartItem, user: User) => {
    const cart_id = user?.id; // cart_id is the user id
    console.log('input item', item);
    try {
    const citiesRef = collection(db, "cities");

    const q = query(citiesRef, where("cart_id", "==", cart_id), where("menuitem_id", "==", item.menuitem_id));

    // delete the document
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        deleteDoc(doc.ref);
      });
      return {
          success: true,
          message: `Cart item removed successfully`,
        }
    } catch (error) {
      return {
          success: false,
          message: `Error removing cart item: ${error}`,
        }
    }
};
    