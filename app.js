const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const { default: mongoose } = require('mongoose');
const app = express();
const port = 3002;


const products = require('./routes/products')



mongoose.connect('mongodb+srv://admin:acxgqLcFuGaZq8dw@cluster1.elh2x.mongodb.net/')
    .then(() => console.log('connection successfully!'))
    .catch((err) => console.log(err))


app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());


app.use(cors({
    origin: 'http://localhost:5173', // Allow this origin
    methods: 'GET,PUT,POST,DELETE',
    allowedHeaders: 'Content-Type'
}));



app.use('/products', products)

app.get('/', (req, res) => {
    res.send('Welcome to the server!');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

module.exports = app;