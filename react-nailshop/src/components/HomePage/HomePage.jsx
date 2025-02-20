import Banner from "@components/Banner/Banner";
import Header from "@components/Header/Header";
import SideBar from "@components/SideBar/SideBar";
import Info from "@components/Info/Info";
import SaleHomePage from "@components/SaleHomePage/SaleHomePage";
import ProductTrend from "@components/ProductTrend/ProductTrend";
import ListNews from "@components/ListNews/ListNews";
import Footer from "@components/Footer/Footer";
import Ticket from "@components/Ticket/Ticket";
import { FloatButton } from "antd";
import { useNavigate } from "react-router-dom";
import { FaHandSparkles } from "react-icons/fa";
function HomePage() {
    const navigate = useNavigate();
    return (
        <>
            <SideBar />
            <Banner />
            <Ticket />
            <Info />
            <SaleHomePage />
            <ProductTrend />
            <ListNews />
            <FloatButton
                icon={<FaHandSparkles />}
                badge={{
                    dot: true
                }}
                description="Thiết kế"
                style={{
                    backgroundColor: "#ff90bc",
                    color: "#fff",
                    width: "60px",
                    height: "60px"
                }}
                onClick={() => navigate("/design")}
            />
        </>
    );
}

export default HomePage;
