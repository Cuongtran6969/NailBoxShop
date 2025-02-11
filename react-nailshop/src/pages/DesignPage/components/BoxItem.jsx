import { useEffect, useState } from "react";
import styles from "../styles.module.scss";
import NailBrush from "@icons/images/Nail_brush.png"; // Đảm bảo đường dẫn đúng
import Nail_polish from "@icons/images/Nail_polish.png";
const nailItem = [
    {
        id: 1,
        icon: "https://res.cloudinary.com/doslvje9p/image/upload/v1739253308/nail_pink_zfuhtu.webp",
        nails: [
            "https://res.cloudinary.com/doslvje9p/image/upload/v1739249121/hand_red_tojwla.png",
            "https://res.cloudinary.com/doslvje9p/image/upload/v1739249121/hand_red_tojwla.png",
            "https://res.cloudinary.com/doslvje9p/image/upload/v1739249121/hand_red_tojwla.png",
            "https://res.cloudinary.com/doslvje9p/image/upload/v1739249121/hand_red_tojwla.png",
            "https://res.cloudinary.com/doslvje9p/image/upload/v1739249121/hand_red_tojwla.png"
        ]
    },
    {
        id: 2,
        icon: "https://res.cloudinary.com/doslvje9p/image/upload/v1739253308/nail_gray_h5yvri.webp",
        nails: [
            "https://res.cloudinary.com/doslvje9p/image/upload/v1739266945/nail_color_gray_ebpwkm.png",
            "https://res.cloudinary.com/doslvje9p/image/upload/v1739266945/nail_color_gray_ebpwkm.png",
            "https://res.cloudinary.com/doslvje9p/image/upload/v1739266945/nail_color_gray_ebpwkm.png",
            "https://res.cloudinary.com/doslvje9p/image/upload/v1739266945/nail_color_gray_ebpwkm.png",
            "https://res.cloudinary.com/doslvje9p/image/upload/v1739266945/nail_color_gray_ebpwkm.png"
        ]
    },
    {
        id: 3,
        icon: "https://res.cloudinary.com/doslvje9p/image/upload/v1739253308/nail_green_zpdfm7.webp",
        nails: []
    },
    {
        id: 4,
        icon: "https://res.cloudinary.com/doslvje9p/image/upload/v1739253308/nail_yellow_pxhwoj.jpg",
        nails: []
    }
];

const dinamondItem = [
    {
        id: 1,
        icon: "https://res.cloudinary.com/doslvje9p/image/upload/v1739256970/ITEM_3-removebg-preview_1_x2bh6c.png",
        nails: []
    },
    {
        id: 2,
        icon: "https://res.cloudinary.com/doslvje9p/image/upload/v1739256970/ITEM_2-removebg-preview_1_y90vml.png",
        nails: []
    },
    {
        id: 3,
        icon: "https://res.cloudinary.com/doslvje9p/image/upload/v1739256970/ITEM_4-removebg-preview_1_whr8k5.png",
        nails: []
    }
];

function BoxItem({ type, setSelectors }) {
    const { box_item, nail_item, content } = styles;
    const [listItem, setListItem] = useState([]);
    const [cursorActive, setCursorActive] = useState(false);
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (type === "color") {
            setListItem(nailItem);
        } else if (type === "icon") {
            setListItem(dinamondItem);
        } else {
            setListItem([]);
        }
    }, [type]);

    const handleClick = (id) => {
        if (listItem.length > 0) {
            const item = nailItem.find((nail) => nail.id === id);
            setSelectors(item.nails ?? []);
        }
        setCursorActive(true);
    };

    // Cập nhật vị trí hình ảnh khi di chuyển chuột
    useEffect(() => {
        const handleMouseMove = (event) => {
            setCursorPosition({
                x: event.clientX,
                y: event.clientY
            });
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [cursorActive]);

    return (
        <div className={box_item}>
            <div className={content}>
                {listItem.map((item, index) => (
                    <div
                        key={index}
                        className={nail_item}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleClick(item.id);
                        }}
                    >
                        <img src={item.icon} alt="" />
                    </div>
                ))}
            </div>

            {/* Hình ảnh cây cọ xuất hiện khi click vào item */}
            {cursorActive && (
                <img
                    src={NailBrush}
                    alt="Nail Brush"
                    style={{
                        position: "fixed",
                        top: cursorPosition.y + "px", // Dịch xuống 1 chút để dễ nhìn
                        left: cursorPosition.x + "px", // Dịch sang phải một chút
                        width: "40px",
                        height: "auto",
                        pointerEvents: "none", // Không ảnh hưởng đến click chuột
                        zIndex: 99
                    }}
                />
            )}
        </div>
    );
}

export default BoxItem;
