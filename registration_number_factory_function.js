let registrationNumberFactoryFunction = function(pool) {
    let regNumber = "";
    let theTown = "";
    let allRegNumbers = [];
    let regObject = [];
    let count = 0;


    let storeReg = async function(theRegNumber) {
        // if (!regObject.includes(theRegNumber)) {
        let storeRegQuery = (`INSERT into reg_nums
            (reg_number) VALUES($1)`);
        await pool.query(storeRegQuery, [theRegNumber]);
        // }

    };

    let storeTown = async function(townName, townString) {
        // if (!regObject.includes(theRegNumber)) {
        let storeTownQuery = await pool.query(`INSERT into towns
            (town_name, town_string) VALUES($1, $2)`, [townName], [townString]);
        return storeTownQuery;
    };


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
        storeTown,
        regNumbersObject,
        townSelected,
        pushRegNumbers,

    }
}

module.exports = registrationNumberFactoryFunction;