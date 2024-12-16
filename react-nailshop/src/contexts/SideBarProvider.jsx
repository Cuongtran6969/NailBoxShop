import { Children, createContext, useState } from "react";

export const SideBarContext = createContext();

export const SidebarProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <SideBarContext.Provider value={{ isOpen, setIsOpen }}>
            {children}
        </SideBarContext.Provider>
    );
};