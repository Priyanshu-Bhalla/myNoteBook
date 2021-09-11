const connectToMongo = require('./db');
const express = require('express');
connectToMongo();
const app = express()
const port = 5000

app.use(express.json())
//routes available
app.use('/api/authen', require('./routes/authen'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})