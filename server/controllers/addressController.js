import Address from "../models/Address.js"

export const addAddress = async(req,res)=>{
    try {
        const {address , userId} = req.body
        await  Address.create({...address , userId})
        res.json({success: true, message: "Address added successfully"})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }

}

export const getAddress = async(req,res)=>{
    try {
        // FIX: Get userId from query for GET requests
        const { userId } = req.query
        //console.log(userId)
        const addresses = await Address.find({userId})
      //  console.log(addresses+"re")

        res.json({success: true, addresses})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}