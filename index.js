process.on('uncaughtException', (err) => console.log(err.message))
import express from 'express'
import { dbConnection } from './database/dbConnection.js'
import { globalError } from './src/utils/globalError.js'
import dotenv from 'dotenv'
import { bootstrap } from './src/bootstrap.js'

const app = express()

app.use(express.json())
app.use('/uploads', express.static('uploads'))
dotenv.config()
const port = 3000
process.on('unhandledRejection', (err) => console.log(err.message))
dbConnection()
bootstrap(app)


app.use(globalError)
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)

})


