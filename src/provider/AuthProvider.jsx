import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut,sendPasswordResetEmail,updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase.init";



export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    console.log(user);
    const [loading, setLoading] = useState(true);


    // Creat a new user or Registration
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }


    // Login user
    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    // Login with Google
    const provider = new GoogleAuthProvider();

    const loginWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, provider)
    }

    // Log Out User
    const userLogOut = () => {
        setLoading(true);
        return signOut(auth)
    }

    // Reset Password
    const resetPassword = (email) => {
        setLoading(true);
        return sendPasswordResetEmail(auth, email)
            .finally(() => setLoading(false));
    };

        // update current user profile
        const profileUpdate = (name, photoURL) => {
            setLoading(true);
            return updateProfile(auth.currentUser, {
                displayName: name || user.displayName || null,
                photoURL: photoURL || user.photoURL || null
            }).finally(() => setLoading(false));
        }
    


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            // console.log('current user', currentUser);
            if (currentUser) {

                setLoading(false);
            }
            else {

                setLoading(false);
            }
        });
        return () => {
            return unsubscribe();
        }
    }, [])

    const authInfo = {
        user,
        loading,
        setLoading,
        createUser,
        profileUpdate,
        loginUser,
        loginWithGoogle,
        userLogOut,
        resetPassword

    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;