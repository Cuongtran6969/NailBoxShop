import { BrowserRouter, Route, Routes } from "react-router-dom";
import routers from "@/routers/routers";

function App() {
    return (
        <BrowserRouter>
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
    );
}

export default App;
