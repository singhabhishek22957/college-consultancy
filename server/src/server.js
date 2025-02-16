import dotenv from 'dotenv';
import {app} from './app.js';
import connectDB from './db/index.js';


dotenv.config({
    path:'./.env'
});

connectDB().then(()=>{
    app.on("error", (error)=>{
        console.log("Error to connect DB:", error);
        process.exit(1);
        
    })

    app.listen(process.env.PORT||5000,()=>{
        console.log(`server is running on port http://localhost:${process.env.PORT|| 5000}`);
        
    });
})
.catch((error)=>{
    console.log("Error to connect DB:", error);
    process.exit(1);
})