
import React, { createContext, useEffect, useState } from 'react'
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from '../firebase/firebase';

export const AuthContext = createContext(null);
function AuthProvider({ children }) {
    const auth = getAuth(app)
    const [user, setUser] = useState(null);
    const [loader, setLoader] = useState(true);
    const googleProvider = new GoogleAuthProvider();

    const registers = (email, password) => {
        setLoader(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const google = () => {
        setLoader(true)
        return signInWithPopup(auth, googleProvider);
    }
    const login = (email, password) => {
        setLoader(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logOut = () => {
        return signOut(auth)
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setLoader(false);
            setUser(user)
        });
        return () => unsubscribe();
    }, [])

    const updateUser = (currentUser, name, photo) => {
        return updateProfile(currentUser, {
            displayName: name, photoURL: photo
        })
    }

    const userInfo = {
        user,
        login,
        registers,
        logOut,
        loader,
        google,
        updateUser
    }

    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
