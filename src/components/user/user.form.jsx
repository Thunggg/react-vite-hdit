import { Button, Input, notification } from "antd";
import { useState } from "react";
import { createUserAPI } from "../../services/api.service";

const UserForm = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");

    const handleClick = async () => {
        const res = await createUserAPI(fullName, email, password, phone);
        if(res.data){
            notification.success({
                message: "create User",
                description: "Tạo user thành công"
            })
        } else{
            notification.error({
                message: "create User",
                description: JSON.stringify(res.message)
            })
        }
    }

    return (
        <div className="user-form" style={{ margin: "20px 0" }}>
            <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                <div>
                    <span>Full Name</span>
                    <Input 
                    onChange={(event) => {setFullName(event.target.value)}}
                    />
                </div>
                <div>
                    <span>Email</span>
                    <Input 
                    onChange={(event) => {setEmail(event.target.value)}}
                    />
                </div>
                <div>
                    <span>Password</span>
                    <Input.Password 
                    onChange={(event) => {setPassword(event.target.value)}}
                    />
                </div>
                <div>
                    <span>Phone number</span>
                    <Input 
                    onChange={(event) => {setPhone(event.target.value)}}
                    />
                </div>
                <div>
                    <Button
                    onClick={() => handleClick()}
                    type="primary"> Create User </Button>
                </div>
            </div>
        </div>
    )
}

export default UserForm;
