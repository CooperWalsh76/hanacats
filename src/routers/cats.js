const express = require('express')
//bring in db
//const pool = require('../db/conn')
var util = require('util');
var waterfall = require('async-waterfall');
var hana = require('@sap/hana-client');

console.log('env:',process.env.DBSRC, '',process.env.DBUSR, process.env.DBPASS)

var connOptions = {
    serverNode: process.env.DBSRC,
    encrypt: 'true',
    sslValidateCertificate: 'false', 
    uid: process.env.DBUSR,
    pwd: process.env.DBPASS
};




const router = new express.Router()

router.post('/cats', async (req, res)=> {
    console.log(req.body);
    let name = req.body.name;
    let age = req.body.age;


    const connection = hana.createConnection();
    try{
        await connection.connect(connOptions);
    }catch(e){
        res.status(400).send(e)
    }
    
    
    
    try {
            const sql = await connection.prepare("INSERT INTO TEST_SCHEMA.CATS(NAME, AGE) VALUES(?, ?)");
            const rows = await sql.execQuery([name, age]);
            res.send(rows)
     } catch (e) {
            console.log(e)
            res.status(400).send(e)
     }

     try{
        await connection.disconnect();
        console.log('db connection deleted');
     }catch(e) {
        res.status(400).send(e)
     }  
})

router.post('/cats/*', async (req, res)=> {
    res.send('POST request to the homepage')  
})



router.get('/cats', async (req, res)=> {
    
    const connection = hana.createConnection();
    try{
        await connection.connect(connOptions);
    }catch(e){
        res.status(400).send(e)
    }
    
    const sql = 'SELECT * FROM TEST_SCHEMA.CATS';
    try {
            const rows = await connection.exec(sql);
            res.status(200).send(rows)
     } catch (e) {
            res.status(400).send(e)
     }

     try{
        await connection.disconnect();
        console.log('db connection deleted');
     }catch(e) {
        res.status(400).send(e)
     }

})







module.exports = router