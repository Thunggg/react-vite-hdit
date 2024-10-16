import { Link, NavLink } from 'react-router-dom';
import {  BookOutlined, LoginOutlined, MailOutlined, SettingOutlined, UsergroupDeleteOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Children, useState } from 'react';

const Header = () => {
    const [current, setCurrent] = useState('mail');
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    const items = [
        {
          label: <Link to={"/"}>Home</Link>,
          key: 'home',
          icon: <MailOutlined />,
        },
        {
          label: <Link to={"/users"}>Users</Link>,
          key: 'users',
          icon: <UsergroupDeleteOutlined />,
        },
        {
          label: <Link to={"/books"}>Books</Link>,
          key: 'books',
          icon: <BookOutlined />
        },
        {
          label: "Cài đặt",
          key: 'setting',
          icon: <SettingOutlined />,
          children:[
            {
              label: <Link to={"/login"}>đăng nhập</Link>,
              key: 'login'
            },
            {
              label: 'Đăng xuất',
              key: 'logout',
            },
          ]
        }
      ];

    return (
        <>
            <Menu 
            onClick={onClick} 
            selectedKeys={[current]} 
            mode="horizontal" 
            items={items} 
            />;
        </>
    )
}

export default Header;
