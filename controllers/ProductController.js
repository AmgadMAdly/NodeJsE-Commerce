const Product = require("../models/Product");
const { ValidateProduct } = require('../validation/ProductValidation');
const { APIError } = require("../utils/APIError");


async function getAllProducts(req,res,next) {
    
    const products = await Product.find();
    
    if(products){
        res.status(200).json({
            message: "Products has been fetched",
            Data: products
        })
    }else{
        const Error = new APIError("Couldn't fetching Product",400);
        next(Error);
    }
}
async function getProductById(req,res,next){
    const{id} = req.params;

    const fetchedProduct = await Product.findOne({_id:id})
    if(fetchedProduct){
        res.status(200).json({
            message: "Product has been fetched",
            Data: fetchedProduct
        })
    }else{
        const Error = new APIError("Couldn't fetching product",400);
        next(Error);
    }

}
async function createProduct(req,res) {
    
    console.log(req.file);
    if (!req.file) {
        return res.status(400).json({ message: "Image file is required" });
    }
    
        const {name,description,price,quantity,categoryId} = req.body;
        console.log(req.file);
        const image = req.file.path;
    
        const Added = await Product.create({name,description,price,quantity,image,categoryId});
    
        if(Added){
            res.status(201).json({
                message: "Product has been Added"
            })
        }else{
            const Error = new APIError("Couldn't adding product",400);
            next(Error);
        }
    

}

async function updateProduct(req,res,next) {
    const{id} = req.params;
    
    
    const Edited = await Product.updateOne({_id:id},{$set:req.body});
    console.log(Edited);
    if(Edited.modifiedCount ===1){
        res.status(200).json({message: "Product has been Edited",Data: Edited})
    }else{
        const Error = new APIError("Invalid deleting product",400);
        next(Error);
    }
}
async function deleteProduct(req,res,next) {
    const{id}=req.params;

    const Deleted = await Product.deleteOne({_id:id});
    if(Deleted.deletedCount ===1){
        res.status(200).json({message: "Product has been deleted"})
    }else{
        const Error = new APIError("Invalid deleting product",400);
        next(Error);
    }
}

module.exports={
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}