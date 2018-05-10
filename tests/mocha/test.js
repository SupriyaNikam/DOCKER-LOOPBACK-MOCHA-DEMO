var request = require('request');
var rp =  require('request-promise');
var expect = require('chai').expect;
var assert = require('assert');


describe('Create note using post request',function(){
    var options = {
        json:true
    };


       // GET and POST request
    it('It has to create a new note',function(){
        options.uri = 'http://localhost:3000/api/Notes';
        options.method = 'POST';
        options.body = {
            title: 'First demo note',
            content: 'Demo note testing with post request'
        };

        // request promise
        rp(options)
        .then(function(response){
          console.log('Post response', response);
            expect(response).to.have.property('title');
            expect(response).to.have.property('content');
            expect(response).to.have.property('id');
            options.uri = `http://localhost:3000/api/Notes/${response.id}`;
            options.method = 'GET';
            options.body = response;   
            return rp(options);
        })
        .then(function(response){
            console.log('Get response', response);
            expect(response).to.eql(options.body);
        })
        .catch(function (err) {
            console.log('Error is thow',err);
        });
    })

});
