import { Input, InputNumber, Modal, notification, Select } from "antd";
import { useEffect, useState } from "react";
import { handleUploadFile, updateBookAPI } from "../../services/api.service";
import { ConsoleSqlOutlined } from "@ant-design/icons";


const UpdateBookControl = (props) => {
    const {dataUpdate, setDataUpdate, isModalUpdateOpen, setIsModalUpdateOpen, loadBook} = props;
    
    const [id, setId] = useState("");
    const [mainText, setMainText] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [category, setCategory] = useState("");

    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    
    const resetAndCloseModal = () => {
        setMainText("");
        setAuthor("");
        setPrice("");
        setQuantity("");
        setCategory("");
        setSelectedFile(null);
        setPreview(null);
        setId("");
        setDataUpdate(null);
        setIsModalUpdateOpen(false);
    }

    const handleOnChangeFile = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(null);
            setPreview(null);
            return;
        } else{
            setSelectedFile(event.target.files[0]);
            setPreview(URL.createObjectURL(event.target.files[0]));
        }
    }

    
    const updateBook = async (newThumbnail) => {
        const res = await updateBookAPI(id, newThumbnail, mainText, author, price, quantity, category);
        console.log(res);
        if(res.data){
            resetAndCloseModal();
            notification.success({
                message: "Success update book",
                description: "Cập nhật thành công"
            })
            await loadBook();
        } else{
            notification.error({
                message: "Error update book",
                description: JSON.stringify(res.message)
            })
        }
    }

    const handleSubmitBtn = async () => {
        // ko co file + ko co preview 
        if(!preview && !selectedFile){
            notification.error({
                message: "Error update book",
                description: "Vui lòng upload ảnh thumbnail"
            })
            return;
        }

        // ko co file + co preview
        let newThumbnail = '';
        if(preview && !selectedFile){
            newThumbnail = dataUpdate.thumbnail;
        } else{
            // co anh preview va co file
            const resUpload = await handleUploadFile(selectedFile, "book");
            if(resUpload.data){
                newThumbnail = resUpload.data.fileUploaded;
            } else{
                notification.error({
                    message: "Error update book",
                    description: JSON.stringify(resUpload.message)
                })
            }
        }
        
        //step 2: update book
        await updateBook(newThumbnail);

    };
    
    const handleCancel = async () => {
        setIsModalUpdateOpen(false);


    };

    useEffect(() => {
        console.log(dataUpdate)
        if(dataUpdate && dataUpdate._id){
            setId(dataUpdate._id);
            setMainText(dataUpdate.mainText);
            setAuthor(dataUpdate.author);
            setPrice(dataUpdate.price);
            setQuantity(dataUpdate.quantity);
            setCategory(dataUpdate.category);
            setPreview(`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataUpdate.thumbnail}`);
        }
    }, [dataUpdate])

    return(
        <>
            <Modal 
                title="Basic Modal" 
                open={isModalUpdateOpen} 
                onOk={() => handleSubmitBtn()} 
                onCancel={handleCancel}
            >
                <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                    <div>
                        <span>Id</span>
                        <Input
                            value={id}
                            disabled
                        />
                    </div>
                    <div>
                        <span>Tiêu đề</span>
                        <Input
                            value={mainText}
                            onChange={(event) => { setMainText(event.target.value) }}
                        />
                    </div>
                    <div>
                        <span>Tác giả</span>
                        <Input
                            value={author}
                            onChange={(event) => { setAuthor(event.target.value) }}
                        />
                    </div>
                    <div>
                        <div>Giá tiền</div>
                        <InputNumber
                            style={{ width: "100%" }}
                            addonAfter={' đ'}
                            value={price}
                            onChange={(event) => { setPrice(event) }}
                        />
                    </div>
                    <div>
                        <div>Số lượng</div>
                        <InputNumber
                            style={{ width: "100%" }}
                            value={quantity}
                            onChange={(event) => { setQuantity(event) }}
                        />
                    </div>

                    <div>
                        <div>Thể loại</div>
                        <Select
                            style={{ width: "100%" }}
                            value={category}
                            onChange={(value) => { setCategory(value) }}
                            options={[
                                { value: 'Arts', label: 'Arts' },
                                { value: 'Business', label: 'Business' },
                                { value: 'Comics', label: 'Comics' },
                                { value: 'Cooking', label: 'Cooking' },
                                { value: 'Entertainment', label: 'Entertainment' },
                                { value: 'History', label: 'History' },
                                { value: 'Music', label: 'Music' },
                                { value: 'Sports', label: 'Sports' },
                                { value: 'Teen', label: 'Teen' },
                                { value: 'Travel', label: 'Travel' },
                            ]}
                        />
                    </div>
                    <div>
                        <div>Ảnh thumbnail</div>
                        <div>
                            <label htmlFor='btnUpload' style={{
                                display: "block",
                                width: "fit-content",
                                marginTop: "15px",
                                padding: "5px 10px",
                                background: "orange",
                                borderRadius: "5px",
                                cursor: "pointer"
                            }}>
                                Upload
                            </label>
                            <input
                                type='file' hidden id='btnUpload'
                                onChange={(event) => handleOnChangeFile(event)}
                                onClick={(event) => event.target.value = null}
                            />
                        </div>
                        {preview &&
                            <>
                                <div style={{
                                    marginTop: "10px",
                                    marginBottom: "15px",
                                    height: "100px", width: "150px",
                                }}>
                                    <img style={{ height: "100%", width: "100%", objectFit: "contain" }}
                                        src={preview} />
                                </div>
                            </>
                        }
                    </div>
                </div>

            </Modal>
        </>
    )
}

export default UpdateBookControl;