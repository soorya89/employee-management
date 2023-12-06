import express from 'express'
import cors from 'cors'
import {adminRouter} from './Routes/AdminRoute.js'

const app=express()
app.use(cors({
    origin:["http://localhost:5173"],
    method:["GET","POST","PUT","DELETE"],
    credentials:true
}))
app.use(express.json())
app.use('/admin',adminRouter)


app.listen(3000,()=>{
    console.log("Server is running");
})