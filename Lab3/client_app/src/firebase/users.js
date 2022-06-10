import { auth, firestore } from "./init";
import { getDoc, setDoc, updateDoc, doc } from 'firebase/firestore'
import {
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithPopup,
    signOut,
} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const logInWithGoogle = async () => {
    try {
        const response = await signInWithPopup(auth, googleProvider);

        const user = response.user;
        const q = doc(firestore, "googleUsers", user.uid);
        const docs = await getDoc(q);
        if ( ! docs.exists()) {
            await setDoc(q, {
                name: user.displayName,
                authProvider: "google",
                email: user.email,
                image: user.photoURL,
                bookmarkAdverts: [],
                bookmarkGroups: [],
                roles: ["admin", "user"]
            });
        }

    } catch (err) {
        console.error({err});
    }
};

export const logInWithGithub = async () => {
    try {
        const response = await signInWithPopup(auth, githubProvider);

        const user = response.user;
        const q = doc(firestore, "githubUsers", user.uid);
        const docs = await getDoc(q);
        if ( ! docs.exists()) {
            await setDoc(q, {
                name: user.displayName,
                authProvider: "github",
                email: user.email,
                image: user.photoURL,
                bookmarkAdverts: [],
                bookmarkGroups: [],
                roles: ["admin", "user"]
            });
        }

    } catch (err) {
        console.error({err});
    }
};

const getUsersDoc = async (user) => {
    const googleDoc = doc(firestore,"googleUsers",user.uid);
    const githubDoc = doc(firestore,"githubUsers",user.uid);
    const googleDocs = await getDoc(googleDoc);
    const githubDocs = await getDoc(githubDoc);

    if(googleDocs.exists()){
        return googleDocs;
    }
    if(githubDocs.exists()){
        return githubDocs;
    }
    console.log("Error user not found.")

    return undefined;
}

const getCleanArray = (dirtyArray) => {
    let cleanArray = []
    if(dirtyArray === undefined){
        return cleanArray;
    }
    dirtyArray.forEach(element => {
        cleanArray.push(element.stringValue);
    });

    return cleanArray;
}

export const getUsersAdvertBookmarks = async (user) => {
    const docs = await getUsersDoc(user)
    if(docs === undefined){
        return;
    }  
    try {
        let dirtybookmarks = docs._document.data.value.mapValue.fields.bookmarkAdverts.arrayValue.values;

        return getCleanArray(dirtybookmarks);
        
    } catch (err) {
        console.log({err});
    }    
}

export const getUsersAdvertBookmark = async (user,uid) => {
    const docs = await getUsersDoc(user)
    if(docs === undefined){
        return;
    }
    try {
        let dirtybookmarks = docs._document.data.value.mapValue.fields.bookmarkAdverts.arrayValue.values;
        let bookmarks = getCleanArray(dirtybookmarks);
        const found = bookmarks.find(element => element === uid);
        if(found){
            return true;

        }else{
            return false;
        }
    } catch (err) {
        console.log({err});
    }
}

export const addAdvertBookmark = async (user,uid) => {
    const docs = await getUsersDoc(user)
    if(docs === undefined){
        return;
    }
    try {
        let dirtybookmarks = docs._document.data.value.mapValue.fields.bookmarkAdverts.arrayValue.values;
        let bookmarks = getCleanArray(dirtybookmarks);
        const found = bookmarks.find(element => element === uid);
        if(found){
            const index = bookmarks.indexOf(uid);
            if (index > -1) {
                bookmarks.splice(index, 1);
            }
            updateDoc(docs.ref,{bookmarkAdverts: bookmarks})
            return false;

        }else{
            bookmarks.push(uid);
            updateDoc(docs.ref,{bookmarkAdverts: bookmarks})
            return true;
        }
    }catch(err){
        console.error({err});
    }
}

export const getUsersGroupBookmarks = async (user) => {
    const docs = await getUsersDoc(user)
    if(docs === undefined){
        return;
    }  
    try {
        let dirtybookmarks = docs._document.data.value.mapValue.fields.bookmarkGroups.arrayValue.values;

        return getCleanArray(dirtybookmarks);

    } catch (err) {
        console.log({err});
    }    
}

export const getUsersGroupBookmark = async (user,uid) => {
    const docs = await getUsersDoc(user)
    if(docs === undefined){
        return;
    }
    try {
        let dirtybookmarks = docs._document.data.value.mapValue.fields.bookmarkGroups.arrayValue.values;
        let bookmarks = getCleanArray(dirtybookmarks);
        const found = bookmarks.find(element => element === uid);
        if(found){
            return true;

        }else{
            return false;
        }
    } catch (err) {
        console.log({err});
    }
}

export const addGroupBookmark = async (user,uid) => {
    const docs = await getUsersDoc(user)
    if(docs === undefined){
        return;
    }
    try {
        let dirtybookmarks = docs._document.data.value.mapValue.fields.bookmarkGroups.arrayValue.values;
        let bookmarks = getCleanArray(dirtybookmarks);
        const found = bookmarks.find(element => element === uid);
        if(found){
            const index = bookmarks.indexOf(uid);
            if (index > -1) {
                bookmarks.splice(index, 1);
            }
            updateDoc(docs.ref,{bookmarkGroups: bookmarks})
            return false;

        }else{
            bookmarks.push(uid);
            updateDoc(docs.ref,{bookmarkGroups: bookmarks})
            return true;
        }
    }catch(err){
        console.error({err});
    }
}

export const logout = () => {
    signOut(auth);
};