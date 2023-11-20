const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
//since we couldnot get the dummyuser data it was empty thats because of the urlencoded which works for the forms , so we have to add below line
app.use(bodyParser.json())

const User = mongoose.model('User', {
    first_name: String,
    last_name: String,
    email: String,
    avatar: String,

})

// app.get('/', (req, res) => {
//     res.json({
//         status :'Success',
//         message: 'All Good'
//     })
// })

app.get('/users', async (req, res)=> {
    try{
        //for dummyUser data
        // console.log('yes only this line', req.body)
        const users = await User.find({})
        res.json({
            status :'Success',
            data: users
        })

    }catch (error){
       res.json({
        status :'Failed',
        message: 'Something went wrong'
       })

    }
})

app.post('/users', async (req, res)=> {
    try{
        const { first_name, last_name, email, avatar} = req.body
        await User.create({first_name, last_name, email, avatar})
        res.json({
            status :'Success',
            message: 'user created successfully'
        })

    }catch (error){
       res.json({
        status :'Failed',
        message: 'Something went wrong'
       })

    }
})

app.listen(process.env.PORT,() => {
    mongoose.connect(process.env.MONGODB_URL)
   .then(()=> console.log(`Server running on http://localhost:${process.env.PORT}`))
   .catch(error => console.log(error))
})