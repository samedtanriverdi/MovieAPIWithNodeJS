const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const server = require('../app');

chai.use(chaiHttp);

let token, movieId;

describe('/api/movie tests', () => {
    before((done) => {
        chai.request(server)
            .post('/auth')
            .send({ userName: 'st', password: 'samed12345' })
            .end((err, res) => {
                token = res.body.payLoad;
                done();
            });
    });
    describe('/Get movies', () => {
        it('it should get all the movies', (done) => {
            chai.request(server).get('/api/movie').set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                })
        });
    });
    describe('/Post Movie', () => {
        it('it should Post a movie', (done) => {
            const movie = {
                title: "TEST",
                imdb_score: "10",
                country: "TEST",
                year: 1998,
                category: 'test',
                director_id: "5cfa9a3fcb184309b4bd21d1"
            };
            chai.request(server).post('/api/movie').send(movie).set('x-access-token', token).end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object')
                res.body.should.have.property('title');
                movieId = res.body._id;
                done();
            })
        });
    })
    describe('/Get/:directorId Movie', () => {
        it('it should get a movie by the given id', (done) => {
            chai.request(server)
            .get('/api/movie/' + movieId)
            .set('x-access-token',token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('title');
                res.body.should.have.property('_id').eql(movieId);
                done();
            })
        })
    })
});