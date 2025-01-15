import React, { useState, useRef, useEffect, useContext } from "react";
import { MdSearch } from "react-icons/md";
import { keywords } from "./constants"; // Import từ khóa
import styles from "./styles.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { HeaderSearchContext } from "@contexts/HeaderSearchProvider";
import classNames from "classnames";

function SearchBoxHeader() {
    const { searchBox, suggestionBox, suggestionItem, suggestionItemActive } =
        styles;
    const [filteredKeywords, setFilteredKeywords] = useState([]); // Trạng thái lưu các từ khóa lọc được
    const [isSuggestionVisible, setIsSuggestionVisible] = useState(false); // Quản lý hiển thị gợi ý
    const [highlightedIndex, setHighlightedIndex] = useState(-1); // Chỉ mục mục được chọn
    const inputRef = useRef(null); // Tham chiếu đến ô input
    const suggestionBoxRef = useRef(null); // Tham chiếu đến suggestion box
    const navigate = useNavigate();
    const location = useLocation();
    const { keyword, setKeyword } = useContext(HeaderSearchContext);
    const [inputValue, setInputValue] = useState(keyword);

    useEffect(() => {
        setInputValue(keyword);
    }, [keyword]);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputValue(value);
        if (value) {
            let filtered = keywords.filter((keyword) =>
                keyword.toLowerCase().includes(value.toLowerCase())
            );
            if (filtered.length === 0) {
                filtered = keywords.filter((keyword) =>
                    keyword
                        .toLowerCase()
                        .includes(value.slice(0, 1).toLowerCase())
                );
            }
            filtered = filtered.slice(0, 8);
            setFilteredKeywords(filtered);
            setHighlightedIndex(-1); // Đặt lại mục được chọn
            setIsSuggestionVisible(true); // Hiển thị gợi ý
        } else {
            setFilteredKeywords([]);
            setIsSuggestionVisible(false); // Ẩn gợi ý khi không có từ khóa
        }
    };

    const handleKeywordSelect = (keyword) => {
        setKeyword(keyword);
        setInputValue(keyword); // Đặt giá trị vào ô input
        setFilteredKeywords([]); // Ẩn danh sách gợi ý
        setIsSuggestionVisible(false);
        if (location.pathname !== "/search") {
            navigate("/search", {
                state: { keyword }
            });
        }
    };

    const handleSearchClickBtn = () => {
        setKeyword(inputValue);
        if (location.pathname !== "/search") {
            navigate("/search", {
                state: { keyword }
            });
        }
    };

    const handleKeyDown = (event) => {
        if (filteredKeywords.length === 0 && event.key === "Enter") {
            handleSearchClickBtn(); // Gọi tìm kiếm nếu không có gợi ý
            return;
        }

        switch (event.key) {
            case "ArrowDown":
                setHighlightedIndex((prevIndex) => {
                    const newIndex =
                        prevIndex === filteredKeywords.length - 1
                            ? 0
                            : prevIndex + 1;
                    setInputValue(filteredKeywords[newIndex]); // Cập nhật inputValue
                    return newIndex;
                });
                break;
            case "ArrowUp":
                setHighlightedIndex((prevIndex) => {
                    const newIndex =
                        prevIndex <= 0
                            ? filteredKeywords.length - 1
                            : prevIndex - 1;
                    setInputValue(filteredKeywords[newIndex]); // Cập nhật inputValue
                    return newIndex;
                });
                break;
            case "Enter":
                if (highlightedIndex >= 0) {
                    handleKeywordSelect(filteredKeywords[highlightedIndex]);
                } else {
                    handleSearchClickBtn();
                    setIsSuggestionVisible(false); // Ẩn danh sách gợi ý
                    inputRef.current.blur(); // Bỏ focus khỏi input
                }
                break;
            default:
                break;
        }
    };

    const handleClickOutside = (e) => {
        if (
            inputRef.current &&
            !inputRef.current.contains(e.target) &&
            suggestionBoxRef.current &&
            !suggestionBoxRef.current.contains(e.target)
        ) {
            setFilteredKeywords([]); // Ẩn danh sách gợi ý khi nhấn ngoài
            setIsSuggestionVisible(false); // Ẩn gợi ý khi nhấn ngoài
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleInputFocus = () => {
        if (inputValue) {
            let filtered = keywords.filter((keyword) =>
                keyword.toLowerCase().includes(inputValue.toLowerCase())
            );
            filtered = filtered.slice(0, 8);
            setFilteredKeywords(filtered);
            setIsSuggestionVisible(true);
        } else {
            setFilteredKeywords(keywords.slice(0, 5));
            setIsSuggestionVisible(true);
        }
    };

    return (
        <div className={searchBox}>
            <input
                ref={inputRef}
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown} // Xử lý sự kiện bàn phím
                onClick={handleInputFocus}
                placeholder="Nhập từ khóa tìm kiếm..."
            />
            <MdSearch
                style={{
                    fontSize: "40px",
                    padding: "5px 10px",
                    cursor: "pointer"
                }}
                onClick={handleSearchClickBtn}
            />
            {isSuggestionVisible && filteredKeywords.length > 0 && (
                <div className={suggestionBox} ref={suggestionBoxRef}>
                    {filteredKeywords.map((keyword, index) => (
                        <div
                            key={index}
                            className={classNames(suggestionItem, {
                                [suggestionItemActive]:
                                    index === highlightedIndex
                            })}
                            onClick={() => handleKeywordSelect(keyword)}
                        >
                            {keyword}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SearchBoxHeader;
