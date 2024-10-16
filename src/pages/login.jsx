import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Form, Input, notification, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI } from "../services/api.service";
import { useState } from "react";

const LoginPage = () => {
    
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); 

    const onFinish = async (values) => {
        setLoading(true);
        const res = await loginAPI(values.email, values.password);
        if(res.data){
            notification.success({
                message: "Login success",
                description:"Đăng nhập thành công"
            })
            navigate("/");
        } else{
            notification.error({
                message: "Login error",
                description: JSON.stringify(res.message)
            })
        }
        setLoading(false);
    }
    return (
        <> 
            <Row justify={"center"} style={{ marginTop: "30px" }}>
                <Col xs={24} md={16} lg={8}>
                    <fieldset style={{
                        padding: "15px",
                        margin: "5px",
                        border: "1px solid #ccc",
                        borderRadius: "5px"
                    }}>
                        <legend>Đăng Nhập</legend>
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={onFinish}
                        >
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Email không được để trống!',
                                    },
                                    {
                                        type: "email",
                                        message: 'Email không đúng định dạng!',
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
                                        message: 'Password không được để trống!',
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item >
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}>
                                    <Button 
                                    type="primary" 
                                    onClick={() => form.submit()}
                                    loading={loading}
                                    >
                                        Login
                                    </Button>
                                    <Link to="/">Go to homepage <ArrowRightOutlined /></Link>
                                </div>
                            </Form.Item>
                        </Form>
                        <Divider />
                        <div style={{ textAlign: "center" }}>
                            Chưa có tài khoản? <Link to={"/register"}>Đăng ký tại đây</Link>
                        </div>
                    </fieldset>
                </Col>
            </Row>
        </>
    )
}

export default LoginPage;
