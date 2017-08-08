const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((request, response, next) => {
    var now = new Date().toString();

    var log = `Time: ${now} | | Request method: ${request.method} | | Request URL: ${request.url}`;
    console.log(`Time: ${now} | | Request method: ${request.method} | | Request URL: ${request.url}`);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) { 
            console.log('Unable to update server logs');
        }
    });
    next();
});

// app.use((request, response, next) => {
//     response.render('maintenence.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
    // return 'This is a test';
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (request, response) => {
    response.render('home.hbs', {
        pageTitle: 'Hi Daddy',
        welcomeMessage: 'Welcome to my website??????????'
    })
});

app.get('/about', (request, response) => {
    response.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/bad', (request, response) => {
    response.send({
        errorMessage: 'Unable to handle request'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});