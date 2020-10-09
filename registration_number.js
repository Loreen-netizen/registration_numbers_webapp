var regNumberInput = document.getElementById("regNumberInput");
var addButton = document.getElementById("addButton");
var regNumberList = document.getElementById("regNumberList");
var allRegNumbers = [];
var theTown = document.getElementById("townList");
var errorLabel = document.getElementById("errorLabel");
var filterButton = document.getElementById("filterButton");
var clearButton = document.getElementById("clearButton");

window.onload = function () {
    if (JSON.parse(localStorage.getItem("regNumberList")) !== null)
        allRegNumbers = JSON.parse(localStorage.getItem("regNumberList"))
    else allRegNumbers = []

};


var addButtonClicked = function () {
    if  (JSON.parse(localStorage.getItem("regNumberList")) !== null)
        allRegNumbers = JSON.parse(localStorage.getItem("regNumberList"))
       else{
           allRegNumbers = []
      } ;

    let regNumberValue = regNumberInput.value.toUpperCase();
    let regNumberRegex = /(C[AJYL]\s\d{3}-\d{3})$|C[AJYL]\s\d{2,5}$/;
    let result = regNumberRegex.test(regNumberValue);
    if((result === true) && (!allRegNumbers.includes(regNumberValue)))  {
        
        var newListItem = document.createElement("li");
        newListItem.classList.add("regNumberLabels");
        
        if (regNumberValue !== "") {
            newListItem.innerHTML = regNumberValue;
            regNumberList.appendChild(newListItem);

            allRegNumbers.push(regNumberValue);
            localStorage.setItem("regNumberList", (JSON.stringify(allRegNumbers)));
            errorLabel.innerHTML = "";
           }
      }
    else {
        errorLabel.innerHTML = "Please Enter Valid Reg Number"
    };
  }

  theTown.onchange = function(){
    
    var filteredTowns = [];

    if (JSON.parse(localStorage.getItem("regNumberList")) !== null)
        allRegNumbers = JSON.parse(localStorage.getItem("regNumberList"))
    
        else {
            allRegNumbers = []
        };

    if (theTown.value === "CJ") {
        
        for (let i = 0; i < allRegNumbers.length; i++) {
            if (allRegNumbers[i].startsWith("CJ"))
                filteredTowns.push(allRegNumbers[i]);
        }
    }
    if (theTown.value === "CA") {
        for (let i = 0; i < allRegNumbers.length; i++) {
            if (allRegNumbers[i].startsWith("CA"))
                filteredTowns.push(allRegNumbers[i]);
        }
    }
    if (theTown.value === "CL") {
        for (let i = 0; i < allRegNumbers.length; i++) {
            if (allRegNumbers[i].startsWith("CL"))
                filteredTowns.push(allRegNumbers[i]);
        }

    }
    else if (theTown.value === "") {
        filteredTowns = allRegNumbers;
    };

    showTheList(filteredTowns);
}


function showTheList(filteredTowns) {
    regNumberList.innerHTML = "";
    for (var i = 0; i < filteredTowns.length; i++) {
        var currentItem = filteredTowns[i];
        var townElement = document.createElement("li");
        townElement.classList.add("regNumberLabels");

        townElement.innerHTML = currentItem;
        regNumberList.appendChild(townElement);
    }
}

var clearLocalStorage = function(){
    localStorage.removeItem("regNumberList")
    regNumberList.innerHTML = "";
}

window.onload = function () {
    if (JSON.parse(localStorage.getItem("regNumberList")) !== null) {
        var townsArray = JSON.parse(localStorage.getItem("regNumberList"));
        for (let i = 0; i < townsArray.length; i++) {

            var newListItem = document.createElement("li");
            newListItem.classList.add("regNumberLabels");
            newListItem.innerHTML = townsArray[i];
            regNumberList.appendChild(newListItem);
        }
    }
};

addButton.addEventListener("click", addButtonClicked);
clearButton.addEventListener("click",clearLocalStorage);