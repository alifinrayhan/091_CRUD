const express = require('express');
let mysql = require('mysql2');
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`server is running on port  ${port}`);
});

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Kuroneko23.',
    database: 'mahasiswa',
    port: 3306
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected Successfully ');
});
//membuat method get dan post
//GET
app.get('/api/users', (req, res) => {
    db.query('SELECT * FROM mahasiswa', (err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            res.status(500).send('Server error');
            return;
            
        } 
        res.json(results);

    });
});