import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, notification, Popconfirm, Table } from 'antd';
import UpdateUserModal from './update.user.modal';
import { useState } from 'react';
import ViewUserDetail from './view.user.detail';
import { deleteUserAPI } from '../../services/api.service';


const UserTable = (props) => {
    const { dataUser, loadUser } = props;

    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);  
    const [dataUpdate, setDataUpdate] = useState(null);

    const [isUserTableOpen, setIsUserTableOpen] = useState(false); // cua view.user.detail
    const [dataUserTableOpen, setDataUserTableOpen] = useState(null);

    const handelDelete = async (id) => {
        const res = await deleteUserAPI(id);
        if(res.data){
            notification.success({
                message: "Delete user",
                description:"Xóa user thành công"
            })
            await loadUser();
        } else{
            notification.error({
                message: "Delete user",
                description:"Xóa user thất bại"
            })
            await loadUser();
        }
    }

    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
            render: (_, record) => {
                return(
                    <a 
                    href='#'
                    onClick={() => {
                        setIsUserTableOpen(true);
                        setDataUserTableOpen(record);
                    }}
                    >{record._id}</a>
                )
            }
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
              <>
                <div style={{display:"flex", gap: "30px"}}>
                    <EditOutlined 
                    style={{cursor:"pointer", color: "orange"}}
                    onClick={() => {
                        setIsModalUpdateOpen(true);
                        setDataUpdate(record);
                        setDataUserTableOpen(record);
                    }}
                    />
                    
                    <Popconfirm
                        title="Xóa người dùng"
                        description="Bạn có chắc xóa người dùng này không?"
                        onConfirm={() => handelDelete(record._id)}
                        okText="Yes"
                        cancelText="No"
                        placement ="left"
                    >
                        <DeleteOutlined style={{cursor:"pointer", color: "red"}}/>
                    </Popconfirm>
                </div>
                
              </>
            ),
          },
    ];
    // const data = [
    //     {
    //         key: '1',
    //         name: 'John Brown',
    //         age: 32,
    //         address: 'New York No. 1 Lake Park',
    //         tags: ['nice', 'developer'],
    //     },
    //     {
    //         key: '2',
    //         name: 'Jim Green',
    //         age: 42,
    //         address: 'London No. 1 Lake Park',
    //         tags: ['loser'],
    //     },
    //     {
    //         key: '3',
    //         name: 'Joe Black',
    //         age: 32,
    //         address: 'Sydney No. 1 Lake Park',
    //         tags: ['cool', 'teacher'],
    //     },
    // ];


    

    return (
        <>
            <Table 
                columns={columns} 
                dataSource={dataUser} 
                rowKey={"_id"}
            />
            <UpdateUserModal
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadUser={loadUser}
            />
            <ViewUserDetail
            isUserTableOpen={isUserTableOpen}
            setIsUserTableOpen={setIsUserTableOpen}
            dataUserTableOpen={dataUserTableOpen}
            setDataUserTableOpen={setDataUserTableOpen}
            />
        </>
        
    )
}

export default UserTable;
