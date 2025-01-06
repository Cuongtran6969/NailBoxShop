import { useCallback, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { htmlToMarkdown, markdownToHtml } from "./Parser";
import uploadToCloudinary from "@/apis/uploadToCloudinary";

function Editor({ value: initialValue = "", onChange }) {
    const [value, setValue] = useState(markdownToHtml(initialValue));
    const reactQuillRef = useRef(null);
    const fontSize = ["small", false, "large", "huge"];
    const Size = Quill.import("formats/size");
    Size.whitelist = fontSize;
    Quill.register(Size, true);
    const handleOnChange = (content) => {
        setValue(content);
        if (onChange) {
            onChange({
                html: content,
                markdown: htmlToMarkdown(content)
            });
        }
    };

    const imageHandler = useCallback(() => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();
        input.onchange = async () => {
            if (input !== null && input.files !== null) {
                const file = input.files[0];
                const url = await uploadToCloudinary(file);
                const quill = reactQuillRef.current;
                if (quill) {
                    const range = quill.getEditorSelection();
                    range &&
                        quill
                            .getEditor()
                            .insertEmbed(range.index, "image", url);
                }
            }
        };
    }, []);

    return (
        <div>
            <ReactQuill
                ref={reactQuillRef}
                theme="snow"
                placeholder="Start writing..."
                modules={{
                    toolbar: {
                        container: [
                            [{ header: "1" }, { header: "2" }, { font: [] }],
                            [{ size: [] }],
                            [{ color: [] }, { background: [] }],
                            [
                                "bold",
                                "italic",
                                "underline",
                                "strike",
                                "blockquote"
                            ],
                            [
                                { list: "ordered" },
                                { list: "bullet" },
                                { indent: "-1" },
                                { indent: "+1" }
                            ],
                            ["link", "image", "video"],
                            ["code-block"],
                            ["clean"]
                        ],
                        handlers: {
                            image: imageHandler
                        }
                    },

                    clipboard: {
                        matchVisual: false
                    }
                }}
                formats={[
                    "header",
                    "font",
                    "size",
                    "color",
                    "background",
                    "bold",
                    "italic",
                    "underline",
                    "strike",
                    "blockquote",
                    "list",
                    "bullet",
                    "indent",
                    "link",
                    "image",
                    "video",
                    "code-block"
                ]}
                value={value}
                onChange={handleOnChange}
            />
        </div>
    );
}

export default Editor;
