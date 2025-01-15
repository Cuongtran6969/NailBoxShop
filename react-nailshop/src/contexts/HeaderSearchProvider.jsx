import { createContext, useState } from "react";

export const HeaderSearchContext = createContext();

function HeaderSearchProvider({ children }) {
    const [keyword, setKeyword] = useState("");

    return (
        <HeaderSearchContext.Provider value={{ keyword, setKeyword }}>
            {children}
        </HeaderSearchContext.Provider>
    );
}

export default HeaderSearchProvider;
