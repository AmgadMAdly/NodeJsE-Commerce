const catrgory = require("../models/Category");

async function createCategory(req,res,next){
    const {name} =req.body;

    const Created = await catrgory.findOne({name});
    
    if(Created){
        res.status(201).json({
            message: "Product has been Added"
        })
    }else{
        // const Error = new APIError("Couldn't adding product",400);
        // next(Error);
    }
}

async function getCategorybyId(req,res,next){
    const{id} = req.params;

    const category = await category
}