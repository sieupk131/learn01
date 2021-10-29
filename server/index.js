require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose');
const authRouter = require('./routes/auth')
const postRouter = require('./routes/post')
const cors = require('cors')
const connectDB = async () => {
    const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.aw1tk.mongodb.net/learn02?retryWrites=true&w=majority`;
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected DB')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
connectDB()
const app = express()
app.use(express.json())
app.use(cors())
app.use('/api/auth', authRouter)
app.use('/api/posts', postRouter)
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`server start on port ${PORT}`))
