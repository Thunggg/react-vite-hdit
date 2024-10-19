import { Link, Navigate, NavLink, useNavigate } from 'react-router-dom';
import {  AliwangwangOutlined, AuditOutlined, BookOutlined, HomeOutlined, LoginOutlined, MailOutlined, SettingOutlined, UsergroupAddOutlined, UsergroupDeleteOutlined } from '@ant-design/icons';
import { Menu, message } from 'antd';
import { Children, useContext, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import { logoutAPI } from '../../services/api.service';

const Header = () => {
  const [current, setCurrent] = useState('');

  const { user, setUser } = useContext(AuthContext);

  const navigate = useNavigate(); 
  
  const onClick = (e) => {
      setCurrent(e.key);
  };

  const handelLogout = async () => {
    const res = await logoutAPI();
    if(res.data){
        localStorage.clear("access_token");
        setUser({
            email: "",
            phone: "",
            fullName: "",
            role: "",
            avatar: "",
            id: ""
        })
        message.success("Logout Thành Công"); 
        navigate("/");
    }
  }

  const items = [
      {
          label: <Link to={"/"}>Home</Link>,
          key: 'home',
          icon: <HomeOutlined />,
      },
      {
          label: <Link to={"/users"}>Users</Link>,
          key: 'users',
          icon: <UsergroupAddOutlined />
      },
      {
          label: <Link to={"/books"}>Books</Link>,
          key: 'books',
          icon: <AuditOutlined />,
      },

      ...(!user.id ? [{
          label: <Link to={"/login"}>Đăng nhập</Link>,
          key: 'login',
          icon: <LoginOutlined />,
      }] : []),

      ...(user.id ? [{
          label: `Welcome ${user.fullName}`,
          key: 'setting',
          icon: <AliwangwangOutlined />,
          children: [
              {
                  label: <span onClick={() => handelLogout()}>Đăng xuất</span>,
                  key: 'logout',
              },
          ],
      }] : []),


  ];

  return (
      <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
      />
  )
}


export default Header;
