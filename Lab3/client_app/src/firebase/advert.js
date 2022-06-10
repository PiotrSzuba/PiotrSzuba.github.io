
import { firestore } from "./init";
import {collection, addDoc, Timestamp, query, where, getDocs, deleteDoc, updateDoc } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid';

export const addAdvert= async (content) => {
    try {
        await addDoc(collection(firestore, 'adverts'), {
            uid: uuidv4(),
            content: content,
            completed: false,
            created: Timestamp.now()
        });
    } catch (err) {
        console.log({err});
    }
}

export const getUsersAdverts = async (user) => {
    const q = query(collection(firestore, "adverts"),
        where("content.email", "==", user.email));
    const adverts = [];
    try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            adverts.push({content: doc.data().content, uid: doc.data().uid});
        });
    } catch (err) {
        console.log({err});
    }

    return adverts;
}

export const updateAdvertByUID = async (uid,advert) => {
    const q = query(collection(firestore, "adverts"),
        where("uid", "==", uid));
    try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            updateDoc(doc.ref,{content: advert});
        });
    } catch (err) {
        console.log({err});
    }

    return [];
}

export const getAdvertByUID = async (uid) => {
    const q = query(collection(firestore, "adverts"),
        where("uid", "==", uid));
    const adverts = [];
    try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            adverts.push({content: doc.data().content, uid: doc.data().uid});
        });
    } catch (err) {
        console.log({err});
    }

    return adverts;
}

export const getAllAdverts = async () => {
    const q = query(collection(firestore, "adverts"));
    const adverts = [];
    try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            adverts.push({content: doc.data().content, uid: doc.data().uid});
        });
    } catch (err) {
        console.log({err});
    }

    return adverts;
}

export const delAdvert = async (uid) => {
    const q = query(collection(firestore, "adverts"),
        where("uid", "==", uid));
    try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            deleteDoc(doc.ref);
        });
    } catch (err) {
        console.log({err});
    }

    return [];
}