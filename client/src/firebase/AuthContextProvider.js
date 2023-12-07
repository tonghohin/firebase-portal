import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./config";

const AuthContext = createContext(null);

function AuthContextProvider({ children }) {
    const [authContext, setAuthContext] = useState({});

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                user.getIdTokenResult(true).then((x) => {
                    if (x.claims.isAdmin) {
                        setAuthContext({ uid: user.uid, isAdmin: x.claims.isAdmin, email: user.email });
                    } else {
                        setAuthContext({ uid: user.uid, isAdmin: x.claims.isAdmin, unit: x.claims.unit, email: user.email });
                    }
                });
            } else {
                setAuthContext({ uid: "", isAdmin: false, email: "" });
                setAuthContext({ uid: "", isAdmin: false, unit: "", email: "" });
            }
        });
    }, []);

    return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
}

function useAuth() {
    return useContext(AuthContext);
}

export default AuthContextProvider;
export { useAuth };
