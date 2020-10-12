var registrationNumberFactoryFunction = function(pool) {
    var regNumber = "";
    var theTown = "";
    var allRegNumbers = [];
    var regObject = [];
    var count = 0;
    // var createNewListItem = function(){
    //     var newListItem = document.createElement("li");
    //     return newListItem
    // }

    var regNumbersObject = function(theRegNumber) {
        if (!regObject.includes(theRegNumber)) {
            regObject.push(theRegNumber);
            count += 1;
            console.log(count);

            return regObject;
        } else { return regObject }

    }


    var townSelected = function(town) {

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

    var pushRegNumbers = function() {
        return allRegNumbers
    };








    return {
        // createNewListItem,
        regNumbersObject,
        townSelected,
        pushRegNumbers,
    }
}

module.exports = registrationNumberFactoryFunction;