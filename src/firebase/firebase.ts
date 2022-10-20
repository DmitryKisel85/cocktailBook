// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, getDocs, doc, deleteDoc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { ICocktail, IUpdateCocktailProps } from "types/generalTypes";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC-4jgVWXM_xg9hQGKHLnXFQZlhZy8YBMk",
    authDomain: "cocktaildb-42ab4.firebaseapp.com",
    projectId: "cocktaildb-42ab4",
    storageBucket: "cocktaildb-42ab4.appspot.com",
    messagingSenderId: "251364030508",
    appId: "1:251364030508:web:f0ad3ea011aea38f1d7989",
    measurementId: "G-NR46X5BE48",
};

// Initialize Firebase
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export const getCocktails = async (): Promise<ICocktail[]> => {
    const collectionRef = collection(db, "cocktails");
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((docSnapshot) => docSnapshot.data() as ICocktail);
};

export const addCocktail = async (cocktail: ICocktail): Promise<void> => {
    await setDoc(doc(db, "cocktails", cocktail.id), cocktail);
};

export const removeCocktail = async (id: string): Promise<void> => {
    await deleteDoc(doc(db, "cocktails", id));
};

export const updateCocktail = async ({ id, data }: IUpdateCocktailProps): Promise<void> => {
    await setDoc(doc(db, "cocktails", id), data);
};
