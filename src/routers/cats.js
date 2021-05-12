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

     // OLD WATERFALL METHOD LISTED BELOW - NO LONGER NEEDED AS ASYNC AWAIT FRAMEWORK NOW IS FUNCTIONAL 
        // var tasks = [
        //     myconn,
        //     mysql, myexecute, myresults,
        //     mydisco
        // ];

        // waterfall(tasks, done);
        // console.log("Async calls underway\n");



        // function myconn(cb) {
        //     connection.connect(connOptions);
        //     cb(null);
        // }

        // function mysql(cb) {
        //     var sql = 'SELECT * FROM TEST_SCHEMA.CATS';
        //     cb(null, sql);
        // }

        // function myexecute(sql, cb) {
        //     var rows = connection.exec(sql);
        //     cb(null, rows);
        // }

        // function myresults(rows, cb) {
        //     console.log(util.inspect(rows, { colors: true }));
        //     console.log("");
        //     res.send(rows);
        //     cb(null);
        // }

        // function mydisco(cb) {
            
        //     connection.disconnect(cb);
        // }

        // function done(err) {
        //     console.log("Async done");
        //     if (err) {
        //         return console.error(err);
        //     }
        // }
    

    
})

router.get('/newcat', (req, res)=>{
    res.render('newcat')
})

router.post('/cats', async (req, res)=> {
    let name = req.body.name;
    let age = req.body.age;
    
    const connection = hana.createConnection();
    try{
        await connection.connect(connOptions);
    }catch(e){
        res.status(400).send(e);
    }
    
    console.log("Name: ", name, " Age: ", age);
    res.send("hello: ", name);

    // const sql = "INSERT INTO TEST_SCHEMA.CATS(NAME, AGE) VALUES(?, ?)";
    // try {
    //         const rows = await connection.exec(sql, [name, age]);
    //         res.status(201).send(rows);
    //  } catch (e) {
    //         res.status(400).send("The error happened during the post here is the error:",e);
    //  }
    
    try{
        await connection.disconnect();
        console.log('db connection deleted');
    }catch(e) {
        res.status(400).send(e);
    }

    
})

module.exports = router