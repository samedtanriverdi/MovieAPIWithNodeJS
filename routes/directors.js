const express = require('express');
const router = express.Router();

//Model
const Director = require('../models/Director');

router.get('/', (req, res, next) => {
    Director.aggregate([
        {
            $lookup: {
                from: 'movies',
                localField: '_id',
                foreignField: 'director_id',
                as: 'movies'
            }
        },
        {
            $unwind: {
                path: '$movies',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $group: {
                _id: {
                    _id: '$_id',
                    name: '$name',
                    surname: '$surname',
                    bio: '$bio'
                },
                movies: {
                    $push: '$movies'
                }
            }
        },
        {
            $project: {
                _id: '$_id._id',
                name: '$_id.name',
                surname: '$_id.surname',
                bio: '$_id.bio',
                movies: '$movies'
            }
        }
    ]).then(data => {
        res.json(data);
    }).catch(err => {
        res.json(err);
    })
});

router.get('/:directorId', (req, res, next) => {
    Director.findById(req.params.directorId).then(data => {
        res.json(data);
    }).catch(err => {
        res.json(err);
    })
});

router.put('/:directorId', (req, res, next) => {
    const { name, surname, bio } = req.body;
    Director.findByIdAndUpdate(req.params.directorId, {
        name: name,
        surname: surname,
        bio: bio
    }, { new: true }).then(data => {
        res.json(data);
    }).catch(err => {
        res.json(err);
    })
});


router.delete('/:directorId', (req, res, next) => {
    Director.findByIdAndDelete(req.params.directorId).then(data => {
        res.json(data);
    }).catch(err => {
        res.json(err);
    })
});

router.post('/', (req, res, next) => {
    const { name, surname, bio } = req.body;
    var director = new Director({
        name: name,
        surname: surname,
        bio: bio
    });
    director.save().then(data => {
        res.json(data);
    }).catch(err => {
        res.json(err);
    });
});

module.exports = router;