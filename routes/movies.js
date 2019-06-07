var express = require('express');
var router = express.Router();

//Models
var Movie = require('../models/Movie');

router.get('/', (req, res, next) => {
  Movie.find({}).then(data => {
    res.json(data);
  }).catch(err => {
    res.send(err);
  })
});

router.get('/top10', (req, res, next) => {
  Movie.find({}).sort({ 'data': -1 }).limit(10).then(data => {
    res.json(data);
  }).catch(err => {
    res.json(err);
  })
});

router.get('/between/:startDate/:endDate', (req, res, next) => {
  Movie.find({
    year: {
      $gte: parseInt(req.params.startDate),
      $lte: parseInt(req.params.endDate)
    }
  }).then(data => {
    res.json(data);
  }).catch(err => {
    res.json(err);
  });
});

router.get('/:movieId', (req, res, next) => {
  var { movieId } = req.params;
  Movie.findById(movieId).then(data => {
    if (!movie)
      next({ message: 'movie not found' })

    res.json(data);
  }).catch(err => {
    res.json(err);
  });
})

router.put('/:movieId', (req, res, next) => {
  var { title, year, imdb_score, category, country } = req.body;
  Movie.findByIdAndUpdate(req.params.movieId, {
    title,
    year,
    imdb_score,
    category,
    country
  }, { new: true }).then(data => {
    if (!data)
      res.json({ message: 'veri bulunamadı' })
    else
      res.json(data);
  }).catch(err => {
    res.json(err);
  })
});

router.delete('/:movieId', (req, res, next) => {
  Movie.findByIdAndDelete(req.params.movieId).then(data => {
    res.json({
      status: 1
    })
  }).catch(err => {
    res.json(err);
  })
});

router.post('/', (req, res, next) => {
  const { title, year, imdb_score, category, country } = req.body;

  const movie = new Movie({
    title: title,
    imdb_score: imdb_score,
    country: country,
    year: year,
    category: category
  });

  movie.save().then((err, data) => {
    if (err)
      res.json(err);
    res.json(data);
  });
});

module.exports = router;
