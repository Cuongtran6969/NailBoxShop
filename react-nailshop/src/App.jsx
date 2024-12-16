import { BrowserRouter, Route, Routes } from "react-router-dom";
import routers from "@/routers/routers";
import { SidebarProvider } from '@/contexts/SideBarProvider';
import SideBar from '@components/Sidebar/Sidebar';


function App() {
    return (
        <SidebarProvider>
            <BrowserRouter>
                <SideBar />
                <Routes>
                    {routers.map((item, index) => {
                        let Page = item.component;
                        return (
                            <Route
                                key={index}
                                path={item.path}
                                element={<Page />}
                            />
                        );
                    })}
                </Routes>
            </BrowserRouter>
        </SidebarProvider>


    );
}

export default App;
