let registrationNumberFactoryFunction = require("../registration_number_factory_function.js");
let assert = require("assert");
let pg = require("pg");
let Pool = pg.Pool;
let connectionString = process.env.DATABASE_URL || 'postgresql://loreen:pg123@localhost:5432/test_reg_numbers';
let pool = new Pool({
    connectionString
});


describe("registrationNumberFactoryFunction", async function() {
    beforeEach(async function() {
            await pool.query(`delete from users`)
        })
        // it("should create a new list item when add button is clicked", function(){

    //  var registrationNumberFactoryFunction2 = registrationNumberFactoryFunction();
    //  assert.equal(<li></li>,registrationNumberFactoryFunction2.createNewListItem("click"));

    // });
    it("should display registration Number", async function() {
        var registrationNumberFactoryFunction = await registrationNumberFactoryFunction(pool);
        assert.equal("CA 123-123", registrationNumberFactoryFunction1.displayRegNumber("CA 123-123"));

    });

    it("should return Correct Town for reg Number ", async function() {
        var registrationNumberFactoryFunction = await registrationNumberFactoryFunction(pool);
        assert.equal("Cape Town", registrationNumberFactoryFunction2.townSelected("CA"));
        assert.equal("Paarl", registrationNumberFactoryFunction2.townSelected("CJ"));
        assert.equal("Stellenbosch", registrationNumberFactoryFunction2.townSelected("CL"));
        assert.equal("Please Select Town", registrationNumberFactoryFunction2.townSelected(""));
    });

    it("should save all reg numbers in an array", async function() {
        var registrationNumberFactoryFunction = await registrationNumberFactoryFunction(pool);
        assert.equal("Cape Town", registrationNumberFactoryFunction3.townSelected("CA"));
        assert.equal("Paarl", registrationNumberFactoryFunction3.townSelected("CJ"));
        assert.equal("Stellenbosch", registrationNumberFactoryFunction3.townSelected("CL"));
        assert.deepEqual(["CA", "CJ", "CL"], registrationNumberFactoryFunction3.pushRegNumbers());
    });

    after(async function() {
        await pool.end();
    })


});