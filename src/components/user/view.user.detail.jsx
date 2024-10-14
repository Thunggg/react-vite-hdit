import { Drawer } from "antd";


const ViewUserDetail = (props) => {
    console.log(props);
    const {isUserTableOpen, setIsUserTableOpen, dataUserTableOpen, setDataUserTableOpen} = props;
    const onClose = () => {
        setIsUserTableOpen(false);
    }
    return (
        <>
        <Drawer title="Basic Drawer" onClose={onClose} open={isUserTableOpen}>
            {dataUserTableOpen 
            ? 
                <>
                    <p>ID: {dataUserTableOpen._id}</p>
                    <p>Full Name: {dataUserTableOpen.fullName}</p>
                    <p>Email: {dataUserTableOpen.email}</p>
                    <p>Phone: {dataUserTableOpen.phone}</p>
                </>
            :
                <>
                    <p>không có dữ liệu</p>
                </>
            }
            
        </Drawer>
        </>
    )
}

export default ViewUserDetail;