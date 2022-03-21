import Product from "../models/Product";
import { emailError, parseAsciiToString } from '../middlewares/index';
import { readFiles } from '../middlewares'
//import xml2js from 'xml2js';


const xml2js = require('xml2js');

export const createProducts = async(req, res) => {
    try {
        if (req.file.originalname.match(/\.(xml)$/)) {
            readFiles.ReadXml(req.file);
        } else if (req.file.originalname.match(/\.(rar)$/)) {
            readFiles.ReadRar(req.file);
        } else if (req.file.originalname.match(/\.(zip)$/)) {
            readFiles.ReadZip(req.file);
        }
        res.send("ok");

        //prueba con muter

        // // //pRUEBA CON ARCHIVOS Prueba superada
        // if (req.files.file.mimetype == 'application/xml') {
        //     const text = Buffer.from(req.files.file.data);
        //     const result = parseAsciiToString.ParseStrings(text);
        //     res.json(result);
        // } else {
        //     const text = Buffer.from(req.files.file.data);
        //     const parsejson = JSON.parse(text);
        //     res.json(parsejson);
        // }



        //PRUEBA CON XML
        // if (req.body.user) {
        //     console.log("es xml");
        //     const { user } = req.body;
        //     const newProduct = new Product({ name: user.name.toString(), category: user.category.toString(), price: user.price.toString(), imgURL: user.web[0].$.enlace });
        //     //const productSave = await newProduct.save();
        //     res.json(newProduct);
        // } else {
        //     const { name, category, price, imgURL } = req.body
        //     const newProduct = new Product({ name, category, price, imgURL });
        //     //console.log(newProduct);
        //     //const productSave = await newProduct.save();
        //     console.log("es json");
        //     res.json(newProduct);
        // }

        //PRUEBA INICIAL
        // const { name, category, price, imgURL } = req.body
        // const newProduct = new Product({ name, category, price, imgURL });
        // const productSave = await newProduct.save()
        // res.json(productSave)
    } catch (error) {
        res.status(500).json("error")
        await emailError.ErrorSend(req.body, "createProducts", error)
    }
}

export const getProducts = async(req, res) => {
    //const { name, category, price } = req.body;
    //const products = await Product.find({ "name": { $regex: name }, "category": { $regex: category } })
    const products = await Product.find()
    res.status(200).json(products)
}

export const getProductsbyId = async(req, res) => {
    const product = await Product.findById(req.params.productId);
    res.status(200).json(product)
}

export const updateProductsById = async(req, res) => {
    const updateProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, {
        new: true
    })
    res.status(200).json(updateProduct)
}

export const deleteProductsById = async(req, res) => {
    const { productId } = req.params;
    const deleteProduct = await Product.findByIdAndDelete(productId);
    res.status(204).json(deleteProduct)
}