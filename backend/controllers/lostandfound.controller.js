import User from "../models/user.model.js";
import PostItem from "../models/items.model.js";
import Message from "../models/messages.js";




export const postLostItem = async(req,res) => {
    try{
    console.log("here");
    const { name, description, question, type ,email } = req.body;
    // console.log(req.file.itemPictures); 

    



    const newPost = await PostItem.create({
      name: name,
      description: description,
      question: question,
      type: type,
      email:email,
      itemPictures:  req.file.key ,
    });
    await newPost.save();

    res.status(200).json({newPost});
  } catch (err) {
    console.log("Error")
    res.status(401).json({
      "Message is": err.message,
    });
  }
}



