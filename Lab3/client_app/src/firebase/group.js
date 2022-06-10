
import { firestore } from "./init";
import {collection, addDoc, Timestamp, query, where, getDocs, deleteDoc, updateDoc } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid';

export const addGroup= async (content) => {
    try {
        await addDoc(collection(firestore, 'groups'), {
            uid: uuidv4(),
            content: content,
            completed: false,
            created: Timestamp.now()
        });
    } catch (err) {
        console.log({err});
    }
}

export const getUsersGroups = async (user) => {
    const q = query(collection(firestore, "groups"),
        where("content.email", "==", user.email));
    const groups = [];
    try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            groups.push({content: doc.data().content, uid: doc.data().uid});
        });
    } catch (err) {
        console.log({err});
    }

    return groups;
}

export const getGroupByUID = async (uid) => {
    const q = query(collection(firestore, "groups"),
        where("uid", "==", uid));
    const groups = [];
    try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            groups.push({content: doc.data().content, uid: doc.data().uid});
        });
    } catch (err) {
        console.log({err});
    }

    console.log("GetByUid",groups);

    return groups;
}

export const getAllGroups = async () => {
    const q = query(collection(firestore, "groups"));
    const groups = [];
    try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            groups.push({content: doc.data().content, uid: doc.data().uid});
        });
    } catch (err) {
        console.log({err});
    }

    return groups;
}

export const updateGroupByUID = async (uid,group) => {
    const q = query(collection(firestore, "groups"),
        where("uid", "==", uid));
    try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            updateDoc(doc.ref,{content: group});
        });
    } catch (err) {
        console.log({err});
    }

    return [];
}

export const delGroup = async (uid) => {
    const q = query(collection(firestore, "groups"),
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