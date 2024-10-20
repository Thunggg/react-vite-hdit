import { Button, Form, Input, InputNumber, Modal, notification, Select, Space } from "antd";
import { Option } from "antd/es/mentions";
import { useState } from "react";
import { createBookAPI, handleUploadFile } from "../../services/api.service";


const CreateBookUncontrol = (props) => {

    const [form] = Form.useForm();

    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const { isCreateOpen, setIsCreateOpen, loadBook } = props;

    const resetAndCloseModal = () => {
        setSelectedFile(null);
        setPreview(null);
        form.resetFields();
        setIsCreateOpen(false);
    }

    const handelOnchange = (event) => {
        const file =  event.target.files[0];
        setSelectedFile(file);
        setPreview(URL.createObjectURL(file));
    }

    const handelFinish = async (value) => {
        if(!selectedFile){
            notification.error({
                message: "Error create book",
                description: "Vui lòng upload ảnh thumbnail"
            })
        } 

        const resUpload = await handleUploadFile(selectedFile, "book"); // upload vao database local tren may
        if(resUpload.data){
            //upload anh thanh cong
            const {mainText, author, price, quantity, category} = value;
            const res = await createBookAPI(resUpload.data.fileUploaded, mainText, author, price, quantity, category);

            //upload len database thanh cong
            if(res.data){
                resetAndCloseModal();
                loadBook();
                notification.success({
                    message: "Success create book",
                    description: "Upload thành công!"
                })
            } else{
                notification.error({
                    message: "Error upload file",
                    description: JSON.stringify(res.message)
                })
    
            }
        } else{
            notification.error({
                message: "Error upload file",
                description: JSON.stringify(resUpload.message)
            })

        }

    }

    return(
        <>
            <Modal 
                title="Basic Modal" 
                open={isCreateOpen} 
                onOk={() => {form.submit()}} 
                onCancel={() => resetAndCloseModal()}
            >
                <Form
                    form={form}
                    onFinish={(value) => handelFinish(value)}
                    name="basic"
                    labelCol={{
                        span: 5,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    // onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Tiêu đề"
                        name="mainText"
                        rules={[
                            {
                            required: true,
                            message: 'Làm ơn hãy nhập vào tiêu đề !',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Tác giả"
                        name="author"
                        rules={[
                            {
                            required: true,
                            message: 'Làm ơn hãy nhập vào tác giả !',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Giá tiền"
                        name="price"
                        rules={[
                            {
                            required: true,
                            message: 'Làm ơn hãy nhập vào giá tiền !',
                            },
                        ]}
                    >
                        <InputNumber
                            style={{ width: "100%" }}
                            addonAfter={' đ'}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Số lượng"
                        name="quantity"
                        rules={[
                            {
                            required: true,
                            message: 'Làm ơn hãy nhập vào số lượng !',
                            },
                        ]}
                    >
                        <InputNumber
                            style={{ width: "100%" }}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Thể loại"
                        name="category"
                        rules={[
                            {
                            required: true,
                            message: 'Làm ơn hãy chọn thể loại !',
                            },
                        ]}
                    >
                        <Select
                            style={{ width: "100%" }}
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
                    </Form.Item>
                        
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
                            style={{display:"none"}}
                            onChange={(event) => handelOnchange(event)}
                            onClick={(event) => event.target.value = null}
                        />
                        {preview && (
                            <img 
                                style={{ height: "100%", width: "100%", objectFit: "contain" }}
                                src={preview} 
                                alt="" 
                            />
                        )}
                        
                    </div>
                </Form>
            </Modal>
        </>
    )
};

export default CreateBookUncontrol;

