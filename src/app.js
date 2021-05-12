require('dotenv').config();
const path = require('path')
const express = require('express')
const hbs = require('hbs')




//self built packages


//bring in db
//const pool = require('./db/conn')

//load model classes here <- This section might be redundant now CW 4.15.20
//const User = require('./models/user')
//const Customer = require('./models/customer')

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


app.get('*', (req, res) => {
     res.render('notfound')
})

app.listen(port, ()=> {
    console.log('Server ' + port + ' porto wine-o')
})


