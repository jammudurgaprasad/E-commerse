const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
        require:true,
    },
    fullname:{
        type:String,
        require: true,
    },
    phonenumber:{
        type: Number,
        require: true,
    },
    pincode:{
        type: Number,
        require: true,
    },
    state:{
        type: String,
        require: true,
    },
    city:{
        type: String,
        require: true,
    },
    houseno:{
        type: String,
        require: true,
    },
    area:{
        type: String,
        require: true,
    }
});

const Address = mongoose.model("address", AddressSchema);
module.exports = Address;