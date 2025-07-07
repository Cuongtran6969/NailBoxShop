import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { introspect } from "@/apis/authService";
import Cookies from "js-cookie";
function ProtectedRoute({ children, allowedRoles }) {
    const [validInfo, setValidInfo] = useState(null);
    const token = Cookies.get("accessToken");

    useEffect(() => {
        if (!token) {
            setValidInfo({ valid: false, role: null });
        } else {
            introspect()
                .then((data) => {
                    setValidInfo({ valid: true, role: data.role });
                })
                .catch(() => {
                    setValidInfo({ valid: false, role: null });
                });
        }
    }, [token]);

    console.log("validInfo: " + validInfo);

    if (!validInfo) {
        console.log(
            "LoadingLoadingLoadingLoadingLoadingLoadingLoadingLoading: "
        );
        return <div>Loading...</div>;
    }

    if (!validInfo.valid) {
        console.log(
            "Navigate to home/Navigate to home/Navigate to home/Navigate to home/Navigate to home/ "
        );
        return <Navigate to="/" />;
    }
    if (!allowedRoles.includes(validInfo.role)) {
        return <Navigate to="/accessdenied" />;
    }

    return children;
}

export default ProtectedRoute;
