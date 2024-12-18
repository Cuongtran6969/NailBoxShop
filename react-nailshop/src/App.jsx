import { BrowserRouter, Route, Routes } from "react-router-dom";
import routers from "@/routers/routers";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import { Fragment } from "react";
import DefaultLayout from "@components/DefaultLayout/DefaultLayout";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {routers.map((item, index) => {
                    let Page = item.component;
                    let Layout = DefaultLayout;
                    if (item.layout) {
                        Layout = item.layout;
                    } else if (item.layout == null) {
                        Layout = Fragment;
                    }

                    return (
                        <Route
                            key={index}
                            path={item.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        />
                    );
                })}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
