import React, {useState} from 'react'
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    updateDoc,
} from "firebase/firestore";

import {db} from "../Firebase"

function FirestoreTest() {

    const [users, setUsers] = useState([]);
    const usersCollectionRef = collection(db, "users");
    return (
        <div>
            
        </div>
    )
}

export default FirestoreTest
