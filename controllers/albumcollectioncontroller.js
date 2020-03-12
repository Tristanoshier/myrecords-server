const express = require('express');
const router = express.Router();
const CollectionAlbum = require('../db').import('../models/albumcollection');

// (page: collection) allows user to create a album for their collection
router.post('/create', (req, res) => {
    const albumFromRequest = {
        name: req.body.name,
        artist: req.body.artist,
        year: req.body.year,
        color: req.body.color,
        userId: req.user.id
    }
    CollectionAlbum.create(albumFromRequest)
        .then(album => res.status(200).json(album))
        .catch(err => res.status(500).json({error: err}))
});

// (page: collection) should find all albums in collection under that user
router.get('/find', (req, res) => {
    User.findOne({
        where: {id: req.user.id},
        include: ['collectionAlbums']
    })
    .then(album => res.status(200).json(album))
    .catch(err => res.status(500).json({error: err}))
});

// (page: search) get individual albums in collection by album name
router.get('/find/name/:name', (req, res) => {
    CollectionAlbum.findAll({
        where: {name: req.params.name}
    })
    .then(album => res.status(200).json(album))
    .catch(err => res.status(500).json({error: err}))
});

// (page: search) get individual albums in collection by artist
router.get('/find/artist/:artist', (req, res) => {
    CollectionAlbum.findAll({
        where: {artist: req.params.artist}
    })
    .then(album => res.status(200).json(album))
    .catch(err => res.status(500).json({error: err}))
});

// (page: search) get individual albums in collection by year
router.get('/find/year/:year', (req, res) => {
    CollectionAlbum.findAll({
        where: {year: req.params.year}
    })
    .then(album => res.status(200).json(album))
    .catch(err => res.status(500).json({error: err}))
});

// (page: collection) allows album information to be updated by the user
router.put('/update/:id', (req, res) => {
    CollectionAlbum.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(album => res.status(200).json(album))
    .catch(err => res.json(req.errors))
})

// (page: collection) allows user to delete albums from their collection
router.delete('/delete/:id', (req, res) => {
    CollectionAlbum.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(album => res.status(200).json(album))
    .catch(err => res.json({error : err}))
})

module.exports = router;


