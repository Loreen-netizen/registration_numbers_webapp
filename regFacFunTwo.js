let regFacFunTwo = function(registrationNumberFactoryFunction) {

    const _ = require('lodash')

    let flashMessages = function(req, res) {
        try {
            req.flash('info', 'flash Message added')
            res.redirect('/')
        } catch (error) {
            console.log(error)
        }
    };

    let getTowns = async function(req, res) {
        const getDropdownTowns = await registrationNumberFactoryFunction.getAllTowns();
        res.render('index', {
            towns: getDropdownTowns
        })
    };

    let getData = async function(req, res) {

        try {
            let RegNumber = req.body.theRegNumber;
            let regNumber = RegNumber.toUpperCase();
            let checkReg = await registrationNumberFactoryFunction.isReg(regNumber);
            console.log(checkReg);

            let getDropdownTowns = await registrationNumberFactoryFunction.getAllTowns();
            let regNumberRegex = /(C[AJYL]\s\d{3}-\d{3})$|C[AJYL]\s\d{2,5}$/;
            let result = regNumberRegex.test(regNumber);

            if (result === false) {
                req.flash('error', 'Please enter VALID reg number e.g CA 123-456 or CA 123')
                res.render('index', {
                    towns: getDropdownTowns
                })
            } else if (checkReg >= 1) {
                req.flash('error', 'This Reg Number Has Already Been Entered')
                res.render('index', {
                    towns: getDropdownTowns
                })
            } else if (_.isEmpty(regNumber)) {
                req.flash('error', 'Please enter reg number e.g CA 123-456 or CA 123')
                res.render('index', {
                    towns: getDropdownTowns
                })
            } else

            {
                var data = {
                    regObject: await registrationNumberFactoryFunction.regObject(regNumber),
                    saveReg: await registrationNumberFactoryFunction.storeReg(regNumber),
                    allRegNumbers: await registrationNumberFactoryFunction.allRegNumbers(),
                    isReg: await registrationNumberFactoryFunction.isReg(regNumber),

                }

                res.render('index', {
                    data,
                    towns: getDropdownTowns
                })
            }

        } catch (error) {
            console.log(error)
        }

    };

    let townData = async function(req, res) {

        try {
            let town = req.body.theTown;
            console.log(town);
            let townSelected = await registrationNumberFactoryFunction.getAllFromTown(town);
            const getDropdownTowns = await registrationNumberFactoryFunction.getAllTowns();

            res.render("index", {
                townSelected,
                towns: getDropdownTowns
            });
        } catch (error) {
            console.log(error)
        }
    };

    let clearReg = async function(req, res) {

        let clearReg = await registrationNumberFactoryFunction.clearRegEntries();
        const getDropdownTowns = await registrationNumberFactoryFunction.getAllTowns();

        res.render("index", {
            clearReg,
            towns: getDropdownTowns
        })
    };

    return {

        getTowns,
        getData,
        townData,
        clearReg,
        flashMessages
    }
};

module.exports = regFacFunTwo;