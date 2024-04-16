import Cab from "../models/cabs.model.js";


export const putCab = async(req,res) =>{
    try{
        console.log("here");
        
        const  data  = req.body;
        console.log(data.email);
    const cab = await Cab.findOne({email:data.email});

    if(!cab){
        const newCab = new Cab({
            stuid : data.stuid,
            email : data.email,
            train : data.train,
            date: data.date,
            hour : data.hour,
            minute : data.minute,
            destination : data.destination,
            phoneNumber : data.phoneNumber
        });
        await newCab.save();

        res.json({
            message:"Trip added successfully",
            success:true,
            error:false,
        });

    }
    else{
        cab.train = data.train;
        cab.date = data.date;
        cab.hour = data.hour;
        cab.minute = data.minute;
        cab.destination = data.destination,
        cab.phoneNumber = data.phoneNumber

        await cab.save();

        res.json({
            message:"Trip added successfully",
            success:true,
            error:false,
        });
    }
    }
    catch(e){
        res.status(400).json({
            message:e.message || e,
            error:true,
            success:false
        })
    }
    
}


export const getCabs = async (req, res) => {
    try {
      const { date, destination } = req.query;
      const users = await Cab.find({ date, destination }, { _id: 0, stuid: 1, phoneNumber: 1, train: 1, hour: 1, minute: 1 , date:1,destination:1});
      res.json({
        message: "Trip shown successfully",
        success: true,
        error: false,
        data: users,
      });
    } catch (e) {
      res.status(400).json({
        message: e.message || e,
        error: true,
        success: false
      });
    }
  }
  