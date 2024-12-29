import {
    getMyAddress,
    createAddress,
    updateAddress,
    deleteAddress
} from "@/apis/addressService";
import { Card, Modal, Tag } from "antd";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { IoTrashOutline } from "react-icons/io5";
import { useEffect, useState } from "react";

function ListAddress({ isChange, displayMess, setUpdateData }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    useEffect(() => {
        setLoading(true);
        getMyAddress()
            .then((res) => {
                setAddresses(res.result);
            })
            .catch((err) => {
                console.log(err);
            });
        setLoading(false);
    }, [isChange, isDelete]);
    const showModal = (id) => {
        setIsModalOpen(true);
        setSelectedAddressId(id);
    };
    const handleOk = async () => {
        const res = await deleteAddress(selectedAddressId)
            .then((res) => {
                if (res.code == 200) {
                    displayMess("success", "Thành công", res.message);
                    setIsDelete(!isDelete);
                    setUpdateData({ id: "", index: "" });
                } else {
                    displayMess("error", "Thất bại", res.message);
                }
            })
            .catch((err) => {
                displayMess("error", "Thất bại", "Xóa địa chỉ thất bại");
            });
        setIsModalOpen(false);
    };
    const handleOpenEdit = (id, index) => {
        setUpdateData({ id, index });
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setSelectedAddressId(null);
    };
    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <Modal
                title="Xóa địa chỉ"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>Bạn chắc chắn muốn xóa địa chỉ này</p>
            </Modal>
            {addresses.map((address, index) => {
                return (
                    <Card
                        size={"small"}
                        style={{ marginBottom: 16 }}
                        title={
                            <div className="d-flex justify-content-between">
                                <span>Địa chỉ {index + 1}</span>
                                <>
                                    {index == 0 && (
                                        <Tag color="red" className="me-0">
                                            Primary
                                        </Tag>
                                    )}
                                </>
                            </div>
                        }
                    >
                        <div className="d-flex justify-content-between">
                            <div>
                                <div className="fs-6">
                                    {address.ward +
                                        " " +
                                        address.district +
                                        " " +
                                        address.province}
                                </div>
                                <p className="text-secondary">
                                    {address.detail}
                                </p>
                            </div>
                            <div>
                                <MdOutlineModeEditOutline
                                    size={18}
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                        handleOpenEdit(address.id, index)
                                    }
                                />

                                <IoTrashOutline
                                    size={18}
                                    style={{ cursor: "pointer" }}
                                    className="ms-3 text-danger"
                                    onClick={() => showModal(address.id)}
                                />
                            </div>
                        </div>
                    </Card>
                );
            })}
        </>
    );
}

export default ListAddress;
