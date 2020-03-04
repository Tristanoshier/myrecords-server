const express = require('express');
const router = express.Router();
const CollectionRecord = require('../db').import('../models/recordcollection');

// (page: collection) allows user to create a album for their collection
router.post('/create', (req, res) => {
    const recordFromRequest = {
        name: req.body.name,
        artist: req.body.artist,
        year: req.body.year,
        userId: req.user.id
    }
    CollectionRecord.create(recordFromRequest)
        .then(record => res.status(200).json(record))
        .catch(err => res.status(500).json({error: err}))
});

// (page: collection) should find all albums in collection under that user
router.get('/find', (req, res) => {
    User.findOne({
        where: {id: req.user.id},
        include: ['collectionRecords']
    })
    .then(record => res.status(200).json(record))
    .catch(err => res.status(500).json({error: err}))
});

// (page: search) get individual albums in collection by album name
router.get('/find/name/:name', (req, res) => {
    CollectionRecord.findOne({
        where: {name: req.params.name}
    })
    .then(record => res.status(200).json(record))
    .catch(err => res.status(500).json({error: err}))
});

// (page: search) get individual albums in collection by artist
router.get('/find/artist/:artist', (req, res) => {
    CollectionRecord.findAll({
        where: {artist: req.params.artist}
    })
    .then(record => res.status(200).json(record))
    .catch(err => res.status(500).json({error: err}))
});

// (page: search) get individual albums in collection by year
router.get('/find/year/:year', (req, res) => {
    CollectionRecord.findAll({
        where: {year: req.params.year}
    })
    .then(record => res.status(200).json(record))
    .catch(err => res.status(500).json({error: err}))
});

// (page: collection) allows album information to be updated by the user
router.put('/update/:name', (req, res) => {
    CollectionRecord.update(req.body, {
        where: {
            name: req.params.name
        }
    })
    .then(record => res.status(200).json(record))
    .catch(err => res.json(req.errors))
})

// (page: collection) allows user to delete albums from their collection
router.delete('/delete/:name', (req, res) => {
    CollectionRecord.destroy({
        where: {
            name: req.params.name
        }
    })
    .then(record => res.status(200).json(record))
    .catch(err => res.json({error : err}))
})

module.exports = router;


