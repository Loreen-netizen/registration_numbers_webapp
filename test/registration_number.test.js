var RegistrationNumberFactoryFunction = require("../registration_number_factory_function");
let assert = require("assert");
let pg = require("pg");
let Pool = pg.Pool;
let connectionString = process.env.DATABASE_URL || 'postgresql://loreen:pg123@localhost:5432/test_reg_numbers';
let pool = new Pool({
    connectionString
});


describe("registrationNumberFactoryFunction", async function() {
    beforeEach(async function() {
        await pool.query(`delete from reg_nums`)
    })

    it("should check if a registration number is in the database", async function() {
        //assemble
        var registrationNumberFactoryFunction = await RegistrationNumberFactoryFunction(pool);
        //act
        let isReg = await registrationNumberFactoryFunction.isReg('CA 123 345')
            //assert
        assert.equal(0, isReg);

    });

    it("should insert a registration number into the database ", async function() {
        //assemble
        var registrationNumberFactoryFunction = await RegistrationNumberFactoryFunction(pool);
        //act
        var insertRegQuery = await registrationNumberFactoryFunction.storeReg('CA 234 789');
        insertRegQuery;
        //assert
        assert.equal(1, await registrationNumberFactoryFunction.isReg('CA 234 789'));
    });

    it("should save all reg numbers in database", async function() {
        //assmble
        var registrationNumberFactoryFunction = await RegistrationNumberFactoryFunction(pool);

        //act
        var insertRegQuery = await registrationNumberFactoryFunction.storeReg('CA 234 789');
        insertRegQuery;
        //assert
        assert.deepEqual([{
            reg_number: 'CA 234 789'
        }], await registrationNumberFactoryFunction.allRegNumbers())
    });

    after(async function() {
        await pool.end();
    })


});