//This is the router that servers up the cats data
const express = require('express')
var hana = require('@sap/hana-client');

//this will display your enviroment variable values, used for debugging not very secure 
console.log('env:',process.env.DBSRC, '',process.env.DBUSR, process.env.DBPASS)

//connection options, you need to create a .env file for this to work 
var connOptions = {
    serverNode: process.env.DBSRC,
    encrypt: 'true',
    sslValidateCertificate: 'false', 
    pooling: 'true',
    uid: process.env.DBUSR,
    pwd: process.env.DBPASS
};



//create new router instance of an express router 
const router = new express.Router()

//add a new cat
router.post('/cats', async (req, res)=> {
    //log the body of the request for debuging purposes 
    console.log(req.body);

    //assign local values and convert age to a base 10 int
    let name = req.body.name;
    let age =  parseInt(req.body.age, 10);

    //see if anything bad slipped through the cracks
    if(name==""||name==null){
        res.status(400).send("Need a name");
        return;
    }else if((age==""||age==null)||(!Number.isInteger(age)||age<0)){
        res.status(400).send("Please enter a valid age");
        return;
    }

    //create the connection to the db
    const connection = hana.createConnection();
    try{
        await connection.connect(connOptions);
    }catch(e){
        res.status(400).send(e)
    }
    
    //send insert statement 
    try {
            const sql = await connection.prepare("INSERT INTO TEST_SCHEMA.CATS(NAME, AGE) VALUES(?, ?)");
            const rows = await sql.execQuery([name, age]);
            res.send(rows)
     } catch (e) {
            console.log(e)
            res.status(400).send(e)
     }

     //release connection
     try{
        await connection.disconnect();
        console.log('db connection deleted');
     }catch(e) {
        res.status(400).send(e)
     }  
})


router.delete('/cats/:id', async (req, res)=> {
    
    //pass in id of cat to delete
    let id = req.params.id;
    console.log(id);
    
    //create connection to db
    const connection = hana.createConnection();
    try{
        await connection.connect(connOptions);
    }catch(e){
        res.status(400).send(e)
    }
    
    //see if there is a cat to delete
    try {
            const sql = await connection.prepare("SELECT * FROM TEST_SCHEMA.CATS WHERE CAT_ID = ?");
            const rows = await sql.exec([id]);
            console.log(rows);
            if(rows.length===0){
                await connection.disconnect();
                res.send('Could not delete cat');
                return;
            }
     } catch (e) {
            console.log(e)
            res.status(400).send(e)
     }

     //delete the cat
     try {
            const sql = await connection.prepare("DELETE FROM TEST_SCHEMA.CATS WHERE CAT_ID = ?");
            const rows = await sql.exec([id]);
            res.send('Cat was deleted');    
     } catch (e) {
            console.log(e)
            res.status(400).send(e)
     }

     //release db connection
     try{
        await connection.disconnect();
        console.log('db connection deleted');
     }catch(e) {
        res.status(400).send(e)
     }  
})


router.get('/cats', async (req, res)=> {
    
    //connect to database
    const connection = hana.createConnection();
    try{
        await connection.connect(connOptions);
    }catch(e){
        res.status(400).send(e)
    }
    

    //select all the cats from the database 
    const sql = 'SELECT * FROM TEST_SCHEMA.CATS';
    try {
            const rows = await connection.exec(sql);
            res.status(200).send(rows)
     } catch (e) {
            res.status(400).send(e)
     }

     //release connection to db
     try{
        await connection.disconnect();
        console.log('db connection deleted');
     }catch(e) {
        res.status(400).send(e)
     }

})


router.get('/cats/:id', async (req, res)=> {
    
    //pass in id of cat to delete
    let id = req.params.id;
    console.log(id);
    
    //create connection to db
    const connection = hana.createConnection();
    try{
        await connection.connect(connOptions);
    }catch(e){
        res.status(400).send(e)
    }
    
    //see if there is a cat to delete
    try {
            const sql = await connection.prepare("SELECT * FROM TEST_SCHEMA.CATS WHERE CAT_ID = ?");
            const rows = await sql.exec([id]);
            console.log(rows);

            if(rows.length===0){
                await connection.disconnect();
                res.status(404).send("Could not find cat with that ID");
                return;
            }

            res.send(rows[0]);
     } catch (e) {
            console.log(e)
            res.status(400).send(e)
     }

     //release connection to db
     try{
        await connection.disconnect();
        console.log('db connection deleted');
     }catch(e) {
        res.status(400).send(e)
     }

})







module.exports = router