const router = require('express').Router()
const db = require('../config/db')

router.get('/', async(req, res) => {
    const sql = 'SELECT * FROM `employee`'
    await db.query(sql, (err, result) => {
        if(err) return res.json({
            status: 0,
            message: 'Data is not found!'
        })
        res.json({
            status: 1,
            result
        })
    })
})


router.post('/search', async(req, res) => {
    const { search } = req.body
    const sql = "select * from employee where nip like '%"+search+"%' or name like '%"+search+"%' or address like '%"+search+"%'"
    await db.query(sql, (err, result) => {
        if(err) return res.json({
            status: 0,
            message: 'Data is not found!'
        })
        res.json({
            status: 1,
            result
        })
    })
})

router.get('/:nip', async(req, res) => {
    const {nip} = req.params
    const sql = 'SELECT * FROM employee WHERE nip = ?'
    await db.query(sql, nip, (err, result) => {
        if(err) return res.json({
            status: 0,
            message: 'Data is not found'
        })
        res.json({
            status: 1,
            result
        })
    })
})

router.post('/', async(req, res) => {
    const { name, address } = req.body
    const sql = 'INSERT INTO employee SET ?'
    const input = {name, address}
    await db.query(sql, input, (err, result) => {
        if(err) return res.json({
            status : 0,
            message : 'Data failed to post!'
        })
        res.json({
            status : 1,
            message : 'Success to post!'
        })
    })
})

router.put('/:nip', async(req, res) => {
    const {name, address} = req.body
    const {nip} = req.params
    const sql = 'UPDATE employee SET name = ?, address = ? WHERE nip = ?'
    await db.query(sql, [name, address, nip], (err, result) => {
        if(err) return res.json({
            status: 0,
            message: 'Data cannot be updated!'
        })
        res.json({
            status: 1,
            message: 'Success to update!'
        })
    })
})

router.delete('/:nip', async(req, res) => {
    const { nip } = req.params
    const sql = 'DELETE FROM employee WHERE nip = ?'
    console.log(nip)
    await db.query(sql, nip, (err, result) => {
        if(err) return res.json({
            status: 0,
            message: "Data cannot be deleted!"
        })
        res.json({
            status: 1,
            message: "Success to delete!"
        })
    })
})


module.exports = router