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


export const getCategoryItem = async(req,res) =>{
    try{
        const product = await Item.distinct("type");
        console.log("category" , product);


        const productByCategory = []

        for(const category of product){
            const product = await Item.findOne({type:category })

            if(product){
                productByCategory.push(product)
            }
        }

        res.json({
            message : "category product",
            data : productByCategory,
            success : true,
            error : false
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




export const getCategoryWiseItem = async(req,res) =>{
    try{
        const { category } = req?.query;
        const product = await Item.find({type:category});
        res.json({
            data:product,
            message:"Product",
            success:true,
            error:false
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

export const getItemDetailsById = async(req,res) =>{
    try{
        const { productId } = req.query;

        const product = await Item.findById(productId);

        res.status(200).json({
            data:product,
            message:"OK",
            success:true,
            error:false
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

export const updateFoundItem = async(req,res) =>{
    try{
        const { _id , foundBy , emailBy ,email , answer } = req.body;

        

        if(emailBy === email){
         return  res.status(400).json({
                message:"Same user cannot update",
                success:false,
                error:true
            })
        }
        if(answer === ""){
            return  res.status(400).json({
                message:"No answer given",
                success:false,
                error:true
            })
        }
        const product = await Item.findById(_id);
        product.foundBy=foundBy;
        product.emailBy=emailBy;
        product.answer=answer;
        
        await product.save();

        res.json({
            message:"Item Reported to Owner",
            success:true,
            error:false,
            data:product
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


export const deleteUserProduct = async(req,res) =>{
    try{

        const { productId } = req.query;
        const deletedProduct = await Item.findByIdAndDelete(productId);

    res.json({
        message:"Item Successfully deleted",
        success:true,
        error:false,
        data:product
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
