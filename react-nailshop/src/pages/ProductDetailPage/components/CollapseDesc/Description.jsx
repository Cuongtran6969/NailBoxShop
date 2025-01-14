import { Collapse, Divider } from "antd";
// const text = `
//   A dog is a type of domesticated animal.
//   Known for its loyalty and faithfulness,
//   it can be found as a welcome guest in many households across the world.
// `;
import { htmlToMarkdown, markdownToHtml } from "@/utils/Parser";
function Description({ text }) {
    return (
        <div style={{ marginTop: "50px" }}>
            <Collapse
                style={{ borderColor: "#ffdeeb" }}
                size="large"
                items={[
                    {
                        key: "1",
                        label: "Thông tin sản phẩm",
                        children: (
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: markdownToHtml(text)
                                }}
                            ></div>
                        )
                    }
                ]}
            />
        </div>
    );
}

export default Description;
