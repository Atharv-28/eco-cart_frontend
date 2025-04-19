import { collection, addDoc } from "firebase/firestore";
import { db } from "./config"; // Import Firestore instance from config.js

/**
 * Upload product details to Firestore.
 * @param {Object} product - The product details to upload.
 */
export const dynamicUpload = async (product) => {
  try {
    const productsCollection = collection(db, "products"); // Firestore collection name
    const docRef = await addDoc(productsCollection, product);
    console.log(`Product uploaded successfully with ID: ${docRef.id}`);
  } catch (error) {
    console.error("Error uploading product to Firestore:", error);
  }
};