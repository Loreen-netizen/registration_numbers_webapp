let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let handlebars = require("express-handlebars");
let RegistrationNumberFactoryFunction = require("./registration_number_factory_function.js");
let session = require('express-session');
let flash = require('express-flash');


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
    secret: 'expre$$ fl@sh string',
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
    try {
        let regNumber = req.body.theRegNumber;


        if (!regNumber) {
            req.flash('error', 'Please enter reg number')

        } else

        {
            var data = {
                regObject: await registrationNumberFactoryFunction.regObject(regNumber),
                saveReg: await registrationNumberFactoryFunction.storeReg(regNumber),
                allRegNumbers: await registrationNumberFactoryFunction.allRegNumbers(),
                isReg: await registrationNumberFactoryFunction.isReg(regNumber),
            }

            res.render('index', {
                data
            })
        }

    } catch (error) {
        console.log(error)
    }

});

app.post('/selectTown', async function(req, res) {

    try {
        let town = req.body.theTown;
        console.log(town);
        //  let regNumber = req.body.theRegNumber;
        let townSelected = await registrationNumberFactoryFunction.townSelected(town);

        res.render("index", { townSelected });
    } catch (error) {
        console.log(error)
    }


})


app.post("/clearReg", async function(req, res) {

    let clearReg = await registrationNumberFactoryFunction.clearRegEntries();

    res.render("index", { clearReg })
});




const PORT = process.env.PORT || 3999;

app.listen(PORT, function() {
    console.log("App starting on port", PORT)
});