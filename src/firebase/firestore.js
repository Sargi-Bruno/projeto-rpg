// import { initializeApp } from 'firebase/app'
// import { getAuth } from 'firebase/auth'
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

// const firebaseConfig = {
//     apiKey: "AIzaSyDzhifEXXAAo0hNdghzuTZiOSDtp_MttWU",
//     authDomain: "projeto-rpg-f1c50.firebaseapp.com",
//     projectId: "projeto-rpg-f1c50",
//     storageBucket: "projeto-rpg-f1c50.appspot.com",
//     messagingSenderId: "851387745048",
//     appId: "1:851387745048:web:da1ffb95ae0a5871b6546d"
//   }

// initializeApp(firebaseConfig)

// const auth = getAuth()

// export { auth }

export const firestore = getFirestore()

export const _addDoc = async (collectionName, doc) => {
    doc.timestamp = serverTimestamp()
    doc.nome = doc.nome.trim()
    doc.searchField = doc.nome.replace(/ /g, '').toLowerCase()
    doc.collectionName = collectionName
    // doc.timestamp = Date.now()

    const data = await addDoc(collection(firestore, collectionName), doc)

    return data.id
}

export const _getDoc = async (collectionName, id) => {
    const querySnapshot = await getDoc(doc(firestore, collectionName, id))

    return {
        ...querySnapshot.data(),
        id: querySnapshot.id
    }
}

export const _getDocs = async (collectionName) => {
    let docs = []

    const querySnapshot = await getDocs(collection(firestore, collectionName))

    querySnapshot.docs.forEach((doc) => {
        docs.push({
            ...doc.data(),
            id: doc.id
        })
    })

    return docs
}

export const _updateDoc = async (data) => {
    updateDoc(doc(firestore, data.collectionName, data.id), data)
        .catch(err => console.log(err.message))
}

export const _deleteDoc = async (data) => {
    deleteDoc(doc(firestore, data.collectionName, data.id))
        .catch(err => console.log(err.message))
}

export const createPersonagem = async (data, uid) => {
    data.timestamp = serverTimestamp()
    data.collectionName = 'personagens'
    data.uid = uid

    const doc = await addDoc(collection(firestore, 'personagens'), data)

    return doc.id
}