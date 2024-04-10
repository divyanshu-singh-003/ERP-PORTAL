import Item from "../models/item.model.js";

export const UploadItemController = async(req,res) =>{
    try{
        const uploadItem = new Item(req.body);
        await uploadItem.save();
        res.status(201).json({
            message:"Product uploaded successfully",
            error:false,
            success:true,
            data:uploadItem
        })

    }
    catch(e){
        res.status(400).json({
            message:err.message || err,
            error:true,
            success:false
        })
    }
}

export const getProductController = async(req,res) => {
    const {email}=req.query;

    try{
        const allProduct = await Item.find({email});
        res.json({
            message:"All products",
            success:true,
            error:true,
            data:allProduct
        })
    }
    catch(e){
        res.status(400).json({
            message:err.message || err,
            error:true,
            success:false
        })
    }

}

export const updateProductController = async(req,res) =>{
    try{
        const { _id , ...resBody} = req.body;

        const updateProduct = await Item.findByIdAndUpdate(_id,resBody);
        res.json({
            message:"Product Updated Succesfully",
            success:true,
            error:false,
            data:updateProduct
        })
    }
    catch(e){
        res.status(400).json({
            message:e.message || e,
            error:true,
            success:false
        })
    }
}

