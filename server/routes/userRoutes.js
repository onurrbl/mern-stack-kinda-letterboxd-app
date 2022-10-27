const express = require('express')
const router = express.Router()


router.get('/',async (req, res) => {
    res.status(201).json({
        message:'Correct'
    })
})

module.exports = router