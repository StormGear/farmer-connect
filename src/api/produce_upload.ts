import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { app, db } from "./user_auth";
import {  arrayUnion,  doc,  getDoc,  setDoc, addDoc, collection, where, query, getDocs } from "firebase/firestore";
import { Produce } from "@/global";
import toast from "react-hot-toast";

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);




/**
 * The function `uploadProduceImage` uploads a file to Firebase storage, retrieves the download URL,
 * and stores it in Firestore for a specific user.
 * @param {File} file - The `file` parameter in the `uploadProduceImage` function is of type `File`,
 * which represents a file from the user's system that needs to be uploaded. It contains information
 * about the file such as its name, size, type, and content.
 * @param {string} userId - The `userId` parameter in the `uploadProduceImage` function is a string
 * that represents the unique identifier of the user who is uploading the produce image. This
 * identifier is used to create a specific path in the storage bucket to store the image and also to
 * associate the image with the user in the
 * @returns The function `uploadProduceImage` returns an object with two properties: `success` and
 * `message`. If the file upload is successful, it returns `{ success: true, message: 'File uploaded
 * successfully' }`. If there is an error during the upload process, it returns `{ success: false,
 * message: 'Error uploading file: [error message]' }`.
 */
export const uploadProduceImage = async (file: File, userId: string) => {
    try {
            const produceRef = ref(storage, `produce_images/${userId}/${file.name}`);
            console.log('produceRef', produceRef.fullPath);

            uploadBytes(produceRef, file).then((snapshot) => {
                console.log('snapshot', snapshot);
                // Get the download URL
                getDownloadURL(snapshot.ref).then(async (downloadURL) => {
                console.log('File available at', downloadURL);
                // Store the download URL in Firestore
                await setDoc(doc(db, "produce", userId), {
                images: arrayUnion(downloadURL)
                }, { merge: true });

    });
});

    return {
        success: true,
        message: `File uploaded successfully`,
    }
} catch (error) {
    console.error('Error uploading file:', error);
    return {
        success: false,
        message: `Error uploading file: ${error}`,
    }
}
}


/**
 * The function `uploadProduce` uploads produce information to a Firestore database and returns a
 * success message or an error message.
 * @param {Produce} produce - The `uploadProduce` function is designed to upload produce information to
 * a Firestore database. The `produce` parameter is an object that contains the following properties:
 * @returns The function `uploadProduce` returns an object with two properties:
 * - `success`: A boolean value indicating whether the produce was uploaded successfully or not.
 * - `message`: A string message providing information about the outcome of the upload operation.
 */
export const uploadProduce = async (produce: Produce) => {
    try {
        const produceRef = collection(db, "produce");``
        // create a new document or update the existing one
        await addDoc(produceRef, {
            user_id: produce.user_id,
            produce_name: produce.produce_name,
            produce_description: produce.produce_description,
            price: produce.price,
            upload_date: new Date(),
        });
       

        return {
            success: true,
            message: `Produce uploaded successfully`,
        }
    } catch (error) {
        console.error('Error uploading produce:', error);
        return {
            success: false,
            message: `Error uploading produce: ${error}`,
        }
    }
}

export const getAllProduceItems = async () => {
    try {
        const docRef = collection(db, "produce");
        const querySnapshot = await getDocs(docRef);
        if (querySnapshot.empty) {
            console.log("No such document!");
            return {
                success: true,
                message: `No such document!`,
            }
        }

        return {
            success: true,
            message: `File retrieved successfully`,
            data: querySnapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data(),
                };
            }),
        };
    }
    catch (error) {
        console.error('Error retrieving file:', error);
        toast.error("Error retrieving file: " + error);
        return {
            success: false,
            message: `Error retrieving file: ${error}`,
        }
    }
}

export const getProduceItemsFromFirestore = async (userId: string) => {
    try {
        const docRef = collection(db, "produce");
       const q = query(docRef, where("user_id", "==", `${userId}`));
          const querySnapshot = await getDocs(q);
          if (querySnapshot.empty) {
            console.log("No such document!");
            return {
                success: true,
                message: `No such document!`,
            }
          }
         
            return {
                success: true,
                message: `File retrieved successfully`,
                data: querySnapshot.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data(),
                    };
                }),
            }

          
    } catch (error) {
        console.error('Error retrieving file:', error);
        toast.error("Error retrieving file: " + error);
        return {
            success: false,
            message: `Error retrieving file: ${error}`,
        }
    }
}

export const deleteProduceImage = async (userId: string, imageUrl: string) => {
    try {
        const docRef = doc(db, "produce", userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            const images = docSnap.data().images;
            const newImages = images.filter((image: string) => image !== imageUrl);
            await setDoc(docRef, {
                images: newImages,
            });
            return {
                success: true,
                message: `File deleted successfully`,
            }
        } else {
            console.log("No such document!");
            return {
                success: false,
                message: `No such document!`,
            }
        }
    } catch (error) {
        console.error('Error deleting file:', error);
        return {
            success: false,
            message: `Error deleting file: ${error}`,
        }
    }
}





