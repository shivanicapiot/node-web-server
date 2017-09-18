const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 5000

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
})
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log("Unable To Append File to server")
        }
    });
    next();
})
app.use(express.static(__dirname + '/public'));
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// })
app.set('view engine', 'hbs');
app.get('/', (req, res) => {
    res.render('home.hbs', {
        welcomeMsg: "welcome dude!!",
        pageTitle: "Home Page!!!"
    })
});
app.get('/about', (req, res) => {
    res.render("about.hbs", {
        pageTitle: "About Page!!!"
    })
})
app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to Handle Request'
    })
})
app.listen(port, () => {
    console.log("Server Listening on Port: "  + port)
});