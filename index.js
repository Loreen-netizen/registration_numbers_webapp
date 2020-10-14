let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let handlebars = require("express-handlebars");
let RegistrationNumberFactoryFunction = require("./registration_number_factory_function.js");

let flash = require('express-flash');
let session = require('express-session');

let pg = require("pg");
const { log } = require("handlebars");
let Pool = pg.Pool;
let connectionString = process.env.DATABASE_URL || 'postgresql://loreen:pg123@localhost:5432/reg_numbers';
let pool = new Pool({
    connectionString
});

let registrationNumberFactoryFunction = RegistrationNumberFactoryFunction(pool);

app.engine('handlebars', handlebars({ layoutsDir: "./views/layouts" }));
app.set('view engine', 'handlebars');

app.use(session({
    secret: 'express flash string',
    resave: false,
    saveUninitialized: true
}));

app.use(flash());

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());



app.get("/addFlash", function(req, res) {
    try {
        req.flash('info', 'flash Message added')
        res.redirect('/')
    } catch (error) {
        console.log(error)
    }
});


app.get("/", function(req, res) {
    res.render('index')
});

app.post("/reg_Numbers", async function(req, res) {
    let regNumber = req.body.theRegNumber;
    try {
        let saveReg = await registrationNumberFactoryFunction.storeReg(regNumber);
        let addReg = await registrationNumberFactoryFunction.regNumbersObject(regNumber);
        res.render('index', {
            data: {
                reg: addReg,
                store: saveReg
            }
        })

    } catch (error) {
        console.log(error)
    }

});

app.post('/selectTown', async function(req, res) {

    try {
        let town = req.body.theTown;
        console.log(town);
        let regNumber = req.body.theRegNumber;
        let storeTheTown = await registrationNumberFactoryFunction.townSelected(town, regNumber);

        res.render("index", { storeTheTown });
    } catch (error) {
        console.log(error)
    }


})




let PORT = process.env.PORT || 3009;

app.listen(PORT, function() {
    console.log("App starting on port", PORT)
});