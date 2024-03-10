const express = require('express');
const cors = require('cors');
const {MongoClient} = require('mongodb');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log(`Server running on the port number ${PORT}`));

//Configuration (MONGODB)
var curl = "mongodb://localhost:27017";
var client = new MongoClient(curl); 

//TESTING
app.get('/klef/test', async function(req, res){
    //res.send("Koneru Lakshmaiah Education Foundation");
    res.json("Koneru Lakshmaiah Education Foundation");
});

app.post('/klef/cse', async function(req, res){
    res.json(req.body);
    //res.json("Computer Science and Engineering");
});

//REGISTRATION MODULE
app.post('/registration/signup', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('MSWD');
        users = db.collection('project');
        data = await users.insertOne(req.body);
        conn.close();
        res.json("Registered successfully...");
    }catch(err)
    {
        res.json(err).status(404);
    }
});

//LOGIN MODULE
app.post('/login/signin', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('MSWD');
        users = db.collection('project');
        data = await users.findOne(req.body, {projection: { role: 1 }});
        conn.close();

        if (!data) {
            return res.status(401).json({ error: 'Invalid Credentials' });
        }

        res.json({ role: data.role });
    } catch(err)
    {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




//HOME MODULE
app.post('/home/uname', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('MSWD');
        users = db.collection('project');
        data = await users.find(req.body, {projection:{firstname: true, lastname: true}}).toArray();
        conn.close();
        res.json(data);
    }catch(err)
    {
        res.json(err).status(404);
    }
});



app.post('/home/menu', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('MSWD');
        menu = db.collection('collections');
        data = await menu.find({}).sort({mid:1}).toArray();
        conn.close();
        res.json(data);
    }catch(err)
    {
        res.json(err).status(404);
    }
});

app.post('/home/Products/Add Products', async function(req, res){
    try
    {
        const { mid, smid } = req.body;
        conn = await client.connect();
        db = conn.db('MSWD');
        products = db.collection('products');
        data = await products.findOne({ 'menu.mid': M001, 'menu.smid': M00102 });
        conn.close();

        if (!data) {
          return res.status(404).json({ error: 'Product not found' });
        }

        res.json(data);
    } catch(err)
    {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// ADD PRODUCT MODULE
app.post('/home/addproduct', async function (req, res) {
    try {
        conn = await client.connect();
        db = conn.db('MSWD');
        products = db.collection('products'); // Assuming you have a collection named 'products'
        data = await products.insertOne(req.body);
        conn.close();
        res.json("Product added successfully...");
    } catch (err) {
        res.json(err).status(404);
    }
});

app.post('/home/menus', async function(req, res){
    try
    {
        conn = await client.connect();
        db = conn.db('MSWD');
        menus = db.collection('data');
        data = await menus.find(req.body).sort({smid:1}).toArray();
        conn.close();
        res.json(data);
    }catch(err)
    {
        res.json(err).status(404);
    }
});