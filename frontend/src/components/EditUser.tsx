import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from "axios"

type EditUserModalProps = {
    home_id:number,
    isOpen:boolean,
    onClose: () => void,
    addr:string
}

export const EditUserModal : React.FC<EditUserModalProps> = ({ addr, home_id, isOpen, onClose }) => {
    const [users,setusers] = useState([]);
    const [checked_users,setchecked_users] = useState<any>([]);
    useEffect(() => {
        const fetchUsers = async() => {
            if(isOpen){
                const res_users:any = await axios.get("http://localhost:3000/user/find-all");
                setusers(res_users.data.users);
                const response = await axios.get("http://localhost:3000/user/find-by-home", {params :{home_id}});
                const selected_users = response.data.users.map((user:any) => user.id);
                setchecked_users(selected_users);
                console.log("UF", selected_users);
            }
        }
        fetchUsers();
    }, [isOpen, home_id]);

    const handleCheck = (user_id:number) => {
        console.log("Entered!")
            if(checked_users?.includes(user_id)){
                setchecked_users(checked_users.filter((num:number) => num!==user_id));
                console.log("CD", checked_users);
            }
            else{
                setchecked_users([...checked_users,user_id]);
            }
        console.log("B", checked_users);
    }

    const handleSave = async() => {
        console.log("Final Checked_users", checked_users);
        try {
            const resp = await axios.put("http://localhost:3000/home/update-users", {home_id, checked_users});
            if(resp.status===200){
                onClose();
            }
        } catch (error:any) {
            alert(`Error : ${error.message}`)   
        }
    } 

    return (
        <Modal show={isOpen} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit User for {addr}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                <p>CHECKED USERS{checked_users}</p>
                    {users.map((obj:any) => (
                        <div key = {obj.id}>
                        <input type="checkbox" id={obj.id} value={obj.id} checked={checked_users?.includes(obj.id)} onChange={() => {handleCheck(obj.id)}}/>
                        <label>{obj.username}</label>
                        </div>
                    ))}
                <Button variant="primary" disabled={checked_users.length === 0} onClick={handleSave}>
                    Save Changes
                </Button>
                </Form>
            </Modal.Body>
    </Modal>

    )
}
