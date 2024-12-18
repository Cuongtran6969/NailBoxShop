import React from "react";
import styles from './styles.module.scss';
import Header from "@/pages/components/HeaderNews/Header";
import Banner from "@/pages/components/BannerNews/Banner";
import NewsSection from "@/pages/components/NewsSection/NewsSection";
import Footer from "@components/Footer/Footer";
import ListNews from "@components/ListNews/ListNews";




const NewsPage = () => {
    return (
        <div>
            <Header />
            <Banner />
            <div className="news-section">
                <NewsSection />
            </div>
            <Footer />
        </div>
    );
};

export default NewsPage; 