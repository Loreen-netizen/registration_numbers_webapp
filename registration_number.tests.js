describe ("registrationNumberFactoryFunction",function(){

    it("should create a new list item when add button is clicked", function(){
     var registrationNumberFactoryFunction1 = registrationNumberFactoryFunction.createNewListItem();
     assert.Equal("li"),registrationNumberFactoryFunction1("click");
    });


});