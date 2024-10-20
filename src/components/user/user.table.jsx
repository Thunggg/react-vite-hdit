import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, notification, Pagination, Popconfirm, Table } from 'antd';
import UpdateUserModal from './update.user.modal';
import { useState } from 'react';
import ViewUserDetail from './view.user.detail';
import { deleteUserAPI } from '../../services/api.service';


const UserTable = (props) => {
    const { dataUser, loadUser, current, pageSize, total, setCurrent, setPageSize } = props;

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
            title: "STT",
            render: (_, record, index) => {
                return(
                    <>
                        <p>{(index + 1) + (current - 1) * pageSize}</p>
                    </>
                    
                )
            }
        },
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
    
    const onChange = (pagination, filters, sorter, extra) => {
        // nếu thay đổi trang
        if(pagination && pagination.current){
            if(+pagination.current !== +current){
                setCurrent(+pagination.current);
            }
        }

        // nếu thay đổi tổng số phần tử
        if(pagination && pagination.pageSize){
            if(+pagination.pageSize !== +pageSize){
                setPageSize(+pagination.pageSize);
            }
        }
    }

    

    return (
        <>
            <Table 
                columns={columns} 
                dataSource={dataUser} 
                rowKey={"_id"}
                pagination={
                    {
                        current: current,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        total: total,
                        showTotal: (total, range) => {return (<div>{range[0]}-{range[1]} trên {total} rows</div>)}
                    }
                }
                onChange={onChange}
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
            loadUser={loadUser}
            />
        </>
        
    )
}

export default UserTable;
