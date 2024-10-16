import { Button, Drawer, notification } from "antd";
import { useState } from "react";
import { handleUploadFile, updateUserAvatarAPI } from "../../services/api.service";


const ViewUserDetail = (props) => {
    const {isUserTableOpen, setIsUserTableOpen, dataUserTableOpen, loadUser} = props;
    const onClose = () => {
        setIsUserTableOpen(false);
    }

    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();

    const handleOnChangeFile = (event) => {
        if(!event.target.files || event.target.files.length === 0){
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

    const handelUpdateUserAvatar = async () => {
        // upload file
        const resUpload = await handleUploadFile(selectedFile, "avatar");
        if(resUpload.data){
            const newAvatar = resUpload.data.fileUploaded;
            const resUpdateAvatar = await updateUserAvatarAPI(
                newAvatar, dataUserTableOpen._id, dataUserTableOpen.fullName, dataUserTableOpen.phone
            );

            if(resUpdateAvatar.data){
                setIsUserTableOpen(false);
                setSelectedFile(null);
                setPreview(null);
                await loadUser();

                notification.success({
                    message: "Update user avatar",
                    description: "Cập nhật avatar thành công"
                })

            } else{
                notification.error({
                    message: "Error update avatar",
                    description: JSON.stringify(resUpdateAvatar.message)
                })

            }

        } else{
            notification.error({
                message: "Error upload file",
                description: JSON.stringify(resUpload.message)
            })
        }
        // update user
    }

    return (
        <>
        <Drawer 
        title="Basic Drawer" 
        onClose={onClose} 
        open={isUserTableOpen}
        width={"40vw"}
        >
            {dataUserTableOpen 
            ? 
                <>
                    <p>ID: {dataUserTableOpen._id}</p>
                    <p>Full Name: {dataUserTableOpen.fullName}</p>
                    <p>Email: {dataUserTableOpen.email}</p>
                    <p>Phone: {dataUserTableOpen.phone}</p>
                    <div style={{
                        marginTop: "10px",
                        height: "100px", width: "150px",
                        border: "1px solid #ccc"
                    }}
>
                        <img 
                        src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataUserTableOpen.avatar}` }
                        alt="" 
                        style={{ height: "100%", width: "100%", objectFit: "contain" }}
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
                            Upload Avatar
                        </label>
                        <input 
                        type='file' hidden id='btnUpload' 
                        onChange={(event) => handleOnChangeFile(event)}
                        />
                    </div>
                    
                    {preview && 
                        <>
                            <div style={{
                                marginTop: "10px",
                                height: "100px", width: "150px",
                                border: "1px solid #ccc"
                            }}
    >
                                <img 
                                    src={preview}
                                    alt="" 
                                    style={{ height: "100%", width: "100%", objectFit: "contain" }}
                                />
                            </div>
                            <Button 
                            type="primary"
                            onClick={() => handelUpdateUserAvatar()}
                            >Save</Button>
                        </>
                        
                    }

                    
                </>
            :
                <>
                    <p>không có dữ liệu</p>
                </>
            }
            
        </Drawer>
        </>
    )
}

export default ViewUserDetail;