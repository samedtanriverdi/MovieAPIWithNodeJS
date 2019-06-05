const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect("mongodb://admin:admin1234@ds013579.mlab.com:13579/movie-api",{ useNewUrlParser: true }).then(()=>{
        console.log('Veri tabanına baglandı');
    }).catch(()=>{
        console.log('HATA! Veri Tabanına baglanılamadı.');
    });
};