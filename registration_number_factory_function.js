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

    var storeReg = async function(regNumber) {
        theRegNumber = regNumber.toUpperCase();

        let checkReg = await isReg(theRegNumber);
        console.log(checkReg);
        if (checkReg < 1) {

            let regNumberRegex = /(C[AJYL]\s\d{3}-\d{3})$|C[AJYL]\s\d{2,5}$/;
            let result = regNumberRegex.test(theRegNumber);
            console.log(result)
            if ((result === true) && (!theRegNumber == "")) {

                if (theRegNumber.startsWith('CA')) {
                    await pool.query(`INSERT into reg_nums
            (reg_number , town_start_string) VALUES( $1, 'CA')`, [theRegNumber]);

                } else if (theRegNumber.startsWith('CJ')) {
                    await pool.query(`INSERT into reg_nums
            (reg_number , town_start_string) VALUES( $1, 'CJ')`, [theRegNumber]);

                } else if (theRegNumber.startsWith('CL')) {
                    await pool.query(`INSERT into reg_nums
            (reg_number , town_start_string) VALUES( $1, 'CL')`, [theRegNumber]);

                } else if (theRegNumber.startsWith('CY')) {
                    await pool.query(`INSERT into reg_nums
            (reg_number , town_start_string) VALUES( $1, 'CY')`, [theRegNumber]);

                }

            } else if (result === false) { console.log("enter valid reg number") } else { console.log("regsaved") }


        } else { console.log("reg is greater than 1") }

    };

    let clearRegEntries = async function() {

        let clearRegQuery = await pool.query(`DELETE FROM reg_nums`);

        return clearRegQuery.rows
    }

    // let updateTownIdInRegTable = function(startString) {

    //     var updateTownIdQuery = (`UPDATE reg_nums
    //     SET town_id = ($1)
    //     WHERE reg_number =($1)`, [startString, regNumber])

    // }


    let allRegNumbers = async function() {
        let allRegNumbersQuery = await pool.query(`SELECT reg_number
            FROM reg_nums`)
            // console.log(allRegNumbersQuery.rows);
        return allRegNumbersQuery.rows;
    }
    let getAllFromTown = async function(selectedTownName) {

        if (selectedTownName != "allTowns") {
            let getTownStringQuery = await pool.query('SELECT town_string FROM towns WHERE town_name = ($1)', [selectedTownName]);
            let selectedTownString = getTownStringQuery.rows[0].town_string;
            console.log(selectedTownString);


            let getAllFromTownQuery = await pool.query(`SELECT reg_number
            FROM reg_nums
            WHERE town_start_string = ($1)`, [selectedTownString]);
            console.log("not all towns");
            return getAllFromTownQuery.rows;
        } else if (selectedTownName === "allTowns") {

            let getAllTownsQuery = await pool.query(`SELECT reg_number
        FROM reg_nums`);
            console.log("alltowns");
            return getAllTownsQuery.rows;
        }
    };



    let regObject = async function(regNumber) {
        let regObjectQuery = (`SELECT reg_number 
        FROM reg_nums
        WHERE reg_number = ($1)`, [regNumber])
            // console.log(regObjectQuery)
        return regObjectQuery
    };

    let regNumbersObject = async function(theRegNumber) {
        if (regObject) {
            { return regObject }

        }
    };


    const getAllTowns = async() => {
        const towns = await pool.query('select * from towns;');
        return towns.rows
    }






    return {
        storeReg,
        isReg,
        regNumbersObject,
        regObject,
        clearRegEntries,
        // updateTownIdInRegTable,
        allRegNumbers,
        getAllTowns,
        getAllFromTown

    }

};


module.exports = registrationNumberFactoryFunction;