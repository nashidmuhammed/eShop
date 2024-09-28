import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

export const LayoutContext = createContext(null)

export const LayoutContextProvider = (props) => {

    const value = {
    }
    return (
        <LayoutContext.Provider value={value} {...props} />
    )
};

export const useLayout = () => {
    const context = useContext(LayoutContext)

    if (context === null) {
        throw new Error("useLayout must be used whithin a LayoutContextProvider")
    }

    return context
};