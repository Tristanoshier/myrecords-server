const express = require('express');
const router = express.Router();
const WishlistAlbum = require('../db').import('../models/albumwishlist');

// (page: wishlist) allows user to create album for their wishlist
router.post('/create', (req, res) =>{
    const albumFromRequest= {
        name: req.body.name,
        artist: req.body.artist,
        year: req.body.year,
        color: req.body.color,
        userId: req.user.id
    }
    WishlistAlbum.create(albumFromRequest)
        .then(album => res.status(200).json(album))
        .catch(err => res.status(500).json({error: err}))
});

// (page: wishlist) should find all albums in wishlist under that user
router.get('/find', (req, res) => {
    User.findOne({
        where: {id: req.user.id},
        include: ['wishlistAlbums']
    })
    .then(album => res.status(200).json(album))
    .catch(err => res.status(500).json({error : err}))
});

// (page: wishlist) allows album information to be updated by the user
router.put('/update/:id', (req, res) => {
    WishlistAlbum.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(album => res.status(200).json(album))
    .catch(err => res.status(500).json({error: err}))
})

// (page: wishlist) allows user to delete albums from their wishlist
router.delete('/delete/:id', (req, res) => {
    WishlistAlbum.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(album => res.status(200).json(album))
    .catch(err => res.json({error: err}))
})
module.exports = router;