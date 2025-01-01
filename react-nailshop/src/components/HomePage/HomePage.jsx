import Banner from "@components/Banner/Banner";
import Header from "@components/Header/Header";
import SideBar from "@components/SideBar/SideBar";
import Info from "@components/Info/Info";
import CardTrend from "@components/CardTrend/CardTrend";
import SaleHomePage from "@components/SaleHomePage/SaleHomePage";
import ProductTrend from "@components/ProductTrend/ProductTrend";
import ListNews from "@components/ListNews/ListNews";
import Footer from "@components/Footer/Footer";
import Ticket from "@components/Ticket/Ticket";
function HomePage() {
    return (
        <>
            <SideBar />
            <Banner />
            <Ticket />
            <Info />
            <CardTrend />
            <SaleHomePage />
            <ProductTrend />
            <ListNews />
        </>
    );
}

export default HomePage;
