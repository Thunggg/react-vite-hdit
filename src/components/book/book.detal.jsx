import { Button, Drawer } from "antd";
import { useState } from "react";

const BookDetail = (props) => {
    const {isOpenDrawer, setIsOpenDrawer, dataDetail, setDataDeTail} = props;

    const onClose = () => {
        setIsOpenDrawer(false);
        setDataDeTail(null);
    };
    return (
        <>
        <Drawer title="Basic Drawer" onClose={onClose} open={isOpenDrawer}>
            {dataDetail 
            ?
                (
                    <>
                        <p>ID: {dataDetail._id}</p>
                        <p>Tiêu đề: {dataDetail.mainText}</p>
                        <p>Tác giả: {dataDetail.author}</p>
                        <p>Thể loại: {dataDetail.category}</p>
                        <p>Giá tiền: {dataDetail.price}</p>
                        <p>Số Lượng: {dataDetail.quantity}</p>
                        <p>Đã bán: {dataDetail.sold}</p>
                        <div style={{
                            marginTop: "10px",
                            height: "100px", width: "150px",
                            border: "1px solid #ccc"
                        }}>
                            <img 
                            src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataDetail.thumbnail}` }
                            alt="" 
                            style={{ height: "100%", width: "100%", objectFit: "contain" }}
                            />
                        </div>
                    </>
                )
            :
                (
                    <p>No data</p>
                )
            }
            
        </Drawer>
        </>
    );
}

export default BookDetail;