import { BrowserRouter, Route, Routes } from "react-router-dom";
import routers from "@/routers/routers";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import { Fragment } from "react";
import DefaultLayout from "@components/DefaultLayout/DefaultLayout";
import { SidebarProvider } from "@contexts/SidebarProvider";
import ProtectedRoute from "@/routers/ProtectedRoute";
import { AuthProvider } from "@contexts/AuthContext";
import NotFoundPage from "@pages/ErrorPage/NotFoundPage";
function App() {
    return (
        <AuthProvider>
            <SidebarProvider>
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
                            const allowedRoles = item.roles; // Vai trò mặc định có thể là tất cả

                            return (
                                <>
                                    <Route
                                        key={index}
                                        path={item.path}
                                        element={
                                            allowedRoles ? (
                                                <ProtectedRoute
                                                    allowedRoles={allowedRoles}
                                                >
                                                    <Layout>
                                                        <Page />
                                                    </Layout>
                                                </ProtectedRoute>
                                            ) : (
                                                <Layout>
                                                    <Page />
                                                </Layout>
                                            )
                                        }
                                    />
                                    <Route
                                        path="*"
                                        element={<NotFoundPage />}
                                    />
                                </>
                            );
                        })}
                    </Routes>
                </BrowserRouter>
            </SidebarProvider>
        </AuthProvider>
    );
}

export default App;
