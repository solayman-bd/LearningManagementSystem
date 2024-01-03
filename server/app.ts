import express,{NextFunction, Request, Response} from 'express'
export const app= express()
import cors from "cors"
import cookieParser from 'cookie-parser'
import { errorMiddleware } from './middleware/error'

require('dotenv').config()

app.use(express.json({limit:"50mb"}))

app.use(cookieParser())
app.use(cors({
    origin:process.env.ORIGIN
}))

app.get("/test",(req:Request,res:Response,next:NextFunction)=>{
    res.status(200).json({
        success:true,
        message: "API is working"
    })
})

app.all("*",(req: Request,res:Response, next:NextFunction)=>{
    const err=new Error (`Route ${req.originalUrl} is not found`) as any
    err.statusCode=404;
    next(err)
})
app.use(errorMiddleware);