var app = require('../server/server');
var request = require('supertest');
var expect = require('chai').expect;

describe('[MOVIES]', function() {
    var createdMovie;

    beforeEach(function() {

    });

    it('should get all movies', function(done) {
        request(app)
            .get('/api/movies')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                expect(res.body).to.be.an('array');
                done();
            });
    });

    it('should create a movie', function(done) {
        request(app)
            .post('/api/movies')
            .send({
                name: 'Avengers: Infinity War'
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end(function(err, res) {
                if(err) { return done(err); }
                expect(res.body).to.be.an('object');
                done();
            });
    });

    it('should delete a movie', function(done) {
        request(app)
            .post('/api/movies')
            .send({
                name: 'test movie'
            })
            .set('Accept', 'application/json')
            .end(function(err, resp) {
                var movie = resp.body;
                request(app)
                    .delete('/movies/' + movie.id)
                    .end(function(err, resp) {
                        if(err) { return done(err); }
                        expect(resp.body).to.eql(movie);
                        done();
                    });
            });
    });

    it('should update a movie', function(done) {
        request(app)
            .post('/api/movies')
            .send({
                name: 'test'
            })
            .set('Accept', 'application/json')
            .end(function(err, resp) {
                var movie = resp.body;
                request(app)
                    .put('/movies/' + movie.id)
                    .send({
                        name: 'new test name'
                    })
                    .end(function(err, resp) {
                        if(err) { return done(err);}
                        expect(resp.body.name).to.equal('new test name');
                        done();
                    });
            });
    });

});