import { initializeApp } from 'firebase/app'
import { 
    getFirestore,
    collection,
    doc,
    addDoc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    serverTimestamp,

} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDzhifEXXAAo0hNdghzuTZiOSDtp_MttWU",
    authDomain: "projeto-rpg-f1c50.firebaseapp.com",
    projectId: "projeto-rpg-f1c50",
    storageBucket: "projeto-rpg-f1c50.appspot.com",
    messagingSenderId: "851387745048",
    appId: "1:851387745048:web:da1ffb95ae0a5871b6546d"
  }

initializeApp(firebaseConfig)

export const firestore = getFirestore()

export const _addDoc = async (collectionName, doc) => {
    doc.timestamp = serverTimestamp()
    // doc.timestamp = Date.now()
    // doc.name = doc.name.trim()

    addDoc(collection(firestore, collectionName), doc)
        .then(doc => {
            return doc.id
        })
        .catch(err => console.log(err.message))
}

export const _getDoc = async (collectionName, id) => {
    getDoc(doc(firestore, collectionName, id))
        .then(doc => {
            return {
                ...doc.data(),
                id: doc.id
            }
        })
        .catch(err => console.log(err.message))
}

export const _getDocs = async (collectionName) => {
    getDocs(collection(firestore, collectionName))
        .then(snapshot => {
            let docs = []

            snapshot.docs.forEach((doc) => {
                docs.push({
                    ...doc.data(),
                    id: doc.id
                })
            })

            return docs
        })
        .catch(err => console.log(err.message))
}

export const _updateDoc = async (collectionName, doc) => {
    updateDoc(doc(firestore, collectionName, doc.id), doc)
        .catch(err => console.log(err.message))
}

export const _deleteDoc = async (collectionName, id) => {
    deleteDoc(doc(firestore, collectionName, id))
        .catch(err => console.log(err.message))
}