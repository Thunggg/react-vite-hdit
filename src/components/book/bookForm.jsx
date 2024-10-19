import { Button } from "antd"

const BookForm = () => {
    return ( 
    <>
        <div className="user-form" style={{ margin: "10px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>Book page</h3>
                <Button
                    type="primary"> Create User </Button>
            </div>
        </div>
    </>   
    )
}

export default BookForm 