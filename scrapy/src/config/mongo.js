const mongoose = require("mongoose");
const NameUer = "";
const PassUser = "";
const NameDB = "";
const ConnectDB = async function () {
    try {
        
    } catch (e) {
        console.log(e)
        await mongoose.disconnect();
        throw e
    }
}