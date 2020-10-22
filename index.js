let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let handlebars = require("express-handlebars");
let RegistrationNumberFactoryFunction = require("./registration_number_factory_function.js");
let RegFacFunTwo = require("./regFacFunTwo.js");
let session = require('express-session');
let flash = require('express-flash');


let pg = require("pg");
const { log } = require("handlebars");
const _ = require('lodash')
let Pool = pg.Pool;
let connectionString = process.env.DATABASE_URL || 'postgresql://loreen:pg123@localhost:5432/reg_numbers';
let pool = new Pool({
    connectionString
});

let registrationNumberFactoryFunction = RegistrationNumberFactoryFunction(pool);
let regFacFunTwo = RegFacFunTwo(registrationNumberFactoryFunction);
app.engine('handlebars', handlebars({ layoutsDir: "./views/layouts" }));
app.set('view engine', 'handlebars');

app.use(session({
    secret: 'expre$$ fl@sh string',
    resave: false,
    saveUninitialized: true
}));

app.use(flash());

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());



app.get("/addFlash", regFacFunTwo.flashMessages);

app.get("/", regFacFunTwo.getTowns);

app.post("/reg_Numbers", regFacFunTwo.getData);

app.post('/selectTown', regFacFunTwo.townData);

app.post("/clearReg", regFacFunTwo.clearReg);

const PORT = process.env.PORT || 3999;

app.listen(PORT, function() {
    console.log("App starting on port", PORT)
});