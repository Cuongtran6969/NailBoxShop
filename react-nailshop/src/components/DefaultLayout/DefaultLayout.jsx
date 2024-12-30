import Header from "@components/Header/Header";
import Footer from "@components/Footer/Footer";
import SideBar from "@components/SideBar/SideBar";
function DefaultLayout({ children }) {
    return (
        <>
            <SideBar />
            <Header />
            {children}
            <Footer />
        </>
    );
}

export default DefaultLayout;
