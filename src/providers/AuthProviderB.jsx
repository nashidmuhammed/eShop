'use client';

import Login from "@/app/login/Login";
import { AuthContextProvider } from "@/hooks/useAuth";
import { usePathname } from "next/navigation";
import { useState } from "react";

const AuthProvider = ({ children }) => {
    const [isLogged, setIsLogged] = useState(false);
    const pathname = usePathname();
    const isLoginPage = pathname === "/login";
    console.log("pathname==>",pathname);

    return (
        <AuthContextProvider value={{ isLogged, setIsLogged }}>
            {isLoginPage ? <Login /> : children}
        </AuthContextProvider>
    );
}

export default AuthProvider;