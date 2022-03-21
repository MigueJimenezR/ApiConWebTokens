import express from "express"
import morgan from "morgan";
import productsRoutes from './routes/product.routes'
import authRoutes from './routes/auth.routes'
import { createRol } from "./libs/initSetup";
import cors from 'cors';
import xmlparser from 'express-xml-bodyparser'
//import fileUpload from "express-fileupload";
const app = express();
app.use(cors());



createRol();
app.use(express.json());
//app.use(fileUpload());
app.use(morgan("dev"));
app.use(xmlparser());
app.use('/api/products', productsRoutes)
app.use('/api/auth', authRoutes)

export default app;