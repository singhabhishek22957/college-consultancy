import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';
import { User } from '../models/user.models.js';
import bcrypt from 'bcryptjs';


const connectDB= async()=>{
    try{
        const connectionOPtions={
            useNewUrlParser:true,
            useUnifiedTopology:true
        };

        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URL}${DB_NAME}`); // connectionOPtions
        console.log(`\n MongoDb connected to ${connectionInstance.connection.host}`);


        // default admin create 
        const existAdmin = await User.findOne({$or:[{username:process.env.ADMIN_USERNAME},{email:process.env.ADMIN_EMAIL}]});

        if(!existAdmin){
            const password = await bcrypt.hash(process.env.ADMIN_PASSWORD,10);
            await User.create({
                username:process.env.ADMIN_USERNAME,
                email:process.env.ADMIN_EMAIL,
                fullName:process.env.ADMIN_FULL_NAME,
                avatarUrl:process.env.ADMIN_AVATAR_URL,
                password:password
            })

            console.log("Admin created successfully");
        }else{
            console.log("Admin already exist");
        }
    }catch(error){    
        console.log("Error to connect DB: ",error);
        process.exit(1);
        
    }
}


export default connectDB;