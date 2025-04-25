const catrgory = require("../models/Category");


async function createCategory(req,res,next){
    const {name} =req.body;

    const Created = await catrgory.findOne({name});
    
    if(Created){
        return
    }


}