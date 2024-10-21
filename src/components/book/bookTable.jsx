import React, { useEffect, useState } from 'react';
import { Button, message, notification, Popconfirm, Space, Table, Tag } from 'antd';
import { deleteBookAPI, getBookAPI } from '../../services/api.service';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import BookDetail from './book.detal';
import CreateBookControl from './create.book.control';
import BookForm from './bookForm';
import CreateBookUncontrol from './create.book.uncontroller';
import UpdateBookControl from './update.book.control';
import UpdateBookUncontrol from './update.book.uncontrol';

const BookTable = () => {

    const [dataBook, setDataBook] = useState([]);
    const [current, setCurrent] = useState(1); // trang hien tai
    const [pageSize, setPageSize] = useState(10); // tong so san pham trong 1 trang
    const [pageTotal, setPageTotal] = useState(0); // tong so trang
    
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [dataDetail, setDataDeTail] = useState(null);

    const [dataUpdate, setDataUpdate] = useState(null);
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);


    const [isCreateOpen, setIsCreateOpen] = useState(false);
    
    const [loadingTable, setLoadingTable] = useState(false); 

    const loadBook = async () => {
        setLoadingTable(true);
        const res = await getBookAPI(current, pageSize);
        if(res && res.data && res.data.result){
            setDataBook(res.data.result);
            setCurrent(res.data.meta.current);
            setPageSize(res.data.meta.pageSize);
            setPageTotal(res.data.meta.total);
        }
        setLoadingTable(false);
    }

    useEffect(() => {
        loadBook();
    }, [current, pageSize]);

    const handleTableOnChange = (event) => {
        if(event && event.current){
            setCurrent(+event.current);
        }

        if(event && event.pageSize){
            setPageSize(+event.pageSize);
        }
    }

    const columns = [
        {
            title: 'STT',
            key: 'stt',
            render: (item, record, index) => {
                return(
                    <>
                        <p>{ (current - 1) * pageSize + index + 1 }</p>
                    </>
                )
            }
        },
        {
            title: 'ID',
            dataIndex: '_id',
            key: 'namid',
            render: (text, record) => <a onClick={() => {
                setIsOpenDrawer(true);
                setDataDeTail(record);
            }}>{text}</a>,
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'mainText',
            key: 'mainText',
        },
        {
            title: 'Giá tiền',
            dataIndex: 'price',
            key: 'price',
            render: (value) => {
                return(
                    <>
                        <p>{value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</p>
                    </>
                )

            }
        },
        {
            title: 'Số Lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (value) => {
                return(
                    <>
                        <p>{value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
                    </>
                )

            }
        },
        {
            title: 'Tác giả',
            dataIndex: 'author',
            key: 'author',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div style={{ display: "flex", gap: "20px" }}>
                    <EditOutlined
                    style={{ cursor: "pointer", color: "orange" }}
                    onClick={() => {
                        setDataUpdate(record)
                        setIsModalUpdateOpen(true)
                    }}
                    />
                    <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        onConfirm={() => handelDelete(record)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <DeleteOutlined
                            style={{ cursor: "pointer", color: "red" }}
                        />
                    </Popconfirm>
                    
                </div>
            ),
        },

    ];
        
    const handelDelete = async (record) => {
        if(record){
            const id = record._id;
            const res = await deleteBookAPI(id);
            if(res.data){
                notification.success({
                    message: "Delete book",
                    description: "Xóa book thành công"
                })
                await loadBook();    
            } else {
                notification.error({
                    message: "Error delete book",
                    description: JSON.stringify(res.message)
                })
            }    
        }
    }

    return(
        <>  
            <div className="user-form" style={{ margin: "10px 0", padding:"0px 20px"}}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h3>Book page</h3>
                    <Button
                        type="primary"
                        onClick={() => {setIsCreateOpen(true)}}
                    > Create User </Button>
                </div>
            </div>
            <Table 
                style={{marginBottom: "30px", padding:"0px 20px"}}
                columns={columns} 
                dataSource={dataBook} 
                pagination=
                {{ 
                    current: current,
                    pageSize: pageSize,
                    total: pageTotal,
                    showSizeChanger: true, 
                    pageSizeOptions: ['2', '5', '10']
                }}
                onChange={handleTableOnChange}
                loading={loadingTable}
            />
            <BookDetail
                isOpenDrawer={isOpenDrawer}
                setIsOpenDrawer={setIsOpenDrawer}
                dataDetail={dataDetail}
                setDataDeTail={setDataDeTail}
            />
            {/* <CreateBookControl
                isCreateOpen={isCreateOpen}
                setIsCreateOpen={setIsCreateOpen}
                loadBook={loadBook}
            /> */}
            <CreateBookUncontrol
                isCreateOpen={isCreateOpen}
                setIsCreateOpen={setIsCreateOpen}
                loadBook={loadBook}
            />
            {/* <UpdateBookControl
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                loadBook={loadBook}
            /> */}
            <UpdateBookUncontrol
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                loadBook={loadBook}
            />
        </>
    )
}
export default BookTable;