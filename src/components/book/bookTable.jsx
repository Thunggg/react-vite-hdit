import React, { useEffect, useState } from 'react';
import { Space, Table, Tag } from 'antd';
import { getBookAPI } from '../../services/api.service';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import BookDetail from './book.detal';

const BookTable = () => {

    const [dataBook, setDataBook] = useState([]);
    const [current, setCurrent] = useState(1); // trang hien tai
    const [pageSize, setPageSize] = useState(10); // tong so san pham trong 1 trang
    const [pageTotal, setPageTotal] = useState(0); // tong so trang
    
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [dataDetail, setDataDeTail] = useState(null);


    const loadBook = async () => {
        const res = await getBookAPI(current, pageSize);
        if(res && res.data && res.data.result){
            setDataBook(res.data.result);
            setCurrent(res.data.meta.current);
            setPageSize(res.data.meta.pageSize);
            setPageTotal(res.data.meta.total);
        }
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
                console.log(record);
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
                    />
                    <DeleteOutlined
                    style={{ cursor: "pointer", color: "red" }}
                    />
                </div>
            ),
        },

    ];
        
    
    return(
        <>
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
            />
            <BookDetail
                isOpenDrawer={isOpenDrawer}
                setIsOpenDrawer={setIsOpenDrawer}
                dataDetail={dataDetail}
                setDataDeTail={setDataDeTail}
            />
        </>
    )
}
export default BookTable;