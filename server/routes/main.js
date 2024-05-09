const express = require("express")
const router = express.Router();
const User = require('../models/Users')

router.get('/:id',async(req,res)=>{
    try{
    //  const data = await User.findById(req.params.id)
     let userdatas = await User.find({})
     let data = {}
     let peerdata = {}
     userdatas.forEach(element => {
        if(element._id == req.params.id){
            data = element
        }else{
            peerdata = element
        }
     });
     res.render("index",{data,peerdata})   

    }catch(error){
        console.log(error)
    }

    
})

// function insertPostData(){
//     User.insertMany([
//         {
//             name:"peer1",
//             solar_energy: 300,
//             irradiation: 50,
//             wind_energy: 700,
//             wind_speed: 80,
//             energy_consumption: 400,
//             battery_soc:80
//         },
//         {
//             name:"peer2",
//             solar_energy: 900,
//             irradiation: 100,
//             wind_energy: 500,
//             wind_speed: 50,
//             energy_consumption: 750,
//             battery_soc:95
//         }
//     ])
// }

// insertPostData();

module.exports = router;