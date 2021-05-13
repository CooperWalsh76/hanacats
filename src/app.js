/*
Hello and welcome to the main file of this bad boy, here I define the express router
I set some configs like my templating engine, my path, and access to my enviroment 
variables.  For those of you not familar with npm visit npmjs.com and enter any 
of the text in the '' of the require statement to find the documentation on that 
library.  I also bring in the router here for the cats REST endpoints, the paths 
that are outlined here only serve up the views, go to the router folder and you find 
how the /cats api's work
Last Modified: 5/12/2021 Cooper Walsh
*/
require('dotenv').config();
const path = require('path')
const express = require('express')
const hbs = require('hbs')





//load router files here
const catsRouter = require('./routers/cats')


// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()

const port = process.env.PORT


// Define paths for express configs 
const publicDirectoryPath = path.join(__dirname, './public')
const viewPath = path.join(__dirname, './templates/views')
// const partialsPath = path.join(__dirname, '../templates/partials')


// set handlebars and views location
 app.set('view engine', 'hbs')

 app.set('views', viewPath)
// hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.use(express.json())
app.use(catsRouter)




app.get('', (req, res) => {
     res.render('index', {
         title: 'Cats App',
         name: 'Cats'
     })
})


app.get('/newcat', (req, res)=>{
    res.render('newcat')
})

app.get('/delcat', (req, res)=>{
    res.render('deletecat')
})

app.get('/uptcat', (req, res)=>{
    res.render('updatecat')
})

//for the 404 page
app.get('*', (req, res) => {
     res.render('notfound')
})

//serve up the server
app.listen(port, ()=> {
    console.log('Server ' + port + ' porto wine-o')
})


