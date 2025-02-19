import { useRef, useEffect, useState } from "react";
import Hand from "@icons/images/Hand.png";
import html2canvas from "html2canvas"; // Import thư viện chụp ảnh
import messager_icon from "@icons/images/messager_icon.png";
import form_1 from "@icons/images/form_1.png";
import form_2 from "@icons/images/form_2.png";
import form_3 from "@icons/images/form_3.png";
import form_4 from "@icons/images/form_4.png";
import form_5 from "@icons/images/form_5.png";
import styles from "./styles.module.scss";
import BoxOption from "./components/BoxOption";
import BoxItem from "./components/BoxItem";
import { Rnd } from "react-rnd"; // Import thư viện
import { FloatButton, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";

const DesignPage = () => {
    const navigate = useNavigate();
    const [type, setType] = useState(1);
    const [selectors, setSelectors] = useState(["", "", "", "", ""]);
    const [nailColors, setNailColors] = useState([
        form_1,
        form_2,
        form_3,
        form_4,
        form_5
    ]);
    const {
        boxHand,
        itemImages,
        nail_0,
        nail_1,
        nail_2,
        nail_3,
        nail_4,
        box_option,
        option_item,
        box_setting,
        fixedInbox
    } = styles;
    const fingerAngles = [-7, 5, 3, 1, 1];
    const [placedItems, setPlacedItems] = useState([]);
    const handRef = useRef(null);
    const handleFingerClick = (index, event) => {
        console.log(index);
        console.log(selectors);

        if (selectors.length == 5 && selectors[0] !== "") {
            setNailColors((prev) => {
                let newList = [...prev];
                newList[index] = selectors[index];
                return [...newList];
            });
        } else if (selectors.length == 1 && selectors[0] !== "") {
            const handImage = event.target.closest(`#hand`);
            if (!handImage) return;

            const rect = handImage.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            setPlacedItems([
                ...placedItems,
                {
                    id: Date.now(),
                    src: selectors[0],
                    x,
                    y,
                    width: 50,
                    height: 50,
                    angle: fingerAngles[index]
                }
            ]);
        }
    };
    const captureDesign = async () => {
        if (!handRef.current) return;

        const canvas = await html2canvas(handRef.current, {
            backgroundColor: null, // Giữ nền trong suốt
            useCORS: true, // Cho phép tải ảnh từ nguồn bên ngoài
            scale: 2, // Tăng độ phân giải ảnh
            logging: true, // Bật debug để kiểm tra lỗi
            ignoreElements: (el) => el.classList.contains("ignore-capture") // Loại bỏ phần tử không cần
        });

        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "design.png";
        link.click();
    };

    return (
        <div className="text-center" style={{ minWidth: "1890px" }}>
            <div className={fixedInbox}>
                <Tooltip title="Hãy gửi cho nhà thiết kế ảnh design">
                    <a href="https://www.facebook.com/naillabox" target="blank">
                        <img src={messager_icon} alt="" />
                    </a>
                </Tooltip>
            </div>
            <h5>Thiết Kế Nail</h5>
            <div className="position-relative">
                <div className={boxHand} id="hand" ref={handRef}>
                    <img src={Hand} alt="" style={{ userSelect: "none" }} />
                    <div>
                        {nailColors &&
                            nailColors.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={styles[`nail_${index}`]}
                                        onClick={(event) =>
                                            handleFingerClick(index, event)
                                        }
                                    >
                                        <img src={item} alt="" />
                                    </div>
                                );
                            })}
                    </div>
                    {placedItems.map((item, index) => (
                        <Rnd
                            key={item.id}
                            default={{
                                x: item.x,
                                y: item.y,
                                width: "30px"
                            }}
                            bounds="parent"
                            enableResizing={true}
                            lockAspectRatio={true}
                        >
                            <img
                                src={item.src}
                                alt="placed-icon"
                                style={{
                                    userSelect: "none",
                                    transform: `rotate(${fingerAngles[index]}deg)` // Áp dụng góc nghiêng
                                }}
                            />
                        </Rnd>
                    ))}
                </div>
                <div className={box_setting}>
                    <BoxItem type={type} setSelectors={setSelectors} />
                    <BoxOption type={type} setType={setType} />
                </div>
            </div>
            <button
                className="mt-5 fs-6 btn btn-primary ms-5"
                onClick={captureDesign}
            >
                Xuất ảnh thiết kế
            </button>
        </div>
    );
};

export default DesignPage;
