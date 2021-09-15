const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors')
connectToMongo();
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())
//routes available
app.use('/api/authen', require('./routes/authen'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
    console.log(`myNotebook listening at http://localhost:${port}`)
})