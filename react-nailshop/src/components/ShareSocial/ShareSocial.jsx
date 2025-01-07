import { Divider } from "antd";
import {
    FacebookShareButton,
    FacebookMessengerShareButton,
    TelegramShareButton,
    FacebookIcon,
    FacebookMessengerIcon,
    TelegramIcon
} from "react-share";
function ShareSocial() {
    const shareUrl = window.location.href;
    return (
        <>
            {" "}
            <Divider orientation="left">
                <span
                    style={{
                        fontSize: "14px",
                        fontWeight: "500"
                    }}
                >
                    Chia sẻ bài viết
                </span>
            </Divider>
            <FacebookShareButton url={shareUrl} className="me-2">
                <FacebookIcon size={30} round />
            </FacebookShareButton>
            <FacebookMessengerShareButton url={shareUrl} className="me-2">
                <FacebookMessengerIcon size={30} round />
            </FacebookMessengerShareButton>
            <TelegramShareButton url={shareUrl} className="me-2">
                <TelegramIcon size={30} round />
            </TelegramShareButton>
        </>
    );
}

export default ShareSocial;