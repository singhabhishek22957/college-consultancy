import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'

const app = express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({
    limit:'16kb'
}))

app.use(express.urlencoded({
    extended:true,
    limit:'16kb'
}))

app.use(express.static('public'))
app.use(cookieParser())

// routes import 
 // user router
import userRouter from './routes/user.Router.js';
app.use("/api/v1/user",userRouter)


// university router
import universityRoute from './routes/university.router.js';
app.use("/api/v1/university",universityRoute)

// course router
import courseRoute from './routes/course.Router.js';
app.use("/api/v1/course", courseRoute)



// admission router
import admissionRoute from './routes/admission.Router.js';
app.use("/api/v1/admission", admissionRoute)




// default route
app.get("/",(req,res)=>{
    res.send("<h1>This is home page</h1>")
})







export {
    app
}