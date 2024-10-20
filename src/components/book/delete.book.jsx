import { Button, message, Popconfirm } from "antd";

const DeleteBook = () => {

    const confirm = (e) => {
        console.log(e);
        message.success('Click on Yes');
      };
      const cancel = (e) => {
        console.log(e);
        message.error('Click on No');
      };

    return (
        <>
            <Popconfirm
                title="Delete the task"
                description="Are you sure to delete this task?"
                onConfirm={confirm}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
            >
            </Popconfirm>
        </>
    )
}

export default DeleteBook;