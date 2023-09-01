const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const cors = require('cors');

const app = express();

const mongoDbUrl = 'mongodb://0.0.0.0:27017';
const databaseName = 'ProductDetail';
let productCollection;

MongoClient.connect(mongoDbUrl, { useUnifiedTopology: true })
    .then(client => {
        console.log("Connected successfully to MongoDB");
        const db = client.db(databaseName);
        productCollection = db.collection('products');
    })
    .catch(error => console.error("Connection error:", error));

app.use(cors());
app.use(express.json());

app.post('/createProduct', async (req, res) => {
    try {
        const result = await productCollection.insertOne(req.body);
        res.status(200).send('Product added successfully');
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/products', async (req, res) => {
    try {
        const products = await productCollection.find().toArray();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).send(error);
    }
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));