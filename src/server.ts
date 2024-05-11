import express from 'express'
import dotenv from 'dotenv'

dotenv.config()
const app = express()

app.get('/', (req, res) => {
  res.send('basic server...')
})

const port = parseInt(process.env.PORT as string) || 3001
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
