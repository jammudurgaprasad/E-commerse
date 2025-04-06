//AddressController.js

const Address = require('../models/Address');

module.exports.addAddress = async (req, res) => {
    const { userId } = req.params; // Get userId from URL parameter
    const { fullname, phonenumber, pincode, state, city, houseno, area } = req.body;

    try{
        const newAddress = new Address({
            userId,
            fullname,
            phonenumber,
            pincode,
            state,
            city,
            houseno,
            area
        });
        await newAddress.save();
        return res.status(201).json({message: "Address added", newAddress});
    }
    catch(err){
        console.error(err);
        res.status(500).json({error : "Error adding address"});
    }
}

module.exports.getAddress = async (req, res) => {
    try{
        const {userId} = req.params;
        const userAddresses = await Address.find({ userId });
        res.status(200).json(userAddresses);
    }
    catch(err){
        console.error(err);
        res.status(500).json({error : "Error fetching address"});
    }
}

module.exports.deleteAddress = async (req, res) => {
    try {
        const { addressId } = req.params;
        await Address.findByIdAndDelete(addressId);
        res.status(200).json({ message: "Address deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error deleting address" });
    }
};
