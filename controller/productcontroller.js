let products=require('../models/product_model')
exports.createproduct=async (req,res)=>
{
    try
    {
        const { title, price, image } = req.body;
        //store the details in the table model we will do crud
        await products.create({title,price,image})//insert the data
        res.json({"msg":"product saved successfully"})

    }
    catch(error)
    {
        res.json({"msg":error.message})
    }
}



exports.getproduct=async (req,res)=>
{
    try
    {
        //let maxlimit=req.query.limit
        let shipment=req.query.location
        let maxlimit=req.query.limit
        let allproducts=await products.find().limit(maxlimit)
        //if(shipment!=='india') return res.json({msg:`imported from ${shipment}`})
        res.json(allproducts);

    }
    catch(error)
    {
        res.json({"msg":error.message})
    }
}

exports.updateproduct=async (req,res)=>
{
    try
    {
        let product_id=req.params.id;//to capture the id or value 
        await products.findByIdAndUpdate(product_id,req.body)//(prodct id,objrct to mofify)
        res.json({"msg":"updated succesfully"})

    }
    catch(error)
    {
        res.json({"msg":error.message})
    }
}


exports.deleteproduct=async (req,res)=>
{
    try
    {
        let product_id=req.params.id;//to capture the id or value 
        await products.findByIdAndDelete(product_id)//(prodct id,objrct to mofify)
        res.json({"msg":"deleted succesfully"})

    }
    catch(error)
    {
        res.json({"msg":error.message})
    }
}