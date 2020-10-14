let registrationNumberFactoryFunction = function(pool) {
    let regNumber = "";
    let theTown = "";
    let allRegNumbers = [];
    let regObject = [];

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

    let updateTownIdInRegTable = function(startString) {

        var updateTownIdQuery = (`UPDATE reg_nums
        SET town_id = ($1)
        WHERE reg_number =($1)`, [startString, regNumber])

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



    let regNumbersObject = async function(theRegNumber) {
        if (!regObject.includes(theRegNumber)) {
            await regObject.push(theRegNumber);
            count += 1;
            // console.log(count);

            return regObject;
        } else { return regObject }

    }



    let pushRegNumbers = function() {
        return allRegNumbers
    };








    return {
        storeReg,
        isReg,
        regNumbersObject,
        //townSelected,
        pushRegNumbers,
        updateTownIdInRegTable

    }
}

module.exports = registrationNumberFactoryFunction;