var request = require('request');
var rp =  require('request-promise');
var expect = require('chai').expect;
var assert = require('assert');
var noteId;

describe('Delete note using delete request',function(){
    var options = {
        json:true
    };

       //GET and POST request
    it('It has to create a new note',function(){
        options.uri = 'http://localhost:3000/api/Notes';
        options.method = 'POST';
        options.body = {
            title: 'First demo note',
            content: 'Demo note testing with post request'
        };

        //check response are equal by using GET and POST request
        rp(options)
        .then(function(response){
          console.log('Post response', response);
            expect(response).to.have.property('title');
            expect(response).to.have.property('content');
            expect(response).to.have.property('id');
            options.uri = `http://localhost:3000/api/Notes/${response.id}`;
            options.method = 'GET';
            options.body = response; 
            noteId = response.id;  
            return rp(options);
        })
        .then(function(response){
            console.log('Get response', response);
            expect(response).to.eql(options.body);
        });

    });
         
        // Delete ID from note
        it('It has to delete a note',function(){
          options.uri = `http://localhost:3000/api/Notes/{id}`;
          options.method = 'Delete';
          
        rp(options)
         .then(function(response){
             console.log('response', response);
             console.log('noteId',noteId);
            expect(response).to.have.property('count');
            options.uri = `http://localhost:3000/api/Notes/${noteId.id}`;
            options.method = 'Delete';
            options.noteId = noteId.id-1;
            return rp(options);
         })

        .then(function(response){
            console.log('Delete id of response', response);
            
        })
        .catch(function (err) {
            console.log('Error is thow',err);
        });
    });
 
});

