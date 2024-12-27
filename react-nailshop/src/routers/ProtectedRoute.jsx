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
                    setValidInfo({ valid: data.valid, role: data.role });
                    console.log("run heee1: " + data);
                })
                .catch(() => {
                    setValidInfo({ valid: false, role: null });
                });
        }
    }, [token]);

    if (!validInfo) {
        return <div>Loading...</div>;
    }

    if (!validInfo.valid) {
        console.log("unauth token invalid");
        return <Navigate to="/" />;
    }
    if (!allowedRoles.includes(validInfo.role)) {
        console.log("unauth=> 403");
        return <Navigate to="/accessdenied" />;
    }

    return children;
}

export default ProtectedRoute;
