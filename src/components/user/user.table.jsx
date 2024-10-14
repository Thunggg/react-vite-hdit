import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import UpdateUserModal from './update.user.modal';
import { useState } from 'react';


const UserTable = (props) => {
    const { dataUser } = props;

    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);  
    const [dataUpdate, setDataUpdate] = useState(null);

    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
            render: (_, record) => {
                return(
                    <a href='#'>{record._id}</a>
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
                    }}
                    />
                    <DeleteOutlined style={{cursor:"pointer", color: "red"}}/>
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
            />
        </>
        
    )
}

export default UserTable;
