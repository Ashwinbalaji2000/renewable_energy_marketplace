const express = require('express');
const router = express.Router();
const RequestEnergy = require('../models/RequestEnergy');
const Transaction = require('../models/Transaction')
const User = require('../models/Users')

router.post('/insertenergyrequest',(req, res) => {
    const postData = req.body;
    console.log(postData)
    RequestEnergy.insertMany([postData]).then((result)=>{
        res.send({"status":200})
    }).catch(err => {
        console.error('Error inserting data:', err);
        res.send({"status":500})
    });
});

router.post('/fetchRequest',(req, res) => {
    const postData = req.body;
    console.log(postData)
    RequestEnergy.find({"to":postData.id}).then((result)=>{
        res.send(result)
    }).catch(err => {
        console.error('Error inserting data:', err);
        res.send({"status":500})
    });
    
});

router.post('/sellenergy',(req, res) => {
    const postData = req.body;
    console.log(postData)
    Transaction.insertMany([postData]).then((result1)=>{
        RequestEnergy.deleteMany({}).then((result2)=>{
            User.findById(postData.to).then((resultdata)=>{
                let total_energy = (parseInt(resultdata.bought_energy) + parseInt(postData.energy))
                User.findByIdAndUpdate(postData.to,{"bought_energy":total_energy}).then((finaldata)=>{
                    User.findById(postData.from).then((fromuser)=>{
                    let total_energy = (parseInt(fromuser.sold_energy) + parseInt(postData.energy))
                    User.findByIdAndUpdate(postData.from,{"sold_energy":total_energy}).then((finaldata)=>{
                        res.send({"status":200})
                   
                    }).catch(err => {
                        console.error('Error inserting data:', err);
                        res.send({"status":500})
                    });
               
                }).catch(err => {
                    console.error('Error inserting data:', err);
                    res.send({"status":500})
                });
    
                }).catch(err => {
                    console.error('Error inserting data:', err);
                    res.send({"status":500})
                });

            }).catch(err => {
                console.error('Error inserting data:', err);
                res.send({"status":500})
            });
        }).catch(err => {
            console.error('Error inserting data:', err);
            res.send({"status":500})
        });
    }).catch(err => {
        console.error('Error inserting data:', err);
        res.send({"status":500})
    });
   
    
});

router.post('/fetchalltransaction',(req, res) => {
    Transaction.find().then((result)=>{
        res.send(result)
    }).catch(err => {
        console.error('Error inserting data:', err);
        res.send({"status":500})
    });
});

module.exports = router;