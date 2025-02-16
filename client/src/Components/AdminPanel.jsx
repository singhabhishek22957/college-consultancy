import React, { useEffect, useState } from 'react';
import { useUser } from './Context/AdminContext';
import UserContact from './User/UserContact';



const AdminPanel = () => {

   
    const [error , setError]= useState("");
    const {user} = useUser();

   


    
    return (
        <>
        <div>{error}</div>
            <h1>Admin panel</h1>
            <UserContact/>
            <img src={`${user.avatarUrl}`} alt="" />


        
        </>
    );
}

export default AdminPanel;
