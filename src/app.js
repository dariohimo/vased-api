import express from 'express'
import {userRouter} from './routes/index.js'


const app = express()
app.use(express.json())
app.use('/auth', userRouter)

export default app 