import { Form, Input, InputNumber, Modal, notification, Select } from "antd";
import { useEffect, useState } from "react";
import { handleUploadFile, updateBookAPI } from "../../services/api.service";

const UpdateBookUncontrol = (props) => {

    const [form] = Form.useForm();

    const {dataUpdate, setDataUpdate, isModalUpdateOpen, setIsModalUpdateOpen, loadBook} = props;

    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const resetAndCloseModal = () => {
        form.resetFields();
        setDataUpdate(null);
        setIsModalUpdateOpen(false);
        setSelectedFile(null);
        setPreview(null);
    }

    useEffect(() => {
        if(dataUpdate){
            form.setFieldsValue({
                id: dataUpdate._id,
                mainText: dataUpdate.mainText,
                author: dataUpdate.author,
                price: dataUpdate.price,
                quantity: dataUpdate.quantity,
                category: dataUpdate.category
            });
            setPreview(`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataUpdate.thumbnail}`)
        }
    }, [dataUpdate])

    const handleOnChangeFile = (event) => {
        // nguoi dung khong chon file nao hoac chon file khong hop le
        if(!event.target.files && event.target.files[0] === 0){
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

    const updateBook = async (newThumbnail, values) => {
        const { id, mainText, author, price, quantity, category } = values;
        const res = await updateBookAPI(id, newThumbnail, mainText, author, price, quantity, category);
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

    const handleSubmitBtn = async (event) => {
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
        await updateBook(newThumbnail,event);
    }

    return (
        <>
            <Modal
                title="Update Book"
                open={isModalUpdateOpen}
                onOk={() => form.submit()}
                onCancel={() => resetAndCloseModal()}
                maskClosable={false}
                okText={"UPDATE"}
            >
                <Form
                    form={form}
                    onFinish={(event) => handleSubmitBtn(event)}
                    layout="vertical"
                >
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <div>
                            <Form.Item
                                label="Id"
                                name="id"
                            >
                                <Input disabled />
                            </Form.Item>
                        </div>
                        <div>
                            <Form.Item
                                label="Tiêu đề"
                                name="mainText"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Tiêu đề không được để trống!',
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </div>
                        <div>
                            <Form.Item
                                label="Tác giả"
                                name="author"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Tác giả không được để trống!',
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </div>
                        <div>
                            <Form.Item
                                label="Giá tiền"
                                name="price"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Giá tiền không được để trống!',
                                    }
                                ]}
                            >
                                <InputNumber
                                    style={{ width: "100%" }}
                                    addonAfter={' đ'}
                                />
                            </Form.Item>
                        </div>
                        <div>
                            <Form.Item
                                label="Số lượng"
                                name="quantity"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Số lượng không được để trống!',
                                    }
                                ]}
                            >
                                <InputNumber
                                    style={{ width: "100%" }}
                                />
                            </Form.Item>
                        </div>

                        <div>
                            <Form.Item
                                label="Thể loại"
                                name="category"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Thể loại không được để trống!',
                                    }
                                ]}
                            >
                                <Select
                                    style={{ width: "100%" }}
                                    name="category"
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
                                    style={{ display: "none" }}
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
                </Form>
            </Modal>

        </>
    )
}

export default UpdateBookUncontrol;