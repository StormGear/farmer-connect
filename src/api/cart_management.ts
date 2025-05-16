import { CartItem, ProduceItem, User } from "@/global";
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
        const cart : ProduceItem[] = [];
        // let total_cost = 0;
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const item: CartItem = {
                menuitem_id: data.menuitem_id,
            };
            cartItems.push(item);
            // total_cost += 10; // Assuming each item costs 10
        });
        // pack the produce items into an array
        const docRef = collection(db, "produce");
        // run a  query to get the produce items given a list of ids
        const q2 = query(docRef, where("id", "in", cartItems.map((item) => item.menuitem_id)));
        const querySnapshot2 = await getDocs(q2);
        querySnapshot2.docs.map((doc) => {
            const data = doc.data();
            // pack the produce items into an array
            const item: ProduceItem = {
                id: doc.id,
                user_id: data.user_id,
                produce_name: data.produce_name,
                produce_description: data.produce_description,
                price: data.price,
                upload_date: data.upload_date,
                images: data.images,
            };
            cart.push(item);
        });

        return {
          success: true,
          message: `Cart items fetched successfully`,
          cart: cart,
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
    