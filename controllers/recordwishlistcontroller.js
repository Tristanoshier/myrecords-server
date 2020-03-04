const express = require('express');
const router = express.Router();
const WishlistRecord = require('../db').import('../models/recordwishlist');

// (page: wishlist) allows user to create album for their wishlist
router.post('/create', (req, res) =>{
    const recordFromRequest = {
        name: req.body.name,
        artist: req.body.artist,
        year: req.body.year,
        userId: req.user.id
    }
    WishlistRecord.create(recordFromRequest)
        .then(record => res.status(200).json(record))
        .catch(err => res.status(500).json({error: err}))
});

// (page: wishlist) should find all albums in wishlist under that user
router.get('/find', (req, res) => {
    User.findOne({
        where: {id: req.user.id},
        include: ['wishlistRecords']
    })
    .then(record => res.status(200).json(record))
    .catch(err => res.status(500).json({error : err}))
});

// (page: wishlist) allows album information to be updated by the user
router.put('/update/:name', (req, res) => {
    WishlistRecord.update(req.body, {
        where: {
            name: req.params.name
        }
    })
    .then(record => res.status(200).json(record))
    .catch(err => res.status(500).json({error: err}))
})

// (page: wishlist) allows user to delete albums from their wishlist
router.delete('/delete/:name', (req, res) => {
    WishlistRecord.destroy({
        where: {
            name: req.params.name
        }
    })
    .then(record => res.status(200).json(record))
    .catch(err => res.json({error: err}))
})
module.exports = router;