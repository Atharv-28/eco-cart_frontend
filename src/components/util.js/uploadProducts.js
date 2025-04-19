import { collection, addDoc } from "firebase/firestore";
import { db } from "./config.js"; // Import Firestore instance from config.js
import { products } from "./products.js"; // Import the products array

// Function to upload products to Firestore
const uploadProducts = async () => {
  try {
    const productsCollection = collection(db, "products"); // Firestore collection name

    for (const product of products) {
      const docRef = await addDoc(productsCollection, product);
      console.log(`Product added with ID: ${docRef.id}`);
    }

    console.log("All products uploaded successfully!");
  } catch (error) {
    console.error("Error uploading products:", error);
  }
};

// Call the function to upload products
uploadProducts();