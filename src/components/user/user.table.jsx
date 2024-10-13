import { Table } from 'antd';


const UserTable = (props) => {
    const { dataUser } = props;

    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        }
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
        <Table 
        columns={columns} 
        dataSource={dataUser} 
        rowKey={"_id"}
        />
    )
}

export default UserTable;
