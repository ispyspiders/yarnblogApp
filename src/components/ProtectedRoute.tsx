import { Navigate } from "react-router-dom";
import React, { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
    children: ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { user } = useAuth();

    if(!user){
        return <Navigate to="/login" replace />
    }

    return (
        <>
        {children}
        </>
    )
}
export default ProtectedRoute