import styles from "./styles.module.scss";
import Logo from "@icons/images/nailLaBoxLogo.png";
import { dataBoxIcon, dataMenu } from "./constants";
import BoxIcon from "./BoxIcon/BoxIcon";
import { MdSearch } from "react-icons/md";
import { BiFontSize } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { IoCart } from "react-icons/io5";
import { useContext } from "react";
import { SideBarContext } from '@/contexts/SideBarProvider';

function Header() {
    const {
        headerText,
        container,
        containerContent,
        containerBox,
        headerLogo,
        conatinerBoxIcon,
        searchBox,
        headerNavUser,
        headerNavCart
    } = styles;

    const { isOpen, setIsOpen } = useContext(SideBarContext);
    // console.log(isOpen);

    return (
        <>
            <div className={headerText}>
                Nail Box Xinh - Nâng niu bàn tay phái đẹp.
            </div>
            <div className={container}>
                <div className={containerContent}>
                    <div className={containerBox}>
                        <div>
                            <img src={Logo} className={headerLogo} />
                        </div>
                        <div className={conatinerBoxIcon}>
                            {dataBoxIcon.map((item) => {
                                return (
                                    <BoxIcon
                                        type={item.type}
                                        href={item.href}
                                    />

                                );
                            })}
                        </div>
                    </div>
                    <div>
                        <div className={searchBox}>
                            <input placeholder="Nhập từ khóa tìm kiếm..." />
                            <MdSearch
                                style={{ fontSize: "30px", padding: "5px" }}
                            />
                        </div>
                    </div>
                    <div className={conatinerBoxIcon}>
                        <FaUser className={headerNavUser} onClick={() => setIsOpen(!isOpen)} />
                        <IoCart className={headerNavCart} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;
