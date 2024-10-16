import { Button, Input, Form, notification } from "antd";
import {registerUserAPI} from "../services/api.service"
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate(); 

    const onFinish = async (values) => {
        console.log(">>> check values: ", values)
        const res = await registerUserAPI(
            values.fullName,
            values.email,
            values.password,
            values.phone);

        if(res.data){
            notification.success({
                message: "Register user",
                description: "Đăng ký user thành công"
            })

            navigate("/login");
        } else{
            notification.error({
                message: "Register user",
                description: "Đăng ký user thất bại"
            })
        }
    }

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        >
            <div style={{
                margin: "50px",
            }}>
                <Form.Item
                    label="Full Name"
                    name="fullName"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your fullName!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Phone number"
                    name="phone"
                    rules={[
                        {
                            required: true,
                            pattern: new RegExp(/\d+/g),
                            message: "Wrong format!"
                        }
                    ]}
                >
                    <Input />
                </Form.Item>


                <div>
                    <Button
                        onClick={() => form.submit()}
                        type="primary">Register</Button>
                </div>
            </div>
        </Form>
    )

}

export default RegisterPage;
