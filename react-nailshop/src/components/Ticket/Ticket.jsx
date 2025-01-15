import { MdContentCopy } from "react-icons/md";
import styles from "./styles.module.scss";
import { Container, Row, Col } from "react-bootstrap";
import { FcFlashOn } from "react-icons/fc";
import classNames from "classnames";
import { Button, message, Space } from "antd";
import { getRandomTicket } from "@/apis/voucherService";
import { useEffect, useState } from "react";
function Ticket() {
    const [ticket, setTicket] = useState(null);
    const [messageApi, contextHolder] = message.useMessage();
    const success = () => {
        messageApi.open({
            type: "success",
            content: "Copy mã thành công"
        });
    };
    const warning = () => {
        messageApi.open({
            type: "warning",
            content: "Copy mã thất bại"
        });
    };
    const {
        container,
        type,
        priceTicket,
        content,
        ticketName,
        description,
        icon
    } = styles;

    const handleCopy = () => {
        if (ticket && ticket.code) {
            navigator.clipboard
                .writeText(ticket.code)
                .then(() => {
                    success();
                })
                .catch((error) => {
                    warning();
                });
        }
    };

    // Lưu trữ token vào localStorage với thời gian hết hạn
    const storeTicket = (ticketData) => {
        const expirationTime = new Date().getTime() + 3600000 * 5; // Hết hạn sau 5 giờ
        localStorage.setItem(
            "ticket",
            JSON.stringify({ ...ticketData, expirationTime })
        );
    };

    const getStoredTicket = () => {
        const storedTicket = JSON.parse(localStorage.getItem("ticket"));
        // Kiểm tra xem ticket có tồn tại và không hết hạn
        if (storedTicket) {
            const currentTime = new Date().getTime();
            if (
                storedTicket.expirationTime > currentTime &&
                new Date(storedTicket.date).getTime() > currentTime
            ) {
                return storedTicket;
            } else {
                localStorage.removeItem("ticket");
                return null;
            }
        }
        return null; // Nếu không có ticket trong localStorage, trả về null
    };

    useEffect(() => {
        const getTicket = async () => {
            const storedTicket = getStoredTicket();
            if (storedTicket) {
                setTicket(storedTicket); // Nếu đã có ticket hợp lệ trong localStorage, sử dụng ticket đó
                return;
            }

            try {
                const res = await getRandomTicket();
                if (res.result) {
                    const newTicket = {
                        date: res.result.endTime,
                        code: res.result.code,
                        amount: res.result.amount
                    };
                    setTicket(newTicket);
                    storeTicket(newTicket);
                }
                // Lưu ticket mới vào localStorage
            } catch (err) {
                console.log(err);
            }
        };

        getTicket();
    }, []);

    return (
        <Container>
            {contextHolder}
            {ticket && (
                <div className={container}>
                    <div
                        className={classNames(type, {
                            [priceTicket]: ticket.amount > 0
                        })}
                    >
                        <span>
                            {ticket.amount > 0 ? "GIẢM GIÁ" : "FREE SHIP"}
                        </span>
                        <span>
                            <FcFlashOn />
                        </span>
                    </div>
                    <div className={content}>
                        <div>
                            <span className={ticketName}>NailLaBox Ticket</span>
                            <p className={description}>
                                {new Date(ticket.date).toLocaleString()}
                            </p>
                        </div>
                    </div>
                    <MdContentCopy className={icon} onClick={handleCopy} />
                </div>
            )}
        </Container>
    );
}

export default Ticket;
