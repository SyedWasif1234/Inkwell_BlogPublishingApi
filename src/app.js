import express from 'express'
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.get('/', (req, res) => {
  res.send('📝 Welcome to the Inkwell Blog Publishing API!');
});

import authRouter from "./auth/auth.router.js"
import postRouter from "./post/post.router.js"
import CategoryRouter from './category/category.router.js';
import AdminRouter from './admin/admin.router.js';

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/post", postRouter)
app.use("/api/v1/category", CategoryRouter)
app.use("/api/v1/admin", AdminRouter)


export {app}
