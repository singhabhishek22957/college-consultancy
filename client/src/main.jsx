import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import { router } from './Routes.jsx'
import { UserProvider } from './Components/Context/AdminContext.jsx'

createRoot(document.getElementById('root')).render(
  
   
    
    <StrictMode>
      <UserProvider>
      <RouterProvider router={router}/>
      </UserProvider>
    </StrictMode>
       
      
   
 
);
