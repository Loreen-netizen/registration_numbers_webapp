var registrationNumberFactoryFunction = function(pool) {
    let regNumber = "";
    let theTown = "";


    let count = 0;



    var isReg = async function(regNum) {
        var queryRegNumber = await pool.query(
            `SELECT reg_number 
            FROM reg_nums
            where reg_number  = ($1)`, [regNum]);
        console.log(queryRegNumber.rowCount);
        return queryRegNumber.rowCount;
    };

    var storeReg = async function(theRegNumber) {
        var checkReg = await isReg(theRegNumber);
        if (checkReg < 1) {
            var storeRegQuery = (`INSERT into reg_nums
            (reg_number) VALUES($1)`);
            await pool.query(storeRegQuery, [theRegNumber]);
        } else { console.log("REG ALREADY STORED") }

    };

    let clearRegEntries = async function() {

        let clearRegQuery = await pool.query(`DELETE FROM reg_nums`);

        return clearRegQuery
    }

    let updateTownIdInRegTable = function(startString) {

        var updateTownIdQuery = (`UPDATE reg_nums
        SET town_id = ($1)
        WHERE reg_number =($1)`, [startString, regNumber])

    }


    let allRegNumbers = async function() {
            let allRegNumbersQuery = await pool.query(`SELECT reg_number
            FROM reg_nums`)
            console.log(allRegNumbersQuery.rows);
            return allRegNumbersQuery.rows;
        }
        // let storeTown = async function(townName, townString) {
        //     // if (!regObject.includes(theRegNumber)) {
        //     let storeTownQuery = await pool.query(`INSERT into towns
        //         (town_name, town_string) VALUES($1, $2)`, [townName], [townString]);
        //     return storeTownQuery;
        // };


    // let townSelected = async function(town) {

    //     if (town === "CA") {
    //         await storeTown('Cape Town', 'CA');

    //     } else if (town === "CJ") {
    //         await storeTown('Paarl', 'CJ');

    //     } else if (town === "CL") {
    //         await storeTown('Stellenbosch', 'CL');

    //     } else if (town === "") {
    //         return "Please Select Town";
    //     }

    //     // pushRegNumbers(allRegNumbers);

    // };

    let regObject = async function(regNumber) {
        let regObjectQuery = (`SELECT reg_number 
        FROM reg_nums
        WHERE reg_number = ($1)`, [regNumber])
        console.log(regObjectQuery.rows)
        return regObjectQuery.rows
    };

    let regNumbersObject = async function(theRegNumber) {
        if (regObject) {
            { return regObject }

        }
    };





    // let pushRegNumbers = function() {
    //     return allRegNumbers
    // };








    return {
        storeReg,
        isReg,
        regNumbersObject,
        regObject,
        clearRegEntries,
        updateTownIdInRegTable,
        allRegNumbers

    }

};


module.exports = registrationNumberFactoryFunction;