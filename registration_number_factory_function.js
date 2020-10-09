var registrationNumberFactoryFunction = function(){
var regNumber = "";
var theTown = "";
var allRegNumbers = [];
    // var createNewListItem = function(){
    //     var newListItem = document.createElement("li");
    //     return newListItem
    // }
    
    var displayRegNumber = function(theRegNumber){
        regNumber = theRegNumber;
        return regNumber
    }

    var townSelected = function(town){
       
        theTown = town;

        if (theTown === "CA") {
            allRegNumbers.push("CA");
            return "Cape Town";
        }
         else if (theTown === "CJ") {
            allRegNumbers.push("CJ");
            return "Paarl";
        }
       
       else if (theTown === "CL") {
        allRegNumbers.push("CL");
            return "Stellenbosch";
        }
        else if (theTown === "") {
            return "Please Select Town";
        }

        pushRegNumbers(allRegNumbers);

        };

        var pushRegNumbers = function(){
         return allRegNumbers
        };
    
    
    
    
    
    
    
    
        return{
            // createNewListItem,
            displayRegNumber,
            townSelected,
            pushRegNumbers,
        }
    }