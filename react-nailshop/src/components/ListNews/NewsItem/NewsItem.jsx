import styles from "../styles.module.scss";
function NewsItem() {
    const { newsBox, newsItem, newsImage, newsContent, newsType, newsTitle, newsDesc } =
        styles;
    return (
        <div className={newsBox}>
            <div className={newsItem}>
                <div className={newsImage}>
                    <img
                        src="https://nailboxxinh.com/wp-content/uploads/2024/04/huong-dan-cach-dan-nail-box.webp"
                        alt=""
                    />
                </div>
                <div className={newsContent}>
                    <span className={newsType}>Tin tuc</span>
                    <h5 className={newsTitle}>
                        Top 3 mẫu nail đen trắng cute mới nhất chị em nên sỡ hữu
                    </h5>
                    <p className={newsDesc}>
                        Những chiếc móng tay sơn màu trắng đen luôn tạo nên một
                        vẻ đẹp tinh tế và sang trọng. Sự kết hợp giữ. Những
                        chiếc móng tay sơn màu trắng đen luôn tạo nên một vẻ đẹp
                        tinh tế và sang trọng. Sự kết hợp giữ.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default NewsItem;
