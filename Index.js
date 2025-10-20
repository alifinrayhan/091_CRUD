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

//POST
app.post('/api/users', (req, res) => {
    const { nama, nim, kelas, prodi } = req.body;

    if (!nama || !nim || !kelas) {
        return res.status(400).json({ Message: 'nama, nim, dan kelas wajib diisi' });
    
    db.query (
        'INSERT INTO mahasiswa (nama, nim, kelas) VALUES (?, ?, ?)',
        [nama, nim, kelas],
        (err, result) => {
            if (err) {
                console.error('Error adding user:', err);
                res.status(500).send('Database error');
                return;
            }

            res.status(201).json({ Message: 'User added successfully',});
        }
    );
});

//PUT
app.put('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    const { nama, nim, kelas } = req.body;
    db.query(
        'UPDATE mahasiswa SET nama = ?, nim = ?, kelas = ? WHERE id = ?',
        [nama, nim, kelas, userId],
        (err, result) => {
            if (err) {
                console.error('Error updating user:', err);
                res.status(500).send('Database error');
                return;
            }
            res.json({ Message: 'User updated successfully' });
        }
    );
});
