const axios = require("axios").default

setInterval(async ()=>{
    console.log("Kick New Session Server");
    await axios.get("https://yody-backend-api.onrender.com/option/fetch_all")
},780000)