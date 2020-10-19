var registrationNumberFactoryFunction = function(pool) {
    let regNumber = "";
    let theTown = "";


    let count = 0;



    var isReg = async function(regNum) {
        var queryRegNumber = await pool.query(
            `SELECT reg_number 
            FROM reg_nums
            where reg_number  = ($1)`, [regNum]);
        //   console.log(queryRegNumber.rowCount);
        return queryRegNumber.rowCount;
    };

    var storeReg = async function(regNumber) {
        var checkReg = await isReg(regNumber);

        theRegNumber = regNumber.toUpperCase();
        let regNumberRegex = /(C[AJYL]\s\d{3}-\d{3})$|C[AJYL]\s\d{2,5}$/;
        let result = regNumberRegex.test(theRegNumber);
        console.log(result)
        if ((result === true) && (checkReg < 1) && (!theRegNumber == "")) {

            if (theRegNumber.startsWith('CA')) {
                await pool.query(`INSERT into reg_nums
                (reg_number , town_start_string) VALUES( $1, 'CA')`, [theRegNumber]);

            } else if (theRegNumber.startsWith('CJ')) {
                await pool.query(`INSERT into reg_nums
                (reg_number , town_start_string) VALUES( $1, 'CJ')`, [theRegNumber]);

            } else if (theRegNumber.startsWith('CL')) {
                await pool.query(`INSERT into reg_nums
                (reg_number , town_start_string) VALUES( $1, 'CL')`, [theRegNumber]);

            }

        } else if (result === false) { console.log("enter valid reg number") } else { console.log("regsaved") }

        //  {
        //     var storeRegQuery = (`INSERT into reg_nums
        //     (reg_number) VALUES($1)`);
        //     await pool.query(storeRegQuery, [theRegNumber]);
        // } 


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
            // console.log(allRegNumbersQuery.rows);
        return allRegNumbersQuery.rows;
    }
    let getAllFromTown = async function(selectedTownString) {
        // if (!regObject.includes(theRegNumber)) {
        let getAllFromTownQuery = await pool.query(`SELECT reg_number
                FROM reg_nums
                WHERE town_start_string = ($1)`, [selectedTownString]);
        console.log(getAllFromTownQuery.rows + "townselectedobject");
        return getAllFromTownQuery.rows;
    };



    let regObject = async function(regNumber) {
        let regObjectQuery = (`SELECT reg_number 
        FROM reg_nums
        WHERE reg_number = ($1)`, [regNumber])
            //   console.log(regObjectQuery.rows)
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
        allRegNumbers,
        getAllFromTown

    }

};


module.exports = registrationNumberFactoryFunction;