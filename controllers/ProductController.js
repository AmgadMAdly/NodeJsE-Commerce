const product = require("../models/Product");

async function getAllProducts(req,res,next) {
    const products = await product.find();
    
    if(products){
        res.status(200).json({
            message: "Products has been fetched",
            Data: products
        })
    }else{
        // const Error = new APIError("Couldn't fetching product",400);
        // next(Error);
    }
}

async function getProductById(req,res,next){
    const{id} = req.params;

    const product = await product.findOne({_id:id})
    if(product){
        res.status(200).json({
            message: "Product has been fetched",
            Data: product
        })
    }else{
        // const Error = new APIError("Couldn't fetching product",400);
        // next(Error);
    }

}

async function createProduct(req,res,next) {
    const {name,price,quantity,categoryId} = req.body;
    const image = req.file.path;

    const Added = await product.create({name,price,quantity,image,categoryId});

    if(Added){
        res.status(201).json({
            message: "Product has been Added"
        })
    }else{
        // const Error = new APIError("Couldn't adding product",400);
        // next(Error);
    }
}

async function updateProduct(req,res,next) {
    const{id} = req.params;
    
    const Edited = await product.updateOne({_id:id},{$set:req.body});

    if(Edited.modifiedCount ===1){
        res.status(200).json({message: "Product has been Edited"})
    }else{
        // const Error = new APIError("Invalid deleting product",400);
        // next(Error);
    }
}

async function deleteProduct(req,res,next) {
    const{id}=req.params;

    const Deleted = await product.deleteOne({_id:id});
    if(Deleted.deletedCount ===1){
        res.status(200).json({message: "Product has been deleted"})
    }else{
        // const Error = new APIError("Invalid deleting product",400);
        // next(Error);
    }
}

module.exports={
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}