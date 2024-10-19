import { Button, Flex, Input, InputNumber, Modal, notification, Select } from "antd";
import { useState } from "react";
import { createBookAPI, handleUploadFile } from "../../services/api.service";

const CreateBookControl = (props) => {

    const [mainText, setMainText] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [category, setCategory] = useState("");

    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);


    const {isCreateOpen, setIsCreateOpen, loadBook} = props;

    
    const handleOnChangeFile = (event) => {
        if(!event.target.value && event.target.value.length === 0){
            setSelectedFile(null);
            setPreview(null);
            return;
        }

        const file = event.target.files[0];
        if(file){
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    }
    
    const resetAndCloseModal = () => {
        setMainText("");
        setAuthor("");
        setPrice("");
        setQuantity("");
        setCategory("");
        setSelectedFile(null);
        setPreview(null);
        setIsCreateOpen(false);
    }

    const handleSubmitBtn  = async () => {
        if (!selectedFile) {
            notification.error({
                message: "Error create book",
                description: "Vui lòng upload ảnh thumbnail"
            })
            return;
        }

        const resUpload = await handleUploadFile(selectedFile, "book");
        if(resUpload.data && resUpload.data.fileUploaded){
            const newThumbnail = resUpload.data.fileUploaded;
            const resBook = await createBookAPI(
                newThumbnail, mainText, author, price, quantity, category
            );

            if(resBook.data){
                resetAndCloseModal();
                await loadBook();
                notification.success({
                    message: "Success create book",
                    description: "Tạo mới sách thành công"
                })
                
            }
            else{
                notification.error({
                    message: "Error create book",
                    description: JSON.stringify(resBook.message)
                })
                return;
            }
        }

        
    }

    return(
        <>
            <Modal title="Create book" open={isCreateOpen} onOk={handleSubmitBtn} onCancel={resetAndCloseModal}>
                <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>

                    <div>
                        <span>Tiêu đề</span>
                        <Input
                            value={mainText}
                            onChange={(event) => setMainText(event.target.value)}
                        />
                    </div>

                    <div>
                        <span>Tác giả</span>
                        <Input
                            value={author}
                            onChange={(event) => setAuthor(event.target.value)}
                        />
                    </div>

                    <div>
                        <span style={{display:"flex"}}>Giá tiền</span>
                        <InputNumber 
                            value={price}
                            style={{ width: "100%" }}
                            onChange={(event) => setPrice(+event)}
                        />
                    </div>

                    <div>
                        <span style={{display:"flex"}}>Số lượng</span>
                        <InputNumber 
                            value={quantity}
                            style={{ width: "100%" }}
                            onChange={(event) => setQuantity(+event)}
                        />
                    </div>

                    <div>
                        <span style={{display:"flex"}}>Thể loại</span>
                        <Select
                            defaultValue="lucy"
                            style={{ width: "100%" }}
                            value={category}
                            onChange={(value) => {setCategory(value)}}
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
                            type='file' 
                            hidden 
                            id='btnUpload'
                            onChange={(event) => handleOnChangeFile(event)}
                            onClick={(event)=> {event.target.value = null}}
                        />
                        {preview && (
                            <img 
                            style={{ height: "100%", width: "100%", objectFit: "contain" }}
                            src={preview} 
                            alt="" />
                        )}
                        
                    </div>

                </div>
            </Modal>
        </>
    )
}

export default CreateBookControl;