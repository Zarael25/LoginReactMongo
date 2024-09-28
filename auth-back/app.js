const express = require('express');
const cors = require('cors');
const app=express();
const mongoose=require('mongoose');

require('dotenv').config();

const port = process.env.PORT || 3100;

app.use(cors());
app.use(express.json());


async function main() {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log("CONECTADO A MONGO");

}
main().catch(console.error)


app.use('/api/signup', require('./routes/signup'))
app.use('/api/sigout', require('./routes/signout'))
app.use('/api/login', require('./routes/login'))
app.use('/api/user', require('./routes/user'))
app.use('/api/todos', require('./routes/todos'))
app.use('/api/refresh-token', require('./routes/refreshToken'))




app.get( '/' , (req, res) => {
        res.send('Servidor Alvaro');
    }
);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
