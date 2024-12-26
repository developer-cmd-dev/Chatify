import express, { urlencoded } from 'express'
import cors from 'cors';
import cookieParser from 'cookie-parser'

const app = express();
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({
    limit:'50kb'
}))

app.use(express.urlencoded({extended:true,limit:'50kb'}));

app.use(express.static('public'));
app.use(cookieParser())



// routes import
import useRouter from './routes/user.routes.js';
import { errorHandler } from './middleware/error.middleware.js';
app.use('/api/v1',useRouter)
app.use(errorHandler)
export {app}
