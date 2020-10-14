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


    let regNumbersObject = async function(theRegNumber) {
        if (!regObject.includes(theRegNumber)) {
            await regObject.push(theRegNumber);
            count += 1;
            console.log(count);

            return regObject;
        } else { return regObject }

    }


    let townSelected = function(town) {

        theTown = town;

        if (theTown === "CA") {
            allRegNumbers.push("CA");
            return "Cape Town";
        } else if (theTown === "CJ") {
            allRegNumbers.push("CJ");
            return "Paarl";
        } else if (theTown === "CL") {
            allRegNumbers.push("CL");
            return "Stellenbosch";
        } else if (theTown === "") {
            return "Please Select Town";
        }

        pushRegNumbers(allRegNumbers);

    };

    let pushRegNumbers = function() {
        return allRegNumbers
    };








    return {
        storeReg,
        regNumbersObject,
        townSelected,
        pushRegNumbers,
    }
}

module.exports = registrationNumberFactoryFunction;