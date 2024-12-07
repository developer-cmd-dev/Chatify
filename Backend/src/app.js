import express, { urlencoded } from 'express'
import cors from 'cors';

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


// routes import
import useRouter from './routes/user.routes.js';
app.use('/api/v1',useRouter)
export {app}
