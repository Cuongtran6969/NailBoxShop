import React, { useEffect, useState } from "react";
import { DatePicker, Dropdown, Menu, Button, Flex } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { FaAngleDown } from "react-icons/fa";
// Mở rộng Day.js với plugin
dayjs.extend(customParseFormat);
const dateFormat = "DD/MM/YYYY";
const { RangePicker } = DatePicker;

function TimeLine({ time, setTime }) {
    const [selectedDate, setSelectedDate] = useState(null);
    const [visible, setVisible] = useState(false);

    const handleDateChange = (dates) => {
        setSelectedDate(dates);
    };
    useEffect(() => {
        if (time && time.includes(" - ")) {
            const [start, end] = time.split(" - ");
            setSelectedDate([dayjs(start, dateFormat), dayjs(end, dateFormat)]);
        } else {
            setSelectedDate(null);
        }
    }, [time]);

    const handleApply = () => {
        if (selectedDate) {
            const formattedDate = `${selectedDate[0].format(
                "DD/MM/YYYY"
            )} - ${selectedDate[1].format("DD/MM/YYYY")}`;
            setTime(formattedDate);
            setVisible(false);
        }
    };

    console.log("selectedDate", selectedDate, "time", time);

    const menu = (
        <Menu>
            <Menu.Item>
                <RangePicker
                    size={"middle"}
                    onChange={handleDateChange}
                    value={selectedDate}
                    defaultValue={selectedDate}
                />
            </Menu.Item>
            <Menu.Item>
                <Button onClick={handleApply} type="primary">
                    Áp dụng
                </Button>
            </Menu.Item>
        </Menu>
    );

    const handleChange = (value) => {
        setTime(value);
    };

    const isActive = (value) => {
        return time === value;
    };

    return (
        <Flex gap="small" wrap>
            <Button
                type={isActive("Daily") ? "primary" : ""}
                variant="outlined"
                onClick={() => handleChange("Daily")}
            >
                Daily
            </Button>
            <Button
                type={isActive("Weekly") ? "primary" : ""}
                variant="outlined"
                onClick={() => handleChange("Weekly")}
            >
                Weekly
            </Button>
            <Button
                type={isActive("Monthly") ? "primary" : ""}
                variant="outlined"
                onClick={() => handleChange("Monthly")}
            >
                Monthly
            </Button>
            <Button
                type={isActive("Yearly") ? "primary" : ""}
                variant="outlined"
                onClick={() => handleChange("Yearly")}
            >
                Yearly
            </Button>

            {/* Nút Tùy chỉnh với Dropdown */}
            <Dropdown
                type={"primary"}
                overlay={menu}
                trigger={["click"]}
                visible={visible}
                onVisibleChange={(flag) => setVisible(flag)}
            >
                <Button
                    color="default"
                    style={{
                        background:
                            time.includes(" - ") && selectedDate
                                ? "#0d6efd"
                                : "",
                        color:
                            time.includes(" - ") && selectedDate ? "#fff" : ""
                    }}
                    variant="outlined"
                    icon={<FaAngleDown />}
                    iconPosition="end"
                >
                    {selectedDate
                        ? `${selectedDate[0].format(
                              "DD/MM/YYYY"
                          )} - ${selectedDate[1].format("DD/MM/YYYY")}`
                        : "Tùy chỉnh"}
                </Button>
            </Dropdown>
        </Flex>
    );
}

export default TimeLine;
