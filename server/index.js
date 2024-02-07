const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'spyder11',
    database: 'mydb'
})

app.post('/save', (req, res) => {
    const address = req.body.address;
    db.query('INSERT into addresses (id, address) VALUES (NULL, ?)', [address], (err, result) => {
        if(err) {
            console.log(err);
        }
        else{
            res.send('Address saved successfully');
        }
    })
})


app.get('/', (req, res) => {
    db.query('SELECT * FROM addresses ORDER BY id DESC LIMIT 1', (err, result) => {
        if(err) {
            console.log(err);
        }
        else{
            res.send(result)
        }
    })
})

app.listen(8080, () => {
    console.log('Server running on port 8080')
})

