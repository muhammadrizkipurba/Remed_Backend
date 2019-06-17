const express = require('express')
const app = express()
app.use(express.json())

// Connect to Mysql
const mysql = require('mysql')
const conn = mysql.createConnection({
    hos: 'localhost',
    user: 'root',
    password: 'Mysql123',
    database: 'remedialbackend',
    port: '3306'
})

conn.connect((err)=>{
    if(err) throw err
    console.log('MYSQL connected')
})

app.get('/karyawan', (req,res) => {
    var sql = `SELECT * from karyawan`

    conn.query(sql, (err, result) => {
        if(err) return res.json(err)
        res.send(result)
    })
})

// Tambah Karyawan
app.post('/karyawan', (req,res) => {
    var sql = `INSERT INTO karyawan SET ?`
    var sql2 = `SELECT * FROM karyawan`
    var data = req.body
    
    conn.query(sql, data, (err, result) => {
        if(err) return res.json(err)
        conn.query(sql2, (err, result)=> {
            if(err) return res.json(err)
            res.json( `berhasil ditambah` )
        })
    })
})

// UPDATE data
app.put('/karyawan/:id', (req,res) => {
    var data = [req.body,req.params.id]
    var sql   = `UPDATE karyawan SET ? WHERE id = ?`;
    var sql2 = `SELECT * FROM karyawan`;
    
    conn.query(sql, data, (err, result) => {
        if(err) return res.json(err)
        
        conn.query(sql2, (err, result) => {
            if(err) return res.json(err)
            res.send('Berhasil diedit')
        })
    })
})

// DELETE data
app.delete('/karyawan', (req,res) => {
    var sql   = `DELETE FROM karyawan WHERE id = ?`;
    var sql2 = `SELECT * FROM karyawan`;
    var data = req.body.id
    
    conn.query(sql, data, (err, result) => {
        if(err) return res.json(err)
        
        conn.query(sql2, (err, result) => {
            if(err) return res.json(err)
            res.send('Berhasil dihapus')
        })
    })
})


const port = 5000
app.listen(port, () => {
    console.log("Server running on port", port)
})