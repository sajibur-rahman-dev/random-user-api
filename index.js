const express = require('express');
const { errorHandler } = require('./middlewares/common/errorHandler.middleware');
const usersRoute = require('./routes/user.route');

const app = express()

const port = process.env.PORT || 5000

app.use(express.json())

app.use('/user',usersRoute)

app.get('/',(req,res)=>{
    res.send('root route')
})

app.use(errorHandler)

app.listen(port,()=>console.log(`server is running ${port}`))