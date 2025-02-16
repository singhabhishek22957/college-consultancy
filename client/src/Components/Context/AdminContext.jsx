import { Children, createContext, useContext, useEffect, useState } from "react";
import { getUsers } from "../../Service/AdminService";


// creating user context 
const UserContext = createContext();

export const UserProvider = ({children})=>{
    const [user , setUser] = useState({});

    // fetch user data 
    const fetchUser = async ()=>{
        try {
            const response = await getUsers();
            setUser(response.data.data.user);
          if(response.data.data.user){
              if(!response.data.data.user.avatarUrl){
                setUser((prev)=>({
                    ...prev,
                    avatarUrl:import.meta.env.VITE_AVATAR_URL
                }))
              }
              
          }
          
            
        } catch (error) {
            console.log("failed to fetch user:");  
        }
    }



useEffect(()=>{
    fetchUser();
},[]);


return(
    <UserContext.Provider value={{user, setUser, fetchUser}}>
        {children}
    </UserContext.Provider>
);
};

// custom hook 
export const useUser = ()=>{
    return useContext(UserContext);
}